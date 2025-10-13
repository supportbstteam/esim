"use client";
import React, { useState  ,useEffect} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "@/redux/store";
import { loginUser, signupUser, verifyOtp } from "@/redux/slice/UserSlice";
import toast from "react-hot-toast";
import Image from "next/image";
import Success from "./Success";
import {X} from "lucide-react";
type AuthModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onAuthSuccess: () => void;
};

const otpValidationSchema = Yup.object({
    otp: Yup.string()
        .required("OTP is required")
        .matches(/^\d{4,6}$/, "OTP must be 4 to 6 digits"), // adjust length if needed
});

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
    const dispatch = useAppDispatch();
    const [isLogin, setIsLogin] = useState(true);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showVerifyOtp, setShowVerifyOtp] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [verifyEmail, setVerifyEmail] = useState('');
    const [loading, setLoading] = useState(false);

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

    const handleLoginSubmit = async (values: typeof loginInitialValues) => {
        setLoading(true);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response: any = await dispatch(loginUser({ email: values.email, password: values.password }));

            if (response?.type === 'user/login/fulfilled') {
                toast.success("Login successful");
                onClose(); // Close modal on success
                onAuthSuccess();
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (err: any) {
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSignupSubmit = async (values: typeof signupInitialValues) => {
        setLoading(true);
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
                setVerifyEmail(values?.email);
                setShowVerifyOtp(true);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.error("Signup error:", err);
        } finally {
            setLoading(false);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleOtp = async (values: any) => {
        setLoading(true);
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response: any = await dispatch(verifyOtp({
                ...values,
                email: verifyEmail
            }));
            if (response?.type === "user/verifyOtp/fulfilled") {
                setLoading(false);
                setShowVerifyOtp(false);
                onClose();
                onAuthSuccess();
            }
            console.log("--- OTP verify response ----", response);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            console.log("--- OTP verify error ----", err);
        } finally {
            setLoading(false);
        }
    };

 useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-[#00000073] backdrop-blur-sm bg-opacity-0 flex justify-center items-center z-50 max-md:p-8"
             onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose?.();
        }
      }}
        >

            <div className="flex bg-white w-[80%] h-auto px-4 md:px-0  md:!w-[835px] ">
                <div className="w-[40%]  bg-[#D0DFF4] max-md:hidden">
                    <Image src="/new_esim1.png" alt="main login" className="h-full object-cover object-left" width={700} height={700} />
                </div>
                <div
                    className={`w-full md:w-[60%] relative px-5 md:px-14 py-5 bg-white flex items-start flex-col ${showSuccess ? 'justify-center' : showVerifyOtp ? 'justify-start pt-8' : showForgotPassword ? 'justify-start' : 'justify-center pt-6'}`}
                    onClick={(e) => e.stopPropagation()}
                >
                   <a onClick={onClose}>   <X className="absolute right-2 top-2" /></a>
                    {/* Toggle Buttons */}
                    {showSuccess ? (
                        <Success />
                    ) : showVerifyOtp ? (

                        <div className="otp-verification w-full mt-5">
                            <button onClick={() => setShowVerifyOtp(false)} className="mb-6 flex items-center gap-2 text-gray-700">
                                <span className="material-symbols-outlined rotate-180">east</span>
                                <span className="text-sm subtext">Back</span>
                            </button>
                            <h2 className="h2 text-start">Verify Your Identity</h2>
                            <p className="subtext text-start my-4">We’ve sent a 6-digit verification code to your registered email address.</p>

                            <Formik
                                initialValues={{ otp: "" }}
                                validationSchema={otpValidationSchema} // <-- added validation schema
                                onSubmit={(values) => {
                                    handleOtp(values);
                                }}
                            >
                                <Form className="space-y-6">
                                    <div>
                                        <label htmlFor="otp" className="block mb-1 font-medium text-gray-700">
                                            Enter Verification Code <span className="text-[#E33629]">*</span>
                                        </label>
                                        <Field
                                            name="otp"
                                            type="text"
                                            placeholder="Verification Code"
                                            className="w-full px-4 py-2 border border-[#959595] mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <ErrorMessage name="otp" component="div" className="mt-1 text-red-600 text-sm" />
                                    </div>

                                    <p className="subtext">
                                        Didn’t receive the code? <button type="button" className="text-[#3BC852]">Resend Code</button>
                                    </p>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full py-3 text-white font-semibold rounded-4xl transition flex justify-center items-center
        ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#3BC852] hover:bg-[#34b249] cursor-pointer"}`}
                                    >
                                        {loading ? (
                                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                            </svg>
                                        ) : (
                                            "Submit"
                                        )}
                                    </button>
                                </Form>
                            </Formik>
                        </div>) : !showForgotPassword ? (
                            //   <Success />
                            <div className="account_log w-full">
                                <h2 className="h2 text-start">
                                    {isLogin ? "Welcome Back" : "Create Your Account"}

                                </h2>
                                <div className="flex justify-center items-center mb-6  mt-6 bg-[#F3F5F7] rounded-2xl  w-full">
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
                                        <Form className="space-y-6 w-full">
                                            {/* Email */}
                                            <div>
                                                <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                                                    Email ID <span className="text-[#E33629]">*</span>
                                                </label>
                                                <Field
                                                    name="email"
                                                    type="email"
                                                    autoComplete="username"
                                                    placeholder="Enter your email Id"
                                                    className="w-full px-4 py-2 border border-[#959595] mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                                <ErrorMessage name="email" component="div" className="mt-1 text-red-600 text-sm" />
                                            </div>

                                            {/* Password */}
                                            <div>
                                                <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
                                                    Password <span className="text-[#E33629]">*</span>
                                                </label>
                                                <Field
                                                    name="password"
                                                    type="password"
                                                    autoComplete="current-password"
                                                    placeholder="*******"
                                                    className="w-full px-4 py-2 border border-[#959595] mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                                <ErrorMessage name="password" component="div" className="mt-1 text-red-600 text-sm" />
                                            </div>
                                            <div className="flex items-center justify-between">
                                                {/* <span className="flex items-center gap-2">
                                                    <input type="checkbox" name="rememberMe" className="ancent-[#0000]" />
                                                    <label htmlFor="rememberMe" className="subtext !text-sm text-gray-700">
                                                        Remember Me
                                                    </label>
                                                </span> */}
                                                <button onClick={() => setShowForgotPassword(true)} className="text-sm subtext hover:underline ml-auto">
                                                    Forgot Password?
                                                </button>
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className={`w-full py-3 text-white font-semibold rounded-4xl transition flex justify-center items-center
        ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#3BC852] hover:bg-[#34b249] cursor-pointer"}`}
                                            >
                                                {loading ? (
                                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                                    </svg>
                                                ) : (
                                                    "Submit"
                                                )}
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
                                            <div className="flex gap-2 md:gap-3 max-md:flex-col max-md:mb-2">
                                                <div className="max-md:w-full">
                                                    <label htmlFor="firstName" className="block mb-0 md:mb-1 font-medium text-gray-700">
                                                        First Name <span className="text-[#E33629]">*</span>
                                                    </label>
                                                    <Field
                                                        name="firstName"
                                                        type="text"
                                                        autoComplete="given-name"
                                                        placeholder="First Name"
                                                        className="w-full px-4 py-2 border border-[#959595] mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                    <ErrorMessage name="firstName" component="div" className="mt-1 text-red-600 text-sm" />
                                                </div>

                                                {/* Last Name */}
                                                <div className="max-md:w-full max-md:mb-0">
                                                    <label htmlFor="lastName" className="block  mb-0 md:mb-1  font-medium text-gray-700">
                                                        Last Name <span className="text-[#E33629]">*</span>
                                                    </label>
                                                    <Field
                                                        name="lastName"
                                                        type="text"
                                                        placeholder="Last Name"
                                                        autoComplete="family-name"
                                                        className="w-full px-4 py-2 border border-[#959595] mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                    <ErrorMessage name="lastName" component="div" className="mt-1 text-red-600 text-sm" />
                                                </div>
                                            </div>
                                            {/* Email */}
                                            <div>
                                                <label htmlFor="email" className="block  mb-0 md:mb-1  font-medium text-gray-700">
                                                    Email ID <span className="text-[#E33629]">*</span>
                                                </label>
                                                <Field
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    placeholder="Enter your email Id"
                                                    className="w-full px-4 py-2 border border-[#959595] mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                                <ErrorMessage name="email" component="div" className="mt-1 text-red-600 text-sm" />
                                            </div>

                                            {/* Password */}
                                            <div>
                                                <label htmlFor="password" className="block  mb-0 md:mb-1  font-medium text-gray-700">
                                                    Password <span className="text-[#E33629]">*</span>
                                                </label>
                                                <Field
                                                    name="password"
                                                    type="password"
                                                    autoComplete="new-password"
                                                    placeholder="*******"
                                                    className="w-full px-4 py-2 border border-[#959595] mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                                <ErrorMessage name="password" component="div" className="mt-1 text-red-600 text-sm" />
                                            </div>



                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className={`w-full py-3 text-white font-semibold rounded-4xl transition flex justify-center items-center
        ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#3BC852] hover:bg-[#34b249] cursor-pointer"}`}
                                            >
                                                {loading ? (
                                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                                                    </svg>
                                                ) : (
                                                    "Submit"
                                                )}
                                            </button>
                                        </Form>
                                    </Formik>
                                )}
                            </div>
                        ) : (
                        <div className="forgot w-full mt-5">
                            <button onClick={() => setShowForgotPassword(false)} className="mb-6 flex items-center gap-2 text-gray-700 ">
                                <span className="material-symbols-outlined rotate-180">east</span>
                                <span className="text-sm subtext">Back</span>
                            </button>
                            <h2 className="h2 text-start w-full">
                                Forgot Your Password?
                            </h2>
                            <p className="subtext text-start my-8 whitespace-nowrap">Don’t worry—we’ll help you reset it in just a few steps</p>
                            <Formik
                                initialValues={loginInitialValues}
                                validationSchema={loginValidationSchema}
                                onSubmit={handleLoginSubmit}
                            >
                                <Form>
                                    <div>
                                        <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                                            Email ID <span className="text-[#E33629]">*</span>
                                        </label>
                                        <Field
                                            name="email"
                                            type="email"
                                            autoComplete="username"
                                            placeholder="Enter your email Id"
                                            className="w-full px-4 py-2 border border-[#959595] mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <ErrorMessage name="email" component="div" className="mt-1 text-red-600 text-sm" />
                                    </div>
                                    <button type="submit"
                                        className="w-full mt-5 py-3 bg-[#3BC852] text-white font-semibold rounded-4xl  transition" >
                                        Submit
                                    </button>
                                </Form>
                            </Formik>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
