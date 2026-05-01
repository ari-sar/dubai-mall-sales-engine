"use client";

import { MetricCounter } from "@/components/ui/MetricCounter";

export function AudienceData() {
  return (
    <div className="mt-12 rounded-xl border border-neutral-800 bg-neutral-900 p-8">
      <h3 className="font-serif text-xl text-white mb-8">Audience Insights</h3>

      <div className="grid gap-8 md:grid-cols-4">
        <div className="text-center">
          <div className="text-3xl font-light text-white">62%</div>
          <div className="mt-1 text-xs text-neutral-500 uppercase tracking-wider">
            International Visitors
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-light text-white">3.5h</div>
          <div className="mt-1 text-xs text-neutral-500 uppercase tracking-wider">
            Average Dwell Time
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-light text-white">$150</div>
          <div className="mt-1 text-xs text-neutral-500 uppercase tracking-wider">
            Average Spend
          </div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-light text-white">28</div>
          <div className="mt-1 text-xs text-neutral-500 uppercase tracking-wider">
            Avg. Age
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-neutral-800">
        <div className="text-sm text-neutral-400">
          Our audience spans 200+ nationalities, with peak engagement during
          weekend evenings and major cultural events. 78% of visitors are
          repeat guests, creating sustained brand exposure opportunities.
        </div>
      </div>
    </div>
  );
}
