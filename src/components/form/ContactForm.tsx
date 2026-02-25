import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { MdPhone } from 'react-icons/md';
import toast from 'react-hot-toast';
import { api } from '@/lib/api';

const validationSchema = Yup.object({
    firstName: Yup.string().required('*required').max(30, 'Max 30 chars'),
    lastName: Yup.string().required('*required').max(30, 'Max 30 chars'),
    email: Yup.string()
        .required('*required')
        .matches(
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            'Enter valid email (example@gmail.com)'
        ),
    phone: Yup.string()
        .matches(/^\+?[0-9]{7,15}$/, 'Invalid phone number')
        .required('*required'),
    message: Yup.string().required('*required').max(500, 'Max 500 chars'),
});

interface ContactFormValues {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
}

interface ContactFormProps {
    handleSave: (
        values: ContactFormValues,
        formikHelpers: FormikHelpers<ContactFormValues>
    ) => void | Promise<void>;
}

const ContactForm: React.FC<ContactFormProps> = ({ handleSave }) => {
    return (
        <div className="w-full p-6 bg-white rounded-[8px]  border-[#F3F5F7] border-1 ">
            <h2 className="h2 mb-6 ">Send Us a Message</h2>
            <Formik
                initialValues={{ firstName: '', lastName: '', email: '', phone: '', message: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSave}
            >
                {({ isSubmitting }) => (
                    <Form>
                        {/* First name and last name in one row */}
                        <div className="flex gap-4 mb-6">
                            <div className="flex-1">
                                <label htmlFor="firstName" className="block text-[#181818]  mb-2">
                                    First Name<span className='text-[#E33629]'>*</span>
                                </label>

                                <Field
                                    id="firstName"
                                    name="firstName"
                                    placeholder="John"
                                    className="w-full px-3 py-2 border rounded-md  border-[#959595] "
                                />
                                <ErrorMessage
                                    name="firstName"
                                    component="div"
                                    className="text-red-600 text-sm mt-1"
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="lastName" className="block text-[#181818] mb-2">
                                    Last Name<span className='text-[#E33629]'>*</span>
                                </label>
                                <Field
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Doe"
                                    className="w-full px-3 py-2 border rounded-md  border-[#959595] "
                                />
                                <ErrorMessage
                                    name="lastName"
                                    component="div"
                                    className="text-red-600 text-sm mt-1"
                                />
                            </div>
                        </div>

                        {/* Email row */}
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-[#181818] ">
                                <label htmlFor="phone" className=" text-[#181818]  mb-2 flex items-center gap-2">

                                    Email<span className='text-[#E33629]'>*</span>
                                </label>
                            </label>
                            <Field
                                id="email"
                                name="email"
                                type="email"
                                placeholder="john.doe@example.com"
                                className="w-full px-3 py-2 border rounded-md  border-[#959595] "
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-600 text-sm mt-1"
                            />
                        </div>

                        {/* Phone row */}
                        <div className="mb-6">
                            <label htmlFor="phone" className=" text-[#181818]  mb-2 flex items-center gap-2">

                                Phone<span className='text-[#E33629]'>*</span>
                            </label>
                            <Field
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="+1234567890"
                                className="w-full px-3 py-2 border rounded-md  border-[#959595]focus:outline-none focus:ring-2 focus:ring-green-500 "
                            />
                            <ErrorMessage
                                name="phone"
                                component="div"
                                className="text-red-600 text-sm mt-1"
                            />
                        </div>

                        {/* Message row */}
                        <div className="mb-6">
                            <label htmlFor="message" className="block text-[#181818]  mb-2">
                                Message
                            </label>
                            <Field
                                as="textarea"
                                id="message"
                                name="message"
                                rows={4}
                                placeholder="Your message..."
                                className="w-full px-3 py-2 border rounded-md  border-[#959595]resize-none focus:outline-none focus:ring-2 focus:ring-blue-600 "
                            />
                            <ErrorMessage
                                name="message"
                                component="div"
                                className="text-red-600 text-sm mt-1"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#3BC852] text-white font-semibold py-3 rounded-full hover:bg-[#133365] transition disabled:opacity-50"
                        >
                            Send Message
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ContactForm;
