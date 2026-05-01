"use client";

import { cn } from "@/lib/utils";
import { navigateToSection } from "@/lib/navigation";

interface CTAButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
}

export function CTAButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
}: CTAButtonProps) {
  const handleClick = () => {
    if (href?.startsWith("#")) {
      navigateToSection(href.slice(1));
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-8 py-4 text-sm font-medium uppercase tracking-widest transition-all duration-300",
        variant === "primary"
          ? "bg-white text-black border border-white hover:bg-transparent hover:text-white hover:scale-[1.02]"
          : "border border-white/30 text-white hover:bg-white/10 hover:border-white/50",
        className
      )}
    >
      <span className="relative z-10">{children}</span>
    </button>
  );
}
