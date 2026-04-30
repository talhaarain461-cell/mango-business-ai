import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageSquare } from 'lucide-react';
import { Review } from '../ReviewContext';
import { ReviewCard } from './ReviewCard';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviews: Review[];
  onImageClick: (image: string) => void;
  title?: string;
}

export function ReviewModal({ isOpen, onClose, reviews, onImageClick, title = "All Customer Reviews" }: ReviewModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white w-full max-w-6xl max-h-[90vh] rounded-[24px] shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-5 border-b border-slate-100 bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">{title}</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{reviews.length} total reviews</p>
                </div>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-900"
              >
                <X size={24} />
              </button>
            </div>

            {/* Reviews Grid */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
              {reviews.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <MessageSquare size={48} className="mb-4 opacity-20" />
                  <p className="font-bold uppercase tracking-widest text-sm">No reviews to show</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {reviews.map((review) => (
                    <ReviewCard 
                      key={review.id} 
                      review={review} 
                      onImageClick={onImageClick} 
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-100 bg-white text-center">
              <button 
                onClick={onClose}
                className="px-8 py-3 bg-slate-900 text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all"
              >
                Close Reviews
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
