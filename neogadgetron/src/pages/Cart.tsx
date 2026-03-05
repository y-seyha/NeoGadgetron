import React from "react";
import { useCartItem } from "../hooks/useCartItem";

const Cart: React.FC = () => {
  const { cartItems, totalPrice, totalQuantity } = useCartItem();

  // Ensure cartItems is an array before mapping
  const items = Array.isArray(cartItems) ? cartItems : [];

  return (
    <div>
      <h1>Your Cart ({totalQuantity} items)</h1>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.product_name} - ${item.product_price} × {item.quantity}
          </li>
        ))}
      </ul>
      <h2>Total: ${totalPrice.toFixed(2)}</h2>
    </div>
  );
};

export default Cart;
