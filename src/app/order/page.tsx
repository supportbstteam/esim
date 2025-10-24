"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchOrdersByUser } from "@/redux/slice/OrderSlice";
import { OrderCard } from "@/components/cards/orderCard";


const OrdersPage = () => {
    const dispatch = useAppDispatch();
    const { orders } = useAppSelector((state) => state.order);

    useEffect(() => {
        if (!orders || orders.length === 0) {
            dispatch(fetchOrdersByUser());
        }
    }, [dispatch, orders]);

    // console.log("---- order ---", orders);

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto px-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-8">My Orders</h1>
                {orders && orders.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            orders.map((order: any) => {

                                console.log("---- order in the map ----", order);
                                return (
                                    <OrderCard
                                        key={order.id}
                                        order={order}
                                    />
                                )
                            })}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No orders found.</p>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;
