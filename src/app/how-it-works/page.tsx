"use client";

import React, { useEffect } from "react";
import TrustedTravel from "@/components/home/TrustedTravel";
import FAQ from "@/components/home/Faq";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { fetchFaqs } from "@/redux/slice/FaqSlice";
import MainBanner from '@/components/ui/MainBanner';
import { fetchUserDetails } from "@/redux/slice/UserSlice";
import { fetchCountries } from "@/redux/thunk/thunk";
import { featurePlans } from "@/redux/thunk/planThunk";
import Image from "next/image";
import { Images } from "@/components/Images";
import Link from "next/link";
function HowItsWorks() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(featurePlans());
    dispatch(fetchCountries());
    dispatch(fetchFaqs());
    dispatch(fetchUserDetails());
  }, [dispatch]);

  const { list } = useAppSelector((state) => state?.faq);

  return (
    <div>
      <MainBanner title="Get Connected in Just a Few Steps" subtitle="From purchase to activation, our eSIM process is quick, simple, and designed for hassle-free travel." backgroundImage="/work_how.webp" />
      <div className="container px-4 md:px-6 mb-10 md:mb-20">

        {/* SECTION 1 */}
        <section className="pb-10 pt-10 md:pt-10 md:pb-20">
          <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12">
            <div className="w-full md:w-[35%] flex flex-col justify-between">
              <h2 className="text-[#1A0F33] font-bold text-[16px]">How its Works</h2>
              <h2 className="text-3xl md:text-[42px] font-bold mt-3 text-[#1A0F33] leading-snug">
                The Smarter Way to <br /> Stay Connected
              </h2>
            </div>

            <div className="w-full md:w-[55%] flex flex-col gap-5 md:gap-8">
              <p className="text-[#64748B] text-[16px] leading-6">
                Experience next-gen connectivity with our E-SIM technology. It’s 100% digital, quick to set up, and works seamlessly across countries giving you freedom, flexibility, and control over your mobile data.
              </p>

              <p className="text-[#64748B] text-[16px]  leading-6">
                Connecting while traveling shouldn’t be complicated. With our E-SIM, it takes just a few taps pick your data plan, scan the QR, and you’re online in seconds, anywhere in the world.
              </p>
            </div>
          </div>
        </section>

        {/* STEP 1 */}
        <div className="flex flex-col-reverse md:flex-row justify-between gap-10 mb-10 md:mb-20">
          <div className="bg-[#F3F5F7] p-8 rounded-2xl w-full md:w-[40%] space-y-3">
            {/** Plan list */}
            <Image
              alt="Plan1"
              src={Images.How1}
              className="w-full h-auto"
            />
          </div>

          <div className="flex flex-col gap-6 md:gap-8 w-full md:w-[45%]">
            <h2 className="text-lg font-bold bg-[#F3F5F7] rounded-4xl px-4 py-3 w-fit">01</h2>
            <h3 className="h2">Pick Your Plan</h3>
            <p className="subtext">
              Browse from a wide range of data plans available for your travel destination. Pick the one that fits your needs and budget.
            </p>
            <Link href="/country" className="border-[#1A0F33] border px-6 py-3 hover:bg-[#1A0F33] hover:text-white rounded-full text-[#1A0F33] font-light w-fit">
              View All Plan
            </Link>
          </div>
        </div>

        {/* STEP 2 */}
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-10 md:mb-20">
          <div className="w-full md:w-[45%] flex flex-col gap-8">
            <h2 className="text-lg font-bold bg-[#F3F5F7] rounded-4xl px-4 py-3 w-fit">02</h2>
            <h3 className="h2">Install Your eSIM</h3>
            <p className="subtext">Instantly receive your QR code by email after purchase. Scan the code using your phone to activate your eSIM.</p>
            <Link href="/set-up" className="border-[#1A0F33] border px-6 py-3 hover:bg-[#1A0F33] hover:text-white rounded-full text-[#1A0F33] font-light w-fit">
              Setup Guide
            </Link>
          </div>

          <div className="flex w-full md:w-[40%] bg-[#F3F5F7] p-8 rounded-2xl flex-col items-center">
            <Image
              alt="Plan1"
              src={Images.How2}
              className="w-full h-auto"
            />
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
            <Link href="/supports/devices" className="border-[#1A0F33] border px-6 py-3 hover:bg-[#1A0F33] hover:text-white rounded-full text-[#1A0F33] font-light w-fit">
              Check Device Compatibility
            </Link>
          </div>

          <div className="w-full md:w-[40%] bg-[#F3F5F7] p-8 rounded-2xl">
            {/* Card 1 */}
            <Image
              alt="Plan1"
              src={Images.How3}
              className="w-full h-auto"
            />
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
            <Link href="/supports/devices" className="border-[#1A0F33] border px-6 py-3 hover:bg-[#1A0F33] hover:text-white rounded-full text-[#1A0F33] font-light w-fit">
              Check Device Compatibility
            </Link>
          </div>
        </div>

        {/* WHY IT'S SO EASY */}
        <section className="pb-0">
          <h2 className="text-[#1A0F33] font-bold text-[16px] tracking-wider mb-10 md:mb-12">
            WHY IT’S SO EASY
          </h2>

          <div className="flex flex-col lg:flex-row justify-between gap-8 md:gap-12">
            <h3 className="h1">
              Built for travelers — enjoy fast <br />
              activation, flexible plans, and global <br />
              connectivity with our digital E-SIM.
            </h3>

            <p className="text-[#64748B] text-xl md:text-[20px] lg:max-w-[36%]">
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
    </div>
  );
}

export default HowItsWorks;
