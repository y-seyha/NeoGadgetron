import type { CartItem } from "@/types";

export function getInitials(name: string) {
  if (!name) return "";
  const words = name.trim().split(" ");
  if (words.length === 1) return words[0][0].toUpperCase();
  return words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase();
}

const CART_KEY = "cart_items";

export const getCartItems = () => {
  const data = localStorage.getItem(CART_KEY);
  if (!data) return [];

  return JSON.parse(data);
};

export const setCartItems = (items: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};

export const formatCurrency = (amount: number, currency = "USD") => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};
