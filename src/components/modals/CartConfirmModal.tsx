"use client";

import React from "react";
import { ModalWrapper } from "./ModalWrapper";
import { useAppSelector } from "@/redux/store";

interface FailedPlan {
  planId: string;
  planName?: string;
  reason: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  failedPlans: FailedPlan[];
  onContinue: () => void;
  onRemoveAdded: () => void;
}

const CartConfirmModal: React.FC<Props> = ({
  isOpen,
  onClose,
  failedPlans,
  onContinue,
  onRemoveAdded,
}) => {
    // const {cart, failedPlans} = useAppSelector(state =>state?.cart);
  return (
    <ModalWrapper
      title="Some Plans Could Not Be Added"
      isOpen={isOpen}
      onClose={onClose}
      widthClass="max-w-lg"
      footer={
        <div className="flex gap-3 justify-between items-center">
          <button
            onClick={onRemoveAdded}
            className="px-4 py-2 rounded-lg flex-1/2 border border-red-300 text-red-600 hover:bg-red-50"
          >
            Remove Cart
          </button>

          <button
            onClick={onContinue}
            className="px-4 py-2 rounded-lg flex-1/2 bg-[#38c852] text-white hover:bg-green-700"
          >
            Continue Anyway
          </button>
        </div>
      }
    >
      <div className="space-y-3">
        <p className="text-sm text-gray-600">
          Your {failedPlans.length} plan{failedPlans.length > 1 ? "s" : ""} could not be added to the cart.{failedPlans.length > 1 ? "s" : ""}:  
        </p>

        <div className="bg-gray-100 rounded-lg p-3 max-h-60 overflow-auto">
          {failedPlans.map((plan, index) => (
            <div
              key={index}
              className="border-b last:border-none py-2 text-sm"
            >
              <div className="font-medium">
                {plan.planName || `Plan ${plan.planId}`}
              </div>
              <div className="text-gray-500 text-xs">
                {plan.reason}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ModalWrapper>
  );
};

export default CartConfirmModal;