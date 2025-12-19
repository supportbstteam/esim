"use client";

import { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

/* eslint-disable @typescript-eslint/no-explicit-any */
export default function UserTemplate5({ data }: any) {
  const { heading, isCollapsable, description } = data || {};

  const [open, setOpen] = useState(!isCollapsable);

  if (!heading) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 mb-2 border border-gray-300 rounded-xl">

      {/* HEADER */}
      <div
        className={`flex items-center justify-between px-6 py-4 ${isCollapsable ? "cursor-pointer" : ""
          }`}
        onClick={() => {
          if (isCollapsable) setOpen((prev) => !prev);
        }}
      >
        <h3 className="font-semibold text-base text-black">
          {heading}
        </h3>

        {isCollapsable && (
          <span className="text-black">
            {open ? <FiMinus /> : <FiPlus />}
          </span>
        )}
      </div>

      {/* CONTENT */}
      {open && (
        <div className="px-6 pb-5 space-y-3 text-gray-600 text-sm leading-relaxed">
          {description?.paragraphs?.map(
            (para: any, index: number) => (
              <p key={index}>{para.content}</p>
            )
          )}
        </div>
      )}
    </div>
  );
}
