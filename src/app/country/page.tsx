"use client";
import { useNavigate } from '@/components/hooks/navigation';
import Flag from '@/components/ui/Flag';
import { fetchUserDetails } from '@/redux/slice/UserSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchCountries } from '@/redux/thunk/thunk';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';
import { EasyStep } from "@/components/home/EasyStep";
import TrustedTravel from '@/components/home/TrustedTravel';
import FAQ from "@/components/home/Faq";
import { Country as cunt } from "@/types";
import { fetchPlans } from "@/redux/thunk/planThunk";
import toast from "react-hot-toast";
function Country() {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const { countries = [], loading } = useAppSelector((state) => state?.country ?? {});
  const { featured = [] } = useAppSelector((state) => state?.plan ?? {});
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  const handleNavigate = (id: string) => {
    router.push(`/country/${id}`);
  };

  const fetchingCountries = async () => {
    await dispatch(fetchCountries());
    await dispatch(fetchUserDetails());
  };

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

      if (!map[countryId] || price < Number(map[countryId].price)) {
        map[countryId] = plan;
      }
    });
    return map;
  }, [featured]);

  useEffect(() => {
    fetchingCountries();
  }, [dispatch]);
  const filteredCountries = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return countries.filter((country: cunt) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, countries]);

  const handleSelectCountry = async (country: cunt) => {
    setSearchTerm(country?.name);
    await dispatch(fetchPlans({ countryId: country?.id }));
    navigation(`/country/${country?.id}`)
    setShowDropdown(false);
  };
  const { list } = useAppSelector((state) => state?.faq);
  return (
    <>
      <div className="container px-4 md:px-6 pb-10">
        {/* Heading + Info Left Aligned */}
        <div className="mt-10 mb-6">
          <h2 className="h2 text-center">
            Connect in over 270 destinations
          </h2>
          <div className="w-full lg:w-[541px]  justify-center mx-auto items-center  mt-8 !mb-20 flex flex-col gap-3 md:gap-7">
            <div className="relative mt-0 w-full  mx-auto md:mx-0">
              <div className="flex items-center pr-1.5 py-0 rounded-full border border-[#3BC852] hover:bg-green-50 transition !pl-6   bg-white h-auto md:h-[72px]">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  onKeyDown={async (e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (filteredCountries.length > 0) {
                        await handleSelectCountry(filteredCountries[0]);
                      }
                      else {
                        toast.error("We are not currently serving here")
                      }
                    }
                  }}
                  placeholder="Choose Your Destination"
                  className="flex-1 bg-transparent text-[16px] md:text-[22px] text-[#006110] placeholder-[#006110] focus:outline-none"
                />
                <button
                  type="button"
                  className="bg-[#3BC852] h-10 md:h-[57px] w-10 my-2 mx-1 md:m-0 md:w-[57px] text-white px-3 py-2 sm:py-3 rounded-full flex items-center justify-center ml-3 sm:ml-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 sm:h-5 sm:w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>

              {/* 🔽 Dropdown Results */}
              {showDropdown && filteredCountries.length > 0 && (
                <ul className="absolute z-10 bg-white border border-gray-200 rounded-xl mt-2 w-full max-h-60 overflow-y-auto shadow-lg">
                  {filteredCountries.map((country: cunt) => (
                    <li
                      key={country.id}
                      onClick={() => handleSelectCountry(country)}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-green-100 cursor-pointer"
                    >
                      {country.name}
                    </li>
                  ))}
                </ul>
              )}

              {/* No Results */}
              {showDropdown &&
                searchTerm.trim() !== "" &&
                filteredCountries.length === 0 && (
                  <div className="absolute z-10 bg-white border border-gray-200 rounded-xl mt-2 w-full shadow-md px-4 py-2 text-sm text-gray-500">
                    No countries found
                  </div>
                )}
            </div>

            {/* 🌍 Popular Countries */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-0 md:mt-1 ">
              {countries &&
                countries.length > 0 &&
                countries.slice(0, 6).map((country: cunt) => (
                  <span
                    key={country.id}
                    onClick={() => handleSelectCountry(country)}
                    className="bg-[#F3F5F7] text-[#64748B] px-3 py-1 rounded-full text-xs sm:text-[16px] hover:bg-green-100 hover:text-green-700 transition cursor-pointer"
                  >
                    {country.name}
                  </span>
                ))
              }
            </div>
          </div>
        </div>

        <div role="tabpanel" aria-label="Country specific plans" className="w-full">
          {countries.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <svg
                className="animate-spin h-8 w-8 text-[#3BC852]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
              </svg>
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 sm:gap-6 justify-center mt-4">
              {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                countries.map((item: any, index: number) => {
                  const basicPlan = basicPlanByCountry[item.id];
                  const basicPriceText = item?.price ? `$${Number(item.price).toFixed(2)}` : "—";

                  return (
                    <div
                      key={index}
                      onClick={() => handleNavigate(item.id)}
                      className="bg-white cursor-pointer border-gray-200 rounded-[8px] hover:bg-green-50 hover:border-[#3BC852] border-2 transition duration-300 p-4 w-full sm:w-[48%] lg:w-[31%] xl:w-[23%]"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <Flag
                            countryName={item.name}
                            size={36}
                            className="h-[36px] w-[36px]"
                          />
                          <p className="text-sm sm:text-base md:text-lg font-medium">
                            {item.name}
                          </p>
                        </div>

                        {basicPriceText !== "—" ? (
                          <p className="text-xs flex flex-col text-gray-500">
                            Starting from
                            <span className="font-semibold text-gray-800 text-[16px]">
                              {basicPriceText}
                            </span>
                          </p>
                        ) : (
                          <p className="text-xs text-gray-400">Plans coming soon</p>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>

      {/* <EasyStep />
      <TrustedTravel />
      <FAQ faqs={list} /> */}
    </>

  );
}

export default Country;
