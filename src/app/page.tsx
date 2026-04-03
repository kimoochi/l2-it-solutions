"use client";

import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ChatbotWidget from "../components/ChatbotWidget";
import { ArrowRight, Shield, Zap, Network, Camera, ChevronRight, Globe, PhoneCall } from "lucide-react";
import Link from "next/link";
import { cn } from "../lib/utils";
import { trackVisit } from "../lib/store";

// Home Page Components
import AuthorizedDealers from "../components/AuthorizedDealers";
import TheL2Advantage from "../components/TheL2Advantage";
import ProjectGallery from "../components/ProjectGallery";
import Testimonials from "../components/Testimonials";
import HeroSlideshow from "../components/HeroSlideshow";

/**
 * Home Page - L2 IT Solutions
 * Overhauled Landing Page with high-impact branding and official details.
 */
export default function Home() {
  useEffect(() => {
    trackVisit();
  }, []);

  return (
    <main className="relative min-h-screen selection:bg-primary selection:text-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden hero-gradient">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full text-primary font-bold text-xs uppercase tracking-widest mb-8">
                <Shield className="h-4 w-4" />
                Trusted IT Infrastructure Specialists
              </div>
              <h1 className="text-6xl md:text-[5.5rem] font-extrabold text-secondary tracking-tighter leading-[0.85] mb-8">
                Quality Service<br />
                with <span className="text-primary italic">Passion.</span>
              </h1>
              <p className="text-text-muted text-lg md:text-xl mb-12 max-w-xl leading-relaxed">
                Official Cebu-based partner for <span className="text-secondary font-black">Hikvision, Ruijie, and Dahua</span>. Delivering enterprise-grade security and connectivity infrastructure since 2022.
              </p>
              <div className="flex flex-col sm:flex-row gap-5">
                <Link
                  href="/contact"
                  className="bg-secondary text-white px-10 py-5 rounded-[2rem] font-black text-lg hover:bg-primary transition-all shadow-2xl shadow-secondary/20 flex items-center justify-center gap-3 active:scale-95 group"
                >
                  Consult an Expert <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="/services"
                  className="bg-white/80 backdrop-blur-md text-secondary px-10 py-5 rounded-[2rem] font-black text-lg hover:bg-page-bg transition-all border border-border flex items-center justify-center gap-3 active:scale-95 shadow-sm"
                >
                  Explore Pillar Services
                </Link>
              </div>
              
              <div className="mt-12 flex items-center gap-8 pt-8 border-t border-black/5 opacity-60">
                 <div className="flex flex-col">
                    <span className="text-2xl font-black text-secondary">500+</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Installations</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-2xl font-black text-secondary">24/7</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Support Cycle</span>
                 </div>
                 <div className="flex flex-col">
                    <span className="text-2xl font-black text-secondary">Alegria</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Cordova HQ</span>
                 </div>
              </div>
            </div>
            
            {/* Visual Column — Slideshow */}
            <div className="relative hidden lg:block">
              <HeroSlideshow />
              
              {/* Floating Cards */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-2xl border border-border animate-bounce-slow z-20">
                 <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-2xl text-primary font-black uppercase text-xs tracking-widest flex items-center gap-2">
                       <Zap className="h-4 w-4" />
                       HIKVISION OFFICIAL
                    </div>
                 </div>
              </div>
              
              <div className="absolute top-1/2 -right-12 bg-secondary p-6 rounded-3xl shadow-2xl transform -translate-y-1/2 border border-white/10 z-20 animate-pulse">
                <Globe className="h-8 w-8 text-primary mb-2" />
                <p className="text-[10px] font-black uppercase tracking-widest text-primary">Regional Leader</p>
                <p className="text-white font-bold text-xs">Cebu Infrastructure</p>
              </div>

              {/* Background Glows */}
              <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[100px] -z-10" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-secondary/10 rounded-full blur-[100px] -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* 1. Official Brands Showcase */}
      <AuthorizedDealers />

      {/* 2. Short Capabilities Highlights */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
              <h2 className="text-primary font-black text-sm tracking-widest uppercase mb-3 text-left">Core Capabilities</h2>
              <h3 className="text-5xl font-extrabold text-secondary tracking-tight text-left">
                Bridging Security <span className="text-primary">& Speed</span>
              </h3>
            </div>
            <Link href="/capabilities" className="hidden md:flex items-center gap-3 text-primary font-black tracking-widest uppercase text-xs group mt-4">
              Explore Infrastructure <ChevronRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Surveillance", icon: Camera, desc: "AI-powered night vision (ColorVu) and industrial NVR systems from Hikvision/Dahua." },
              { title: "Fiber & Mesh", icon: Network, desc: "High-speed wired links and seamless Ruijie/Ubiquiti WiFi Mesh for enterprise networking." },
              { title: "Scalable Data", icon: Zap, desc: "Certified structured cabling (Cat6/Cat6e) and optimized server rack infrastructure." }
            ].map((cap, idx) => (
              <div key={idx} className="p-10 rounded-[3rem] border border-border hover:border-primary/20 hover:shadow-2xl transition-all group bg-white relative overflow-hidden">
                <div className="bg-primary/5 p-4 rounded-2xl w-fit mb-8 text-primary group-hover:scale-110 transition-transform shadow-sm group-hover:shadow-primary/10">
                  <cap.icon className="h-8 w-8" />
                </div>
                <h4 className="text-2xl font-black text-secondary mb-4 tracking-tighter">{cap.title}</h4>
                <p className="text-text-muted text-sm mb-10 leading-relaxed font-medium">{cap.desc}</p>
                <Link href="/capabilities" className="text-[10px] font-black text-secondary group-hover:text-primary transition-colors uppercase tracking-[0.2em] flex items-center gap-2">
                  Learn Technical Details <ArrowRight className="h-3 w-3" />
                </Link>
                
                {/* Visual Flair */}
                <div className="absolute -bottom-10 -right-10 opacity-0 group-hover:opacity-5 transform group-hover:scale-150 transition-all duration-700 pointer-events-none">
                   <cap.icon className="h-32 w-32" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. The Advantage Breakdown */}
      <TheL2Advantage />

      {/* 4. Visual Project Proof */}
      <ProjectGallery />

      {/* 5. Pillar Services Summary */}
      <section className="py-24 bg-secondary text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
         <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-16">
               <h4 className="text-primary font-black text-xs tracking-[0.3em] uppercase mb-6">Service Excellence</h4>
               <h3 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-8 italic">"Hardware Sales, Installation, <br className="hidden md:block"/> and Lifetime Maintenance."</h3>
               <p className="text-white/50 text-xl leading-relaxed font-medium max-w-2xl mx-auto mb-12">
                  We follow a meticulous 3-step support cycle to ensure your site remains operational 365 days a year.
               </p>
               <div className="flex flex-wrap justify-center gap-8">
                  <Link href="/services" className="bg-primary text-secondary px-8 py-5 rounded-[2rem] font-black text-lg hover:scale-105 transition-transform flex items-center gap-3">
                     Explore Our Services <ArrowRight className="h-5 w-5" />
                  </Link>
                  <Link href="/contact" className="bg-white/5 text-white px-8 py-5 rounded-[2rem] font-black text-lg hover:bg-white/10 transition-colors border border-white/10 flex items-center gap-3">
                     <PhoneCall className="h-5 w-5" /> Get in Touch
                  </Link>
               </div>
            </div>
         </div>
      </section>

      {/* 6. Client Trust / Testimonials */}
      <Testimonials />

      <Footer />
      <ChatbotWidget />
    </main>
  );
}
