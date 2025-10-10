"use client";

import React, { useState, useMemo } from "react";
import { useAppSelector } from "@/redux/store";
import { Country } from "@/types";
import { useRouter } from "next/navigation";
import { useNavigate } from "./hooks/navigation";
import Image from "next/image";

export default function HeroSection() {
    const navigation = useNavigate();
    const router = useRouter();
    const { countries } = useAppSelector((state) => state.country);

    // 🔍 Local state for search
    const [searchTerm, setSearchTerm] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    // Filtered countries based on input
    const filteredCountries = useMemo(() => {
        if (!searchTerm.trim()) return [];
        return countries.filter((country: Country) =>
            country.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, countries]);

    // Handle selection
    const handleSelectCountry = (country: Country) => {
        setSearchTerm(country?.name);
        navigation(`/country/${country?.id}`)
        setShowDropdown(false);
    };

    return (
        <section className="relative bg-white  pt-20 pb-5 bg_wrap">
            <div className="container flex gap-[64px] flex-col-reverse md:flex-row items-start">
                {/* LEFT CONTENT */}
                <div className="md:w-[646px] space-y-6 flex flex-col justify-center text-center md:text-left">
                    {/* Badge */}
                    <span className="flex items-center w-fit mx-auto md:mx-0 bg-[#DBE6F966] px-4 py-3 rounded-full text-[#1A0F33] text-xs sm:text-sm md:text-base">
                        <img src="/Vector_best.png" className="h-[19px] mr-2" />
                        <span className="font-semibold text-[#1A0F33]">E-Sim Aero:</span>{" "}
                        World’s No. 1 E-Sim Provider
                    </span>

                    {/* Heading */}
                    <h1 className="tracking-[-4px] text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-extrabold text-[#1A0F33] leading-snug md:leading-tight m-0">
                        Affordable <span className="text-[#3BC852]">eSIM</span> Data for
                        International Travel
                    </h1>

                    {/* Description */}
                    <p className="text-gray-500 text-sm sm:text-base md:text-lg lg:text-xl mt-5 !mb-18">
                        Stay connected in 200+ countries with easy, roaming-free data.
                    </p>

                    {/* 🔍 Search / Destination Selector */}

                    <div className="w-full md:w-[541px] flex flex-col gap-7">
                        <div className="relative mt-0 w-full  mx-auto md:mx-0">
                            <div className="flex items-center pr-1 py-0 rounded-full border border-[#3BC852] hover:bg-green-50 transition !pl-6   bg-white h-auto md:h-[72px]">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setShowDropdown(true);
                                    }}
                                    onFocus={() => setShowDropdown(true)}
                                    placeholder="Choose Your Destination"
                                    className="flex-1 bg-transparent text-[22px] text-[#006110] placeholder-[#006110]  focus:outline-none "
                                />
                                <button
                                    type="button"
                                    className="bg-[#3BC852] h-[57px] w-[57px] text-white px-3 py-2 sm:py-3 rounded-full flex items-center justify-center ml-2 sm:ml-3"
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
                                    {filteredCountries.map((country: Country) => (
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
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-1">
                            {countries &&
                                countries.length > 0 &&
                                countries.slice(0, 6).map((country: Country) => (
                                    <span
                                        key={country.id}
                                        onClick={() => handleSelectCountry(country)}
                                        className="bg-[#F3F5F7] text-[#64748B] px-3 py-1 rounded-full text-xs sm:text-[16px] hover:bg-green-100 hover:text-green-700 transition cursor-pointer"
                                    >
                                        {country.name}
                                    </span>
                                ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT CONTENT */}
                <div className="w-full md:w-[534px] flex justify-center md:justify-end mb-6 md:mb-0">
                    <div className="relative w-full ">
                        <Image
                        height={700}
                        width={700}
                            src="/glob_new.png"
                            alt="Phone with eSIM"
                            className="w-full h-auto object-contain relative top-[-50px] left-[18px]"
                        />
                    </div>
                </div>
            </div>
        </section >
    );
}
