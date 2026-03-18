import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  guestOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
  guestOnly = false,
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  // 1️⃣ Show loader while checking auth
  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="text-gray-500">Checking authentication...</span>
      </div>
    );

  // 2️⃣ Guest-only pages (like login/register)
  if (guestOnly) {
    if (isAuthenticated) return <Navigate to="/" replace />;
    return <>{children}</>;
  }

  // 3️⃣ Protected routes (must be logged in)
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // 4️⃣ Role-based check
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // 5️⃣ All good, render children
  return <>{children}</>;
};

export default ProtectedRoute;
