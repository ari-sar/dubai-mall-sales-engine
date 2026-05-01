"use client";

import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { cn } from "@/lib/utils";
import type { HeatZone } from "@/types";

interface HeatMapProps {
  zones: HeatZone[];
  className?: string;
  onZoneSelect?: (zone: HeatZone) => void;
}

type TimePeriod = "daily" | "weekend" | "event";

export function HeatMap({ zones, className, onZoneSelect }: HeatMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [period, setPeriod] = useState<TimePeriod>("daily");
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);

  // D3 color scale
  const colorScale = d3.scaleSequential()
    .domain([0, 1])
    .interpolator(d3.interpolateYlOrRd);

  // D3 radius scale (density → circle size)
  const radiusScale = d3.scaleLinear()
    .domain([0, 1])
    .range([2, 8]); // % of SVG width

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    if (!svg.node()) return;

    // Bind data to circles
    const circles = svg.selectAll("circle.heat-zone")
      .data(zones, (d: any) => d.id);

    // Enter + update
    const merged = circles.join(
      (enter) => {
        const appended = enter.append("circle")
          .attr("class", "heat-zone")
          .attr("cx", (d) => d.x + "%")
          .attr("cy", (d) => d.y + "%")
          .attr("r", 0)
          .attr("fill", (d) => colorScale(d.density[period]))
          .attr("opacity", 0.6)
          .attr("stroke", "none")
          .attr("role", "button")
          .attr("tabindex", "0")
          .attr("aria-label", (d) => `${d.name}: ${Math.round(d.density[period] * 100)}% traffic density, ${d.avgDwell} min avg dwell`)
          .on("mouseenter", function(event, d) {
            d3.select(this)
              .transition().duration(200)
              .attr("r", radiusScale(d.density[period]) * 1.5 + "%")
              .attr("opacity", 0.9);
            setHoveredZone(d.id);
          })
          .on("mouseleave", function(event, d) {
            d3.select(this)
              .transition().duration(200)
              .attr("r", radiusScale(d.density[period]) + "%")
              .attr("opacity", 0.6);
            setHoveredZone(null);
          })
          .on("click", function(event, d) {
            onZoneSelect?.(d);
          })
          .on("keydown", function(event, d) {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onZoneSelect?.(d);
            }
          });

        appended.transition().duration(800).ease(d3.easeCubicOut)
          .attr("r", (d) => radiusScale(d.density[period]) + "%");

        return appended;
      },
      (update) => {
        update.transition().duration(600).ease(d3.easeCubicInOut)
          .attr("fill", (d) => colorScale(d.density[period]))
          .attr("r", (d) => radiusScale(d.density[period]) + "%")
          .attr("aria-label", (d) => `${d.name}: ${Math.round(d.density[period] * 100)}% traffic density, ${d.avgDwell} min avg dwell`);
        return update;
      }
    );
    void merged;

  }, [zones, period, colorScale, radiusScale, onZoneSelect]);

  return (
    <div className={cn("relative", className)}>
      {/* Time period toggle */}
      <div className="absolute top-4 left-4 z-10 flex gap-2">
        {(["daily", "weekend", "event"] as TimePeriod[]).map((p) => (
          <button
            key={p}
            onClick={() => setPeriod(p)}
            className={cn(
              "px-3 py-1 text-xs font-medium uppercase tracking-wider rounded",
              period === p
                ? "bg-white text-black"
                : "bg-white/10 text-white/70 hover:bg-white/20"
            )}
          >
            {p === "daily" ? "Daily" : p === "weekend" ? "Weekend" : "Event Day"}
          </button>
        ))}
      </div>

      {/* SVG Canvas */}
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Mall layout paths (simplified) */}
        <path
          d="M20,20 L80,20 L80,80 L20,80 Z"
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="0.5"
        />
        <path
          d="M35,20 L35,80 M65,20 L65,80 M20,50 L80,50"
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="0.3"
        />

        {/* Zones rendered by D3 */}
      </svg>

      {/* Tooltip */}
      {hoveredZone && (
        <div className="absolute bottom-4 left-4 right-4 bg-neutral-900/90 backdrop-blur border border-neutral-800 rounded-lg p-4">
          {(() => {
            const zone = zones.find((z) => z.id === hoveredZone);
            if (!zone) return null;
            return (
              <div>
                <div className="text-white font-medium">{zone.name}</div>
                <div className="text-neutral-400 text-sm mt-1">
                  Foot traffic density: {Math.round(zone.density[period] * 100)}%
                </div>
                <div className="text-neutral-500 text-xs mt-1">
                  Top brands: {zone.brands.slice(0, 3).join(", ")}
                </div>
                <div className="text-neutral-500 text-xs">
                  Avg. dwell: {zone.avgDwell} min
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
