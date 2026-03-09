
import React, { useState } from "react";
import type { Review } from "@/types";
import axios from "axios";
import { Button } from "../ui/button";
import AddReviewModal from "./ReviewModal";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";

interface Props {
  reviews: Review[];
  currentUser: { id: number; role: string } | null;
  onDeleted?: () => void;
  onUpdated: () => void;
}
type ReviewToEdit = {
  id: number;
  product_id: number;
  rating: number;
  comment: string;
};

const ReviewList: React.FC<Props> = ({
  reviews,
  currentUser,
  onDeleted,
  onUpdated,
}) => {
  const [open, setOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<ReviewToEdit | undefined>(
    undefined,
  );
  const [selectedProduct, setSelectedProduct] = useState<number>(0);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  if (!reviews || reviews.length === 0) return <p>No reviews yet.</p>;

  const deleteReview = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/reviews/${id}`, {
        withCredentials: true,
      });
      onDeleted?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      {reviews.map((review) => {
        const isOwner =
          currentUser &&
          (currentUser.id === review.user?.id || currentUser.role === "admin");

        return (
          <div key={review.id} className="border p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <p className="font-semibold">
                {review.user?.first_name && review.user?.last_name
                  ? `${review.user.first_name} ${review.user.last_name}`
                  : "Unknown User"}
              </p>
              <p className="text-yellow-500">{"⭐".repeat(review.rating)}</p>
            </div>

            {review.product?.name && (
              <p className="text-sm text-gray-500 mt-1">
                Product: {review.product.name}
              </p>
            )}

            <p className="text-gray-700 mt-2">{review.comment}</p>

            <p className="text-sm text-gray-400 mt-2">
              {review.created_at
                ? new Date(review.created_at).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : ""}
            </p>

            {isOwner && (
              <div className="flex gap-2 mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setOpen(true);
                    setSelectedProduct(review.product?.id ?? 0);
                    setEditingReview({
                      id: review.id,
                      product_id: review.product?.id || 0,
                      rating: review.rating,
                      comment: review.comment,
                    });
                  }}
                >
                  Edit
                </Button>

                <AddReviewModal
                  open={open}
                  onOpenChange={setOpen}
                  selectedProductId={selectedProduct}
                  onProductChange={setSelectedProduct}
                  reviewToEdit={editingReview}
                  onReviewSubmitted={() => {
                    setOpen(false);
                    onUpdated(); // refresh list after edit
                  }}
                />

                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    setDeleteId(review.id);
                    setConfirmOpen(true);
                  }}
                >
                  Delete
                </Button>

                <ConfirmDeleteModal
                  open={confirmOpen}
                  onOpenChange={setConfirmOpen}
                  onConfirm={() => {
                    if (deleteId) {
                      deleteReview(deleteId);
                      setDeleteId(null);
                    }
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ReviewList;
