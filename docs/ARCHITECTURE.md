# DUBAI MALL SALES ENGINE — FINAL ARCHITECTURE
# ============================================================
# Version: 1.0 (Bulletproof)
# Date: 2026-04-28
# ============================================================

## 1. NAVIGATION MODEL (Locked)

Single-Page Application with GSAP ScrollTrigger.
NO Next.js route transitions. URL updates via history.pushState.

### Section IDs (anchor-based)
- hero
- scale-shock  
- choose-path
- retail
- events
- sponsorship

### Navigation Methods
1. Scroll (natural)
2. MiniNav dots (right side, sticky)
3. CommandBar (Cmd+K, search + jump)
4. Path cards (Choose Your Section)

### URL Pattern
https://dubai-mall-sales.vercel.app/#events
https://dubai-mall-sales.vercel.app/#retail

---

## 2. COMPONENT HIERARCHY

App (layout.tsx)
├── CommandBar (global, z-50)
├── MiniNav (global, z-40)
└── Main (page.tsx)
    ├── HeroSection (#hero)
    │   ├── VideoBackground (priority load)
    │   ├── KineticText
    │   └── CTAButton (appears after sequence)
    ├── ScaleShockSection (#scale-shock)
    │   ├── ContextCopy
    │   └── MetricCounter x3
    ├── ChoosePathSection (#choose-path)
    │   └── PathCard x3
    ├── RetailSection (#retail) — NOT PLACEHOLDER
    │   ├── SectionHeader
    │   ├── HeatMap (D3-Lite SVG)
    │   ├── BrandAdjacency
    │   └── CTAButton x2
    ├── EventsSection (#events) — DEEP DIVE
    │   ├── SectionHeader
    │   ├── EventHighlights
    │   │   └── EventCard x4
    │   ├── VenueMap (interactive SVG)
    │   │   └── VenueDetailPanel
    │   └── BookingForm
    └── SponsorshipSection (#sponsorship) — NOT PLACEHOLDER
        ├── SectionHeader
        ├── TierCards x3
        ├── AudienceData
        └── CTAButton

---

## 3. D3-LITE HEAT MAP SPECIFICATION

### Concept
Use D3.js scales and data binding to generate an SVG heat map overlay
on a simplified Dubai Mall floor plan. NOT a full D3 chart — a data-driven
visualization on a custom SVG canvas.

### Data Structure
```typescript
interface HeatZone {
  id: string;
  name: string;
  x: number;        // % position (0-100)
  y: number;        // % position (0-100)
  radius: number;   // % of container
  density: number;  // 0-1 (foot traffic normalized)
  type: "luxury" | "retail" | "dining" | "entertainment";
  brands: string[];
  avgDwell: number; // minutes
}
```

### D3.js Usage
- d3-scale: Map density values to color gradients
- d3-selection: Bind data to SVG circle elements
- d3-transition: Animate radius/opacity on toggle

### NO D3.js Usage
- No d3-axis (not a chart)
- No d3-shape (custom SVG paths for mall layout)
- No d3-zoom (not needed for this view)

### Visual Output
```
┌─────────────────────────────────────────┐
│  [SVG Mall Layout - simplified paths]   │
│                                         │
│     ○────○        ┌─────────┐          │
│    /  ○   \       │ LUXURY  │          │
│   ○   ●    ○      │ CORRIDOR│          │
│    \  ○   /       └─────────┘          │
│     ○────○                              │
│                                         │
│   ● = high density (red glow)           │
│   ○ = medium density (orange glow)      │
│   · = low density (yellow glow)         │
│                                         │
│  [Toggle: Daily | Weekend | Event Day]  │
│                                         │
└─────────────────────────────────────────┘
```

### Color Scale
```typescript
const colorScale = d3.scaleSequential()
  .domain([0, 1])
  .interpolator(d3.interpolateYlOrRd);
```

### Interaction
- Hover zone → show tooltip with: zone name, top brands, avg dwell time
- Click zone → highlight in Brand Adjacency panel
- Toggle buttons → transition all zones with d3.transition()

---

## 4. PERFORMANCE BUDGET (Revised)

| Metric | Target | Strategy |
|--------|--------|----------|
| Lighthouse Performance | 92+ | Lazy video, D3 tree-shake, image optimization |
| First Contentful Paint | <1.2s | Hero poster loads instantly, font preload |
| Largest Contentful Paint | <2.0s | Hero video poster = LCP element |
| Time to Interactive | <3.0s | Defer D3 until after core content |
| Total Blocking Time | <150ms | No heavy computation on main thread |
| Cumulative Layout Shift | <0.05 | Fixed aspect ratios for all media |

### Video Strategy
- Hero: preload="auto", priority=true, poster visible immediately
- All others: preload="none", IntersectionObserver, preview MP4
- Low bandwidth: fallback to poster image only

### D3 Strategy
- Tree-shake: import only d3-scale, d3-selection, d3-transition
- Lazy load: const d3 = await import("d3") when section enters view
- Bundle size: ~15KB gzipped (vs 300KB full D3)

---

## 5. ACCESSIBILITY CHECKLIST

- [ ] All sections have aria-label
- [ ] KineticText has aria-live="polite" for screen readers
- [ ] MetricCounter announces final value via aria-live
- [ ] Video elements have aria-label descriptions
- [ ] CommandBar traps focus when open
- [ ] MiniNav buttons have aria-label
- [ ] PathCards are keyboard navigable (Tab + Enter)
- [ ] HeatMap zones have role="button" + tabindex
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Reduced motion: disable GSAP animations if prefers-reduced-motion

---

## 6. AI DOCUMENTATION (README Section)

```markdown
## AI Tools Used

### Midjourney v6
- Generated retail path panel imagery
- Generated sponsorship path panel imagery  
- Generated future expansion concept render
- Prompt: "Luxury Dubai Mall interior, flagship store, golden hour,
  architectural photography, cinematic, 8k"

### ChatGPT / Claude
- Luxury tone copy refinement
- Metric contextualization ("More than population of France")
- Data simulation for heat map (foot traffic estimates)

### DALL-E 3
- Venue interior renders where official assets unavailable

### Code Generation
- GSAP animation patterns optimized for performance
- D3.js data visualization structure
```

---

## 7. FILE STRUCTURE (Final)

```
dubai-mall-sales/
├── public/
│   ├── videos/
│   │   ├── hero-aerial-night.mp4
│   │   ├── hero-aerial-night-preview.mp4
│   │   ├── events-fountain-show.mp4
│   │   ├── events-fountain-show-preview.mp4
│   │   ├── interior-luxury-walk.mp4
│   │   ├── interior-luxury-walk-preview.mp4
│   │   ├── venue-ambient-fountain.mp4
│   │   └── venue-ambient-fountain-preview.mp4
│   └── images/
│       ├── hero-aerial-night-poster.webp
│       ├── hero-aerial-night-poster.jpg
│       ├── events-fountain-show-poster.webp
│       ├── interior-luxury-walk-poster.webp
│       ├── venue-ambient-fountain-poster.webp
│       ├── path-retail.png
│       ├── path-events.png
│       └── path-sponsorship.png
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── template.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/
│   │   │   ├── VideoBackground.tsx
│   │   │   ├── KineticText.tsx
│   │   │   ├── MetricCounter.tsx
│   │   │   ├── CTAButton.tsx
│   │   │   └── PathCard.tsx
│   │   ├── layout/
│   │   │   ├── CommandBar.tsx
│   │   │   ├── MiniNav.tsx
│   │   │   └── SectionTransition.tsx
│   │   └── sections/
│   │       ├── HeroSection.tsx
│   │       ├── ScaleShockSection.tsx
│   │       ├── ChoosePathSection.tsx
│   │       ├── RetailSection.tsx
│   │       │   ├── HeatMap.tsx          # D3-Lite
│   │       │   └── BrandAdjacency.tsx
│   │       ├── EventsSection.tsx
│   │       │   ├── EventHighlights.tsx
│   │       │   ├── VenueMap.tsx
│   │       │   └── BookingForm.tsx
│   │       └── SponsorshipSection.tsx
│   │           ├── TierCards.tsx
│   │           └── AudienceData.tsx
│   ├── hooks/
│   │   ├── useBandwidth.ts
│   │   ├── useFocusTrap.ts
│   │   ├── useInView.ts
│   │   ├── useReducedMotion.ts
│   │   └── useScrollProgress.ts
│   ├── lib/
│   │   ├── constants.ts
│   │   ├── navigation.ts
│   │   ├── heatMapData.ts              # Simulated foot traffic
│   │   └── utils.ts
│   └── types/
│       └── index.ts
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 8. CRITICAL PATH (Do These First)

1. **Scaffold Next.js + install deps** (30 min)
2. **Download + optimize videos** (45 min)
3. **Build VideoBackground + KineticText** (1 hour)
4. **Build single-page scroll structure** (1 hour)
5. **Test GSAP scroll between 2 sections** (30 min)

If step 5 works smoothly → proceed to full build.
If not → debug transition before adding complexity.

---

## 9. DECISION LOG

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Navigation | Single-page, anchor-based | Avoids App Router transition complexity |
| D3 Usage | D3-Lite (scale + selection + transition only) | Shows data viz skill without over-engineering |
| Retail/Sponsorship | Full data slides, not placeholders | Proves business understanding |
| Video Hosting | public/ folder (demo) | Portable; note production CDN strategy in README |
| Animation | GSAP only (no Framer Motion) | Lighter bundle, better scroll control |
| Fonts | next/font (Inter + Playfair) | Automatic optimization, no layout shift |

---

## 10. SUCCESS CRITERIA

- [ ] 0-10 seconds: Viewer feels scale + energy
- [ ] 10-30 seconds: Viewer understands "this is different"
- [ ] 30-60 seconds: Viewer can self-navigate to any section
- [ ] 60+ seconds: Viewer can book an event or request leasing info
- [ ] Lighthouse: 92+ Performance, 100 Accessibility
- [ ] Tab navigation works throughout
- [ ] Cmd+K opens command bar
- [ ] Mobile: stacked cards, touch-friendly
- [ ] README documents all AI usage
