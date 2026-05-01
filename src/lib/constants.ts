// ============================================================
// Dubai Mall Sales Deck — Constants & Configuration
// ============================================================

export const SITE_CONFIG = {
  name: "Dubai Mall",
  tagline: "More than a mall. A global stage.",
  url: "https://dubai-mall-sales.vercel.app",
} as const;

// ============================================================
// Video Assets
// ============================================================
// These paths assume you've copied the generated clips to:
// public/videos/ and public/images/

export const VIDEOS = {
  hero: {
    src: "/videos/hero-aerial-night.mp4",
    webm: "/videos/hero-aerial-night.webm",
    preview: "/videos/hero-aerial-night-preview.mp4",
    poster: "/images/posters/hero-aerial-night-poster.webp",
    posterFallback: "/images/posters/hero-aerial-night-poster.jpg",
    duration: 12,
  },
  eventsFountain: {
    src: "/videos/events-fountain-show.mp4",
    preview: "/videos/events-fountain-show-preview.mp4",
    poster: "/images/posters/events-fountain-show-poster.webp",
    posterFallback: "/images/posters/events-fountain-show-poster.jpg",
    duration: 12,
  },
  interiorLuxury: {
    src: "/videos/interior-luxury-walk.mp4",
    preview: "/videos/interior-luxury-walk-preview.mp4",
    poster: "/images/posters/interior-luxury-walk-poster.webp",
    posterFallback: "/images/posters/interior-luxury-walk-poster.jpg",
    duration: 10,
  },
  venueAmbient: {
    src: "/videos/venue-ambient-fountain.mp4",
    preview: "/videos/venue-ambient-fountain-preview.mp4",
    poster: "/images/posters/venue-ambient-fountain-poster.webp",
    posterFallback: "/images/posters/venue-ambient-fountain-poster.jpg",
    duration: 12,
  },
  fashionWeek: {
    src: "/videos/fashion-week.mp4",
    preview: "/videos/fashion-week-preview.mp4",
    poster: "/images/posters/fashion-week-poster.webp",
    posterFallback: "/images/posters/fashion-week-poster.jpg",
    duration: 15,
  },
} as const;

// ============================================================
// Kinetic Text Sequences
// ============================================================

export const HERO_SEQUENCE = [
  { text: "1,200 STORES", delay: 0 },
  { text: "200,000 VISITORS DAILY", delay: 2.5 },
  { text: "ONE GLOBAL STAGE", delay: 5 },
] as const;

// ============================================================
// Scale Shock Metrics
// ============================================================

export const METRICS = [
  {
    value: 65000000,
    prefix: "",
    suffix: "+",
    label: "Annual Visitors",
    context: "More than the population of France",
  },
  {
    value: 5900000,
    prefix: "",
    suffix: "",
    label: "Square Feet",
    context: "Largest mall in the world by total area",
  },
  {
    value: 1200,
    prefix: "",
    suffix: "+",
    label: "Retail Stores",
    context: "From luxury flagships to emerging brands",
  },
] as const;

// ============================================================
// Navigation Paths
// ============================================================

export const PATHS = [
  {
    id: "retail",
    title: "RETAIL",
    subtitle: "Luxury flagships. Global brands. Unmatched foot traffic.",
    href: "/retail",
    status: "placeholder" as const,
    image: "/images/path-retail.webp",
  },
  {
    id: "events",
    title: "EVENTS",
    subtitle: "Concerts. Product launches. Cultural moments.",
    href: "/events",
    status: "live" as const,
    image: "/images/path-events.webp",
  },
  {
    id: "sponsorship",
    title: "SPONSORSHIP",
    subtitle: "Brand activations. Immersive experiences. Global reach.",
    href: "/sponsorship",
    status: "placeholder" as const,
    image: "/images/path-sponsorship.webp",
  },
] as const;

// ============================================================
// Events Module Data
// ============================================================

export const EVENT_HIGHLIGHTS = [
  {
    id: "nye-2024",
    title: "NYE 2024 Countdown",
    date: "December 31, 2024",
    attendance: 150000,
    video: VIDEOS.eventsFountain,
    description: "The world's most watched New Year's celebration",
  },
  {
    id: "aquarium-activation",
    title: "Dubai Aquarium Activation",
    date: "Ongoing",
    attendance: 2000000,
    video: VIDEOS.interiorLuxury,
    description: "World's largest indoor aquarium. 33,000 aquatic animals. Unmissable brand canvas.",
  },
  {
    id: "fashion-week-2024",
    title: "Fashion Week 2024",
    date: "March 2024",
    attendance: 35000,
    video: VIDEOS.fashionWeek,
    description: "Luxury runway shows. Global press. Fashion Avenue as the ultimate brand stage.",
  },
  {
    id: "concert-2023",
    title: "Global Concert Series",
    date: "October 2023",
    attendance: 45000,
    video: VIDEOS.venueAmbient,
    description: "International artists. Sold-out crowds.",
  },
] as const;

export const VENUES = [
  {
    id: "dubai-arena",
    name: "Dubai Arena",
    capacity: 15000,
    av: "4K LED | 360° Stage | Dolby Atmos",
    stage: "360° configurable",
    pastEvents: ["NYE 2024", "FIFA Fan Fest", "Global Concert Series"],
    coordinates: { x: 45, y: 30 },
  },
  {
    id: "fashion-avenue",
    name: "Fashion Avenue",
    capacity: 5000,
    av: "LED Runway | Broadcast Ready",
    stage: "Linear runway + presentation",
    pastEvents: ["Fashion Week 2024", "Luxury Brand Launches"],
    coordinates: { x: 65, y: 50 },
  },
  {
    id: "waterfront",
    name: "The Waterfront",
    capacity: 25000,
    av: "Outdoor LED | Fountain Integration",
    stage: "Open-air amphitheater",
    pastEvents: ["NYE 2024", "Cultural Festivals"],
    coordinates: { x: 30, y: 70 },
  },
  {
    id: "atrium",
    name: "The Grand Atrium",
    capacity: 8000,
    av: "Suspended LED | 360° Projection",
    stage: "Multi-level atrium",
    pastEvents: ["Product Launches", "Art Installations"],
    coordinates: { x: 55, y: 40 },
  },
] as const;

// ============================================================
// Animation Tokens
// ============================================================

export const ANIMATION = {
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 1.2,
    cinematic: 2.0,
  },
  easing: {
    smooth: "power2.out",
    dramatic: "power4.inOut",
    bounce: "back.out(1.7)",
  },
  stagger: 0.1,
} as const;

// ============================================================
// Colors (Tailwind-compatible)
// ============================================================

export const COLORS = {
  background: "#0a0a0a",
  surface: "#141414",
  surfaceHover: "#1a1a1a",
  text: {
    primary: "#ffffff",
    secondary: "#a3a3a3",
    muted: "#737373",
  },
  accent: {
    gold: "#c9a96e",
    goldHover: "#d4b87a",
  },
  border: "#262626",
} as const;
