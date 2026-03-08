import type { CartItem, Product } from "@/types";
import { createContext } from "react";

type CartContextType = {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQty: (productId: number, qty: number) => void;
  clearCart: () => void;
  totalQuantity: number; // new
  totalPrice: number; // new
};

export const CartContext = createContext<CartContextType | null>(null);
