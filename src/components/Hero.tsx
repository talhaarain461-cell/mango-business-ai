/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronUp, ChevronDown } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';

const SLIDES = [
  {
    id: 1,
    heading: { 
      white: "MANGO", 
      yellow: "SEASON 2026" 
    },
    supporting: { 
      white: "FRESH MANGOES FROM SINDH ARE NOW READY", 
      yellow: "FIRST HARVEST ARRIVING FROM TANDO ALLAHYAR" 
    },
    image: "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=1920&fm=webp",
    color: "from-amber-600/60"
  },
  {
    id: 2,
    heading: { 
      white: "SINDHRI –", 
      yellow: "THE KING OF TASTE" 
    },
    supporting: { 
      white: "SWEET, JUICY AND FULL OF NATURAL FLAVOR", 
      yellow: "Naturally Grown with Premium Quality" 
    },
    image: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&q=80&w=1920&fm=webp",
    color: "from-green-600/60"
  },
  {
    id: 3,
    heading: { 
      white: "DELIVERY", 
      yellow: "FREE HOME" 
    },
    headingReverse: true,
    supporting: { 
      white: "GET FRESH MANGOES DELIVERED TO YOUR DOOR", 
      yellow: "FAST AND SAFE DELIVERY ALL OVER PAKISTAN" 
    },
    image: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&q=80&w=1920&fm=webp",
    color: "from-blue-600/60"
  },
  {
    id: 4,
    heading: { 
      white: "MANGOES", 
      yellow: "TOP QUALITY" 
    },
    headingReverse: true,
    supporting: { 
      white: "HAND SELECTED FOR PERFECT SIZE AND SWEETNESS", 
      yellow: "PREMIUM QUALITY FRUIT FOR YOUR HOME" 
    },
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=1920&fm=webp",
    color: "from-amber-500/60"
  }
];

interface HeroProps {
  onNavigate: (target: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(nextSlide, 4000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused, currentSlide]);

  return (
    <section 
      className="relative h-[520px] md:h-[550px] lg:h-[650px] flex items-center justify-center overflow-hidden bg-brand-primary"
    >
      {/* Background with Zoom Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentSlide}
            initial={{ scale: 1, opacity: 0 }}
            animate={{ 
              scale: 1.05, 
              opacity: 1 
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              scale: { duration: 5, ease: "linear" },
              opacity: { duration: 1.2, ease: "easeInOut" }
            }}
            className="absolute inset-0"
          >
            <img 
              src={SLIDES[currentSlide].image} 
              alt="Fresh premium mangoes online order Pakistan Tando Allahyar" 
              width={1920}
              height={1080}
              fetchPriority={currentSlide === 0 ? "high" : "auto"}
              className="w-full h-full object-cover object-center brightness-[0.4] contrast-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-brand-primary/60" />
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col items-center justify-center text-center pt-24 md:pt-0 lg:pt-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[1100px] flex flex-col items-center min-h-[320px] md:min-h-[400px] lg:min-h-[420px] justify-center"
          >
            {/* Heading - Main Titles */}
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[2.5rem] md:text-5xl lg:text-7xl font-black tracking-tight uppercase leading-[1.2] md:leading-[1.1] mb-5 md:mb-10 lg:mb-8 drop-shadow-2xl text-balance"
            >
              {SLIDES[currentSlide].headingReverse ? (
                <>
                  <span className="text-[#F0B400] shrink-0">{SLIDES[currentSlide].heading.yellow}</span>{" "}
                  <span className="text-white shrink-0">{SLIDES[currentSlide].heading.white}</span>
                </>
              ) : (
                <>
                  <span className="text-white shrink-0">{SLIDES[currentSlide].heading.white}</span>{" "}
                  <span className="text-[#F0B400] shrink-0">{SLIDES[currentSlide].heading.yellow}</span>
                </>
              )}
            </motion.h1>
            
            {/* Supporting Text Wrapper */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8 md:mb-12 lg:mb-10 max-w-[900px] space-y-2.5 md:space-y-4"
            >
              <p className="text-[15px] md:text-lg lg:text-2xl text-white font-bold uppercase tracking-widest drop-shadow-md px-4 text-balance">
                {SLIDES[currentSlide].supporting.white}
              </p>
              <p className="text-[15px] md:text-lg lg:text-2xl text-[#F0B400] font-black uppercase tracking-[0.2em] drop-shadow-md px-4 text-balance">
                {SLIDES[currentSlide].supporting.yellow}
              </p>
            </motion.div>
            
            {/* Buttons - Centered */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate('shop')}
                className="px-7 py-3 md:px-12 md:py-5 bg-white text-brand-primary rounded-xl font-black text-[11px] md:text-sm uppercase tracking-[0.2em] flex items-center justify-center transition-all bg-gradient-to-br from-white to-slate-100 shadow-2xl group border-2 border-white/10 hover:border-brand-accent/50"
              >
                <span>EXPLORE CATALOG</span>
                <ArrowRight className="ml-2 group-hover:translate-x-2 transition-transform md:w-5 md:h-5 w-3.5 h-3.5" />
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows - Lower Right Corner */}
      <div className="absolute right-4 md:right-16 bottom-4 md:bottom-20 flex items-center space-x-2 md:space-x-4 z-30">
        <button 
          onClick={prevSlide}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="p-1.5 md:p-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-full text-white/70 hover:text-white transition-all group border border-white/20 shadow-xl hover:scale-110 active:scale-95"
          aria-label="Previous Slide"
        >
          <ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform w-3.5 h-3.5 md:w-6 md:h-6" />
        </button>
        <button 
          onClick={nextSlide}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="p-1.5 md:p-4 bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-full text-white/70 hover:text-white transition-all group border border-white/20 shadow-xl hover:scale-110 active:scale-95"
          aria-label="Next Slide"
        >
          <ArrowRight className="group-hover:translate-x-1 transition-transform w-3.5 h-3.5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Slider Indicators - Sleek bottom-centered indicators */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center space-x-3 z-20">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === index ? 'bg-brand-accent w-16' : 'bg-white/20 w-4 hover:bg-white/40'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
