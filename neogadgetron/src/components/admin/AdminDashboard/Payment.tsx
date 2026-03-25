import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import type { PaymentMethod } from "@/pages/admin/AdminDashboard";

interface Props {
  data?: PaymentMethod[];
}

interface ChartData {
  name: string;
  value: number;
}

const COLORS = ["#22c55e", "#3b82f6", "#facc15", "#a855f7", "#f43f5e"];

export default function PaymentChart({ data }: Props) {
  const chartData: ChartData[] =
    data?.map((p) => ({
      name: p.method.toUpperCase(),
      value: Number(p.count),
    })) || [];

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
      </CardHeader>

      <CardContent className="h-72 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              label={({ percent }) =>
                percent ? `${(percent * 100).toFixed(0)}%` : ""
              }
            >
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value: number | string | undefined) => [
                `${value ?? 0}`,
                "Count",
              ]}
            />

            <Legend />
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-xl font-bold">{total}</p>
        </div>
      </CardContent>
    </Card>
  );
}
