import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import noImg from "@/assets/noimg.webp";
import type { Product } from "@/types";
import { useCart } from "@/hooks/useCart";
import axios from "axios";

interface ProductCardProps {
  product: Product;
  onToggleFavorite?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onToggleFavorite,
}) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/cart-items",
        {
          product_id: product.id,
          quantity: 1,
        },
        { withCredentials: true },
      );

      const cartItemFromBackend = response.data; 

      addToCart({
        id: cartItemFromBackend.id, 
        cartId: cartItemFromBackend.cart_id,
        productId: cartItemFromBackend.product_id,
        quantity: cartItemFromBackend.quantity,
        name: product.name,
        price: Number(product.price),
        image: product.image_url || "",
      });
      setAdded(true);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };
  return (
    <Card className="hover:shadow-lg hover:scale-105 transition-transform duration-300">
      <CardContent className="flex flex-col p-4">
        {/* Image + Heart */}
        <div className="relative w-full h-48">
          <img
            src={product.image_url || noImg}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
          <button
            onClick={() => onToggleFavorite && onToggleFavorite(product)}
            className="absolute top-2 right-2 bg-white/80 rounded-full p-1 shadow hover:bg-white transition"
          >
            <Heart className="h-5 w-5 text-red-500" />
          </button>
          {added && (
            <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-lg shadow-lg">
              Added
            </span>
          )}
        </div>

        {/* Product Name */}
        <h3 className="mt-3 font-semibold text-lg">{product.name}</h3>

        {/* Category */}
        {product.category_name && (
          <div className="mt-1 inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
            {product.category_name}
          </div>
        )}

        {/* Description */}
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        {/* Spacer to push price & button to bottom */}
        <div className="flex-1" />

        {/* Price + Add to Cart */}
        <div className="mt-4 flex items-center justify-between">
          {/* Price */}
          <div>
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="font-bold text-lg">${product.price}</p>
          </div>

          {/* Add to Cart button */}
          {product.stock > 0 ? (
            <Button className="ml-4" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          ) : (
            <Button className="ml-4" disabled>
              Out of Stock
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
