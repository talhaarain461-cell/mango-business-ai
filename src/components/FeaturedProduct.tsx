/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { MANGO_PRODUCTS, MangoProduct } from '../types';
import { ProductCard } from './ProductCard';
import { Star } from 'lucide-react';

interface FeaturedProductProps {
  onBuyNow: (product: MangoProduct) => void;
  onViewDetails: (product: MangoProduct) => void;
}

export function FeaturedProduct({ onBuyNow, onViewDetails }: FeaturedProductProps) {
  const featuredProduct = MANGO_PRODUCTS.find(p => p.isFeatured);

  if (!featuredProduct) return null;

  return (
    <section className="py-12 sm:py-20 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl -mr-48 -mt-24 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl -ml-48 -mb-24 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-4 py-2 bg-brand-accent/10 rounded-full mb-4"
          >
            <Star size={14} className="text-brand-accent fill-brand-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary">
              {featuredProduct.featuredBadge || 'Featured Product'}
            </span>
            <Star size={14} className="text-brand-accent fill-brand-accent" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-black text-slate-900 uppercase tracking-tight text-center mb-4 italic"
          >
            Taste of <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">Excellence</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 font-bold max-w-2xl text-center text-sm sm:text-base px-4"
          >
            Our most popular variety, hand-picked for perfection. Discover the legendary sweetness of Sindhri.
          </motion.p>
        </div>

        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <ProductCard 
              product={featuredProduct} 
              onBuyNow={onBuyNow} 
              onViewDetails={onViewDetails} 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
