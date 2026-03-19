import { useState } from "react";
import Footer from "@/components/common/Footer";
import FeaturedCategories from "@/components/Homepage/FeaturedCategories";
import HomepageCarousel from "@/components/Homepage/HomepageCarousel";
import ProductCard from "@/components/Homepage/ProductCard";
import WhyChooseUs from "@/components/Homepage/WhyChooseUs";
import MainLayout from "@/components/layout/MainLayout";

import { useWishlist } from "@/hooks/useWishlist";
import { Button } from "@/components/ui/button";
import { usePaginatedProducts } from "@/hooks/useProduct";
import { FaAngleDoubleLeft } from "react-icons/fa";
import { FaAngleDoubleRight } from "react-icons/fa";

const PAGE_SIZE = 8;

const Homepage = () => {
  const [page, setPage] = useState(1);
  const { products, loading, error, totalPages } = usePaginatedProducts(
    page,
    PAGE_SIZE,
  );
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <MainLayout>
      <div>
        <HomepageCarousel />
        <FeaturedCategories />

        <div className="mt-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
            Products
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onToggleFavorite={toggleWishlist}
                isFavorite={isInWishlist(product.id)}
              />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center gap-4 mt-20">
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setPage((p) => Math.max(1, p - 1));
              }}
              disabled={page === 1}
            >
              <FaAngleDoubleLeft />
            </Button>
            <span className="flex items-center">
              Page {page} of {totalPages}
            </span>
            <Button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setPage((p) => Math.min(totalPages, p + 1));
              }}
              disabled={page === totalPages}
            >
              <FaAngleDoubleRight />
            </Button>
          </div>
        </div>

        <WhyChooseUs />
      </div>

      <Footer />
    </MainLayout>
  );
};

export default Homepage;
