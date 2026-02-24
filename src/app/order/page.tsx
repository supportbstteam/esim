"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchOrdersByUser } from "@/redux/slice/OrderSlice";
import OrderCard from "@/components/cards/orderCard";
import { fetchUserDetails } from "@/redux/slice/UserSlice";

const OrdersPage = () => {
    const dispatch = useAppDispatch();
    const { orders } = useAppSelector((state) => state.order);

    useEffect(() => {
        dispatch(fetchUserDetails());
        if (!orders || orders.length === 0) {
            dispatch(fetchOrdersByUser());
        }
    }, [dispatch, orders]);

    // console.log("---- order ---", orders);

    return (
        <div className="min-w-full min-h-full px-10 py-4" >

            <label className="font-bold text-3xl" >My Plans</label>
            <p className="text-gray-500">Manage your subscription plans and data usage</p>
            <div className="mt-6" >
                <div className="font-semibold text-md text-2xl" >Your E-Sims</div>
                {
                    orders && orders.length > 0 ? (
                        <div className=" grid-cols-3 gap-4 grid mt-3"  >
                            {orders.map((order) => (
                                order?.iccid && <OrderCard key={order?.id} order={order} />
                            ))}
                        </div>
                    ) : (
                        <p>No orders found.</p>
                    )
                }
            </div>
        </div>
    );
};

export default OrdersPage;
