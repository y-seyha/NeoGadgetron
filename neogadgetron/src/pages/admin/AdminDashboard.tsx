import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
} from "recharts";
import MainLayout from "@/components/layout/MainLayout";
import { useNavigate } from "react-router-dom";

interface Kpi {
  title: string;
  value: string | number;
  change?: string;
}

interface PaymentMethod {
  method: string;
  count: number | string;
}

interface OrderStatus {
  status: string;
  count: number | string;
}

interface RecentOrder {
  id: number;
  email: string;
  total_price: string;
  status: string;
  created_at: string;
}

interface TopProduct {
  name: string;
  revenue: number;
}

interface DashboardData {
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

// Colors for order status pie chart
const statusColors: Record<string, string> = {
  pending: "#facc15",
  delivered: "#3b82f6",
  completed: "#22c55e",
  cancelled: "#ef4444",
};

export default function AdminDashboard() {
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchDashboard = () => {
    setLoading(true);
    axios
      .get("http://localhost:3000/api/v1/admin/dashboard", {
        withCredentials: true,
      })
      .then((res) => {
        setDashboard(res.data);
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

  // Prepare KPI data
  const kpis = useMemo<Kpi[]>(
    () => [
      { title: "Revenue", value: `$${dashboard?.kpis?.revenue || 0}` },
      { title: "Orders", value: dashboard?.kpis?.orders || 0 },
      { title: "Users", value: dashboard?.kpis?.users || 0 },
      { title: "Payments", value: dashboard?.kpis?.payments || 0 },
    ],
    [dashboard?.kpis],
  );

  // Generate stable random widths for KPIs
  const [kpiWidths] = useState(() =>
    kpis.map(() => Math.floor(Math.random() * 80 + 20)),
  );

  if (loading) return <div className="p-6">Loading dashboard...</div>;

  // Chart data
  const paymentData =
    dashboard?.paymentMethods?.map((p) => ({
      name: p.method,
      value: Number(p.count),
    })) || [];

  const orderStatusData =
    dashboard?.orderStatus?.map((o) => ({
      name: o.status.charAt(0).toUpperCase() + o.status.slice(1),
      value: Number(o.count),
      rawStatus: o.status,
    })) || [];

  const trendData =
    dashboard?.trend?.map((t) => ({
      date: new Date(t.date).toLocaleDateString(),
      revenue: Number(t.revenue),
      orders: Number(t.orders),
    })) || [];

  const topProducts = dashboard?.topProducts || [];

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex gap-4">
            <Button variant="outline">Notifications</Button>
            <Button>Welcome</Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-between items-center">
          <Tabs defaultValue="today">
            <TabsList>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="7days">7 Days</TabsTrigger>
              <TabsTrigger value="30days">30 Days</TabsTrigger>
              <TabsTrigger value="custom">Custom</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" onClick={fetchDashboard}>
            Refresh
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, i) => {
            const color =
              kpi.title === "Revenue"
                ? "from-green-400 to-green-600"
                : kpi.title === "Orders"
                  ? "from-blue-400 to-blue-600"
                  : kpi.title === "Users"
                    ? "from-purple-400 to-purple-600"
                    : "from-yellow-400 to-yellow-600";

            return (
              <Card
                key={i}
                className="relative rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100 dark:border-gray-700"
              >
                <div
                  className={`absolute -top-6 -right-6 w-32 h-32 rounded-full opacity-20 bg-gradient-to-tr ${color}`}
                />

                <CardHeader className="flex justify-between items-start z-10 relative">
                  <CardTitle className="text-sm text-gray-500 dark:text-gray-400">
                    {kpi.title}
                  </CardTitle>
                  <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-full">
                    <span className="text-gray-500 dark:text-gray-300">
                      {i + 1}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col gap-4 z-10 relative">
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-extrabold text-gray-900 dark:text-white">
                      {kpi.value}
                    </div>
                    <div
                      className={`p-2 rounded-full bg-gradient-to-br ${color} text-white`}
                    >
                      💹
                    </div>
                  </div>

                  
                  <div className="h-3 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-3 rounded-full bg-gradient-to-r ${color} animate-[grow_1s_ease-in-out]`}
                      style={{ width: `${kpiWidths[i]}%` }}
                    />
                  </div>

                  {kpi.change && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {kpi.change}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Row 2: Revenue chart + Payment Methods */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Revenue & Orders Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={trendData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#82ca9d"
                    />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="revenue"
                      stroke="#8884d8"
                      name="Revenue"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="orders"
                      stroke="#82ca9d"
                      name="Orders"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={3}
                      label={({ name = "", percent = 0 }) =>
                        `${name.toUpperCase()}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {paymentData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={
                            entry.name === "cc"
                              ? "#22c55e"
                              : entry.name === "bak"
                                ? "#3b82f6"
                                : entry.name === "cod"
                                  ? "#facc15"
                                  : "#8884d8"
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Row 3: Top Products + Order Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Products</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {topProducts.map((p: TopProduct, i: number) => {
                const maxRevenue = Math.max(
                  ...topProducts.map((p) => p.revenue),
                );
                const widthPercent = (p.revenue / maxRevenue) * 100;

                return (
                  <div key={i}>
                    <p className="text-sm font-medium">{p.name}</p>
                    <div className="h-2 bg-gray-200 rounded">
                      <div
                        className="h-2 bg-black rounded"
                        style={{ width: `${widthPercent}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500">${p.revenue}</p>
                  </div>
                );
              })}
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={orderStatusData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                      label={({ name = "", percent = 0 }) =>
                        `${name}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {orderStatusData.map((entry, index) => (
                        <Cell
                          key={index}
                          fill={statusColors[entry.rawStatus] || "#8884d8"}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Row 4: Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto">
              <div className="grid grid-cols-6 font-semibold border-b pb-2">
                <div>ID</div>
                <div>Customer</div>
                <div>Amount</div>
                <div>Status</div>
                <div>Date</div>
                <div>Action</div>
              </div>

              {dashboard?.recentOrders?.map((order) => (
                <div
                  key={order.id}
                  className="grid grid-cols-6 py-2 border-b text-sm"
                >
                  <div>#{order.id}</div>
                  <div>{order.email}</div>
                  <div>${order.total_price}</div>
                  <div
                    className={
                      order.status === "completed"
                        ? "text-green-500"
                        : order.status === "cancelled"
                          ? "text-red-500"
                          : "text-yellow-500"
                    }
                  >
                    {order.status}
                  </div>
                  <div>{new Date(order.created_at).toLocaleDateString()}</div>
                  <div>
                    <Button size="sm" onClick={() => navigate("/admin/orders")}>
                      View
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Row 5: Insights + Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Top category: {dashboard?.insights?.topCategory}</p>
              <p>• Peak order hour: {dashboard?.insights?.peakHour}:00</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity Feed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              {dashboard?.activityFeed?.map((activity, index) => (
                <p key={index}>• {activity}</p>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
