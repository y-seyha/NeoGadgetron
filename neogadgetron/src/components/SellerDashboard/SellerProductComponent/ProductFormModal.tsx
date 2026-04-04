import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "axios";
import type { Product } from "@/types";

interface ProductFormModalProps {
  product?: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
}

const ProductFormModal = ({
  product,
  open,
  onOpenChange,
  onSaved,
}: ProductFormModalProps) => {
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
    image: null as File | null,
  });

  const categories = [
    { id: "1", name: "Phones" },
    { id: "2", name: "Laptops" },
    { id: "3", name: "Smart Home" },
    { id: "4", name: "Accessories" },
  ];

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        stock: product.stock.toString(),
        category_id: product.category_id,
        image: null,
      });
    } else {
      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        category_id: "",
        image: null,
      });
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, files } = e.target as any;
    if (name === "image" && files) {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const formData = new FormData();
    Object.entries(form).forEach(([key, val]) => {
      if (val !== null) formData.append(key, val as any);
    });

    try {
      if (product) {
        await axios.put(
          `http://localhost:3000/api/v1/products/${product.id}`,
          formData,
          { withCredentials: true },
        );
        toast.success("Product updated!");
      } else {
        await axios.post(`http://localhost:3000/api/v1/products`, formData, {
          withCredentials: true,
        });
        toast.success("Product created!");
      }
      onSaved();
      onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>{product ? "Edit Product" : "Add Product"}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Label>Name</Label>
          <Input name="name" value={form.name} onChange={handleChange} />

          <Label>Description</Label>
          <Textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          <Label>Price</Label>
          <Input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
          />

          <Label>Stock</Label>
          <Input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
          />

          <Label>Category</Label>
          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <Label>Image</Label>
          <Input name="image" type="file" onChange={handleChange} />
        </div>
        <DialogFooter>
          <Button onClick={handleSave} disabled={saving}>
            {saving
              ? product
                ? "Saving..."
                : "Creating..."
              : product
                ? "Save Changes"
                : "Create Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormModal;
