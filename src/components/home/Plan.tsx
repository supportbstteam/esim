"use client";
import React, { useState } from "react";
import Pagetitle from "@/components/ui/PageTitle";
import { useAppSelector } from "@/redux/store";
import AuthModal from "../modals/AuthModal";
import { useRouter } from "next/navigation";

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
      setSelectedPlan(plan);      // Save selected plan to state
      setIsAuthModal(true);       // Open auth modal
    } else {
      // If already authenticated, navigate directly to details page
      router.push(`/details/${plan.id}`);
    }
  };

  // Called from AuthModal on successful login/signup
  const handleAuthSuccess = () => {
    setIsAuthModal(false);
    if (selectedPlan) {
      // Navigate to details page with saved plan after login
      router.push(`/details/${selectedPlan.id}`);
      setSelectedPlan(null);
    }
  };

  const handleNavigate = (id: string) => {
    router.push(`/country/${id}`);
  };

  // Optional: Show popup if user tries to visit details page without auth
  // (This could be handled in the details page itself or a wrapper)
  // Example toast if needed elsewhere:
  // if (!isAuth) {
  //   toast.error("Please login first to know more about the plan.");
  // }

  return (
    <section className="container bg-white px-4 sm:px-6 md:px-[10%] py-8 md:py-12 mt-10">
      {/* AuthModal with success callback */}
      <AuthModal isOpen={isAuthModal} onClose={() => setIsAuthModal(false)} onAuthSuccess={handleAuthSuccess} />

      <Pagetitle title="Plans That Travel With You" subtitle="Choose a plan that keeps you connected anywhere, anytime." />
      <h2 className="text-xl sm:text-2xl text-[#1A0F33] md:text-3xl mt-6 mb-12 font-semibold text-center">Our Popular Plans</h2>

      <div className="mt-8 space-y-5">
        {featured?.slice(0, 5).map((plan) => (
          <div
            onClick={() => handleNavigate(plan.country.id)}
            key={plan.id}
            className="w-full border border-gray-200 rounded-2xl hover:bg-green-50 hover:border-[#3BC852] transition duration-300"
          >
            <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              {/* Plan details here: country, data, price */}

              <div className="flex items-center gap-3 w-[260px]">
                <p className="text-base  sm:text-lg text-[#1A0F33] font-medium">{plan?.country?.name}</p>
              </div>

              {plan?.data && plan?.validityDays && (
                <div className="text-sm sm:text-base text-center sm:text-left text-gray-700 ">
                  <span className="text-[#64748B94]">Starter:</span>{" "}
                  <span className="text-lg sm:text-xl font-semibold text-center sm:text-left text-gray-800">
                    {plan.data}GB / {plan.validityDays} days
                  </span>
                </div>
              )}

              <div className="text-sm sm:text-base md:text-lg bg-[#F3F5F7] rounded-2xl px-4 sm:px-6 py-2 font-bold">${plan.price}</div>

              <div>
                <button
                  onClick={() => handleAddToCart(plan)}
                  className="cursor-pointer w-full sm:w-auto px-6 sm:px-8 py-2 text-sm sm:text-base bg-[#3BC852] text-white rounded-2xl hover:bg-green-600 transition"
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
