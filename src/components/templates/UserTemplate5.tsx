"use client";

import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function UserTemplate5({ data }: any) {

  const {
    heading,
    isCollapsable = true,
    description,
  } = data || {};

  const paragraphs = description?.paragraphs || [];

  const [open, setOpen] = useState(!isCollapsable);

  if (!data || !heading) return null;

  return (

    <section className="
      max-w-7xl 
      mx-auto 
      px-4 sm:px-6 lg:px-8 
      mb-4 sm:mb-6
    ">

      <div className="
        border 
        border-gray-300 
        rounded-lg sm:rounded-xl 
        overflow-hidden 
        bg-white
      ">

        {/* HEADER */}
        <div
          className={`
            flex 
            items-center 
            justify-between 
            px-4 sm:px-5 md:px-6 
            py-3 sm:py-4 
            select-none 
            transition-colors
            ${isCollapsable ? "cursor-pointer hover:bg-gray-50 active:bg-gray-100" : ""}
          `}
          onClick={() => {
            if (isCollapsable) {
              setOpen(prev => !prev);
            }
          }}
        >

          {/* Heading */}
          <div
            className="
              font-semibold 
              text-sm 
              sm:text-base 
              md:text-lg 
              text-black 
              leading-relaxed
              pr-3
            "
            dangerouslySetInnerHTML={{
              __html: heading,
            }}
          />

          {/* Toggle Icon */}
          {isCollapsable && (
            <span className="
              text-black 
              text-base 
              sm:text-lg 
              md:text-xl
              flex-shrink-0
            ">
              {open ? <FiMinus /> : <FiPlus />}
            </span>
          )}

        </div>


        {/* CONTENT */}
        {open && (
          <div className="
            px-4 sm:px-5 md:px-6 
            pb-4 sm:pb-5 md:pb-6 
            pt-1 sm:pt-2 
            space-y-3 sm:space-y-4
          ">

            {paragraphs.map((para: any, index: number) => (

              <div
                key={index}
                className="
                  text-gray-600 
                  text-xs 
                  sm:text-sm 
                  md:text-base 
                  leading-relaxed
                "
                dangerouslySetInnerHTML={{
                  __html: para.content,
                }}
              />

            ))}

          </div>
        )}

      </div>

    </section>

  );

}