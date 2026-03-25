import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function Insights({ data }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Insights</CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-2">
        <p>• Top category: {data?.topCategory}</p>
        <p>• Peak hour: {data?.peakHour}:00</p>
      </CardContent>
    </Card>
  );
}