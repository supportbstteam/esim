"use client";

import React, { useEffect } from "react";
import TrustedTravel from "@/components/home/TrustedTravel";
import FAQ from "@/components/home/Faq";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchFaqs } from "@/redux/slice/FaqSlice";

function HowItsWorks() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFaqs());
  }, [dispatch]);

  const { list } = useAppSelector((state) => state?.faq);

  return (
    <div>
      <div className="container px-4 md:px-6 mb-10 md:mb-20">

        {/* FEATURES SECTION */}
        <section className="py-10 md:py-20">
          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12">
            <div className="w-full md:w-[35%] flex flex-col justify-between">
              <h2 className="text-[#1A0F33] font-bold text-[16px]">How its Works</h2>
              <h2 className="text-3xl md:text-[42px] font-bold mt-3 text-[#1A0F33] leading-snug">
                The Smarter Way to  <br /> Stay Connected
              </h2>
            </div>

            <div className="w-full md:w-[50%] flex flex-col gap-5 md:gap-8">
              <p className="text-[#64748B] text-[16px] md:text-[20px] leading-6">
                Experience next-gen connectivity with our E-SIM technology. It’s 100% digital, quick to set up, and works seamlessly across countries giving you freedom, flexibility, and control over your mobile data.
              </p>

              <p className="text-[#64748B] text-[16px] md:text-[20px] leading-6">
               Connecting while traveling shouldn’t be complicated. With our E-SIM, it takes just a few taps pick your data plan, scan the QR, and you’re online in seconds, anywhere in the world.
              </p>
            </div>
          </div>
        </section>

         <div className="  flex flex-row-reverse justify-between mb-20 ">
          <div className="flex flex-col w-1/2"                                            >

          
          <h2 className="text-lg font-bold mb-4 bg-white rounded-4xl px-4 py-3 w-fit">01</h2>
          <h3 className="h4 mb-3">Pick Your Plan</h3>
          <p className="subtext mb-10">
            Choose your travel destination and select a eSIM plan that matches your trip
          </p>
</div>
          <div className="bg-[#F3F5F7] p-8 rounded-2xl w-[35%] space-y-3 overflow-y-hidden scrollbar-hide">
            <div className="rounded-[12px] py-5 px-7 flex justify-between items-center bg-white cursor-pointer hover:border-green-500 mb-5">
              <div className="flex"><input type="radio" name="plan" className="mr-3 h-5 w-5 accent-[#64748B] checked:accent-[#1A0F33]" />
                <span className="font-medium bg-[#F7F7F8] w-[98px] h-[26px] rounded-2xl"></span></div>
              <span className="text-gray-500 text-sm bg-[#F7F7F8] w-[59px] h-[26px]  rounded-2xl"></span>
            </div>
            <div className="rounded-[12px] py-5 px-7 flex justify-between items-center bg-white cursor-pointer hover:border-green-500 mb-5">
              <div className="flex"><input type="radio" name="plan" className="mr-3 h-5 w-5 accent-[#64748B] checked:accent-[#1A0F33]" defaultChecked />
                <span className="font-medium">3 GB</span></div>
              <span className="text-gray-500 text-sm">7 Days</span>
            </div>
            <div className="rounded-[12px] py-5 px-7 flex justify-between items-center bg-white cursor-pointer hover:border-green-500 mb-5">
              <div className="flex"><input type="radio" name="plan" className="mr-3 h-5 w-5 accent-[#64748B] checked:accent-[#1A0F33]" />
                <span className="font-medium bg-[#F7F7F8] w-[98px] h-[26px]  rounded-2xl"></span></div>
              <span className="text-gray-500 text-sm bg-[#F7F7F8] w-[59px] h-[26px]  rounded-2xl"></span>
            </div>
            <div className="rounded-[12px] py-5 px-7 flex justify-between items-center bg-white cursor-pointer hover:border-green-500 mb-0">
              <div className="flex"><input type="radio" name="plan" className="mr-3 h-5 w-5 accent-[#64748B] checked:accent-[#1A0F33]" />
                <span className="font-medium bg-[#F7F7F8] w-[98px] h-[26px]  rounded-2xl"></span></div>
              <span className="text-gray-500 text-sm bg-[#F7F7F8] w-[59px] h-[26px]  rounded-2xl"></span>
            </div>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-[#F3F5F7] p-8 rounded-2xl ">
          <h2 className="text-lg font-bold mb-4 bg-white rounded-4xl px-4 py-3 w-fit">02</h2>
          <h3 className="h4 mb-3">Install Your eSIM</h3>
          <p className="subtext mb-10">
            Get your QR code instantly by email. Scan it on your phone and your eSIM is ready to go.
          </p>

          <div className="flex bg-white rounded-xl flex-col items-center p-7 max-h-[304px] overflow-y-hidden scrollbar-hide">

            <div className="flex flex-col gap-2  text-sm text-[#64748B] subtext w-full">
              <label className="flex items-center gap-2 cursor-pointer mb-5">
                <input type="radio" name="install" className='accent-[#64748B] h-5 w-5' defaultChecked /> QR Code
              </label>

              <img
                src="/Frame_qr.png"
                alt="QR Code"
                className="max-h-[169px] w-auto mx-auto"
              />

              <label className="flex items-center gap-2 cursor-pointer mt-5">
                <input type="radio" className='accent-[#64748B] h-5 w-5' name="install" /> Activate By Link
              </label>
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-[#F3F5F7] p-8 rounded-2xl ">
          <h2 className="text-lg font-bold mb-4 bg-white rounded-4xl px-4 py-3 w-fit">03</h2>
          <h3 className="h4 mb-3">Stay Connected Globally</h3>
          <p className="subtext mb-10">
            Your plan starts, Track your usage in real-time and never worry about roaming fees
          </p>
             <div className="max-h-[304px] overflow-y-hidden scrollbar-hide">
          <div className="border-[#3BC852] border rounded-xl py-4 px-7 bg-[#F5FCF6] flex flex-col gap-2">
            <div className="flex items-center justify-between">

              <img src="/us_flag.png" className='rounded-4xl' alt="" />

              <span className="text-[#309E3A] bg-[#309E3A3D] rounded-3xl px-2 py-1 text-xs font-semibold">ACTIVE</span>

            </div>
            <div className="flex items-center justify-between">
              <span className="!font-medium !text-[#1A0F33] subtext">United States</span>
              <p className="text-sm text-gray-500">7 Days</p>
            </div>
            <p className="!text-[16px] subtext flex items-center justify-between">
              Remaining Data <span className="font-semibold text-[#1A0F33] text-[16px]">20/30 GB</span>
            </p>
            <p className="!text-[16px] subtext flex items-center justify-between">
              Expires in <span className="font-semibold text-[#1A0F33] text-[16px]">29 D, 7 H</span>
            </p>
          </div>
          <div className=" rounded-xl py-4 px-7 bg-[#fff] flex flex-col gap-2 mt-5">
            <div className="flex items-center justify-between">

              <img src="/swed_flag.png" className='rounded-4xl' alt="" />
              <span className=" bg-[#F7F7F8] w-[58px] h-[20px]  rounded-2xl"></span>

            </div>
            <div className="flex items-center justify-between">
              <span className="bg-[#F7F7F8] w-[98px] h-[26px]  rounded-2xl"></span>
              <p className="bg-[#F7F7F8] w-[58px] h-[26px]  rounded-2xl"></p>
            </div>
            <p className="!text-[16px] subtext flex items-center justify-between">
              <span className='bg-[#F7F7F8] w-[98px] h-[26px]  rounded-2xl'></span> <span className="bg-[#F7F7F8] w-[58px] h-[26px]  rounded-2xl"></span>
            </p>
            <p className="!text-[16px] subtext flex items-center justify-between">
              <span className='bg-[#F7F7F8] w-[98px] h-[26px]  rounded-2xl'></span> <span className="bg-[#F7F7F8] w-[58px] h-[26px]  rounded-2xl"></span>
            </p>
          </div>
          </div>
        </div>

     

        {/* WHY IT'S SO EASY */}
        <section className="pb-15 md:pb-20">
          <h2 className="text-[#1A0F33] font-bold text-[16px] tracking-wider mb-10 md:mb-12">
            WHY IT’S SO EASY
          </h2>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 md:gap-12">
            <h3 className="text-3xl md:text-[42px] font-bold text-[#1A0F33] leading-snug lg:max-w-[60%]">
              Built for travelers — enjoy fast <br />
              activation, flexible plans, and global <br />
              connectivity with our digital E-SIM.
            </h3>

            <p className="text-[#64748B] text-xl md:text-[20px] lg:max-w-[38%]">
              Our eSIM is designed to make travel effortless. With quick activation, flexible data plans, and global compatibility, you can stay connected anywhere without the hassle of physical SIM cards or complex setups.
            </p>
          </div>

          <div className="mt-12">
            <img
              src="https://esim-olive.vercel.app/globabou.jpg"
              className="w-full rounded-xl h-[300px] md:h-[540px] object-cover"
              alt="traveler"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { icon: "electric_bolt", title: "Instant Activation", desc: "Set up in minutes. No physical SIM, no waiting." },
              { icon: "language", title: "Global Coverage", desc: "Connect in 200+ countries with one eSIM." },
              { icon: "money_bag", title: "Affordable & Transparent", desc: "Get transparent pricing and flexible data options for every journey." },
              { icon: "beach_access", title: "Designed for Travelers", desc: "Whether you’re on a business trip or a world tour, we’ve got you covered." }
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-xl border-[#F3F5F7] border-2">
                <span className="material-symbols-outlined">{item.icon}</span>
                <h4 className="text-[20px] font-semibold mt-2">{item.title}</h4>
                <p className="text-[#64748B] mt-3">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-20 px-5 md:px-[58px] pb-2 pt-[63px] bg-[#E5EFF780] rounded-xl">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex flex-col gap-8 w-full md:w-[60%]">
              <h2 className="text-2xl md:text-[32px] text-[#1A0F33] font-semibold">
                Get Your eSIM Now
              </h2>

              <p className="text-[#64748B] text-xl md:text-[20px]">
                Activate your connection in minutes no physical SIM, no waiting. Just choose a plan, scan the QR code, and stay connected anywhere you travel.
              </p>

              <button className="border-[#1A0F33] border px-6 py-3 mb-[63px] rounded-full text-[#1A0F33] font-light w-fit">
                Buy Your Plan
              </button>
            </div>

            <div className="relative w-full md:w-[40%] flex justify-end">
              <img
                src="https://esim-olive.vercel.app/esim_popup.webp"
                className="w-full md:max-h-[490px] md:absolute bottom-0 object-contain"
                alt="active esim"
              />
            </div>
          </div>
        </section>
      </div>

      <TrustedTravel />
      <FAQ faqs={list} />
    </div>
  );
}

export default HowItsWorks;
