"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { navigateToSection } from "@/lib/navigation";
import { ArrowRight } from "lucide-react";

interface PathCardProps {
  title: string;
  subtitle: string;
  image: string;
  href: string;
  status: "live" | "placeholder";
}

export function PathCard({ title, subtitle, image, href, status }: PathCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    navigateToSection(href.slice(1));
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={`Explore ${title}${status === "placeholder" ? " (coming soon)" : ""}`}
      className={cn(
        "group relative flex flex-col justify-end overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 transition-all duration-500",
        "h-[60vh] md:h-[70vh]",
        isHovered ? "flex-[1.2]" : "flex-1"
      )}
    >
      {/* Background image */}
      <div
        className={cn(
          "absolute inset-0 bg-cover bg-center transition-transform duration-700",
          isHovered ? "scale-105" : "scale-100"
        )}
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Overlay */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          isHovered ? "bg-black/40" : "bg-black/60"
        )}
      />

      {/* Content */}
      <div className="relative z-10 p-6 md:p-8">
        {status === "placeholder" && (
          <span className="mb-3 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70">
            Coming Soon
          </span>
        )}

        <h3 className="mb-2 font-serif text-2xl md:text-3xl font-light text-white">
          {title}
        </h3>

        <p
          className={cn(
            "text-sm text-neutral-300 transition-all duration-500",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          {subtitle}
        </p>

        <div
          className={cn(
            "mt-4 flex items-center gap-2 text-sm font-medium text-white transition-all duration-500",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <span>Explore</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </button>
  );
}
