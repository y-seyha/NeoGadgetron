import { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "@/components/layout/MainLayout";
import TopCards from "@/components/SellerDashboard/TopCard";
import OrdersTable from "@/components/SellerDashboard/OrdersTable";
import UpdateStatusModal from "@/components/SellerDashboard/UpdateStatusModal";
import type { Analytics, OrderItem } from "@/types";

const SellerDashboard = () => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null);

  const fetchOrders = async (): Promise<OrderItem[]> => {
    const res = await axios.get("http://localhost:3000/api/v1/sellers/orders", {
      withCredentials: true,
    });
    return res.data.orders;
  };

  const fetchAnalytics = async (): Promise<Analytics> => {
    const res = await axios.get(
      "http://localhost:3000/api/v1/sellers/analytics",
      { withCredentials: true },
    );
    return res.data;
  };

  useEffect(() => {
    const init = async () => {
      try {
        const [ordersData, analyticsData] = await Promise.all([
          fetchOrders(),
          fetchAnalytics(),
        ]);

        setOrders(ordersData);
        console.log("Fetched orders:", ordersData);
        setAnalytics(analyticsData);
      } catch (err) {
        console.error(err);
      }
    };

    init();
  }, []);

  // Use a handler for updating status
  const handleStatusUpdate = (updatedItem: OrderItem) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.order_item_id === updatedItem.order_item_id ? { ...updatedItem } : o,
      ),
    );
    setSelectedItem(null);
  };

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        <TopCards analytics={analytics} />
        <OrdersTable orders={orders} onUpdate={setSelectedItem} />

        {selectedItem && (
          <UpdateStatusModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onSuccess={handleStatusUpdate}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default SellerDashboard;
