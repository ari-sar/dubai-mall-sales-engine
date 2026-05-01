"use client";

import { MetricCounter } from "@/components/ui/MetricCounter";
import { METRICS } from "@/lib/constants";

export function ScaleShock() {
  return (
    <section
      id="scale-shock"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24"
      aria-label="Scale and reach"
    >
      <div className="max-w-4xl text-center">
        <p className="mb-16 font-serif text-3xl md:text-4xl font-light leading-relaxed text-white/90">
          More annual visitors than the population of France
        </p>

        <div className="grid gap-12 md:grid-cols-3">
          {METRICS.map((metric) => (
            <MetricCounter
              key={metric.label}
              value={metric.value}
              prefix={metric.prefix}
              suffix={metric.suffix}
              label={metric.label}
              context={metric.context}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
