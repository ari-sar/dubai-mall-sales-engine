import { VideoBackground } from "@/components/ui/VideoBackground";
import { KineticText } from "@/components/ui/KineticText";
import { CTAButton } from "@/components/ui/CTAButton";
import { PathCard } from "@/components/ui/PathCard";
import { HeatMap } from "@/components/sections/retail/HeatMap";
import { BrandAdjacency } from "@/components/sections/retail/BrandAdjacency";
import { EventHighlights } from "@/components/sections/events/EventHighlights";
import { VenueMap } from "@/components/sections/events/VenueMap";
import { BookingForm } from "@/components/sections/events/BookingForm";
import { ScaleShock } from "@/components/sections/ScaleShock";
import { TierCards } from "@/components/sections/sponsorship/TierCards";
import { AudienceData } from "@/components/sections/sponsorship/AudienceData";

import {
  HERO_SEQUENCE,
  PATHS,
  VIDEOS,
  EVENT_HIGHLIGHTS,
  VENUES,
} from "@/lib/constants";
import { heatMapZones } from "@/lib/heatMapData";

export default function HomePage() {
  return (
    <main className="bg-[#0a0a0a] text-white">
      {/* ============================================================ */}
      {/* HERO SECTION */}
      {/* ============================================================ */}
      <section id="hero" className="relative h-screen" aria-label="Hero">
        <VideoBackground
          src={VIDEOS.hero.src}
          srcWebm={VIDEOS.hero.webm}
          poster={VIDEOS.hero.poster}
          priority={true}
          preload="metadata"
          overlayOpacity={0.6}
          className="h-full"
        >
          <div className="flex h-full flex-col items-center justify-center px-6">
            <KineticText
              className="h-24 md:h-32 lg:h-40 w-full"
              lines={HERO_SEQUENCE}
              lineClassName="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-tight text-white"
              startDelay={0.5}
            />

            {/* CTA appears after kinetic text completes */}
            <div className="mt-12 opacity-0 animate-[fadeIn_0.8s_ease-out_8s_forwards]">
              <CTAButton href="#choose-path" variant="primary">
                Explore the Opportunity
              </CTAButton>
            </div>
          </div>
        </VideoBackground>
      </section>

      {/* ============================================================ */}
      {/* SCALE SHOCK SECTION */}
      {/* ============================================================ */}
      <ScaleShock />

      {/* ============================================================ */}
      {/* CHOOSE YOUR PATH SECTION */}
      {/* ============================================================ */}
      <section
        id="choose-path"
        className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24"
        aria-label="Choose your opportunity"
      >
        <h2 className="mb-16 text-center font-serif text-3xl md:text-4xl font-light">
          Choose Your Opportunity
        </h2>

        <div className="grid w-full max-w-6xl gap-4 md:grid-cols-3">
          {PATHS.map((path) => (
            <PathCard
              key={path.id}
              title={path.title}
              subtitle={path.subtitle}
              image={path.image}
              href={`#${path.id}`}
              status={path.status}
            />
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* RETAIL SECTION — NOT A PLACEHOLDER */}
      {/* ============================================================ */}
      <section
        id="retail"
        className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24"
        aria-label="Retail intelligence"
      >
        <div className="max-w-6xl w-full">
          <h2 className="mb-4 font-serif text-3xl md:text-4xl font-light">
            Retail Intelligence
          </h2>
          <p className="mb-12 text-neutral-400">
            Foot traffic heat map. Brand adjacency. Leasing opportunities.
          </p>

          <div className="grid gap-8 lg:grid-cols-2">
            <HeatMap
              zones={heatMapZones}
              className="aspect-square rounded-xl bg-neutral-900 border border-neutral-800"
            />
            <BrandAdjacency zones={heatMapZones} />
          </div>

          <div className="mt-12 flex flex-wrap gap-4 justify-center">
            <CTAButton variant="primary">Download Leasing Deck</CTAButton>
            <CTAButton variant="ghost">Schedule a Tour</CTAButton>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* EVENTS SECTION — DEEP DIVE */}
      {/* ============================================================ */}
      <section
        id="events"
        className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24"
        aria-label="Events and venues"
      >
        <div className="max-w-6xl w-full">
          <h2 className="mb-4 font-serif text-3xl md:text-4xl font-light">
            Events & Venues
          </h2>
          <p className="mb-12 text-neutral-400">
            Past events that defined the stage. Venues that make it possible.
          </p>

          <EventHighlights events={EVENT_HIGHLIGHTS} />

          <div className="mt-16">
            <VenueMap venues={VENUES} />
          </div>

          <div className="mt-16">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* SPONSORSHIP SECTION — NOT A PLACEHOLDER */}
      {/* ============================================================ */}
      <section
        id="sponsorship"
        className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24"
        aria-label="Partnership and sponsorship"
      >
        <div className="max-w-6xl w-full">
          <h2 className="mb-4 font-serif text-3xl md:text-4xl font-light">
            Partnership Tiers
          </h2>
          <p className="mb-12 text-neutral-400">
            Brand activations. Immersive experiences. Global reach.
          </p>

          <TierCards />
          <AudienceData />

          <div className="mt-12 text-center">
            <CTAButton variant="primary">Request Partnership Info</CTAButton>
          </div>
        </div>
      </section>
    </main>
  );
}
