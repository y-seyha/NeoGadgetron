import FeaturedCategories from "@/components/Homepage/FeaturedCategories";
import FeaturedProductsCarousel from "@/components/Homepage/FeaturedProductsCarousel";
import HomepageCarousel from "@/components/Homepage/HomepageCarousel";
import ProductCard from "@/components/Homepage/ProductCard";
import WhyChooseUs from "@/components/Homepage/WhyChooseUs";
import MainLayout from "@/components/layout/MainLayout";
import { useProducts } from "@/hooks/useProduct";

const Homepage = () => {
  const { products, loading, error } = useProducts();

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>{error}</p>;

  return (
    <MainLayout>
      <div>
        <HomepageCarousel />
        <FeaturedCategories />
        <FeaturedProductsCarousel />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <WhyChooseUs />
      </div>
    </MainLayout>
  );
};

export default Homepage;
