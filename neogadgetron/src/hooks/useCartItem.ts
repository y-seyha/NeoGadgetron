import { CartItemContext } from "@/context/CartItemContext";
import { useContext } from "react";

// Custom hook to use the context
export const useCartItem = () => {
  const context = useContext(CartItemContext);
  if (!context) {
    throw new Error("useCartItem must be used within a CartItemProvider");
  }
  return context;
};
