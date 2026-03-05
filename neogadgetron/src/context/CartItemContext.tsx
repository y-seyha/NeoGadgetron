import { createContext } from "react";

// Type definition for Cart Item
export interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  created_at: string;
  product_name: string;
  product_price: string;
  product_image: string | null;
}

interface CartItemContextType {
  cartItems: CartItem[];
  totalPrice: number;
  totalQuantity: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  fetchCartItems: () => Promise<void>;
}

// Create the context
export const CartItemContext = createContext<CartItemContextType | undefined>(
  undefined,
);

