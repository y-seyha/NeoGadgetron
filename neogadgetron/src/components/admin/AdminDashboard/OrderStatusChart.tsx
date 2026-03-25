import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

const statusColors: Record<string, string> = {
  pending: "#facc15",
  delivered: "#3b82f6",
  completed: "#22c55e",
  cancelled: "#ef4444",
};

export default function OrderStatusChart({ data }: any) {
  const chartData =
    data?.map((o: any) => ({
      name: o.status,
      value: Number(o.count),
    })) || [];

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Order Status</CardTitle>
      </CardHeader>
      <CardContent className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} dataKey="value">
              {chartData.map((entry: any, index: number) => (
                <Cell
                  key={index}
                  fill={statusColors[entry.name] || "#8884d8"}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
