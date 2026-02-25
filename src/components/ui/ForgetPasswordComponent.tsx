"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { api } from "@/lib/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type AuthModalProps = {
    onClose: () => void;
};

const ForgotPassword: React.FC<AuthModalProps> = ({
    onClose
}) => {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // ✅ Validation schemas
    const emailSchema = Yup.object({
        email: Yup.string().email("Invalid email").required("Email is required"),
    });

    const otpSchema = Yup.object({
        otp: Yup.string()
            .matches(/^[0-9]{6}$/, "OTP must be 6 digits")
            .required("OTP is required"),
    });

    const resetSchema = Yup.object({
        password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("New password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm password is required"),
    });

    // ✅ Step 1 - Send OTP
    const handleSendPasswordOtp = async (values: { email: string }) => {

        try {
            // await axios.post("/user/auth/forget-password", { email: values?.email });
            await api({
                url: "/user/auth/forget-password",
                method: "POST",
                data: {
                    email: values?.email
                }
            });
            setEmail(values?.email);
            setStep(2);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to send OTP")
            // alert(err.response?.data?.message || "Failed to send OTP");
        }
    };

    // ✅ Step 2 - Verify OTP
    const handleVerifyOtp = async (values: { otp: string }) => {
        try {
            // await axios.post("/api/user/verify-forgot-otp", { email, otp: values.otp });
            await api({
                url: "/user/auth/verify-password-otp",
                method: "POST",
                data: {
                    email: email,
                    otp: values?.otp
                }
            });
            setStep(3);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to send OTP")
        }
    };

    // ✅ Step 3 - Reset Password
    const handleResetPassword = async (values: { password: string }) => {
        try {
            // await axios.post("/api/user/reset-password", { email, password: values.password });
            await api({
                url: "/user/auth/temp-reset-password",
                method: "POST",
                data: {
                    email,
                    password: values?.password
                }
            })
            toast.success("Password reset successfully!");
            onClose();
            // setShowForgotPassword(false);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            toast.error(err.response?.data?.message || "Failed to send OTP")
        }
    };

    return (
        <div className="forgot w-full mt-5">
            {/* <button
                // onClick={() => setShowForgotPassword(false)}
                className="mb-6 flex items-center gap-2 text-gray-700"
            >
                <span className="material-symbols-outlined rotate-180">east</span>
                <span className="text-sm subtext">Back</span>
            </button> */}

            <h2 className="h2 text-start w-full">Forgot Your Password?</h2>
            <p className="subtext text-start my-8 whitespace-normal md:whitespace-nowrap">
                Don’t worry—we’ll help you reset it in just a few steps.
            </p>

            {/* Step 1 → Enter Email */}
            {step === 1 && (
                <Formik
                    initialValues={{ email }}
                    validationSchema={emailSchema}
                    onSubmit={handleSendPasswordOtp}
                >
                    <Form>
                        <label htmlFor="email" className="block mb-1 font-medium text-gray-700">
                            Email ID <span className="text-[#E33629]">*</span>
                        </label>
                        <Field
                            name="email"
                            type="email"
                            placeholder="Enter your email Id"
                            className="w-full px-4 py-2 border border-[#959595] mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <ErrorMessage name="email" component="div" className="mt-1 text-red-600 text-sm" />

                        <button
                            type="submit"
                            className="w-full mt-5 py-3 bg-[#3BC852] text-white font-semibold rounded-4xl transition"
                        >
                            Send OTP
                        </button>
                    </Form>
                </Formik>
            )}

            {/* Step 2 → Enter OTP */}
            {step === 2 && (
                <Formik initialValues={{ otp: "" }} validationSchema={otpSchema} onSubmit={handleVerifyOtp}>
                    <Form>
                        <p className="text-gray-600 mb-3">OTP sent to <b>{email}</b></p>

                        <label htmlFor="otp" className="block mb-1 font-medium text-gray-700">
                            Enter OTP <span className="text-[#E33629]">*</span>
                        </label>
                        <Field
                            name="otp"
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            className="w-full px-4 py-2 border border-[#959595] mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <ErrorMessage name="otp" component="div" className="mt-1 text-red-600 text-sm" />

                        <button
                            type="submit"
                            className="w-full mt-5 py-3 bg-[#3BC852] text-white font-semibold rounded-4xl transition"
                        >
                            Verify OTP
                        </button>
                    </Form>
                </Formik>
            )}

            {/* Step 3 → Reset Password */}
            {step === 3 && (
                <Formik
                    initialValues={{ password: "", confirmPassword: "" }}
                    validationSchema={resetSchema}
                    onSubmit={handleResetPassword}
                >
                    <Form>
                        <p className="text-gray-600 mb-3">Reset password for <b>{email}</b></p>

                        {/* New Password Field */}
                        <label htmlFor="password" className="block mb-1 font-medium text-gray-700">
                            New Password <span className="text-[#E33629]">*</span>
                        </label>
                        <div className="relative">
                            <Field
                                name="password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter new password"
                                className="w-full px-4 py-2 border border-[#959595] mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-5 text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <ErrorMessage name="password" component="div" className="mt-1 text-red-600 text-sm" />

                        {/* Confirm Password Field */}
                        <label htmlFor="confirmPassword" className="block mb-1 font-medium text-gray-700 mt-4">
                            Confirm Password <span className="text-[#E33629]">*</span>
                        </label>
                        <div className="relative">
                            <Field
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Re-enter new password"
                                className="w-full px-4 py-2 border border-[#959595] mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="button"
                                className="absolute right-3 top-5 text-gray-500"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <ErrorMessage name="confirmPassword" component="div" className="mt-1 text-red-600 text-sm" />

                        <button type="submit" className="w-full mt-5 py-3 bg-[#3BC852] text-white font-semibold rounded-4xl transition">
                            Reset Password
                        </button>
                    </Form>
                </Formik>
            )}
        </div>
    );
};

export default ForgotPassword;
