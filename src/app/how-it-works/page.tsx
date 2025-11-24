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

        {/* SECTION 1 */}
        <section className="py-10 md:py-20">
          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12">
            <div className="w-full md:w-[35%] flex flex-col justify-between">
              <h2 className="text-[#1A0F33] font-bold text-[16px]">How its Works</h2>
              <h2 className="text-3xl md:text-[42px] font-bold mt-3 text-[#1A0F33] leading-snug">
                The Smarter Way to <br /> Stay Connected
              </h2>
            </div>

            <div className="w-full md:w-[55%] flex flex-col gap-5 md:gap-8">
              <p className="text-[#64748B] text-[16px] md:text-[20px] leading-6">
                Experience next-gen connectivity with our E-SIM technology. It’s 100% digital, quick to set up, and works seamlessly across countries giving you freedom, flexibility, and control over your mobile data.
              </p>

              <p className="text-[#64748B] text-[16px] md:text-[20px] leading-6">
                Connecting while traveling shouldn’t be complicated. With our E-SIM, it takes just a few taps pick your data plan, scan the QR, and you’re online in seconds, anywhere in the world.
              </p>
            </div>
          </div>
        </section>

        {/* STEP 1 */}
        <div className="flex flex-col-reverse md:flex-row justify-between gap-10 mb-10 md:mb-20">
          <div className="bg-[#F3F5F7] p-8 rounded-2xl w-full md:w-[40%] space-y-3">
            {/** Plan list */}
            <div className="rounded-[12px] py-5 px-7 flex justify-between items-center bg-white cursor-pointer mb-5">
              <div className="flex">
                <input type="radio" name="plan" className="mr-3 h-5 w-5 accent-[#64748B]" />
                <span className="font-medium bg-[#F7F7F8] w-[98px] h-[26px] rounded-2xl"></span>
              </div>
              <span className="text-gray-500 text-sm bg-[#F7F7F8] w-[59px] h-[26px] rounded-2xl"></span>
            </div>

            <div className="rounded-[12px] py-5 px-7 border border-[#3BC852] bg-[#F5FCF6] flex justify-between items-center mb-5">
              <div className="flex">
                <input type="radio" name="plan" className="mr-3 h-5 w-5 accent-[#1A0F33]" defaultChecked />
                <span className="font-medium">3 GB</span>
              </div>
              <span className="text-gray-500 text-sm">7 Days</span>
            </div>

            <div className="rounded-[12px] py-5 px-7 flex justify-between items-center bg-white cursor-pointer mb-5">
              <div className="flex">
                <input type="radio" name="plan" className="mr-3 h-5 w-5 accent-[#64748B]" />
                <span className="font-medium bg-[#F7F7F8] w-[98px] h-[26px] rounded-2xl"></span>
              </div>
              <span className="text-gray-500 text-sm bg-[#F7F7F8] w-[59px] h-[26px] rounded-2xl"></span>
            </div>

            <div className="rounded-[12px] py-5 px-7 flex justify-between items-center bg-white cursor-pointer">
              <div className="flex">
                <input type="radio" name="plan" className="mr-3 h-5 w-5 accent-[#64748B]" />
                <span className="font-medium bg-[#F7F7F8] w-[98px] h-[26px] rounded-2xl"></span>
              </div>
              <span className="text-gray-500 text-sm bg-[#F7F7F8] w-[59px] h-[26px] rounded-2xl"></span>
            </div>
          </div>

          <div className="flex flex-col gap-6 md:gap-8 w-full md:w-[45%]">
            <h2 className="text-lg font-bold bg-[#F3F5F7] rounded-4xl px-4 py-3 w-fit">01</h2>
            <h3 className="h2">Pick Your Plan</h3>
            <p className="subtext">
              Browse from a wide range of data plans available for your travel destination. Pick the one that fits your needs and budget.
            </p>
            <button className="border-[#1A0F33] border px-6 py-3 hover:bg-[#1A0F33] hover:text-white rounded-full text-[#1A0F33] font-light w-fit">
              View All Plan
            </button>
          </div>
        </div>

        {/* STEP 2 */}
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-10 md:mb-20">
          <div className="w-full md:w-[45%] flex flex-col gap-8">
            <h2 className="text-lg font-bold bg-[#F3F5F7] rounded-4xl px-4 py-3 w-fit">02</h2>
            <h3 className="h2">Install Your eSIM</h3>
            <p className="subtext">Instantly receive your QR code by email after purchase. Scan the code using your phone to activate your eSIM.</p>
            <button className="border-[#1A0F33] border px-6 py-3 hover:bg-[#1A0F33] hover:text-white rounded-full text-[#1A0F33] font-light w-fit">
              Setup Guide
            </button>
          </div>

          <div className="flex w-full md:w-[40%] bg-[#F3F5F7] p-8 rounded-2xl flex-col items-center">
            <div className="flex flex-col gap-6 text-sm text-[#64748B] w-full">
              <label className="flex items-center gap-2 cursor-pointer mb-5">
                <input type="radio" name="install" className="accent-[#64748B] h-5 w-5" defaultChecked /> QR Code
              </label>

              <img src="/Frame_qr.png" alt="QR Code" className="max-h-[169px] w-auto mx-auto" />

              <label className="flex items-center gap-2 cursor-pointer mt-5">
                <input type="radio" className="accent-[#64748B] h-5 w-5" name="install" /> Activate By Link
              </label>
            </div>
          </div>
        </div>

        {/* STEP 3 */}
        <div className="flex flex-col-reverse md:flex-row-reverse justify-between gap-10 mb-10 md:mb-20">
          <div className="w-full md:w-[45%] flex flex-col gap-8">
            <h2 className="text-lg font-bold bg-[#F3F5F7] rounded-4xl px-4 py-3 w-fit">03</h2>
            <h3 className="h2">Stay Connected Globally</h3>
            <p className="subtext">
              Once installed, you can start using your eSIM immediately. Enjoy high-speed data wherever you go — no SIM card swaps needed!
            </p>
            <button className="border-[#1A0F33] border px-6 py-3 hover:bg-[#1A0F33] hover:text-white rounded-full text-[#1A0F33] font-light w-fit">
              Check Device Compatibility
            </button>
          </div>

          <div className="w-full md:w-[40%] bg-[#F3F5F7] p-8 rounded-2xl">
            {/* Card 1 */}
            <div className="border border-[#3BC852] rounded-xl py-4 px-7 bg-[#F5FCF6] flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <img src="/us_flag.png" alt="" className="rounded-4xl" />
                <span className="text-[#309E3A] bg-[#309E3A3D] rounded-3xl px-2 py-1 text-xs font-semibold">ACTIVE</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-medium text-[#1A0F33]">United States</span>
                <p className="text-sm text-gray-500">7 Days</p>
              </div>

              <p className="text-[16px] flex justify-between">
                Remaining Data <span className="font-semibold text-[#1A0F33]">20/30 GB</span>
              </p>

              <p className="text-[16px] flex justify-between">
                Expires in <span className="font-semibold text-[#1A0F33]">29 D, 7 H</span>
              </p>
            </div>

            {/* Card 2 */}
            <div className="rounded-xl py-4 px-7 bg-white flex flex-col gap-2 mt-5">
              <div className="flex items-center justify-between">
                <img src="/swed_flag.png" alt="" className="rounded-4xl" />
                <span className="bg-[#F7F7F8] w-[58px] h-[20px] rounded-2xl"></span>
              </div>

              <div className="flex items-center justify-between">
                <span className="bg-[#F7F7F8] w-[98px] h-[26px] rounded-2xl"></span>
                <p className="bg-[#F7F7F8] w-[58px] h-[26px] rounded-2xl"></p>
              </div>

              <p className="text-[16px] flex justify-between">
                <span className="bg-[#F7F7F8] w-[98px] h-[26px] rounded-2xl"></span>
                <span className="bg-[#F7F7F8] w-[58px] h-[26px] rounded-2xl"></span>
              </p>

              <p className="text-[16px] flex justify-between">
                <span className="bg-[#F7F7F8] w-[98px] h-[26px] rounded-2xl"></span>
                <span className="bg-[#F7F7F8] w-[58px] h-[26px] rounded-2xl"></span>
              </p>
            </div>
          </div>
        </div>

        {/* DEVICE CHECK SECTION */}
        <div className="flex flex-col md:flex-row p-8 gap-10 rounded-2xl bg-[#E5EFF780] justify-between mb-10 md:mb-20">
          <img src="/howits.webp" className="rounded-xl w-full md:w-[40%] object-cover" />

          <div className="w-full md:w-[45%] flex flex-col gap-8">
            <h3 className="h2">Check Device Compatibility</h3>
            <p className="subtext">
              Verify Your Device – Make sure your phone or tablet supports eSIM activation for seamless connectivity.
            </p>
            <p className="subtext">
              Get Started Instantly – Checking takes just a few seconds, so you can enjoy a hassle-free start to your travel experience.
            </p>
            <button className="border-[#1A0F33] border px-6 py-3 hover:bg-[#1A0F33] hover:text-white rounded-full text-[#1A0F33] font-light w-fit">
              Check Device Compatibility
            </button>
          </div>
        </div>

        {/* WHY IT'S SO EASY */}
        <section className="pb-15 md:pb-20">
          <h2 className="text-[#1A0F33] font-bold text-[16px] tracking-wider mb-10 md:mb-12">
            WHY IT’S SO EASY
          </h2>

          <div className="flex flex-col lg:flex-row justify-between gap-8 md:gap-12">
            <h3 className="text-3xl md:text-[42px] font-bold text-[#1A0F33] lg:max-w-[60%] leading-snug">
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
      </div>

      <TrustedTravel />
      <FAQ faqs={list} />
    </div>
  );
}

export default HowItsWorks;
