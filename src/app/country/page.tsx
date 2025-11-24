"use client";
import { useNavigate } from '@/components/hooks/navigation';
import Flag from '@/components/ui/Flag';
import { fetchUserDetails } from '@/redux/slice/UserSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchCountries } from '@/redux/thunk/thunk';
import { useRouter } from 'next/navigation';
import React, { useEffect, useMemo, useState } from 'react';

function Country() {

  const dispatch = useAppDispatch();
  const router = useRouter();
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

  return (
    <div className="mt-6 w-full p-10">
      {/* Heading + Info Left Aligned */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
          Explore Countries
        </h2>
        <p className="text-gray-600 text-sm md:text-base mt-1 max-w-2xl">
          Select your destination to view eSIM plans and pricing available for that country.
          Choose the best plan and activate instantly.
        </p>
      </div>

      <div role="tabpanel" aria-label="Country specific plans" className="w-full">
        {countries.length === 0 ? (
          <div className="flex items-center py-12">
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
          <div className="flex flex-wrap gap-4 sm:gap-6 justify-start mt-4">
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
  );
}

export default Country;
