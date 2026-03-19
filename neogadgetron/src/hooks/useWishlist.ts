import { useState, useEffect } from "react";
import type { Product } from "@/types";

export function useWishlist() {
  // load from localStorage on first render
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    if (typeof window === "undefined") return [];
    const stored = localStorage.getItem("wishlist");
    return stored ? JSON.parse(stored) : [];
  });

  // save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  const toggleWishlist = (product: Product) => {
    if (wishlist.find((p) => p.id === product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const isInWishlist = (productId: number) =>
    wishlist.some((p) => p.id === productId);

  return {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
  };
}
