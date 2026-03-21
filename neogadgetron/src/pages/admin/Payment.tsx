import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import MainLayout from "@/components/layout/MainLayout";
import { Edit, Trash2 } from "lucide-react";


type Payment = {
  payment_id: number;
  payment_amount: string;
  payment_method: string;
  payment_status: string;
  payment_paid_at: string | null;
  payment_created_at: string;
  order_id: number;
  order_total: string;
  order_status: string;
  user_id: string;
  user_first_name: string;
  user_last_name: string;
  user_email: string;
};

// Admin Payments Page
export default function AdminPaymentPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [totalPages, setTotalPages] = useState(1);

  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);


  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/payments/paginated?page=${page}&pageSize=${pageSize}`,
        { withCredentials: true },
      );
      setPayments(res.data.data);
      setTotalPages(Math.ceil(res.data.total / pageSize));
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [page]);


  const openEditModal = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsEditOpen(true);
  };

  const openDeleteModal = (payment: Payment) => {
    setSelectedPayment(payment);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedPayment) return;
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/payments/${selectedPayment.payment_id}`,
        { withCredentials: true },
      );
      toast.success("Payment deleted successfully!");
      setIsDeleteOpen(false);
      fetchPayments();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Failed to delete payment",
        );
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  const handleUpdateStatus = async (status: string) => {
    if (!selectedPayment) return;
    try {
      await axios.put(
        `http://localhost:3000/api/v1/payments/${selectedPayment.payment_id}`,
        { status },
        { withCredentials: true },
      );
      toast.success("Payment status updated!");
      setIsEditOpen(false);
      fetchPayments();
    } catch (error: unknown) {
      console.error(error);
      toast.error("Failed to update payment status");
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Manage Payments
        </h1>

        {/* Payments Table */}
        <div className="overflow-auto border rounded dark:border-gray-700">
          {/* Header */}
          <div className="grid grid-cols-[200px_200px_200px_200px_200px_150px_150px_200px_112px] bg-gray-100 dark:bg-gray-900 text-sm font-semibold border-b sticky top-0 z-10">
            <div className="px-4 py-2">Payment ID</div>
            <div className="px-4 py-2">Amount</div>
            <div className="px-4 py-2">Method</div>
            <div className="px-4 py-2">Status</div>
            <div className="px-4 py-2">Paid At</div>
            <div className="px-4 py-2">Order ID</div>
            <div className="px-4 py-2">Order Total</div>
            <div className="px-4 py-2">Customer</div>
            <div className="px-4 py-2 text-center">Actions</div>
          </div>

          {/* Rows */}
          {loading ? (
            <div className="p-10 text-center">Loading payments...</div>
          ) : payments.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No payments found
            </div>
          ) : (
            payments.map((p) => (
              <div
                key={p.payment_id}
                className="grid grid-cols-[200px_200px_200px_200px_200px_150px_150px_200px_112px] items-center border-b hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
              >
                <div className="px-4 py-2">{p.payment_id}</div>
                <div className="px-4 py-2 font-semibold">
                  ${p.payment_amount}
                </div>
                <div className="px-4 py-2 capitalize">{p.payment_method}</div>
                <div className="px-4 py-2 capitalize">{p.payment_status}</div>
                <div className="px-4 py-2 text-xs">
                  {p.payment_paid_at
                    ? new Date(p.payment_paid_at).toLocaleDateString()
                    : "N/A"}
                </div>
                <div className="px-4 py-2">{p.order_id}</div>
                <div className="px-4 py-2 font-semibold">${p.order_total}</div>
                <div className="px-4 py-2 truncate">
                  {p.user_first_name} {p.user_last_name}
                </div>
                <div className="px-4 py-2 flex gap-2 justify-end">
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

      {/* Modals */}
      {isEditOpen && selectedPayment && (
        <PaymentStatusModal
          open={isEditOpen}
          payment={selectedPayment}
          onClose={() => setIsEditOpen(false)}
          onSubmit={handleUpdateStatus}
        />
      )}
      {isDeleteOpen && selectedPayment && (
        <DeleteConfirmModal
          open={isDeleteOpen}
          productName={`Payment #${selectedPayment.payment_id}`}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </MainLayout>
  );
}

// Edit Status Modal 
function PaymentStatusModal({
  payment,
  open,
  onClose,
  onSubmit,
}: {
  payment: Payment;
  open: boolean;
  onClose: () => void;
  onSubmit: (status: string) => void;
}) {
  const [status, setStatus] = useState(payment.payment_status);

  const handleSubmit = () => {
    onSubmit(status);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md space-y-5">
        <DialogHeader>
          <DialogTitle>Update Payment Status</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <Label>Status</Label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border px-3 py-2 rounded dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 w-full"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-primary text-white" onClick={handleSubmit}>
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Delete Confirm Modal 
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
