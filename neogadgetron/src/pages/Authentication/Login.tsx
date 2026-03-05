import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from "react-icons/fa";
import type { AxiosError } from "axios";
import { toast } from "sonner";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success(`Welcome back, ${email}!`); // ✅ success toast
      navigate("/");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Login failed"); // ✅ error toast
    } finally {
      setLoading(false);
      setError(null)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted/40 to-muted px-4">
      <Card className="w-full max-w-md shadow-2xl border-muted/60 backdrop-blur-sm">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in to continue to your account</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            {error && (
              <p className="text-red-600 text-center text-sm">{error}</p>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@gmail.com"
                className="h-11"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2 mb-5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-muted-foreground hover:text-foreground transition"
                >
                  Forgot?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                className="h-11"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                required
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-5 space-y-2">
            <Button
              type="submit"
              className="w-full h-11 text-base"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>

            {/* Divider */}
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Social Buttons */}
            <div className="grid gap-3 w-full">
              <Button
                variant="outline"
                className="w-full h-11"
                onClick={() =>
                  window.open(
                    `${import.meta.env.VITE_API_URL}/auth/google`,
                    "_self",
                  )
                }
              >
                <FcGoogle size={20} /> Continue with Google
              </Button>
              <Button
                variant="outline"
                className="w-full h-11"
                onClick={() =>
                  window.open(
                    `${import.meta.env.VITE_API_URL}/auth/facebook`,
                    "_self",
                  )
                }
              >
                <FaFacebook size={20} className="text-blue-600" /> Continue with
                Facebook
              </Button>
              <Button
                variant="outline"
                className="w-full h-11"
                onClick={() =>
                  window.open(
                    `${import.meta.env.VITE_API_URL}/auth/github`,
                    "_self",
                  )
                }
              >
                <FaGithub size={20} /> Continue with GitHub
              </Button>
            </div>

            <p className="text-sm text-muted-foreground text-center">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-foreground hover:underline"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
