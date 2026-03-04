import { Link } from "react-router-dom";
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

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted/40 to-muted px-4">
      <Card className="w-full max-w-md shadow-2xl border-muted/60 backdrop-blur-sm">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in to continue to your account</CardDescription>
        </CardHeader>

        <form>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className="h-11"
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
              <Input id="password" type="password" className="h-11" />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-5 space-y-2">
            <Button className="w-full h-11 text-base">Login</Button>

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
              <Button variant="outline" className="w-full h-11">
                <FcGoogle size={20} /> Continue with Google
              </Button>
              <Button variant="outline" className="w-full h-11">
                <FaFacebook size={20} className="text-blue-600" /> Continue with
                Facebook
              </Button>
              <Button variant="outline" className="w-full h-11">
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
