/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Truck, ShieldCheck, Zap, Star } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: <Truck className="text-brand-accent" size={24} />,
      title: "FREE DELIVERY",
      description: "Get your mangoes delivered anywhere in Pakistan without paying any shipping fees."
    },
    {
      icon: <ShieldCheck className="text-brand-accent" size={24} />,
      title: "SAFE BOXES",
      description: "We use strong packing to make sure your fruit stays fresh and safe during travel."
    },
    {
      icon: <Zap className="text-brand-accent" size={24} />,
      title: "FAST SHIPPING",
      description: "We pack and send your order very quickly so the fruit reaches you perfectly fresh."
    },
    {
      icon: <Star className="text-brand-accent" size={24} />,
      title: "BEST QUALITY",
      description: "We only pick the best, hand-selected mangoes for our special boxes."
    }
  ];

  return (
    <section id="delivery" className="py-16 border-y border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4 items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm transition-all hover:border-brand-accent/50 group">
              <div className="p-4 bg-brand-accent/10 rounded-2xl border border-brand-accent/10 flex-shrink-0 transition-transform group-hover:scale-110">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-[10px] font-black text-slate-900 tracking-[0.15em] mb-1 uppercase">{feature.title}</h3>
                <p className="text-[10px] text-slate-600 font-bold leading-tight uppercase opacity-70 group-hover:opacity-100 transition-opacity">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
