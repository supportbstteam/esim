"use client";

import ContactForm from '@/components/form/ContactForm';
import { api } from '@/lib/api';
import { FormikHelpers } from 'formik';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FiMapPin, FiMail, FiPhone } from 'react-icons/fi';
import TrustedTravel from '@/components/home/TrustedTravel';
import FAQ from "@/components/home/Faq";
import {  useAppSelector } from "@/redux/store";
interface ContactItem {
    id: string;
    position: string;
    type: string;
    value: string;
}

interface ContactFormValues {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
}

function Contact() {
    const [contacts, setContacts] = useState<ContactItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [content, setContent] = useState<string>('');
const { list } = useAppSelector((state) => state?.faq);
    const fetchContact = async () => {
        try {
            const response: ContactItem[] = await api({
                url: "user/cms/contacts",
                method: "GET",
            });

            if (response.length > 0) setContacts(response);
        } catch (err) {
            console.error("Error fetching contacts:", err);
            setError("Failed to load contacts");
        }
    };

    const fetchData = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await api<{ html: string }>({
                url: `/user/cms/content/contact`,
                method: "GET",
            });
            setContent(response.html || "");
        } catch (err) {
            console.error(err);
            setError("Comming Soon");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContact();
        fetchData();
    }, []);

    // Filter contacts by type
    const address = contacts.find(c => c.type === "Address");
    const emails = contacts.filter(c => c.type === "Email");
    const phones = contacts.filter(c => c.type === "Phone");


    const handleSave = async (
        values: ContactFormValues,
        { setSubmitting, resetForm }: FormikHelpers<ContactFormValues>
    ) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response: any = await api({
                url: "/user/query/create-query",
                method: "POST",
                data: values
            });

            if (response?.status) {
                console.log("---- response in the query questions ----", response);
                toast.success(response?.message || "Message sent successfully!");
                resetForm(); // ✅ reset the form after success
            } else {
                toast.error(response?.message || "Something went wrong");
            }
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong");
        } finally {
            setSubmitting(false); // ✅ stop loading spinner
        }
    };


    return (
        <div className='mb-0 md:mb-25'>
        <div className='flex flex-col md:flex-row container border-2 border-[#F3F5F7] rounded-[8px] w-full h-full my-15 md:my-25  p-5 md:!p-10 gap-10'>

            {/* Left Column - About & Contacts */}
            <div className='flex w-full md:w-[58%] flex-col justify-between'>
                <h1 className='h1'>Get in Touch with Us</h1>

              <p className='subtext !leading-8 !text-[20px]'>{!loading && !error && content && (
                    <div className="prose max-w-none mb-8" dangerouslySetInnerHTML={{ __html: content }} />
                )}</p>  

                <div className="grid  max-sm:grid-col-1 max-md:grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Phones */}
                    {phones.map(phone => (
                        <div key={phone.id} className="gap-3 border-1 border-[#ccc] p-5 rounded-xl">
                            <FiPhone className="text-2xl text-black-700" />
                            <p className='font-semibold text-xl mt-4 text-[#1A0F33] mb-2' >Call Us  <span className='text-sm' >({phone?.position})</span></p>
                            <span>{phone.value}</span>
                        </div>
                    ))}

                    {/* Address */}
                    {address && (
                        <div className="gap-3 border-1 border-[#ccc] p-5 rounded-xl">
                            <FiMapPin className="text-2xl text-black-700" />
                            <p className='font-semibold text-xl mt-4 text-[#1A0F33] mb-2' >Our Location <span className='text-sm' >({address?.position})</span></p>
                            <span>{address.value}</span>
                        </div>
                    )}

                    {/* Emails */}
                    {emails.map(email => (
                        <div key={email.id} className="gap-3 border-1 border-[#ccc] p-5 rounded-xl">
                            <FiMail className="text-2xl text-black-700" />
                            <p className='font-semibold text-xl mt-4 text-[#1A0F33] mb-2' >Email Us <span className='text-sm' >({email?.position})</span></p>
                            <span>{email.value}</span>
                        </div>
                    ))}


                </div>
            </div>

            {/* Right Column - Contact Form (Placeholder) */}
            <div className='flex w-full md:w-[42%]'>
                <ContactForm handleSave={handleSave} />
            </div>
        </div>
         <TrustedTravel />
        <FAQ faqs={list} />
        </div>
    );
}

export default Contact;
