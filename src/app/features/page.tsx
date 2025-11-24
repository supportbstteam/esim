"use client";

import React, { useEffect } from "react";
import TrustedTravel from "@/components/home/TrustedTravel";
import FAQ from "@/components/home/Faq";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchFaqs } from "@/redux/slice/FaqSlice";

function Features() {
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
              <h2 className="text-[#1A0F33] font-bold text-[16px]">FEATURES</h2>
              <h2 className="text-3xl md:text-[42px] font-bold mt-3 text-[#1A0F33] leading-snug">
                Discover the <br /> Power of eSIM
              </h2>
            </div>

            <div className="w-full md:w-[50%] flex flex-col gap-5 md:gap-8">
              <p className="text-[#64748B] text-[16px] md:text-[20px] leading-6">
                Experience seamless mobile connectivity designed for modern travelers.
                Activate your eSIM instantly and stay connected wherever you go.
              </p>

              <p className="text-[#64748B] text-[16px] md:text-[20px] leading-6">
                Flexible plans and secure global coverage give you full control —
                no physical SIMs, no hidden fees, just hassle-free travel-ready connectivity.
              </p>
            </div>
          </div>

          {/* Instant Activation */}
          <div className="mt-10 md:mt-20 flex flex-col md:flex-row justify-start items-center gap-10 md:gap-30">
            <img
              src="https://esim-olive.vercel.app/esim_card.webp"
              className="w-full md:max-h-[400px] md:w-1/3 rounded-xl object-cover"
              alt="activation"
            />

            <div className="w-full md:w-1/2">
              <div className="text-[#3BC852] text-3xl mb-8">
                <span className="material-symbols-outlined bg-[#F3F5F7] rounded-md p-2">
                  electric_bolt
                </span>
              </div>

              <h3 className="text-2xl md:text-[32px] text-[#1A0F33] font-semibold mb-8">
                Instant Activation
              </h3>

              <ul className="space-y-8 text-[#64748B] text-xl md:text-[20px] mainlist">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined">check</span>
                  No Waiting or Hassle: Forget physical SIM cards and complicated setups.
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined">check</span>
                  Instant Activation: Simply scan the QR code or follow the in-app process to get connected immediately.
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined">check</span>
                  Traveler-Ready Connectivity: Access data, calls, and messaging the moment you land.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SAFE & TRUSTWORTHY */}
        <section className="pb-15 md:pb-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12">
            <div className="w-full md:w-1/2">
              <div className="text-[#3BC852] text-3xl mb-8">
                <span className="material-symbols-outlined bg-[#F3F5F7] rounded-md p-2">
                  assured_workload
                </span>
              </div>

              <h3 className="text-2xl md:text-[32px] text-[#1A0F33] font-semibold mb-8">
                Safe, Stable, and Trustworthy
              </h3>

              <ul className="space-y-8 text-[#64748B] text-xl md:text-[20px] mainlist">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined">check</span>
                  Reliable Connections – Stay online without interruptions, powered by top global carriers.
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined">check</span>
                  Secure Data – Your internet activity, calls, and messages are protected at all times.
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined">check</span>
                  Peace of Mind – Enjoy worry-free connectivity whether traveling for business or leisure.
                </li>
              </ul>
            </div>

            <img
              src="https://esim-olive.vercel.app/esim_active.webp"
              className="w-full md:w-1/3 rounded-xl object-cover"
              alt="security"
            />
          </div>
        </section>

        {/* FLEXIBLE / HASSLE-FREE */}
        <section className="pb-15 md:pb-20">
          <div className=" flex flex-col md:flex-row justify-start items-center gap-10 md:gap-30">
            <img
              src="https://esim-olive.vercel.app/esim_phone.webp"
              className="w-full md:w-1/3 rounded-xl object-cover"
              alt="simconnect"
            />

            <div className="w-full md:w-1/2">
              <div className="text-[#3BC852] text-3xl mb-8">
                <span className="material-symbols-outlined fill-red bg-[#F3F5F7] rounded-md p-2">
                  sim_card
                </span>
              </div>

              <h3 className="text-2xl md:text-[32px] text-[#1A0F33] font-semibold mb-8">
                Flexible, Convenient, Hassle-Free
              </h3>

              <ul className="space-y-8 text-[#64748B] text-xl md:text-[20px] mainlist">
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined">check</span>
                  Multi-Device Support – Use your eSIM on smartphones, tablets, and wearables without swapping SIM cards.
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined">check</span>
                  Easy Management – Top up data, switch plans, or track usage effortlessly via our app or dashboard.
                </li>
                <li className="flex items-start gap-2">
                  <span className="material-symbols-outlined">check</span>
                  Traveler-Friendly Experience – No local SIM stores, no complicated setups — just smooth, hassle-free connectivity wherever you go.
                </li>
              </ul>
            </div>
          </div>
        </section>

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

     {/* <TrustedTravel />
            <FAQ faqs={list} /> */}
    </div>
  );
}

export default Features;
