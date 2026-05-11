import React, { createContext, useContext, useState } from 'react';
import { MangoProduct, BoxSize } from './types';

export interface CartItem {
  product: MangoProduct;
  size: BoxSize;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: MangoProduct, size?: BoxSize, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
    isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: MangoProduct, size: BoxSize = '5kg', quantity: number = 1) => {
    setCart(prev => {
         // Deduplicate solely by product.id as per user request to avoid duplicate varieties
              const existingIndex = prev.findIndex(item => item.product.id === product.id);
      
      if (existingIndex !== -1) {
        const newCart = [...prev];
        newCart[existingIndex] = {
          ...newCart[existingIndex],
          quantity: newCart[existingIndex].quantity + quantity
        };
        return newCart;
      }
      return [...prev, { product, size, quantity }];
    });
    // Automatically open the cart drawer when an item is added
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems, isCartOpen, setIsCartOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
