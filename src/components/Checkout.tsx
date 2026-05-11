import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Phone, Briefcase, Truck, ShieldCheck, MapPin, ArrowLeft, Wallet, Calculator, Package, Info, Check, CreditCard, X } from 'lucide-react';
import { MANGO_PRODUCTS, SOCIAL_LINKS, BoxSize } from '../types';
import { useCart } from '../CartContext';
import { useUser } from '../UserContext';

interface CheckoutProps {
  preSelectedProduct?: string;
  preSelectedSize?: BoxSize;
  preSelectedQuantity?: number;
  onBack: () => void;
  onContinueShopping?: () => void;
}

const PAYMENT_ACCOUNTS = {
  'Bank Transfer': {
    bank: 'Meezan Bank (Rashidabad Branch)',
    title: 'Muhammad Talha',
    account: '89010105349515',
    iban: 'PK40MEZN0089010105349515'
  },
  'JazzCash': {
    title: 'MUHAMMAD TALHA',
    number: '03083908180',
    iban: 'PK29JCMA1009923083908180'
  },
  'Easypaisa': {
    title: 'MUHAMMAD TALHA',
    number: '03083908180',
    iban: 'PK47TMFB0000000050298162'
  },
  'Raast': {
    title: 'MUHAMMAD TALHA',
    number: '03083908180'
  }
};

