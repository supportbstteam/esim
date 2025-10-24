import React from "react";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const OrderCard = ({ key, order }: any) => {

    // console.log("--- order card item ---", id);
    return (
        <Link href={`/order/${order?.id}`} className="block">
            <div
                className={`${order?.status === "failed" ? "bg-red-50" : "bg-white"} position-relative  border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow
         p-5 w-full cursor-pointer`}
            >
                <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-lg text-gray-900">
                        {order?.country} {order?.isoCode && `(${order?.isoCode})`}
                    </span>
                </div>
                <div className="mb-2">
                    <div className="flex gap-2 items-center">
                        {/* <span className="text-gray-700 font-semibold">{title || planName}</span> */}
                        {/* <span className="text-xs text-gray-400">{phoneCode}</span> */}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                        {order?.totalData && (
                            <span>
                                Data: <span className="font-medium text-gray-800">{order?.totalData} GB</span>
                            </span>
                        )}
                        {/* {validityDays !== null && validityDays !== undefined && (
                            <span className="ml-4">
                                Validity: <span className="font-medium text-gray-800">{validityDays} days</span>
                            </span>
                        )} */}
                    </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-gray-900">${order?.totalAmount}</span>
                    <span
                        className={`text-md position-absolute top-2 right-3 rounded px-2 py-1 font-semibold ${order?.statustus === "failed"
                            ? "bg-red-700 text-white"
                            : "bg-blue-700 text-white"
                            }`}
                    >
                        {order?.status}
                    </span>
                </div>
            </div>
        </Link>
    );
};
