"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "@/redux/store";
import { loginUser, signupUser } from "@/redux/slice/UserSlice";
import toast from "react-hot-toast";

const Auth: React.FC = () => {
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
      const response: any = await dispatch(
        loginUser({ email: values.email, password: values.password })
      );

      if (response?.type === 'user/login/fulfilled') {
        toast.success("Login sucessful")
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
        toast.success("Sign Up sucessful")
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 border border-gray-300 rounded-lg shadow-lg bg-white mb-10">
      {/* Toggle Buttons */}
      <div className="flex justify-center mb-6 space-x-4">
        <button
          className={`px-6 py-2 rounded-md font-semibold ${isLogin ? "bg-[#133365] text-white shadow-md" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          onClick={() => setIsLogin(true)}
          disabled={isLogin}
        >
          Login
        </button>
        <button
          className={`px-6 py-2 rounded-md font-semibold ${!isLogin ? "bg-[#133365] text-white shadow-md" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          onClick={() => setIsLogin(false)}
          disabled={!isLogin}
        >
          Sign Up
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
              className="w-full py-3 bg-[#133365] text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Login
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
            <div>
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
            <div>
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

            <button
              type="submit"
              className="w-full py-3 bg-[#133365] text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default Auth;
