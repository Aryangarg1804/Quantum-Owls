
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export interface CartItem {
  id: string;
  title: string;
  titleHi?: string;
  price: string;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    // Check if there are saved cart items in localStorage
    const savedItems = localStorage.getItem('saheli-cart');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  
  const { toast } = useToast();
  const { translate } = useLanguage();
  
  // Calculate total items count
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  useEffect(() => {
    // Save cart items to localStorage when they change
    localStorage.setItem('saheli-cart', JSON.stringify(items));
  }, [items]);
  
  const addItem = (newItem: CartItem) => {
    setItems(prevItems => {
      // Check if the item already exists in the cart
      const existingItemIndex = prevItems.findIndex(item => item.id === newItem.id);
      
      if (existingItemIndex >= 0) {
        // If item exists, update its quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + newItem.quantity
        };
        return updatedItems;
      } else {
        // If item doesn't exist, add it to the cart
        return [...prevItems, newItem];
      }
    });
    
    toast({
      title: translate("Added to Cart", "कार्ट में जोड़ा गया"),
      description: translate(
        `${newItem.title} has been added to your cart.`,
        `${newItem.titleHi || newItem.title} आपके कार्ट में जोड़ा गया है।`
      ),
    });
  };
  
  const removeItem = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    
    toast({
      title: translate("Removed from Cart", "कार्ट से हटा दिया गया"),
      description: translate(
        "Item has been removed from your cart.",
        "आइटम आपके कार्ट से हटा दिया गया है।"
      ),
    });
  };
  
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };
  
  const clearCart = () => {
    setItems([]);
    toast({
      title: translate("Cart Cleared", "कार्ट साफ़ किया गया"),
      description: translate(
        "All items have been removed from your cart.",
        "सभी आइटम आपके कार्ट से हटा दिए गए हैं।"
      ),
    });
  };
  
  return (
    <CartContext.Provider 
      value={{ 
        items, 
        addItem, 
        removeItem, 
        updateQuantity, 
        clearCart,
        itemCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
