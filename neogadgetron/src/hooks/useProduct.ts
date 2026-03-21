import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import type { Product } from "@/types";
import axios from "axios";

interface PaginatedProductsResponse {
  data: Product[];
  page: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}

interface UsePaginatedProductsOptions {
  search?: string;
  category?: string;
  status?: "In Stock" | "Out of Stock" | "All";
}

export const usePaginatedProducts = (
  page: number = 1,
  pageSize: number = 20,
  options?: UsePaginatedProductsOptions
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(1);

  const didMountRef = useRef(false);


  const normalizedOptions = useMemo(() => ({
    search: options?.search || "",
    category: options?.category || "All",
    status: options?.status || "All",
  }), [options?.search, options?.category, options?.status]);

  const fetchProducts = useCallback(
    async (page: number, pageSize: number, opts: typeof normalizedOptions) => {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("pageSize", pageSize.toString());
        if (opts.search) params.append("search", opts.search);
        if (opts.category && opts.category !== "All") params.append("category", opts.category);
        if (opts.status && opts.status !== "All") params.append("status", opts.status);

        const res = await axios.get<PaginatedProductsResponse>(
          `http://localhost:3000/api/v1/products/paginated?${params.toString()}`,
          { withCredentials: true }
        );

        setProducts(res.data.data || []);
        setTotalPages(res.data.totalPages || 1);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || err.message);
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load products");
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Memoized refetch function
  const refetch = useCallback(() => {
    fetchProducts(page, pageSize, normalizedOptions);
  }, [page, pageSize, normalizedOptions, fetchProducts]);

  useEffect(() => {
    // Prevent double fetch on mount in Strict Mode
    if (!didMountRef.current) {
      fetchProducts(page, pageSize, normalizedOptions);
      didMountRef.current = true;
      return;
    }
    // Fetch when filters/page change
    fetchProducts(page, pageSize, normalizedOptions);
  }, [page, pageSize, normalizedOptions, fetchProducts]);

  const updateProductInState = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
  };

  return {
    products,
    loading,
    error,
    totalPages,
    refetch,
    setProducts,
    updateProductInState,
  };
};