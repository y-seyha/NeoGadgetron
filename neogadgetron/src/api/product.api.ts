import type { Product } from "@/types";
import axios from "axios";
// import type { Product } from "@/components/Homepage/ProductCard";

const API_URL = "http://localhost:3000/api/v1/products";

export const productApi = {
  async getAll(): Promise<Product[]> {
    const res = await axios.get<Product[]>(API_URL, {
      withCredentials: true,
    });
    return res.data;
  },

  async getById(id: number): Promise<Product> {
    const res = await axios.get<Product>(`${API_URL}/${id}`, {
      withCredentials: true,
    });
    return res.data;
  },
};
