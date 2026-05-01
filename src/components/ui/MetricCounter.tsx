"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface MetricCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  context: string;
  duration?: number;
  className?: string;
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(0) + "K";
  }
  return num.toString();
}

export function MetricCounter({
  value,
  prefix = "",
  suffix = "",
  label,
  context,
  duration = 2,
  className,
}: MetricCounterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState("0");
  const [announced, setAnnounced] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const numberEl = numberRef.current;
    if (!container || !numberEl) return;

    const obj = { val: 0 };

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: value,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            setDisplayValue(formatNumber(Math.round(obj.val)));
          },
          onComplete: () => {
            setAnnounced(true);
          },
        });
      },
    });

    return () => {
      trigger.kill();
    };
  }, [value, duration]);

  return (
    <div ref={containerRef} className={cn("text-center", className)}>
      <span aria-live="polite" aria-atomic="true" className="sr-only">
        {announced ? `${prefix}${formatNumber(value)}${suffix} ${label}` : ""}
      </span>
      <div className="mb-2" aria-hidden="true">
        <span
          ref={numberRef}
          className="font-serif text-5xl font-light tracking-tight text-white md:text-7xl lg:text-8xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {prefix}
          {displayValue}
          {suffix}
        </span>
      </div>
      <div className="mb-1 text-sm font-medium uppercase tracking-widest text-neutral-400">
        {label}
      </div>
      <div className="text-sm text-neutral-500">{context}</div>
    </div>
  );
}
