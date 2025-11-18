import Link from "next/link";
import React from "react";
import Image from 'next/image'
import { ArrowRight } from "lucide-react";
export const Explore = () => {
  return (

    <div className="mb-6 md:mb-25 relative container">

      {/* Right Image - Mobile first */}
      {/* <div className="order-2 md:order-2 flex justify-center md:justify-end"> */}
      <div className="relative w-full ">
        {/* <Image
        height={400} width={1000}
          src="/bc.jpg"
          alt="Phone with eSIM"
          className="w-full max-h-[400px] object-cover object-[inherit]"
        /> */}
        <div className="absolute inset-0 !bg-[linear-gradient(to_top_right,#133366_15%,transparent_60%)] rounded-2xl sm:rounded-[50px]"></div>

        <video
          src="main_video.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full  max-h-[600px] object-cover object-top-10 rounded-2xl sm:rounded-[50px]"
        >
          Your browser does not support the video tag.
        </video>

      </div>
      {/* </div> */}

      {/* Left Content */}
      {/* <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent"></div> */}
     


      <div className=" absolute bottom-2 md:bottom-10 max-[425px]:!bottom-5 max-[370px]:!bottom-1 -translate-y-[0] left-10 gap-2 sm:gap-5 container flex items-start flex-col !max-w-[80%] sm:!max-w-[60%] !p-2 sm:!p-10 rounded-xl
">
        <h2 className="h1 text-start text-3xl md:!text-[56px] max-[425px]:!text-[20px] md:!leading-[60px] tracking-[-2px] !font-[900] !text-[#fff]">
          Your Global Connection Starts Here
        </h2>
        <p className="!text-white text-[16px] md:!text-[20px] max-[425px]:!text-[14px] ">
          One eSIM → Endless destinations, fast data, no physical SIM.
        </p>
        <a className="bg-[#fff] text-[#133365] max-[425px]:!text-[14px] max-[330px]:!text-[12px]  hover:text-white px-6 py-2.5 rounded-full hover:bg-[#3BC852] transition text-[16px]">Explore Esims Now</a>



      </div>

    </div>



  );
};
