"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const TIERS = [
  {
    id: "platinum",
    name: "Platinum",
    investment: "$500K+",
    benefits: [
      "Logo on all marketing assets",
      "VIP access to all events",
      "Custom activation space",
      "Dedicated account manager",
      "First right of refusal on new venues",
      "Annual brand impact report",
    ],
    highlighted: true,
  },
  {
    id: "gold",
    name: "Gold",
    investment: "$200K+",
    benefits: [
      "Logo on select marketing assets",
      "Event naming rights (2 events/year)",
      "Premium booth space",
      "Social media promotion",
      "Quarterly performance reports",
    ],
    highlighted: false,
  },
  {
    id: "silver",
    name: "Silver",
    investment: "$75K+",
    benefits: [
      "Logo on digital channels",
      "Standard booth space",
      "Social media mentions",
      "Annual performance summary",
    ],
    highlighted: false,
  },
];

export function TierCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {TIERS.map((tier) => (
        <div
          key={tier.id}
          className={cn(
            "relative rounded-xl border p-6 transition-all duration-300 hover:border-white/30",
            tier.highlighted
              ? "border-[#c9a96e] bg-[#c9a96e]/5"
              : "border-neutral-800 bg-neutral-900"
          )}
        >
          {tier.highlighted && (
            <div className="absolute -top-3 left-6 rounded-full bg-[#c9a96e] px-3 py-1 text-xs font-medium text-black">
              Most Popular
            </div>
          )}

          <div className="mb-6">
            <h4 className="font-serif text-xl text-white">{tier.name}</h4>
            <div className="mt-2 text-2xl font-light text-white">{tier.investment}</div>
            <div className="text-xs text-neutral-500">annual investment</div>
          </div>

          <ul className="space-y-3">
            {tier.benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-2 text-sm text-neutral-300">
                <Check className="h-4 w-4 shrink-0 text-[#c9a96e] mt-0.5" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <button
            className={cn(
              "mt-6 w-full rounded-full py-3 text-sm font-medium transition-colors",
              tier.highlighted
                ? "bg-[#c9a96e] text-black hover:bg-[#d4b87a]"
                : "border border-white/30 text-white hover:bg-white/10"
            )}
          >
            Inquire
          </button>
        </div>
      ))}
    </div>
  );
}
