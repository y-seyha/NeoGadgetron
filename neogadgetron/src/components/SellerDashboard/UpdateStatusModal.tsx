import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";
import type { OrderItem } from "@/types";
import { toast } from "sonner";

const UpdateStatusModal = ({
  item,
  onClose,
  onSuccess,
}: {
  item: OrderItem;
  onClose: () => void;
  onSuccess: (updatedItem: OrderItem) => void;  
}) => {
  const [status, setStatus] = useState<"pending" | "shipped" | "delivered">(
    item.status as "pending" | "shipped" | "delivered",
  );
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const res = await axios.patch(
        "http://localhost:3000/api/v1/sellers/orders/status",
        {
          order_item_id: item.order_item_id,
          status,
        },
        { withCredentials: true },
      );
  

      const updatedItem: OrderItem = {
        id: res.data.item.id.toString(),
        order_item_id: res.data.item.id,  
        order_id: res.data.item.order_id,
        product_id: res.data.item.product_id,
        product_name: item.product_name,  
        quantity: res.data.item.quantity,
        item_price: res.data.item.price,
        status: res.data.item.status,
        created_at: res.data.item.created_at,
        updated_at: res.data.item.updated_at,
      };

      onSuccess(updatedItem); 
      toast.success("Updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Status</DialogTitle>
        </DialogHeader>

        <p>
          Product: <b>{item.product_name}</b>
        </p>

        <select
          className="w-full border p-2 rounded-md bg-background"
          value={status}
          onChange={(e) =>
            setStatus(e.target.value as "pending" | "shipped" | "delivered")
          }
        >
          {["pending", "shipped", "delivered"].map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateStatusModal;
