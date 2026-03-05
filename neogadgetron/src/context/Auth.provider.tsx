
import React, { useState, useEffect, type ReactNode, useRef } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { AuthContext, type AuthContextType } from "./Auth.context";
import { AUTH_API, USER_API } from "@/utils/apiPath";
import axios from "axios";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthContextType["user"]>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const hasRefreshed = useRef(false);

  // Refresh user
  const refreshUser = async () => {
    try {
      console.log("Refreshing user...");
      setIsLoading(true);
      const res = await axiosInstance.get(`${USER_API}/me`);
      setUser(res.data.data);
      setIsAuthenticated(true);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const axiosErr = err; 
        if (axiosErr.response?.status === 401) {
          setUser(null);
          setIsAuthenticated(false);
        } else {
          console.error(
            "Failed to refresh user:",
            axiosErr.message ?? "Unknown axios error",
          );
        }
      } else {
        console.error("Unknown error:", err);
      }
    } finally {
      setIsLoading(false);
      console.log("Refresh user finished");
    }
  };

  // Auto-refresh on first load (check cookie/session)
  useEffect(() => {
    if (!hasRefreshed.current) {
      hasRefreshed.current = true;
      refreshUser();
    }
  }, []);

  // Login
  const login = async (email: string, password: string) => {
    const res = await axiosInstance.post(`${USER_API}/login`, {
      email,
      password,
    });
    await refreshUser();
    setUser(res.data.data);
    setIsAuthenticated(true);
  };

  // Register
  const register = async (data: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }) => {
    const res = await axiosInstance.post(`${USER_API}/register`, data);
    await refreshUser();
    setUser(res.data.data);
    setIsAuthenticated(true);
  };

  // Logout
  const logout = async () => {
    await axiosInstance.post(`${AUTH_API}/logout`);
    setUser(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
