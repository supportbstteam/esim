"use client";

import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import PaymentMethods, { PaymentMethod } from "@/components/common/PaymentMethods";
import { Elements } from "@stripe/react-stripe-js";
import StripeForm from "@/components/form/StripeForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentSectionProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // cart: any;
    loading: boolean;
    selectedMethod: PaymentMethod | null;
    onSelect: (method: PaymentMethod) => void;
    onProceed: () => void;
    onSuccess: () => void;
    clientSecret?: string | null;
    transactionId?: string | null;
    onBack: () => void;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({
    // cart,
    loading,
    selectedMethod,
    onSelect,
    onProceed,
    clientSecret,
    transactionId,
    onSuccess,
    onBack,
}) => {

    return (
        <div className="w-full bg-white rounded-xl shadow px-5 md:px-8 py-6">
            <button
                onClick={onBack}
                className="mb-3 text-sm subtext hover:text-gray-700 flex items-center gap-2"
            >
                <FaArrowLeft />
                <span>Back</span>
            </button>

            <h3 className="font-semibold text-lg mb-6">Choose Payment Method</h3>
            <PaymentMethods onSelect={onSelect} defaultMethodId="stripe" />

            <div className="my-6">
                <button
                    onClick={onProceed}
                    disabled={loading}
                    className="bg-black text-white px-6 py-3 rounded-md w-full hover:bg-gray-800 transition"
                >
                    {loading ? "Processing..." : "Proceed to Pay"}
                </button>
            </div>

            {/* Stripe Form */}
            {selectedMethod?.id === "stripe" && clientSecret && transactionId && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <StripeForm
                        clientSecret={clientSecret}
                        transactionId={transactionId}
                        onSuccess={onSuccess}
                    />
                </Elements>
            )}
        </div>
    );
};

export default PaymentSection;
