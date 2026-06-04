/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FarmImage {
  src: string;
  alt: string;
}

export function FarmPartner() {
  const images: FarmImage[] = [
    {
      src: 'https://res.cloudinary.com/dvm1xghh5/image/upload/v1780552083/Picsart_26-06-04_10-43-34-985.jpg_z1wzsa.jpg',
      alt: 'Fresh green mango orchards at G.Baloch Fruit Farm'
    },
    {
      src: 'https://res.cloudinary.com/dvm1xghh5/image/upload/v1780552208/Picsart_26-06-04_10-43-04-855.jpg_acevm6.jpg',
      alt: 'Premium mango harvesting process at G.Baloch Fruit Farm'
    },
    {
      src: 'https://res.cloudinary.com/dvm1xghh5/image/upload/v1780552083/Picsart_26-06-04_10-44-04-425.jpg_gwezbz.jpg',
      alt: 'Freshly harvested organic mango crops ready for packaging'
    }
  ];

  const logoUrl = 'https://res.cloudinary.com/dvm1xghh5/image/upload/v1780553075/AIEnhancer_file_0000000000307206b51b9d0c5_1_epyraw.png';

  const [width, setWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Swipe gesture tracking state
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine how many images are visible on screen
  let visibleCount = 3;
  if (width < 768) {
    visibleCount = 1;
  } else if (width < 1024) {
    visibleCount = 2;
  }

  const maxIndex = Math.max(0, images.length - visibleCount);

  // Adjust current index if screen resize causes it to be out of bounds
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [visibleCount, maxIndex, currentIndex]);

  const handleNext = () => {
    setCurrentIndex(prev => (prev < maxIndex ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : maxIndex));
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, currentIndex, maxIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const showArrows = images.length > visibleCount;

  return (
    <section className="py-16 lg:py-24 bg-slate-50 border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Title */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <p className="text-[10px] font-black text-brand-accent uppercase tracking-[0.3em]">
              Trusted Partnerships
            </p>
            <h2 className="text-3xl md:text-5xl font-black text-infinite-night uppercase tracking-tight">
              Our Trusted <span className="text-brand-accent">Farm Partner</span>
            </h2>
            <div className="w-24 h-1 bg-brand-accent mx-auto mt-4 rounded-full" />
          </motion.div>
        </div>

        {/* Partner Info and Logo Card */}
        <div className="max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[32px] p-8 md:p-12 border border-slate-200/60 shadow-xl shadow-slate-200/50 flex flex-col items-center text-center space-y-8"
          >
            {/* Prominent Partner Logo */}
            <div className="relative group max-w-[200px] sm:max-w-[240px] px-4">
              <img
                src={logoUrl}
                alt="G.Baloch Fruit Farm Logo"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-auto object-contain transition-transform duration-500 scale-100 group-hover:scale-105"
              />
            </div>

            {/* Partner Description */}
            <p className="text-slate-600 text-base md:text-lg leading-relaxed font-semibold max-w-2xl px-2">
              G.Baloch Fruit Farm is our official fruit source partner, supplying premium-quality fruits grown and harvested with the highest standards of care. Together, we ensure farm-fresh quality, authentic taste, and reliable delivery from orchard to doorstep.
            </p>
          </motion.div>
        </div>

        {/* Farm Gallery Title */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-black text-infinite-night uppercase tracking-wider relative inline-block">
              FARM GALLERY
              <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-brand-accent/45 rounded-full" />
            </h3>
          </motion.div>
        </div>

        {/* Farm Gallery Slider Container */}
        <div 
          className="max-w-6xl mx-auto relative px-4 md:px-12 select-none"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            className="overflow-hidden rounded-[24px]"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleCount)}%)` }}
            >
              {images.map((img, index) => (
                <div 
                  key={index}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-2 sm:px-3 mb-2"
                >
                  <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 bg-white p-2 group h-full">
                    <div className="overflow-hidden rounded-xl aspect-[3/4] w-full relative bg-slate-50">
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <AnimatePresence>
            {showArrows && (
              <>
                {/* Left Arrow */}
                <button
                  onClick={handlePrev}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  onTouchStart={() => setIsPaused(true)}
                  onTouchEnd={() => setIsPaused(false)}
                  className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white hover:bg-brand-accent text-slate-800 hover:text-white rounded-full border border-slate-200 flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95 z-10"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft size={20} className="md:w-6 md:h-6" />
                </button>

                {/* Right Arrow */}
                <button
                  onClick={handleNext}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  onTouchStart={() => setIsPaused(true)}
                  onTouchEnd={() => setIsPaused(false)}
                  className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white hover:bg-brand-accent text-slate-800 hover:text-white rounded-full border border-slate-200 flex items-center justify-center shadow-lg transition-all hover:scale-105 active:scale-95 z-10"
                  aria-label="Next Slide"
                >
                  <ChevronRight size={20} className="md:w-6 md:h-6" />
                </button>
              </>
            )}
          </AnimatePresence>

          {/* Dots/Indicators for tablet and mobile view */}
          {showArrows && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                  onTouchStart={() => setIsPaused(true)}
                  onTouchEnd={() => setIsPaused(false)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index ? 'w-6 bg-brand-accent' : 'w-2 bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
