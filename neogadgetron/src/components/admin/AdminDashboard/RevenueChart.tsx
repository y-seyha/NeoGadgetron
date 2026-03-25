import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function RevenueChart({ trend }: any) {
  const data =
    trend?.map((t: any) => ({
      date: new Date(t.date).toLocaleDateString(),
      revenue: Number(t.revenue),
      orders: Number(t.orders),
    })) || [];

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Revenue & Orders Trend</CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dataKey="revenue" name="Revenue" />
            <Line dataKey="orders" name="Orders" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
