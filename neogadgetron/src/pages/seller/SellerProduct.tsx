import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/hooks/useAuth";

import { toast } from "sonner";
import axios from "axios";
import type { Product } from "@/types";
import ProductFormModal from "@/components/SellerDashboard/SellerProductComponent/ProductFormModal";
import { ProductTable } from "@/components/SellerDashboard/SellerProductComponent/ProductTable";
import { ConfirmDeleteModal } from "@/components/Review/ConfirmDeleteModal";

const SellerProductsPage = () => {
  const { user } = useAuth();
  const sellerId = user?.id;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get<Product[]>(
        `http://localhost:3000/api/v1/sellers/${sellerId}/products`,
        { withCredentials: true },
      );
      setProducts(res.data ?? []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) return;
    void fetchProducts();
  }, [user]);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setFormModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setProductToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col gap-2 w-full sm:w-auto">
            <h1 className="text-3xl font-bold">Seller Dashboard</h1>
            <p className="text-gray-500 mt-1">Manage your products</p>
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-2 w-full sm:w-80"
            />
          </div>

          <ProductFormModal
            product={selectedProduct}
            open={formModalOpen}
            onOpenChange={setFormModalOpen}
            onSaved={() => void fetchProducts()}
          />
        </div>

        <ProductTable
          products={filteredProducts}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <ConfirmDeleteModal
          open={deleteConfirmOpen}
          onOpenChange={setDeleteConfirmOpen}
          description="Are you sure you want to delete this product?"
          onConfirm={async () => {
            if (productToDelete) {
              try {
                await axios.delete(
                  `http://localhost:3000/api/v1/products/${productToDelete}`,
                  { withCredentials: true },
                );
                toast.success("Product deleted!");
                void fetchProducts();
              } catch (err) {
                console.error(err);
                toast.error("Failed to delete product");
              } finally {
                setProductToDelete(null);
              }
            }
          }}
        />
      </div>
    </MainLayout>
  );
};

export default SellerProductsPage;
