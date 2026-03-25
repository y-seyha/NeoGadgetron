import { Card, CardContent } from "@/components/ui/card";
import type { Analytics } from "@/types";

const TopCards = ({ analytics }: { analytics: Analytics | null }) => {
  if (!analytics) return <p>Loading...</p>;

  const cards = [
    {
      title: "Total Orders",
      value: analytics.revenue?.total_orders || 0,
      bg: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Total Revenue",
      value: `$${analytics.revenue?.total_revenue || 0}`,
      bg: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Total Reviews",
      value: analytics.reviews?.length || 0,
      bg: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card) => (
        <Card
          key={card.title}
          className={`
          shadow-lg hover:shadow-xl transition p-4
          bg-white dark:bg-gray-800
        `}
        >
          <CardContent className="space-y-1">
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {card.title}
            </p>
            <h2
              className={`
              text-2xl font-bold
              ${card.textColor} dark:text-gray-200
            `}
            >
              {card.value}
            </h2>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default TopCards;
