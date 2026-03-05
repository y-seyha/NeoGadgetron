import { useEffect, useState, type ReactNode } from "react";
import { CartItemContext, type CartItem } from "./CartItemContext";
import axios from "axios";

// Provider
export const CartItemProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const fetchCartItems = async () => {
    try {
      const res = await axios.get<CartItem[]>(
        "http://localhost:3000/api/v1/cart-items",
        { withCredentials: true },
      );
      setCartItems(res.data);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
  };

  const addToCart = (item: CartItem) => {
    setCartItems((prev) => [...prev, item]);
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const totalPrice = Array.isArray(cartItems)
    ? cartItems.reduce(
        (acc, item) => acc + parseFloat(item.product_price) * item.quantity,
        0,
      )
    : 0;

  const totalQuantity = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => acc + item.quantity, 0)
    : 0;

  // Corrected useEffect
  useEffect(() => {
    const loadCart = async () => {
      await fetchCartItems();
    };
    loadCart();
  }, []);

  useEffect(() => {
    console.log("Cart items updated:", cartItems);
  }, [cartItems]);

  return (
    <CartItemContext.Provider
      value={{
        cartItems,
        totalPrice,
        totalQuantity,
        addToCart,
        removeFromCart,
        updateQuantity,
        fetchCartItems,
      }}
    >
      {children}
    </CartItemContext.Provider>
  );
};
