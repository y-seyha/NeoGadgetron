import { Link, useNavigate } from "react-router-dom";
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
import React, { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import type { AxiosError } from "axios";
import SocialButon from "@/components/Authentication/SocialButton";

export default function Signup() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmedPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);
      await register({
        first_name: form.firstName,
        last_name: form.lastName,
        email: form.email,
        password: form.password,
      });
      toast("Acccount created successfully");
      navigate("/");
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(
        err.response?.data?.message || "Signup failed, Please try again",
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted/40 to-muted px-4">
      <Card className="w-full max-w-md shadow-2xl border-muted/60">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold">
            Create Your Account
          </CardTitle>
          <CardDescription>
            Sign up to start your shopping experience
          </CardDescription>
        </CardHeader>

        <form>
          <CardContent className="space-y-5">
            {/* First Name */}
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="John"
                className="h-11"
              />
            </div>

            {/* Last Name */}
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Doe"
                className="h-11"
              />
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="john@example.com"
                className="h-11"
              />
            </div>

            {/* Password */}
            <div className="grid gap-2 mb-5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                className="h-11"
              />
            </div>
            <div className="grid gap-2 mb-5">
              <Label htmlFor="confirmedPassword">Confirmed Password</Label>
              <Input
                id="confirmedPassword"
                value={form.confirmedPassword}
                onChange={handleChange}
                type="confirmedPassword"
                className="h-11"
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-5">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 text-base"
              onClick={handleSubmit}
            >
              {" "}
              {loading ? "Creating..." : "Create Account"}
            </Button>

            {/* Divider */}
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or sign up with
                </span>
              </div>
            </div>

            {/* Social Signup */}
            <SocialButon />

            <p className="text-sm text-muted-foreground text-center">
              Already have an account?{" "}
              <Link
                to="/"
                className="font-medium text-foreground hover:underline"
              >
                Login
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
