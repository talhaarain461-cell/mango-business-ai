/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Mail, Phone, Headphones, MapPin } from 'lucide-react';
import { SOCIAL_LINKS } from '../types';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { getWhatsAppLink, getCallLink } from '../lib/whatsapp';

export function Contact() {
  
  return (
    <section className="py-16 lg:py-24 border-t border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 text-brand-accent mb-4">
              <Headphones size={24} />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Customer Support</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-infinite-night uppercase tracking-tight mb-6">
              GET IN <span className="text-brand-accent">TOUCH</span>
            </h2>
            <div className="w-24 h-1 bg-brand-accent mx-auto mb-8 rounded-full" />
            <div className="text-slate-600 max-w-2xl mx-auto text-lg font-medium mt-6">
              <p>
                Need help with your order or want to talk about wholesale? Our team is ready to help you quickly.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Call Us Card */}
          <motion.a
            href={getCallLink()}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group block bg-white p-10 rounded-[32px] border border-slate-200 hover:border-brand-accent transition-all text-center flex flex-col items-center shadow-sm"
          >
            <div className="w-16 h-16 bg-brand-accent/5 rounded-2xl flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 transition-transform shadow-sm border border-brand-accent/10">
              <Phone size={32} />
            </div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2">Call Us</h3>
            <p className="text-xl font-black text-brand-accent">{SOCIAL_LINKS.phone.replace('-', '')}</p>
          </motion.a>

          {/* Email Us Card */}
          <motion.a
            href={`mailto:${SOCIAL_LINKS.email}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group block bg-white p-10 rounded-[32px] border border-slate-200 hover:border-brand-accent transition-all text-center flex flex-col items-center shadow-sm"
          >
            <div className="w-16 h-16 bg-brand-accent/5 rounded-2xl flex items-center justify-center text-brand-accent mb-6 group-hover:scale-110 transition-transform shadow-sm border border-brand-accent/10">
              <Mail size={32} />
            </div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2">Email Us</h3>
            <p className="text-xl font-black text-brand-accent break-all">{SOCIAL_LINKS.email}</p>
          </motion.a>

          {/* WhatsApp Card - Highlighted */}
          <motion.a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group block bg-white p-10 rounded-[32px] border-2 border-brand-accent/30 hover:border-brand-accent transition-all text-center flex flex-col items-center shadow-[0_20px_50px_rgba(251,191,36,0.08)] bg-gradient-to-b from-white to-brand-accent/5"
          >
            <div className="w-16 h-16 bg-[#25D366] rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-md ring-4 ring-[#25D366]/20">
              <WhatsAppIcon size={32} />
            </div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2 font-bold">WhatsApp Support</h3>
            <p className="text-2xl font-black text-brand-accent">{SOCIAL_LINKS.phone.replace('-', '')}</p>
          </motion.a>

          {/* Location Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="group block bg-white p-10 rounded-[32px] border border-slate-200 transition-all text-center flex flex-col items-center cursor-default shadow-sm hover:border-mango-brand/20"
          >
            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mb-6 border border-slate-100 shadow-sm">
              <MapPin size={32} />
            </div>
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2">Our Location</h3>
            <p className="text-lg font-bold text-slate-600 leading-tight">Nasarpur Road, District Tando Allahyar, Sindh, Pakistan</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
