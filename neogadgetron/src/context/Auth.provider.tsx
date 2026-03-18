import { useEffect, useState, type ReactNode, useCallback } from "react";
import axios from "axios";
import { AuthContext, type User } from "./Auth.context";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const api = axios.create({
    baseURL: "http://localhost:3000/api/v1/auth",
    withCredentials: true,
  });

  // --- Request interceptor to attach token ---
  api.interceptors.request.use((config) => {
    if (accessToken) {
      config.headers = config.headers ?? {};
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  });

  // --- Response interceptor for 401 / refresh ---
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshRes = await axios.get(
            "http://localhost:3000/api/v1/auth/refresh-token",
            { withCredentials: true },
          );
          const newToken = refreshRes.data.accessToken;
          setAccessToken(newToken);
          localStorage.setItem("accessToken", newToken);

          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return api.request(originalRequest);
        } catch {
          setUser(null);
          setAccessToken(null);
          localStorage.removeItem("accessToken");
          return Promise.reject(error);
        }
      }
      return Promise.reject(error);
    },
  );

  const checkAuth = useCallback(async () => {
    try {
      const refreshRes = await axios.get(
        "http://localhost:3000/api/v1/auth/refresh-token",
        { withCredentials: true },
      );

      const token = refreshRes.data.accessToken;

      setAccessToken(token);

      const meRes = await api.get("/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(meRes.data.user);
    } catch {
      setUser(null);
      setAccessToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void checkAuth();
  }, [checkAuth]);

  // --- Login ---
  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("/login", { email, password });

      const token = res.data.accessToken;
      if (!token) throw new Error("No access token returned");

      setAccessToken(token);
      localStorage.setItem("accessToken", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setUser(res.data.user);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data?.message || "Login failed");
      }

      throw new Error("Unexpected error");
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
    role?: string,
  ) => {
    try {
      const res = await api.post("/register", { name, email, password, role });

      // No token returned, just return message
      return res.data.message; // "User registered successfully. Please verify your email."
    } catch (err) {
      if (axios.isAxiosError(err)) {
        throw new Error(err.response?.data?.message || "Signup failed");
      } else {
        throw new Error("Unexpected error");
      }
    }
  };

  // --- Logout ---
  const logout = async () => {
    await api.post("/logout", {}, { withCredentials: true });
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        setUser,
        setAccessToken,
        isAuthenticated: !!user,
        isLoading: loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
