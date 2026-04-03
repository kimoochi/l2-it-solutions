import type { Metadata } from "next";
import { Inter, Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "../lib/utils";


const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["700", "800"] });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans", weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "L2 IT Solutions | Professional CCTV & Networking in the Philippines",
  description: "Comprehensive IT services including high-quality CCTV installation, network infrastructure, and structured cabling for businesses and residential clients.",
  keywords: ["CCTV Philippines", "Networking Solutions", "Structured Cabling", "L2 IT Solutions", "Cebu IT Services"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(
        inter.variable, 
        syne.variable, 
        dmSans.variable, 
        "antialiased min-h-screen bg-page-bg text-text-main selection:bg-primary/20 selection:text-secondary"
      )}>
        {children}
      </body>
    </html>
  );
}
