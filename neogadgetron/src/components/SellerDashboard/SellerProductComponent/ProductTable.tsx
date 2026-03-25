import { ProductRow } from "./ProductRow";
import type { Product } from "@/types";

interface ProductTableProps {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductTable = ({ products, loading, onEdit, onDelete }: ProductTableProps) => {
  if (loading) return <p>Loading products...</p>;
  if (products.length === 0) return <p className="text-gray-500">No products found.</p>;

  return (
    <div className="bg-gray-50 dark:bg-black shadow border rounded-2xl">
      {/* Header */}
      <div className="py-2 hidden sm:grid grid-cols-7 border bg-gray-100 dark:bg-black p-2 rounded-t font-semibold text-gray-700 dark:text-gray-100">
        <div>Image</div>
        <div>Name</div>
        <div>Description</div>
        <div>Price</div>
        <div>Stock</div>
        <div>Category</div>
        <div className="text-center">Actions</div>
      </div>
      {/* Rows */}
      <div className="flex flex-col gap-1">
        {products.map(product => (
          <ProductRow key={product.id} product={product} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};