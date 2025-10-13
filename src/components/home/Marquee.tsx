'use client'
import { useEffect, useRef } from "react";

interface MarqueeProps {
  items: string[]; // multiple items
  speed?: number;
  fontSize?: string; // optional font size
}

const Marquee: React.FC<MarqueeProps> = ({ items, speed = 2, fontSize = "30px" }) => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let offset = 0;
    let animationFrame: number;

    const scroll = () => {
      if (marquee) {
        offset -= speed;
        if (Math.abs(offset) >= marquee.scrollWidth / 2) {
          offset = 0;
        }
        marquee.style.transform = `translateX(${offset}px)`;
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    scroll();

    return () => cancelAnimationFrame(animationFrame);
  }, [speed]);

  return (
    <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
      <div 
        ref={marqueeRef} 
        style={{ display: "flex" }}
      >
        {[...items, ...items].map((item, idx) => ( // duplicate items
          <span key={idx} className="items-center opacity-[24%] flex text-[#D9D9D9] !text-[24px] md:text-[36px]" style={{ marginRight: "50px", fontSize: "36px" }}>
           <span className=" !text-[44px]  md:text-[70px] leading-0 mt-[20px] md:mt-[25px] mr-10 ">*</span> {item} </span>
          
        ))}
      </div>
    </div>
  );
};

export default Marquee;


