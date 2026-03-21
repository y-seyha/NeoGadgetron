import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import MainLayout from "@/components/layout/MainLayout";
import { Edit, Trash2, Plus } from "lucide-react";

interface Category {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export default function AdminCategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Fetch categories 
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/v1/categories", {
        withCredentials: true,
      });
      setCategories(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  //  Handlers 
  const openAddModal = () => {
    setSelectedCategory(null);
    setIsFormOpen(true);
  };

  const openEditModal = (category: Category) => {
    setSelectedCategory(category);
    setIsFormOpen(true);
  };

  const openDeleteModal = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCategory) return;
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/categories/${selectedCategory.id}`,
        { withCredentials: true },
      );
      toast.success("Category deleted successfully!");
      setIsDeleteOpen(false);
      fetchCategories();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete category");
    }
  };

  const handleFormSubmit = async (data: {
    name: string;
    description: string;
  }) => {
    try {
      if (selectedCategory) {
       
        await axios.put(
          `http://localhost:3000/api/v1/categories/${selectedCategory.id}`,
          data,
          { withCredentials: true },
        );
        toast.success("Category updated successfully!");
      } else {
       
        await axios.post("http://localhost:3000/api/v1/categories", data, {
          withCredentials: true,
        });
        toast.success("Category added successfully!");
      }
      setIsFormOpen(false);
      fetchCategories();
    } catch (error) {
      console.log(error);
      toast.error("Failed to save category");
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Manage Categories
          </h1>
          <Button
            className="bg-primary text-white flex gap-2"
            onClick={openAddModal}
          >
            <Plus size={18} /> Add Category
          </Button>
        </div>

        {/* Table */}
        <div className="overflow-auto border rounded dark:border-gray-700">
          <div className="grid grid-cols-[64px_1fr_2fr_112px_112px_112px] bg-gray-100 dark:bg-gray-900 text-sm font-semibold border-b sticky top-0 z-10">
            <div className="px-3 py-3">ID</div>
            <div className="px-3 py-3">Name</div>
            <div className="px-3 py-3">Description</div>
            <div className="px-3 py-3">Created</div>
            <div className="px-3 py-3">Updated</div>
            <div className="px-3 py-3 text-center">Actions</div>
          </div>

          {loading ? (
            <div className="p-10 text-center">Loading categories...</div>
          ) : categories.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No categories found
            </div>
          ) : (
            categories.map((c) => (
              <div
                key={c.id}
                className="grid grid-cols-[64px_1fr_2fr_112px_112px_112px] items-center border-b hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
              >
                <div className="px-3 py-2">{c.id}</div>
                <div className="px-3 py-2 font-medium">{c.name}</div>
                <div className="px-3 py-2 text-gray-500 truncate">
                  {c.description}
                </div>
                <div className="px-3 py-2 text-xs">
                  {new Date(c.created_at).toLocaleDateString()}
                </div>
                <div className="px-3 py-2 text-xs">
                  {new Date(c.updated_at).toLocaleDateString()}
                </div>
                <div className="px-3 py-2 flex gap-2 justify-center">
                  <Button variant="ghost" onClick={() => openEditModal(c)}>
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" onClick={() => openDeleteModal(c)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modals */}
      {isFormOpen && (
        <CategoryFormModal
          open={isFormOpen}
          category={selectedCategory}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
        />
      )}
      {isDeleteOpen && (
        <DeleteConfirmModal
          open={isDeleteOpen}
          productName={selectedCategory?.name || ""}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </MainLayout>
  );
}

// Add/Edit Modal 
function CategoryFormModal({
  category,
  open,
  onClose,
  onSubmit,
}: {
  category?: Category | null;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description: string }) => void;
}) {
  const isEdit = !!category;
  const [name, setName] = useState(category?.name || "");
  const [description, setDescription] = useState(category?.description || "");

  const handleSubmit = () => {
    if (!name.trim()) return toast.error("Name is required");
    onSubmit({ name, description });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg space-y-5">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Category" : "Add Category"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div>
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label>Description</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-primary text-white" onClick={handleSubmit}>
            {isEdit ? "Update Category" : "Create Category"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

//  Delete Confirm Modal 
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
