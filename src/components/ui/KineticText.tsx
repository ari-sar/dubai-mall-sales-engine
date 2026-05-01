"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface KineticLine {
  text: string;
  delay?: number;
}

interface KineticTextProps {
  lines: readonly KineticLine[];
  className?: string;
  lineClassName?: string;
  onComplete?: () => void;
  startDelay?: number;
}

export function KineticText({
  lines,
  className,
  lineClassName,
  onComplete,
  startDelay = 0.5,
}: KineticTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const lineElements = container.querySelectorAll("[data-kinetic-line]");

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      lineElements.forEach((line, i) => {
        gsap.set(line, { opacity: i === lineElements.length - 1 ? 1 : 0, y: 0, rotateX: 0 });
      });
      onComplete?.();
      return;
    }

    const tl = gsap.timeline({
      delay: startDelay,
      onComplete: () => onComplete?.(),
    });

    timelineRef.current = tl;

    lineElements.forEach((line, index) => {
      const delay = lines[index]?.delay ?? index * 2.5;

      gsap.set(line, {
        opacity: 0,
        y: 60,
        rotateX: -15,
        transformPerspective: 1000,
      });

      tl.to(
        line,
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          ease: "power4.out",
        },
        delay
      );

      if (index < lineElements.length - 1) {
        tl.to(
          line,
          {
            opacity: 0,
            y: -40,
            duration: 0.8,
            ease: "power2.in",
          },
          delay + 2
        );
      }
    });

    return () => {
      tl.kill();
    };
  }, [lines, onComplete, startDelay]);

  return (
    <div ref={containerRef} className={cn("relative", className)} role="region" aria-label="Key statistics">
      <span className="sr-only">{lines.map((l) => l.text).join(". ")}</span>
      {lines.map((line, index) => (
        <div
          key={index}
          data-kinetic-line
          aria-hidden="true"
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            lineClassName
          )}
          style={{ opacity: 0 }}
        >
          <span className="text-center">{line.text}</span>
        </div>
      ))}
    </div>
  );
}
