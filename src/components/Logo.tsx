import React from 'react';
import { useUser } from '../UserContext';

interface LogoProps {
  className?: string;
  onNavigate?: (page: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', onNavigate }: LogoProps) {
  return (
    <div 
      className={`flex items-center gap-1.5 sm:gap-2 cursor-pointer group ${className}`} 
      onClick={() => onNavigate?.('home')}
    >
      {/* Premium Mango Icon with dynamic sizing */}
      <div className="flex-shrink-0 w-9 h-9 sm:w-12 sm:h-12 lg:w-15 lg:h-15 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative">
        <img 
          src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg7AWCrfbDfY3GQH5w1pFeVZpwIiUNOdI9tqh1DhKdSmq5UEJ6TOL89FQdon6NL9d3U2gSklTKt4Ekl5zgIbHYi9qmAoy16guZEqTwtlqh55hEhN6_Cal_MCSRBF-u90yifYe5sYc9dryId_qE5rIQQZWBqA36cYO9AiksLTpd5DZ3kmEz-lByhvNGp0C8/s800-rw/fresh-mango-fruit-healthy.png" 
          alt="Fresh premium mangoes online order Pakistan Tando Allahyar" 
          width={240}
          height={240}
          className="w-full h-full object-contain drop-shadow-[0_8px_15px_rgba(255,193,7,0.4)] brightness-110"
        />
        <div className="absolute inset-0 bg-brand-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
      </div>

      {/* Luxury Typography with dynamic sizing */}
      <div className="flex flex-col">
        <span className="text-[17px] sm:text-[26px] lg:text-[30px] font-black text-white uppercase tracking-tight leading-none font-sans">
          AAM WALA
        </span>
        <span className="text-[9px] sm:text-[12px] lg:text-[12px] font-medium text-brand-accent uppercase tracking-[0.3em] lg:tracking-[0.4em] leading-none mt-0.5 sm:mt-1 font-sans">
          ONLINE STORE
        </span>
      </div>
    </div>
  );
}
