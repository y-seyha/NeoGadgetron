import Footer from "@/components/common/Footer";
import FeaturedCategories from "@/components/Homepage/FeaturedCategories";
import HomepageCarousel from "@/components/Homepage/HomepageCarousel";
import ProductCard from "@/components/Homepage/ProductCard";
import WhyChooseUs from "@/components/Homepage/WhyChooseUs";
import MainLayout from "@/components/layout/MainLayout";
import { useProducts } from "@/hooks/useProduct";
import { useWishlist } from "@/hooks/useWishlist";

const Homepage = () => {
  const { products, loading, error } = useProducts();
  const {  toggleWishlist, isInWishlist } = useWishlist();

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <MainLayout>
      <div>
        <HomepageCarousel />
        <FeaturedCategories />
        {/* <FeaturedProductsCarousel /> */}

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
        </div>

        <WhyChooseUs />
      </div>

      <Footer />
    </MainLayout>
  );
};

export default Homepage;
