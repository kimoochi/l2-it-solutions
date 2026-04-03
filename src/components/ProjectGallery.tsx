"use client";

import { motion } from "framer-motion";
import { ExternalLink, Search, Camera, Network, Zap } from "lucide-react";

import installationImg from "@/images/area area.jpg";
import installImg from "@/images/install.jpg";

/**
 * ProjectGallery - L2 IT Solutions
 * Showcases visual results of real projects: Server racks, WiFi mounts, CCTV angles.
 */
const projects = [
  {
    title: "Enterprise Rack Management",
    category: "Structured Cabling",
    icon: Zap,
    image: installationImg.src,
    description: "Full server rack deployment with certified fiber and copper management."
  },
  {
    title: "High-Res IP Surveillance",
    category: "CCTV Services",
    icon: Camera,
    image: installImg.src,
    description: "4K multi-camera installation for a major warehouse facility."
  },
  {
    title: "Ceiling Mesh Deployment",
    category: "Wireless Networking",
    icon: Network,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
    description: "Ubiquiti UniFi deployment for flawless office-wide coverage."
  },
];

export default function ProjectGallery() {
  return (
    <section className="py-24 bg-page-bg border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-bold text-sm tracking-widest uppercase mb-3">Our Work</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-secondary tracking-tight">
            Real Projects, <span className="text-primary font-black">Reliable</span> Results
          </h3>
          <p className="text-text-muted mt-6 text-lg italic">
            Check out some of our recent installations in Cebu.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-xl border border-border bg-white"
            >
              {/* Image with Hover Zoom */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* Overlay Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/40 to-transparent p-8 flex flex-col justify-end transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-primary p-2 rounded-xl text-white shadow-lg">
                    <project.icon className="h-4 w-4" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-widest text-primary/80">
                    {project.category}
                  </span>
                </div>
                <h4 className="text-2xl font-black text-white mb-2 leading-tight">{project.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {project.description}
                </p>
                <button className="flex items-center gap-2 text-primary font-black uppercase text-[10px] tracking-widest group-hover:gap-4 transition-all">
                  View Project Details <ExternalLink className="h-3 w-3" />
                </button>
              </div>

              {/* Corner Overlay */}
              <div className="absolute top-6 right-6 h-12 w-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-500">
                <Search className="h-5 w-5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
