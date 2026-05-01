import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CommandBar } from "@/components/layout/CommandBar";
import { MiniNav } from "@/components/layout/MiniNav";
import { GlitterCanvas } from "@/components/ui/GlitterCanvas";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dubai Mall | Interactive Sales Engine",
  description:
    "More than a mall. A global stage. Explore retail leasing, event venues, and partnership opportunities at the world's most visited shopping destination.",
  openGraph: {
    title: "Dubai Mall | Interactive Sales Engine",
    description: "More than a mall. A global stage.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#0a0a0a] text-white antialiased">
        <GlitterCanvas />
        {children}
        <CommandBar />
        <MiniNav />
      </body>
    </html>
  );
}
