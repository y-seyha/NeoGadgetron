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

  // Show loader while checking auth
  if (isLoading) return <div>Loading...</div>;

  // Guest-only pages
  if (guestOnly && isAuthenticated) return <Navigate to="/" replace />;

  // Protected routes (must be logged in)
  if (!guestOnly && !isAuthenticated) return <Navigate to="/login" replace />;

  // Role check
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
