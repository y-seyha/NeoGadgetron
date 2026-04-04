import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import type { Review } from "@/types";
import ReviewList from "@/components/Review/ReviewList";
import AddReviewModal from "@/components/Review/ReviewModal";
import { useAuth } from "@/hooks/useAuth";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ReviewPage() {
  const { user } = useAuth();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState<number>(0);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);

  const currentUser = user ? { id: user.id, role: user.role } : null;

  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/reviews/paginated?page=${page}&pageSize=${pageSize}`,
        { withCredentials: true },
      );

      setReviews(res.data.data || []);
      const total = res.data.total || 0;
      const pageSizeRes = res.data.pageSize || pageSize;
      setTotalPages(Math.ceil(total / pageSizeRes));
    } catch (error) {
      console.error("Failed to fetch reviews", error);
      setReviews([]);
    }
  };

  useEffect(() => {
    const load = async () => {
      await fetchReviews();
    };
    load();
  }, [page]);

  const handleReviewSubmitted = async () => {
    setPage(1); // reset to first page to ensure the new review appears
    await fetchReviews();
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Reviews</h2>
          <Button onClick={() => setOpen(true)}>Add Review</Button>
        </div>

        {/* Review List */}
        <ReviewList
          reviews={reviews}
          currentUser={currentUser}
          onDeleted={fetchReviews}
          onUpdated={fetchReviews}
        />

        {/* Pagination */}
        <div className="flex justify-center gap-4 mt-6">
          <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
            <FaChevronLeft />
          </Button>

          <span className="flex items-center">
            Page {page} / {totalPages}
          </span>

          <Button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            <FaChevronRight />
          </Button>
        </div>

        {/* Modal */}
        <AddReviewModal
          open={open}
          onOpenChange={setOpen}
          selectedProductId={productId}
          onProductChange={setProductId}
          onReviewSubmitted={handleReviewSubmitted}
        />
      </div>
    </MainLayout>
  );
}
