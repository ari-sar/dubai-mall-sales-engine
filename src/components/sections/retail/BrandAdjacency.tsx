"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { HeatZone } from "@/types";

interface BrandAdjacencyProps {
  zones: HeatZone[];
  className?: string;
}

export function BrandAdjacency({ zones, className }: BrandAdjacencyProps) {
  const [selectedZone, setSelectedZone] = useState<HeatZone | null>(
    zones.find((z) => z.name === "Luxury Corridor") ?? zones[0] ?? null
  );

  return (
    <div className={cn("rounded-xl bg-neutral-900 border border-neutral-800 p-6", className)}>
      <h3 className="mb-6 font-serif text-xl font-light text-white">
        Brand Adjacency
      </h3>

      {/* Zone selector */}
      <div className="mb-6 flex flex-wrap gap-2">
        {zones.map((zone) => (
          <button
            key={zone.id}
            onClick={() => setSelectedZone(zone)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              selectedZone?.id === zone.id
                ? "bg-white text-black"
                : "bg-white/10 text-neutral-300 hover:bg-white/20"
            )}
          >
            {zone.name}
          </button>
        ))}
      </div>

      {/* Selected zone details */}
      {selectedZone ? (
        <div className="space-y-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-neutral-500 mb-1">
              Zone Type
            </div>
            <div className="text-sm text-white capitalize">{selectedZone.type}</div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-neutral-500 mb-1">
              Average Dwell Time
            </div>
            <div className="text-sm text-white">{selectedZone.avgDwell} minutes</div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-wider text-neutral-500 mb-2">
              Adjacent Brands
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedZone.brands.map((brand) => (
                <span
                  key={brand}
                  className="rounded bg-white/5 px-2 py-1 text-xs text-neutral-300"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-800">
            <div className="text-xs text-neutral-500">
              Foot traffic overlap with this zone: {Math.round(selectedZone.density.daily * 100)}%
            </div>
          </div>
        </div>
      ) : (
        <div className="text-sm text-neutral-500">
          Select a zone from the heat map to see brand adjacency data.
        </div>
      )}
    </div>
  );
}
