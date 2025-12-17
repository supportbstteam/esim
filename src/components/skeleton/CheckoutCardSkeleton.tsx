import React from 'react'

const CheckoutCartSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-4 border animate-pulse">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          {/* Flag */}
          <div className="h-[36px] w-[36px] rounded-full bg-gray-300 mr-2" />
          {/* Country name */}
          <div className="h-4 w-32 bg-gray-300 rounded" />
        </div>

        {/* Delete icon */}
        <div className="h-5 w-5 bg-gray-300 rounded" />
      </div>

      {/* BODY */}
      <div className="space-y-3 text-[15px]">
        
        {/* Plan Name */}
        <div className="flex justify-between">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-32 bg-gray-300 rounded" />
        </div>

        {/* Data Allowance */}
        <div className="flex justify-between">
          <div className="h-4 w-28 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-300 rounded" />
        </div>

        {/* Validity */}
        <div className="flex justify-between">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-300 rounded" />
        </div>

        {/* Quantity */}
        <div className="flex justify-between items-center mt-2">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-gray-300 rounded-md" />
            <div className="h-4 w-6 bg-gray-300 rounded" />
            <div className="h-8 w-8 bg-gray-300 rounded-md" />
          </div>
        </div>

        {/* Subtotal */}
        <div className="flex justify-between font-semibold border-t pt-2 mt-2">
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-4 w-16 bg-gray-300 rounded" />
        </div>
      </div>
    </div>
  );
};

export default CheckoutCartSkeleton;