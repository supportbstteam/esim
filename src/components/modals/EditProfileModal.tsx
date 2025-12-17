"use client";
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaUser } from "react-icons/fa";
import { ModalWrapper } from "./ModalWrapper";
import { useAppSelector } from "@/redux/store";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (values: any) => Promise<void>;
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  contact: Yup.string().optional(),
  location: Yup.string().optional(),
});

export const EditProfileModal: React.FC<Props> = ({
  isOpen,
  onClose,
  // initial = {},
  onSubmit,
}) => {
  const { user } = useAppSelector(state => state?.user);
  const [preview, setPreview] = useState<string | null>(user ? user.image : null);
  return (
    <ModalWrapper title="Edit Profile" isOpen={isOpen} onClose={onClose} widthClass="max-w-lg" footer={null}>
      <Formik
        initialValues={{
          firstName: user ? user.firstName : "",
          lastName: user ? user.lastName : "",
          email: user ? user.email : "",
          contact: user ? user.phone : "",
          location: user ? user.country : "",
          avatar: null as File | null,
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await onSubmit(values);
            onClose();
          } catch (err) {
            console.error(err);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className="space-y-6 px-2">
            {/* Avatar + Upload */}
            <div className="flex flex-col items-center mb-4">
              <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200 flex items-center justify-center bg-gray-100">
                  {preview ? (
                    <img src={preview} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <FaUser className="text-gray-400 text-3xl" />
                  )}
                </div>

                <label className="cursor-pointer">
                  <div className="border border-gray-200 rounded-full py-2 px-5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition">
                    Upload New Image
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.currentTarget.files?.[0] ?? null;
                      setFieldValue("avatar", file);
                      if (file) {
                        const url = URL.createObjectURL(file);
                        setPreview(url);
                      }
                    }}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  First Name <span className="text-rose-500">*</span>
                </label>
                <Field
                  name="firstName"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 outline-none"
                />
                <ErrorMessage name="firstName" component="div" className="text-xs text-rose-500 mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Last Name <span className="text-rose-500">*</span>
                </label>
                <Field
                  name="lastName"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 outline-none"
                />
                <ErrorMessage name="lastName" component="div" className="text-xs text-rose-500 mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Email Id <span className="text-rose-500">*</span>
                </label>
                <Field
                  name="email"
                  type="email"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 outline-none"
                />
                <ErrorMessage name="email" component="div" className="text-xs text-rose-500 mt-1" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Contact No 
                </label>
                <Field
                  name="contact"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 outline-none"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Location 
                </label>
                <Field
                  name="location"
                  as="select"
                  className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 outline-none"
                >
                  <option value="">Select Location</option>
                  <option value="Turkey">Turkey</option>
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                </Field>
              </div>
            </div>

            {/* Update Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 rounded-full text-sm transition"
              >
                {isSubmitting ? "Updating..." : "Update"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
};
