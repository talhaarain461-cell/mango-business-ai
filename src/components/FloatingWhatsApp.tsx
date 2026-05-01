/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WhatsAppIcon } from './icons/WhatsAppIcon';
import { getWhatsAppLink } from '../lib/whatsapp';

export function FloatingWhatsApp() {
  return (
    <div className="fixed bottom-8 right-8 z-50 group">
      <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-all duration-300">
        <div className="bg-white text-slate-900 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-md whitespace-nowrap border border-slate-200">
          Chat for Support & Orders
        </div>
      </div>
      
      <a
        href={getWhatsAppLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-[0_20px_50px_rgba(15,23,42,0.3)] hover:scale-110 active:scale-90 transition-all duration-300 relative group-hover:rotate-12 border-2 border-white/20"
        aria-label="Contact on WhatsApp"
      >
        <WhatsAppIcon size={32} />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-accent rounded-full border-2 border-mango-brand animate-pulse" />
      </a>
    </div>
  );
}
