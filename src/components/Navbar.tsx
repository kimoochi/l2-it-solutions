"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Cpu, Shield, Network, Zap } from "lucide-react";
import Image from "next/image";
import { cn } from "../lib/utils";

const navigation = [
  { name: "Capabilities", href: "/capabilities" },
  { name: "Products", href: "/products" },
  { name: "Services", href: "/services" },
  { name: "Why Us", href: "/why-us" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled ? "glass py-3 shadow-sm" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 flex-shrink-0 bg-white rounded-xl shadow-lg shadow-primary/20 transform group-hover:scale-105 transition-transform duration-300 overflow-hidden">
              <Image 
                src="/l2.jpg" 
                alt="L2 IT Solutions Logo" 
                fill 
                className="object-contain p-1"
                sizes="48px"
              />
            </div>
            <div className="flex flex-col -gap-1">
              <span className="font-heading text-2xl font-extrabold tracking-tighter text-secondary leading-none">
                L2 IT <span className="text-primary font-bold">Solutions</span>
              </span>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#3dbfa8] italic">
                Quality service with Passion
              </span>
            </div>
          </Link>


          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-text-main hover:text-primary transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="bg-secondary text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            >
              Consult an Expert
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-text-main"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden absolute w-full glass-dark text-white p-6 transform transition-transform duration-300 ease-in-out origin-top",
          isMobileMenuOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col gap-4 items-center">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-medium py-2 w-full text-center border-b border-white/5 last:border-0"
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full bg-primary text-secondary py-4 rounded-xl text-center font-black mt-4"
          >
            Consult an Expert
          </Link>
        </div>
      </div>
    </nav>
  );
}
