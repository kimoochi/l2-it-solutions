"use client";

import { useState, useRef } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { saveInquiry } from "../lib/store";

/**
 * ContactSection
 * Handles user inquiries for L2 IT Solutions.
 */
export default function ContactSection() {
  const [formState, setFormState] = useState<"idle" | "sending" | "success">("idle");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const reasonRef = useRef<HTMLSelectElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    // Save inquiry to localStorage
    saveInquiry({
      name: nameRef.current?.value || "",
      email: emailRef.current?.value || "",
      reason: reasonRef.current?.value || "",
      message: messageRef.current?.value || "",
    });
    setTimeout(() => setFormState("success"), 1500);
  };

  return (
    <section id="contact" className="py-24 bg-page-bg scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-primary font-bold text-sm tracking-widest uppercase mb-3">Get in Touch</h2>
            <h3 className="text-4xl md:text-5xl font-extrabold text-secondary tracking-tight mb-8">
              Let's Secure Your <span className="text-primary">Future</span> Together
            </h3>
            <p className="text-text-muted text-lg mb-12 max-w-xl">
              Ready to upgrade your infrastructure? Our experts are standing by to provide a free consultation and customized quote based on your unique needs.
            </p>
            
            <div className="space-y-8">
              {[
                { icon: Phone, title: "Phone Support", info: "+63 (032) 123-4567" },
                { icon: Mail, title: "Email Inquiry", info: "solutions@l2it.ph" },
                { icon: MapPin, title: "Visit Our Office", info: "IT Park, Cebu City, Philippines" }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-5 items-center">
                  <div className="bg-white p-4 rounded-2xl shadow-sm text-primary">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-secondary font-bold">{item.title}</h4>
                    <p className="text-text-muted text-sm">{item.info}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-xl shadow-secondary/5 border border-border relative overflow-hidden">
            {formState === "success" ? (
              <div className="text-center py-12 flex flex-col items-center animate-fade-in-up">
                <div className="bg-primary/10 p-6 rounded-full text-primary mb-6">
                  <CheckCircle2 className="h-16 w-16" />
                </div>
                <h4 className="text-3xl font-bold text-secondary mb-3">Message Sent!</h4>
                <p className="text-text-muted">An L2 IT expert will contact you within 24 hours.</p>
                <button 
                  onClick={() => setFormState("idle")} 
                  className="mt-8 text-primary font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary px-1">Full Name</label>
                    <input 
                      ref={nameRef}
                      required 
                      className="w-full bg-page-bg border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary transition-all" 
                      placeholder="Juan Dela Cruz"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-secondary px-1">Email Address</label>
                    <input 
                      ref={emailRef}
                      required 
                      type="email" 
                      className="w-full bg-page-bg border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary transition-all" 
                      placeholder="juan@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary px-1">Reason for Contact</label>
                  <select ref={reasonRef} className="w-full bg-page-bg border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary transition-all">
                    <option>CCTV System Installation</option>
                    <option>Networking & WiFi Mesh</option>
                    <option>Structured Cabling</option>
                    <option>Maintenance & Repair</option>
                    <option>Other / General Inquiry</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-secondary px-1">Message</label>
                  <textarea 
                    ref={messageRef}
                    rows={4} 
                    className="w-full bg-page-bg border-none rounded-xl px-5 py-4 focus:ring-2 focus:ring-primary transition-all resize-none" 
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={formState === "sending"}
                  className="w-full bg-secondary text-white py-5 rounded-2xl font-black text-lg hover:bg-primary transition-all shadow-lg shadow-secondary/10 flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50"
                >
                  {formState === "sending" ? "Processing..." : "Submit Inquiry"}
                  <Send className="h-5 w-5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
