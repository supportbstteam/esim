"use client";

import React, { useEffect, useState } from "react";
import { FaPaypal, FaStripe } from "react-icons/fa";
import { Images } from "../Images";
import Image from 'next/image'
export interface PaymentMethod {
  id: string;
  name: string;
  subHead: string;
  icon: string;
}

interface PaymentMethodsProps {
  methods?: PaymentMethod[];
  onSelect?: (method: PaymentMethod) => void;
  defaultMethodId?: string;
}

const defaultPaymentMethods: PaymentMethod[] = [
  {
    id: "stripe",
    name: "Pay Online",
    subHead: "Pay using STRIPE",
    icon: "/svg/stripe.svg",
  },
  {
    id: "paypal",
    name: "Pay Online",
    subHead: "Pay using PAYPAL",
    icon: "/svg/paypal.svg",
  },
];

const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  methods = defaultPaymentMethods,
  onSelect,
  defaultMethodId,
}) => {
  const [selected, setSelected] = useState(defaultMethodId ?? "");

  useEffect(() => {
    if (defaultMethodId) {
      const method = methods.find(m => m.id === defaultMethodId);
      if (method && onSelect) onSelect(method);
    }
  }, [defaultMethodId, methods]);

  const handleSelect = (method: PaymentMethod) => {
    setSelected(method.id);
    onSelect?.(method);
  };

  return (
    <div className="space-y-3">
      {methods.map((method) => (
        <div
          key={method.id}
          onClick={() => handleSelect(method)}
          className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition
            ${selected === method.id
              ? "border-green-600 bg-green-50"
              : "border-gray-200 hover:bg-gray-50"
            }`}
        >
          <div className="flex items-center">
            {/* {method.icon} */}
            <Image src={method?.icon} alt="My Logo" width={30} height={30} />
            <div className="ml-2" >
              <h4 className="font-medium text-gray-800">{method.name}</h4>
              <p className="text-sm text-gray-500">{method.subHead}</p>
            </div>
          </div>
          <div
            className={`w-4 h-4 rounded-full border-2
              ${selected === method.id
                ? "border-green-600 bg-green-600"
                : "border-gray-400"
              }`}
          />
        </div>
      ))}
    </div>
  );
};

export default PaymentMethods;
