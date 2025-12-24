"use client";

import { api } from "@/lib/api";
import { PayPalButtons } from "@paypal/react-paypal-js";

interface PayPalButtonProps {
  amount: string;
  cartId?: string;
  topupId?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onApprove: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setTransactionId: any;
}

export default function PayPalButton({ amount, onSuccess, onApprove, setTransactionId, cartId, topupId }: PayPalButtonProps) {
  return (
    <PayPalButtons
      style={{ layout: "vertical", disableMaxWidth:true }}
      className="paypal-button-container "

      createOrder={async () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response: any = await api({
          url: "user/paypal/create-order",
          method: "POST",
          data: {
            amount,
            cartId,
            topupId
          },
        });

        if (response?.transactionId) {
          setTransactionId(response?.transactionId);
        }

        // console.log("PayPal backend order:", response);

        // 🔥 RETURN BACKEND PAYPAL ORDER ID
        return response.paypalOrderId;
      }}

      onApprove={async (data) => {
        console.log("Approved PayPal orderID:", data.orderID);

        // 🔥 Capture SAME order on backend
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response: any = await api({
          method: "POST",
          url: "user/paypal/capture-order",
          data: {
            paypalOrderId: data.orderID,
          },
        });

        console.log("Capture response:", response);

        if (response?.status === "SUCCESS") {
          console.log(" -------- Hello ----")
          setTransactionId(response?.transactionId);
          onSuccess(response?.transactionId);
        }
        return;

        // now create your order (same as Stripe)
        // await handleOnSuccess();
      }}

      onError={(err) => {
        console.error("PayPal Error:", err);
      }}
    />
  );
}
