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
import MainLayout from "@/components/layout/MainLayout";
import { Edit, Trash2, Plus } from "lucide-react";

interface Review {
  id: number;
  user_id: string;
  product_id: number;
  reviewer_name: string;
  reviewer_email: string;
  product_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

interface Product {
  id: number;
  name: string;
}

export default function AdminReviewPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [totalPages, setTotalPages] = useState(1);

  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);


  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/reviews/paginated?page=${page}&pageSize=${pageSize}`,
        { withCredentials: true },
      );

      const mapped = res.data.data.map((r: any) => ({
        id: r.id,
        user_id: r.user.id,
        product_id: r.product.id,
        reviewer_name: `${r.user.first_name} ${r.user.last_name}`,
        reviewer_email: r.user.email,
        product_name: r.product.name,
        rating: r.rating,
        comment: r.comment,
        created_at: r.created_at,
      }));

      setReviews(mapped);
      setTotalPages(res.data.totalPages);
    } catch {
      toast.error("Failed to fetch reviews");
    } finally {
      setLoading(false);
    }
  };


  const fetchUsersAndProducts = async () => {
    try {
      const [usersRes, productsRes] = await Promise.all([
        axios.get("http://localhost:3000/api/v1/users", {
          withCredentials: true,
        }),
        axios.get("http://localhost:3000/api/v1/products", {
          withCredentials: true,
        }),
      ]);
      setUsers(usersRes.data);
      setProducts(productsRes.data);
    } catch {
      toast.error("Failed to fetch users or products");
    }
  };

  useEffect(() => {
    fetchReviews();
    fetchUsersAndProducts();
  }, [page]);

  
  const openAddModal = () => {
    setSelectedReview(null);
    setIsFormOpen(true);
  };

  const openEditModal = (review: Review) => {
    setSelectedReview(review);
    setIsFormOpen(true);
  };

  const openDeleteModal = (review: Review) => {
    setSelectedReview(review);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedReview) return;
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/reviews/${selectedReview.id}`,
        { withCredentials: true },
      );
      toast.success("Review deleted successfully!");
      setIsDeleteOpen(false);
      fetchReviews();
    } catch {
      toast.error("Failed to delete review");
    }
  };

  const handleFormSubmit = async (data: {
    user_id: number;
    product_id: number;
    rating: number;
    comment: string;
  }) => {
    try {
      if (selectedReview) {
        await axios.put(
          `http://localhost:3000/api/v1/reviews/${selectedReview.id}`,
          data,
          { withCredentials: true },
        );
        toast.success("Review updated successfully!");
      } else {
        await axios.post(`http://localhost:3000/api/v1/reviews`, data, {
          withCredentials: true,
        });
        toast.success("Review added successfully!");
      }
      setIsFormOpen(false);
      fetchReviews();
    } catch {
      toast.error(`Failed to ${selectedReview ? "update" : "add"} review`);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Manage Reviews
          </h1>
          <Button
            className="bg-primary text-white flex gap-2"
            onClick={openAddModal}
          >
            <Plus size={18} /> Add Review
          </Button>
        </div>

        {/* Reviews Table */}
        <div className="overflow-auto border rounded dark:border-gray-700">
          <div className="grid grid-cols-[1fr_1fr_1fr_80px_2fr_112px_112px] bg-gray-100 dark:bg-gray-900 text-sm font-semibold border-b sticky top-0 z-10">
            <div className="px-3 py-3">Reviewer</div>
            <div className="px-3 py-3">Email</div>
            <div className="px-3 py-3">Product</div>
            <div className="px-3 py-3">Rating</div>
            <div className="px-3 py-3">Comment</div>
            <div className="px-3 py-3">Date</div>
            <div className="px-3 py-3 text-center">Actions</div>
          </div>

          {loading ? (
            <div className="p-10 text-center">Loading reviews...</div>
          ) : reviews.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No reviews found
            </div>
          ) : (
            reviews.map((r) => (
              <div
                key={r.id}
                className="grid grid-cols-[1fr_1fr_1fr_80px_2fr_112px_112px] items-center border-b hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
              >
                <div className="px-3 py-2 font-medium truncate">
                  {r.reviewer_name}
                </div>
                <div className="px-3 py-2 text-xs text-gray-500 dark:text-gray-400">
                  {r.reviewer_email}
                </div>
                <div className="px-3 py-2 text-gray-600 dark:text-gray-400">
                  {r.product_name}
                </div>
                <div className="px-3 py-2">{r.rating}</div>
                <div className="px-3 py-2 truncate max-w-[200px] text-gray-500">
                  {r.comment}
                </div>
                <div className="px-3 py-2 text-xs">
                  {new Date(r.created_at).toLocaleDateString()}
                </div>
                <div className="px-3 py-2 flex gap-2 justify-center">
                  <Button variant="ghost" onClick={() => openEditModal(r)}>
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" onClick={() => openDeleteModal(r)}>
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

      {/* --- Modals --- */}
      {isFormOpen && (
        <ReviewFormModal
          review={selectedReview}
          users={users}
          products={products}
          open={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
        />
      )}
      {isDeleteOpen && (
        <DeleteConfirmModal
          open={isDeleteOpen}
          reviewName={selectedReview?.reviewer_name || ""}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </MainLayout>
  );
}


function ReviewFormModal({
  review,
  users,
  products,
  open,
  onClose,
  onSubmit,
}: {
  review?: Review | null;
  users: User[];
  products: Product[];
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    user_id: number;
    product_id: number;
    rating: number;
    comment: string;
  }) => void;
}) {
  const [userId, setUserId] = useState(review?.user_id || 0);
  const [productId, setProductId] = useState(review?.product_id || 0);
  const [rating, setRating] = useState(review?.rating || 5);
  const [comment, setComment] = useState(review?.comment || "");

  const handleSubmit = () => {
    if (!userId || !productId) {
      toast.error("Please select user and product");
      return;
    }
    onSubmit({ user_id: userId, product_id: productId, rating, comment });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg space-y-5">
        <DialogHeader>
          <DialogTitle>{review ? "Edit Review" : "Add Review"}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-2">
          <div>
            <Label>Reviewer</Label>
            <select
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full border px-2 py-1 rounded"
            >
              <option value={0}>Select User</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.first_name} {u.last_name} ({u.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Product</Label>
            <select
              value={productId}
              onChange={(e) => setProductId(Number(e.target.value))}
              className="w-full border px-2 py-1 rounded"
            >
              <option value={0}>Select Product</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Label>Rating</Label>
            <Input
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            />
          </div>

          <div>
            <Label>Comment</Label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="h-24"
            />
          </div>
        </div>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-primary text-white" onClick={handleSubmit}>
            {review ? "Update Review" : "Add Review"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


function DeleteConfirmModal({
  open,
  reviewName,
  onClose,
  onConfirm,
}: {
  open: boolean;
  reviewName: string;
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
          Are you sure you want to delete review by{" "}
          <strong>{reviewName}</strong>? This action cannot be undone.
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
