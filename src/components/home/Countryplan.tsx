import React, { useState, useMemo } from 'react';
import AuthModal from "../modals/AuthModal";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Flag from "@/components/ui/Flag";
type TabKey = 'country' | 'popular';
import { useRouter } from "next/navigation";
import { useNavigate } from "../hooks/navigation";

import Pagetitle from "@/components/ui/PageTitle";
import { addToCart } from '@/redux/slice/CartSlice';
import toast from 'react-hot-toast';

export default function CountryplanTabs() {
  const dispatch = useAppDispatch();
  const { featured = [] } = useAppSelector((state) => state?.plan ?? {});
  const router = useRouter();
  const { isAuth } = useAppSelector((state) => state?.user ?? {});
  const [isAuthModal, setIsAuthModal] = useState(false);
  const navigation = useNavigate();
  const { countries = [] } = useAppSelector((state) => state?.country ?? {});
  const [active, setActive] = useState<TabKey>('country');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedPlan, setSelectedPlan] = useState<any>(null);


  const basicPlanByCountry = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const map: Record<string, any> = {};
    if (!Array.isArray(featured)) return map;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    featured.forEach((plan: any) => {
      const countryId = plan?.country?.id;
      if (!countryId) return;

      const price = Number(plan?.price ?? NaN);
      if (Number.isNaN(price)) return;

      // if no entry yet or current plan is cheaper, set as basic
      if (!map[countryId] || price < Number(map[countryId].price)) {
        map[countryId] = plan;
      }
    });

    return map;
  }, [featured]);

  // const formatPrice = (p?: number | string | null) => {
  //   if (p === undefined || p === null) return null;
  //   const num = Number(p);
  //   if (Number.isNaN(num)) return null;
  //   // show no decimals for whole numbers, else two decimals
  //   return Number.isInteger(num) ? `$${num}` : `$${num.toFixed(2)}`;
  // };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddToCart = async (plan: any) => {
    // console.log("---- auth  add to cart ---", plan);
    // return;
    if (!isAuth) {
      setSelectedPlan(plan);
      setIsAuthModal(true);
      return;
    }

    if (isAuth) {
      const response = await dispatch(addToCart([{ ...plan, planId: plan?.id, quantity: 1 }]));
      if (response?.type === 'cart/addToCart/fulfilled') {
        toast.success("Added to Cart")
        navigation(`/country/checkout?plan=${plan.id}&country=${plan?.country?.id}`);
      }
    }
  };

  const handleNavigate = (id: string) => {
    router.push(`/country/${id}`);
  };
  const handleAuthSuccess = () => {
    setIsAuthModal(false);
    if (selectedPlan) {
      navigation(`/country/checkout?plan=${selectedPlan.id}&country=${selectedPlan?.country?.id}`);
    }
  };
  // console.log(countries+'yuwkwoidsj');

  return (
    <section className="w-full   bg-[#133365]  ">
      <div className="container pt-20 pb-10">
        <AuthModal isOpen={isAuthModal} onClose={() => setIsAuthModal(false)} onAuthSuccess={handleAuthSuccess} />
        <Pagetitle title="Plans That Travel With You" subtitle="Choose a plan that keeps you connected anywhere, anytime." subclass='text-white' />

        <div className="mx-auto p-4 max-[360px]:px-0 mt-6 md:mt-10 rounded-4xl">
          <div className="flex items-center justify-center max-w-2xl mx-auto  gap-5  p-1 pb-0 ">
            <button
              aria-selected={active === 'country'}
              role="tab"
              onClick={() => setActive('country')}
              className={`relative   px-3 max-[360px]:px-2 md:px-10  py-2 text-[14px] border-1 rounded-full border-[#ffffff] md:text-[21px] text-white font-medium transition-all focus:outline-none ${active === 'country'
                ? "!bg-[#3BC852] !border-[#3BC852] after:content-[''] after:absolute after:h-[10px] after:w-[10px] after:bg-[#3bc952] after:bottom-[-10px] after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-[223deg]"
                : 'hover:'
                }`}
            >
              Popular Country
            </button>

            <button
              aria-selected={active === 'popular'}
              role="tab"
              onClick={() => setActive('popular')}
              className={`relative  px-3 max-[360px]:px-2 md:px-10  py-2 text-[14px] border-1 rounded-full border-[#ffffff]  md:text-[21px] text-white font-medium transition-all focus:outline-none ${active === 'popular'
                ? "!bg-[#3BC852] !border-[#3BC852] after:content-[''] after:absolute after:h-[10px] after:w-[10px] after:bg-[#3bc952] after:bottom-[-10px] after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:rotate-[223deg]"
                : 'hover:'
                }`}
            >
              Popular plans
            </button>
          </div>

          {/* Tab panels */}
          <div className="pt-0 md:pt-5">
            {active === 'country' && (
              <div role="tabpanel" aria-label="Country specific plans">
                {countries.length === 0 ? (
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
                ) : (
                  <div className={`mt-10 mb-3 flex flex-wrap gap-4 sm:gap-6 ${countries.length === 2 ? "justify-center" : "justify-start"
                    }`}>
                    {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      countries.map((item: any, i: number) => {
                        const basicPlan = basicPlanByCountry[item.id];
                        const basicPriceText = (item?.price ? '$' + Number(item.price).toFixed(2) : "—")
                        const basicData = basicPlan?.data;
                        const basicValidity = basicPlan?.validityDays;

                        return (
                          <div
                            key={i}
                            onClick={() => handleNavigate(item.id)}
                            className=" bg-white cursor-pointer border-gray-200 rounded-[8px] hover:bg-green-50  hover:border-[#3BC852] border-2 transition duration-300  w-full sm:w-[48%] lg:w-[31%] xl:w-[23%]"
                          >
                            <div className="p-4 flex items-center justify-between gap-4"
                            >
                              {/* Flag + Name */}
                              <div className="flex items-center gap-4">
                                <Flag
                                  countryName={item.name}
                                  size={36}
                                  className="h-[36px] w-[36px]"
                                />
                                <div>
                                  <p className="text-sm sm:text-base md:text-lg font-medium">
                                    {item.name}
                                  </p>


                                </div>

                              </div>
                              {basicPriceText ? (
                                <p className="text-xs flex flex-col justify-start items-end text-gray-500 mt-1">
                                  Starting from <span className="font-semibold text-gray-800 text-[16px]">{basicPriceText}</span>

                                </p>
                              ) : (
                                <p className="text-xs text-gray-400 mt-1">Plans coming soon</p>
                              )}

                              {/* Arrow */}

                            </div>
                          </div>
                        )
                      })}
                  </div>)}

              </div>
            )}

            {active === 'popular' && (
              <div role="tabpanel" aria-label="Popular plans">
                <div className={`mt-10 !pb-0 ${featured.length === 0 ? 'flex justify-center' : 'flex flex-wrap gap-x-6 justify-center'}`}>
                  {featured.length === 0 ? (
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
                  ) : (
                    featured.map((plan) => (
                      <div
                        onClick={() => handleNavigate(plan.country.id)}
                        key={plan.id}
                        className="max-[670px]:w-full max-[1080px]:w-[48%] lg:w-[32%]
  bg-white border-gray-200 rounded-xl hover:bg-green-50 hover:border-[#3BC852] border-2 transition duration-300 mb-2 "
                      >
                        <div className="px-2 md:px-[24px] py-[18px] flex flex-col  justify-center items-center   gap-4 cursor-pointer">
                          <div className="flex w-full justify-between">
                            <div className="flex items-center justify-between gap-3 ">
                             {plan?.country?.name}
                              <Flag
                                countryName='Turkey'
                                size={36}
                                className="md:h-[36px] md:w-[36px] h-[24px] w-[24px]"
                              />
                              <p className="text-base min-[700px]:text-lg text-[#1A0F33] font-[700]">
                                {plan?.country?.name}
                              </p>
                            </div>
                            <div className="text-[18px] md:text-[20px] w-[90px] flex items-center justify-center bg-[#F3F5F7] rounded-full px-4 py-1 leading-6.4 font-bold ">
                              ${plan.price}
                            </div>
                          </div>
                          <div className="flex justify-between items-end w-full">
                            {plan?.data && plan?.validityDays && (
                              <div className="md:text-lg  text-start  text-gray-700 flex flex-col">
                                <span className="text-[#64748B94]">Starter: </span>{" "}
                                <span className="font-medium max-md:text-[14px]  min-[700px]:text-left text-gray-800">
                                  {plan.data}GB / {plan.validityDays} days
                                </span>
                              </div>
                            )}
                            <div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAddToCart(plan);
                                }}
                                className="cursor-pointer w-[100%]  px-5 py-[8px] text-sm min-[700px]:text-base bg-[#3BC852] text-white rounded-full hover:bg-[#133365] transition leading-normal md:leading-[21px]"
                              >
                                Buy now
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col items-center gap-4  mt-6  md:mt-15">
            <p className='text-white  text-center text-lg sm:text-xl '>Explore eSIMs and stay connected anywhere in the world.
            </p>
            <button
              onClick={(e)=>{
                e.preventDefault();
                router.push("/country")
              }}
            
            className='mt-3 bg-[#fff] text-center text-[#133365] max-[425px]:!text-[14px] max-[330px]:!text-[12px]  hover:text-white px-6 py-2.5 rounded-full hover:bg-[#3BC852] transition text-[16px]'>Explore Esims Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}
