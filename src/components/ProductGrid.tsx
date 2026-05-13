/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { ProductCard } from './ProductCard';
import { MANGO_PRODUCTS, MangoProduct, SOCIAL_LINKS } from '../types';
import { MessageSquare, LayoutGrid, Package } from 'lucide-react';
import { getWhatsAppLink } from '../lib/whatsapp';

interface ProductGridProps {
  onBuyNow: (product: MangoProduct) => void;
  onViewDetails: (product: MangoProduct) => void;
  onNavigate: (target: string) => void;
  activeCategory: 'mangoes' | 'bulk';
  setActiveCategory: (category: 'mangoes' | 'bulk') => void;
  hideBulk?: boolean;
}

export function ProductGrid({ onBuyNow, onViewDetails, onNavigate, activeCategory, setActiveCategory, hideBulk = false }: ProductGridProps) {
  return (
    <section className="py-12 lg:py-20 bg-transparent border-t border-slate-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[10px] font-black text-brand-accent uppercase tracking-[0.3em] mb-4">Quality Farm Selection</p>
            <h2 className="text-4xl md:text-5xl font-black text-infinite-night uppercase tracking-tight mb-4">
              Shop Our <span className="text-brand-accent">Catalog</span>
            </h2>
            <div className="w-24 h-1 bg-brand-accent mx-auto mb-8 rounded-full" />
            {!hideBulk && (
              <p className="text-slate-500 max-w-2xl mx-auto text-lg font-medium">
                Choose between our premium retail boxes or wholesale bulk quantities.
              </p>
            )}
          </motion.div>
        </div>

        {/* Category Toggles */}
        {!hideBulk && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <button 
              onClick={() => setActiveCategory('mangoes')}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest border transition-all hover:scale-105 active:scale-95 ${activeCategory === 'mangoes' ? 'bg-mango-brand border-mango-brand text-white shadow-xl shadow-mango-brand/10' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 shadow-sm'}`}
            >
              <LayoutGrid size={16} />
              <span>Mangoes Category</span>
            </button>
            
            <button 
              onClick={() => setActiveCategory('bulk')}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest border transition-all hover:scale-105 active:scale-95 ${activeCategory === 'bulk' ? 'bg-mango-brand border-mango-brand text-white shadow-xl shadow-mango-brand/10' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 shadow-sm'}`}
            >
              <MessageSquare size={16} />
              <span>Bulk Quantity (Wholesale)</span>
            </button>
          </div>
        )}
        
        <AnimatePresence mode="wait">
          {activeCategory === 'mangoes' || hideBulk ? (
            <motion.div 
              key="mangoes-grid"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 mb-16"
            >
              {MANGO_PRODUCTS.filter(p => !p.isFeatured).map((product, index) => (
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
            </motion.div>
          ) : (
            <motion.div 
              key="bulk-section"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="relative bg-white rounded-[40px] p-8 lg:p-16 overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/50"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-[120px] -mr-48 -mt-48" />
              
              <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center gap-3 text-brand-accent mb-6 uppercase">
                    <Package size={24} />
                    <span className="text-sm font-black tracking-widest">Wholesale & Bulk Orders</span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-black text-slate-900 uppercase tracking-tight mb-6 leading-none">
                    Volume Orders for <br />
                    <span className="text-brand-accent">Your Business</span>
                  </h2>
                  <p className="text-slate-600 text-lg mb-8 leading-relaxed font-bold">
                    Perfect for retailers, resellers, and bulk buyers. Get premium mangoes at wholesale rates with direct farm sourcing and priority delivery.
                  </p>
                  
                  <div className="bg-slate-50 shadow-sm border border-slate-100 rounded-2xl p-6 mb-8 flex items-start gap-4">
                     <MessageSquare className="text-brand-accent shrink-0 mt-1" size={20} />
                     <p className="text-slate-600 text-sm font-medium italic">
                       "Coordinate with our support team on WhatsApp directly for discounted rates and logistics planning."
                     </p>
                  </div>

                  <a 
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-4 px-10 py-5 bg-[#25D366] text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#25D366] transition-all hover:scale-105 shadow-xl"
                  >
                    <div className="w-8 h-8 bg-white/20 text-white rounded-full flex items-center justify-center">
                      <MessageSquare size={18} />
                    </div>
                    <span>Bulk WhatsApp Contact</span>
                  </a>
                </div>
                
                <div className="lg:pl-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-white shadow-md p-8 rounded-3xl border border-slate-100 text-center group hover:bg-slate-50 transition-colors duration-300">
                         <p className="text-3xl font-black text-infinite-night mb-2 border-b-4 border-brand-accent inline-block px-1">Wholesale</p>
                         <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Pricing Available</p>
                      </div>
                      <div className="bg-white shadow-md p-8 rounded-3xl border border-slate-100 text-center group hover:bg-slate-50 transition-colors duration-300">
                         <p className="text-3xl font-black text-infinite-night mb-2 border-b-4 border-brand-accent inline-block px-1">Priority</p>
                         <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Logistics Support</p>
                      </div>
                      <div className="bg-white shadow-md p-8 rounded-3xl border border-slate-100 text-center group hover:bg-slate-50 transition-colors duration-300">
                         <p className="text-3xl font-black text-infinite-night mb-2 border-b-4 border-brand-accent inline-block px-1">Direct</p>
                         <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Farm Sourcing</p>
                      </div>
                      <div className="bg-white shadow-md p-8 rounded-3xl border border-slate-100 text-center group hover:bg-slate-50 transition-colors duration-300">
                         <p className="text-3xl font-black text-infinite-night mb-2 border-b-4 border-brand-accent inline-block px-1">Verified</p>
                         <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Product Quality</p>
                      </div>
                    </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
