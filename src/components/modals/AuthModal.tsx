"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "@/redux/store";
import { loginUser, signupUser } from "@/redux/slice/UserSlice";
import toast from "react-hot-toast";

type AuthModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
    const dispatch = useAppDispatch();
    const [isLogin, setIsLogin] = useState(true);

    // ======= Initial Values =======
    const loginInitialValues = { email: "", password: "" };
    const signupInitialValues = { firstName: "", lastName: "", email: "", password: "" };

    // ======= Validation Schemas =======
    const loginValidationSchema = Yup.object({
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().min(6, "Must be at least 6 characters").required("Required"),
    });

    const signupValidationSchema = Yup.object({
        firstName: Yup.string().min(2, "Too Short!").required("Required"),
        lastName: Yup.string().min(2, "Too Short!").required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().min(6, "Must be at least 6 characters").required("Required"),
    });

    // ======= Handlers =======
    const handleLoginSubmit = async (values: typeof loginInitialValues) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response: any = await dispatch(loginUser({ email: values.email, password: values.password }));

            if (response?.type === 'user/login/fulfilled') {
                toast.success("Login successful");
                onClose(); // Close modal on success
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Login error:", err);
        }
    };

    const handleSignupSubmit = async (values: typeof signupInitialValues) => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response: any = await dispatch(
                signupUser({
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password,
                })
            );

            if (response?.type === 'user/signup/fulfilled') {
                toast.success("Sign Up successful");
                onClose(); // Close modal on success
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Signup error:", err);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-[#00000073] backdrop-blur-sm bg-opacity-0 flex justify-center items-center z-50 "
            onClick={onClose}
        >
            <div className="flex bg-white w-full px-4 md:px-0  md:!w-[835px] md:h-[630px]">
                <div className="w-[40%] py-14 px-[25px] bg-[#D0DFF4]">
                    <h2 className="h1">Your Gateway to Smarter Connectivity</h2>
                    <p className="mt-9 subtext">
                        Log in or sign up to explore affordable, secure, and borderless mobile experiences.
                    </p>
                </div>
                <div
                    className="w-[60%] px-14 py-5 bg-white"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Toggle Buttons */}
                     <h2 className="h2 text-start">
                     {isLogin ? "Welcome Back" : "Create Your Account"}

                     </h2>
                    <div className="flex justify-center mb-6  mt-6 bg-[#F3F5F7] rounded-2xl ">
                        <button
                            className={`px-6 py-2 w-full rounded-2xl font-semibold ${!isLogin ? "bg-[#3BC85221] text-[#3BC852] " : "bg-[#F3F5F7] text-gray-700 "
                                }`}
                            onClick={() => setIsLogin(false)}
                            disabled={!isLogin}
                        >
                            Register
                        </button>
                        <button
                            className={`px-6 py-2 w-full rounded-2xl  font-semibold ${isLogin ? "bg-[#3BC85221] text-[#3BC852] " : "bg-[#F3F5F7] text-gray-700 "
                                }`}
                            onClick={() => setIsLogin(true)}
                            disabled={isLogin}
                        >
                            Login
                        </button>
                    </div>

                    {/* ======= Form ======= */}
                    {isLogin ? (
                        <Formik
                            initialValues={loginInitialValues}
                            validationSchema={loginValidationSchema}
                            onSubmit={handleLoginSubmit}
                        >
                            <Form className="space-y-6">
                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                                        Email
                                    </label>
                                    <Field
                                        name="email"
                                        type="email"
                                        autoComplete="username"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage name="email" component="div" className="mt-1 text-red-600 text-sm" />
                                </div>

                                {/* Password */}
                                <div>
                                    <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
                                        Password
                                    </label>
                                    <Field
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage name="password" component="div" className="mt-1 text-red-600 text-sm" />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 bg-[#3BC852] text-white font-semibold rounded-md  transition"
                                >
                                    Submit
                                </button>
                            </Form>
                        </Formik>
                    ) : (
                        <Formik
                            initialValues={signupInitialValues}
                            validationSchema={signupValidationSchema}
                            onSubmit={handleSignupSubmit}
                        >
                            <Form className="space-y-6">
                                {/* First Name */}
                                <div className="flex gap-3">
                                    <div className="">
                                        <label htmlFor="firstName" className="block mb-1 font-medium text-gray-700">
                                            First Name
                                        </label>
                                        <Field
                                            name="firstName"
                                            type="text"
                                            autoComplete="given-name"
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <ErrorMessage name="firstName" component="div" className="mt-1 text-red-600 text-sm" />
                                    </div>

                                    {/* Last Name */}
                                    <div className="">
                                        <label htmlFor="lastName" className="block mb-1 font-medium text-gray-700">
                                            Last Name
                                        </label>
                                        <Field
                                            name="lastName"
                                            type="text"
                                            autoComplete="family-name"
                                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <ErrorMessage name="lastName" component="div" className="mt-1 text-red-600 text-sm" />
                                    </div>
                                </div>
                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                                        Email
                                    </label>
                                    <Field
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage name="email" component="div" className="mt-1 text-red-600 text-sm" />
                                </div>

                                {/* Password */}
                                <div>
                                    <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
                                        Password
                                    </label>
                                    <Field
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage name="password" component="div" className="mt-1 text-red-600 text-sm" />
                                </div>

                                <div>
                                    <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
                                        Referral Coupon
                                    </label>
                                    <Field
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <ErrorMessage name="password" component="div" className="mt-1 text-red-600 text-sm" />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 bg-[#3BC852] text-white font-semibold rounded-md hover:bg-blue-700 transition"
                                >
                                    Submit
                                </button>
                            </Form>
                        </Formik>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
