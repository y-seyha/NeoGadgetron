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


type Order = {
  id: number;
  user_id: string;
  total_price: string;
  user_full_name: string;
  status: string;
  shipping_name: string;
  shipping_phone: string;
  shipping_address: string;
  shipping_city: string;
  created_at: string;
  updated_at: string;
};


export default function AdminOrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 5;
  const [totalPages, setTotalPages] = useState(1);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

 
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/orders/paginated?page=${page}&pageSize=${pageSize}`,
        { withCredentials: true },
      );
      setOrders(res.data.data);
      setTotalPages(Math.ceil(res.data.total / pageSize));
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  // Handlers 
  const openEditModal = (order: Order) => {
    setSelectedOrder(order);
    setIsEditOpen(true);
  };

  const openDeleteModal = (order: Order) => {
    setSelectedOrder(order);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedOrder) return;
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/orders/${selectedOrder.id}`,
        {
          withCredentials: true,
        },
      );
      toast.success("Order deleted successfully!");
      setIsDeleteOpen(false);
      fetchOrders();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to delete order");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  const handleUpdateStatus = async (status: string) => {
    if (!selectedOrder) return;
    try {
      await axios.put(
        `http://localhost:3000/api/v1/orders/${selectedOrder.id}`,
        { status },
        { withCredentials: true },
      );
      toast.success("Order status updated!");
      setIsEditOpen(false);
      fetchOrders();
    } catch (error: unknown) {
      console.error(error);
      toast.error("Failed to update order status");
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Manage Orders
        </h1>

        {/* Orders Table */}
        <div className="overflow-auto border rounded dark:border-gray-700">
          {/* Table Header */}
          <div className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr_1fr_1fr_112px] bg-gray-100 dark:bg-gray-900 text-sm font-semibold border-b sticky top-0 z-10">
            <div className="px-3 py-3">ID</div>
            <div className="px-3 py-3">User ID</div>
            <div className="px-3 py-3">Total Price</div>
            <div className="px-3 py-3">Status</div>
            <div className="px-3 py-3">Shipping Name</div>
            <div className="px-3 py-3">Phone</div>
            <div className="px-3 py-3">Address</div>
            <div className="px-3 py-3">Created</div>
            <div className="px-3 py-3 text-center">Actions</div>
          </div>

          {/* Table Rows */}
          {loading ? (
            <div className="p-10 text-center">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No orders found
            </div>
          ) : (
            orders.map((o) => (
              <div
                key={o.id}
                className="grid grid-cols-[80px_1fr_1fr_1fr_1fr_1fr_1fr_1fr_112px] items-center border-b hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
              >
                <div className="px-3 py-2">{o.id}</div>
                <div className="px-3 py-2 truncate">{o.user_full_name}</div>
                <div className="px-3 py-2 font-semibold">${o.total_price}</div>
                <div className="px-3 py-2 capitalize">{o.status}</div>
                <div className="px-3 py-2 truncate">{o.shipping_name}</div>
                <div className="px-3 py-2">{o.shipping_phone}</div>
                <div className="px-3 py-2 truncate max-w-[200px]">
                  {o.shipping_address}, {o.shipping_city}
                </div>
                <div className="px-3 py-2 text-xs">
                  {new Date(o.created_at).toLocaleDateString()}
                </div>
                <div className="px-3 py-2 flex gap-2 justify-center">
                  <Button variant="ghost" onClick={() => openEditModal(o)}>
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" onClick={() => openDeleteModal(o)}>
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
      {isEditOpen && selectedOrder && (
        <OrderStatusModal
          open={isEditOpen}
          order={selectedOrder}
          onClose={() => setIsEditOpen(false)}
          onSubmit={handleUpdateStatus}
        />
      )}
      {isDeleteOpen && selectedOrder && (
        <DeleteConfirmModal
          open={isDeleteOpen}
          productName={`Order #${selectedOrder.id}`}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </MainLayout>
  );
}

// Update Status Modal 
function OrderStatusModal({
  order,
  open,
  onClose,
  onSubmit,
}: {
  order: Order;
  open: boolean;
  onClose: () => void;
  onSubmit: (status: string) => void;
}) {
  const [status, setStatus] = useState(order.status);

  const handleSubmit = () => {
    onSubmit(status);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md space-y-5">
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <Label>Status</Label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border px-3 py-2 rounded dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 w-full"
          >
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
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
