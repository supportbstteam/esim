"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ModalWrapper } from "./ModalWrapper";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSubmit: (values: any) => Promise<void>;
}

const schema = Yup.object().shape({
    currentPassword: Yup.string().required("Required"),
    newPassword: Yup.string().min(6, "Too short").required("Required"),
    confirmPassword: Yup.string()
        .nullable()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Please confirm your password"),

});

export const ChangePasswordModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
    return (
        <ModalWrapper title="Change Password" isOpen={isOpen} onClose={onClose} widthClass="max-w-sm">
            <Formik
                initialValues={{ currentPassword: "", newPassword: "", confirmPassword: "" }}
                validationSchema={schema}
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
                {({ isSubmitting }) => (
                    <Form className="space-y-4">
                        <div>
                            <label className="text-xs text-gray-600">Current Password</label>
                            <Field name="currentPassword" type="password" className="mt-1 w-full rounded-md border px-3 py-2 text-sm" />
                            <div className="text-xs text-rose-500 mt-1"><ErrorMessage name="currentPassword" /></div>
                        </div>

                        <div>
                            <label className="text-xs text-gray-600">New Password</label>
                            <Field name="newPassword" type="password" className="mt-1 w-full rounded-md border px-3 py-2 text-sm" />
                            <div className="text-xs text-rose-500 mt-1"><ErrorMessage name="newPassword" /></div>
                        </div>

                        <div>
                            <label className="text-xs text-gray-600">Confirm Password</label>
                            <Field name="confirmPassword" type="password" className="mt-1 w-full rounded-md border px-3 py-2 text-sm" />
                            <div className="text-xs text-rose-500 mt-1"><ErrorMessage name="confirmPassword" /></div>
                        </div>

                        <div className="flex justify-between">
                            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg">Cancel</button>
                            <button type="submit" disabled={isSubmitting} className="px-5 py-2 rounded-lg bg-green-500 text-white">
                                {isSubmitting ? "Saving..." : "Change Password"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </ModalWrapper>
    );
};
