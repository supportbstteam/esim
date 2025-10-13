"use client";
import React, { useState } from "react";
import Pagetitle from "@/components/ui/PageTitle";
import { useAppSelector } from "@/redux/store";
import AuthModal from "../modals/AuthModal";
import { useRouter } from "next/navigation";
import Flag from "@/components/ui/Flag";
import { useNavigate } from "../hooks/navigation";

export const Plan = () => {
  const { featured } = useAppSelector((state) => state?.plan);
  const { isAuth } = useAppSelector((state) => state?.user);
  const [isAuthModal, setIsAuthModal] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const router = useRouter();
  const navigation = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddToCart = (plan: any) => {
    // console.log("----- plan ----", plan);
    // return;
    if (!isAuth) {
      setSelectedPlan(plan);
      setIsAuthModal(true);
      return;
    }
    // router.push(`/details/${plan.id}`);
    if (isAuth)
      navigation(`/country/checkout?plan=${plan.id}&country=${plan?.country?.id}`);
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
    <section className="container bg-white px-4 min-[700px]:px-6 md:px-[10%] py-8 md:py-12 mt-10">
      <AuthModal isOpen={isAuthModal} onClose={() => setIsAuthModal(false)} onAuthSuccess={handleAuthSuccess} />

      <Pagetitle title="Plans That Travel With You" subtitle="Choose a plan that keeps you connected anywhere, anytime." />
      <h2 className="text-xl min-[700px]:text-2xl text-[#1A0F33] md:text-3xl mt-9 mb-12 font-semibold text-center">Our Popular Plans</h2>

      <div className={`mt-8 space-y-5 ${featured.length !== 0  ? 'max-md:grid max-[700px]:gap-x-4  max-[700px]:grid-cols-2':''}`}>
  {featured.length === 0  ? (
    <div className="flex justify-center items-center py-12">
      <svg
        className="animate-spin h-8 w-8 text-[#3BC852]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        ></path>
      </svg>
    </div>
  ) :  (
    featured.slice(0, 5).map((plan) => (
      <div
        onClick={() => handleNavigate(plan.country.id)}
        key={plan.id}
        className="w-full border border-gray-200 rounded-xl hover:bg-green-50 hover:border-[#3BC852] transition duration-300 mb-6 "
      >
        <div className="px-2 md:px-[24px] py-[18px] flex flex-col min-[700px]:flex-row min-[700px]:items-center justify-center  min-[700px]:justify-between gap-4">
        
          <div className="flex items-center gap-3 min-[900px]:w-[260px] max-md:justify-center">
            <Flag
              countryName={plan?.country?.name}
              size={36}
              className="md:h-[36px] md:w-[36px] h-[24px] w-[24px]"
            />
            <p className="text-base min-[700px]:text-lg text-[#1A0F33] font-[700]">
              {plan?.country?.name}
            </p>
          </div>

       
          {plan?.data && plan?.validityDays && (
            <div className="md:text-lg md:w-[300px] text-center max-min-[700px]:text-left text-gray-700 max-md:flex max-md:flex-col">
              <span className="text-[#64748B94]">Starter:</span>{" "}
              <span className="font-medium max-md:text-[14px]  min-[700px]:text-left text-gray-800">
                {plan.data}GB / {plan.validityDays} days
              </span>
            </div>
          )}

        
          <div className="text-[16px] w-[90px] flex items-center justify-center bg-[#F3F5F7] rounded-full px-4 py-1 leading-6.4 font-bold max-md:mx-auto">
            ${plan.price}
          </div>

         
          <div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(plan);
              }}
              className="cursor-pointer w-[100%] min-[700px]:w-auto px-6 min-[700px]:px-6 py-1 md:py-[11px] text-sm min-[700px]:text-base bg-[#3BC852] text-white rounded-full hover:bg-[#133365] transition leading-normal md:leading-[21px]"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    ))
  )}
</div>

    </section>
  );
};
