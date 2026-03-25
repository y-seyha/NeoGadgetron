import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function KpiCards({ kpis }: any) {
  const data = [
    { title: "Revenue", value: `$${kpis?.revenue || 0}` },
    { title: "Orders", value: kpis?.orders || 0 },
    { title: "Users", value: kpis?.users || 0 },
    { title: "Payments", value: kpis?.payments || 0 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {data.map((kpi, i) => (
        <Card key={i}>
          <CardHeader>
            <CardTitle>{kpi.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{kpi.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
