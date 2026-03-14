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
        await refreshUser(); //  fetches user using cookie
        // toast.success("Login successful!");
        navigate("/", { replace: true }); // go to homepage
      } catch {
        toast.error("Login failed. Please try again.");
        navigate("/login", { replace: true });
      }
    };
    fetchUser();
  }, [refreshUser, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      Logging in, please wait...
    </div>
  );
}
