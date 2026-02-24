"use client";

import React, { JSX, useEffect, useState } from "react";
import { Marquee } from "@/components/ui/marquee"; // path to your Marquee
import QuoteCard from "./QuoteCard"; // import your QuoteCard
import { ChevronRight } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { getAllTestimonials } from "@/redux/slice/TestimonialSlice";

export function QuoteSlider(): JSX.Element {
  const [paused, setPaused] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchTesti = async () => {
      await dispatch(getAllTestimonials());
    }
    fetchTesti();
  }, [dispatch]);
  const { testimonials } = useAppSelector(state => state?.testimonials);

  // console.log("----- testimonials-----", testimonials);

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-12 container">
      {/* First row scrolls left */}
      <Marquee
        pauseOnHover={true} // handled via container
        className="[--duration:50s] gap-[25px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          testimonials && testimonials.map((quote: any, idx) => (
            quote?.isActive && <div
              key={idx}
              style={{ animationPlayState: paused ? "paused" : "running" }}
            >
              <QuoteCard {...quote} />
            </div>
          ))}
      </Marquee>

      {/* Second row scrolls right */}
      {/* <Marquee
        reverse
        pauseOnHover={true}
        className="[--duration:50s] gap-[25px]"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {testimonials && testimonials.map((quote, idx) => (
          <div
            key={idx}
            style={{ animationPlayState: paused ? "paused" : "running" }}
          >
            <QuoteCard {...quote} />
          </div>
        ))}
      </Marquee> */}

      {/* Gradient overlays */}
      <a href-="/" className="subtext !text-xl flex items-center gap-2">
        View All Testimonial <ChevronRight className="w-5 h-5 text-gray-500" />

      </a>
    </div>
  );
}
