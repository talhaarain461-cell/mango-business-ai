/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MangoProduct } from '../types';
import { ShoppingBag, Package, CreditCard, Star, Plus, AlertTriangle, X } from 'lucide-react';
import { useCart } from '../CartContext';
import { useReviews } from '../ReviewContext';
import { isPriceExpired } from '../lib/timer';
import { getWhatsAppLink } from '../lib/whatsapp';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface ProductCardProps {
  product: MangoProduct;
  onBuyNow: (product: MangoProduct) => void;
  onViewDetails: (product: MangoProduct) => void;
}

export function ProductCard({ product, onBuyNow, onViewDetails }: ProductCardProps) {
  const { addToCart } = useCart();
  const { getProductRating } = useReviews();
  const [isExpired, setIsExpired] = useState(false);
  const [showExpiredMessage, setShowExpiredMessage] = useState(false);

  const { average, count } = getProductRating(product.id);

  const isInStock = product.status === 'In Stock';
  const hasMarketRate = !!product.lastRateUpdate && typeof product.price5kg === 'number' && typeof product.price10kg === 'number';

  useEffect(() => {
    if (!hasMarketRate) {
      setIsExpired(false);
      return;
    }

    const checkExpiry = () => {
      const expired = isPriceExpired(product.lastRateUpdate);
      setIsExpired(prev => prev === expired ? prev : expired);
    };
    checkExpiry();
    const interval = setInterval(checkExpiry, 5000);
    return () => clearInterval(interval);
  }, [product.lastRateUpdate, hasMarketRate]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isExpired) {
      setShowExpiredMessage(true);
      return;
    }
    addToCart(product);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isExpired) {
      setShowExpiredMessage(true);
      return;
    }
    onBuyNow(product);
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

  const expiredModal = (
    <AnimatePresence>
      {showExpiredMessage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm"
          onClick={(e) => {
            e.stopPropagation();
            setShowExpiredMessage(false);
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="bg-white rounded-[32px] p-8 max-w-sm w-full shadow-2xl border border-slate-100 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowExpiredMessage(false)}
              className="absolute top-6 right-6 p-2 hover:bg-slate-50 rounded-full transition-colors"
            >
              <X size={20} className="text-slate-400" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="bg-amber-100 p-4 rounded-2xl text-amber-600 mb-6">
                <AlertTriangle size={32} />
              </div>
              <h4 className="text-amber-900 font-black text-xl uppercase tracking-tight mb-2">
                ⚠ Waiting for New Market Rate
              </h4>
              <p className="text-slate-600 font-medium text-sm leading-relaxed mb-8">
                Today's new price is not updated yet.
              </p>

              <div className="w-full pt-6 border-t border-slate-100 space-y-4">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                  Need help or urgent order?
                </p>
                  <a
                    href={getWhatsAppLink("Hello, I visited Aam Wala Online Store and I want to order mangoes. Please guide me.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-3 py-4 bg-[#25D366] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#1da851] transition-all shadow-md active:scale-95"
                  >
                  <WhatsAppIcon size={18} />
                  Contact on WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {ReactDOM.createPortal(expiredModal, document.body)}
      <motion.div
        onClick={() => onViewDetails(product)}
        className="bg-white rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 transition-all duration-500 flex flex-col h-full hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 active:scale-[0.98] group cursor-pointer"
      >
        {/* Image Section */}
        <div className="relative aspect-square sm:aspect-[4/3] overflow-hidden m-1 rounded-[24px] sm:rounded-[28px] bg-slate-50 group">
          {product.image ? (
            <img 
              src={product.image} 
              alt={getProductAltText(product)} 
              width={400}
              height={400}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 rounded-[24px] sm:rounded-[28px]"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-600 text-xs font-bold uppercase tracking-wider">No Image</div>
          )}
          
          {/* Quick Add To Cart Icon */}
          <button
            onClick={(e) => {
              if (!isInStock) {
                e.stopPropagation();
                return;
              }
              handleAddToCart(e);
            }}
            disabled={!isInStock}
            className={`absolute top-4 right-4 w-7 h-7 sm:w-8 sm:h-8 bg-white shadow-lg rounded-full flex items-center justify-center text-brand-primary transition-all duration-300 z-20 ${
              isInStock ? 'hover:bg-brand-accent hover:text-black active:scale-90' : 'opacity-80 cursor-not-allowed'
            }`}
            title={isInStock ? "Add to Cart" : product.status}
          >
            <Plus size={16} strokeWidth={3} className="sm:w-5 sm:h-5" />
          </button>

          <div className="absolute top-3 left-3">
            <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${
              product.status === 'Coming Soon' ? 'bg-slate-600 text-white' :
              product.status === 'Out of Stock' ? 'bg-red-600 text-white' :
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
               {typeof product.price5kg === 'number' && typeof product.price10kg === 'number' ? 
                (isExpired ? "Updating Rate" : `Rs ${product.price5kg} - ${product.price10kg}`) : 
                "N/A"
              }
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
                <Package size={13} className="text-brand-accent" /> AVAILABLE PACKS
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.availableSizes.map(size => (
                <span key={size} className="px-2.5 py-1 bg-slate-50 text-slate-600 rounded-lg text-[9px] font-black uppercase border border-slate-200">
                  {size === 'Bulk' ? 'BULK' : size.toUpperCase()}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-auto">
            <div className="flex flex-col gap-2" onClick={e => e.stopPropagation()}>
              <button 
                onClick={(e) => {
                  if (!isInStock) return;
                  handleBuyNow(e);
                }}
                disabled={!isInStock}
                className={`w-full py-3.5 sm:py-4 bg-brand-primary text-white rounded-2xl font-black text-[10px] sm:text-xs uppercase tracking-widest flex items-center justify-center hover:bg-brand-primary/95 transition-all shadow-lg active:scale-95 ${
                  isInStock ? (isExpired ? 'opacity-90 shadow-brand-primary/20' : 'shadow-brand-primary/20') : 'opacity-80 cursor-not-allowed grayscale-[20%]'
                }`}
              >
                <span>{isExpired ? 'Price Expired' : 'Buy Now'}</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}