import { Button } from "@/components/ui/button";
import type { Product } from "@/types";
import { Edit, Trash2 } from "lucide-react";

type Props = {
  products: Product[];
  loading: boolean;
  onEdit: (p: Product) => void;
  onDelete: (p: Product) => void;
};

export default function ProductTable({
  products,
  loading,
  onEdit,
  onDelete,
}: Props) {
  if (loading)
    return <div className="p-10 text-center">Loading products...</div>;
  if (products.length === 0)
    return (
      <div className="p-10 text-center text-gray-500">No products found</div>
    );

  return (
    <div className="overflow-auto border rounded">
      <div
        className="grid grid-cols-[96px_128px_96px_80px_80px_96px_1fr_112px_112px_112px] 
                  text-sm font-semibold border-b sticky top-0 z-10
                  bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
      >
        <div className="px-3 py-3">Image</div>
        <div className="px-3 py-3">Name</div>
        <div className="px-3 py-3">Category</div>
        <div className="px-3 py-3">Stock</div>
        <div className="px-3 py-3">Price</div>
        <div className="px-3 py-3">Seller ID</div>
        <div className="px-3 py-3">Description</div>
        <div className="px-3 py-3">Created</div>
        <div className="px-3 py-3">Updated</div>
        <div className="px-3 py-3 text-center">Actions</div>
      </div>

      {products.map((p) => (
        <div
          key={p.id}
          className="grid grid-cols-[96px_128px_96px_80px_80px_96px_1fr_112px_112px_112px] items-center border-b  transition"
        >
          <div className="px-3 py-2">
            <img
              src={p.image_url || "/placeholder.png"}
              alt={p.name}
              className="w-12 h-12 object-cover rounded border"
            />
          </div>
          <div className="px-3 py-2 font-medium truncate">{p.name}</div>
          <div className="px-3 py-2 text-gray-600">
            {p.category_name || "N/A"}
          </div>
          <div className="px-3 py-2">{p.stock}</div>
          <div className="px-3 py-2 font-semibold">${p.price}</div>
          <div className="px-3 py-2 text-gray-500 text-xs">N/A</div>
          <div className="px-3 py-2 truncate max-w-[200px] text-gray-500">
            {p.description}
          </div>
          <div className="px-3 py-2 text-xs">
            {new Date(p.created_at).toLocaleDateString()}
          </div>
          <div className="px-3 py-2 text-xs">
            {new Date(p.updated_at).toLocaleDateString()}
          </div>
          <div className="px-3 py-2 flex gap-2 justify-center">
            <Button variant="ghost" onClick={() => onEdit(p)}>
              <Edit size={16} />
            </Button>
            <Button variant="ghost" onClick={() => onDelete(p)}>
              <Trash2 size={16} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
