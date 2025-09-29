import React from 'react';
import Pagetitle from '@/components/ui/PageTitle';
import { useAppSelector } from '@/redux/store';
export const Plan = () => {
  const { plans } = useAppSelector((state) => state?.plan);
  // Example plans - can be dynamic later
  // const plans = [
  //   { id: 2, country: "United States America", data: "7GB / 7 days", price: "$2.02", flag: "1.webp" },
  //   { id: 1, country: "United Kingdom", data: "5GB / 30 days", price: "$5.05", flag: "2.webp" },
  //   { id: 3, country: "China", data: "2GB / 5 days", price: "$12.9", flag: "3.webp" },
  //   { id: 4, country: "Afghanistan", data: "8GB / 30 days", price: "$4.15", flag: "4.webp" },
  //   { id: 5, country: "Bahrain", data: "6GB / 20 days", price: "$8.09", flag: "5.webp" },
  // ];

  return (
    <section className="container bg-white px-4 sm:px-6 md:px-[10%] py-8 md:py-12 mt-10">
      {/* Section Heading */}

      <Pagetitle
        title="Plans That Travel With You"
        subtitle="Choose a plan that keeps you connected anywhere, anytime."
      />
      <h2 className="text-xl sm:text-2xl text-[#1A0F33] md:text-3xl mt-6 mb-12 font-semibold text-center">
        Our Popular Plans
      </h2>
      {/* Plans List */}
      <div className="mt-8 space-y-5">
        {plans.map((plan) => {
          console.log("------- list of the  plans -----", plan)
          return (
            <div
              key={plan.id}
              className="w-full border border-gray-200 rounded-2xl hover:bg-green-50 hover:border-[#3BC852] transition duration-300"
            >
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                {/* Flag + Country */}
                <div className="flex items-center gap-3 w-[260px]">
                  {/* <img
                  src={`/flag/${plan.flag}`}
                  alt={plan.country}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                /> */}
                  <p className="text-base  sm:text-lg text-[#1A0F33] font-medium">{plan?.country?.name}</p>
                </div>

                {/* Plan Info */}
                {
                  plan?.data && plan?.validityDays && <div className="text-sm sm:text-base text-center sm:text-left text-gray-700 ">
                    <span className="text-[#64748B94]">Starter:</span> <span className="text-lg sm:text-xl font-semibold text-center sm:text-left text-gray-800">
                      {plan.data}GB / {plan.validityDays} days
                    </span>
                  </div>
                }


                {/* Price */}
                <div className="text-sm sm:text-base md:text-lg bg-[#F3F5F7] rounded-2xl px-4 sm:px-6 py-2 font-bold">
                  ${plan.price}
                </div>

                {/* Button */}
                <div>
                  <button className="cursor-pointer w-full sm:w-auto px-6 sm:px-8 py-2 text-sm sm:text-base bg-[#3BC852] text-white rounded-2xl hover:bg-green-600 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  );
};
