import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { OrderItem } from "@/types";

const OrdersTable = ({
  orders,
  onUpdate,
}: {
  orders: OrderItem[];
  onUpdate: (item: OrderItem) => void;
}) => {
  return (
    <div className="bg-card border rounded-xl">
      {/* Header */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4 border-b font-semibold text-sm text-muted-foreground">
        <div>Order ID</div>
        <div>Product</div>
        <div>Qty</div>
        <div>Price</div>
        <div>Status</div>
        <div>Action</div>
      </div>

      {/* Body */}
      <div className="divide-y">
        {orders.map((item) => (
          <div
            key={item.order_item_id}
            className="grid grid-cols-2 md:grid-cols-6 gap-4 p-4 items-center"
          >
            <div>#{item.order_id}</div>
            <div className="font-medium">{item.product_name}</div>
            <div>{item.quantity}</div>
            <div>${item.item_price}</div>

            <div>
              <Badge
                variant={
                  item.status === "pending"
                    ? "secondary"
                    : item.status === "shipped"
                      ? "default"
                      : item.status === "delivered"
                        ? "link"
                        : item.status === "canceled"
                          ? "destructive"
                          : "outline"
                }
              >
                {item.status.toUpperCase()}
              </Badge>
            </div>

            <div>
              <Button size="sm" onClick={() => onUpdate(item)}>
                Update
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersTable;
