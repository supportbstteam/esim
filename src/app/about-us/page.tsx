"use client";

import React, { useEffect, useState } from 'react';
import TrustedTravel from '@/components/home/TrustedTravel';
import FAQ from "@/components/home/Faq";
import { useAppDispatch } from "@/redux/store";
import { useAppSelector } from "@/redux/store";
import Image from 'next/image';
import { fetchFaqs } from "@/redux/slice/FaqSlice";
const features = [
    {
        id: "coverage",
        iconKey: "language",
        title: "Global Coverage",
        description: "Connect in 200+ countries with one eSIM.",
    },
    {
        id: "activation",
        iconKey: "electric_bolt",
        title: "Instant Activation",
        description: "Set up in minutes. No physical SIM, no waiting.",
    },
    {
        id: "pricing",
        iconKey: "money_bag",
        title: "Affordable Plans",
        description:
            "Get transparent pricing and flexible data options for every journey.",
    },
    {
        id: "travel",
        iconKey: "beach_access",
        title: "Designed for Travelers",
        description:
            "Whether you're on a business trip or a world tour, we’ve got you covered.",
    },
];
const journeyData = {
    title: "The Story Behind Our Global eSIM Revolution",
    description:
        "Our story began with a simple idea: staying connected while traveling shouldn’t be complicated. From that belief, we built a platform that merges innovation and simplicity.",
    stats: [
        {
            iconKey: "language",
            heading: "200+ Countries",
            text: "Empowering travelers across the globe with seamless and reliable eSIM connectivity.",
        },
        {
            iconKey: "electric_bolt",
            heading: "1 Million+ eSIMs Activated",
            text: "Trusted by global explorers who stay connected anytime, anywhere.",
        },
    ],
};
function About() {
     const dispatch = useAppDispatch();
     useEffect(() => {
            dispatch(fetchFaqs());
        }, [dispatch]);
    const { list } = useAppSelector((state) => state?.faq);

    return (
        <div>
        <div className='container mb-10 md:mb-25'>
            <div className="about-layout">
                <div className=" mx-auto  pt-16 mb-10 md:mb-25 flex max-lg:flex-col justify-between">

                    <div className='flex flex-col gap-6 lg:gap-[57px]'>
                        <p className="text-[16px] font-semibold text-[#1A0F33] tracking-wide ">
                            ABOUT US
                        </p>
                        <h2 className="h1 !leading-tight lg:max-w-lg max-lg:mb-6">
                            Connecting the World,
                            One eSIM at a Time
                        </h2>
                    </div>

                    {/* Right Section */}
                    <div className="!text-[20px] subtext lg:max-w-lg leading-relaxed space-y-8">
                        <p>
                            We’re a global team of innovators, travelers, and tech enthusiasts
                            passionate about making connectivity effortless. Our mission is simple
                            — to help people stay online seamlessly, no matter where they are.
                        </p>
                        <p>
                            With our eSIM technology, you can forget about expensive roaming
                            charges, SIM swaps, or hunting for local stores. Just activate your
                            plan in minutes and explore the world with confidence.
                        </p>
                    </div>
                </div>
            </div>
            <div className="mb-10 md:mb-25">
                <Image src="/globabou.jpg" height={540} width={1248} alt='' className='w-full object-cover rounded-2xl  md:max-h-[540px]' />
            </div>
            <div className="about-layout mb-10 lg:mb-25">
                <div className=" mx-auto gap-6 lg:gap-[57px] pb-12  flex flex-col items-start justify-between">

                    <div className='flex'>
                        <p className="text-[16px] font-semibold text-[#1A0F33] tracking-wide uppercase">
                            Our Mission
                        </p>

                    </div>

                    {/* Right Section */}
                    <div className="flex max-lg:flex-col lg:gap-[25px]">
                        <h2 className="h1 w-full max-lg:mb-8 lg:w-[65%] !leading-tight tracking-tight">
                            To simplify global connectivity and empower every traveler with affordable, flexible, and reliable data access.
                        </h2>
                        <p className='!text-[20px] w-full lg:w-[35%] subtext  '>
                            We’re a global team of innovators, travelers, and tech enthusiasts passionate about making connectivity effortless. Our mission is simple — to help people stay online seamlessly, no matter where they are.
                        </p>

                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((f) => (
                        <div
                            key={f.id}
                            className="relative rounded-xl border border-gray-200 p-6 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
                            aria-labelledby={`feature-${f.id}-title`}
                        >
                            <div className="flex flex-col items-start gap-2">


                                <span className="material-symbols-outlined">
                                    {f.iconKey}
                                </span>


                                <div>
                                    <h3
                                        id={`feature-${f.id}-title`}
                                        className="text-[#1A0F33] text-[20px] m-0 font-semibold"
                                    >
                                        {f.title}
                                    </h3>
                                    <p className="mt-3 subtext text-sm leading-relaxed">
                                        {f.description}
                                    </p>
                                </div>
                            </div>

                            <div className="pointer-events-none absolute inset-0 rounded-xl border border-transparent" />
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex mb-10 lg:mb-25 justify-between flex-col md:flex-row gap-8 md:gap-16  pb-10">
                {/* Left content */}
                <div className="flex flex-col lg:max-w-[50%]">
                    <h3 className="text-[16px] font-semibold text-[#1A0F33] tracking-wide uppercase mb-12">OUR JOURNEY</h3>
                    <h1 className="h1 w-full lg:max-w-lg !leading-tight tracking-tight mb-9">{journeyData.title}</h1>
                    <p className="subtext !text-[20px] lg:max-w-[80%]">{journeyData.description}</p>

                    <div className="flex flex-col sm:flex-row gap-6 mt-3 lg:mt-12">
                        {journeyData.stats.map((stat, idx) => (
                            <div
                                key={idx}
                                className="border border-gray-300 rounded-lg p-6 flex-1"
                            >
                                <span className="material-symbols-outlined">
                                    {stat.iconKey}
                                </span>
                                <h4 className="text-[#1A0F33] font-semibold text-lg mb-1">{stat.heading}</h4>
                                <p className="subtext">{stat.text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right image */}
                <div className=" flex justify-center items-center lg:max-w-[50%]">
                    <Image
                        src="/fullshot_new.webp"
                        alt="Happy older travelers jumping"
                        height={528}
                        width={575}
                        className="lg:w-[575px]  object-cover rounded-[12px] lg:max-h-[528px]"
                    />
                </div>
            </div>
        </div>
            <TrustedTravel />
            <FAQ faqs={list} />
        </div>
    );
}

export default About;
