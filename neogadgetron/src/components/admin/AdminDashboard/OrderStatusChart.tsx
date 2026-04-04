import { PieChart, Pie, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

const statusColors: Record<string, string> = {
  pending: "#facc15",
  shipped: "#3b82f6",
  completed: "#22c55e",
  cancelled: "#ef4444",
};

// Labels for display
const statusLabels: Record<string, string> = {
  pending: "Pending",
  shipped: "Shipped",
  completed: "Completed",
  cancelled: "Cancelled",
};

export default function OrderStatusChart({ data }: any) {
  // Pre-fill all statuses with 0
  const defaultStatuses = Object.keys(statusColors).map((status) => ({
    name: status,
    value: 0,
  }));

  // Merge with actual data
  const chartData = defaultStatuses.map((statusObj) => {
    const found = data?.find((o: any) => o.status === statusObj.name);
    return {
      name: statusObj.name,
      value: found ? Number(found.count) : 0,
    };
  });

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Order Status</CardTitle>
      </CardHeader>
      <CardContent className="h-60 flex flex-col items-center justify-center">
        <div className="w-full h-40">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name">
                {chartData.map((entry: any, index: number) => (
                  <Cell
                    key={index}
                    fill={statusColors[entry.name] || "#8884d8"}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: any, name: any) => [
                  value,
                  statusLabels[name],
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex gap-4 mt-4 flex-wrap justify-center">
          {chartData.map((entry: any) => (
            <div key={entry.name} className="flex items-center gap-1">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: statusColors[entry.name] }}
              ></span>
              <span className="text-sm">{statusLabels[entry.name]}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
