"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { navigateToSection, SECTIONS } from "@/lib/navigation";

export function MiniNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show nav after scrolling past hero
      setVisible(window.scrollY > window.innerHeight * 0.5);

      // Determine active section
      for (const section of SECTIONS) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3 transition-opacity duration-500",
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      aria-label="Section navigation"
    >
      {SECTIONS.map((section) => (
        <button
          key={section.id}
          onClick={() => navigateToSection(section.id)}
          className="group relative flex items-center justify-end"
          aria-label={`Go to ${section.label}`}
          aria-current={activeSection === section.id ? "true" : undefined}
        >
          {/* Label tooltip */}
          <span className="absolute right-8 whitespace-nowrap rounded bg-neutral-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
            {section.label}
          </span>

          {/* Dot */}
          <div
            className={cn(
              "rounded-full transition-all duration-300",
              activeSection === section.id
                ? "h-8 w-2 bg-white"
                : "h-2 w-2 bg-white/30 hover:bg-white/60"
            )}
          />
        </button>
      ))}
    </nav>
  );
}
