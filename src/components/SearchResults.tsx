import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { MANGO_PRODUCTS } from '../types';
import { ShoppingCart, Eye, ArrowLeft, Star } from 'lucide-react';
import { MangoProduct } from '../types';
import { useReviews } from '../ReviewContext';

interface SearchResultsProps {
  onNavigate: (target: string) => void;
  onBuyNow: (product: MangoProduct) => void;
  onViewDetails: (product: MangoProduct) => void;
}

export function SearchResults({ onNavigate, onBuyNow, onViewDetails }: SearchResultsProps) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { getProductRating } = useReviews();

  const searchResults = MANGO_PRODUCTS.filter(product => 
    product.name.toLowerCase().includes(query.toLowerCase()) || 
    product.type.toLowerCase().includes(query.toLowerCase()) ||
    product.description.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section className="py-8 lg:py-12 bg-transparent min-h-[40vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-12">
          <button 
            onClick={() => onNavigate('home')} 
            className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 className="text-3xl font-black text-infinite-night uppercase tracking-tight">Search Results</h1>
            <p className="text-sm font-bold text-slate-600 mt-1">Showing results for "{query}"</p>
          </div>
        </div>

        {searchResults.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-2">No products found</h2>
            <p className="text-slate-600">We couldn't find any products matching your search.</p>
            <button 
              onClick={() => onNavigate('home')}
              className="mt-6 px-6 py-3 bg-mango-brand text-white font-black uppercase tracking-widest rounded-xl hover:bg-mango-dark hover:text-brand-accent transition-all active:scale-95 shadow-lg"
            >
              Back to Store
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 xl:gap-10">
            {searchResults.map((product) => (
              <div key={product.id} className="group flex flex-col bg-white border border-slate-200 rounded-[2rem] overflow-hidden hover:border-mango-brand/30 transition-all duration-500 hover:-translate-y-2 shadow-md">
                <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-slate-100 cursor-pointer" onClick={() => onViewDetails(product)}>
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out rounded-[2rem]"
                      loading="eager"
                      decoding="async"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold uppercase tracking-widest text-sm bg-slate-100">Img</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent opacity-60" />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest border border-slate-200">
                      {product.type}
                    </span>
                    {/* Removed non-existent badge check */}
                  </div>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="mb-4 cursor-pointer" onClick={() => onViewDetails(product)}>
                    <h3 className="text-xl md:text-2xl font-black text-infinite-night mb-1 leading-tight group-hover:text-brand-accent transition-colors">{product.name}</h3>
                    
                    {/* Product Rating */}
                    {(() => {
                      const { average, count } = getProductRating(product.id);
                      return (
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                size={12} 
                                fill={star <= Math.round(average) ? 'currentColor' : 'none'} 
                                className={star <= Math.round(average) ? 'text-brand-accent' : 'text-slate-200'} 
                              />
                            ))}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-black text-slate-900">{average > 0 ? average.toFixed(1) : '0.0'}</span>
                            <span className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">({count} Reviews)</span>
                          </div>
                        </div>
                      );
                    })()}
                    
                    <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">{product.description}</p>
                  </div>
                  
                  <div className="mt-auto pt-6 border-t border-slate-200 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Price</span>
                      <div className="flex items-center gap-2">
                        {['sindhri', 'langra', 'chaunsa'].includes(product.id) ? (
                          typeof product.price8kg === 'number' && typeof product.price10kg === 'number' ? (
                            <span className="text-xl font-black text-slate-950">
                              Rs {product.price8kg} - {product.price10kg}
                            </span>
                          ) : (
                            <span className="text-rose-600 font-black text-xs sm:text-sm bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100">N/A</span>
                          )
                        ) : (
                          typeof product.price5kg === 'number' && typeof product.price10kg === 'number' ? (
                            <span className="text-xl font-black text-brand-accent">
                              Rs {product.price5kg} - {product.price10kg}
                            </span>
                          ) : (
                            <span className="text-rose-600 font-black text-xs sm:text-sm bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100">N/A</span>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-6">
                    <button 
                      onClick={() => onViewDetails(product)}
                      className="flex-1 px-4 py-3 bg-white text-brand-primary border border-brand-primary/10 hover:bg-brand-accent hover:text-brand-primary text-xs font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Eye size={14} />
                      <span>Details</span>
                    </button>
                    <button 
                      onClick={() => onBuyNow(product)}
                      disabled={product.id === 'saroli'}
                      className="flex-1 px-4 py-3 bg-brand-primary text-white hover:bg-brand-accent hover:text-brand-primary text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale"
                    >
                      <ShoppingCart size={14} />
                      <span>Buy</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
