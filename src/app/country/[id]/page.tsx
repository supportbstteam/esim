"use client";

import { useNavigate } from "@/components/hooks/navigation";
import AuthModal from "@/components/modals/AuthModal";
import { fetchUserDetails } from "@/redux/slice/UserSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchPlans } from "@/redux/thunk/planThunk";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaFire, FaPlus, FaMinus } from "react-icons/fa";
import Flag from "@/components/ui/Flag";
import Image from "next/image";
import { addToCart } from "@/redux/slice/CartSlice";

type CountryDetailsProps = {
  params: Promise<{ id: string }>;
};

const content = {
  heroSubtext:
    "Get a single global eSIM and enjoy seamless, reliable coverage with flexible data plans to stay connected anytime, anywhere.",
  whatsIncluded: {
    title: "What’s Included",
    items: [
      {
        icon: "flash_on",
        title: "Instant Activation",
        description: "Download your eSIM via QR code or app and connect within seconds.",
      },
      {
        icon: "sim_card",
        title: "Top-up Anytime",
        description: "Recharge or upgrade your plan while traveling, without hassle.",
      },
    ],
  },
  image: {
    src: "/countryimg.jpg",
    alt: "Country / coverage image",
    height: 700,
    width: 700,
    className: "rounded-[8px]",
  },
  plansSection: {
    heading: "Choose the Best Plan",
    subtext:
      "Stay connected without the hassle of roaming charges. Our flexible eSIM plans are designed to fit every kind of traveler.",
    selectPlanError: "Please select at least one plan first.",
    loginSuccessToast: "Login Successful",
    checkoutButton: "Buy Now",
  },
};

