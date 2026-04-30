import { SOCIAL_LINKS } from '../types';

export function getWhatsAppLink(message?: string, customerName?: string, customerPhone?: string) {
  const base = SOCIAL_LINKS.whatsapp;
  let text = message || "Hello, I visited Aam Wala Online Store and I want to order mangoes. Please guide me.";
  
  if (customerName || customerPhone) {
    text += `\n\n(Customer: ${customerName || 'Unknown'} | Number: ${customerPhone || 'Not provided'})`;
  }
  
  return `${base}?text=${encodeURIComponent(text)}`;
}

export function getCallLink() {
  return `tel:${SOCIAL_LINKS.phone.replace(/[^0-9+]/g, '')}`;
}
