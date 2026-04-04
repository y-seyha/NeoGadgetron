import { Button } from "@/components/ui/button";
import { FaBell, FaSyncAlt } from "react-icons/fa";

interface Props {
  adminName?: string;
  onRefresh?: () => void;
  notificationsCount?: number;
}

export default function DashboardHeader({
  adminName = "Admin",
  onRefresh,
  notificationsCount = 0,
}: Props) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
      {/* Title and Welcome */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome back, {adminName}!</p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        {/* Refresh Button */}
        {onRefresh && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            className="flex items-center gap-2"
          >
            <FaSyncAlt /> Refresh
          </Button>
        )}

        {/* Notifications */}
        <Button
          variant="outline"
          size="sm"
          className="relative flex items-center gap-2"
        >
          <FaBell />
          Notifications
          {notificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notificationsCount}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
