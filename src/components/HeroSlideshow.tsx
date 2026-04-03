"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getSlideshowImages, type SlideshowImage } from "../lib/store";

const DEFAULT_SLIDES: SlideshowImage[] = [
  {
    id: "default-1",
    src: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1200",
    alt: "Modern Data Center Infrastructure",
  },
  {
    id: "default-2",
    src: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=1200",
    alt: "IP Security Camera Installation",
  },
  {
    id: "default-3",
    src: "https://images.unsplash.com/photo-1558494949-ef01095bf810?auto=format&fit=crop&q=80&w=1200",
    alt: "Enterprise Server Room",
  },
];

export default function HeroSlideshow() {
  const [slides, setSlides] = useState<SlideshowImage[]>(DEFAULT_SLIDES);
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const saved = getSlideshowImages();
    if (saved.length > 0) setSlides(saved);
  }, []);

  const goTo = useCallback(
    (idx: number) => {
      if (isAnimating || idx === current) return;
      setIsAnimating(true);
      setCurrent(idx);
      setTimeout(() => setIsAnimating(false), 700);
    },
    [isAnimating, current]
  );

  const prev = useCallback(
    () => goTo((current - 1 + slides.length) % slides.length),
    [current, slides.length, goTo]
  );
  const next = useCallback(
    () => goTo((current + 1) % slides.length),
    [current, slides.length, goTo]
  );

  // Auto-advance every 4.5 seconds
  useEffect(() => {
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [next]);

  return (
    /* Outer shell — matches the original hero image card shape exactly */
    <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl border-[16px] border-white transform rotate-2 hover:rotate-0 transition-transform duration-1000 group w-full h-[650px]">

      {/* Slide stack — each slide is absolute-positioned to fill the container */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{
            opacity: idx === current ? 1 : 0,
            zIndex: idx === current ? 1 : 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.src}
            alt={slide.alt}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Dark gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />

      {/* Prev arrow */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 backdrop-blur-sm hover:bg-white/70 text-white p-2.5 rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>

      {/* Next arrow */}
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/30 backdrop-blur-sm hover:bg-white/70 text-white p-2.5 rounded-full transition-all opacity-0 group-hover:opacity-100 shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === current
                ? "bg-white w-6 h-2"
                : "bg-white/50 hover:bg-white/80 w-2 h-2"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
