"use client";

import React, { JSX, useState } from "react";
import { Marquee } from "@/components/ui/marquee"; // path to your Marquee
import QuoteCard from "./QuoteCard"; // import your QuoteCard
import { ChevronRight } from "lucide-react";
import { useAppSelector } from "@/redux/store";
interface Quote {
  quote: string;
  name: string;
  designation: string;
  imageSrc?: string;
}

const quotes: Quote[] = [
  { quote: "Activating my eSIM took less than 5 minutes. No more hunting for local SIM cards at airports!", name: "Vikram Patel", designation: "Software Engineer", imageSrc: "/Frame_61.png" },
  { quote: "Activating my eSIM took less than 5 minutes. No more hunting for local SIM cards at airports!", name: "Jill", designation: "Frequent Traveler", imageSrc: "/Frame_62.png" },
  { quote: "Super reliable coverage and affordable data plans. Perfect for my travel-heavy schedule.", name: "John", designation: "Frequent Traveler", imageSrc: "/Frame_63.png" },
  { quote: "Activating my eSIM took less than 5 minutes. No more hunting for local SIM cards at airports!", name: "Jane", designation: "Frequent Traveler", imageSrc: "/Frame_61.png" },
  { quote: "Activating my eSIM took less than 5 minutes. No more hunting for local SIM cards at airports!", name: "Vikram Pate", designation: "Frequent Traveler", imageSrc: "/Frame_62.png" },
  { quote: "Activating my eSIM took less than 5 minutes. No more hunting for local SIM cards at airports!", name: "Amit Sharma", designation: "Frequent Traveler", imageSrc: "/Frame_63.png" },
];

const firstRow = quotes.slice(0, quotes.length / 2);
const secondRow = quotes.slice(quotes.length / 2);

export function QuoteSlider(): JSX.Element {
  const [paused, setPaused] = useState(false);
  const { testimonials } = useAppSelector(state => state?.testimonials);

  console.log("----- testimonials-----", testimonials);

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-12 container">
      {/* First row scrolls left */}
      <Marquee
        pauseOnHover={true} // handled via container
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
      </Marquee>

      {/* Second row scrolls right */}
      <Marquee
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
      </Marquee>

      {/* Gradient overlays */}
      <a href-="/" className="subtext !text-xl flex items-center gap-2">
        View All Testimonial <ChevronRight className="w-5 h-5 text-gray-500" />

      </a>
    </div>
  );
}
