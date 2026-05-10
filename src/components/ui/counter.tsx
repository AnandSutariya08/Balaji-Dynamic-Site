"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface CounterProps {
  value: number;
  direction?: "up" | "down";
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function Counter({
  value,
  direction = "up",
  className,
  prefix = "",
  suffix = "",
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? value : 0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (isInView) {
      motionValue.set(direction === "down" ? 0 : value);
    }
  }, [motionValue, isInView, value, direction]);

  useEffect(
    () =>
      springValue.on("change", (latest) => {
        setDisplayValue(Intl.NumberFormat("en-US").format(Math.round(latest)));
      }),
    [springValue]
  );

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
