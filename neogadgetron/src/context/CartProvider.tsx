import { getCartItems, setCartItems } from "@/utils/helper";
import { useMemo, useState } from "react";
import { CartContext } from "./CartContext";
import type { CartItem, Product } from "@/types";
import axios from "axios";

type CartProviderProps = {
  children: React.ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>(getCartItems());

  const addToCart = (item: Product | CartItem) => {
    const cartItem: CartItem =
      "productId" in item
        ? item // already a CartItem
        : {
            cartId: item.cart_id || 0,
            productId: item.id,
            name: item.name,
            price: item.price,
            quantity: 1,
            image: item.image_url || "",
          };

    const existing = cart.find((i) => i.productId === cartItem.productId);

    let updated;
    if (existing) {
      updated = cart.map((i) =>
        i.productId === cartItem.productId
          ? { ...i, quantity: i.quantity + 1 }
          : i,
      );
    } else {
      updated = [...cart, cartItem];
    }

    setCart(updated);
    setCartItems(updated);

    console.log("Cart after adding:", updated);
  };

  const updateQty = async (productId: number, qty: number) => {
    try {
      const item = cart.find((i) => i.productId === productId);
      if (!item) return;

      // Update
      await axios.put(
        `http://localhost:3000/api/v1/cart-items/${item.id}`,
        { quantity: qty },
        { withCredentials: true },
      );

      // Update frontend state
      const updated = cart.map((i) =>
        i.productId === productId ? { ...i, quantity: qty } : i,
      );
      setCart(updated);
      setCartItems(updated);
    } catch (err) {
      console.error("Failed to update cart item:", err);
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      const item = cart.find((i) => i.productId === productId);
      if (!item) return;

      // Use cart_item ID, not cartId
      await axios.delete(`http://localhost:3000/api/v1/cart-items/${item.id}`, {
        withCredentials: true,
      });

      // Update frontend state
      const updated = cart.filter((i) => i.productId !== productId);
      setCart(updated);
      setCartItems(updated);
    } catch (err) {
      console.error("Failed to remove cart item:", err);
    }
  };

  const totalQuantity = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart],
  );

  const totalPrice = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart],
  );

  const clearCart = () => {
    setCart([]);
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQty,
        totalQuantity,
        totalPrice,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
