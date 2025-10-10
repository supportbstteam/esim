"use client";
import { useEffect, useState } from "react";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  esimData?: any;
  isLoading: boolean;
  errorState?: string | null;
}

export default function OrderModal({
  isOpen,
  onClose,
  esimData,
  isLoading,
  errorState,
}: OrderModalProps) {
  const [message, setMessage] = useState("Processing your eSIM...");

  useEffect(() => {
    if (!isOpen || errorState) return;

    const steps = [
      "Connecting to eSIM provider...",
      "Verifying your plan details...",
      "Creating your eSIM profile...",
      "Almost done — finalizing setup...",
      "Activating your eSIM...",
    ];

    let i = 0;
    const interval = setInterval(() => {
      setMessage(steps[i]);
      i = (i + 1) % steps.length;
    }, 2000);

    return () => clearInterval(interval);
  }, [isOpen, errorState]);

  if (!isOpen) return null;

  console.log("--- esim data ----", esimData);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-10 w-[95%] max-w-2xl shadow-2xl relative text-center transition-all">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-lg"
        >
          ✕
        </button>

        {isLoading ? (
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs text-blue-600 font-semibold">⏳</span>
              </div>
            </div>
            <p className="text-lg font-medium text-gray-800 animate-pulse">
              {message}
            </p>
            <p className="text-sm text-gray-500 max-w-md">
              Please wait while we securely generate your eSIM profile.  
              This may take a few moments.
            </p>
          </div>
        ) : errorState ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-red-600">⚠️ eSIM Creation Failed</h2>
            <p className="text-gray-600 text-base leading-relaxed max-w-md mx-auto">
              {errorState}
            </p>
            <p className="text-sm text-gray-500 mt-3">
              You can check your order status from your account dashboard.
            </p>
            <button
              onClick={onClose}
              className="mt-6 px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
            >
              Close
            </button>
          </div>
        ) : esimData ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-green-600">
              🎉 eSIM Created Successfully!
            </h2>
            <p className="text-gray-600 text-base">
              Your eSIM is now active and ready to use.
            </p>

            <div className="bg-gray-50 border border-gray-100 p-5 rounded-xl text-left text-sm mt-3">
              <p><strong>eSIM ID:</strong> {esimData.id || "—"}</p>
              <p><strong>Plan:</strong> {esimData.planName || "—"}</p>
              <p><strong>Data:</strong> {esimData.dataAllowance || "—"}</p>
              <p><strong>Country:</strong> {esimData.country || "—"}</p>
            </div>

            <button
              onClick={onClose}
              className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Close
            </button>
          </div>
        ) : (
          <p className="text-center text-gray-600 text-base">
            No eSIM data available.
          </p>
        )}
      </div>
    </div>
  );
}
