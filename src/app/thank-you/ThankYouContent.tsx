"use client";

import { ActivateCard } from "@/components/cards/esimOrder/EsimScannerCard";
import { fetchOrderDetailsByUser } from "@/redux/slice/OrderSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EsimInfo from "@/components/cards/esimOrder/EsimInfo";
import moment from "moment";
import { fetchUserDetails } from "@/redux/slice/UserSlice";
import PurchaseSuccess from "@/components/cards/PurchaseThankyouCard";
import OrderSummary from "@/components/cards/esimOrder/OrderSummaryCard";
import RechargeHistory from "@/components/table/TopUpTable";

export default function ThankYouContent() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const mode = searchParams.get("mode");
    const orderId = searchParams.get("orderId");
    const { orderDetails, loading, error } = useAppSelector((state) => state?.order);

    useEffect(() => {
        if (orderId) {
            dispatch(fetchOrderDetailsByUser(orderId));
        }
    }, [dispatch, orderId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen text-lg font-medium text-neutral-600">
                Loading your order details...
            </div>
        );
    }

    return (
        <div className="max-w-full mx-auto px-4 md:px-10 py-6">
            {mode === "esim" ? (
                <PurchaseSuccess
                    isButton={true}
                    onViewQrCode={() => {
                        router.push(`/order/${orderId}`);
                    }}
                />
            ) : (
                <PurchaseSuccess
                    title="Recharge Successful"
                    description="Your eSIM has been recharged successfully. Enjoy uninterrupted connectivity and keep exploring without limits!"
                />
            )}
        </div>
    );
}
