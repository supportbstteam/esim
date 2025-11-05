"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchUserDetails } from "@/redux/slice/UserSlice";
import { fetchOrdersByUser } from "@/redux/slice/OrderSlice";
import Image from "next/image";
import dayjs from "dayjs";
import {
  FaCheckCircle,
  FaInfoCircle,
  FaTimes,
  FaTimesCircle,
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { EditProfileModal } from "@/components/modals/EditProfileModal";
import { ChangePasswordModal } from "@/components/modals/ChangePasswordModal";
import { api } from "@/lib/api";
import toast from "react-hot-toast";
import { OrderDetailModal } from "@/components/modals/OrderDetailsModal";
import { ClaimRefundModal } from "@/components/modals/ClaimFundModal";
import { useRouter } from "next/navigation";
import { postUserClaimRefund } from "@/lib/pageFunction";

const statusStyles: Record<string, string> = {
  completed: "text-green-600",
  partial: "text-yellow-600",
  failed: "text-red-600",
  canceled: "text-gray-400",
  refunded: "text-blue-600",
};

const statusIcon = (status: string) => {
  switch (status?.toLowerCase()) {
    case "completed":
      return <FaCheckCircle className="inline mr-1 text-green-500" />;
    case "partial":
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
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user || {});
  const { orders } = useAppSelector((state) => state.order);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [editModal, setEditModal] = useState(false);
  const [orderDetailModal, setOrderDetailModal] = useState(false);
  const [orderErrorModal, setOrderErrorModal] = useState(false);
  const [changePasswordModal, setChangePasswordModal] = useState(false);

  // Filter + Search
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    dispatch(fetchUserDetails());
    dispatch(fetchOrdersByUser());
  }, [dispatch]);

  // ✅ Filter + Search Logic
  const filteredOrders = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return orders?.filter((order: any) => {
      const matchesStatus =
        statusFilter === "All" ||
        order.status?.toLowerCase() === statusFilter.toLowerCase();

      const matchesSearch =
        order.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(order.id).toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [orders, statusFilter, searchQuery]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUpdateUser = async (values: any) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await api({
        url: "user/update",
        method: "PUT",
        data: {
          firstName: values?.firstName,
          lastName: values?.lastName,
          phone: values?.contact,
          email: values?.email,
          country: values?.location,
          password: values?.newPassword,
          currentPassword: values?.currentPassword,
        },
      });

      if (response?.status === "success") {
        toast.success("User Updated Successfully");
        dispatch(fetchUserDetails());
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error updating user:", err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl font-semibold text-gray-900">My Account</h1>
        <p className="text-sm text-gray-500">
          Your eSIMs, personal details, and subscription settings — all in one
          place.
        </p>
      </div>

      {/* Profile Info */}
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
        <div className="flex flex-col items-start sm:items-end gap-2">
          <button
            onClick={() => setEditModal(true)}
            className="text-sm text-gray-600 border border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-50 transition"
          >
            Edit Profile
          </button>
          <button
            onClick={() => setChangePasswordModal(true)}
            className="text-sm text-red-500 font-medium hover:underline"
          >
            Change Password
          </button>
        </div>
      </div>

      {/* Purchase History */}
      <div>
        <div className="flex flex-wrap items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-800 text-lg">
            Purchase History
          </h2>
          <div className="flex flex-wrap items-center gap-3">
            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by Order No"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-2 text-gray-600 focus:outline-none"
            >
              <option value="All">All Status</option>
              <option value="Completed">COMPLETED</option>
              <option value="Partial">PARTIAL</option>
              <option value="Failed">FAILED</option>
              <option value="Canceled">CANCELED</option>
              <option value="Refunded">REFUNDED</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                {["Order No", "Date", "Total Sim", "Total Amount", "Status", "Action"].map(
                  (col) => (
                    <th
                      key={col}
                      className={`px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider ${
                        col === "Action" ? "text-right" : ""
                      }`}
                    >
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders?.length > 0 ? (
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                filteredOrders.map((row: any, i: number) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-3 text-sm text-gray-800 font-medium">
                      {row?.code?.slice(0, 10).toUpperCase()}
                      {row?.code.length > 10 ? "..." : ""}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {dayjs(row.createdAt).format("MMM DD, YYYY")}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-600">
                      {row.totalPlans}
                    </td>
                    <td className="px-6 py-3 text-sm text-gray-800 font-semibold">
                      ${(parseFloat(row.totalAmount)?.toFixed(2)).toString()}
                    </td>
                    <td
                      className={`px-6 py-3 text-sm font-medium flex items-center gap-1 ${statusStyles[
                        row.status?.toLowerCase()
                      ]}`}
                    >
                      {statusIcon(row.status)} {row.status?.toUpperCase()}
                    </td>
                    <td className="px-6 py-3 text-right">
                      <button
                        onClick={() => {
                          setSelectedOrder(row);
                          if (
                            ["completed", "partial"].includes(
                              row.status?.toLowerCase()
                            )
                          ) {
                            router.push(`/order/${row?.id}`);
                          } else {
                            setOrderErrorModal(true);
                          }
                        }}
                        className="text-blue-600 text-sm font-medium hover:underline"
                      >
                        View Detail
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center text-gray-400 py-6 text-sm"
                  >
                    No orders match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <EditProfileModal
        isOpen={editModal}
        onClose={() => setEditModal(false)}
        onSubmit={handleUpdateUser}
      />

      <ChangePasswordModal
        isOpen={changePasswordModal}
        onClose={() => setChangePasswordModal(false)}
        onSubmit={handleUpdateUser}
      />

      <OrderDetailModal
        orderDate=""
        orderNo={selectedOrder?.id}
        isOpen={orderDetailModal}
        onClose={() => setOrderDetailModal(false)}
      />

      <ClaimRefundModal
        orderDate={selectedOrder?.createdAt}
        onSubmit={async (values) => {
          await postUserClaimRefund({
            id: selectedOrder?.id,
            message: values?.comment,
          });
          setOrderErrorModal(false);
        }}
        orderNo={selectedOrder?.code}
        isOpen={orderErrorModal}
        onClose={() => setOrderErrorModal(false)}
      />
    </div>
  );
}

export default Profile;
