/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MangoProduct, BoxSize } from '../types';
import { ShoppingBag, CreditCard, ArrowLeft, Package, Star, ShieldCheck, Truck, ChevronDown, CheckCircle2, MessageSquare, Plus, Minus, X, Phone, Upload, Camera, AlertTriangle } from 'lucide-react';
import { useCart } from '../CartContext';
import { useReviews } from '../ReviewContext';
import { getWhatsAppLink } from '../lib/whatsapp';
import { Reviews } from './Reviews';
import { WhatsAppIcon } from './icons/WhatsAppIcon';

interface ProductDetailsProps {
  product: MangoProduct;
  onBack: () => void;
  onBuyNow: (product: MangoProduct, size?: BoxSize, quantity?: number) => void;
}

const TABS = ['Description', 'Additional Information', 'Payment & Delivery', 'Reviews'] as const;
type TabType = typeof TABS[number];

export function ProductDetails({ product, onBack, onBuyNow }: ProductDetailsProps) {
  const { addToCart } = useCart();
  const { getReviewsByProduct } = useReviews();
  const [activeImage, setActiveImage] = useState(product.image);
  const [activeTab, setActiveTab] = useState<TabType>('Description');
  
  const [selectedSize, setSelectedSize] = useState<BoxSize | null>(null);
  const [quantity, setQuantity] = useState(1);
  
  const isInStock = product.status === 'In Stock';
  const displayStatus = product.status;

  const productReviews = getReviewsByProduct(product.id);
  const averageRating = productReviews.length ? (productReviews.reduce((acc, rev) => acc + rev.rating, 0) / productReviews.length).toFixed(1) : '0.0';
  const totalReviews = productReviews.length;
  
  const ratingCounts = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: productReviews.filter(r => r.rating === stars).length,
    percentage: productReviews.length ? (productReviews.filter(r => r.rating === stars).length / productReviews.length) * 100 : 0
  }));
  
  const todayDateStr = new Date().toISOString().split('T')[0];

  useEffect(() => {
    setActiveImage(product.image);
    handleReset();
  }, [product.id, product.image]);

  const allImages = [product.image, ...(product.gallery || [])];

  const handleReset = () => {
    setSelectedSize(null);
    setQuantity(1);
  };

  const totalPrice = useMemo(() => {
    if (!selectedSize || selectedSize === 'Bulk') return 0;
    
    if (product.id === 'sindhri') {
      const sizeLower = selectedSize.toLowerCase();
      if (sizeLower.includes('5kg')) return 1400 * quantity;
      if (sizeLower.includes('8kg')) return 2200 * quantity;
      if (sizeLower.includes('10kg')) return 2600 * quantity;
    }

    const price = selectedSize === '5kg' ? product.price5kg : product.price10kg;
    if (typeof price !== 'number') return 'N/A';
    return price * quantity;
  }, [selectedSize, quantity, product.id, product.price5kg, product.price10kg]);

  const mapSizeForOrder = (size: string) => {
    if (product.id === 'sindhri') {
      const sizeLower = size.toLowerCase();
      if (sizeLower.includes('5kg')) return '5kg wood petti';
      if (sizeLower.includes('8kg')) return '8kg wood petti';
      if (sizeLower.includes('10kg')) return '10kg wood petti';
    }
    return size;
  };

  const handleAddToCart = () => {
    const sizeToUse = selectedSize || product.availableSizes[0];
    const finalSize = mapSizeForOrder(sizeToUse);
    addToCart(product, finalSize as BoxSize, quantity);
  };

  const handleBuyNow = () => {
    const sizeToUse = selectedSize || product.availableSizes[0];
    const finalSize = mapSizeForOrder(sizeToUse);
    onBuyNow(product, finalSize as BoxSize, quantity);
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-white pt-8 pb-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-slate-600 hover:text-brand-accent transition-colors font-black text-[10px] uppercase tracking-widest group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Catalog</span>
        </button>

        {/* TOP SECTION */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start mb-16 sm:mb-24">
          {/* Image Section */}
          <div className="flex flex-col gap-4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative rounded-[32px] sm:rounded-[40px] overflow-hidden border border-slate-200 shadow-md aspect-square lg:aspect-auto lg:h-[600px] bg-white"
            >
              <AnimatePresence mode="wait">
                {activeImage ? (
                  <motion.img 
                    key={activeImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    src={activeImage} 
                    alt={getProductAltText(product)} 
                    width={800}
                    height={800}
                    className="w-full h-full object-cover drop-shadow-xl p-2 sm:p-4 rounded-[28px] sm:rounded-[36px]"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 font-bold uppercase tracking-widest text-sm">No Image</div>
                )}
              </AnimatePresence>
              <div className={`absolute top-6 left-6 sm:top-8 sm:left-8 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-[9px] sm:text-xs font-black uppercase tracking-widest shadow-sm z-10 ${
                displayStatus === 'Coming Soon' ? 'bg-indigo-600 text-white' : 
                displayStatus === 'Out of Stock' ? 'bg-red-600 text-white' :
                'bg-brand-accent text-slate-900'
              }`}>
                {displayStatus}
              </div>
            </motion.div>
            
            {/* Gallery Thumbnails */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {allImages.filter(img => img && img.trim() !== '').map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={`relative rounded-xl sm:rounded-2xl overflow-hidden aspect-square border-2 transition-all p-1 ${
                      activeImage === img ? 'border-brand-accent shadow-sm scale-95' : 'border-transparent hover:border-slate-300'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} view ${index + 1}`} 
                      width={150}
                      height={150}
                      className="w-full h-full object-cover bg-white rounded-lg sm:rounded-xl"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col h-full"
          >
            <div className="mb-6">
              <div className="flex items-center gap-2 text-brand-accent mb-2">
                <Star size={14} fill="currentColor" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em]">Premium Selection</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-infinite-night uppercase tracking-tight mb-3 leading-tight">
                {product.name}
              </h1>
              
              {/* Product Rating */}
              <div className="flex items-center gap-3 mb-4 bg-white/50 px-4 py-2 rounded-full border border-slate-100 w-fit">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      size={14} 
                      fill={star <= Math.round(Number(averageRating)) ? 'currentColor' : 'none'} 
                      className={star <= Math.round(Number(averageRating)) ? 'text-brand-accent' : 'text-slate-200'} 
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-black text-slate-900">{averageRating}</span>
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">({totalReviews} Reviews)</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <p className="text-[10px] font-black text-brand-accent uppercase tracking-widest">
                  {product.type}
                </p>
                <div className="h-1 w-1 bg-slate-300 rounded-full" />
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  {typeof product.price5kg === 'number' && typeof product.price10kg === 'number' 
                    ? `Rs ${product.price5kg} - ${product.price10kg}` 
                    : "N/A"}
                </p>
              </div>
              
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium mb-8">
                {product.description}
              </p>
            </div>

            {/* NEW ORDERING SYSTEM */}
            <div className="bg-white border-2 border-slate-100 rounded-[32px] p-6 sm:p-8 mb-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[10px] sm:text-[11px] font-black text-slate-900 uppercase tracking-[0.2em] flex items-center gap-2">
                  <Package size={16} className="text-brand-accent" /> Select Your Pack
                </h3>
                {(selectedSize || quantity > 1) && (
                  <button 
                    onClick={handleReset}
                    className="p-2 hover:bg-red-50 text-red-500 rounded-full transition-colors group"
                    title="Reset Selection"
                  >
                    <X size={16} className="group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                )}
              </div>

              {/* Pack Sizes */}
              <div className="grid grid-cols-4 gap-2 mb-6">
                {product.availableSizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`relative py-2.5 px-2 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1 group ${
                      selectedSize === size 
                        ? 'border-brand-accent bg-brand-accent/5 shadow-[0_4px_20px_rgba(251,191,36,0.1)]' 
                        : 'border-slate-100 bg-slate-50 hover:border-slate-200 text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <span className={`text-[11px] sm:text-xs font-black uppercase tracking-tight ${selectedSize === size ? 'text-brand-accent' : 'text-slate-900'}`}>
                      {size}
                    </span>
                    <span className="text-[8px] font-bold uppercase tracking-tight opacity-50">
                      {size === 'Bulk' ? 'Whol.' : 'Pack'}
                    </span>
                    {selectedSize === size && (
                      <motion.div 
                        layoutId="activeSize"
                        className="absolute -top-1 -right-1 bg-brand-accent text-white rounded-full p-1 shadow-sm"
                      >
                        <CheckCircle2 size={12} fill="currentColor" className="text-white" />
                      </motion.div>
                    )}
                  </button>
                ))}
              </div>

              {/* Bulk Logic */}
              {selectedSize === 'Bulk' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 flex flex-col items-center text-center gap-4 mb-8"
                >
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <Phone size={24} className="text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="text-indigo-900 font-black uppercase text-[11px] tracking-widest mb-1">Bulk Quantity Inquiries</h4>
                    <p className="text-indigo-700 text-sm font-medium">For bulk quantity, please contact us on WhatsApp directly.</p>
                  </div>
                  <a 
                    href={getWhatsAppLink()} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-[#25D366] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#25D366] transition-all flex items-center justify-center gap-3"
                  >
                    <MessageSquare size={16} />
                    Contact on WhatsApp
                  </a>
                </motion.div>
              )}

              {selectedSize !== 'Bulk' && (
                <div className="space-y-6 transition-opacity duration-300">
                  {/* Quantity Stepper */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-5 bg-slate-50 rounded-2xl border border-slate-100 pointer-events-auto">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Set Quantity</span>
                      <span className="text-xs font-bold text-slate-900">How many boxes?</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className={`p-2 rounded-lg border-2 border-slate-200 transition-all ${quantity > 1 ? 'hover:border-brand-accent hover:text-brand-accent bg-white' : 'opacity-50 cursor-not-allowed bg-slate-100'}`}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-2xl font-black text-slate-900 min-w-[2rem] text-center">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2 rounded-lg border-2 border-slate-200 hover:border-brand-accent hover:text-brand-accent transition-all bg-white"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Price Calculation */}
                  <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Estimated Amount</span>
                      <div className="flex items-baseline gap-2">
                         <span className="text-3xl font-black text-slate-900 leading-none">{typeof totalPrice === 'number' ? `Rs ${totalPrice.toLocaleString()}` : totalPrice}</span>
                         {typeof totalPrice === 'number' && <span className="text-xs font-bold text-slate-400">/ Total</span>}
                      </div>
                    </div>
                    <div className="hidden sm:flex flex-col items-end">
                      <span className="text-[9px] font-black text-brand-accent uppercase tracking-widest px-2 py-1 bg-brand-accent/5 rounded-md border border-brand-accent/10">Order Live Summary</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="grid sm:grid-cols-2 gap-4">
              <button 
                onClick={handleBuyNow}
                disabled={!isInStock}
                className={`py-5 bg-mango-brand text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-3 transition-all shadow-lg active:scale-95 disabled:cursor-not-allowed ${
                  isInStock ? 'hover:bg-mango-brand/90 disabled:opacity-50 disabled:grayscale' : 'opacity-80'
                }`}
              >
                <CreditCard size={18} />
                <span>Quick Purchase</span>
              </button>
              <button 
                onClick={handleAddToCart}
                disabled={!isInStock}
                className={`py-5 bg-brand-accent text-black rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-3 transition-all shadow-lg active:scale-95 disabled:cursor-not-allowed ${
                  isInStock ? 'hover:bg-[#D9A300] disabled:opacity-50 disabled:grayscale' : 'opacity-80'
                }`}
              >
                <ShoppingBag size={18} />
                <span>Add to Cart</span>
              </button>
            </div>
            {!selectedSize && (
              <p className="mt-4 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 animate-pulse">
                Please click Quick Purchase to proceed.
              </p>
            )}
          </motion.div>
        </div>

        {/* TABS SECTION */}
        <div className="mt-12">
          {/* Tab Headers */}
          <div className="flex overflow-x-auto hide-scrollbar border-b border-slate-200 mb-8 sm:mb-12">
            <div className="flex space-x-8 px-2 w-max min-w-full justify-start md:justify-center">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 text-sm font-bold uppercase tracking-widest transition-colors relative whitespace-nowrap ${
                    activeTab === tab ? 'text-brand-accent' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div 
                      layoutId="tabIndicator"
                      className="absolute bottom-0 left-0 w-full h-1 bg-brand-accent rounded-t-full"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm min-h-[300px]">
            <AnimatePresence mode="wait">
              {activeTab === 'Description' && (
                <motion.div
                  key="Description"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="prose prose-slate max-w-none text-slate-700"
                >
                  <h3 className="text-xl font-bold text-infinite-night mb-4">About {product.name}</h3>
                  <p className="leading-relaxed whitespace-pre-wrap">{product.longDescription || product.description}</p>
                </motion.div>
              )}

              {activeTab === 'Additional Information' && (
                <motion.div
                  key="Additional Information"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {product.specifications && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex flex-col p-4 bg-slate-50 rounded-xl border border-slate-100">
                          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{key}</span>
                          <span className="text-sm font-bold text-slate-900">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-100">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">Available Packs</h4>
                      <p className="text-slate-600">5KG, 10KG, BULK</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 mb-1">Variety</h4>
                      <p className="text-slate-600">{product.type}</p>
                    </div>
                  </div>
                  <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
                    <p className="text-sm font-bold text-amber-800 leading-relaxed uppercase tracking-wider mb-2">Important Information</p>
                    <p className="text-sm font-medium text-amber-800 leading-relaxed">
                      The weight mentioned is the total package weight when packed unripe. This includes the box and packaging material. Fruits may lose some water weight during the natural ripening process.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'Payment & Delivery' && (
                <motion.div
                  key="Payment & Delivery"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-10"
                >
                  <section>
                    <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                       <CreditCard className="text-brand-accent" size={24}/> Payment Policy
                    </h4>
                    <ul className="space-y-3 text-slate-700 list-disc pl-5">
                      <li>Advance payment required across Pakistan.</li>
                      <li>Cash on Delivery (COD) available only for <strong className="text-slate-900">Tando Allahyar</strong>.</li>
                    </ul>
                  </section>

                  <section className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
                    <h4 className="text-lg font-bold text-emerald-900 mb-2 flex items-center gap-2">
                      <Star className="text-emerald-500" fill="currentColor" size={20} /> Special Offer
                    </h4>
                    <ul className="space-y-2 text-emerald-800 text-sm list-disc pl-5">
                      <li>Special Discount Available.</li>
                      <li>Only for customers in Tando Allahyar.</li>
                      <li>Discount applies automatically when city "Tando Allahyar" is selected in the order form.</li>
                    </ul>
                  </section>

                  <section>
                    <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                       <Truck className="text-brand-accent" size={24}/> Delivery Time
                    </h4>
                    <ul className="space-y-3 text-slate-700 list-disc pl-5">
                      <li>Standard delivery: 2–4 working days.</li>
                      <li>Delivery via courier and rail cargo.</li>
                    </ul>
                  </section>

                  <section className="bg-red-50 rounded-2xl p-6 border border-red-100">
                    <h4 className="text-lg font-bold text-red-900 mb-2 flex items-center gap-2">
                       <ShieldCheck className="text-red-500" size={20}/> Important Disclaimer
                    </h4>
                    <ul className="space-y-2 text-red-800 text-sm list-disc pl-5">
                      <li>Delivery may be delayed due to weather conditions, transport issues, train delays, or accidents.</li>
                      <li>No claims will be accepted in such situations.</li>
                      <li>Natural or unavoidable events are not covered under any claim.</li>
                    </ul>
                  </section>
                </motion.div>
              )}

              {activeTab === 'Reviews' && (
                <motion.div
                  key="Reviews"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="-mx-6 sm:-mx-10"
                >
                  <div className="px-6 sm:px-10">
                    {/* Reviews Summary */}
                    <div className="grid md:grid-cols-3 gap-8 mb-12 bg-white border border-slate-100 p-8 rounded-3xl shadow-sm">
                      <div className="text-center md:text-left flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-infinite-night mb-2 uppercase tracking-tight">Customer Reviews</h3>
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                          <span className="text-5xl font-black text-slate-900">{averageRating}</span>
                          <div className="flex flex-col gap-1 text-slate-500 text-sm">
                            <div className="flex gap-1 text-brand-accent">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} size={16} fill={star <= Math.round(Number(averageRating)) ? 'currentColor' : 'none'} className={star <= Math.round(Number(averageRating)) ? 'text-brand-accent' : 'text-slate-200'} />
                              ))}
                            </div>
                            <span className="font-bold uppercase tracking-wider text-[10px]">Based on {totalReviews} reviews</span>
                          </div>
                        </div>
                      </div>
                      <div className="col-span-2 space-y-3 border-t md:border-t-0 md:border-l border-slate-100 pt-6 md:pt-0 md:pl-8">
                        {ratingCounts.map((rating) => (
                          <div key={rating.stars} className="flex items-center gap-4 text-sm">
                            <span className="w-12 font-bold text-slate-700 flex items-center gap-1">{rating.stars} <Star size={12} fill="currentColor" className="text-slate-200" /></span>
                            <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${rating.percentage}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="h-full bg-brand-accent rounded-full"
                              />
                            </div>
                            <span className="w-12 text-right text-slate-400 font-bold text-[10px] uppercase">{rating.percentage.toFixed(0)}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50/30 rounded-b-3xl">
                    <Reviews productId={product.id} limit={4} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {/* The Reviews component now handles its own image lightboxes internally */}
      </AnimatePresence>
    </motion.div>
  );
}

