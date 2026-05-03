/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { MangoProduct } from '../types';
import { ShoppingBag, Package, CreditCard, Star } from 'lucide-react';
import { useCart } from '../CartContext';
import { useReviews } from '../ReviewContext';

interface ProductCardProps {
  product: MangoProduct;
  onBuyNow: (product: MangoProduct) => void;
  onViewDetails: (product: MangoProduct) => void;
}

export function ProductCard({ product, onBuyNow, onViewDetails }: ProductCardProps) {
  const { addToCart } = useCart();
  const { getProductRating } = useReviews();

  const { average, count } = getProductRating(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const getProductAltText = (product: MangoProduct) => {
    switch(product.id) {
      case 'chaunsa': return "Chaunsa mango online order Pakistan fresh delivery";
      case 'langra': return "Langra mango buy online Pakistan Tando Allahyar";
      case 'dasheri': return "Dasehri mango fresh Pakistan home delivery";
      case 'sindhri': return "Sindhri mango online Pakistan premium quality";
      case 'desi-achar': return "Desi Achari mango Pakistan fresh order";
      case 'saroli': return "Saroli mango buy online Pakistan";
      case 'anwar-ratol': return "Anwar Ratol mango premium Pakistan delivery";
      default: return "Fresh premium mangoes online order Pakistan Tando Allahyar";
    }
  };

  return (
    <motion.div
      onClick={() => onViewDetails(product)}
      className="bg-white rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 transition-all duration-500 flex flex-col h-full hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 active:scale-[0.98] group cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative h-36 sm:h-56 overflow-hidden m-1 rounded-[24px] sm:rounded-[28px] bg-slate-50">
        {product.image ? (
          <img 
            src={product.image} 
            alt={getProductAltText(product)} 
            width={400}
            height={400}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 rounded-[24px] sm:rounded-[28px]"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-600 text-xs font-bold uppercase tracking-wider">No Image</div>
        )}
        <div className="absolute top-3 left-3">
          <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${
            product.status === 'Coming Soon' ? 'bg-slate-600 text-white' :
            'bg-mango-brand text-white'
          }`}>
            {product.status}
          </span>
        </div>
      </div>
      
      <div className="p-3 sm:p-5 lg:p-6 flex flex-col flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-start mb-1 gap-1.5">
          <h3 className="text-sm sm:text-lg font-black text-infinite-night uppercase tracking-tight leading-tight group-hover:text-brand-accent transition-colors">{product.name}</h3>
          <div className="bg-brand-accent/10 text-brand-accent px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg text-[9px] sm:text-xs font-black whitespace-nowrap border border-brand-accent/20">
            {typeof product.pricePerKg === 'number' ? `Rs ${product.pricePerKg}/kg` : product.pricePerKg}
          </div>
        </div>

        {/* Product Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                size={10} 
                fill={star <= Math.round(average) ? 'currentColor' : 'none'} 
                className={star <= Math.round(average) ? 'text-brand-accent' : 'text-slate-200'} 
              />
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black text-slate-900">{average > 0 ? average.toFixed(1) : '0.0'}</span>
            <span className="text-slate-400 text-[8px] font-bold uppercase tracking-wider">({count} Reviews)</span>
          </div>
        </div>
        
        <p className="text-[9px] font-black text-brand-accent uppercase tracking-widest mb-3">
          {product.type}
        </p>
 
        {/* Box Options */}
        <div className="hidden sm:block mb-4">
          <div className="flex items-center justify-between mb-2 text-slate-600">
            <p className="text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
              <Package size={13} className="text-brand-accent" /> Available Packs
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {product.availableSizes.map(size => (
              <span key={size} className="px-2.5 py-1 bg-slate-50 text-slate-600 rounded-lg text-[9px] font-black uppercase border border-slate-200">
                {size}
              </span>
            ))}
          </div>
        </div>
 
        {/* Action Buttons */}
        <div className="mt-auto">
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-2" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => onBuyNow(product)}
              disabled={true}
              className={`w-full py-2 sm:py-3 bg-brand-primary text-white rounded-lg sm:rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-brand-primary/90 transition-all shadow-sm active:scale-95 disabled:cursor-not-allowed`}
            >
              <CreditCard size={12} className="sm:w-[13px] sm:h-[13px]" />
              <span>Buy Now</span>
            </button>
            <button 
              onClick={handleAddToCart}
              disabled={true}
              className={`w-full py-2 sm:py-3 bg-brand-accent text-black border border-transparent rounded-lg sm:rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-[#D9A300] transition-all active:scale-95 px-1 text-center shadow-sm disabled:cursor-not-allowed`}
            >
              <ShoppingBag size={12} className="sm:w-[13px] sm:h-[13px]" />
              <span className="sm:inline">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
