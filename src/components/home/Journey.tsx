import Link from "next/link";
import React from "react";
import { LuFacebook } from "react-icons/lu";
import { RiTwitterXFill } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { CiLinkedin } from "react-icons/ci";
import { TbBrandWhatsapp } from "react-icons/tb";

export const Journey = () => {
    return (
       <div className="bg-[#E5EFF780]  pt-[88px] mt-[66px] ">
  <div className="container grid grid-cols-1 md:grid-cols-2 gap-10 items-end">

    {/* Right Image - Mobile first */}
    <div className="order-1 md:order-2 flex justify-center md:justify-end">
      <div className="relative w-full ">
        <img
          src="/journey.png"
          alt="Phone with eSIM"
          className="w-full h-full object-contain object-bottom"
        />
      </div>
    </div>

    {/* Left Content */}
    <div className="order-2 md:order-1  pb-[95px]">
      <h2 className="h1 leading-tight">
        One eSIM, Unlimited Journeys
      </h2>
      <h4 className="text-[#64748B] text-lg sm:text-xl mt-4">
        Fast setup, reliable coverage, and no hidden fees—so you can focus on
        your trip, not your SIM.
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8  gap-y-10 mt-18">
        <div>
          <span className="material-symbols-outlined">sim_card</span>
          <h5 className="text-[#1A0F33] text-lg font-semibold">
            Instant Activation
          </h5>
          <p className="text-[#64748B] text-base mt-2">
            Choose from flexible local, regional, or global data packs that fit
            your budget.
          </p>
        </div>
        <div>
          <span className="material-symbols-outlined">airplane_ticket</span>
          <h5 className="text-[#1A0F33] text-lg font-semibold">
            Affordable Plans
          </h5>
          <p className="text-[#64748B] text-base mt-2">
            Enjoy safe browsing with encrypted connections wherever you go.
          </p>
        </div>
        <div>
          <span className="material-symbols-outlined">encrypted</span>
          <h5 className="text-[#1A0F33] text-lg font-semibold">
            Secure & Private
          </h5>
          <p className="text-[#64748B] text-base mt-2">
            No waiting, no SIM cards—just scan the QR code and connect in
            minutes.
          </p>
        </div>
        <div>
          <span className="material-symbols-outlined">map</span>
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
