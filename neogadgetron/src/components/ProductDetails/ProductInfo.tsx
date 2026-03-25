import React from "react";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "./QuantitySelector";
import type { Product } from "@/types";


interface ProductInfoProps {
  product: Product;
  quantity: number;
  setQuantity: (qty: number) => void;
  handleAddToCart: () => void;
  added: boolean;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  quantity,
  setQuantity,
  handleAddToCart,
  added,
}) => (
  <div className="space-y-4 sticky top-24">
    <h1 className="text-3xl font-bold">{product.name}</h1>
    <p className="text-2xl font-semibold text-primary">${product.price}</p>
    <p
      className={`font-medium ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}
    >
      {product.stock > 0 ? `✔ In Stock (${product.stock})` : "Out of Stock"}
    </p>
    <p className="text-gray-600">{product.description}</p>

    <QuantitySelector quantity={quantity} onChange={setQuantity} />

    <div className="space-y-2">
      <Button
        className="w-full bg-primary text-white"
        onClick={handleAddToCart}
      >
        {added ? "Added" : "Add to Cart"}
      </Button>
      <Button variant="outline" className="w-full">
        Buy Now
      </Button>
      <Button variant="ghost" className="w-full text-red-500">
        ♡ Add to Wishlist
      </Button>
    </div>
  </div>
);