export function Checkout({ preSelectedProduct, preSelectedSize, preSelectedQuantity, onBack, onContinueShopping }: CheckoutProps) {
  const { cart, clearCart } = useCart();
  const { userData, setUserData } = useUser();
  const [formState, setFormState] = useState<'idle' | 'sending' | 'success'>('idle');
  const [submittedData, setSubmittedData] = useState<any>(null);

  const [localOrderItems, setLocalOrderItems] = useState(() => {
    if (preSelectedProduct) {
      const product = MANGO_PRODUCTS.find(p => p.id === preSelectedProduct) || MANGO_PRODUCTS[0];
      return [{
        product,
        size: '' as BoxSize, // Start empty as per request
        quantity: 1
      }];
    }
    return cart.map(item => ({
      ...item,
      size: '' as BoxSize, // Force manual selection
      quantity: 1 // Start with 1, as 0 doesn't make sense for quantity
    }));
  });

  // Sync localOrderItems with cart changes (e.g. from CartDrawer)
  React.useEffect(() => {
    if (!preSelectedProduct) {
      setLocalOrderItems(prev => {
        // Store existing selections in a map for easy lookup
        const selectionsMap = new Map();
        prev.forEach(item => {
          selectionsMap.set(item.product.id, { size: item.size, quantity: item.quantity });
        });

        // Return new cart items with preserved selections where available
        return cart.map(cartItem => {
          const selection = selectionsMap.get(cartItem.product.id);
          return {
            ...cartItem,
            size: selection ? selection.size : ('' as BoxSize),
            quantity: selection ? selection.quantity : 1
          };
        });
      });
    }
  }, [cart, preSelectedProduct]);

  const [formData, setFormData] = useState({
    fullName: userData.fullName || '',
    phone: userData.phone || '',
    address: userData.address || '',
    city: userData.city || '',
    paymentMethod: 'Bank Transfer' as string
  });

  const isTandoAllahyar = formData.city.trim().toLowerCase() === 'tando allahyar';
  
  // Ensure payment method is valid if city changes
  React.useEffect(() => {
    if (!isTandoAllahyar && formData.paymentMethod === 'Cash on Delivery') {
      setFormData(prev => ({ ...prev, paymentMethod: 'Bank Transfer' }));
    }
  }, [isTandoAllahyar, formData.paymentMethod]);

  const updateItem = (index: number, updates: Partial<typeof localOrderItems[0]>) => {
    setLocalOrderItems(prev => {
      const next = [...prev];
      next[index] = { ...next[index], ...updates };
      return next;
    });
  };

  const itemCalculations = useMemo(() => {
    return localOrderItems.map(item => {
      const weightNum = parseInt(item.size) || 0;
      const itemSubtotal = typeof item.product.pricePerKg === 'number'
        ? (weightNum * (item.product.pricePerKg as number)) * item.quantity
        : 0;
      const itemDiscount = (isTandoAllahyar && item.size) ? (300 * item.quantity) : 0;
      return {
        ...item,
        subtotal: itemSubtotal,
        discount: itemDiscount,
        total: Math.max(0, itemSubtotal - itemDiscount)
      };
    });
  }, [localOrderItems, isTandoAllahyar]);

  const totalSubtotal = itemCalculations.reduce((acc, curr) => acc + curr.subtotal, 0);
  const totalDiscount = itemCalculations.reduce((acc, curr) => acc + curr.discount, 0);
  const finalTotal = Math.max(0, totalSubtotal - totalDiscount);

  const availableMethods = useMemo(() => {
    const methods = Object.keys(PAYMENT_ACCOUNTS);
    if (isTandoAllahyar) {
      return ['Cash on Delivery', ...methods];
    }
    return methods;
  }, [isTandoAllahyar]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    
    // Construct Items Text for WhatsApp
    const itemsText = itemCalculations.map((item, idx) => 
      `*Item #${idx + 1}:*\n` +
      `• Variety: ${item.product.name}\n` +
      `• Box Size: ${item.size}\n` +
      `• Quantity: ${item.quantity} Box(es)\n` +
      `• Subtotal: Rs. ${item.subtotal}`
    ).join('\n\n');

    // Construct WhatsApp Message with proper encoding
    const messageText = `*NEW ORDER FROM AAM WALA*\n\n` +
      `*CUSTOMER DETAILS:*\n` +
      `• Name: ${formData.fullName}\n` +
      `• Phone: ${formData.phone}\n` +
      `• City: ${formData.city}\n` +
      `• Address: ${formData.address}\n\n` +
      `*ORDER DETAILS:*\n` +
      `${itemsText}\n\n` +
      `*PAYMENT INFO:*\n` +
      `• Method: ${formData.paymentMethod}\n` +
      `• Subtotal: Rs. ${totalSubtotal}\n` +
      (isTandoAllahyar ? `• Discount (Tando Allahyar): -Rs. ${totalDiscount}\n` : '') +
      `*• TOTAL PAYABLE: Rs. ${finalTotal}*\n\n` +
      (formData.paymentMethod === 'Cash on Delivery' 
        ? `_I will pay for my order upon delivery._`
        : `_I am sending the payment screenshot following this message._`);

    try {
      const whatsappUrl = `${SOCIAL_LINKS.whatsapp}&text=${encodeURIComponent(messageText)}`;
      
      // Save data before redirecting
      const currentOrderData = { ...formData, items: itemCalculations };
      setSubmittedData(currentOrderData);
      localStorage.setItem('mango_last_order', JSON.stringify(currentOrderData));
      
      // Reset form and UI state
      clearCart();
      setFormState('success');

      // Attempt to open in a new tab first, fallback to current window
      const win = window.open(whatsappUrl, '_blank');
      if (!win || win.closed || typeof win.closed === 'undefined') {
        window.location.assign(whatsappUrl);
      }

    } catch (error) {
      console.error("WhatsApp redirect error:", error);
      setFormState('success');
    }
  };

  const backToProductButton = (
    <button 
      onClick={onBack}
      className="mb-8 flex items-center gap-2 text-slate-600 hover:text-brand-accent transition-colors font-black text-[10px] uppercase tracking-widest group"
    >
      <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
      <span>Back to Product</span>
    </button>
  );

  if (formState === 'success' && submittedData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-start bg-slate-50/50 p-4 pt-12 pb-12 md:pt-20 md:pb-20">
        <div className="max-w-xl w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-12 lg:p-16 rounded-[40px] shadow-2xl shadow-brand-accent/5 text-center border border-slate-100 flex flex-col items-center"
          >
            <div className="w-20 h-20 bg-brand-accent text-mango-brand rounded-full flex items-center justify-center mb-8 shadow-xl relative overflow-hidden">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 10, stiffness: 100 }}
              >
                <Check size={40} strokeWidth={4} />
              </motion.div>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-infinite-night uppercase mb-3 tracking-tight">Order Successfully Submitted!</h2>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-8">We've received your request on WhatsApp</p>

            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 mb-10 text-left space-y-4 w-full">
              <div className="flex justify-between items-center text-sm border-b border-slate-200 pb-3">
                <span className="font-black text-slate-400 uppercase tracking-widest text-[10px]">Order Details</span>
                <span className="font-black text-brand-accent uppercase tracking-widest text-[10px]">Processing</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-bold text-slate-500">Customer:</span>
                <span className="font-black text-slate-900">{submittedData.fullName}</span>
              </div>
              
              <div className="space-y-3 pt-2">
                {submittedData.items?.map((item: any, idx: number) => (
                  <div key={idx} className="bg-white/50 p-3 rounded-xl border border-slate-100">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-black text-xs text-slate-900">{item.product.name}</span>
                      <span className="font-black text-xs text-mango-dark">Rs. {item.subtotal}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{item.size} × {item.quantity} Box(es)</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center text-base pt-3 border-t border-slate-200">
                <span className="font-black text-slate-900 uppercase tracking-widest text-xs">Total Amount:</span>
                <span className="font-black text-mango-dark">Rs. {submittedData.items?.reduce((acc: number, curr: any) => acc + curr.total, 0)}</span>
              </div>
            </div>

            <p className="text-slate-600 mb-10 text-base leading-relaxed font-bold">
              Thank you for trusting <span className="text-brand-accent font-black">Aam Wala</span>.<br />
              {submittedData.paymentMethod === 'Cash on Delivery' 
                ? 'Your order has been successfully placed. We will contact you shortly for confirmation.'
                : 'We are verifying your payment and will contact you shortly to confirm your delivery details.'}
            </p>

            <div className="flex flex-col gap-4 w-full">
              <a 
                href={`${SOCIAL_LINKS.whatsapp}&text=${encodeURIComponent(
                  `*ORDER RE-CONFIRMATION (AAM WALA)*\n\n` +
                  `*Name:* ${submittedData.fullName}\n` +
                  `*Phone:* ${submittedData.phone}\n` +
                  `*Summary:* ${submittedData.items?.map((i: any) => `${i.product.name} (${i.size}x${i.quantity})`).join(', ')}\n` +
                  `*Total:* Rs. ${submittedData.items?.reduce((acc: number, curr: any) => acc + curr.total, 0)}\n\n` +
                  `_I am confirming my order again as the previous redirect might have been interrupted._`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full px-10 py-5 bg-[#25D366] text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#25D366] transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3 text-center no-underline"
              >
                <Phone size={20} />
                Confirm on WhatsApp
              </a>
              <button 
                onClick={() => {
                  localStorage.removeItem('mango_last_order');
                  if (onContinueShopping) onContinueShopping();
                  else onBack();
                }}
                className="w-full px-10 py-5 bg-mango-brand text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-mango-dark hover:text-brand-accent transition-all shadow-lg active:scale-95 flex items-center justify-center gap-3"
              >
                <Package size={20} />
                Continue Shopping
              </button>
              <p className="mt-4 text-[11px] md:text-xs text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">
                If you were unable to send the WhatsApp message due to any technical issue, you can click on “Confirm on WhatsApp” again to resend your message and confirm your order. If your message has been sent successfully, please click on “Continue Shopping.” Thank you.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white pb-16 lg:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {backToProductButton}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
              
              {/* Step 1: Your Details */}
              <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-slate-200 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 sm:p-8">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white shadow-sm rounded-2xl flex items-center justify-center text-black font-black text-lg sm:text-xl border border-slate-100">1</div>
                  </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10 pr-12 sm:pr-0">
                  <div className="p-3 bg-brand-accent/10 rounded-2xl text-brand-accent w-fit">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-infinite-night uppercase tracking-tight leading-none mb-1">Your Details</h3>
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Where should we send your mangoes?</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Full Name</label>
                    <input 
                      required 
                      type="text" 
                      value={formData.fullName}
                      onChange={e => setFormData({...formData, fullName: e.target.value})}
                      placeholder="e.g. Muhammad Ali" 
                      className="w-full p-4 bg-white shadow-sm border border-slate-200 rounded-2xl focus:ring-4 focus:ring-brand-accent/10 focus:border-brand-accent outline-none font-bold text-sm transition-all text-slate-900" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Phone Number</label>
                    <input 
                      required 
                      type="tel" 
                      value={formData.phone}
                      onChange={e => {
                        const numericValue = e.target.value.replace(/\D/g, '');
                        if (numericValue.length <= 11) {
                          setFormData({...formData, phone: numericValue});
                        }
                      }}
                      placeholder="03001234567" 
                      maxLength={11}
                      pattern="[0-9]*"
                      className="w-full p-4 bg-white shadow-sm border border-slate-200 rounded-2xl focus:ring-4 focus:ring-brand-accent/10 focus:border-brand-accent outline-none font-bold text-sm transition-all text-slate-900" 
                    />
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Home Address</label>
                  <textarea 
                    required 
                    rows={2} 
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    placeholder="Tell us your street name, house number, and area..." 
                    className="w-full p-4 bg-white shadow-sm border border-slate-200 rounded-2xl focus:ring-4 focus:ring-brand-accent/10 focus:border-brand-accent outline-none font-bold text-sm transition-all resize-none text-slate-900"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">City</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.city}
                    onChange={e => setFormData({...formData, city: e.target.value})}
                    placeholder="e.g. Karachi, Lahore..." 
                    className="w-full p-4 bg-white shadow-sm border border-slate-200 rounded-2xl focus:ring-4 focus:ring-brand-accent/10 focus:border-brand-accent outline-none font-bold text-sm transition-all text-slate-900" 
                  />
                  <p className="text-[9px] text-slate-600 font-bold px-1 italic leading-relaxed mt-1 mb-6">
                    Write <span className="text-blue-600 font-black">Tando Allahyar</span> like this, get Cash on Delivery and a special discount.<br />
                    This special offer is only for customers in <span className="text-blue-600 font-black">Tando Allahyar</span> City.
                  </p>
                </div>
              </div>

              {/* Step 2: Your Selected Mangoes */}
              <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-slate-200 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-4 sm:p-8">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white shadow-sm rounded-2xl flex items-center justify-center text-black font-black text-lg sm:text-xl border border-slate-100">2</div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10 pr-12 sm:pr-0">
                  <div className="p-3 bg-brand-accent/10 rounded-2xl text-brand-accent w-fit">
                    <Package size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-infinite-night uppercase tracking-tight leading-none mb-1">Your Selected Mangoes</h3>
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">Review your order items</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {localOrderItems.length === 0 ? (
                    <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                      <p className="text-sm font-bold text-slate-500">Your cart is empty. Please select some mangoes.</p>
                      <button onClick={onBack} className="mt-4 text-xs font-black text-brand-accent uppercase tracking-widest">Browse Mangoes</button>
                    </div>
                  ) : (
                    localOrderItems.map((item, idx) => (
                      <div key={idx} className="p-6 bg-slate-50 rounded-[28px] border border-slate-200 shadow-sm space-y-6">
                        <div className="flex items-center gap-4">
                          <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-cover rounded-xl shadow-sm border border-slate-200" />
                          <div>
                            <p className="text-[10px] font-black text-brand-accent uppercase tracking-widest mb-0.5">{item.product.type}</p>
                            <p className="text-base font-black text-slate-900">{item.product.name}</p>
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6 pt-4 border-t border-slate-200/60">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Box Weight</label>
                            <select 
                              required
                              value={item.size}
                              onChange={e => updateItem(idx, { size: e.target.value as BoxSize })}
                              className="w-full p-4 bg-white shadow-sm border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:border-brand-accent transition-all cursor-pointer text-slate-900"
                            >
                              <option value="">Select weight</option>
                              <option value="5kg">5 KG Box</option>
                              <option value="8kg">8 KG Box</option>
                              <option value="10kg">10 KG Box</option>
                            </select>
                          </div>

                          <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-600 uppercase tracking-widest ml-1">Quantity</label>
                            <div className="flex items-center gap-3">
                              <button 
                                type="button"
                                onClick={() => updateItem(idx, { quantity: Math.max(1, item.quantity - 1) })}
                                className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 font-bold hover:bg-slate-50 transition-colors shadow-sm"
                              >-</button>
                              <div className="flex-1 text-center p-3.5 bg-white border border-slate-200 rounded-xl font-black text-slate-900 text-sm shadow-sm min-w-[60px]">
                                {item.quantity} Box(es)
                              </div>
                              <button 
                                type="button"
                                onClick={() => updateItem(idx, { quantity: item.quantity + 1 })}
                                className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 font-bold hover:bg-slate-50 transition-colors shadow-sm"
                              >+</button>
                            </div>
                          </div>
                        </div>

                        {(localOrderItems.length > 1 || (isTandoAllahyar && item.size)) && (
                          <div className="flex justify-between items-center pt-4 border-t border-slate-200/60">
                             {localOrderItems.length > 1 && (
                               <div>
                                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Item Total</p>
                                  <p className="text-sm font-black text-slate-900">Rs. {itemCalculations[idx].subtotal}</p>
                               </div>
                             )}
                             {isTandoAllahyar && item.size && (
                                <div className="text-right">
                                   <p className="text-[9px] font-black text-success/70 uppercase tracking-widest mb-0.5">City Discount</p>
                                   <p className="text-sm font-black text-success">-Rs. {itemCalculations[idx].discount}</p>
                                </div>
                             )}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Step 3: Payment Method */}
              <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-sm border border-slate-200 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 sm:p-8">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white shadow-sm rounded-2xl flex items-center justify-center text-black font-black text-lg sm:text-xl border border-slate-100">3</div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-10 pr-12 sm:pr-0">
                  <div className="p-3 bg-brand-accent/10 rounded-2xl text-brand-accent w-fit font-bold">
                    <Wallet size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-infinite-night uppercase tracking-tight leading-none mb-1">Payment Method</h3>
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">How would you like to pay?</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                  {availableMethods.map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setFormData({...formData, paymentMethod: method})}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 font-black text-[10px] uppercase tracking-widest ${
                        formData.paymentMethod === method 
                          ? 'border-brand-accent bg-brand-accent/5 text-slate-900' 
                          : 'border-slate-200 hover:border-slate-300 text-slate-600'
                      }`}
                    >
                      <div className={`p-2 rounded-lg ${formData.paymentMethod === method ? 'bg-brand-accent text-slate-900' : 'bg-slate-100 text-slate-600'}`}>
                        {method === 'Cash on Delivery' ? <Truck size={16} /> : <Wallet size={16} />}
                      </div>
                      <span className="text-center leading-tight">{method}</span>
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  <motion.div 
                    key={formData.paymentMethod}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white shadow-sm p-6 rounded-2xl border border-slate-200"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 bg-white rounded-lg border border-slate-200">
                        {formData.paymentMethod === 'Cash on Delivery' ? <Truck size={16} className="text-blue-500" /> : <Info size={16} className="text-brand-accent" />}
                      </div>
                      <div className="flex-1">
                        {formData.paymentMethod === 'Cash on Delivery' ? (
                          <div className="space-y-1">
                            <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Cash on Delivery</p>
                            <p className="text-sm font-black text-slate-900">Pay Rs. {finalTotal} when your order arrives</p>
                            <p className="text-xs font-bold text-slate-500 italic">Only for Tando Allahyar.</p>
                          </div>
                        ) : (
                          <>
                            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-3">Copy details for {formData.paymentMethod}</p>
                            
                            {formData.paymentMethod === 'Bank Transfer' && (
                              <div className="space-y-1">
                                <p className="text-sm font-black text-slate-900">Bank: {PAYMENT_ACCOUNTS['Bank Transfer'].bank}</p>
                                <p className="text-sm font-bold text-slate-600">Title: {PAYMENT_ACCOUNTS['Bank Transfer'].title}</p>
                                <p className="text-sm font-bold text-slate-600">Acc#: {PAYMENT_ACCOUNTS['Bank Transfer'].account}</p>
                                <p className="text-[10px] text-slate-600 break-all">IBAN: {PAYMENT_ACCOUNTS['Bank Transfer'].iban}</p>
                              </div>
                            )}

                            {formData.paymentMethod === 'JazzCash' && (
                              <div className="space-y-1">
                                <p className="text-sm font-black text-slate-900">Title: {PAYMENT_ACCOUNTS['JazzCash'].title}</p>
                                <p className="text-lg font-black text-mango-dark">{PAYMENT_ACCOUNTS['JazzCash'].number}</p>
                                <p className="text-[10px] text-slate-600 break-all">IBAN: {PAYMENT_ACCOUNTS['JazzCash'].iban}</p>
                              </div>
                            )}

                            {formData.paymentMethod === 'Easypaisa' && (
                              <div className="space-y-1">
                                <p className="text-sm font-black text-slate-900">Title: {PAYMENT_ACCOUNTS['Easypaisa'].title}</p>
                                <p className="text-lg font-black text-mango-dark">{PAYMENT_ACCOUNTS['Easypaisa'].number}</p>
                                <p className="text-[10px] text-slate-600 break-all">IBAN: {PAYMENT_ACCOUNTS['Easypaisa'].iban}</p>
                              </div>
                            )}

                            {formData.paymentMethod === 'Raast' && (
                              <div className="space-y-1">
                                <p className="text-sm font-black text-slate-900 uppercase">Raast ID (Mobile)</p>
                                <p className="text-sm font-bold text-slate-600">Title: {PAYMENT_ACCOUNTS['Raast'].title}</p>
                                <p className="text-lg font-black text-mango-dark">{PAYMENT_ACCOUNTS['Raast'].number}</p>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {formData.paymentMethod !== 'Cash on Delivery' && (
                  <div className="mt-6 flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-2xl">
                     <ShieldCheck className="text-amber-500 shrink-0 mt-0.5" size={18} />
                     <p className="text-[11px] text-amber-700 font-bold leading-relaxed">
                       <span className="font-black uppercase">Note:</span> After paying, please send a picture of the receipt to our WhatsApp. If a fake or invalid payment slip is submitted, the order will be rejected.
                     </p>
                  </div>
                )}
              </div>

            </form>
          </div>

          {/* Sidebar: Final Total */}
          <div className="lg:col-span-1">
            <div className="sticky top-40 space-y-6">
              <div className="bg-white rounded-[32px] p-8 text-slate-900 shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-mango-brand/5 rounded-full blur-[60px] -mr-16 -mt-16" />
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-2 bg-slate-100 rounded-xl">
                      <Calculator size={20} className="text-mango-brand" />
                    </div>
                    <h4 className="text-lg font-black uppercase tracking-tighter">Order Summary</h4>
                  </div>

                  <div className="space-y-4 mb-8">
                     <div className="border-b border-slate-200 pb-4 space-y-4">
                        {itemCalculations.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-start">
                             <div className="flex-1 pr-4">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-0.5">{item.product.name}</p>
                                <p className="text-[11px] font-bold text-slate-500">{item.size || 'Size not selected'} × {item.quantity} Box(es)</p>
                             </div>
                             <div className="text-right">
                                <p className="text-sm font-black">{item.size ? `Rs. ${item.subtotal}` : '---'}</p>
                             </div>
                          </div>
                        ))}
                     </div>

                     <div className="flex justify-between items-center text-slate-600">
                        <p className="text-[10px] font-black uppercase tracking-widest">Subtotal</p>
                        <p className="text-sm font-black text-slate-900">Rs. {totalSubtotal}</p>
                     </div>

                     {isTandoAllahyar && totalDiscount > 0 && (
                       <div className="flex justify-between items-center text-success">
                          <div className="flex items-center gap-2">
                             <CheckCircle2 size={12} />
                             <p className="text-[10px] font-black uppercase tracking-widest text-success/80">City Discount</p>
                          </div>
                          <p className="text-sm font-black">-Rs. {totalDiscount}</p>
                       </div>
                     )}

                     <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                        <p className="text-sm font-black uppercase tracking-widest text-slate-600">Final Total</p>
                        <p className="text-2xl font-black text-brand-accent">Rs. {finalTotal}</p>
                     </div>
                  </div>

                  {isTandoAllahyar && (
                     <div className="mb-8 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center gap-3">
                        <Truck size={18} className="text-blue-400" />
                        <p className="text-[10px] text-blue-300 font-bold uppercase">Cash on Delivery is available!</p>
                     </div>
                  )}

                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={
                      formState === 'sending' || 
                      !formData.fullName || 
                      !formData.phone || 
                      !formData.address || 
                      !formData.city || 
                      localOrderItems.length === 0 || 
                      localOrderItems.some(item => !item.size)
                    }
                    className="w-full py-5 bg-[#25D366] text-white rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center space-x-3 hover:bg-[#25D366] transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:grayscale"
                  >
                    {formState === 'sending' ? (
                      <span>Loading WhatsApp...</span>
                    ) : (
                      <>
                        <Phone size={18} />
                        <span>Confirm on WhatsApp</span>
                      </>
                    )}
                  </button>
                  
                  <p className="text-[9px] text-slate-500 text-center font-bold uppercase tracking-tighter mt-4">
                    {formData.paymentMethod === 'Cash on Delivery' 
                      ? 'Please send your order details on WhatsApp for confirmation.' 
                      : 'Please send your order details and payment slip on WhatsApp for confirmation.'}
                  </p>
                </div>
              </div>

              {/* Policy cards in sidebar */}
              <div className="space-y-4">
                <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
                  <ShieldCheck className="text-brand-accent shrink-0" size={20} />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-1">Payment Info</p>
                    <p className="text-[11px] font-bold text-slate-600 leading-tight">Please pay in advance for all cities except <span className="text-blue-600 font-black">Tando Allahyar</span>.</p>
                  </div>
                </div>
                <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4">
                  <MapPin className="text-brand-accent shrink-0" size={20} />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-1">Cash on Delivery</p>
                    <p className="text-[11px] font-bold text-slate-600 leading-tight">Cash on Delivery is only available in <span className="text-blue-600 font-black">Tando Allahyar</span>.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