export default function CountryDetails({ params }: CountryDetailsProps) {
  const navigation = useNavigate();
  const { id } = React.use(params);
  const dispatch = useAppDispatch();
  const { user, isAuth } = useAppSelector((state) => state.user);
  const { plans } = useAppSelector((state) => state.plan);

  const [selectedPlans, setSelectedPlans] = useState<{ [key: string]: number }>({});
  const [isAuthModal, setIsAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"standard" | "unlimited">("standard");

  useEffect(() => {
    const fetchPlanDetails = async () => {
      await dispatch(fetchPlans({ countryId: id }));
      await dispatch(fetchUserDetails());
    };
    fetchPlanDetails();
  }, [user?.id, dispatch, id]);

  const handleTogglePlan = (planId: string) => {
    setSelectedPlans((prev) => {
      const isSelected = planId in prev;
      if (isSelected) {
        const copy = { ...prev };
        delete copy[planId];
        return copy;
      } else {
        return { ...prev, [planId]: 1 };
      }
    });
  };

  const updateQuantity = (planId: string, newQty: number) => {
    setSelectedPlans((prev) => {
      if (!(planId in prev)) return prev;
      if (newQty < 1) newQty = 1;
      return { ...prev, [planId]: newQty };
    });
  };

  const handleCheckout = async () => {
    if (!isAuth) {
      setIsAuthModal(true);
      return;
    }

    const plansArray = Object.entries(selectedPlans).map(([planId, quantity]) => ({ planId, quantity }));

    if (plansArray.length === 0) {
      toast.error(content.plansSection.selectPlanError);
      return;
    }

    try {
      const response = await dispatch(addToCart(plansArray));

      if (response?.type === "cart/addToCart/fulfilled") {
        toast.success("Added to cart successfully!");
      }

      navigation(`/country/checkout?plans=${plansArray.map(p => `${p.planId}:${p.quantity}`).join(",")}&country=${id}`);
    } catch (err) {
      console.error("Checkout error", err);
      toast.error("Failed to add plans to cart");
    }
  };

  const handleAuthSuccess = async () => {
    toast.success(content.plansSection.loginSuccessToast);
    await dispatch(fetchUserDetails());
  };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const standardPlans = (plans || []).filter((p: any) => !/unlimited/i.test(p?.title || ""));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const unlimitedPlans = (plans || []).filter((p: any) => /unlimited/i.test(p?.title || ""));
  const displayedPlans = activeTab === "standard" ? standardPlans : unlimitedPlans;

  const totalPlansSelected = Object.keys(selectedPlans).length;
  const totalPrice = Object.entries(selectedPlans).reduce((acc, [planId, qty]) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const plan: any = plans.find((p: any) => p.id === planId);
    return acc + (plan ? Number(plan.price) * qty : 0);
  }, 0);

  return (
    <>
      <div>
        {/* Country & Hero */}
        <div className="bg-[#E5EFF780] mb-10 flex w-full flex-col gap-8">
          <div className="container py-10 md:py-20 flex items-center max-lg:flex-col gap-8 w-full border-gray-300">
            <div className="flex-col">
              <div className="flex items-center gap-2">
                <Flag countryName={plans[0]?.country?.name} size={36} className="h-[36px] w-[36px]" />
                <h3 className="text-2xl md:text-[36px] font-bold">
                  {plans && plans.length > 0 && plans[0]?.country?.name}
                </h3>
              </div>
              <div className="subtext mt-4">{content.heroSubtext}</div>

              <div className="mt-8">
                <p className="text-[#1A0F33] text-[20px] font-bold">{content.whatsIncluded.title}</p>
                <div className="flex gap-6 mt-6 max-sm:flex-col">
                  {content.whatsIncluded.items.map((item, idx) => (
                    <div className="card w-full sm:w-1/2" key={idx}>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined">{item.icon}</span>
                        <p className="text-[#1A0F33] text-[18px] font-bold">{item.title}</p>
                      </div>
                      <div className="subtext !text-[16px] mt-1.5 font-[400] tracking-tight">{item.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Image
                src={content.image.src}
                alt={content.image.alt}
                height={content.image.height}
                width={content.image.width}
                className={content.image.className}
              />
            </div>
          </div>
        </div>

        {/* Plans Section */}
        <div className="flex flex-col px-8 py-6 rounded-xl w-full">
          <h2 className="text-2xl text-center md:text-[36px] font-bold">{content.plansSection.heading}</h2>
          <div className="subtext text-center !text-[16px] mt-4 mb-6">{content.plansSection.subtext}</div>

          <div className="bg-[#133365] py-8 md:py-15 rounded-xl w-full md:w-[60%] mx-auto px-5 md:px-20">
            <div className="mb-8 flex items-center justify-center max-w-2xl mx-auto gap-6 md:gap-2 border-b-[0.1px] p-1 pb-0">
              <button
                onClick={() => setActiveTab("standard")}
                className={`px-0 md:px-4 py-2 text-[16px] md:text-[21px] border-b-4 border-[#133365] text-white font-medium transition-all focus:outline-none ${activeTab === "standard" ? "border-white" : ""}`}
              >
                Standard
              </button>
              <button
                onClick={() => setActiveTab("unlimited")}
                className={`px-0 md:px-4 py-2 text-[16px] md:text-[21px] border-b-4 border-[#133365] text-white font-medium transition-all focus:outline-none ${activeTab === "unlimited" ? "border-white" : ""}`}
              >
                Unlimited
              </button>
            </div>

            {displayedPlans.length === 0 ? (
              <p className="text-gray-500 text-center mt-6">No {activeTab} plans available for this country.</p>
            ) : (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              displayedPlans.map((plan: any) => {
                const qty = selectedPlans[plan.id] || 0;
                return (
                  <div
                    key={plan.id}
                    className={`relative cursor-pointer rounded-xl p-4 mb-4 transition-all duration-300 ${qty > 0 ? "border-green-500 bg-green-50" : "border-gray-300 bg-white hover:border-green-500"}`}
                    onClick={() => handleTogglePlan(plan.id)}
                  >
                    {plan.isFeatured && (
                      <span className="absolute top-[-12px] right-[-3px] flex items-center bg-black text-white px-2 py-0.5 rounded-full">
                        <FaFire className="text-[#eebe3c] mr-1" />
                        Popular
                      </span>
                    )}
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{plan.title}</h3>
                      <span className="font-bold text-gray-800 text-xl md:text-2xl">
                        {plan.currency === "USD" ? "$" : plan.currency} {plan.price}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Floating Checkout */}
        {totalPlansSelected > 0 && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-lg p-4 w-[90%] max-w-lg flex justify-between items-center gap-4 animate-slide-up z-50">
            <div>
              <p className="font-semibold">
                {totalPlansSelected} Plan{totalPlansSelected > 1 ? "s" : ""} Total: ${totalPrice.toFixed(2)}
              </p>
            </div>
            <button onClick={handleCheckout} className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
              {content.plansSection.checkoutButton}
            </button>
          </div>
        )}
      </div>

      <AuthModal isOpen={isAuthModal} onClose={() => setIsAuthModal(false)} onAuthSuccess={handleAuthSuccess} />

      <style jsx>{`
        @keyframes slideUp {
          0% {
            opacity: 0;
            transform: translateY(50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slideUp 0.4s ease forwards;
        }
      `}</style>
    </>
  );
}
