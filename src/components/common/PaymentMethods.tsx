"use client";

import React, { useState } from "react";

export interface PaymentMethod {
  id: string;
  name: string;
  subHead: string;
  icon: React.ReactNode;
}

interface PaymentMethodsProps {
  methods?: PaymentMethod[]; // Allow override of default methods
  onSelect?: (method: PaymentMethod) => void;
  defaultMethodId?: string;
}

const defaultPaymentMethods: PaymentMethod[] = [
  // {
  //   id: "cod",
  //   name: "Cash On Delivery",
  //   subHead: "Pay using COD",
  //   icon: (
  //     <svg
  //       className="w-5 h-5 mr-2 text-gray-600"
  //       fill="none"
  //       stroke="currentColor"
  //       viewBox="0 0 24 24"
  //     >
  //       <rect width="18" height="12" x="3" y="6" rx="2" strokeWidth="2"></rect>
  //       <path d="M3 10h18" strokeWidth="2"></path>
  //     </svg>
  //   ),
  // },
  {
    id: "stripe",
    name: "Pay Online",
    subHead: "Pay using STRIPE",
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

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  methods = defaultPaymentMethods,
  onSelect,
  defaultMethodId,
}) => {
  const [selected, setSelected] = useState("");

  const handleSelect = (method: PaymentMethod) => {
    setSelected(method.id);
    if (onSelect) onSelect(method);
  };

  return (
    <div className="space-y-3">
      {methods.map((method) => (
        <div
          key={method.id}
          className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition 
            ${selected === method.id ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:bg-gray-50"}`}
          onClick={() => handleSelect(method)}
        >
          <div className="flex items-center">
            {method.icon}
            <div>
              <h4 className="font-medium text-gray-800">{method.name}</h4>
              <p className="text-sm text-gray-500">{method.subHead}</p>
            </div>
          </div>
          <div
            className={`w-4 h-4 rounded-full border-2 ${selected === method.id
              ? "border-blue-600 bg-blue-600"
              : "border-gray-400"
              }`}
          />
        </div>
      ))}
    </div>
  );
};

export default PaymentMethods;
