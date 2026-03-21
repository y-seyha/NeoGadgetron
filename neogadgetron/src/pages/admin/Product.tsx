import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { usePaginatedProducts } from "@/hooks/useProduct";
import type { Product } from "@/types";
import MainLayout from "@/components/layout/MainLayout";
import { Edit, Trash2, Plus } from "lucide-react";

// Main Page
export default function AdminProductPage() {
  //Filters & UI
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  //  Pagination
  const [page, setPage] = useState(1);
  const pageSize = 20;

  // Paginated products hook
  const {
    products,
    loading,
    totalPages,
    refetch,
    setProducts,
    updateProductInState,
  } = usePaginatedProducts(page, pageSize, {
    search: searchTerm,
    category: categoryFilter === "All" ? undefined : categoryFilter,
    status:
      statusFilter === "All"
        ? undefined
        : (statusFilter as "In Stock" | "Out of Stock"),
  });

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const openAddModal = () => {
    setSelectedProduct(null);
    setIsFormOpen(true);
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setIsFormOpen(true);
  };

  const openDeleteModal = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedProduct) return;
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/products/${selectedProduct.id}`,
        { withCredentials: true },
      );
      toast.success("Product deleted successfully!");
      setIsDeleteOpen(false);
      refetch?.();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to delete product",
        );
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  const handleFormSubmit = async (formData: FormData) => {
    try {
      if (selectedProduct) {
        // Update
        const res = await axios.put(
          `http://localhost:3000/api/v1/products/${selectedProduct.id}`,
          formData,
          { withCredentials: true },
        );

        const updatedProduct: Product = res.data;
        updateProductInState?.(updatedProduct);

        toast.success("Product updated successfully!");
      } else {
        const res = await axios.post(
          "http://localhost:3000/api/v1/products",
          formData,
          { withCredentials: true },
        );

        const newProduct: Product = res.data;
        setProducts?.((prev: Product[]) => [newProduct, ...prev]);

        toast.success("Product added successfully!");
      }

      setIsFormOpen(false);
    } catch (error: unknown) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            `Failed to ${selectedProduct ? "update" : "add"} product`,
        );
      } else if (error instanceof Error) {
        toast.error(
          error.message ||
            `Failed to ${selectedProduct ? "update" : "add"} product`,
        );
      } else {
        toast.error(`Failed to ${selectedProduct ? "update" : "add"} product`);
      }
    }
  };

  //Refetch when filters/page change
  useEffect(() => {
    const timer = setTimeout(() => {
      refetch?.();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, categoryFilter, statusFilter, page, refetch]);

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Manage Products
          </h1>
          <Button
            className="bg-primary text-white flex gap-2"
            onClick={openAddModal}
          >
            <Plus size={18} /> Add Product
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {/* Search Input */}
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="flex-1 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          />

          {/* Category & Status */}
          <div className="flex gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setPage(1);
              }}
              className="border px-3 py-2 rounded dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
            >
              <option>All</option>
              <option>Phones</option>
              <option>Laptops</option>
              <option>Accessories</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="border px-3 py-2 rounded dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
            >
              <option>All</option>
              <option>In Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Products Table */}
        <div className="overflow-auto border rounded dark:border-gray-700">
          {/* Header */}
          <div className="grid grid-cols-[96px_128px_96px_80px_80px_96px_1fr_112px_112px_112px] bg-gray-100 dark:bg-gray-900 text-sm font-semibold border-b sticky top-0 z-10">
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

          {/* Rows */}
          {loading ? (
            <div className="p-10 text-center">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No products found
            </div>
          ) : (
            products.map((p) => (
              <div
                key={p.id}
                className="grid grid-cols-[96px_128px_96px_80px_80px_96px_1fr_112px_112px_112px] items-center border-b hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
              >
                <div className="px-3 py-2">
                  <img
                    src={p.image_url || "/placeholder.png"}
                    alt={p.name}
                    className="w-12 h-12 object-cover rounded border"
                  />
                </div>
                <div className="px-3 py-2 font-medium truncate">{p.name}</div>
                <div className="px-3 py-2 text-gray-600 dark:text-gray-400">
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
                  <Button variant="ghost" onClick={() => openEditModal(p)}>
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" onClick={() => openDeleteModal(p)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-500">
            Page <strong>{page}</strong> of {totalPages}
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              Prev
            </Button>
            <Button
              variant="outline"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Modals  */}
      {isFormOpen && (
        <ProductFormModal
          open={isFormOpen}
          product={selectedProduct}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
        />
      )}
      {isDeleteOpen && (
        <DeleteConfirmModal
          open={isDeleteOpen}
          productName={selectedProduct?.name || ""}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </MainLayout>
  );
}

// Modal
function ProductFormModal({
  product,
  open,
  onClose,
  onSubmit,
}: {
  product?: Product | null;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: FormData) => void;
}) {
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setImage(e.target.files[0]);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("stock", stock.toString());
    formData.append("category_id", categoryId.toString());
    if (image) formData.append("image", image);
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg space-y-5">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div>
            <Label>Product Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-24"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Price ($)</Label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <div>
              <Label>Stock</Label>
              <Input
                type="number"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
              />
            </div>
          </div>
          <div>
            <Label>Category</Label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              className="border px-3 py-2 rounded dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 w-full"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Image (optional)</Label>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            {image && (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="mt-2 w-24 h-24 object-cover rounded border"
              />
            )}
          </div>
        </div>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-primary text-white" onClick={handleSubmit}>
            {isEdit ? "Update Product" : "Create Product"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

//Delete Confirm Modal
function DeleteConfirmModal({
  open,
  productName,
  onClose,
  onConfirm,
}: {
  open: boolean;
  productName: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Are you sure you want to delete <strong>{productName}</strong>? This
          action cannot be undone.
        </p>
        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
