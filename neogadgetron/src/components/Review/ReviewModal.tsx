
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { toast } from "sonner";

interface Product {
  id: number;
  name: string;
}

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedProductId: number;
  onProductChange: (id: number) => void;
  onReviewSubmitted: () => void;
  reviewToEdit?: {
    id: number;
    product_id: number;
    rating: number;
    comment: string;
  };
}

const AddReviewModal: React.FC<Props> = ({
  open,
  onOpenChange,
  selectedProductId,
  onProductChange,
  onReviewSubmitted,
  reviewToEdit,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [rating, setRating] = useState<number>(reviewToEdit?.rating || 1);
  const [comment, setComment] = useState<string>(reviewToEdit?.comment || "");

  // Load products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/products");
        const productsArray = Array.isArray(res.data)
          ? res.data
          : res.data?.data || [];
        setProducts(productsArray);
      } catch (err) {
        console.error(err);
      }
    };
    loadProducts();
  }, []);

  // Pre-fill modal if editing
  useEffect(() => {
    const updateState = () => {
      if (reviewToEdit) {
        setRating(reviewToEdit.rating);
        setComment(reviewToEdit.comment);
        onProductChange(reviewToEdit.product_id);
      } else {
        setRating(1);
        setComment("");
      }
    };

    const timer = setTimeout(updateState, 0); // run after current render
    return () => clearTimeout(timer);
  }, [reviewToEdit, onProductChange]);

  const submitReview = async () => {
    try {
      if (reviewToEdit) {
        // Update
        await axios.put(
          `http://localhost:3000/api/v1/reviews/${reviewToEdit.id}`,
          {
            product_id: selectedProductId,
            rating,
            comment,
          },
          { withCredentials: true },
        );
        toast.success("Review updated successfully");
      } else {
        // Create
        await axios.post(
          "http://localhost:3000/api/v1/reviews",
          {
            product_id: selectedProductId,
            rating,
            comment,
          },
          { withCredentials: true },
        );
        toast.success("Review added successfully");
      }

      onOpenChange(false);
      onReviewSubmitted();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {reviewToEdit ? "Edit Review" : "Add Review"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Product Dropdown */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Product</label>
            <select
              className="border rounded p-2 w-full dark:bg-black"
              value={selectedProductId || ""}
              onChange={(e) => onProductChange(Number(e.target.value))}
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">
              Rating (1-5)
            </label>
            <Input
              type="number"
              min={1}
              max={5}
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            />
          </div>

          {/* Comment */}
          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Comment</label>
            <Textarea
              value={comment || ""}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Good product..."
            />
          </div>

          <Button onClick={submitReview} className="w-full">
            {reviewToEdit ? "Update Review" : "Submit Review"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddReviewModal;
