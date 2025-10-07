import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { MdEmail, MdPhone } from 'react-icons/md';
import toast from 'react-hot-toast';
import { api } from '@/lib/api';

const validationSchema = Yup.object({
    firstName: Yup.string().required('*required').max(30, 'Max 30 chars'),
    lastName: Yup.string().required('*equired').max(30, 'Max 30 chars'),
    email: Yup.string().email('Invalid email').required('*required'),
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
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md border-[#808080] ">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 ">Contact Us</h2>
            <Formik
                initialValues={{ firstName: '', lastName: '', email: '', phone: '', message: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSave}
            >
                {({ isSubmitting }) => (
                    <Form>
                        {/* First name and last name in one row */}
                        <div className="flex gap-4 mb-4">
                            <div className="flex-1">
                                <label htmlFor="firstName" className="block text-gray-700  mb-1">
                                    *First Name
                                </label>
                                <Field
                                    id="firstName"
                                    name="firstName"
                                    placeholder="John"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                                />
                                <ErrorMessage
                                    name="firstName"
                                    component="div"
                                    className="text-red-600 text-sm mt-1"
                                />
                            </div>
                            <div className="flex-1">
                                <label htmlFor="lastName" className="block text-gray-700 ">
                                    *Last Name
                                </label>
                                <Field
                                    id="lastName"
                                    name="lastName"
                                    placeholder="Doe"
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                                />
                                <ErrorMessage
                                    name="lastName"
                                    component="div"
                                    className="text-red-600 text-sm mt-1"
                                />
                            </div>
                        </div>

                        {/* Email row */}
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 ">
                                <label htmlFor="phone" className="block text-gray-700  mb-1 flex items-center gap-2">
                                    <MdEmail className="text-gray-500" />
                                    *Email
                                </label>
                            </label>
                            <Field
                                id="email"
                                name="email"
                                type="email"
                                placeholder="john.doe@example.com"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-600 text-sm mt-1"
                            />
                        </div>

                        {/* Phone row */}
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-gray-700  mb-1 flex items-center gap-2">
                                <MdPhone className="text-gray-500" />
                                *Phone
                            </label>
                            <Field
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="+1234567890"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 "
                            />
                            <ErrorMessage
                                name="phone"
                                component="div"
                                className="text-red-600 text-sm mt-1"
                            />
                        </div>

                        {/* Message row */}
                        <div className="mb-6">
                            <label htmlFor="message" className="block text-gray-700  mb-1">
                                Message
                            </label>
                            <Field
                                as="textarea"
                                id="message"
                                name="message"
                                rows={4}
                                placeholder="Your message..."
                                className="w-full px-3 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-600 "
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
                            className="w-full bg-green-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
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
