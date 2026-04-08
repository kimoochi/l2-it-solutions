"use client";

import Link from "next/link";
import { Mail, Phone, MessageCircle, MapPin, ExternalLink, Globe, Shield, Settings, Info } from "lucide-react";
import Image from "next/image";


/**
 * Footer - L2 IT Solutions
 * Updated with official contact info and clickable links for WhatsApp/Viber.
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white py-20 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-white/0 via-white/20 to-white/0" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Col */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 flex-shrink-0 bg-white rounded-xl shadow-lg shadow-black/10 transform group-hover:scale-105 transition-transform duration-300 overflow-hidden">
                <Image 
                  src="/l2.jpg" 
                  alt="L2 IT Solutions Logo" 
                  fill 
                  className="object-contain p-1"
                  sizes="48px"
                />
              </div>
              <div className="flex flex-col -gap-1">
                <span className="font-heading text-2xl font-extrabold tracking-tighter leading-none">
                  L2 IT <span className="text-primary font-bold">Solutions</span>
                </span>
                <span className="text-[8px] font-black uppercase tracking-[0.22em] text-[#3dbfa8] italic">
                  Quality service with Passion
                </span>
              </div>
            </Link>
            <p className="text-white/90 text-sm leading-relaxed max-w-xs italic">
              Empowering Philippines' infrastructure through high-tier surveillance, networking, and professional connectivity solutions.
            </p>
            <div className="flex gap-4">
              <Link 
                href="https://www.facebook.com/l2itsolutions/" 
                target="_blank"
                className="bg-white/5 p-2.5 rounded-xl hover:bg-primary hover:text-white transition-all duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link 
                href="https://www.tiktok.com/@l2itsolutions?lang=en" 
                target="_blank"
                className="bg-white/5 p-2.5 rounded-xl hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                </svg>
              </Link>
            </div>

          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6 border-l-4 border-primary pl-4">Explore</h4>
            <ul className="space-y-4">
              {[
                { name: "Capabilities", href: "/capabilities" },
                { name: "Products", href: "/products" },
                { name: "Services", href: "/services" },
                { name: "Why Us", href: "/why-us" },
                { name: "Contact", href: "/contact" }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2 group">
                    <span className="h-px w-0 bg-white group-hover:w-4 transition-all duration-300" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="font-bold text-lg mb-6 border-l-4 border-primary pl-4">Get In Touch</h4>
            <ul className="space-y-4 text-sm text-white/90">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span>Purok Kamungay, Alegria, Cordova, Cebu</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:l2itsolutions22@gmail.com" className="hover:text-white transition-colors">l2itsolutions22@gmail.com</a>
              </li>
              <li className="flex flex-col gap-3 pt-2">
                 <a href="https://wa.me/639234296953" className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl hover:bg-white/10 transition-colors">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>09234296953 (WhatsApp)</span>
                 </a>
                 <a href="viber://chat?number=639176349673" className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl hover:bg-white/10 transition-colors">
                    <MessageCircle className="h-4 w-4 text-primary" />
                    <span>09176349673 (Viber)</span>
                 </a>
              </li>
            </ul>
          </div>

          {/* Service Hours */}
          <div>
            <h4 className="font-bold text-lg mb-6 border-l-4 border-primary pl-4">Authorized Dealers</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded-xl flex flex-col items-center justify-center grayscale hover:grayscale-0 transition-all cursor-default shadow-sm border border-white/20">
                <span className="text-[10px] font-black tracking-widest text-[#ed1c24]">HIKVISION</span>
              </div>
              <div className="bg-white p-3 rounded-xl flex flex-col items-center justify-center grayscale hover:grayscale-0 transition-all cursor-default shadow-sm border border-white/20">
                <span className="text-[10px] font-black tracking-widest text-[#f5821f]">RUIJIE</span>
              </div>
              <div className="bg-white p-3 rounded-xl flex flex-col items-center justify-center col-span-2 grayscale hover:grayscale-0 transition-all cursor-default shadow-sm border border-white/20">
                 <span className="text-[10px] font-black tracking-widest text-[#0F172A] uppercase">Dahua Technology</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/60 font-bold uppercase tracking-widest">
          <p>© {currentYear} L2 IT Solutions. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
