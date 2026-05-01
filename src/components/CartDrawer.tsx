/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart, CartItem } from '../CartContext';
import { useEffect } from 'react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export function CartDrawer({ isOpen, onClose, onCheckout }: CartDrawerProps) {
  const { cart, removeFromCart, addToCart, clearCart, totalItems } = useCart();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const calculateItemTotal = (item: CartItem) => {
    if (item.size === 'Bulk') return 0;
    if (typeof item.product.pricePerKg !== 'number') return 'N/A';
    const weight = parseInt(item.size.replace('kg', ''));
    return (item.product.pricePerKg as number) * weight * item.quantity;
  };

  const cartTotal = cart.reduce((total, item) => {
    const itemTotal = calculateItemTotal(item);
    if (typeof itemTotal === 'string') return 'N/A';
    if (typeof total === 'string') return 'N/A';
    return total + itemTotal;
  }, 0 as number | string);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-white/60 backdrop-blur-sm"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 z-[110] w-[90vw] max-w-[400px] bg-white shadow-md flex flex-col border-l border-slate-200"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-accent/20 text-brand-accent rounded-xl flex items-center justify-center">
                  <ShoppingCart size={20} />
                </div>
                <h2 className="text-lg font-black text-infinite-night uppercase tracking-wider">Shopping Cart</h2>
                <span className="bg-brand-accent text-slate-900 px-2 py-0.5 rounded-full text-[10px] font-black">{totalItems}</span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-slate-600 hover:text-black transition-colors bg-white shadow-sm rounded-full border border-slate-100"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-24 h-24 bg-white shadow-sm rounded-full flex items-center justify-center text-slate-500 mb-2">
                    <ShoppingCart size={40} />
                  </div>
                  <p className="text-infinite-night font-black uppercase text-xl">Your cart is empty</p>
                  <p className="text-sm font-medium text-slate-600 max-w-[250px]">
                    You haven't added any fresh mangoes to your cart yet.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-8 py-4 bg-brand-primary shadow-sm text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brand-primary/90 transition-all border border-transparent"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-4 p-4 bg-white rounded-2xl border border-slate-200">
                      {item.product.image ? (
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="w-20 h-20 rounded-2xl object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 text-[10px] font-bold">Img</div>
                      )}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="text-slate-900 font-black uppercase text-sm">{item.product.name}</h3>
                            <button onClick={() => removeFromCart(item.product.id, item.size)} className="text-slate-500 hover:text-red-400 transition-colors">
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <p className="text-[10px] font-black text-mango-brand uppercase tracking-widest">{typeof item.product.pricePerKg === 'number' ? `Rs ${item.product.pricePerKg} / KG` : item.product.pricePerKg}</p>
                            <span className="h-1 w-1 bg-slate-300 rounded-full" />
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.size} Pack</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center bg-white border border-slate-200 rounded-lg overflow-hidden relative z-10">
                             <span className="px-3 text-xs font-black text-slate-900 py-1">Qty: {item.quantity}</span>
                          </div>
                          <p className="text-sm font-black text-slate-900">
                             {item.size === 'Bulk' ? 'Wholesale' : (typeof calculateItemTotal(item) === 'number' ? `Rs ${calculateItemTotal(item).toLocaleString()}` : calculateItemTotal(item))}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-white border-t border-slate-200">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-600 font-bold text-sm uppercase tracking-widest">Total Amount</span>
                  <span className="text-2xl font-black text-infinite-night">{typeof cartTotal === 'number' ? `Rs ${cartTotal.toLocaleString()}` : cartTotal}</span>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onCheckout();
                  }}
                  className="w-full py-5 bg-brand-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-brand-primary/90 transition-all shadow-xl active:scale-95"
                >
                  <span>Check Out Now</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
