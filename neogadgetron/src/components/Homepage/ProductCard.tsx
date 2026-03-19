import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import noImg from "@/assets/noimg.webp";
import type { Product } from "@/types";
import { useCart } from "@/hooks/useCart";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (product: Product) => void; 
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
}) => {
  const navigate = useNavigate();
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
      setTimeout(() => setAdded(false), 1500);
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  return (
    <Card
      onClick={() => navigate(`/products/${product.id}`)}
      className="hover:shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
    >
      <CardContent className="flex flex-col p-4">
        {/* Image */}
        <div className="relative w-full h-48">
          <img
            src={product.image_url || noImg}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />

          {/* Favorite Heart */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite(product);
            }}
            className="absolute top-2 right-2 bg-white/80 rounded-full p-1 shadow hover:bg-white transition"
          >
            <Heart
              className={`h-5 w-5 ${isFavorite ? "text-red-500" : "text-gray-400"}`}
            />
          </button>

          {/* Added to cart notification */}
          {added && (
            <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-lg">
              Added
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="mt-3 font-semibold text-lg line-clamp-1">
          {product.name}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        <div className="flex-1" />

        {/* Bottom */}
        <div className="mt-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="font-bold text-lg">${product.price}</p>
          </div>

          {product.stock > 0 ? (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
            >
              Add to Cart
            </Button>
          ) : (
            <Button disabled>Out of Stock</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
