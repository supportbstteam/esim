"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from '@/components/hooks/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { fetchCountries } from '@/redux/thunk/thunk';
import toast from 'react-hot-toast';
import { fetchPlans } from '@/redux/thunk/planThunk';

import { Country as cunt } from '@/types';

interface MainBannerProps {
  title?: string;
  subtitle?: string;
  backgroundImage?: string; // URL or local path
}

export default function MainBanner({
  title = 'Save More. Travel More. Stay Online.',
  subtitle = 'Activate your eSIM instantly and enjoy seamless global coverage.',
  backgroundImage = '/external_journey.webp',
}: MainBannerProps) {
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const { countries = [], loading } = useAppSelector((state) => state?.country ?? {});
  const filteredCountries = useMemo(() => {
    if (!searchTerm.trim()) return [];
    return countries.filter((country: cunt) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, countries]);

  const handleSelectCountry = async (country: cunt) => {
    setSearchTerm(country?.name);
    await dispatch(fetchPlans({ countryId: country?.id }));
    navigation(`/country/${country?.id}`);
    setShowDropdown(false);
  };

  return (
    <div>
      <div
        className="mt-0 mb-6 relative py-6 px-4 sm:py-16 sm:px-16"
        // dynamic background image handled via style so it can be updated at runtime
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom',
          backgroundSize: 'cover',
        }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-[#133366]/50 rounded-xl" />

        <h2 className="h1 relative z-10 !text-white text-center mb-2">{title}</h2>
        <p className="subtext !text-white text-center relative">{subtitle}</p>

        <div className="w-full lg:w-[541px] justify-center mx-auto items-center mt-8 flex flex-col gap-3 md:gap-4">
          <div className="relative mt-0 w-full mx-auto md:mx-0">
            <div className="flex items-center pr-1.5 py-0 rounded-full border border-[#3BC852] hover:bg-green-50 transition !pl-6 bg-white h-auto md:h-[72px]">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                onKeyDown={async (e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (filteredCountries.length > 0) {
                      await handleSelectCountry(filteredCountries[0]);
                    } else {
                      toast.error('We are not currently serving here');
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
            {showDropdown && searchTerm.trim() !== '' && filteredCountries.length === 0 && (
              <div className="absolute z-10 bg-white border border-gray-200 rounded-xl mt-2 w-full shadow-md px-4 py-2 text-sm text-gray-500">
                No countries found
              </div>
            )}
          </div>

          {/* 🌍 Popular Countries */}
          <div className="flex relative z-10 flex-wrap gap-0 justify-center md:justify-start mt-0 md:mt-1">
            {countries &&
              countries.length > 0 &&
              countries.slice(0, 6).map((country: cunt) => (
                <span
                  key={country.id}
                  onClick={() => handleSelectCountry(country)}
                  className=" text-white px-3 py-1 rounded-full text-xs sm:text-[16px] underline hover:text-green-700 transition cursor-pointer"
                >
                  {country.name}
                </span>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
