import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MainLayout from "@/components/layout/MainLayout";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { usePaginatedProducts } from "@/hooks/useProduct";
import type { Product } from "@/types";
import ProductTable from "@/components/admin/AdminProductManagement/ProductTable";
import ProductFormModal from "@/components/admin/AdminProductManagement/ProductFormModal";
import DeleteConfirmModal from "@/components/admin/AdminProductManagement/DeleteConfirmModal";



export default function AdminProductPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [page, setPage] = useState(1);
  const pageSize = 20;

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

  const openAddModal = () => { setSelectedProduct(null); setIsFormOpen(true); };
  const openEditModal = (p: Product) => { setSelectedProduct(p); setIsFormOpen(true); };
  const openDeleteModal = (p: Product) => { setSelectedProduct(p); setIsDeleteOpen(true); };

  const handleDeleteConfirm = async () => {
    if (!selectedProduct) return;
    try {
      await axios.delete(`http://localhost:3000/api/v1/products/${selectedProduct.id}`, { withCredentials: true });
      toast.success("Product deleted successfully!");
      setIsDeleteOpen(false);
      refetch?.();
    } catch (error: unknown) {
      toast.error("Failed to delete product");
    }
  };

  const handleFormSubmit = async (formData: FormData) => {
    try {
      if (selectedProduct) {
        const res = await axios.put(
          `http://localhost:3000/api/v1/products/${selectedProduct.id}`,
          formData,
          { withCredentials: true }
        );
        updateProductInState?.(res.data);
        toast.success("Product updated successfully!");
      } else {
        const res = await axios.post(
          "http://localhost:3000/api/v1/products",
          formData,
          { withCredentials: true }
        );
        setProducts?.((prev) => [res.data, ...prev]);
        toast.success("Product added successfully!");
      }
      setIsFormOpen(false);
    } catch {
      toast.error(`Failed to ${selectedProduct ? "update" : "add"} product`);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => refetch?.(), 500);
    return () => clearTimeout(timer);
  }, [searchTerm, categoryFilter, statusFilter, page, refetch]);

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Products</h1>
          <Button className="bg-primary text-white flex gap-2" onClick={openAddModal}>
            <Plus size={18} /> Add Product
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
            className="flex-1"
          />
          <div className="flex gap-2">
            <select value={categoryFilter} onChange={(e) => { setCategoryFilter(e.target.value); setPage(1); }}>
              <option>All</option>
              <option>Phones</option>
              <option>Laptops</option>
              <option>Accessories</option>
            </select>
            <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}>
              <option>All</option>
              <option>In Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>
        </div>

        <ProductTable
          products={products}
          loading={loading}
          onEdit={openEditModal}
          onDelete={openDeleteModal}
        />

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <div>Page <strong>{page}</strong> of {totalPages}</div>
          <div className="flex gap-2">
            <Button disabled={page === 1} onClick={() => setPage((p) => p - 1)}>Prev</Button>
            <Button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>Next</Button>
          </div>
        </div>
      </div>

      {isFormOpen && <ProductFormModal open={isFormOpen} product={selectedProduct} onClose={() => setIsFormOpen(false)} onSubmit={handleFormSubmit} />}
      {isDeleteOpen && <DeleteConfirmModal open={isDeleteOpen} productName={selectedProduct?.name || ""} onClose={() => setIsDeleteOpen(false)} onConfirm={handleDeleteConfirm} />}
    </MainLayout>
  );
}