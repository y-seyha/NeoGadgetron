import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import type { Product } from "@/types";

interface ProductRowProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export const ProductRow = ({ product, onEdit, onDelete }: ProductRowProps) => (
  <div className="grid sm:grid-cols-7 gap-2 items-center bg-white dark:bg-black p-2 hover:shadow transition border rounded-lg">
    <div>
      {product.image_url ? (
        <img
          src={product.image_url}
          alt={product.name}
          className="h-12 w-12 object-cover rounded"
        />
      ) : (
        <div className="h-12 w-12 bg-gray-200 dark:bg-gray-600 rounded" />
      )}
    </div>
    <div className="truncate">{product.name}</div>
    <div className="truncate">{product.description}</div>
    <div>${product.price}</div>
    <div>{product.stock}</div>
    <div>{product.category_id}</div>
    <div className="flex justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="p-1"
        onClick={() => onEdit(product)}
      >
        <Edit className="h-4 w-4" />
      </Button>
      <Button
        variant="destructive"
        size="sm"
        className="p-1"
        onClick={() => onDelete(product.id)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  </div>
);
