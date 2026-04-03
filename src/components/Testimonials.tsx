"use client";

import { motion } from "framer-motion";
import { Star, Quote, ShieldCheck } from "lucide-react";

/**
 * Testimonials - L2 IT Solutions
 * Featuring professional feedback from Cebu-based business and residential clients.
 */
const testimonials = [
  {
    name: "Alex G.",
    role: "Business Owner, Cebu City",
    content: "L2 IT Solutions completely transformed our office network. The Ubiquiti mesh deployment is flawless, and the structured cabling is the cleanest I've ever seen.",
    rating: 5,
    avatar: "AG"
  },
  {
    name: "Maria R.",
    role: "Residential Client, Cordova",
    content: "The CCTV installation was professional and quick. I can now monitor my home from my phone with total peace of mind. Truly quality service with passion!",
    rating: 5,
    avatar: "MR"
  },
  {
    name: "John D.",
    role: "IT Manager, Manufacturing Plant",
    content: "We hired L2 for a large-scale Dahua IP camera deployment. Their technical knowledge and after-sales support are top-tier in the Philippines.",
    rating: 5,
    avatar: "JD"
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-full text-primary font-black uppercase text-[10px] tracking-widest border border-primary/20 mb-6">
             <ShieldCheck className="h-4 w-4" />
             Client Success
          </div>
          <h3 className="text-4xl md:text-5xl font-extrabold text-secondary tracking-tight">
            Trusted by Businesses <span className="text-primary font-black">& Homes</span>
          </h3>
          <p className="text-text-muted mt-6 text-lg italic">
            "Your security and connectivity are our highest priorities."
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-10 rounded-[3rem] bg-white border border-border hover:border-primary/20 hover:shadow-2xl transition-all duration-500 group flex flex-col relative overflow-hidden"
            >
              {/* Background Quote Icon */}
              <div className="absolute top-10 right-10 opacity-[0.03] transform scale-150 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                <Quote className="h-24 w-24" />
              </div>
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              
              <p className="text-text-muted text-sm leading-relaxed mb-8 flex-1 italic relative z-10">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center gap-4 pt-6 border-t border-border mt-auto">
                <div className="h-12 w-12 rounded-2xl bg-secondary text-white flex items-center justify-center font-bold text-lg shadow-lg group-hover:bg-primary transition-colors">
                  {testimonial.avatar}
                </div>
                <div>
                   <h4 className="text-sm font-black text-secondary leading-none mb-1 group-hover:text-primary transition-colors">{testimonial.name}</h4>
                   <p className="text-[10px] uppercase font-bold tracking-widest text-text-muted/60">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
