import { SOCIAL_LINKS } from '../types';

export function getWhatsAppLink(message?: string) {
  const base = SOCIAL_LINKS.whatsapp;
  const text = message || "Hello, I visited Aam Wala Online Store and I want to order mangoes. Please guide me.";
  
  return `${base}&text=${encodeURIComponent(text)}`;
}

export function getCallLink() {
  return `tel:${SOCIAL_LINKS.phone.replace(/[^0-9+]/g, '')}`;
}
