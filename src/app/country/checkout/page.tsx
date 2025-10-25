"use client";
import { Suspense } from "react";
import CheckoutDetailPage from "./checkoutDetailPage";
import { useAppSelector } from "@/redux/store";

export default function CheckoutPage() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutDetailPage />
    </Suspense>
  );
}
