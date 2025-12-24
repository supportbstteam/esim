"use client";

import Lottie from "lottie-react";
import type { CSSProperties } from "react";

interface LottieAnimationProps {
  animationData: object;
  loop?: boolean;
  autoplay?: boolean;
  style?: CSSProperties;
}

export default function LottieAnimation({
  animationData,
  loop = true,
  autoplay = true,
  style,
}: LottieAnimationProps) {
  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      style={style}
    />
  );
}
