"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { Venue } from "@/types";
import { MapPin, Users, Monitor, Mic } from "lucide-react";

interface VenueMapProps {
  venues: readonly Venue[];
}

export function VenueMap({ venues }: VenueMapProps) {
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(venues[0]);

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 overflow-hidden">
      <div className="grid lg:grid-cols-2">
        {/* Interactive Map */}
        <div className="relative aspect-square bg-neutral-950">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Mall outline */}
            <rect
              x="10" y="10" width="80" height="80"
              fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"
            />

            {/* Venue markers */}
            {venues.map((venue) => (
              <g key={venue.id}>
                <circle
                  cx={venue.coordinates.x}
                  cy={venue.coordinates.y}
                  r={selectedVenue?.id === venue.id ? "4" : "3"}
                  fill={selectedVenue?.id === venue.id ? "#c9a96e" : "rgba(255,255,255,0.3)"}
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => setSelectedVenue(venue)}
                />
                {selectedVenue?.id === venue.id && (
                  <circle
                    cx={venue.coordinates.x}
                    cy={venue.coordinates.y}
                    r="6"
                    fill="none"
                    stroke="#c9a96e"
                    strokeWidth="0.5"
                    opacity="0.5"
                  >
                    <animate
                      attributeName="r"
                      values="6;8;6"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}
              </g>
            ))}
          </svg>

          {/* Map legend */}
          <div className="absolute bottom-4 left-4 text-xs text-neutral-500">
            Click a marker to view venue details
          </div>
        </div>

        {/* Venue Details */}
        <div className="p-6 lg:p-8">
          {selectedVenue ? (
            <div className="space-y-6">
              <div>
                <h4 className="font-serif text-2xl text-white">{selectedVenue.name}</h4>
                <p className="mt-1 text-sm text-neutral-400">{selectedVenue.pastEvents[0]}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-white/5 p-4">
                  <Users className="h-5 w-5 text-neutral-400 mb-2" />
                  <div className="text-2xl font-light text-white">
                    {selectedVenue.capacity.toLocaleString()}
                  </div>
                  <div className="text-xs text-neutral-500">Capacity</div>
                </div>
                <div className="rounded-lg bg-white/5 p-4">
                  <Monitor className="h-5 w-5 text-neutral-400 mb-2" />
                  <div className="text-sm text-white">{selectedVenue.av}</div>
                  <div className="text-xs text-neutral-500">A/V Specs</div>
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-neutral-500 mb-2">
                  Stage Configuration
                </div>
                <div className="text-sm text-white">{selectedVenue.stage}</div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wider text-neutral-500 mb-2">
                  Past Events
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedVenue.pastEvents.map((event) => (
                    <span
                      key={event}
                      className="rounded bg-white/5 px-2 py-1 text-xs text-neutral-300"
                    >
                      {event}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full rounded-full bg-white py-3 text-sm font-medium text-black border border-white hover:bg-transparent hover:text-white transition-all duration-300">
                Check Availability
              </button>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center text-neutral-500">
              Select a venue on the map
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
