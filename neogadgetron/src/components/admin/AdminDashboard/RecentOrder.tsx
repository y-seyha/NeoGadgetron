import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function RecentOrders({ data }: any) {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {data?.map((order: any) => (
          <div
            key={order.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <span>#{order.id}</span>
            <span>{order.email}</span>
            <span>${order.total_price}</span>
            <Button size="sm" onClick={() => navigate("/admin/orders")}>
              View
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}