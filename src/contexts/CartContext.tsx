import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import LoginPromptDialog from '@/components/LoginPromptDialog';
import { useNavigate, useLocation } from 'react-router-dom'; // ✅ Fixed

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const scrollToLogin = () => {
  const loginSection = document.getElementById('login');
  if (loginSection) {
    loginSection.scrollIntoView({ behavior: 'smooth' });
  }
};

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [pendingItems, setPendingItems] = useState<CartItem[]>([]);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Restore pending items after login
  React.useEffect(() => {
    if (isLoggedIn && pendingItems.length > 0) {
      setItems(prev => {
        const newItems = [...prev];
        pendingItems.forEach(pendingItem => {
          const existingItem = newItems.find(item => item.id === pendingItem.id);
          if (existingItem) {
            existingItem.quantity += pendingItem.quantity;
          } else {
            newItems.push(pendingItem);
          }
        });
        return newItems;
      });
      setPendingItems([]);
    }
  }, [isLoggedIn, pendingItems]);

  const addToCart = (newItem: Omit<CartItem, 'quantity'>) => {
    if (!isLoggedIn) {
      // Store pending item to be added after login
      setPendingItems(prev => {
        const existingItem = prev.find(item => item.id === newItem.id);
        if (existingItem) {
          return prev.map(item =>
            item.id === newItem.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { ...newItem, quantity: 1 }];
      });
      setShowLoginPrompt(true);
      return;
    }

    setItems(prev => {
      const existingItem = prev.find(item => item.id === newItem.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotalPrice,
      getTotalItems,
      clearCart
    }}>
      {children}
      <LoginPromptDialog
        isOpen={showLoginPrompt}
        onClose={() => setShowLoginPrompt(false)}
        onLoginClick={scrollToLogin}
      />
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
