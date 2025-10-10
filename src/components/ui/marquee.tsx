import { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"
import React from "react"

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean
  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  const [paused, setPaused] = React.useState(false);

  return (
    <div
      {...props}
      className={cn(
        "flex [gap:var(--gap)] overflow-hidden p-2 [--duration:40s] [--gap:1rem]",
        { "flex-row": !vertical, "flex-col": vertical },
        className
      )}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 justify-around gap-[25px]",
              {
                "animate-marquee flex-row": !vertical && !reverse,
                "animate-marquee-reverse flex-row": !vertical && reverse,
                "animate-marquee-vertical flex-col": vertical && !reverse,
                "animate-marquee-vertical-reverse flex-col": vertical && reverse,
              }
            )}
            style={{ animationPlayState: paused ? "paused" : "running" }}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

