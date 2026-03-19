import { useEffect, useState } from "react";
import type { Product } from "@/types";
import axios from "axios";

interface PaginatedProductsResponse {
  data: Product[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}

export const usePaginatedProducts = (
  page: number = 1,
  pageSize: number = 8,
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProducts = async (page: number, pageSize: number) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.get<PaginatedProductsResponse>(
        `http://localhost:3000/api/v1/products/paginated?page=${page}&pageSize=${pageSize}`,
        { withCredentials: true },
      );

      setProducts(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err: any) {
      console.error("Failed to fetch paginated products:", err);
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(page, pageSize);
  }, [page, pageSize]);

  return {
    products,
    loading,
    error,
    totalPages,
    refetch: () => fetchProducts(page, pageSize),
  };
};
