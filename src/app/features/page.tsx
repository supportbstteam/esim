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
      <div className="container mb-10 md:mb-25">

        {/* FEATURES SECTION */}
        <section className="px-0 lg:px-0 py-10 md:py-20">
          <div className="flex justify-between">
            <div className="w-[30%] flex flex-col justify-between">
              <h2 className="text-[#1A0F33] font-bold text-[16px] ">FEATURES</h2>
              <h2 className="text-4xl md:text-[42px] font-bold mt-3 text-[#1A0F33] leading-normal md:leading-[44px]">
                Discover the <br /> Power of eSIM
              </h2>
            </div>

            <div className="w-[50%] flex flex-col gap-5 md:gap-20">
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

          <div className="mt-10 md:mt-20 flex flex-col md:flex-row justify-between items-center gap-12">
            <img
              src="https://esim-olive.vercel.app/esim_card.webp"
              className="w-1/3 rounded-xl"
              alt="activation"
            />

            <div className="w-1/2">
              <div className="text-green-400 text-3xl mb-4">
                <span className="material-symbols-outlined bg-[#F3F5F7] rounded-xl p-4">
                  electric_bolt
                </span>
              </div>

              <h3 className="text-2xl md:text-[32px] text-[#1A0F33] font-semibold mb-4">
                Instant Activation
              </h3>

              <ul className="space-y-3 text-[#64748B] text-xl md:text-[20px] mainlist">
                  <li className="flex items-start gap-1"><span className="material-symbols-outlined ">                  check
                </span> No Waiting or Hassle: Forget physical SIM cards and complicated setups.</li>
                  <li className="flex items-start gap-1"><span className="material-symbols-outlined ">                  check
                </span> Instant Activation: Simply scan the QR code or follow the in-app process to get connected immediately.</li>
                  <li className="flex items-start gap-1"><span className="material-symbols-outlined ">                  check
                </span> Traveler-Ready Connectivity: Access data, calls, and messaging the moment you land.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SAFE & TRUSTWORTHY */}
        <section className="px-0 lg:px-0 pb-10 md:pb-20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="w-1/2">
              <div className="text-green-400 text-3xl mb-4">
                <span className="material-symbols-outlined bg-[#F3F5F7] rounded-xl p-4">
                  assured_workload
                </span>
              </div>

              <h3 className="text-2xl md:text-[32px] text-[#1A0F33] font-semibold mb-4">
                Safe, Stable, and Trustworthy
              </h3>

              <ul className="space-y-3 text-[#64748B] text-xl md:text-[20px] mainlist">
                <li className="flex items-start gap-1"><span className="material-symbols-outlined ">                  check
                </span> Reliable Connections – Stay online without interruptions, powered by top global carriers.</li>
                  <li className="flex items-start gap-1"><span className="material-symbols-outlined ">                  check
                </span> Secure Data – Your internet activity, calls, and messages are protected at all times.</li>
                  <li className="flex items-start gap-1"><span className="material-symbols-outlined ">                  check
                </span> Peace of Mind – Enjoy worry-free connectivity whether traveling for business or leisure.</li>
              </ul>
            </div>

            <img
              src="https://esim-olive.vercel.app/esim_active.webp"
              className="w-1/3 rounded-xl"
              alt="security"
            />
          </div>
        </section>

        {/* FLEXIBLE / HASSLE-FREE */}
        <section className="px-0 lg:px-0 pb-10 md:pb-20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12">
            <img
              src="https://esim-olive.vercel.app/esim_phone.webp"
              className="w-1/3 rounded-xl"
              alt="simconnect"
            />

            <div className="w-1/2">
              <div className="text-green-400 text-3xl mb-4">
                <span className="material-symbols-outlined bg-[#F3F5F7] rounded-xl p-4">
                  sim_card
                </span>
              </div>

              <h3 className="text-2xl md:text-[32px] text-[#1A0F33] font-semibold mb-4">
                Flexible, Convenient, Hassle-Free
              </h3>

              <ul className="space-y-3 text-[#64748B] text-xl md:text-[20px] mainlist">
                  <li className="flex items-start gap-1"><span className="material-symbols-outlined ">                  check
                </span> Multi-Device Support – Use your eSIM on smartphones, tablets, and wearables without swapping SIM cards.</li>
                  <li className="flex items-start gap-1"><span className="material-symbols-outlined ">                  check
                </span> Easy Management – Top up data, switch plans, or track usage effortlessly via our app or dashboard.</li>
                  <li className="flex items-start gap-1"><span className="material-symbols-outlined ">                  check
                </span> Traveler-Friendly Experience – No local SIM stores, no complicated setups — just smooth, hassle-free connectivity wherever you go.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* WHY IT'S SO EASY */}
        <section className="px-0 lg:px-0 pb-10 md:pb-20">
          <h2 className="text-[#1A0F33] font-bold text-[16px] tracking-wider mb-12">
            WHY IT’S SO EASY
          </h2>

          <div className="flex items-center justify-between">
            <h3 className="text-4xl md:text-[42px] font-bold text-[#1A0F33] leading-normal max-w-[60%]">
              Built for travelers — enjoy fast <br />
              activation, flexible plans, and global <br />
              connectivity with our digital E-SIM.
            </h3>

            <p className="text-[#64748B] text-xl md:text-[20px] max-w-[38%]">
              Our eSIM is designed to make travel effortless. With quick activation, flexible data plans, and global compatibility, you can stay connected anywhere without the hassle of physical SIM cards or complex setups.
            </p>
          </div>

          <div className="mt-12">
            <img
              src="https://esim-olive.vercel.app/globabou.jpg"
              className="w-full rounded-xl h-[540px] object-cover"
              alt="traveler"
            />
          </div>

          <div className="grid md:grid-cols-4 gap-6 mt-12">
            {[
              { icon: "electric_bolt", title: "Instant Activation", desc: "Set up in minutes. No physical SIM, no waiting." },
              { icon: "language", title: "Global Coverage", desc: "Connect in 200+ countries with one eSIM." },
              { icon: "money_bag", title: "Affordable & Transparent", desc: "Get transparent pricing and flexible data options for every journey." },
              { icon: "beach_access", title: "Designed for Travelers", desc: "Whether you’re on a business trip or a world tour, we’ve got you covered." },
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
        <section className="mt-40 px-5 md:px-[58px] pb-2 pt-[63px] bg-[#E5EFF780] rounded-xl">
          <div className="flex">
            <div className="flex flex-col gap-8 items-start w-[60%] mb-[50px]">
              <h2 className="text-2xl md:text-[32px] text-[#1A0F33] font-semibold">
                Get Your eSIM Now
              </h2>

              <p className="text-[#64748B] text-xl md:text-[20px]">
               Activate your connection in minutes no physical SIM, no waiting. Just choose a plan, scan the QR code, and stay connected anywhere you travel.
              </p>

              <button className="border-[#1A0F33] border px-6 py-3 rounded-full text-[#1A0F33] font-light">
                Buy Your Plan
              </button>
            </div>

            <div className="relative w-[40%] flex justify-end">
              <img
                src="https://esim-olive.vercel.app/esim_popup.webp"
                className="w-full md:max-h-[490px] absolute bottom-0"
                alt="active esim"
              />
            </div>
          </div>
        </section>

      </div>

      {/* COMPONENTS */}
      <TrustedTravel />
      <FAQ faqs={list} />
    </div>
  );
}

export default Features;
