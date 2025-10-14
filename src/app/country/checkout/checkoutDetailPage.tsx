"use client";
import { useNavigate } from "@/components/hooks/navigation";
import AuthModal from "@/components/modals/AuthModal";
import OrderModal from "@/components/modals/orderModal";
import { api } from "@/lib/api";
import { userOrder } from "@/lib/pageFunction";
import { fetchUserDetails } from "@/redux/slice/UserSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa6";

export default function CheckoutDetailPage() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") as string | null;
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [esimData, setEsimData] = useState<any>(null);
  const [errorState, setErrorState] = useState<string | null>(null);
  const { user, isAuth } = useAppSelector((state) => state?.user);


  // user is logged in
  const [showlogin, setShowlogin] = useState(false);

  // Fetch plan info
  const fetchPlanById = async () => {
    try {
      const response = await api({
        url: `/user/plans/${plan}`,
      });
      await dispatch(fetchUserDetails());

      console.log(` -----/user/plans/${plan} ------`, response)
      setData(response);
    } catch (err) {
      console.error("Error fetching plan by Id", err);
    }
  };

  console.log("---- data in the checkout ----", data);
  console.log("---- esim data in the checkout ----", esimData);

  // Handle payment click
  const handlePaymentClick = async (method: string) => {

    if (!isAuth) {
      setShowlogin(true);
      return;
    }

    setModalOpen(true);
    setErrorState(null);
    setEsimData(null);
    setLoading(true);

    try {
      const response = await userOrder(
        {
          planId: plan || "",
        },
        setLoading
      );

      console.log("----- response in the order ----", response);

      // Handle null or failed response
      if (!response || response.status !== "success") {
        setErrorState(
          "We couldn’t create your eSIM at the moment. Your payment will be redirected to your account, and our executive will contact you soon."
        );
        setLoading(false);
        return;
      }

      // toast.success("Congratulations for Esim");
      // Simulate eSIM creation success
      setEsimData(response?.data);
      setLoading(false);
      // setTimeout(() => {
      // }, 7000);
    } catch (err) {
      console.error("Payment failed:", err);
      setErrorState(
        "An unexpected error occurred. Please check your payment status or try again later."
      );
      setLoading(false);
    }
  };

  // console.log("---- data ----", data);

  useEffect(() => {
    fetchPlanById();
  }, []);

  // const paymentMethods = [
  //   {
  //     id: "card",
  //     name: "Credit or Debit Card",
  //     icon: (
  //       <svg
  //         className="w-5 h-5 mr-2 text-gray-600"
  //         fill="none"
  //         stroke="currentColor"
  //         viewBox="0 0 24 24"
  //       >
  //         <rect width="18" height="12" x="3" y="6" rx="2" strokeWidth="2"></rect>
  //         <path d="M3 10h18" strokeWidth="2"></path>
  //       </svg>
  //     ),
  //   },
  //   {
  //     id: "gpay",
  //     name: "Google Pay",
  //     icon: (
  //       <img
  //         src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
  //         className="w-5 h-5 mr-2"
  //       />
  //     ),
  //   },
  //   {
  //     id: "paypal",
  //     name: "PayPal",
  //     icon: (
  //       <img
  //         src="https://upload.wikimedia.org/wikipedia/commons/4/46/Paypal_2014_logo.png"
  //         className="w-5 h-5 mr-2"
  //       />
  //     ),
  //   },
  // ];

  const paymentMethods = [
    {
      id: "card",
      name: "Cash On Delivery",
      icon: (
        <svg
          className="w-5 h-5 mr-2 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <rect width="18" height="12" x="3" y="6" rx="2" strokeWidth="2"></rect>
          <path d="M3 10h18" strokeWidth="2"></path>
        </svg>
      ),
    },
  ];

  const handleBack = () => {
    router.back();
  }

  return (
    <div className="container my-10">
      <div className="flex flex-col md:flex-row w-full gap-6">
        {/* Order Summary */}
        <div className="flex-1/3 bg-[#f8fafc] rounded-xl shadow p-6">
          <h2 className="font-semibold text-lg mb-4">Your Order</h2>
          <div className="flex items-center mb-5">
            <span className="mr-3">
              <img
                src={`https://flagcdn.com/48x36/${data?.country?.isoCode?.toLowerCase()}.png`}
                alt={data?.country?.name}
                className="rounded shadow border w-7 h-7 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </span>
            <span className="font-medium text-base">
              {data?.country?.name || "Country"}
            </span>
          </div>
          <div className="space-y-4 text-[15px] text-gray-700">
            <div className="flex justify-between">
              <span>Data Allowance</span>
              <span>{data?.title || data?.data || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span>Validity</span>
              <span>{data?.validityDays || "—"} Days</span>
            </div>
            <div className="flex justify-between">
              <span>Starting Date</span>
              <span>
                {new Date().toLocaleString("en-US", {
                  month: "short",
                  day: "2-digit",
                })}
              </span>
            </div>
          </div>
          <div className="mt-6 border-t pt-4 flex justify-between font-semibold text-[#1e293b]">
            <span>Total</span>
            <span>${data?.price || "--"}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="flex-2/3 bg-white rounded-xl shadow p-6">
          <button onClick={handleBack} className="mb-3 text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
            <FaArrowLeft />
            Back
          </button>
          <h3 className="font-semibold text-lg mb-4">Choose Payment Method</h3>
          <p className="text-gray-500 mb-6 text-sm">
            Select your preferred payment option
          </p>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => handlePaymentClick(method.id)}
                className="w-full flex items-center justify-between border rounded-lg p-4 hover:bg-gray-50 focus:outline-none"
              >
                <span className="flex items-center">
                  {method.icon}
                  {method.name}
                </span>
                <span className="text-gray-400">&rarr;</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Order Modal */}
      <OrderModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        esimData={esimData}
        isLoading={loading}
        errorState={errorState}
      />

      {
        showlogin && (
          <AuthModal isOpen={showlogin} onClose={() => setShowlogin(false)} onAuthSuccess={() => setShowlogin(false)} />
        )
      }
    </div>
  );
}
