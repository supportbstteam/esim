"use client";

import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchOrderDetailsByUser } from "@/redux/slice/OrderSlice";

const OrderDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { orderDetails } = useAppSelector((state) => state.order);
  const loading = useAppSelector((state) => state.order.loading);
  const error = useAppSelector((state) => state.order.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderDetailsByUser(id as string));
    }
  }, [id, dispatch]);

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Order Details</h1>

      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500 mb-4">Error: {error}</p>}

      {orderDetails ? (
        <div className="space-y-6 max-w-full mx-auto">
          <div>
            <span className="block text-gray-600 text-sm mb-1">Order ID</span>
            <p className="text-gray-900 font-semibold">{orderDetails.id}</p>
          </div>
          <div>
            <span className="block text-gray-600 text-sm mb-1">Name</span>
            <p className="text-gray-900 font-semibold">{orderDetails.name}</p>
          </div>
          <div>
            <span className="block text-gray-600 text-sm mb-1">Status</span>
            <p className="text-blue-700 font-semibold">{orderDetails.status}</p>
          </div>
          <div>
            <span className="block text-gray-600 text-sm mb-1">Total Amount</span>
            <p className="text-gray-900 font-semibold">{orderDetails.totalAmount}</p>
          </div>
          <div>
            <span className="block text-gray-600 text-sm mb-1">Transaction ID</span>
            <p className="text-gray-900 font-semibold">
              {orderDetails.transaction?.transactionId || "-"}
            </p>
          </div>
          <div>
            <span className="block text-gray-600 text-sm mb-1">eSIMs</span>
            <div className="space-y-4">
              {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                orderDetails.esims.map((sim: any) => (
                  <div
                    key={sim.id}
                    className="p-4 rounded-md border border-gray-300 bg-gray-50"
                  >
                    <p className="text-gray-700">
                      <span className="font-semibold text-indigo-700">Product:</span>{" "}
                      {sim.productName}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold text-indigo-700">Price:</span>{" "}
                      {sim.price}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold text-indigo-700">Status:</span>{" "}
                      {sim.statusText}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-semibold text-indigo-700">Valid Until:</span>{" "}
                      {sim.endDate}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ) : (
        !loading && (
          <p className="text-center text-gray-500">No order details found.</p>
        )
      )}
    </div>
  );
};

export default OrderDetails;
