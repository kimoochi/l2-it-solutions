"use client";

import { ShieldCheck, Heart, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const advantages = [
  {
    title: "Expertly Certified",
    description: "Our technicians are fully trained and authorized for Hikvision, Dahua, and Ruijie deployments, ensuring industry-standard security.",
    icon: Award,
    color: "bg-primary/10 text-primary"
  },
  {
    title: "Built with Passion",
    description: "Following our 'Quality service with Passion' tagline, we treat every installation as if it were our own infrastructure.",
    icon: Heart,
    color: "bg-red-50 text-red-500"
  },
  {
    title: "Always Connected",
    description: "With 24/7 maintenance and remote monitoring services, we ensure your business or home never experiences downtime.",
    icon: Clock,
    color: "bg-secondary/5 text-secondary"
  },
];

export default function TheL2Advantage() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full text-primary font-black uppercase text-[10px] tracking-widest border border-primary/20">
              <ShieldCheck className="h-4 w-4" />
              The L2 Advantage
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-secondary tracking-tight leading-[1.1]">
              Why Choose <span className="text-primary font-black">L2 IT</span> Solutions?
            </h2>
            <p className="text-text-muted text-lg leading-relaxed italic">
              "We don't just sell hardware; we architect security and connectivity that scales with your growth."
            </p>

            <div className="space-y-12 pt-8">
              {advantages.map((adv, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="flex gap-6 group"
                >
                  <div className={`h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform ${adv.color}`}>
                    <adv.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-secondary mb-2 group-hover:text-primary transition-colors">{adv.title}</h4>
                    <p className="text-text-muted text-sm leading-relaxed max-w-sm">{adv.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Static showcase image */}
          <div className="relative">
            <div className="relative z-10 rounded-[3.5rem] overflow-hidden shadow-2xl border-2 border-border bg-white aspect-[4/3]">
              <Image
                src="/images/area.jpg"
                alt="L2 IT Solutions — Professional Installation"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* 5-Star badge */}
            <div className="absolute top-6 -right-4 bg-primary text-white p-5 rounded-3xl shadow-2xl transform rotate-12 flex flex-col items-center justify-center z-20">
              <Award className="h-7 w-7 fill-current mb-1" />
              <span className="text-xl font-black italic">5-STAR</span>
              <span className="text-[9px] font-bold uppercase tracking-widest">Service Rating</span>
            </div>

            {/* Background Decorations */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary/5 rounded-full blur-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
