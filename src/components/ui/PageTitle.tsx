import React from "react";
import Image from 'next/image'
interface PageTitleProps {
  title: string;
  subtitle: string;
  desk? : string;
  leftLogo?: string;  
  rightLogo?: string; 
  subclass?: string;
}

function PageTitle({ title, subtitle, leftLogo, rightLogo , desk, subclass }: PageTitleProps) {
  return (
    <div className="flex items-center justify-center relative p-0 container">
      {/* Left Logo */}
      {leftLogo && (
        <Image
        height={121} width={96}
          src={leftLogo}
          alt="Left Logo"
          className="absolute left-0 max-[800px]:hidden"
        />
      )}

      <div className="text-center">
        <h2 className={`${subclass} text-[26px] leading-normal md:text-[42px] tracking-tight  md:tracking-[-2px] font-bold text-[#1A0F33]`}>
          {title}
        </h2>
        <p className={`text-[#64748B] ${subclass} text-[16px] md:text-[20px] max-w-xl mx-auto mt-4 leading-6`}>
          {subtitle}
        </p>
       { desk && (<p className="text-[#64748B]  text-[16px] md:text-[20px] max-w-xl mx-auto m-0 leading-6">{desk}</p> )}
      </div>

      {/* Right Logo */}
      {rightLogo && (
        <Image
        height={135} width={135}
          src={rightLogo}
          alt="Right Logo"
          className="absolute right-0 max-[800px]:hidden"
        />
      )}
    </div>
  );
}

export default PageTitle;
