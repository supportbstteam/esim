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

type CountryDetailsProps = {
  params: Promise<{ id: string }>; // keeping your original signature
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
        description:
          "Download your eSIM via QR code or app and connect within seconds.",
      },
      {
        icon: "sim_card",
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
    buyButton: "Buy Now",
    noPlansText: "No plans available for this country.",
    selectPlanError: "Please select a plan first.",
    loginSuccessToast: "Login Successful",
  },
};

export default function CountryDetails({ params }: CountryDetailsProps) {
  const navigation = useNavigate();
  // Note: your original code treated params as a Promise; keep that behavior
  const { id } = React.use(params);
  const dispatch = useAppDispatch();
  const { user, isAuth } = useAppSelector((state) => state?.user);
  const { plans } = useAppSelector((state) => state?.plan);

  // keep track of selected plan
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isAuthModal, setIsAuthModal] = useState(false);

  // TAB state: 'standard' or 'unlimited'
  const [activeTab, setActiveTab] = useState<"standard" | "unlimited">(
    "standard"
  );

  useEffect(() => {
    const fetchPlanDetails = async () => {
      await dispatch(fetchPlans({ countryId: id }));
      await dispatch(fetchUserDetails());
    };
    fetchPlanDetails();
    // kept dependency on user?.id as in your original code
  }, [user?.id, dispatch, id]);

  const handleAddToCart = async () => {
    if (!isAuth) {
      setIsAuthModal(true);
      return;
    }

    if (!selectedPlan) {
      toast.error(content.plansSection.selectPlanError);
      return;
    }

    // navigate to checkout page with query params
    navigation(`/country/checkout?plan=${selectedPlan}&country=${id}`);
  };

  const handleAuthSuccess = async () => {
    toast.success(content.plansSection.loginSuccessToast);
    await dispatch(fetchUserDetails());
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
  const groupByvalidityDays = (list: any[]) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const map = new Map<string, any[]>();
    list.forEach((item) => {
     
      const validityDaysKey =
        item?.validityDays !== undefined && item?.validityDays !== null
          ? String(item.validityDays)
          : "Unknown";
      if (!map.has(validityDaysKey)) map.set(validityDaysKey, []);
      map.get(validityDaysKey)!.push(item);
    });

    // convert to array and sort by numeric validityDays if possible
    const arr = Array.from(map.entries());
    arr.sort((a, b) => {
      const na = parseInt(a[0], 10);
      const nb = parseInt(b[0], 10);
      if (!isNaN(na) && !isNaN(nb)) return na - nb;
      // put known numeric validities before Unknown and then lexicographic
      if (!isNaN(na) && isNaN(nb)) return -1;
      if (isNaN(na) && !isNaN(nb)) return 1;
      return a[0].localeCompare(b[0]);
    });
    return arr; // [ [validityDaysKey, plansArray], ... ]
  };

  // Partition plans into standard and unlimited based on title
  const standardPlans = (plans || []).filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (p: any) => !/unlimited/i.test(String(p?.title || ""))
  );
