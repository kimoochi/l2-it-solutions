"use client";

import { Shield, Zap, Network, Camera, ShieldAlert, Settings, CheckCircle, Smartphone, Monitor, Cpu } from "lucide-react";

/**
 * ServicesSection - L2 IT Solutions
 * Realigned to the 4 official pillars from the brand flyer.
 * 1. CCTV Services
 * 2. Network Infrastructure Services
 * 3. Computer Services
 * 4. PABX Telephony
 */
const services = [
  {
    title: "CCTV Services",
    description: "Professional installation, configuration, sales, and repair/maintenance of IP and Analog surveillance systems (Hikvision/Dahua).",
    icon: Camera,
    color: "text-red-500",
    features: ["Installation & Configuration", "Product Sales", "Repair & Maintenance"]
  },
  {
    title: "Network Infrastructure",
    description: "End-to-end solutions for wired/wireless networks, structured cabling, and Fiber Optic (FOC) services for enterprise connectivity.",
    icon: Network,
    color: "text-primary",
    features: ["Wired / Wireless Setup", "Structured Cabling", "FOC Services"]
  },
  {
    title: "Computer Services",
    description: "Comprehensive IT support including OS installation/configuration, preventive maintenance, and hardware sales for workstations.",
    icon: Monitor,
    color: "text-blue-500",
    features: ["OS Installation", "System Repair", "Hardware Procurement"]
  },
  {
    title: "PABX Telephony",
    description: "Scalable business communication systems including installation, configuration, and ongoing support for internal telephony networks.",
    icon: Smartphone,
    color: "text-amber-500",
    features: ["Business Phone Systems", "VoIP Solutions", "System Maintenance"]
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-bold text-sm tracking-widest uppercase mb-3">Our Expertise</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-secondary tracking-tight">
            Integrated <span className="text-primary">IT & Security</span> Solutions
          </h3>
          <p className="text-text-muted mt-6 text-lg leading-relaxed italic">
            "Quality service with Passion" – We provide specialized infrastructure support for homes and businesses in Cebu.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="flex flex-col h-full p-8 rounded-[2.5rem] bg-white border border-border hover:border-primary/20 hover:shadow-2xl transition-all duration-500 group">
               <div className={`p-4 rounded-2xl bg-white shadow-lg border border-border group-hover:border-primary/20 transition-all duration-300 w-fit mb-6 ${service.color}`}>
                  <service.icon className="h-8 w-8" />
               </div>
               <h4 className="text-xl font-bold text-secondary mb-4 group-hover:text-primary transition-colors">
                 {service.title}
               </h4>
               <p className="text-text-muted text-sm leading-relaxed mb-8 flex-1">
                 {service.description}
               </p>
               <ul className="space-y-3 mb-6">
                 {service.features.map((feature, fIdx) => (
                   <li key={fIdx} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-secondary/60">
                     <CheckCircle className="h-3 w-3 text-primary" />
                     {feature}
                   </li>
                 ))}
               </ul>
               <div className="pt-4 border-t border-border mt-auto">
                 <div className="flex items-center gap-2 text-xs font-black text-primary/70 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                   Learn More <Zap className="h-3 w-3" />
                 </div>
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
