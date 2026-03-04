import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import banner3 from "@/assets/ecommerce3.png";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  category_id: number;
  category_name?: string; // add category name
  created_at: string;
  updated_at: string;
  image_url: string | null;
  image_public_id: string | null;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleFavorite?: (product: Product) => void; // optional heart click
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleFavorite,
}) => {
  //   const placeholderImage = "/images/placeholder.png"; // fallback image

  return (
    <Card className="hover:shadow-lg hover:scale-105 transition-transform duration-300">
      <CardContent className="flex flex-col p-4">
        {/* Image + Heart */}
        <div className="relative w-full h-48">
          <img
            src={product.image_url || banner3}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
          <button
            onClick={() => onToggleFavorite && onToggleFavorite(product)}
            className="absolute top-2 right-2 bg-white/80 rounded-full p-1 shadow hover:bg-white transition"
          >
            <Heart className="h-5 w-5 text-red-500" />
          </button>
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
            <Button
              className="ml-4"
              onClick={() => onAddToCart && onAddToCart(product)}
            >
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
