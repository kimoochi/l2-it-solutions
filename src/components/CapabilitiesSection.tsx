"use client";

import { Shield, Zap, Network, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const capabilities = [
  {
    title: "CCTV Systems",
    description: "High-definition surveillance solutions with remote monitoring, night vision, and AI-powered motion alerts.",
    icon: Shield,
    color: "bg-emerald-50 text-emerald-600",
    features: ["4K IP Cameras", "Remote Access", "NVR Recording"],
  },
  {
    title: "Network Infrastructure",
    description: "Robust wired and wireless networking for homes and offices. High-speed, stable, and secure connectivity.",
    icon: Network,
    color: "bg-blue-50 text-blue-600",
    features: ["WiFi 6 Mesh", "Fiber Optic", "Ubiquiti/TP-Link"],
  },
  {
    title: "Structured Cabling",
    description: "Professional cabling for organized and scalable infrastructure. Neat, labeled, and certified installations.",
    icon: Zap,
    color: "bg-amber-50 text-amber-600",
    features: ["Cat6/Cat6e", "Cable Management", "Server Rack Setup"],
  },
];

export default function CapabilitiesSection() {
  return (
    <section id="capabilities" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-3">What We Do</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-secondary mb-6 tracking-tight">
            Comprehensive <span className="text-primary italic">IT Infrastructure</span> Solutions
          </h3>
          <p className="text-text-muted text-lg">
            At L2 IT Solutions, we provide end-to-end infrastructure services designed to keep your business secure, connected, and efficient.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {capabilities.map((cap, idx) => (
            <div
              key={cap.title}
              className="p-8 rounded-3xl border border-border bg-page-bg/30 hover:border-primary/30 hover:bg-white hover:shadow-xl transition-all duration-500 group"
            >
              <div className={`${cap.color} p-4 rounded-2xl w-fit mb-6 transition-transform group-hover:scale-110 duration-300`}>
                <cap.icon className="h-8 w-8" />
              </div>
              <h4 className="text-2xl font-bold text-secondary mb-4">{cap.title}</h4>
              <p className="text-text-muted mb-8 leading-relaxed">
                {cap.description}
              </p>
              <ul className="space-y-3">
                {cap.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm font-semibold text-secondary/80">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
