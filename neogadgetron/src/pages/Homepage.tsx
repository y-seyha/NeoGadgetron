import FeaturedCategories from "@/components/Homepage/FeaturedCategories";
import FeaturedProductsCarousel from "@/components/Homepage/FeaturedProductsCarousel";
import HomepageCarousel from "@/components/Homepage/HomepageCarousel";
import ProductCard, { type Product } from "@/components/Homepage/ProductCard";
import WhyChooseUs from "@/components/Homepage/WhyChooseUs";
import MainLayout from "@/components/layout/MainLayout";

const sampleProduct: Product = {
  id: 1,
  name: "Test Product",
  description: "A sample product",
  price: "49.99",
  stock: 100,
  category_id: 1,
  created_at: "2026-02-25T09:03:10.652Z",
  updated_at: "2026-02-25T09:03:10.652Z",
  image_url: null,
  image_public_id: null,
};

const Homepage = () => {
  const handleAddToCart = (product: Product) => {
    console.log("Add to cart:", product);
  };

  return (
    <MainLayout>
      <div>
        <HomepageCarousel />
        <FeaturedCategories />
        <FeaturedProductsCarousel />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          <ProductCard product={sampleProduct} onAddToCart={handleAddToCart} />
          <ProductCard product={sampleProduct} onAddToCart={handleAddToCart} />
          <ProductCard product={sampleProduct} onAddToCart={handleAddToCart} />
          <ProductCard product={sampleProduct} onAddToCart={handleAddToCart} />
          <ProductCard product={sampleProduct} onAddToCart={handleAddToCart} />
          <ProductCard product={sampleProduct} onAddToCart={handleAddToCart} />
          <ProductCard product={sampleProduct} onAddToCart={handleAddToCart} />
          <ProductCard product={sampleProduct} onAddToCart={handleAddToCart} />
          <ProductCard product={sampleProduct} onAddToCart={handleAddToCart} />
          <ProductCard product={sampleProduct} onAddToCart={handleAddToCart} />
          <ProductCard product={sampleProduct} onAddToCart={handleAddToCart} />
          <ProductCard product={sampleProduct} onAddToCart={handleAddToCart} />
          <ProductCard product={sampleProduct} onAddToCart={handleAddToCart} />
          <ProductCard product={sampleProduct} onAddToCart={handleAddToCart} />
          <ProductCard product={sampleProduct} onAddToCart={handleAddToCart} />
          <ProductCard product={sampleProduct} onAddToCart={handleAddToCart} />
          <ProductCard product={sampleProduct} onAddToCart={handleAddToCart} />
          <ProductCard product={sampleProduct} onAddToCart={handleAddToCart} />
          <ProductCard product={sampleProduct} onAddToCart={handleAddToCart} />
          <ProductCard product={sampleProduct} onAddToCart={handleAddToCart} />
          <ProductCard product={sampleProduct} onAddToCart={handleAddToCart} />
          <ProductCard product={sampleProduct} onAddToCart={handleAddToCart} />
          <ProductCard product={sampleProduct} onAddToCart={handleAddToCart} />
          <ProductCard product={sampleProduct} onAddToCart={handleAddToCart} />
          <ProductCard product={sampleProduct} onAddToCart={handleAddToCart} />
          <ProductCard product={sampleProduct} onAddToCart={handleAddToCart} />
          <ProductCard product={sampleProduct} onAddToCart={handleAddToCart} />
          <ProductCard product={sampleProduct} onAddToCart={handleAddToCart} />
        </div>

        <WhyChooseUs />
      </div>
    </MainLayout>
  );
};

export default Homepage;
