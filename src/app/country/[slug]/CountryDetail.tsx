"use client";

import { useNavigate } from "@/components/hooks/navigation";
import AuthModal from "@/components/modals/AuthModal";
import { fetchUserDetails } from "@/redux/slice/UserSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchPlans } from "@/redux/thunk/planThunk";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaFire } from "react-icons/fa";
import Flag from "@/components/ui/Flag";
import Image from "next/image";
import {
  addToCart,
  clearAddToCartState,
  removeWholeCart,
} from "@/redux/slice/CartSlice";
import Link from "next/link";
import { clearPlans } from "@/redux/slice/PlanSlice";
import { RxCross2 } from "react-icons/rx";
import { useSearchParams } from "next/navigation";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { BsSim } from "react-icons/bs";
import CartConfirmModal from "@/components/modals/CartConfirmModal";
import { Loader } from "lucide-react";

type CountryDetailsProps = {
  params: Promise<{ slug: string }>;
};

const content = {
  heroSubtext:
    "Get a single global eSIM and enjoy seamless, reliable coverage with flexible data plans to stay connected anytime, anywhere.",
  whatsIncluded: {
    title: "What’s Included",
    items: [
      {
        icon: <AiOutlineThunderbolt size={22} />,
        title: "Instant Activation",
        description:
          "Download your eSIM via QR code or app and connect within seconds.",
      },
      {
        icon: <BsSim size={22} />,
        title: "Top-up Anytime",
        description:
          "Recharge or upgrade your plan while traveling, without hassle.",
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
  const { slug } = React.use(params);
  const [isConfimModal, setIsConfirmModal] = useState(false);
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const { user, isAuth } = useAppSelector((state) => state.user);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { cart=[], addedPlans, failedPlans, loading:cartLoading, error }:any = useAppSelector(
    (state) => state?.cart,
  );
  const { plans } = useAppSelector((state) => state.plan);

  const countryId = searchParams.get("countryId") ?? undefined;

  const [selectedPlans, setSelectedPlans] = useState<{
    [key: string]: number;
  }>({});

  const [isAuthModal, setIsAuthModal] = useState(false);

  const [activeTab, setActiveTab] = useState<"standard" | "unlimited">(
    "standard",
  );

  // ✅ fetch plans
  useEffect(() => {
    const fetchPlanDetails = async () => {
      await dispatch(clearPlans());
      await dispatch(fetchPlans({ name: slug }));
      await dispatch(fetchUserDetails());
    };

    fetchPlanDetails();
  }, [slug, dispatch]);

  useEffect(() => {
    if (failedPlans && failedPlans.length > 0) {
      toast.error("Some plans could not be added to cart");
      setIsConfirmModal(true);
      return;
    }

    if (
      failedPlans &&
      failedPlans.length === 0 &&
      addedPlans &&
      addedPlans.length > 0
    ) {
      toast.success("Added to cart successfully!");
      navigation(`/country/checkout`);
    }
  }, [failedPlans]);

  const handleTogglePlan = (planId: string) => {
    setSelectedPlans((prev) => {
      const isSelected = planId in prev;

      if (isSelected) {
        const copy = { ...prev };
        delete copy[planId];
        return copy;
      }

      return { ...prev, [planId]: 1 };
    });
  };

  const groupPlansByDays = (plans: any[]) => {
    return plans.reduce((acc: Record<string, any[]>, plan) => {
      const days = plan.validityDays || "Other";
      if (!acc[days]) acc[days] = [];
      acc[days].push(plan);
      return acc;
    }, {});
  };

  const handleCheckout = async () => {

    if (!isAuth) {
      setIsAuthModal(true);
      return;
    }

    setLoading(true);
    const plansArray = Object.entries(selectedPlans).map(
      ([planId, quantity]) => ({
        planId,
        quantity,
      }),
    );

    if (plansArray.length === 0) {
      toast.error(content.plansSection.selectPlanError);
      return;
    }

    try {
      const response = await dispatch(addToCart(plansArray));

      // if (response?.type === "cart/addToCart/fulfilled") {
      //   toast.success("Added to cart successfully!");
      // }

      // navigation(`/country/checkout`);
    } catch (err) {
      toast.error("Failed to add plans to cart");
    }
    finally{
      setLoading(false);
    }
  };

  const handleAuthSuccess = async () => {
    toast.success(content.plansSection.loginSuccessToast);
    await dispatch(fetchUserDetails());
  };

  const standardPlans = (plans || []).filter(
    (p: any) => !/unlimited/i.test(p?.title || ""),
  );

  const unlimitedPlans = (plans || []).filter((p: any) =>
    /unlimited/i.test(p?.title || ""),
  );

  const displayedPlans =
    activeTab === "standard" ? standardPlans : unlimitedPlans;

  const groupedPlans = groupPlansByDays(displayedPlans);

  const totalPlansSelected = Object.keys(selectedPlans).length;

  const totalPrice = Object.entries(selectedPlans).reduce(
    (acc, [planId, qty]) => {
      const plan: any = plans.find((p: any) => p.id === planId);
      return acc + (plan ? Number(plan.price) * qty : 0);
    },
    0,
  );

  const handleRemoveSelected = () => {
    setSelectedPlans({});
  };

  const countryImage = plans?.[0]?.country?.image
    ? `${process.env.NEXT_PUBLIC_API_URL_IMAGE}${plans?.[0]?.country?.image}`
    : content.image.src;

  const handleContinue = async () => {


    // console.log("cart", cart);
    // console.log("failedPlans", failedPlans);

    if(!cart?.items && failedPlans && failedPlans?.length>0){
      setIsConfirmModal(false);
      return;
    }


    dispatch(clearAddToCartState());
    navigation(`/country/checkout`);
    setIsConfirmModal(false);
    return;
  };

  const handleRemoveAdded = async () => {
    const response = await dispatch(removeWholeCart());
    setIsConfirmModal(false);
    if (response?.type === "cart/removeWholeCart/fulfilled") {
      toast.success("Cart cleared successfully");
      setSelectedPlans({});
    } else {
      toast.error("Failed to clear cart");
    }
  };

  return (
    <>
      <div>
        {/* HERO */}
        <div className="bg-[#E5EFF780] flex w-full flex-col gap-8">
          <div className="container py-10 md:py-20 flex items-center max-lg:flex-col gap-8 w-full">
            <div className="flex-col">
              <div className="flex items-center gap-2">
                <Flag
                  countryName={plans?.[0]?.country?.name}
                  size={36}
                  className="h-[36px] w-[36px]"
                />
                <h3 className="text-2xl md:text-[36px] font-bold">
                  {plans?.[0]?.country?.name}
                </h3>
              </div>

              <div className="subtext mt-4">
                {plans?.[0]?.country?.description || content.heroSubtext}
              </div>

              <div className="mt-8">
                <p className="text-[#1A0F33] text-[20px] font-bold">
                  {content.whatsIncluded.title}
                </p>
                <div className="flex gap-6 mt-6 max-sm:flex-col">
                  {content.whatsIncluded.items.map((item, idx) => (
                    <div className="card w-full sm:w-1/2" key={idx}>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined">
                          {item.icon}
                        </span>
                        <p className="text-[#1A0F33] text-[18px] font-bold">
                          {item.title}
                        </p>
                      </div>
                      <div className="subtext !text-[16px] mt-1.5 font-[400] tracking-tight">
                        {item.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Image
                src={countryImage}
                alt="country"
                height={700}
                width={700}
                className="rounded-[8px]"
              />
            </div>
          </div>

          {/* {
            content
          } */}
        </div>

        {/* PLANS */}
        <div className="flex flex-col px-8 py-4 md:py-12 rounded-xl w-full bg_sectioned">
          <div className="bg-[#133365]/90 py-8 md:py-10 rounded-xl w-full md:w-[60%] mx-auto px-5 md:px-20">
            <div className="mb-12 flex items-center justify-between max-w-2xl mx-auto  bg-[#133365] rounded-lg p-2 ">
              <button
                onClick={() => setActiveTab("standard")}
                className={` w-1/2 px-0 md:px-4 py-1 text-[16px] md:text-[21px]  border-[#133365] text-white rounded-lg font-medium transition-all focus:outline-none ${activeTab === "standard" ? "bg-white !text-[#133365]" : ""}`}
              >
                Standard
              </button>
              <button
                onClick={() => setActiveTab("unlimited")}
                className={`w-1/2 px-0 md:px-4 py-1 text-[16px] md:text-[21px] border-[#133365] text-white rounded-lg font-medium transition-all focus:outline-none ${activeTab === "unlimited" ? "bg-white !text-[#133365]" : ""}`}
              >
                Unlimited
              </button>
            </div>
            {Object.entries(groupedPlans).map(([days, plans]) => (
              <div key={days} className="mb-8">
                <h4 className="text-white font-bold text-lg mb-4">
                  {days} Days
                </h4>

                {plans.map((plan: any) => {
                  const qty = selectedPlans[plan.id] || 0;

                  return (
                    <div
                      key={plan.id}
                      className={`relative shadow-xl bg-white border-2 rounded-xl py-[8px] px-5 mb-3 cursor-pointer ${
                        qty > 0
                          ? "!border-[#3BC852] !bg-green-100"
                          : "hover:border-[#7f7f7f]"
                      }`}
                      onClick={() => handleTogglePlan(plan.id)}
                    >
                      {plan.isFeatured && (
                        <span className="absolute text-[12px] top-[-15px] right-[-2px] flex items-center bg-black text-white px-2 py-0.5 rounded-full">
                          <FaFire className="text-[#eebe3c] mr-1" />
                          Popular
                        </span>
                      )}

                      <div className="flex justify-between items-center">
                        <h3 className="font-semibold">{plan.title}</h3>

                        <span className="font-bold text-xl">
                          {plan.currency === "USD" ? "$" : plan.currency}{" "}
                          {plan.price}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* FLOATING CHECKOUT */}
        {totalPlansSelected > 0 && (
          <div className="fixed bottom-0 w-full bg-white p-5 border-t">
            <div className="container flex justify-between items-center">
              <p>
                {totalPlansSelected} Plans — ${totalPrice.toFixed(2)}
              </p>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleCheckout}
                  disabled={loading || cartLoading}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg"
                >
                  {
                    loading ? (
                      <Loader/>
                    ) :"Buy Now"
                  }
                </button>

                <button onClick={handleRemoveSelected}>
                  <RxCross2 size={26} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <CartConfirmModal
        isOpen={isConfimModal}
        onClose={() => setIsConfirmModal(false)}
        failedPlans={failedPlans || []}
        onContinue={handleContinue}
        onRemoveAdded={handleRemoveAdded}
      />

      <AuthModal
        isOpen={isAuthModal}
        onClose={() => setIsAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
}
