import React from "react";

interface PageTitleProps {
  title: string;
  subtitle: string;
  desk? : string;
  leftLogo?: string;  // URL or import of left logo
  rightLogo?: string; // URL or import of right logo
}

function PageTitle({ title, subtitle, leftLogo, rightLogo , desk }: PageTitleProps) {
  return (
    <div className="flex items-center justify-center relative py-3 container">
      {/* Left Logo */}
      {leftLogo && (
        <img
          src={leftLogo}
          alt="Left Logo"
          className="absolute left-0 "
        />
      )}

      <div className="text-center">
        <h1 className="text-3xl md:text-[42px] font-bold text-[#1A0F33]">
          {title}
        </h1>
        <p className="text-[#64748B] text-[20px] max-w-xl mx-auto mt-3 leading-8">
          {subtitle}
        </p>
       { desk && (<p className="text-[#64748B] text-[20px] max-w-xl mx-auto m-0 leading-8">{desk}</p> )}
      </div>

      {/* Right Logo */}
      {rightLogo && (
        <img
          src={rightLogo}
          alt="Right Logo"
          className="absolute right-0"
        />
      )}
    </div>
  );
}

export default PageTitle;
