"use client";

import React from "react";
import { FaArrowLeft } from "react-icons/fa6";
import PaymentMethods, { PaymentMethod } from "@/components/common/PaymentMethods";
import { Elements } from "@stripe/react-stripe-js";
import StripeForm from "@/components/form/StripeForm";
import { loadStripe } from "@stripe/stripe-js";
import PayPalButton from "../buttons/PayPalButtonts";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentSectionProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // cart: any;
    loading: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    selectedMethod: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setTransactionId: any;
    onSelect: (method: PaymentMethod) => void;
    onProceed: () => void;
    onSuccess: () => void;
    clientSecret?: string | null;
    transactionId?: string | null;
    transaction?: string | null;
    onBack: () => void;
    topupId: string;
    esimId: string;
    amount: string;
}

const PaymentSection: React.FC<PaymentSectionProps> = ({
    // cart,
    loading,
    selectedMethod,
    onSelect,
    onProceed,
    clientSecret,
    transaction,
    transactionId,
    onSuccess,
    onBack,
    setTransactionId,
    topupId,
    amount,
    esimId
}) => {

    // console.log("-=-=-=-=--=- topupId- -=-=-=--=-=", topupId);

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

            {
                selectedMethod && selectedMethod.id === "stripe" && <div className="my-6">
                    <button
                        onClick={onProceed}
                        disabled={loading}
                        className="bg-black text-white px-6 py-3 rounded-md w-full hover:bg-gray-800 transition"
                    >
                        {loading ? "Processing..." : "Proceed to Pay"}
                    </button>
                </div>
            }

            {selectedMethod && selectedMethod?.id === "paypal" && (
                <div className="flex min-w-full items-center justify-center mt-10">
                    <div className="w-full max-w-full">
                        <PayPalButton
                            setTransactionId={setTransactionId}
                            topupId={topupId}
                            esimId={esimId}
                            amount={amount}
                            onSuccess={(id:string)=>{
                                setTransactionId(id);
                                onSuccess()
                            }}
                            onApprove={(id: string) => {

                            }}

                        // cartId={cart?.id}
                        // amount={grandTotal.toFixed(2)} 
                        // onSuccess={(id: string) => {
                        //     // setTransactionId(id);
                        //     if (transactionId)
                        //         // handleOnSuccess()
                        // }}
                        // onApprove={handlePayPalApproval}

                        />
                    </div>
                </div>
            )}


            {/* Stripe Form */}
            {selectedMethod && selectedMethod?.id === "stripe" && clientSecret && transactionId && (
                <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <StripeForm
                        clientSecret={clientSecret}
                        transactionId={transactionId}
                        transaction={transaction || ""}
                        onSuccess={onSuccess}
                    />
                </Elements>
            )}
        </div>
    );
};

export default PaymentSection;
