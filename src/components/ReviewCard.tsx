import React, { useState, useRef, useEffect } from 'react';
import { Star, Camera, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Review } from '../ReviewContext';

interface ReviewCardProps {
  review: Review;
  onImageClick: (image: string) => void;
  key?: string | number;
}

export function ReviewCard({ review, onImageClick }: ReviewCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpansion, setNeedsExpansion] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  const hasImages = review.images && review.images.length > 0;
  const maxLines = hasImages ? 3 : 4;

  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseInt(getComputedStyle(textRef.current).lineHeight);
      const height = textRef.current.scrollHeight;
      const lines = Math.round(height / lineHeight);
      if (lines > maxLines) {
        setNeedsExpansion(true);
      }
    }
  }, [review.message, maxLines]);

  const visibleImages = review.images?.slice(0, 5) || [];
  const remainingImagesCount = (review.images?.length || 0) - 5;

  return (
    <div 
      className={`bg-brand-primary rounded-xl border border-white/10 shadow-lg hover:shadow-xl transition-shadow flex flex-col p-5 ${
        hasImages ? 'min-h-[250px] md:min-h-[300px]' : 'min-h-[150px] md:min-h-[200px]'
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-brand-accent font-bold uppercase border border-white/5">
            {review.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-bold text-white text-sm leading-none tracking-tight">{review.name}</h4>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={10} 
                    fill={i < review.rating ? '#FFB800' : 'none'} 
                    className={i < review.rating ? 'text-[#FFB800]' : 'text-white/10'} 
                  />
                ))}
              </div>
              <span className="text-[9px] text-white/40 font-bold uppercase tracking-widest">{review.date}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="flex-1 relative overflow-hidden">
        <p 
          ref={textRef}
          className={`text-white/80 text-sm leading-relaxed font-medium ${!isExpanded ? `line-clamp-${maxLines}` : ''}`}
          style={{ 
            display: !isExpanded ? '-webkit-box' : 'block',
            WebkitLineClamp: !isExpanded ? maxLines : 'unset',
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {review.message}
        </p>
        
        {needsExpansion && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-brand-accent text-[10px] font-black uppercase tracking-widest mt-2 flex items-center gap-1 hover:text-white transition-colors"
          >
            {isExpanded ? (
              <>Show Less <ChevronUp size={12} /></>
            ) : (
              <>Show More <ChevronDown size={12} /></>
            )}
          </button>
        )}
      </div>

      {/* Images Section */}
      {hasImages && (
        <div className="mt-4 flex flex-wrap gap-2">
          {visibleImages.map((img, idx) => (
            <div 
              key={idx}
              className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden cursor-pointer border border-white/10 group"
              onClick={() => onImageClick(img)}
            >
              <img 
                src={img} 
                alt={`Review ${idx + 1}`} 
                width={64}
                height={64}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
              {idx === 4 && remainingImagesCount > 0 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-xs font-black uppercase tracking-tighter">
                  +{remainingImagesCount}
                </div>
              )}
              {idx < 4 && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
        <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">
          {review.productName}
        </span>
        <span className="flex items-center gap-1 text-[9px] font-black text-brand-accent uppercase tracking-widest">
          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" />
          </svg>
          Verified
        </span>
      </div>
    </div>
  );
}
