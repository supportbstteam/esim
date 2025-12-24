"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ReduxProvider from "@/providers/reduxProvider";
import { Toaster } from "react-hot-toast";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!,
          currency: "USD",
          intent: "capture",
        }}
      >
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: { fontFamily: "inherit" },
          }}
        />
        {children}
      </PayPalScriptProvider>
    </ReduxProvider>
  );
}
