"use client";

import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/store";
import { fetchOrderDetailsByUser } from "@/redux/slice/OrderSlice";

const OrderDetails = () => {
  const { id } = useParams(); // ✅ get route param (e.g. /order/123)
  const router = useRouter(); // ✅ optional, for navigation
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderDetailsByUser(id as string));
    }
  }, [id, dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-2">Order Details</h1>
      {id ? (
        <p>Loading order details for ID: <strong>{id}</strong></p>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default OrderDetails;
