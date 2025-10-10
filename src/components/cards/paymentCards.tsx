"use client";
import { useState } from "react";
import { FaCreditCard, FaPaypal, FaBitcoin } from "react-icons/fa";
import { SiPhonepe, SiGooglepay } from "react-icons/si";

interface PaymentMethodSelectorProps {
  onSelect: (method: string) => void;
  selected?: string;
}

const paymentMethods = [
  {
    id: "upi",
    label: "UPI (Google Pay / PhonePe)",
    icon: <SiGooglepay className="text-blue-600 text-2xl" />,
  },
  {
    id: "card",
    label: "Credit / Debit Card",
    icon: <FaCreditCard className="text-indigo-600 text-2xl" />,
  },
  {
    id: "paypal",
    label: "PayPal",
    icon: <FaPaypal className="text-sky-600 text-2xl" />,
  },
  {
    id: "crypto",
    label: "Crypto (BTC / ETH / USDT)",
    icon: <FaBitcoin className="text-amber-500 text-2xl" />,
  },
];

export default function PaymentMethodSelector({
  onSelect,
  selected,
}: PaymentMethodSelectorProps) {
  const [chosen, setChosen] = useState<string>(selected || "");

  const handleSelect = (id: string) => {
    setChosen(id);
    onSelect(id);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-5 text-center">
        Choose Payment Method
      </h2>

      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <button
            key={method.id}
            onClick={() => handleSelect(method.id)}
            className={`w-full flex items-center justify-between border rounded-xl px-4 py-3 text-left transition-all ${
              chosen === method.id
                ? "border-blue-600 bg-blue-50 shadow-sm"
                : "border-gray-300 hover:border-blue-400"
            }`}
          >
            <div className="flex items-center gap-3">
              {method.icon}
              <span className="text-gray-800 text-sm font-medium">
                {method.label}
              </span>
            </div>

            {chosen === method.id && (
              <span className="text-blue-600 font-semibold text-sm">
                Selected
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          disabled={!chosen}
          onClick={() => onSelect(chosen)}
          className={`w-full py-2 rounded-xl text-white font-semibold ${
            chosen ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
