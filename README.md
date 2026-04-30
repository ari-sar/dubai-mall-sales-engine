# Dubai Mall — Interactive Sales Engine

> More than a mall. A global stage.

A single-page Next.js 14 + GSAP + D3-Lite interactive sales site for The Dubai Mall, covering retail leasing, event venues, and brand sponsorship opportunities.

## Stack
- **Next.js 14** (App Router, static export)
- **TypeScript** + **Tailwind CSS**
- **GSAP** (scroll-triggered animation, route transitions)
- **D3.js** (foot-traffic heat map — `scale`, `selection`, `transition`)
- **lucide-react** (icons)

## Quick Start

```bash
npm install
npm run dev          # → http://localhost:3000
npm run build        # static export → ./out
npm run typecheck
```

## Asset Pipeline
Videos and posters are excluded from the repo. Run the pipeline (requires **ffmpeg**) to populate `public/videos` and `public/images`:

```bash
bash scripts/download-and-optimize-videos.sh
```

Until then the page renders fine — `<VideoBackground>` falls back to a dark surface.

## Structure
```
src/
  app/                  layout, page (single-page), template, globals.css
  components/
    ui/                 VideoBackground, KineticText, MetricCounter, CTAButton, PathCard
    layout/             CommandBar (Cmd+K), MiniNav (right-side dots)
    sections/
      retail/           HeatMap (D3-Lite), BrandAdjacency
      events/           EventHighlights, VenueMap, BookingForm
      sponsorship/      TierCards, AudienceData
  hooks/                useBandwidth, useFocusTrap, useInView, useReducedMotion, useScrollProgress
  lib/                  constants, navigation (GSAP scrollTo), utils (cn), heatMapData
  types/                shared TS interfaces
docs/                   ARCHITECTURE.md, MANIFEST.md
scripts/                asset download + ffmpeg optimize
```

## Sections (anchor-based SPA)
`#hero` → `#scale-shock` → `#choose-path` → `#retail` → `#events` → `#sponsorship`

Navigation methods: scroll, MiniNav dots, Cmd+K command bar, path cards.

## AI Tools Used

### Midjourney v6
- Retail / sponsorship path-card imagery, future-expansion concept render.
- Prompt: *"Luxury Dubai Mall interior, flagship store, golden hour, architectural photography, cinematic, 8k"*.

### ChatGPT / Claude
- Luxury tone copy refinement.
- Metric contextualization ("More than the population of France").
- Foot-traffic data simulation for the heat map.

### DALL-E 3
- Venue interior renders where official assets were unavailable.

### Code Generation
- GSAP animation patterns optimized for performance.
- D3.js data-binding structure for the heat map.

## Notes
- `next.config.js` uses `output: "export"` for static hosting (Vercel / S3 / any CDN).
- Production should serve videos from a CDN — the `public/videos` location is for the demo only.
- All interactive elements respect `prefers-reduced-motion`.
