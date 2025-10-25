import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SimCard = ({ order }: any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const router: any = useRouter();
  console.log("---- order card ----", order);


  const handleRecharge = () => {
    if (!order?.id) return;
    router.push(`/e-sim/top-up?simId=${order.id}`);
  }


  return (
    <Link href={`/e-sim/${order?.id}`} className="block">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 w-full cursor-pointer">
        {/* Header with country flag and status */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-100 flex items-center justify-center bg-gray-50">
              {/* Replace with actual flag image */}
              <span className="text-2xl">🇧🇷</span>
              {/* Or use Next.js Image component:
              <Image 
                src={order?.flagUrl || "/flags/default.png"} 
                alt={order?.country}
                width={48}
                height={48}
                className="object-cover"
              />
              */}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-base">
                {order?.order?.country?.name || ""}
              </h3>
              <p className="text-sm text-gray-500">{order?.planName || "Standard"}</p>
            </div>
          </div>
          <span className={`${order?.networkStatus !== "NOT_ACTIVE" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"} text-xs font-medium px-3 py-1 rounded-full`}>
            {order?.networkStatus === "NOT_ACTIVE" ? "Inactive" : "Active"}
          </span>
        </div>

        {/* SIM Number */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">iccid no</p>
          <p className="text-sm font-medium text-gray-900">
            {order?.iccid || ""}
          </p>
        </div>

        {/* Data Usage Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                />
              </svg>
              <span>Data Usage</span>
            </div>
            <span className="text-xs font-medium text-gray-900">
              {order?.usedData || 0} GB / {order?.dataAmount || 0}GB
            </span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((order?.usedData || 0) / (order?.dataAmount || 0)) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Start Date and End Date */}
        <div className="flex justify-between items-center mb-4 gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-500 flex-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div>
              <span className="block">Start: {order?.startDate || "Dec 1,2024"}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 flex-1">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <div>
              <span className="block">Start: {order?.endDate || "Dec 1,2024"}</span>
            </div>
          </div>
        </div>

        {/* Footer with buttons */}
        <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
          <button className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-2.5 px-4 rounded-lg text-sm transition-colors">
            View Detail
          </button>
          <button onClick={(e) => {
            e.preventDefault(); // prevent Link navigation
            e.stopPropagation(); // stop event from bubbling up
            handleRecharge();    // call your function
          }} className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors">
            Recharge
          </button>
        </div>
      </div>
    </Link>
  );
};
