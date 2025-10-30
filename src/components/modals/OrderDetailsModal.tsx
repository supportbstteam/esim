"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { ModalWrapper } from "./ModalWrapper";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchOrderDetailsByUser } from "@/redux/slice/OrderSlice";

interface EsimItem {
  id: string;
  iccid?: string;
  productName?: string;
  startDate?: string;
  endDate?: string;
  validityDays?: number;
  dataAmount?: number;
  price?: string;
  country?: { name: string; isoCode: string };
  isActive?: boolean;
  statusText?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  orderNo?: string;
  orderDate?: string;
}

export const OrderDetailModal: React.FC<Props> = ({
  isOpen,
  onClose,
  orderNo,
  orderDate,
}) => {
  const dispatch = useAppDispatch();
  const { orderDetails, loading } = useAppSelector((state) => state.order);

  useEffect(() => {
    if (orderNo) dispatch(fetchOrderDetailsByUser(orderNo));
  }, [dispatch, orderNo]);

  // console.log("----- order details -----",orderDetails);

  const transaction = orderDetails?.transaction;
  const esims: EsimItem[] = orderDetails?.esims || [];
  const totalSim = esims.length;
  const paymentStatus =
    transaction?.status === "SUCCESS" ? "Success" : "Failed";
  const paymentMode = transaction?.paymentGateway
    ? `Pay using ${transaction.paymentGateway.toUpperCase()}`
    : "—";

  return (
    <ModalWrapper
      title="Order Detail"
      isOpen={isOpen}
      onClose={onClose}
      widthClass="max-w-md sm:max-w-lg"
    >
      {/* Header */}
      <div className="grid grid-cols-3 text-sm text-gray-500 border-b pb-4 mb-4">
        <div>
          <div className="text-xs">Order No</div>
          <div className="font-semibold text-gray-900">{orderDetails?.id || orderNo}</div>
        </div>
        <div>
          <div className="text-xs">Order Date</div>
          <div className="font-semibold text-gray-900">
            {new Date(orderDate || orderDetails?.createdAt).toLocaleDateString(
              "en-US",
              { month: "short", day: "2-digit", year: "numeric" }
            )}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs">Total Sim</div>
          <div className="font-semibold text-gray-900">{totalSim}</div>
        </div>
      </div>

      {/* eSIM list */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {esims.map((sim) => (
          <div
            key={sim.id}
            className="flex items-center gap-3 border rounded-xl p-3 hover:shadow-sm transition"
          >
            {/* Flag */}
            <div className="w-10 h-10 flex-shrink-0 overflow-hidden rounded-full bg-gray-100 border">
              {sim.country?.isoCode ? (
                <Image
                  src={`https://flagcdn.com/w40/${sim.country.isoCode.toLowerCase()}.png`}
                  alt={sim.country.name}
                  width={40}
                  height={40}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                  🌐
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-gray-900 truncate">
                {sim.iccid ? `${sim.iccid.slice(-10)}...` : "No eSIM Assigned"}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {sim.country?.name || "—"}
              </div>
            </div>

            {/* Plan */}
            <div className="text-right text-xs text-gray-600">
              <div>{sim.productName}</div>
              <div className="text-gray-400">
                {sim.dataAmount
                  ? `${sim.dataAmount}GB / ${sim.validityDays} Days / $${sim.price}`
                  : "—"}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Info */}
      <div className="mt-6 space-y-2 text-sm text-gray-600">
        <div className="flex justify-between">
          <span>Payment Status</span>
          <span
            className={`font-medium ${
              paymentStatus === "Success" ? "text-green-500" : "text-red-500"
            }`}
          >
            {paymentStatus}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Total Payment</span>
          <span className="font-semibold text-gray-900">
            ${orderDetails?.totalAmount || transaction?.amount || "0.00"}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Payment Mode</span>
          <span className="font-medium text-gray-700">{paymentMode}</span>
        </div>
      </div>

      {/* Refund Button */}
      {paymentStatus === "Failed" && (
        <div className="mt-5">
          <button
            className="w-full py-2.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-sm font-medium transition"
            onClick={() => console.log("Refund request")}
          >
            Claim Refund Request
          </button>
        </div>
      )}
    </ModalWrapper>
  );
};
