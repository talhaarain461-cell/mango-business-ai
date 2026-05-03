import React, { useState } from 'react';
import { useReviews } from '../ReviewContext';
import { Star, MessageSquare, ChevronDown, Camera, Upload, X, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { MANGO_PRODUCTS } from '../types';
import { ReviewCard } from './ReviewCard';
import { ReviewModal } from './ReviewModal';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase';

interface ReviewsProps {
  hideForm?: boolean;
  limit?: number;
  onViewMore?: () => void;
  productId?: string; // Optional: filter by product
}

export function Reviews({ hideForm = false, limit = 3, onViewMore, productId }: ReviewsProps) {
  const { reviews, addReview, getReviewsByProduct, loading } = useReviews();
  const [showFormOnHome, setShowFormOnHome] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedReviewImage, setSelectedReviewImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredReviews = productId ? getReviewsByProduct(productId) : reviews;
  const displayReviews = filteredReviews.slice(0, limit);

  const [newReview, setNewReview] = useState<{
    name: string;
    rating: number;
    message: string;
    date: string;
    productId: string;
    images: string[];
  }>({ name: '', rating: 5, message: '', date: '', productId: productId || '', images: [] });
  
  const [productError, setProductError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const todayDateStr = new Date().toISOString().split('T')[0];

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newReview.productId || !newReview.name) {
      if (!newReview.productId) setProductError("Please select a product before submitting your review.");
      return;
    }
    setProductError(null);

    const selectedDate = newReview.date ? new Date(newReview.date) : new Date();
    const maxYear = 2050;
    
    if (newReview.date && (newReview.date < todayDateStr || selectedDate.getFullYear() > maxYear)) {
        return;
    }

    const selectedProduct = MANGO_PRODUCTS.find(p => p.id === newReview.productId);
    if (!selectedProduct) return;

    setIsUploading(true);
    try {
      await addReview({
        productId: selectedProduct.id,
        productName: selectedProduct.name,
        name: newReview.name || 'Customer',
        rating: newReview.rating,
        message: newReview.message || '',
        date: selectedDate.toLocaleDateString(),
        images: newReview.images
      });
      setNewReview({ name: '', rating: 5, message: '', date: '', productId: productId || '', images: [] });
      setSubmitSuccess(true);
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to submit review:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    if (files.length === 0) return;

    setImageError(null);
    for (const file of files) {
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        setImageError(`Format not supported: ${file.name}. Only JPG and PNG are allowed.`);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setImageError(`File too large: ${file.name}. Max size is 5MB per image.`);
        return;
      }
    }

    setIsUploading(true);
    
    try {
      const uploadPromises = files.map(async (file) => {
        const fileRef = ref(storage, `reviews/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(fileRef, file);
        return await getDownloadURL(snapshot.ref);
      });

      const urls = await Promise.all(uploadPromises);
      setNewReview(prev => ({ 
        ...prev, 
        images: [...prev.images, ...urls] 
      }));
    } catch (error) {
      console.error("Upload error:", error);
      setImageError("Failed to upload some images. Please check your connection.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setNewReview(prev => ({ 
      ...prev, 
      images: prev.images.filter((_, i) => i !== index) 
    }));
    setImageError(null);
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % Math.max(1, displayReviews.length));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + displayReviews.length) % Math.max(1, displayReviews.length));
  };

  return (
    <div className={`py-16 md:py-24 ${hideForm ? 'bg-slate-50/30' : 'bg-slate-50/50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 uppercase tracking-tight mb-4">
            Customer <span className="text-brand-accent">Stories</span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto font-bold uppercase tracking-widest text-[10px] md:text-xs">
            Authentic experiences from our mango lovers
          </p>
          <div className="w-16 h-1 bg-brand-accent mx-auto mt-6 rounded-full" />
          
          {hideForm && (
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => setShowFormOnHome(!showFormOnHome)}
                className="px-8 py-3 bg-white text-slate-900 border border-slate-200 rounded-full font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
              >
                <MessageSquare size={16} className="text-brand-accent" />
                {showFormOnHome ? 'Close Form' : 'Write a Review'}
              </button>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-3 bg-slate-900 text-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all shadow-md"
              >
                See All Reviews ({filteredReviews.length})
              </button>
            </div>
          )}
        </div>

        {/* Review Form */}
        <AnimatePresence>
          {(!hideForm || showFormOnHome) && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-16"
            >
              <div className="bg-white border border-slate-100 p-6 sm:p-10 rounded-3xl shadow-xl max-w-3xl mx-auto">
                <h4 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tight text-center">
                  Share Your Experience
                </h4>
                <form onSubmit={handleReviewSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {!productId && (
                      <div className="md:col-span-1">
                        <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Select Mango Variant*</label>
                        <div className="relative">
                          <select
                            required
                            value={newReview.productId}
                            onChange={e => {
                              setNewReview({ ...newReview, productId: e.target.value });
                              if (e.target.value) setProductError(null);
                            }}
                            className={`w-full p-4 pr-12 bg-slate-50 border ${productError ? 'border-red-500' : 'border-slate-100'} rounded-2xl focus:border-brand-accent outline-none transition-all text-slate-700 appearance-none font-bold text-xs uppercase tracking-tight`}
                          >
                            <option value="">Select Product</option>
                            {MANGO_PRODUCTS.filter(p => p.status === 'Available' || p.status === 'In Stock').map(product => (
                              <option key={product.id} value={product.id}>
                                {product.name}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={18} />
                        </div>
                      </div>
                    )}
                    <div className={productId ? 'md:col-span-2' : 'md:col-span-1'}>
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Your Name*</label>
                      <input 
                        type="text" 
                        required
                        value={newReview.name}
                        onChange={e => setNewReview({...newReview, name: e.target.value})}
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-brand-accent outline-none transition-all font-bold text-xs uppercase tracking-tight"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Rating*</label>
                      <div className="flex gap-2 p-4 bg-slate-50 border border-slate-100 rounded-2xl items-center h-[54px] justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setHoveredStar(star)}
                            onMouseLeave={() => setHoveredStar(null)}
                            onClick={() => setNewReview({...newReview, rating: star})}
                            className="focus:outline-none transition-transform hover:scale-110"
                          >
                            <Star 
                              size={20} 
                              fill={star <= (hoveredStar ?? newReview.rating) ? '#FFB800' : 'none'} 
                              className={star <= (hoveredStar ?? newReview.rating) ? 'text-[#FFB800]' : 'text-slate-200'} 
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Review Date</label>
                      <input 
                        type="date" 
                        max={todayDateStr}
                        value={newReview.date}
                        onChange={e => setNewReview({...newReview, date: e.target.value})}
                        className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:border-brand-accent outline-none transition-all text-slate-700 font-bold text-xs"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Your Thoughts</label>
                    <textarea 
                      value={newReview.message}
                      onChange={e => setNewReview({...newReview, message: e.target.value})}
                      className="w-full p-5 bg-slate-50 border border-slate-100 rounded-3xl focus:border-brand-accent outline-none transition-all resize-none h-32 font-medium text-sm"
                      placeholder="How was the taste, freshness, and delivery?"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-4">Add Photos (Max 2MB/each)</label>
                    <div className="flex flex-wrap gap-4 items-start">
                      <label className="flex flex-col items-center justify-center w-24 h-24 border-2 border-dashed border-slate-100 rounded-2xl cursor-pointer hover:border-brand-accent hover:bg-brand-accent/5 transition-all group relative overflow-hidden shrink-0">
                        <div className="flex flex-col items-center justify-center">
                          <Upload className="w-6 h-6 text-slate-300 group-hover:text-brand-accent mb-2" />
                          <p className="text-[8px] font-black uppercase text-slate-400 group-hover:text-brand-accent">Upload</p>
                        </div>
                        <input 
                          type="file" 
                          className="hidden" 
                          accept="image/png, image/jpeg, image/jpg"
                          multiple
                          onChange={handleImageUpload}
                        />
                        {isUploading && (
                          <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
                          </div>
                        )}
                      </label>

                      {newReview.images.map((img, index) => (
                        <div key={index} className="relative w-24 h-24 group shrink-0">
                          <img 
                            src={img} 
                            alt={`Preview ${index + 1}`} 
                            width={96}
                            height={96}
                            className="w-full h-full object-cover rounded-2xl border border-slate-100"
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                          />
                          <button 
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                          >
                            <X size={12} strokeWidth={3} />
                          </button>
                        </div>
                      ))}
                    </div>
                    {imageError && (
                      <p className="text-red-500 text-[10px] font-bold mt-3 uppercase tracking-wider">{imageError}</p>
                    )}
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit"
                      disabled={isUploading}
                      className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-800 transition-all shadow-md active:scale-[0.98] disabled:opacity-50"
                    >
                      {isUploading ? 'Uploading...' : 'Submit Review'}
                    </button>
                    {submitSuccess && (
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-green-600 font-bold text-[10px] uppercase tracking-widest text-center mt-4"
                      >
                        Thanks for your review! It means a lot.
                      </motion.p>
                    )}
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews List */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 size={40} className="text-brand-accent animate-spin mb-4" />
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Loading reviews...</p>
          </div>
        ) : filteredReviews.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm max-w-xl mx-auto">
            <MessageSquare size={40} className="mx-auto mb-4 text-slate-200" />
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No reviews yet. Be the first!</p>
          </div>
        ) : (
          <div className="relative">
            {/* Grid for desktop, Slider for mobile/homepage behavior */}
            <div className={`grid gap-6 ${
              hideForm ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
            }`}>
              {displayReviews.map((review) => (
                <ReviewCard 
                  key={review.id} 
                  review={review} 
                  onImageClick={setSelectedReviewImage} 
                />
              ))}
            </div>

            {/* View More System */}
            {filteredReviews.length > displayReviews.length && (
              <div className="text-center mt-12">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-12 py-4 bg-white border border-slate-200 text-slate-900 rounded-full font-black uppercase tracking-widest text-xs hover:bg-slate-50 transition-all shadow-sm active:scale-95"
                >
                  View More Reviews ({filteredReviews.length - displayReviews.length}+)
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Persistence Modal */}
      <ReviewModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        reviews={filteredReviews}
        onImageClick={setSelectedReviewImage}
        title={productId ? `Reviews for ${MANGO_PRODUCTS.find(p => p.id === productId)?.name}` : "All Customer Stories"}
      />

      {/* Unified Lightbox */}
      <AnimatePresence>
        {selectedReviewImage && (
          <Lightbox 
            image={selectedReviewImage} 
            onClose={() => setSelectedReviewImage(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Lightbox({ image, onClose }: { image: string; onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-md"
      onClick={onClose}
    >
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-[110]"
      >
        <X size={24} />
      </button>
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center"
        onClick={e => e.stopPropagation()}
      >
        <img 
          src={image} 
          alt="Full size review" 
          width={1200}
          height={800}
          className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      </motion.div>
    </motion.div>
  );
}

