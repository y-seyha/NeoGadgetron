import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types";

type Props = {
  open: boolean;
  product?: Product | null;
  onClose: () => void;
  onSubmit: (data: FormData) => Promise<void>; // expect async
};

export default function ProductFormModal({ open, product, onClose, onSubmit }: Props) {
  const isEdit = !!product;
  const categories = [
    { id: 1, name: "Phones" },
    { id: 2, name: "Laptops" },
    { id: 3, name: "Accessories" },
  ];

  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [stock, setStock] = useState(product?.stock || 0);
  const [image, setImage] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState(product?.category_id || 1);
  const [loading, setLoading] = useState(false); // <-- new loading state

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (loading) return; // prevent double click
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("stock", stock.toString());
    formData.append("category_id", categoryId.toString());
    if (image) formData.append("image", image);

    try {
      await onSubmit(formData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => { if (!loading) onClose(); }}>
      <DialogContent className="sm:max-w-lg space-y-5">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Product" : "Add New Product"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div>
            <Label>Product Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} disabled={loading} />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} className="h-24" disabled={loading} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Price ($)</Label>
              <Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} disabled={loading} />
            </div>
            <div>
              <Label>Stock</Label>
              <Input type="number" value={stock} onChange={(e) => setStock(Number(e.target.value))} disabled={loading} />
            </div>
          </div>

          <div>
            <Label>Category</Label>
            <select value={categoryId} onChange={(e) => setCategoryId(Number(e.target.value))} className="border px-3 py-2 rounded w-full" disabled={loading}>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Image (optional)</Label>
            <Input type="file" accept="image/*" onChange={handleFileChange} disabled={loading} />
            {image && <img src={URL.createObjectURL(image)} alt="Preview" className="mt-2 w-24 h-24 object-cover rounded border" />}
          </div>
        </div>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button className="bg-primary text-white flex items-center gap-2" onClick={handleSubmit} disabled={loading}>
            {loading ? (isEdit ? "Updating..." : "Creating...") : isEdit ? "Update Product" : "Create Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}