export const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "scale-shock", label: "Scale" },
  { id: "choose-path", label: "Paths" },
  { id: "retail", label: "Retail" },
  { id: "events", label: "Events" },
  { id: "sponsorship", label: "Sponsorship" },
] as const;

export function navigateToSection(id: string) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
  history.replaceState(null, "", `#${id}`);
}
