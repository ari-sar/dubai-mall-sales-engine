"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface VideoBackgroundProps {
  src: string;
  srcWebm?: string;
  poster: string;
  preview?: string;
  className?: string;
  overlay?: boolean;
  overlayOpacity?: number;
  children?: React.ReactNode;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: "auto" | "metadata" | "none";
  priority?: boolean;
}

export function VideoBackground({
  src,
  srcWebm,
  poster,
  preview,
  className,
  overlay = true,
  overlayOpacity = 0.5,
  children,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  preload = "auto",
  priority = false,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isInView) return;

    // Load video when in view
    video.load();

    const handleCanPlay = () => {
      setIsLoaded(true);
      if (autoPlay) {
        video.play().catch(() => {
          // Autoplay blocked — poster will show
        });
      }
    };

    video.addEventListener("canplay", handleCanPlay);
    return () => video.removeEventListener("canplay", handleCanPlay);
  }, [isInView, autoPlay]);

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
    >
      {/* Poster image — always visible until video loads */}
      <div
        className={cn(
          "absolute inset-0 bg-cover bg-center transition-opacity duration-700",
          isLoaded ? "opacity-0" : "opacity-100"
        )}
        style={{ backgroundImage: `url(${poster})` }}
      />

      {/* Video element */}
      {isInView && (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline={playsInline}
          preload={preload}
          aria-hidden="true"
        >
          {srcWebm && <source src={srcWebm} type="video/webm" />}
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* Dark overlay */}
      {overlay && (
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}
