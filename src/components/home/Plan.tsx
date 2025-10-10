"use client";
import React, { useState } from "react";
import Pagetitle from "@/components/ui/PageTitle";
import { useAppSelector } from "@/redux/store";
import AuthModal from "../modals/AuthModal";
import { useRouter } from "next/navigation";
import Flag from "@/components/ui/Flag";

export const Plan = () => {
  const { featured } = useAppSelector((state) => state?.plan);
  const { isAuth } = useAppSelector((state) => state?.user);
  const [isAuthModal, setIsAuthModal] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const router = useRouter();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddToCart = (plan: any) => {
    if (!isAuth) {
      setSelectedPlan(plan);
      setIsAuthModal(true);
      return;
    }
    router.push(`/details/${plan.id}`);
  };

  const handleAuthSuccess = () => {
    setIsAuthModal(false);
    if (selectedPlan) {
      router.push(`/details/${selectedPlan.id}`);
      setSelectedPlan(null);
    }
  };

  const handleNavigate = (id: string) => {
    router.push(`/country/${id}`);
  };

  return (
    <section className="container bg-white px-4 sm:px-6 md:px-[10%] py-8 md:py-12 mt-10">
      <AuthModal isOpen={isAuthModal} onClose={() => setIsAuthModal(false)} onAuthSuccess={handleAuthSuccess} />

      <Pagetitle title="Plans That Travel With You" subtitle="Choose a plan that keeps you connected anywhere, anytime." />
      <h2 className="text-xl sm:text-2xl text-[#1A0F33] md:text-3xl mt-9 mb-12 font-semibold text-center">Our Popular Plans</h2>

      <div className="mt-8 space-y-5">
        {featured?.slice(0, 5).map((plan) => (
          <div
            onClick={() => handleNavigate(plan.country.id)}
            key={plan.id}
            className="w-full border border-gray-200 rounded-xl hover:bg-green-50 hover:border-[#3BC852] transition duration-300 mb-6"
          >
            <div className="px-[24px] py-[18px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Country + Flag */}
              <div className="flex items-center gap-3 w-[260px]">
                <Flag
                  countryName={plan?.country?.name}
                  size={36}
                  className="h-[36px] w-[36px]"
                />
                <p className="text-base sm:text-lg text-[#1A0F33] font-[700]">{plan?.country?.name}</p>
              </div>

              {/* Data / Validity */}
              {plan?.data && plan?.validityDays && (
                <div className="text-lg sm:text-xl  text-center sm:text-left text-gray-700 ">
                  <span className="text-[#64748B94]">Starter:</span>{" "}
                  <span className="font-medium text-center sm:text-left text-gray-800">
                    {plan.data}GB / {plan.validityDays} days
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="text-[16px] w-[90px] flex items-center justify-center bg-[#F3F5F7] rounded-full px-4  py-1 leading-6.4 font-bold">${plan.price}</div>

              {/* Add to Cart */}
              <div>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // prevent parent div navigation
                    handleAddToCart(plan);
                  }}
                  className="cursor-pointer w-full sm:w-auto px-6 sm:px-6 py-[11px] text-sm sm:text-base bg-[#3BC852] text-white rounded-full hover:bg-green-600 transition leading-[21px]"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
