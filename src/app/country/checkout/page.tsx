"use client";
import { Suspense } from "react";
import CheckoutDetailPage from "./checkoutDetailPage";
import { useAppSelector } from "@/redux/store";
import ProtectedRoute from "@/components/hooks/ProtectedRoute";

export default function CheckoutPage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<div>Loading...</div>}>
        <CheckoutDetailPage />
      </Suspense>
    </ProtectedRoute>
  );
}
