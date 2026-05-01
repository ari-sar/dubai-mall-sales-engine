"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { VideoBackground } from "@/components/ui/VideoBackground";
import type { EventHighlight } from "@/types";
import { Play, Users } from "lucide-react";

interface EventHighlightsProps {
  events: readonly EventHighlight[];
}

function formatAttendance(num: number): string {
  if (num >= 1000) return (num / 1000).toFixed(0) + "K";
  return num.toString();
}

export function EventHighlights({ events }: EventHighlightsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

function EventCard({ event }: { event: EventHighlight }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="group relative overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setShowModal(true)}
      >
        {/* Video / Image */}
        <div className="relative aspect-video">
          <VideoBackground
            src={event.video.src}
            poster={event.video.poster}
            preview={event.video.poster}
            autoPlay={isHovered}
            loop={true}
            muted={true}
            overlayOpacity={0.3}
            className="h-full"
          >
            <div className="flex h-full items-center justify-center">
              {!isHovered && (
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur">
                  <Play className="h-5 w-5 text-white fill-white" />
                </div>
              )}
            </div>
          </VideoBackground>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-medium text-white">{event.title}</h4>
              <p className="mt-1 text-sm text-neutral-400">{event.date}</p>
            </div>
            <div className="flex items-center gap-1 text-sm text-neutral-400">
              <Users className="h-4 w-4" />
              <span>{formatAttendance(event.attendance)}</span>
            </div>
          </div>
          <p className="mt-2 text-sm text-neutral-500">{event.description}</p>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <EventModal event={event} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}

function EventModal({ event, onClose }: { event: EventHighlight; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-xl bg-neutral-900"
        onClick={(e) => e.stopPropagation()}
      >
        <video
          src={event.video.src}
          poster={event.video.poster}
          controls
          autoPlay
          className="w-full aspect-video"
        />
        <div className="p-6">
          <h3 className="font-serif text-2xl text-white">{event.title}</h3>
          <p className="mt-2 text-neutral-400">{event.description}</p>
          <div className="mt-4 flex items-center gap-4 text-sm text-neutral-500">
            <span>{event.date}</span>
            <span>{formatAttendance(event.attendance)} attendees</span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full bg-black/50 p-2 text-white hover:bg-black/70"
        >
          ✕
        </button>
      </div>
    </div>,
    document.body
  );
}
