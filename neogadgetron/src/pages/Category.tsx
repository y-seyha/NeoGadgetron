import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MainLayout from "@/components/layout/MainLayout";
import { Input } from "@/components/ui/input";
import type { Product } from "@/types";
import ProductCard from "@/components/Homepage/ProductCard";

const categoryMap: Record<string, number> = {
  phones: 1,
  laptops: 2,
  "smart-home": 3,
  accessories: 4,
};

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const categoryId = categoryMap[slug || ""];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/v1/products/category/${categoryId}`,
        );
        setProducts(res.data.products || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) fetchProducts();
  }, [categoryId]);

  // simple client search
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold capitalize">
            {slug?.replace("-", " ")}
          </h1>

          <Input
            placeholder="Search in category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <p className="text-gray-500">Coming soon...</p>
        )}

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
