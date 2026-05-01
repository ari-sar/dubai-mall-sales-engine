export interface HeatZone {
  id: string;
  name: string;
  x: number;
  y: number;
  radius: number;
  density: {
    daily: number;
    weekend: number;
    event: number;
  };
  type: "luxury" | "retail" | "dining" | "entertainment";
  brands: readonly string[];
  avgDwell: number;
}

export interface EventHighlight {
  id: string;
  title: string;
  date: string;
  attendance: number;
  video: {
    src: string;
    poster: string;
  };
  description: string;
}

export interface Venue {
  id: string;
  name: string;
  capacity: number;
  av: string;
  stage: string;
  pastEvents: readonly string[];
  coordinates: { x: number; y: number };
}

export interface SponsorshipTier {
  id: string;
  name: string;
  minInvestment: number;
  benefits: string[];
}

export type TimePeriod = "daily" | "weekend" | "event";
export type PathStatus = "live" | "placeholder";
