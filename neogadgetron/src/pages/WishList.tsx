import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import ProductCard from "@/components/Homepage/ProductCard";
import { useWishlist } from "@/hooks/useWishlist";

export default function WishlistPage() {
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>

        {wishlist.length === 0 ? (
          <p className="text-gray-500">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onToggleFavorite={toggleWishlist} // heart button works
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
