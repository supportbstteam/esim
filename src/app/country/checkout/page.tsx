"use client";
import { api } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);
  const plan = searchParams.get("plan") as string | null;

  const fetchPlanById = async () => {
    try {
      const response = await api({
        url: `/user/plans/${plan}`,
      });
      setData(response);
    } catch (err) {
      console.error("Error in the fetch plan by Id", err);
    }
  };

  useEffect(() => {
    fetchPlanById();
  }, []);

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
                onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
            </span>
            <span className="font-medium text-base">{data?.country?.name || "Country"}</span>
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
              <span>{new Date().toLocaleString("en-US", { month: "short", day: "2-digit" })}</span>
            </div>
          </div>
          <div className="mt-6 border-t pt-4 flex justify-between font-semibold text-[#1e293b]">
            <span>Total</span>
            <span>${data?.price || "--"}</span>
          </div>
        </div>

        {/* Payment Method */}
        <div className="flex-2/3 bg-white rounded-xl shadow p-6">
          <button className="mb-3 text-sm text-gray-500 hover:text-gray-700 flex items-center">
            &larr; Back
          </button>
          <h3 className="font-semibold text-lg mb-4">Choose Payment Method</h3>
          <p className="text-gray-500 mb-6 text-sm">Select your preferred payment option</p>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between border rounded-lg p-4 hover:bg-gray-50 focus:outline-none">
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect width="18" height="12" x="3" y="6" rx="2" strokeWidth="2"></rect>
                  <path d="M3 10h18" strokeWidth="2"></path>
                </svg>
                Credit or Debit Card
              </span>
              <span className="text-gray-400">&rarr;</span>
            </button>
            <button className="w-full flex items-center justify-between border rounded-lg p-4 hover:bg-gray-50 focus:outline-none">
              <span className="flex items-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" className="w-5 h-5 mr-2" />
                Google Pay
              </span>
              <span className="text-gray-400">&rarr;</span>
            </button>
            <button className="w-full flex items-center justify-between border rounded-lg p-4 hover:bg-gray-50 focus:outline-none">
              <span className="flex items-center">
                <img src="https://upload.wikimedia.org/wikipedia/commons/4/46/Paypal_2014_logo.png" className="w-5 h-5 mr-2" />
                PayPal
              </span>
              <span className="text-gray-400">&rarr;</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
