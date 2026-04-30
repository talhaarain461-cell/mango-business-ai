/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Phone, ArrowUp, Send, Facebook, Instagram, Music2, MapPin } from 'lucide-react';
import { SOCIAL_LINKS } from '../types';
import { Logo } from './Logo';
import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { useUser } from '../UserContext';
import { getWhatsAppLink, getCallLink } from '../lib/whatsapp';

interface FooterProps {
  onNavigate: (target: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const { userData } = useUser();
  
  return (
    <footer className="bg-brand-primary pt-16 pb-8 text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 border-b border-white/10 pb-12">
          
          {/* Brand & About */}
          <div className="col-span-1">
             <Logo onNavigate={onNavigate} className="mb-8" />
              <p className="text-sm text-white/70 leading-relaxed mb-8 font-medium italic">
                “Delivering the rich, authentic taste of Sindh’s finest mangoes straight to your doorstep with premium care.”
              </p>
              
              <h4 className="text-sm font-bold text-white mb-4">Follow Us</h4>
              <div className="flex gap-2">
                <a href="https://www.facebook.com/share/1P366h4wni/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-[#1877F2] text-white rounded-md shadow-md hover:scale-110 transform transition-all duration-200">
                  <Facebook size={14} fill="white" />
                </a>
                <a href="https://www.instagram.com/aamwalapk?igsh=MTdiOTZjODIzdm52ZQ==" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-gradient-to-tr from-[#FFB000] via-[#FF0069] to-[#8000FF] text-white rounded-md shadow-md hover:scale-110 transform transition-all duration-200">
                  <Instagram size={14} />
                </a>
                <a href="https://www.tiktok.com/@aam.wala?_r=1&_t=ZS-95c0yvCUDTU" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center bg-black text-white rounded-md shadow-md hover:scale-110 transform transition-all duration-200">
                  <Music2 size={14} />
                </a>
              </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-3">
              <li><button onClick={() => onNavigate('home')} className="text-sm font-medium text-white/80 hover:text-brand-accent transition-colors block text-left">Home</button></li>
              <li><button onClick={() => onNavigate('shop')} className="text-sm font-medium text-white/80 hover:text-brand-accent transition-colors block text-left">Shop</button></li>
              <li><button onClick={() => onNavigate('about')} className="text-sm font-medium text-white/80 hover:text-brand-accent transition-colors block text-left">About Us</button></li>
              <li><button onClick={() => onNavigate('blog')} className="text-sm font-medium text-white/80 hover:text-brand-accent transition-colors block text-left">Blog</button></li>
              <li><button onClick={() => onNavigate('faq')} className="text-sm font-medium text-white/80 hover:text-brand-accent transition-colors block text-left">FAQ</button></li>
              <li><button onClick={() => onNavigate('contact')} className="text-sm font-medium text-white/80 hover:text-brand-accent transition-colors block text-left">Contact Us</button></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="col-span-1">
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Customer Support</h4>
            <ul className="space-y-3">
              <li><button onClick={() => onNavigate('delivery-policy')} className="text-sm font-medium text-white/80 hover:text-brand-accent transition-colors block text-left">Delivery Policy</button></li>
              <li><button onClick={() => onNavigate('return-policy')} className="text-sm font-medium text-white/80 hover:text-brand-accent transition-colors block text-left">Return / Refund Policy</button></li>
              <li><button onClick={() => onNavigate('privacy-policy')} className="text-sm font-medium text-white/80 hover:text-brand-accent transition-colors block text-left">Privacy Policy</button></li>
              <li><button onClick={() => onNavigate('terms')} className="text-sm font-medium text-white/80 hover:text-brand-accent transition-colors block text-left">Terms &amp; Conditions</button></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="col-span-1">
            <h4 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-white/80">
                <Send size={16} className="text-white shrink-0 mt-0.5" />
                <a href="mailto:aamwalastore@gmail.com" className="font-medium hover:text-brand-accent transition-colors break-all">aamwalastore@gmail.com</a>
              </li>
              <li className="flex items-start space-x-3 text-sm text-white/80">
                <WhatsAppIcon size={16} className="text-[#25D366] shrink-0 mt-0.5" />
                <a href={getWhatsAppLink(undefined, userData.fullName, userData.phone)} target="_blank" rel="noopener noreferrer" className="font-medium hover:text-brand-accent transition-colors">WhatsApp: {SOCIAL_LINKS.phone}</a>
              </li>
              <li className="flex items-start space-x-3 text-sm text-white/80">
                <Phone size={16} className="text-white shrink-0 mt-0.5" />
                <a href={getCallLink()} className="font-medium hover:text-brand-accent transition-colors">Phone: {SOCIAL_LINKS.phone}</a>
              </li>
              <li className="flex items-start space-x-3 text-sm text-white/80">
                <MapPin size={16} className="text-white shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">Nasarpur Road, District Tando Allahyar, Sindh, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Sub-Footer: Payment Methods & Copyright */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pt-4">
          <div className="flex flex-col items-center lg:items-start gap-4">
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              <span className="text-sm font-bold text-white mr-2 self-center uppercase tracking-wider hidden sm:block">Secure Payments:</span>
              <div className="px-3 py-1.5 bg-white/10 border border-white/10 rounded font-bold text-xs text-white">Bank Transfer</div>
              <div className="px-3 py-1.5 bg-white/10 border border-white/10 rounded font-bold text-xs text-white">Easypaisa</div>
              <div className="px-3 py-1.5 bg-white/10 border border-white/10 rounded font-bold text-xs text-white">JazzCash</div>
              <div className="px-3 py-1.5 bg-white/10 border border-white/10 rounded font-bold text-xs text-white">Raast</div>
            </div>
            <p className="text-xs text-white/70 font-medium text-center lg:text-left max-w-3xl leading-relaxed">
              We offer Cash on Delivery only within Tando Allahyar. For all other cities, please pay in advance before we ship your order.<br />
              For bulk orders or wholesale prices, please message us on WhatsApp for more details and special rates.
            </p>
          </div>

          <div className="flex flex-col items-center lg:items-end gap-1.5 w-full lg:w-auto">
            <p className="text-xs sm:text-[13px] text-white/70 font-medium tracking-tight">
              © 2026 AAM WALA Online Store. All Rights Reserved.
            </p>
            <p className="text-xs sm:text-[13px] text-white/70 font-medium tracking-tight">
              Developed by <a 
                href="https://www.facebook.com/share/1Ay7bEKnrn/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-brand-accent transition-colors"
              >
                MUHAMMAD TALHA
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
