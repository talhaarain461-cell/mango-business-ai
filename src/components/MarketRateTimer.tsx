/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { getWhatsAppLink } from '../lib/whatsapp';
import { MangoProduct } from '../types';
import { getNextMarketRateExpiry, getTimeParts } from '../lib/timer';

interface MarketRateTimerProps {
  product: MangoProduct;
  onExpiryStateChange?: (expired: boolean) => void;
}

export function MarketRateTimer({ product, onExpiryStateChange }: MarketRateTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [expired, setExpired] = useState<boolean>(false);

  // System Details:
  // No timer if Coming Soon, Out of Stock, or NA
  const isApplicable = 
    product.status === 'In Stock' && 
    product.pricePerKg !== 'N/A' && 
    product.pricePerKg !== 'NA';

  useEffect(() => {
    if (!isApplicable) return;

    const calculate = () => {
      const expiry = getNextMarketRateExpiry(product.lastRateUpdate);
      if (!expiry) {
        setExpired(true);
        if (onExpiryStateChange) onExpiryStateChange(true);
        return;
      }

      const now = new Date();
      const diff = expiry.getTime() - now.getTime();
      
      const isNowExpired = diff <= 0;
      setExpired(isNowExpired);
      setTimeLeft(diff > 0 ? diff : 0);
      
      if (onExpiryStateChange) {
        onExpiryStateChange(isNowExpired);
      }
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [product.lastRateUpdate, isApplicable, onExpiryStateChange]);

  if (!isApplicable) return null;
 
  const timeParts = getTimeParts(timeLeft);

  if (expired) {
    return (
      <div className="w-full bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 my-6 overflow-hidden">
        <div className="flex items-start gap-3 sm:gap-4">
          <div className="bg-amber-100 p-2 sm:p-2.5 rounded-xl text-amber-600">
            <AlertTriangle size={20} className="sm:w-6 sm:h-6" />
          </div>
          <div className="flex-1">
            <h4 className="text-amber-900 font-black text-sm uppercase tracking-tight mb-1">
              ⚠ Waiting for New Market Rate
            </h4>
            <p className="text-amber-700 text-xs font-bold leading-relaxed mb-4">
              Today's new price is not updated yet.
            </p>
            
            <div className="pt-4 border-t border-amber-200/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-[10px] text-amber-600/80 font-black uppercase tracking-widest">
                Need help or urgent order?
              </p>
              <a
                href={getWhatsAppLink("Hello, I visited Aam Wala Online Store and I want to order mangoes. Please guide me.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#1da851] transition-all shadow-sm w-fit"
              >
                <WhatsAppIcon size={14} />
                Contact on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-brand-accent/10 p-2 rounded-xl text-brand-accent">
            <Clock size={16} />
          </div>
          <div>
           <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">
            Offer Ends In
            </p>
                      <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <span className="text-xl font-black text-brand-primary font-mono tabular-nums leading-none">
                  {timeParts.h}
                </span>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter mt-1">
                  HRS
                </span>
              </div>
              <span className="text-lg font-black text-slate-300 -mt-4">:</span>
              <div className="flex flex-col items-center">
                <span className="text-xl font-black text-brand-primary font-mono tabular-nums leading-none">
                  {timeParts.m}
                </span>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter mt-1">
                  MIN
                </span>
              </div>
              <span className="text-lg font-black text-slate-300 -mt-4">:</span>
              <div className="flex flex-col items-center">
                <span className="text-xl font-black text-brand-primary font-mono tabular-nums leading-none">
                  {timeParts.s}
                </span>
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter mt-1">
                  SEC
                </span>
              </div>
            </div>
          </div>
        </div>
          <div className="sm:text-right border-t border-slate-200/60 pt-3 sm:pt-0 sm:border-0 flex flex-col sm:items-end">
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
            Next Price Update At
          </p>
          <p className="text-[10px] font-black text-slate-900 uppercase tracking-tight">
            9:00 AM
          </p>
        </div>
      </div>
    </div>
  );
}
