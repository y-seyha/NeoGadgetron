import { Card, CardContent } from "@/components/ui/card";
import type { Analytics } from "@/types";

const TopCards = ({ analytics }: { analytics: Analytics | null }) => {
  if (!analytics) return <p>Loading...</p>;

  const totalOrders = analytics.revenue?.total_orders || 0;
  const totalRevenue = analytics.revenue?.total_revenue || 0;
  const totalReviews = analytics.reviews?.length || 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-4">
          <p className="text-muted-foreground">Total Orders</p>
          <h2 className="text-2xl font-bold">{totalOrders}</h2>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-muted-foreground">Total Revenue</p>
          <h2 className="text-2xl font-bold">${totalRevenue}</h2>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-muted-foreground">Total Reviews</p>
          <h2 className="text-2xl font-bold">{totalReviews}</h2>
        </CardContent>
      </Card>
    </div>
  );
};

export default TopCards;
