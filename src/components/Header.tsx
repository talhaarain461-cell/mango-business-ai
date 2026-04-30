/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Phone, ChevronDown, Menu, X, Facebook, Instagram, Music2, Search } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SOCIAL_LINKS, MANGO_PRODUCTS, MangoProduct } from '../types';
import { useCart } from '../CartContext';
import { useUser } from '../UserContext';
import { useReviews } from '../ReviewContext';
import { Logo } from './Logo';
import { Star } from 'lucide-react';
import { getWhatsAppLink, getCallLink } from '../lib/whatsapp';

interface HeaderProps {
  onNavigate: (target: string) => void;
  onProductClick?: (product: MangoProduct) => void;
}

export function Header({ onNavigate, onProductClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShopExpanded, setIsShopExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();
  const { userData } = useUser();
  const { reviews } = useReviews();
  const navigate = useNavigate();
  const location = useLocation();

  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((acc, rev) => acc + rev.rating, 0) / totalReviews).toFixed(1)
    : '0.0';

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const searchResults = searchQuery.trim() !== '' 
    ? MANGO_PRODUCTS.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleMobileNav = (target: string) => {
    onNavigate(target);
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent | React.KeyboardEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navItems = [
    { label: 'Home', target: 'home' },
    { label: 'Shop', target: 'shop' },
    { label: 'Blog', target: 'blog' },
    { label: 'About Us', target: 'about' },
    { label: 'Contact Us', target: 'contact' },
    { label: 'Reviews', target: 'reviews' },
  ];

  return (
    <>
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-br from-mango-brand via-mango-brand to-mango-dark backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all duration-300">
      {/* Top Theme Bar - Welcome Message only */}
      <div className="bg-brand-accent pt-1 pb-1.5 sm:py-1.5 border-b border-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-0 h-auto sm:h-8">
            {/* Centered Welcome Message */}
            <div className="sm:absolute sm:left-1/2 sm:-translate-x-1/2 sm:whitespace-nowrap sm:pt-0">
              <span className="text-[8px] sm:text-[10px] font-black text-black uppercase tracking-[0.2em] sm:tracking-[0.3em] font-sans">
                WELCOME TO AAM WALA ONLINE STORE
              </span>
            </div>

            {/* Right Aligned Social Icons (Desktop/Tablet Only) */}
            <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 sm:ml-auto">
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center bg-[#1877F2] text-white rounded shadow-sm hover:scale-110 transition-all duration-200" title="Facebook">
                <Facebook size={8} className="sm:w-2.5 sm:h-2.5" fill="white" />
              </a>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center bg-gradient-to-tr from-[#FFB000] via-[#FF0069] to-[#8000FF] text-white rounded shadow-sm hover:scale-110 transition-all duration-200" title="Instagram">
                <Instagram size={8} className="sm:w-2.5 sm:h-2.5" />
              </a>
              <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center bg-black text-white rounded shadow-sm hover:scale-110 transition-all duration-200" title="TikTok">
                <Music2 size={8} className="sm:w-2.5 sm:h-2.5" />
              </a>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-18 lg:h-20 px-1">
          {/* Left Side: Logo Section */}
          <Logo onNavigate={handleMobileNav} />

          <nav className="hidden lg:flex items-center space-x-5 xl:space-x-8">
            <button onClick={() => onNavigate('home')} className={`text-[9px] xl:text-[10px] font-black uppercase tracking-[0.15em] transition-all hover:text-brand-accent ${location.pathname === '/' ? 'text-brand-accent' : 'text-white'}`}>Home</button>
            
            {/* Shop Dropdown */}
            <div className="group relative">
              <div 
                onClick={() => onNavigate('shop')}
                className={`flex items-center gap-1 cursor-pointer text-[9px] xl:text-[10px] font-black uppercase tracking-[0.15em] transition-all hover:text-brand-accent ${location.pathname === '/shop' ? 'text-brand-accent' : 'text-white'}`}
              >
                <span>Shop</span>
                <ChevronDown size={10} className="transition-transform group-hover:rotate-180" />
              </div>
              <div className="absolute top-full left-0 pt-4 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 min-w-[200px]">
                <div className="bg-mango-brand border border-white/10 rounded-2xl p-2 shadow-2xl backdrop-blur-xl overflow-hidden">
                  <button 
                    onClick={() => onNavigate('shop')}
                    className="w-full text-left block px-6 py-4 text-[9px] font-black text-white hover:text-brand-accent hover:bg-white/5 rounded-xl uppercase tracking-[0.15em] transition-all"
                  >
                    Catalog
                  </button>
                  <button 
                    onClick={() => onNavigate('bulk')}
                    className="w-full text-left block px-6 py-4 text-[9px] font-black text-white hover:text-brand-accent hover:bg-white/5 rounded-xl uppercase tracking-[0.15em] transition-all"
                  >
                    Buy in Bulk
                  </button>
                </div>
              </div>
            </div>

            <button onClick={() => onNavigate('blog')} className={`text-[9px] xl:text-[10px] font-black uppercase tracking-[0.15em] transition-all hover:text-brand-accent ${location.pathname.startsWith('/blog') ? 'text-brand-accent' : 'text-white'}`}>Blog</button>
            <button onClick={() => onNavigate('about')} className={`text-[9px] xl:text-[10px] font-black uppercase tracking-[0.15em] transition-all hover:text-brand-accent ${location.pathname === '/about' ? 'text-brand-accent' : 'text-white'}`}>About Us</button>
            <button onClick={() => onNavigate('reviews')} className={`flex items-center gap-1.5 text-[9px] xl:text-[10px] font-black uppercase tracking-[0.15em] transition-all hover:text-brand-accent ${location.pathname === '/reviews' ? 'text-brand-accent' : 'text-white'}`}>
              Reviews
              {totalReviews > 0 && (
                <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-brand-accent text-mango-brand text-[8px] font-black rounded-lg shadow-lg transform -translate-y-1 scale-90">
                  <Star size={8} fill="currentColor" />
                  {averageRating}
                </span>
              )}
            </button>
            <button onClick={() => onNavigate('contact')} className={`text-[9px] xl:text-[10px] font-black uppercase tracking-[0.15em] transition-all hover:text-brand-accent ${location.pathname === '/contact' ? 'text-brand-accent' : 'text-white'}`}>Contact Us</button>
          </nav>

          {/* Right Side: Social Media & Action Bar */}
          <div className="flex items-center gap-2 lg:gap-4 xl:gap-6">
            {/* Contact Group (Visible on Desktop Only) */}
            <div className="hidden lg:flex items-center gap-2 sm:gap-3 lg:gap-4 pr-2 sm:pr-4 xl:pr-6 border-r border-white/10">
               <div className="flex flex-col items-end text-right">
                  <span className="text-[6px] sm:text-[8px] font-black text-white/50 uppercase tracking-widest leading-none mb-1">Call Support</span>
                  <a href={getCallLink()} className="text-[7px] sm:text-[10px] xl:text-[11px] font-black text-white hover:text-brand-accent tracking-tight transition-colors whitespace-nowrap">{SOCIAL_LINKS.phone}</a>
               </div>
               <a href={getWhatsAppLink(undefined, userData.fullName, userData.phone)} target="_blank" rel="noopener noreferrer" className="flex items-center p-1 sm:p-1.5 xl:p-2 bg-[#25D366] text-white rounded-lg hover:scale-110 transition-all shadow-lg group" title="WhatsApp Support">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 xl:w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-5.074 4.147-9.206 9.223-9.206 5.076 0 9.209 4.134 9.21 9.206 0 5.074-4.135 9.203-9.21 9.203z"/></svg>
               </a>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-3">
              <button 
                onClick={() => { setIsSearchOpen(!isSearchOpen); setIsMenuOpen(false); }} 
                className={`p-1.5 sm:p-2.5 rounded-xl transition-all border ${isSearchOpen ? 'bg-white text-mango-brand border-white' : 'bg-white/5 text-white border-white/10 hover:bg-white/10'}`}
              >
                <Search size={18} className="sm:w-5 sm:h-5" />
              </button>
              
              <button 
                onClick={() => onNavigate('cart')} 
                className="p-1.5 sm:p-2.5 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-all border border-white/10 relative"
              >
                <ShoppingCart size={18} className="sm:w-5 sm:h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-accent text-mango-brand text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-lg border border-mango-brand/10">{totalItems}</span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button 
                onClick={() => { setIsMenuOpen(!isMenuOpen); setIsSearchOpen(false); }}
                className="lg:hidden p-1.5 sm:p-2.5 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-all border border-white/10"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Action Bar Dropdown */}
        <div className={`absolute top-[75px] sm:top-[85px] left-4 right-4 sm:left-auto sm:right-6 lg:right-8 sm:w-[450px] bg-white border border-slate-200 rounded-3xl p-4 shadow-2xl transition-all duration-300 z-[80] origin-top-right ${isSearchOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible pointer-events-none'}`}>
             <div className="relative">
               <button onClick={handleSearchSubmit} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-mango-brand transition-colors z-10">
                 <Search size={16} />
               </button>
               <input 
                 autoFocus={isSearchOpen}
                 type="text"
                 placeholder="Find your favorite mangoes..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 onKeyDown={(e) => {
                   if (e.key === 'Enter') handleSearchSubmit(e);
                 }}
                 className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pl-12 pr-10 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-mango-brand/20 placeholder:text-slate-400"
               />
               <button onClick={() => setIsSearchOpen(false)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors">
                 <X size={16} />
               </button>
             </div>
             
             {searchQuery.trim() !== '' && (
               <div className="mt-4 flex flex-col gap-2 max-h-[60vh] sm:max-h-[350px] overflow-y-auto custom-scrollbar pr-2">
                  {searchResults.length > 0 ? (
                    searchResults.map(product => (
                      <div 
                        key={product.id}
                        onClick={() => {
                          if (onProductClick) {
                            onProductClick(product);
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }
                        }}
                        className="flex items-center gap-4 p-2 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-100"
                      >
                        {product.image ? (
                          <img src={product.image} alt={product.name} className="w-14 h-14 rounded-xl object-cover bg-slate-100" />
                        ) : (
                          <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 text-[10px] font-bold">Img</div>
                        )}
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-900">{product.name}</span>
                          <span className="text-[10px] font-black text-mango-brand uppercase tracking-widest">{product.type}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-slate-400 text-sm font-medium">
                       No results found for <span className="text-slate-900 font-bold">"{searchQuery}"</span>
                    </div>
                  )}
               </div>
             )}
        </div>
      </div>
    </header>

    {/* Mobile Menu Overlay */}
    <div className={`fixed inset-0 z-[100] transition-all duration-500 lg:hidden ${isMenuOpen ? 'visible' : 'invisible pointer-events-none'}`}>
      
      {/* Background Dimming Overlay */}
      <div 
        className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => setIsMenuOpen(false)}
      />
      
      {/* Side Menu Content Panel */}
      <div className={`absolute top-0 right-0 bottom-0 w-[60vw] max-w-[320px] bg-brand-primary border-l border-white/10 shadow-2xl transition-transform duration-500 ease-out flex flex-col pt-24 px-6 overflow-y-auto ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="absolute top-6 right-6">
          <button onClick={() => setIsMenuOpen(false)} className="p-2 text-white/70 hover:text-white transition-colors bg-white/5 rounded-full hover:bg-white/10">
            <X size={20} />
          </button>
        </div>

        <div className="mb-10 pl-1 text-left">
          <Logo onNavigate={(page) => { handleMobileNav(page as any); setIsMenuOpen(false); }} />
        </div>
        
        <nav className="flex flex-col space-y-1">
          {navItems.map((item) => {
            let isActive = false;
            if (item.target === 'home' && location.pathname === '/') isActive = true;
            else if (item.target === 'shop' && location.pathname === '/shop') isActive = true;
            else if (item.target === 'blog' && location.pathname.startsWith('/blog')) isActive = true;
            else if (item.target === 'about' && location.pathname === '/about') isActive = true;
            else if (item.target === 'contact' && location.pathname === '/contact') isActive = true;
            else if (item.target === 'reviews' && location.pathname === '/reviews') isActive = true;

            const isShop = item.target === 'shop';

            return (
              <div key={item.label}>
                <button
                  onClick={() => isShop ? setIsShopExpanded(!isShopExpanded) : handleMobileNav(item.target)}
                  className={`w-full py-4 px-3 text-left text-base font-bold rounded-xl transition-all flex items-center justify-between group ${isActive ? 'text-brand-accent bg-white/5' : 'text-white hover:text-brand-accent hover:bg-white/5'}`}
                >
                  <div className="flex items-center gap-2">
                    <span>{item.label}</span>
                    {item.target === 'reviews' && totalReviews > 0 && (
                      <span className="flex items-center gap-0.5 px-2 py-0.5 bg-brand-accent text-mango-brand text-[10px] font-black rounded-lg">
                        <Star size={10} fill="currentColor" />
                        {averageRating}
                      </span>
                    )}
                  </div>
                  {isShop ? (
                    <ChevronDown size={16} className={`text-brand-accent transition-transform duration-300 ${isShopExpanded ? 'rotate-180' : ''}`} />
                  ) : (
                    <ChevronDown size={16} className={`-rotate-90 transition-all ${isActive ? 'text-brand-accent opacity-100 translate-x-1' : 'text-brand-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1'}`} />
                  )}
                </button>
                
                {isShop && (
                  <div className={`overflow-hidden transition-all duration-300 ${isShopExpanded ? 'max-h-40 opacity-100 mt-1 mb-2' : 'max-h-0 opacity-0'}`}>
                    <div className="flex flex-col pl-4 space-y-1">
                      <button
                        onClick={() => handleMobileNav('shop')}
                        className="w-full py-3 px-3 text-left text-sm font-medium text-white/70 hover:text-brand-accent hover:bg-white/5 rounded-xl transition-all"
                      >
                        Catalog
                      </button>
                      <button
                        onClick={() => handleMobileNav('bulk')}
                        className="w-full py-3 px-3 text-left text-sm font-medium text-white/70 hover:text-brand-accent hover:bg-white/5 rounded-xl transition-all"
                      >
                        Buy in Bulk
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Social Media Section for Mobile Sidebar */}
        <div className="flex items-center gap-4 px-4 py-8 mt-4 border-t border-white/5">
          <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center bg-[#1877F2] text-white rounded-xl shadow-xl hover:scale-110 transition-all duration-200" title="Facebook">
            <Facebook size={20} fill="white" />
          </a>
          <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center bg-gradient-to-tr from-[#FFB000] via-[#FF0069] to-[#8000FF] text-white rounded-xl shadow-xl hover:scale-110 transition-all duration-200" title="Instagram">
            <Instagram size={20} />
          </a>
          <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center bg-black text-white rounded-xl shadow-xl hover:scale-110 transition-all duration-200" title="TikTok">
            <Music2 size={20} />
          </a>
        </div>
        
        <div className="mt-auto py-8">
          <div className="flex flex-col gap-4 px-3">
             <a href={getCallLink()} className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group">
               <div className="w-10 h-10 rounded-full bg-white/10 border border-white/5 flex items-center justify-center transition-colors shadow-lg">
                 <Phone size={16} className="text-brand-accent" />
               </div>
               <div className="flex flex-col">
                 <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Call Support</span>
                 <span className="text-sm font-bold text-white tracking-tight">{SOCIAL_LINKS.phone}</span>
               </div>
             </a>
             <a href={getWhatsAppLink(undefined, userData.fullName, userData.phone)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group">
               <div className="w-10 h-10 rounded-full bg-[#25D366] border border-white/5 flex items-center justify-center transition-colors shadow-lg">
                 <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-5.074 4.147-9.206 9.223-9.206 5.076 0 9.209 4.134 9.21 9.206 0 5.074-4.135 9.203-9.21 9.203z"/></svg>
               </div>
               <div className="flex flex-col">
                 <span className="text-[10px] font-black uppercase tracking-widest text-white/60">WhatsApp Support</span>
                 <span className="text-sm font-bold text-white tracking-tight">Send a Message</span>
               </div>
             </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
