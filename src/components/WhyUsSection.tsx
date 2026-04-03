"use client";

import { Shield, Zap, Network, CheckCircle2, TrendingUp, Users, Clock } from "lucide-react";

/**
 * WhyUsSection
 * Highlights the competitive advantages of L2 IT Solutions.
 */
export default function WhyUsSection() {
  return (
    <section id="whyus" className="py-24 bg-secondary text-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform translate-x-1/2" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-primary font-bold text-sm tracking-widest uppercase mb-3">Our Competitive Advantage</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tight leading-[1.1]">
              Why Businesses <span className="text-primary italic">Trust</span> L2 IT Solutions
            </h3>
            <p className="text-white/70 text-lg mb-12 leading-relaxed max-w-xl">
              We combine years of technical expertise with a commitment to customer satisfaction. Our solutions are not just functional; they are built for the long term.
            </p>
            
            <div className="space-y-6">
              {[
                { title: "Certified Expertise", desc: "Our team consists of licensed and certified technicians with deep industry knowledge." },
                { title: "Tailored Architecture", desc: "We don't believe in one-size-fits-all. Every system is custom-designed for your space." },
                { title: "Unbeatable Reliability", desc: "We use only premium-grade hardware and provide ongoing support to prevent failures." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">{item.title}</h4>
                    <p className="text-white/60 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="text-primary mb-4">
                  <Users className="h-10 w-10" />
                </div>
                <div className="text-3xl font-black mb-1">500+</div>
                <div className="text-white/50 text-xs font-bold uppercase tracking-widest">Happy Clients</div>
              </div>
              <div className="bg-primary p-8 rounded-3xl text-secondary">
                <div className="mb-4">
                  <TrendingUp className="h-10 w-10" />
                </div>
                <div className="text-3xl font-black mb-1">10+</div>
                <div className="text-secondary/60 text-xs font-bold uppercase tracking-widest">Years Experience</div>
              </div>
            </div>
            <div className="pt-8 space-y-4">
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="text-primary mb-4">
                  <Clock className="h-10 w-10" />
                </div>
                <div className="text-3xl font-black mb-1">24/7</div>
                <div className="text-white/50 text-xs font-bold uppercase tracking-widest">Expert Support</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
                <div className="text-primary mb-4">
                  <Shield className="h-10 w-10" />
                </div>
                <div className="text-3xl font-black mb-1">100%</div>
                <div className="text-white/50 text-xs font-bold uppercase tracking-widest">Secure Solutions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
