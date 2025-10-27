"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchUserDetails } from "@/redux/slice/UserSlice";
import { fetchOrdersByUser } from "@/redux/slice/OrderSlice";
import Image from "next/image";
import dayjs from "dayjs";
import { FaCheckCircle, FaInfoCircle, FaTimes, FaTimesCircle } from "react-icons/fa";
import { FiSearch, FiFilter } from "react-icons/fi";

const statusStyles: Record<string, string> = {
  success: "text-green-600",
  processing: "text-yellow-500",
  failed: "text-red-600",
  canceled: "text-gray-400",
  refunded: "text-blue-600",
};

const statusIcon = (status: string) => {
  switch (status?.toLowerCase()) {
    case "success":
      return <FaCheckCircle className="inline mr-1 text-green-500" />;
    case "processing":
      return <FaInfoCircle className="inline mr-1 text-yellow-500" />;
    case "failed":
      return <FaTimes className="inline mr-1 text-red-500" />;
    case "canceled":
      return <FaTimesCircle className="inline mr-1 text-gray-400" />;
    case "refunded":
      return <FaInfoCircle className="inline mr-1 text-blue-500" />;
    default:
      return null;
  }
};

function Profile() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user || {});
  const { orders } = useAppSelector((state) => state.order);

  useEffect(() => {
    dispatch(fetchUserDetails());
    dispatch(fetchOrdersByUser());
  }, [dispatch]);

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-semibold text-gray-900">My Account</h1>
        <p className="text-sm text-gray-500">
          Your eSIMs, personal details, and subscription settings — all in one place.
        </p>
      </div>

      {/* Profile Info Card */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-200">
            {user?.profilePic ? (
              <Image
                src={user.profilePic}
                alt="Profile"
                width={56}
                height={56}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-3xl font-bold">
                {user?.firstName?.[0] || "U"}
              </div>
            )}
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-lg">
              {user?.firstName} {user?.lastName}
            </div>
            <div className="text-gray-600 text-sm flex flex-wrap items-center gap-2">
              <span>{user?.email}</span>
              {user?.phone && (
                <>
                  <span>•</span>
                  <span>{user?.phone}</span>
                </>
              )}
              {user?.country && (
                <>
                  <span>•</span>
                  <span>{user?.country}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <button className="text-sm text-gray-600 border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50">
          Edit Profile
        </button>
      </div>

      {/* Purchase History */}
      <div>
        <div className="flex flex-wrap items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-800 text-lg">Purchase History</h2>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Order No"
                className="pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 text-gray-600 focus:outline-none">
              <option>All Status</option>
              <option>Success</option>
              <option>Processing</option>
              <option>Failed</option>
              <option>Canceled</option>
              <option>Refunded</option>
            </select>
            <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 text-gray-600 focus:outline-none">
              <option>All Payment</option>
              <option>Credit Card</option>
              <option>Wallet</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Order No
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total Sim
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders?.length > 0 ? (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                orders.map((row: any, i: number) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm text-gray-800 font-medium">
                      {row.id?.slice(0, 5).toUpperCase()}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {dayjs(row.createdAt).format("MMM DD, YYYY")}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">{row.totalPlans}</td>
                    <td className="px-6 py-3 text-sm text-gray-800 font-semibold">
                      ${row.totalAmount?.toFixed(2)}
                    </td>
                    <td
                      className={`px-6 py-3 text-sm font-medium flex items-center gap-1 ${statusStyles[row.status?.toLowerCase()]}`}
                    >
                      {statusIcon(row.status)} {row.status}
                    </td>
                    <td className="px-6 py-3 text-right">
                      <button className="text-blue-600 text-sm font-medium hover:underline">
                        View Detail
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center text-gray-400 py-6">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Profile;
