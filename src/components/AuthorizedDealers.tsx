"use client";

import { motion } from "framer-motion";
import Image from "next/image";
// Using the @ alias for cleaner, more reliable module resolution
import hikvisionLogo from "@/images/hikvision.png";
import dahuaLogo from "@/images/dahua.png";
import ruijieLogo from "@/images/ruijie.png";

/**
 * AuthorizedDealers - L2 IT Solutions
 * Showcases official brand partnerships with a premium, responsive layout.
 */
const partners = [
  {
    name: "Hikvision",
    logo: hikvisionLogo,
    color: "#ed1c24",
    desc: "Global leader in AI surveillance",
  },
  {
    name: "Dahua Technology",
    logo: dahuaLogo,
    color: "#0a0c0e",
    desc: "Advanced security solutions",
  },
  {
    name: "Ruijie Networks",
    logo: ruijieLogo,
    color: "#005baa",
    desc: "Enterprise networking gear",
  },
];

export default function AuthorizedDealers() {
  return (
    <section className="py-24 bg-page-bg border-y border-border/50 overflow-hidden relative">
      {/* Decorative background element for premium feel */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 px-4">
          <h4 className="text-primary font-black text-[10px] sm:text-xs tracking-[0.3em] uppercase mb-4 opacity-80">
            AUTHORIZED DEALER OF THE FOLLOWING PRODUCTS
          </h4>
          <div className="h-1 w-12 bg-primary/30 mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-stretch">
          {partners.map((partner, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: idx * 0.15,
                ease: [0.21, 0.45, 0.32, 0.9]
              }}
              viewport={{ once: true }}
              className="flex flex-col items-center group cursor-default"
            >
              <div className="relative w-full aspect-[16/7] flex items-center justify-center p-8 rounded-[2rem] bg-white/40 backdrop-blur-sm border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] group-hover:shadow-[0_20px_50px_rgba(var(--primary-rgb),0.12)] group-hover:border-primary/20 group-hover:bg-white transition-all duration-700">
                {/* Next.js Image component handles optimization and static imports automatically */}
                <div className="relative w-full h-full transition-all duration-700 group-hover:scale-110">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain !p-4"
                    sizes="(max-width: 768px) 80vw, 25vw"
                    placeholder="blur"
                    style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.05))" }}
                  />
                </div>
              </div>

              <div className="mt-8 text-center px-4">
                <h5 className="font-bold text-secondary text-sm tracking-tight mb-1 group-hover:text-primary transition-colors duration-300">
                  {partner.name}
                </h5>
                <p className="text-[10px] font-medium text-text-muted/60 uppercase tracking-widest">
                  {partner.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </section>
  );
}
