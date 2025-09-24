import Link from "next/link";
import React from "react";
import { LuFacebook } from "react-icons/lu";
import { RiTwitterXFill } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { CiLinkedin } from "react-icons/ci";
import { TbBrandWhatsapp } from "react-icons/tb";

export const Journey = () => {
    return (
       <div className="bg-[#E5EFF780] px-6 md:px-[10%] py-12 mt-10">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

    {/* Right Image - Mobile first */}
    <div className="order-1 md:order-2 flex justify-center md:justify-end">
      <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
        <img
          src="/journey.png"
          alt="Phone with eSIM"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>

    {/* Left Content */}
    <div className="order-2 md:order-1">
      <h1 className="text-[#1A0F33] font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight">
        One eSIM, Unlimited Journeys
      </h1>
      <h4 className="text-[#64748B] text-lg sm:text-xl mt-4">
        Fast setup, reliable coverage, and no hidden fees—so you can focus on
        your trip, not your SIM.
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
        <div>
          <h5 className="text-[#1A0F33] text-lg font-semibold">
            Instant Activation
          </h5>
          <p className="text-[#64748B] text-base mt-2">
            Choose from flexible local, regional, or global data packs that fit
            your budget.
          </p>
        </div>
        <div>
          <h5 className="text-[#1A0F33] text-lg font-semibold">
            Affordable Plans
          </h5>
          <p className="text-[#64748B] text-base mt-2">
            Enjoy safe browsing with encrypted connections wherever you go.
          </p>
        </div>
        <div>
          <h5 className="text-[#1A0F33] text-lg font-semibold">
            Secure & Private
          </h5>
          <p className="text-[#64748B] text-base mt-2">
            No waiting, no SIM cards—just scan the QR code and connect in
            minutes.
          </p>
        </div>
        <div>
          <h5 className="text-[#1A0F33] text-lg font-semibold">
            Trusted by Travelers
          </h5>
          <p className="text-[#64748B] text-base mt-2">
            Rated 4.7+ by thousands of users who rely on us for travel
            connectivity.
          </p>
        </div>
      </div>
    </div>

  </div>
</div>


    );
};
