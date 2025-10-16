"use client";
import { Suspense } from "react";
import CheckoutDetailPage from "./checkoutDetailPage";
import { useAppSelector } from "@/redux/store";

export default function CheckoutPage() {

  const {user} = useAppSelector(state=>state?.user);

  // console.log("---- user -----", user);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutDetailPage />
    </Suspense>
  );
}
