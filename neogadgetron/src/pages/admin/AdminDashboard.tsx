import ActivityFeed from "@/components/admin/AdminDashboard/ActiviyFeed";
import DashboardFilters from "@/components/admin/AdminDashboard/DashboardFilters";
import DashboardHeader from "@/components/admin/AdminDashboard/DashboardHeader";
import Insights from "@/components/admin/AdminDashboard/Insights";
import KpiCards from "@/components/admin/AdminDashboard/KpiCards";
import OrderStatusChart from "@/components/admin/AdminDashboard/OrderStatusChart";
import PaymentChart from "@/components/admin/AdminDashboard/Payment";
import RecentOrders from "@/components/admin/AdminDashboard/RecentOrder";
import RevenueChart from "@/components/admin/AdminDashboard/RevenueChart";
import TopProducts from "@/components/admin/AdminDashboard/TopProducts";
import MainLayout from "@/components/layout/MainLayout";
import axios from "axios";
import { useEffect, useState } from "react";

export interface PaymentMethod {
  method: string;
  count: number | string;
}

export interface OrderStatus {
  status: string;
  count: number | string;
}

export interface RecentOrder {
  id: number;
  email: string;
  total_price: string;
  status: string;
  created_at: string;
}

export interface TopProduct {
  name: string;
  revenue: number;
}

export interface DashboardData {
  kpis: {
    revenue: string;
    orders: string;
    users: string;
    payments: string;
  };
  paymentMethods: PaymentMethod[];
  orderStatus: OrderStatus[];
  recentOrders: RecentOrder[];
  trend?: { date: string; revenue: string; orders: string }[];
  insights?: { topCategory: string; peakHour: string };
  activityFeed?: string[];
  topProducts?: TopProduct[];
}

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = () => {
    setLoading(true);
    axios
      .get("http://localhost:3000/api/v1/admin/dashboard", {
        withCredentials: true,
      })
      .then((res) => {
        setDashboard(res.data);
        console.log("Order status from API:", res.data.orderStatus);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="p-6">Loading dashboard...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <DashboardHeader onRefresh={fetchDashboard} />

        {/* Filters */}
        <DashboardFilters />

        {/* KPI */}
        <KpiCards kpis={dashboard?.kpis} />

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <RevenueChart trend={dashboard?.trend} />
          <PaymentChart data={dashboard?.paymentMethods} />
        </div>

        {/* Products + Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <TopProducts data={dashboard?.topProducts} />
          <OrderStatusChart data={dashboard?.orderStatus} />
        </div>

        {/* Orders */}
        <RecentOrders data={dashboard?.recentOrders} />

        {/* Insights + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Insights data={dashboard?.insights} />
          <ActivityFeed data={dashboard?.activityFeed} />
        </div>
      </div>
    </MainLayout>
  );
}
