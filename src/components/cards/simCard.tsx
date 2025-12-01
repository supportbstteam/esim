"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ClaimRefundModal } from "../modals/ClaimFundModal";
import moment from "moment";

// Utility: map country names to ISO codes
const getCountryCode = (countryName: string | undefined): string | null => {
  if (!countryName) return null;
  const name = countryName.trim().toLowerCase();
  const map: Record<string, string> = {
    india: "in",
    usa: "us",
    "united states": "us",
    "united states of america": "us",
    uk: "gb",
    "united kingdom": "gb",
    canada: "ca",
    germany: "de",
    france: "fr",
    italy: "it",
    spain: "es",
    singapore: "sg",
    australia: "au",
    japan: "jp",
    brazil: "br",
    turkey: "tr",
    thailand: "th",
    uae: "ae",
    "united arab emirates": "ae",
    indonesia: "id",
    mexico: "mx",
    malaysia: "my",
    china: "cn",
    southkorea: "kr",
    vietnam: "vn",
  };

  return (
    map[name] ||
    map[name.replace(/\s+/g, "")] ||
    null
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SimCard = ({ order }: any) => {
  const router = useRouter();
  const [orderErrorModal, setOrderErrorModal] = useState(false);

  const handleRecharge = () => {
    if (!order?.id) return;
    router.push(`/e-sim/top-up?simId=${order.id}`);
  };

  const formatted = moment(order.startDate, "YYYY-MM-DD").format("MMM Do YY");
  // console.log("---- order in sim card ----", order?.startDate);

  const handleRefund = () => {
    if (!order?.id) return;
    router.push(`/refund?orderId=${order.id}`);
  };

  const isFailed = !order?.iccid && !order?.externalId;
  const countryName = order?.country?.name || "Unknown Country";
  const countryCode = getCountryCode(countryName);
  const flagUrl = countryCode
    ? `https://flagcdn.com/w80/${countryCode}.png`
    : "https://flagcdn.com/w80/un.png"; // fallback flag


  // if (!order?.externalId)
  //   console.log("--- esim cart ----", order);

  return (
    <Link href={isFailed ? "#" : `/e-sim/${order?.id}`} className="block">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 w-full cursor-pointer">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center">
              {countryCode ? (
                <img
                  src={flagUrl}
                  alt={`${countryName} flag`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <span className="text-xl">🌍</span> // fallback icon if no flag
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-base">
                {countryName}
              </h3>
              <p className="text-sm text-gray-500">
                {order?.planName || "Standard Plan"}
              </p>
            </div>
          </div>

          {isFailed ? (
            <span className="bg-red-50 text-red-600 text-xs font-medium py-1 rounded-full px-2">
              FAILED
            </span>
          ) : (
            <span
              className={`${order?.networkStatus !== "NOT_ACTIVE"
                ? "bg-green-50 text-green-600"
                : "bg-yellow-50 text-yellow-700"
                } text-xs font-medium px-3 py-1 rounded-full`}
            >
              {order?.networkStatus === "NOT_ACTIVE" ? "INACTIVE" : "ACTIVE"}
            </span>
          )}
        </div>

        {/* Body */}
        {isFailed ? (
          <div className="flex flex-col py-6">
            <p className="text-gray-500 text-sm text-center mb-4">
              This eSIM activation failed. You can claim a refund below.
            </p>

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
                  {order?.usedData || 0} GB / {order?.dataAmount || 0} GB
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-red-500 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((order?.usedData || 0) / (order?.dataAmount || 0)) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="flex justify-between items-center mb-1 gap-4 text-xs text-gray-500">
              <span>Start: {moment(order?.startDate ).format("MMM Do YY")|| "N/A"}</span>
              <span>End: {moment(order?.endDate ).format("MMM Do YY")|| "N/A"}</span>
            </div>
            <button
              className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-2.5 px-4 rounded-lg text-sm transition-colors"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push(`/e-sim/${order?.id}`);
              }}
            >
              View Details
            </button>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-1">ICCID No.</p>
              <p className="text-sm font-medium text-gray-900">
                {order?.iccid}
              </p>
            </div>

            {/* Data usage */}
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
                  {order?.usedData || 0} GB / {order?.dataAmount || 0} GB
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

            <div className="flex justify-between items-center mb-4 gap-4 text-xs text-gray-500">
              <span>Start: {formatted || "—"}</span>
              <span>End: {moment(order?.endDate, "YYYY-MM-DD").format("MMM Do YY") || "—"}</span>
            </div>

            <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
              <button
                className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-2.5 px-4 rounded-lg text-sm transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  router.push(`/e-sim/${order?.id}`);
                }}
              >
                View Details
              </button>

              {order?.iccid && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRecharge();
                  }}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2.5 px-4 rounded-lg text-sm transition-colors"
                >
                  Recharge
                </button>
              )}
            </div>
          </>
        )}
      </div>

      <ClaimRefundModal
        orderDate={order?.createdAt}
        onSubmit={async (values) => {
          console.log("----- values in the refund -----", values);
        }}
        orderNo={order?.order?.id}
        isOpen={orderErrorModal}
        onClose={() => {
          setOrderErrorModal(false)
        }}
      />

    </Link>
  );
};
