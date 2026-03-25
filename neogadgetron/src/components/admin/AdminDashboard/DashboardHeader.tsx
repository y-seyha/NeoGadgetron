import { Button } from "@/components/ui/button";

export default function DashboardHeader() {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex gap-4">
        <Button variant="outline">Notifications</Button>
        <Button>Welcome</Button>
      </div>
    </div>
  );
}
