/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ShieldCheck, Truck, Star, Heart } from 'lucide-react';

export function About() {
  return (
    <section className="py-16 lg:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Story, Mission, Vision Grid */}
        <div className="grid lg:grid-cols-3 gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative inline-block">
                <h3 className="text-2xl font-black text-infinite-night uppercase tracking-tight">Our Story</h3>
                <div className="w-12 h-1 bg-brand-accent mx-auto mt-2 rounded-full"></div>
              </div>
              <p className="text-slate-600 text-base leading-relaxed font-medium">
                AAM WALA started with a simple promise: to bring the best mangoes from Tando Allahyar straight to your home. We pick them fresh so you can enjoy the real taste of Sindh at your table.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative inline-block">
                <h3 className="text-2xl font-black text-infinite-night uppercase tracking-tight">Our Mission</h3>
                <div className="w-12 h-1 bg-brand-accent mx-auto mt-2 rounded-full"></div>
              </div>
              <p className="text-slate-600 text-base leading-relaxed font-medium">
                We work hard to deliver fresh, clean, and naturally ripened mangoes directly to you. We do not use any chemicals or artificial methods, only carefully hand-picked fruit that is healthy and safe for you and your family.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative inline-block">
                <h3 className="text-2xl font-black text-infinite-night uppercase tracking-tight">Our Vision</h3>
                <div className="w-12 h-1 bg-brand-accent mx-auto mt-2 rounded-full"></div>
              </div>
              <p className="text-slate-600 text-base leading-relaxed font-medium">
                We want to be the brand you trust most for fresh fruit in Pakistan. Our dream is to deliver the "original" mango taste to every house, every season.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Why Choose Us Section */}
        <div className="text-center mb-16">
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-[10px] font-black text-brand-accent uppercase tracking-[0.3em] mb-4">The Aam Wala Difference</p>
            <h2 className="text-4xl md:text-5xl font-black text-infinite-night uppercase tracking-tight mb-4">
              Why <span className="text-brand-accent">Buy From Us</span>
            </h2>
            <div className="w-24 h-1 bg-brand-accent mx-auto mt-4 rounded-full" />
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Quality Check",
              desc: "Every single mango is checked for its size and sweetness before it leaves our farm.",
              icon: Star,
            },
            {
              title: "Direct from Farms",
              desc: "We pick them straight from the tree, so they reach you fresh and full of energy.",
              icon: Heart,
            },
            {
              title: "Safe Packing",
              desc: "Our strong boxes keep the fruit safe and cool while they are travelling to you.",
              icon: ShieldCheck,
            },
            {
              title: "Quick Delivery",
              desc: "We deliver all over Pakistan very fast so you don't have to wait to enjoy your fruit.",
              icon: Truck,
            }
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-accent transition-all text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-brand-accent/10 rounded-2xl flex items-center justify-center mb-6 text-brand-accent">
                  <Icon size={28} />
                </div>
                <h3 className="text-xl font-black text-infinite-night uppercase mb-3 leading-tight">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  );
}
