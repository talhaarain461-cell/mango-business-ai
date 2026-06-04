/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ProductCard } from './ProductCard';
import { MANGO_PRODUCTS, MangoProduct, BoxSize } from '../types';

interface RelatedProductsProps {
  currentProductId: string;
  onBuyNow: (product: MangoProduct, size?: BoxSize, quantity?: number) => void;
  onViewDetails: (product: MangoProduct) => void;
}

export function RelatedProducts({ currentProductId, onBuyNow, onViewDetails }: RelatedProductsProps) {
  // Preferred order:
  // 1. Sindhri (1st)
  // 2. Langra (2nd)
  // 3. Chaunsa (3rd)
  
  const preferredIds = ['sindhri', 'langra', 'chaunsa'];
  const finalRelated: MangoProduct[] = [];
  
  // Add preferred products first if they exist and are not the current product
  preferredIds.forEach(id => {
    if (id !== currentProductId) {
      const prod = MANGO_PRODUCTS.find(p => p.id === id);
      if (prod) {
        finalRelated.push(prod);
      }
    }
  });
  
  // Fill the rest with all other products of the store
  const otherProducts = MANGO_PRODUCTS.filter(
    p => !preferredIds.includes(p.id) && p.id !== currentProductId
  );
  finalRelated.push(...otherProducts);

  if (finalRelated.length === 0) return null;

  return (
    <section className="py-16 lg:py-24 bg-transparent border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[10px] font-black text-brand-accent uppercase tracking-[0.3em] mb-4">Discover More</p>
            <h2 className="text-4xl md:text-5xl font-black text-infinite-night uppercase tracking-tight mb-6">
              You May <span className="text-brand-accent">Also Like</span>
            </h2>
            <div className="w-20 h-1 bg-brand-accent mx-auto mb-8 rounded-full" />
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-8">
          {finalRelated.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard 
                product={product} 
                onBuyNow={onBuyNow} 
                onViewDetails={onViewDetails}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
