import Link from "next/link";
import React from "react";
import { LuFacebook } from "react-icons/lu";
import { RiTwitterXFill } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";
import { CiLinkedin } from "react-icons/ci";
import { TbBrandWhatsapp } from "react-icons/tb";
import Image from 'next/image'
export const Journey = () => {
    return (
       <div className="bg-[#E5EFF780]  pt-[88px] mt-[0px] ">
  <div className="container grid grid-cols-1 md:grid-cols-1 gap-10 items-end">

    {/* Right Image - Mobile first */}
    {/* <div className="order-2 md:order-2 flex justify-center md:justify-end"> */}
      {/* <div className="relative w-full ">
        <Image
        height={700} width={700}
          src="/WCU.webp"
          alt="Phone with eSIM"
          className="w-full h-full object-contain object-bottom"
        />
      </div> */}
    {/* </div> */}

    {/* Left Content */}
    <div className="order-1 md:order-1 pb-8 md:pb-[95px]">
      <h2 className="h1 text-center text-3xl md:text-[42px] tracking-[-2px] font-bold text-[#1A0F33]">
        One eSIM, Unlimited Journeys
      </h2>
      <h4 className="text-[#64748B] text-center text-lg sm:text-xl mt-4">
        Fast setup, reliable coverage, and no hidden fees—so you can focus on
        your trip, not your SIM.
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-4 min-[500px]:grid-cols-2
gap-x-8  gap-y-10 mt-18">
        <div className="bg-white py-8 px-6 rounded-md border-1 flex flex-col items-center">
          <span className="material-symbols-outlined  rounded-full !text-white p-2 !text-[40px] bg-[#133365] p-4 bg-[#133365]">sim_card</span>
          <h5 className="text-[#1A0F33] text-lg font-semibold mt-4">
            Instant Activation
          </h5>
          <p className="text-[#64748B] text-base mt-2 text-center">
             No waiting, no SIM cards—just scan the QR code and connect in
            minutes.
           
          </p>
        </div>
        <div className="bg-white py-8 px-6 rounded-md border-1 flex flex-col items-center">
          <span className="material-symbols-outlined  rounded-full !text-white p-2 !text-[40px] bg-[#133365] p-4 bg-[#133365]">airplane_ticket</span>
          <h5 className="text-[#1A0F33] text-lg font-semibold mt-4">
            Affordable Plans
          </h5>
          <p className="text-[#64748B] text-base mt-2 text-center">
             Choose from flexible local, regional, or global data packs that fit
            your budget.
          </p>
        </div>
        <div className="bg-white py-8 px-6 rounded-md border-1 flex flex-col items-center">
          <span className="material-symbols-outlined  rounded-full !text-white p-2 !text-[40px] bg-[#133365] p-4 bg-[#133365]">encrypted</span>
          <h5 className="text-[#1A0F33] text-lg font-semibold mt-4">
            Secure & Private
          </h5>
          <p className="text-[#64748B] text-base mt-2 text-center">
            Enjoy safe browsing with encrypted connections wherever you go.
           
          </p>
        </div>
        <div className="bg-white py-8 px-6 rounded-md border-1 flex flex-col items-center">
          <span className="material-symbols-outlined  rounded-full !text-white p-2 !text-[40px] bg-[#133365] p-4 bg-[#133365]">map</span>
          <h5 className="text-[#1A0F33] text-lg font-semibold mt-4">
            Trusted by Travelers
          </h5>
          <p className="text-[#64748B] text-base mt-2 text-center">
            Rated 4.7+ by thousands of users who rely on us for travel
            connectivity.
          </p>
        </div>
      </div>
        <div className="flex flex-col items-center gap-4">
          <p className='text-[#64748B] text-center text-lg sm:text-xl mt-6'>Explore eSIMs and stay connected anywhere in the world.
</p>
<a className='mt-3 bg-[#133365] text-center text-[#fff] max-[425px]:!text-[14px] max-[330px]:!text-[12px]  hover:text-white px-6 py-2.5 rounded-full hover:bg-[#3BC852] transition text-[16px]'>Explore Esims Now</a>
        </div>
    </div>

  </div>
</div>


    );
};
