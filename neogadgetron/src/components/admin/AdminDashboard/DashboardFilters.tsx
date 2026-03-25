import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardFilters() {
  return (
    <div className="flex justify-between items-center">
      <Tabs defaultValue="today">
        <TabsList>
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="7days">7 Days</TabsTrigger>
          <TabsTrigger value="30days">30 Days</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}