import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function OAuthRedirect() {
  const { refreshUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await refreshUser();
        toast.success("Login successful!");
        navigate("/", { replace: true });
      } catch {
        toast.error("Login failed. Please try again.");
        navigate("/login", { replace: true });
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Logging in, please wait...
    </div>
  );
}
