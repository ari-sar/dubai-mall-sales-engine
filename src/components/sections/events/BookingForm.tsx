"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Calendar, Check } from "lucide-react";

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    eventType: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => setSubmitted(true), 500);
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10">
          <Check className="h-8 w-8 text-white" />
        </div>
        <h3 className="font-serif text-2xl text-white">Inquiry Received</h3>
        <p className="mt-2 text-neutral-400">
          Our team will respond within 24 hours to discuss your event.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-8">
      <h3 className="font-serif text-2xl text-white mb-2">Reserve Your Date</h3>
      <p className="text-neutral-400 mb-8">On the global stage</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-2">
              Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-lg bg-white/5 border border-neutral-800 px-4 py-3 text-white placeholder-neutral-600 outline-none focus:border-white/30 transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full rounded-lg bg-white/5 border border-neutral-800 px-4 py-3 text-white placeholder-neutral-600 outline-none focus:border-white/30 transition-colors"
              placeholder="you@company.com"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-2">
              Company
            </label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full rounded-lg bg-white/5 border border-neutral-800 px-4 py-3 text-white placeholder-neutral-600 outline-none focus:border-white/30 transition-colors"
              placeholder="Company name"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-500 mb-2">
              Event Type
            </label>
            <select
              required
              value={formData.eventType}
              onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
              className="w-full rounded-lg bg-white/5 border border-neutral-800 px-4 py-3 text-white outline-none focus:border-white/30 transition-colors"
            >
              <option value="" className="bg-neutral-900">Select event type</option>
              <option value="concert" className="bg-neutral-900">Concert / Performance</option>
              <option value="corporate" className="bg-neutral-900">Corporate Event</option>
              <option value="product" className="bg-neutral-900">Product Launch</option>
              <option value="fashion" className="bg-neutral-900">Fashion Show</option>
              <option value="other" className="bg-neutral-900">Other</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full rounded-full bg-white py-4 text-sm font-medium text-black border border-white hover:bg-transparent hover:text-white transition-all duration-300 mt-6"
        >
          Submit Inquiry
        </button>

        <p className="text-center text-xs text-neutral-500 mt-4">
          Our team will respond within 24 hours
        </p>
      </form>
    </div>
  );
}
