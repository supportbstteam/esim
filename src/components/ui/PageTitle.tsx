import React from "react";
import Image from 'next/image'
interface PageTitleProps {
  title: string;
  subtitle: string;
  desk? : string;
  leftLogo?: string;  // URL or import of left logo
  rightLogo?: string; // URL or import of right logo
}

function PageTitle({ title, subtitle, leftLogo, rightLogo , desk }: PageTitleProps) {
  return (
    <div className="flex items-center justify-center relative p-0 container">
      {/* Left Logo */}
      {leftLogo && (
        <Image
          src={leftLogo}
          alt="Left Logo"
          className="absolute left-0 "
        />
      )}

      <div className="text-center">
        <h2 className="text-3xl md:text-[42px] tracking-[-2px] font-bold text-[#1A0F33]">
          {title}
        </h2>
        <p className="text-[#64748B] text-[20px] max-w-xl mx-auto mt-4 leading-6">
          {subtitle}
        </p>
       { desk && (<p className="text-[#64748B] text-[20px] max-w-xl mx-auto m-0 leading-2.5">{desk}</p> )}
      </div>

      {/* Right Logo */}
      {rightLogo && (
        <Image
          src={rightLogo}
          alt="Right Logo"
          className="absolute right-0"
        />
      )}
    </div>
  );
}

export default PageTitle;