//   eslint-disable-next-line @typescript-eslint/no-explicit-any
  const unlimitedPlans = (plans || []).filter((p: any) =>
    /unlimited/i.test(String(p?.title || ""))
  );

  return (
    <div>
    <div className="bg-[#E5EFF780] mb-10 flex w-full flex-col  gap-8">
    
      <div className="container py-10 md:py-20  flex items-center max-lg:flex-col gap-8 w-full  border-gray-300 ">
        <div className="flex-col">
          <div className="flex items-center gap-2">
            <Flag
              countryName={plans[0]?.country?.name}
              size={36}
              className="h-[36px] w-[36px]"
            />
            <h3 className="text-2xl md:text-[36px] font-bold ">
              {plans && plans.length > 0 && plans[0]?.country?.name}
            </h3>
          </div>

          <div className="subtext mt-4">{content.heroSubtext}</div>

          <div className="mt-8">
            <div className="flex flex-col">
              <p className="text-[#1A0F33] text-[20px] font-bold">
                {content.whatsIncluded.title}
              </p>

              <div className="flex gap-6 mt-6 max-sm:flex-col">
                {content.whatsIncluded.items.map((item, idx) => (
                  <div className="card w-full sm:w-1/2 " key={idx}>
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
        </div>

        <div className="">
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
        <h2 className="text-2xl text-center md:text-[36px] font-bold ">
          {content.plansSection.heading}
        </h2>
        <div className="subtext text-center !text-[16px] mt-4 mb-6">
          {content.plansSection.subtext}
        </div>

        <div className="bg-[#133365]  py-8 md:py-15 rounded-xl w-full md:w-[60%] mx-auto px-10 md:px-20">
        <div className="mb-8 flex items-center justify-center max-w-2xl mx-auto  gap-2 border-b-[0.1px] p-1 pb-0 ">
          <button
            onClick={() => setActiveTab("standard")}
            className={`px-0 md:px-4 py-2 text-[16px] md:text-[21px] border-b-4 border-[#133365] text-white font-medium transition-all focus:outline-none ${
              activeTab === "standard"
                ? "border-white"
                : ""
            }`}
            aria-pressed={activeTab === "standard"}
          >
            Standard
          </button>
          <button
            onClick={() => setActiveTab("unlimited")}
            className={`px-0 md:px-4 py-2 text-[16px] md:text-[21px] border-b-4 border-[#133365] text-white font-medium transition-all focus:outline-none ${
              activeTab === "unlimited"
                ? "border-white"
                : ""
            }`}
            aria-pressed={activeTab === "unlimited"}
          >
            Unlimited
          </button>
        </div>

        {/* TAB PANELS */}
        <div className="max-w-full  w-full mx-auto flex justify-center flex-col items-center">
          {activeTab === "standard" ? (
            <>
              {standardPlans.length === 0 ? (
                <p className="text-gray-500">
                  No standard plans available for this country.
                </p>
              ) : (
                // group and render
                groupByvalidityDays(standardPlans).map(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ([validityDaysKey, plansForvalidityDays]: any[], idx: number) => (
                    <div key={String(validityDaysKey) + idx} className="w-full mb-6">
                      <h3 className="mt-2 text-xl font-semibold mb-4 text-white">
                        {isNaN(parseInt(String(validityDaysKey), 10))
                          ? `${validityDaysKey} validityDays`
                          : `${validityDaysKey} day validityDays`}
                      </h3>

                      <div className="grid grid-cols-1 gap-6 ">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {plansForvalidityDays.map((item: any) => {
                          const isSelected = selectedPlan === item.id;
                          return (
                            <label
                              key={item.id}
                              htmlFor={item.id}
                             className={`relative cursor-pointer border-1  rounded-xl p-4 transition-all duration-300 ${
                                isSelected
                                  ? "border-green-500 bg-green-100"
                                  : "border-gray-300 bg-white hover:border-green-500"
                              }`}
                            >
                              {/* radio input */}
                              <input
                                type="radio"
                                name="plan"
                                id={item.id}
                                value={item.id}
                                checked={isSelected}
                                onChange={() => setSelectedPlan(item.id)}
                                className="absolute top-3 left-3 w-4 h-4 accent-green-600 hidden"
                              />

                              {/* featured label */}
                              {item.isFeatured && (
                                <span className="absolute top-3 right-3 text-l flex items-center bg-black text-white px-2 py-0.5 rounded-full">
                                  <FaFire className=" text-[#eebe3c] mr-1" />
                                  Popular
                                </span>
                              )}

                              {/* Plan Info */}
                              <div className=" flex justify-content-between items-end">
                                <div className="font-semibold flex-3 text-gray-900">
                                  {item.title}
                                </div>
                                <div className=" flex-1 font-bold text-gray-800 text-end text-2xl">
                                  {item.price}{" "}
                                  {item.currency === "USD" ? "$" : item?.currency}
                                </div>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )
                )
              )}
            </>
          ) : (
            <>
              {unlimitedPlans.length === 0 ? (
                <p className="text-gray-500">
                  No unlimited plans available for this country.
                </p>
              ) : (
                groupByvalidityDays(unlimitedPlans).map(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ([validityDaysKey, plansForvalidityDays]: any[], idx: number) => (
                    <div key={String(validityDaysKey) + idx} className="w-full mb-6">
                      <h3 className="mt-2 text-xl font-semibold mb-4 text-white">
                        {isNaN(parseInt(String(validityDaysKey), 10))
                          ? `${validityDaysKey} validityDays`
                          : `${validityDaysKey} day validityDays`}
                      </h3>

                      <div className="grid grid-cols-1 gap-6 ">
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {plansForvalidityDays.map((item: any) => {
                          const isSelected = selectedPlan === item.id;
                          return (
                            <label
                              key={item.id}
                              htmlFor={item.id}
                              className={`relative cursor-pointer border-1  rounded-xl p-4 transition-all duration-300 ${
                                isSelected
                                  ? "border-green-500 bg-green-100"
                                  : "border-gray-300 bg-white hover:border-green-500"
                              }`}
                            >
                              {/* radio input */}
                              <input
                                type="radio"
                                name="plan"
                                id={item.id}
                                value={item.id}
                                checked={isSelected}
                                onChange={() => setSelectedPlan(item.id)}
                                className="absolute top-3 left-3 w-4 h-4 accent-green-600 hidden"
                              />

                              {/* featured label */}
                              {item.isFeatured && (
                                <span className="absolute top-3 right-3 text-l flex items-center bg-black text-white px-2 py-0.5 rounded-full">
                                  <FaFire className=" text-[#eebe3c] mr-1" />
                                  Popular
                                </span>
                              )}

                              {/* Plan Info */}
                              <div className=" flex justify-content-between items-end">
                                <div className="font-semibold flex-3 text-gray-900">
                                  {item.title}
                                </div>
                                <div className=" flex-1 font-bold text-gray-800 text-end text-2xl">
                                  {item.price}{" "}
                                  {item.currency === "USD"
                                    ? "$"
                                    : item?.currency}
                                </div>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )
                )
              )}
            </>
          )}
        </div>

        <button
          onClick={handleAddToCart}
          className="max-w-full  mx-auto w-full bg-[#3BC852] p-4 rounded-full mt-5 text-white "
        >
          <h3 className="text-xl">{content.plansSection.buyButton}</h3>
        </button>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModal}
        onClose={() => setIsAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
}
