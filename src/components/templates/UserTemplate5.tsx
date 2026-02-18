"use client";

import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function UserTemplate5({ data }: any) {

  /* ALWAYS call hooks first */
  const {
    heading,
    isCollapsable = true,
    description,
  } = data || {};

  const paragraphs =
    description?.paragraphs || [];

  const [open, setOpen] =
    useState(!isCollapsable);

  /* AFTER hooks, do conditional return */
  if (!data || !heading) return null;

  return (

    <section className="max-w-7xl mx-auto px-6 mb-4">

      <div className="border border-gray-300 rounded-xl overflow-hidden bg-white">

        {/* HEADER */}

        <div
          className={`flex items-center justify-between px-6 py-4 select-none ${
            isCollapsable
              ? "cursor-pointer hover:bg-gray-50"
              : ""
          }`}
          onClick={() => {
            if (isCollapsable) {
              setOpen(prev => !prev);
            }
          }}
        >

          {/* Heading HTML */}

          <div
            className="font-semibold text-base text-black leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: heading,
            }}
          />

          {/* Toggle icon */}

          {isCollapsable && (
            <span className="text-black text-lg">
              {open ? <FiMinus /> : <FiPlus />}
            </span>
          )}

        </div>



        {/* Content */}

        {open && (

          <div className="px-6 pb-6 pt-2 space-y-4">

            {paragraphs.map(
              (para: any, index: number) => (

                <div
                  key={index}
                  className="text-gray-600 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: para.content,
                  }}
                />

              )
            )}

          </div>

        )}

      </div>

    </section>

  );

}
