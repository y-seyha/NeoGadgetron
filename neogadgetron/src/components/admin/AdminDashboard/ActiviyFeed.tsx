import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function ActivityFeed({ data }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Feed</CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-2">
        {data?.map((item: string, i: number) => (
          <p key={i}>• {item}</p>
        ))}
      </CardContent>
    </Card>
  );
}
