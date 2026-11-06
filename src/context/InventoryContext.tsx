import React, { createContext, useContext, useState } from 'react';
import fridgeData from '../mockData/fridge.json';
import wholesaleData from '../mockData/wholesale.json';
import meetupsData from '../mockData/meetups.json';

export interface InventoryItem {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  image: string;
  size: string;
  flavorProfile?: string[];
  description?: string;
  qty?: string | number;
  use3dModel?: boolean;
  isFeatured?: boolean;
  isPremium?: boolean;
}

export interface MeetupItem {
  id: number;
  name?: string;
  title?: string;
  date: string;
  time?: string;
  location?: string;
  description?: string;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category?: string;
  size?: string;
  quantity: number;
}

interface InventoryContextType {
  fridge: InventoryItem[];
  wholesale: InventoryItem[];
  meetups: MeetupItem[];
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  setFridge: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  setWholesale: React.Dispatch<React.SetStateAction<InventoryItem[]>>;
  setMeetups: React.Dispatch<React.SetStateAction<MeetupItem[]>>;
  addToCart: (item: { id: number; name: string; price: number; image: string; category?: string; size?: string }, qty?: number) => void;
  removeFromCart: (id: number) => void;
  updateCartQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

export const InventoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fridge, setFridge] = useState<InventoryItem[]>(fridgeData as InventoryItem[]);
  const [wholesale, setWholesale] = useState<InventoryItem[]>(wholesaleData as InventoryItem[]);
  const [meetups, setMeetups] = useState<MeetupItem[]>(meetupsData as MeetupItem[]);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (
    item: { id: number; name: string; price: number; image: string; category?: string; size?: string },
    qty = 1
  ) => {
    const numericPrice =
      typeof item.price === 'number'
        ? item.price
        : Number(String(item.price).replace(/[^0-9.]/g, '')) || 20;

    setCart((prev) => {
      const existingIndex = prev.findIndex((ci) => ci.id === item.id && ci.name === item.name);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty,
        };
        return updated;
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: numericPrice,
          image: item.image,
          category: item.category || 'Spirits',
          size: item.size || 'Standard',
          quantity: qty,
        },
      ];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((ci) => ci.id !== id));
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((ci) => (ci.id === id ? { ...ci, quantity } : ci))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <InventoryContext.Provider
      value={{
        fridge,
        wholesale,
        meetups,
        cart,
        cartCount,
        cartSubtotal,
        setFridge,
        setWholesale,
        setMeetups,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (!context) throw new Error('useInventory must be used within an InventoryProvider');
  return context;
};
