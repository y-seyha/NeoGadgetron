import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import axios from "axios";
import MainLayout from "@/components/layout/MainLayout";
import { useAuth } from "@/hooks/useAuth";
import { Edit, Trash2 } from "lucide-react";
import { ConfirmDeleteModal } from "@/components/Review/ConfirmDeleteModal";

export interface Product {
  id: string;
  user_id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category_id: string;
  image_url?: string;
}

const SellerProductsPage = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category_id: "",
    image: null as File | null,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const sellerId = user?.id;

  // Fetch seller products
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, files } = e.target as any;
    if (name === "image" && files) {
      setForm((prev) => ({ ...prev, image: files[0] }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const openEditModal = (product: Product) => {
    setSelectedProduct(product);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category_id: product.category_id,
      image: null,
    });
    setModalOpen(true);
  };
  const openAddModal = () => {
    setSelectedProduct(null);
    setForm({
      name: "",
      description: "",
      price: "",
      stock: "",
      category_id: "",
      image: null,
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("stock", form.stock);
    formData.append("category_id", form.category_id);
    if (form.image) formData.append("image", form.image);

    try {
      if (selectedProduct) {
        await axios.put(
          `http://localhost:3000/api/v1/products/${selectedProduct.id}`,
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
      setModalOpen(false);
      void fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/products/${id}`, {
        withCredentials: true,
      });
      toast.success("Product deleted!");
      void fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    }
  };

  // Filtered products based on search
  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        {/* Header + Search */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col gap-2 w-full sm:w-auto">
            <h1 className="text-3xl font-bold">Seller Dashboard</h1>
            <p className="text-gray-500 mt-1">
              Manage your products, create, update, or remove them easily.
            </p>
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mt-2 w-full sm:w-80"
            />
          </div>

          <Dialog open={modalOpen} onOpenChange={setModalOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAddModal}>Add Product</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {selectedProduct ? "Edit Product" : "Add Product"}
                </DialogTitle>
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
                <Label>Category ID</Label>
                <Input
                  name="category_id"
                  value={form.category_id}
                  onChange={handleChange}
                />
                <Label>Image</Label>
                <Input name="image" type="file" onChange={handleChange} />
              </div>
              <DialogFooter>
                <Button onClick={handleSave} disabled={saving}>
                  {saving
                    ? selectedProduct
                      ? "Saving..."
                      : "Creating..."
                    : selectedProduct
                      ? "Save Changes"
                      : "Create Product"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Excel-style products list */}
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

          {/* Products */}
          <div className="flex flex-col gap-1 ">
            {loading ? (
              <p>Loading products...</p>
            ) : filteredProducts.length === 0 ? (
              <p className="text-gray-500">
                No products found. Add your first product!
              </p>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="grid sm:grid-cols-7 gap-2 items-center bg-white dark:bg-black p-2  hover:shadow transition border rounded-lg"
                >
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
                      onClick={() => openEditModal(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      className="p-1"
                      onClick={() => {
                        setProductToDelete(product.id); // store the product ID
                        setConfirmOpen(true); // open the modal
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <ConfirmDeleteModal
                      open={confirmOpen}
                      onOpenChange={setConfirmOpen}
                      description="Are you sure you want to delete this product?"
                      onConfirm={() => {
                        if (productToDelete) {
                          handleDelete(productToDelete);
                          setProductToDelete(null); // reset after deletion
                        }
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default SellerProductsPage;
