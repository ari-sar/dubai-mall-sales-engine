"use client";

import { useEffect, useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { navigateToSection, SECTIONS } from "@/lib/navigation";
import { useFocusTrap } from "@/hooks/useFocusTrap";

export function CommandBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const trapRef = useFocusTrap<HTMLDivElement>(open);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SECTIONS;
    return SECTIONS.filter(
      (s) => s.label.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)
    );
  }, [query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 backdrop-blur-sm pt-[15vh] px-4"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        ref={trapRef}
        className="w-full max-w-xl rounded-xl border border-neutral-800 bg-neutral-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Jump to section…"
          className="w-full bg-transparent px-5 py-4 text-white placeholder:text-neutral-500 outline-none border-b border-neutral-800"
          aria-label="Search sections"
        />
        <ul role="listbox" className="max-h-80 overflow-y-auto py-2">
          {results.length === 0 && (
            <li className="px-5 py-3 text-sm text-neutral-500">No matches.</li>
          )}
          {results.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => {
                  setOpen(false);
                  setQuery("");
                  navigateToSection(s.id);
                }}
                className={cn(
                  "flex w-full items-center justify-between px-5 py-3 text-left text-sm",
                  "text-neutral-200 hover:bg-neutral-800 focus:bg-neutral-800 focus:outline-none"
                )}
              >
                <span>{s.label}</span>
                <span className="text-xs text-neutral-500">#{s.id}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="border-t border-neutral-800 px-5 py-2 text-[11px] text-neutral-500">
          <kbd className="rounded bg-neutral-800 px-1.5 py-0.5">⌘K</kbd> toggle ·{" "}
          <kbd className="rounded bg-neutral-800 px-1.5 py-0.5">Esc</kbd> close
        </div>
      </div>
    </div>
  );
}
