"use client";

import { ShieldCheck, Heart, Clock, Award } from "lucide-react";
import { motion } from "framer-motion";

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
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-6">
          <div className="inline-flex items-center justify-center gap-2 bg-primary/5 px-4 py-2 rounded-full text-primary font-black uppercase text-[10px] tracking-widest border border-primary/20">
            <ShieldCheck className="h-4 w-4" />
            The L2 Advantage
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-secondary tracking-tight leading-[1.1]">
            Why Choose <span className="text-primary font-black">L2 IT</span> Solutions?
          </h2>
          <p className="text-text-muted text-lg leading-relaxed italic">
            "We don't just sell hardware; we architect security and connectivity that scales with your growth."
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 sm:px-8">
          {advantages.map((adv, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group"
            >
              <div className={`h-20 w-20 rounded-3xl flex items-center justify-center shrink-0 shadow-xl mb-6 group-hover:-translate-y-2 transition-transform duration-500 ${adv.color}`}>
                <adv.icon className="h-10 w-10" />
              </div>
              <h4 className="text-xl font-black text-secondary mb-3 group-hover:text-primary transition-colors">{adv.title}</h4>
              <p className="text-text-muted text-sm leading-relaxed max-w-sm">{adv.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
{/* Background Decorations */}
        <div className="absolute -top-10 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-secondary/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}

