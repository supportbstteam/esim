"use client";

import React, { useEffect, useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchUserDetails, logout } from "@/redux/slice/UserSlice";
import Image from "next/image";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEdit, FaSave, FaTrash, FaTimesCircle, FaUpload, FaUserCircle } from "react-icons/fa";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import { useNavigate } from "@/components/hooks/navigation";

const ValidationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
});

function Profile() {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state?.user || {});
    const navigation = useNavigate();
    const [profilePic, setProfilePic] = useState<string | null>(null);
    const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
    const [showUploadOptions, setShowUploadOptions] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        // Fetch user details on mount
        const fetchUser = async () => {
            await dispatch(fetchUserDetails());
        };
        fetchUser();
    }, [dispatch]);

    useEffect(() => {
        if (user?.profilePic) {
            setProfilePic(user.profilePic);
        }
    }, [user]);

    const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfilePicFile(file);
            const reader = new FileReader();
            reader.onload = () => setProfilePic(reader.result as string);
            reader.readAsDataURL(file);
            setShowUploadOptions(false);
        }
    };

    const handleRemoveProfilePic = () => {
        setProfilePic(null);
        setProfilePicFile(null);
        setShowUploadOptions(false);
        // TODO: Add backend call to remove profile pic
    };

    const handleDeleteAccount = () => setShowDeleteModal(true);

    const confirmDeleteAccount = async () => {
        // TODO: Implement delete account API call and logout user here
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const response: any = await api({
                url: "/user/delete",
                method: "DELETE",
            });

            if (response?.status === "success") {
                toast.success("Account Deleted Successfully");
                dispatch(logout());
                navigation("/");
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (err: any) {
            toast.error(err?.response?.data?.message || "Something went wrong")
            console.error("Error in the account delete:", err);
        }
        setShowDeleteModal(false);
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            {/* Profile Picture Section */}
            <div className="flex flex-col items-center mb-6 relative">
                <div
                    className="w-24 h-24 rounded-full border-4 border-gray-300 flex items-center justify-center overflow-hidden cursor-pointer"
                    onClick={() => setShowUploadOptions((v) => !v)}
                >
                    {profilePic ? (
                        <Image src={profilePic} alt="Profile Picture" width={96} height={96} className="object-cover" />
                    ) : (
                        <FaUserCircle size={96} className="text-gray-400" />
                    )}
                </div>

                {showUploadOptions && (
                    <div className="absolute top-full mt-2 bg-white shadow rounded p-3 space-y-3 z-10 w-48 text-center">
                        <label htmlFor="upload_profile_pic" className="flex items-center justify-center gap-2 cursor-pointer text-blue-600 hover:underline">
                            <FaUpload /> Upload New Photo
                            <input
                                type="file"
                                id="upload_profile_pic"
                                accept="image/*"
                                className="hidden"
                                onChange={handleProfilePicChange}
                            />
                        </label>
                        {profilePic && (
                            <button
                                onClick={handleRemoveProfilePic}
                                className="text-red-600 hover:underline flex justify-center gap-2"
                            >
                                <FaTimesCircle /> Remove Profile
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Formik form */}
            {user && (
                <Formik
                    initialValues={{
                        firstName: user.firstName || "",
                        lastName: user.lastName || "",
                        email: user.email || "",
                    }}
                    validationSchema={ValidationSchema}
                    onSubmit={async (values, actions) => {
                        // TODO: Dispatch update API here with values and profilePicFile if any
                        // console.log("Saved values:", values);
                        // if (profilePicFile) {
                        //     console.log("Profile picture file exists", profilePicFile);
                        //     // Upload pic logic here
                        // }
                        try {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            const response: any = await api({
                                url: "/user/update",
                                data: values,
                                method: "PUT"
                            });

                            if (response?.status === "success") {
                                toast.success("Profile update successfully");
                                await dispatch(fetchUserDetails());
                            }

                            console.log("----- update in the response ----", response);
                        }
                        catch (err) {

                        }
                        actions.setSubmitting(false);
                    }}
                >
                    {({ isSubmitting, isValid, dirty, setSubmitting }) => (
                        <Form className="space-y-6">
                            {/* First Name */}
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-semibold mb-1">
                                    First Name
                                </label>
                                <Field
                                    id="firstName"
                                    name="firstName"
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage name="firstName" component="div" className="text-red-600 text-sm mt-1" />
                            </div>

                            {/* Last Name */}
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-semibold mb-1">
                                    Last Name
                                </label>
                                <Field
                                    id="lastName"
                                    name="lastName"
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage name="lastName" component="div" className="text-red-600 text-sm mt-1" />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold mb-1">
                                    Email
                                </label>
                                <Field
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-600 text-sm mt-1" />
                            </div>

                            {/* Submit button */}
                            <div className="flex justify-between items-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !isValid || !dirty}
                                    className={`flex items-center gap-2 px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    Save Changes
                                </button>

                                {/* Delete Account */}
                                <button
                                    type="button"
                                    onClick={handleDeleteAccount}
                                    className="flex items-center gap-2 px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
                                >
                                    Delete Account
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            )}

            {/* Confirm Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded max-w-sm w-full text-center">
                        <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
                        <p className="mb-6">Are you sure you want to delete your account? This action cannot be undone.</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDeleteAccount}
                                className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;
