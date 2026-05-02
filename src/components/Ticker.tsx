import React from 'react';

export const Ticker = React.memo(function Ticker() {
   const tickerText = "PREMIUM MANGOES COMING SOON • STAY TUNED • ";
  const repeatedText = tickerText.repeat(8);
  
  return (
    <div className="w-full bg-white border-y border-slate-100 py-3 overflow-hidden whitespace-nowrap flex select-none relative z-10">
      <div className="flex animate-ticker will-change-transform">
        <div className="flex shrink-0">
          <span className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] px-4">
            {repeatedText}
          </span>
        </div>
        <div className="flex shrink-0">
          <span className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] px-4">
            {repeatedText}
          </span>
        </div>
      </div>
    </div>
  );
});
