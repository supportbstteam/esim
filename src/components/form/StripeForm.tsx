"use client";

import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { api } from "@/lib/api";

interface StripeFormProps {
  clientSecret: string;
  transactionId: string; // ID of the transaction created in your backend
  transaction: string; // ID of the transaction created in your backend
  onSuccess?: () => void;
}

const StripeForm: React.FC<StripeFormProps> = ({ clientSecret, transactionId, transaction, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handlePayNow = async () => {
    if (!stripe || !elements) {
      toast.error("Stripe has not loaded yet. Please try again.");
      return;
    }

    setLoading(true);

    try {
      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin + "/payment-success",
        },
        redirect: "if_required",
      });

      if (error) {
        toast.error(error.message || "Payment failed.");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        toast.success("Payment successful!");

        // Update transaction status in backend
        try {
          await api({
            url: `/user/transactions/${transaction}/success`,
            method: "POST",
          });
        } catch (err) {
          console.error("Failed to update transaction status", err);
        }

        // Optional success callback
        onSuccess?.();
      }
    } catch (err) {
      console.error("Stripe payment error:", err);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <PaymentElement />
      <button
        type="button"
        onClick={handlePayNow}
        disabled={loading}
        className="mt-4 w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default StripeForm;
