import type { Metadata } from "next";
import { Syne, DM_Sans, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["800"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "NexCore IT Solutions | Digital Resilience in the Philippines",
  description: "Professional IT services including CCTV, networking, and structured cabling solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("scroll-smooth", "font-sans", geist.variable)}>
      <body className={`${syne.variable} ${dmSans.variable} font-body bg-page-bg text-text-main antialiased`}>
        {children}
      </body>
    </html>
  );
}
