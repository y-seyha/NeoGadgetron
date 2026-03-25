import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function TopProducts({ data }: any) {
  const maxRevenue = Math.max(...(data?.map((p: any) => p.revenue) || [1]));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {data?.map((p: any, i: number) => {
          const width = (p.revenue / maxRevenue) * 100;

          return (
            <div key={i}>
              <p className="text-sm font-medium">{p.name}</p>
              <div className="h-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-black rounded"
                  style={{ width: `${width}%` }}
                />
              </div>
              <p className="text-xs text-gray-500">${p.revenue}</p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}