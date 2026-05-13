/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Routes, Route, useNavigate, useLocation, useParams, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { Ticker } from './components/Ticker';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { ProductDetails } from './components/ProductDetails';
import { RelatedProducts } from './components/RelatedProducts';
import { Checkout } from './components/Checkout';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { FeaturedProduct } from './components/FeaturedProduct';
import { useCart } from './CartContext';
import { SearchResults } from './components/SearchResults';
import { BlogList } from './components/BlogList';
import { BlogDetail } from './components/BlogDetail';
import { Policy } from './components/Policy';
import { CartDrawer } from './components/CartDrawer';
import { ScrollToTop } from './components/ScrollToTop';
import { PremiumFeatures } from './components/PremiumFeatures';
import { Reviews } from './components/Reviews';
import { MangoProduct, MANGO_PRODUCTS, BoxSize } from './types';

function ProductPageWrapper({ onBack, onBuyNow, onViewDetails }: { onBack: () => void, onBuyNow: (p: MangoProduct, s?: BoxSize, q?: number) => void, onViewDetails: (p: MangoProduct) => void }) {
  const { id } = useParams();
  const product = MANGO_PRODUCTS.find(p => p.id === id);

  if (!product) {
    return (
      <div className="py-24 text-center min-h-[60vh] flex flex-col items-center justify-center bg-transparent">
        <p className="text-slate-500 font-bold mb-4">Product not found. Please browse our catalog.</p>
        <button 
          onClick={onBack}
          className="px-8 py-3 bg-mango-brand text-white rounded-xl font-black uppercase tracking-widest hover:bg-mango-dark hover:text-brand-accent transition-all shadow-lg active:scale-95"
        >
          Go to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col" key={product.id}>
      <ProductDetails 
        product={product} 
        onBack={onBack} 
        onBuyNow={onBuyNow}
      />
      <RelatedProducts 
        currentProductId={product.id} 
        onBuyNow={onBuyNow}
        onViewDetails={onViewDetails}
      />
    </div>
  );
}

export default function App() {
  const { isCartOpen, setIsCartOpen } = useCart();
  const [selectedProduct, setSelectedProduct] = React.useState<MangoProduct | null>(null);
  const [selectedSize, setSelectedSize] = React.useState<BoxSize | undefined>(undefined);
  const [selectedQuantity, setSelectedQuantity] = React.useState<number>(1);
  const [activeCategory, setActiveCategory] = React.useState<'mangoes' | 'bulk'>('mangoes');

  const navigate = useNavigate();
  const location = useLocation();

  // Preload all product images instantly
  React.useEffect(() => {
    const preloadImages = () => {
      // Preload product images
      MANGO_PRODUCTS.forEach(product => {
        const img = new Image();
        img.src = product.image;
        if (product.gallery) {
          product.gallery.forEach(url => {
            const galleryImg = new Image();
            galleryImg.src = url;
          });
        }
      });

      // Preload Hero images (from Hero.tsx SLIDES)
      const heroImages = [
        "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&q=80&w=1920",
        "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&q=80&w=1920",
        "https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&q=80&w=1920",
        "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=1920"
      ];
      heroImages.forEach(url => {
        const img = new Image();
        img.src = url;
      });
    };

    // Use requestIdleCallback if available, otherwise just run it
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(preloadImages);
    } else {
      setTimeout(preloadImages, 1000);
    }
  }, []);

  const handleNavigate = (target: string) => {
    // Always close drawer upon navigation to any destination
    setIsCartOpen(false);

    if (target === 'cart') {
      setIsCartOpen(true);
      return;
    }

    const routes: Record<string, string> = {
      'home': '/',
      'shop': '/shop',
      'bulk': '/shop?category=bulk',
      'about': '/about',
      'contact': '/contact',
      'faq': '/faq',
      'support': '/support',
      'delivery-policy': '/delivery-policy',
      'return-policy': '/return-policy',
      'privacy-policy': '/privacy-policy',
      'terms': '/terms',
      'blog': '/blog',
      'reviews': '/reviews',
      'checkout': '/checkout'
    };

    const path = routes[target] || (target.startsWith('/') ? target : '/');
    
    // React router navigation
    navigate(path);

    // If it's a bulk target, we'll handle the category transition
    if (target === 'bulk') {
      setActiveCategory('bulk');
    } else if (target === 'shop') {
      setActiveCategory('mangoes');
    }
  };

  const handleBuyNow = (product: MangoProduct, size?: BoxSize, quantity?: number) => {
    setSelectedProduct(product);
    setSelectedSize(size);
    setSelectedQuantity(quantity || 1);
    navigate('/checkout');
  };

  const handleViewDetails = (product: MangoProduct) => {
    navigate(`/product/${product.id}`);
  };

  const handleBackToShop = () => {
    navigate('/shop');
  };

  const handleBackToProduct = () => {
    if (selectedProduct) {
      navigate(-1);
    } else {
      navigate('/shop');
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans selection:bg-brand-accent/30 selection:text-slate-900 overflow-x-hidden">
      <ScrollToTop />
      <Header onNavigate={handleNavigate} onProductClick={handleViewDetails} />
      <main className="relative">
        <AnimatePresence mode="wait">
          <motion.div 
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Routes location={location}>
              <Route path="/" element={
                <div className="flex flex-col">
                  <Hero onNavigate={handleNavigate} />
                  <Ticker />
                  <FeaturedProduct 
                    onBuyNow={handleBuyNow} 
                    onViewDetails={handleViewDetails} 
                  />
                  <ProductGrid 
                    onBuyNow={handleBuyNow} 
                    onViewDetails={handleViewDetails} 
                    onNavigate={handleNavigate}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                  />
                  <PremiumFeatures onNavigate={handleNavigate} />
                  <About />
                  <Reviews hideForm={true} limit={4} onViewMore={() => handleNavigate('reviews')} />
                </div>
              } />
              
              <Route path="/shop" element={
                <div className="pt-28 sm:pt-32 lg:pt-36 flex flex-col">
                <FeaturedProduct 
                  onBuyNow={handleBuyNow} 
                  onViewDetails={handleViewDetails} 
                />
                  <ProductGrid 
                    onBuyNow={handleBuyNow} 
                    onViewDetails={handleViewDetails} 
                    onNavigate={handleNavigate}
                    activeCategory={activeCategory}
                    setActiveCategory={setActiveCategory}
                  />
                </div>
              } />

              <Route path="/product/:id" element={
                <div className="pt-28 sm:pt-32 lg:pt-36 min-h-[80vh]">
                  <ProductPageWrapper 
                    onBack={handleBackToShop} 
                    onBuyNow={handleBuyNow} 
                    onViewDetails={handleViewDetails} 
                  />
                </div>
              } />
              
              <Route path="/product" element={<Navigate to="/shop" replace />} />
              <Route path="/product/" element={<Navigate to="/shop" replace />} />

              <Route path="/checkout" element={
                <div className="pt-28 sm:pt-32 lg:pt-36 min-h-[80vh]">
                  <Checkout 
                    preSelectedProduct={selectedProduct?.id} 
                    preSelectedSize={selectedSize}
                    preSelectedQuantity={selectedQuantity}
                    onBack={handleBackToProduct} 
                    onContinueShopping={() => handleNavigate('home')}
                  />
                </div>
              } />

              <Route path="/search" element={
                <div className="pt-28 sm:pt-32 lg:pt-36 flex flex-col">
                  <SearchResults 
                    onNavigate={handleNavigate}
                    onBuyNow={handleBuyNow}
                    onViewDetails={handleViewDetails}
                  />
                  <ProductGrid 
                    onBuyNow={handleBuyNow} 
                    onViewDetails={handleViewDetails} 
                    onNavigate={handleNavigate}
                    activeCategory="mangoes"
                    setActiveCategory={setActiveCategory}
                    hideBulk
                  />
                </div>
              } />

              <Route path="/reviews" element={
                <div className="pt-28 sm:pt-36 lg:pt-40 min-h-[80vh]">
                  <Reviews />
                </div>
              } />

              <Route path="/blog" element={
                <div className="pt-28 sm:pt-32 lg:pt-36 flex flex-col">
                  <BlogList onNavigate={handleNavigate} />
                  <ProductGrid 
                    onBuyNow={handleBuyNow} 
                    onViewDetails={handleViewDetails} 
                    onNavigate={handleNavigate}
                    activeCategory="mangoes"
                    setActiveCategory={setActiveCategory}
                    hideBulk
                  />
                </div>
              } />

              <Route path="/blog/:slug" element={
                <div className="pt-28 sm:pt-32 lg:pt-36 flex flex-col">
                  <BlogDetail onNavigate={handleNavigate} />
                  <ProductGrid 
                    onBuyNow={handleBuyNow} 
                    onViewDetails={handleViewDetails} 
                    onNavigate={handleNavigate}
                    activeCategory="mangoes"
                    setActiveCategory={setActiveCategory}
                    hideBulk
                  />
                </div>
              } />

              <Route path="/delivery-policy" element={
                <div className="pt-28 sm:pt-32 lg:pt-36 min-h-[80vh]">
                  <Policy policyId="delivery-policy" />
                </div>
              } />

              <Route path="/return-policy" element={
                <div className="pt-28 sm:pt-32 lg:pt-36 min-h-[80vh]">
                  <Policy policyId="return-policy" />
                </div>
              } />

              <Route path="/privacy-policy" element={
                <div className="pt-28 sm:pt-32 lg:pt-36 min-h-[80vh]">
                  <Policy policyId="privacy-policy" />
                </div>
              } />

              <Route path="/terms" element={
                <div className="pt-28 sm:pt-32 lg:pt-36 min-h-[80vh]">
                  <Policy policyId="terms" />
                </div>
              } />

              <Route path="/faq" element={
                <div className="pt-28 sm:pt-32 lg:pt-36 min-h-[80vh]">
                  <FAQ />
                </div>
              } />

              <Route path="/about" element={
                <div className="pt-28 sm:pt-32 lg:pt-36 min-h-[80vh]">
                  <About />
                </div>
              } />

              <Route path="/contact" element={
                <div className="pt-28 sm:pt-32 lg:pt-36 min-h-[80vh]">
                  <Contact />
                </div>
              } />

              <Route path="/support" element={
                <div className="pt-28 sm:pt-32 lg:pt-36 min-h-[80vh]">
                  <Contact />
                </div>
              } />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer onNavigate={handleNavigate} />
      {location.pathname === '/' && <FloatingWhatsApp />}
      <CartDrawer 
        onCheckout={() => handleNavigate('checkout')}
        onStartShopping={() => handleNavigate('shop')}
      />
    </div>
  );
}
