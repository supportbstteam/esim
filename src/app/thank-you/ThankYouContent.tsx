"use client";

import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchOrderDetailsByUser } from "@/redux/slice/OrderSlice";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import PurchaseSuccess from "@/components/cards/PurchaseThankyouCard";
import { fetchCart } from "@/redux/slice/CartSlice";

export default function ThankYouContent() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const orderId = searchParams.get("orderId");

  const { orderDetails, loading, error } = useAppSelector((state) => state.order);

  const fetchingCart = async () => {
    await dispatch(fetchCart());
    console.log("dispatch 1");
  }
  // ✅ Fetch order details only for eSIM (not for topup)
  useEffect(() => {
    fetchingCart();
    if (mode === "esim" && orderId && orderId !== "failed") {
      dispatch(fetchOrderDetailsByUser(orderId));
    }
  }, [dispatch, orderId, mode]);

  if (loading && mode === "esim") {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-medium text-neutral-600">
        Loading your order details...
      </div>
    );
  }

  // 🧱 Handle failed or incomplete order case (for eSIM)
  if ((mode === "esim" && (orderId === "failed" || error))) {
    return (
      <div className="max-w-full mx-auto px-4 md:px-10 py-6">
        <PurchaseSuccess
          title="Order Failed ❌"
          description="Unfortunately, your eSIM order could not be processed. Please try again or contact support."
          isButton={false}
          onViewQrCode={() => router.push("/")}
        />
      </div>
    );
  }

  // ⚡ Handle Top-Up Mode (Simple Success Screen)
  if (mode === "topup") {
    return (
      <div className="max-w-full mx-auto px-4 md:px-10 py-6">
        <PurchaseSuccess
          title="Recharge Successful ⚡"
          description="Your eSIM has been recharged successfully. Enjoy uninterrupted connectivity and keep exploring without limits!"
          isButton={true}
          buttonText="Go to Home"
          onViewQrCode={async () => {
            await dispatch(fetchCart());
            console.log("dispatch t3");
            router.push("/")
          }}
        />
      </div>
    );
  }

  // 🧠 Handle eSIM Mode (Completed / Partial / Failed)
  const orderStatus = orderDetails?.status || "UNKNOWN";

  const getContent = () => {
    switch (orderStatus) {
      case "COMPLETED":
        return {
          title: "Order Successful 🎉",
          description:
            "Your eSIM has been successfully created. You can now view your QR code and start using your data plan.",
          buttonText: "View eSIM",
          isButton: true,
        };
      case "PARTIAL":
        return {
          title: "Partially Completed ⚠️",
          description:
            "Some of your eSIMs were created successfully, but a few failed. Please review the details in your order.",
          buttonText: "View Details",
          isButton: false,
        };
      case "FAILED":
        return {
          title: "Order Failed ❌",
          description:
            "We couldn’t create your eSIMs. Please contact support or retry your order.",
          buttonText: "Try Again",
          isButton: false,
        };
      default:
        return {
          title: "Order Processing",
          description: "We are currently processing your order. Please check back later.",
          buttonText: "Go Home",
          isButton: false,
        };
    }
  };

  const content = getContent();

  return (
    <div className="max-w-full mx-auto px-4 md:px-10 py-6">
      <PurchaseSuccess
        title={content.title}
        description={content.description}
        isButton={content.isButton}
        buttonText={content.isButton ? content.buttonText : undefined}
        onViewQrCode={() => router.push(`/order/${orderId}`)}
      />
    </div>
  );
}
