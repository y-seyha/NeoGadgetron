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
import { FaGithub, FaFacebook } from "react-icons/fa";

export default function Signup() {
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
              <Input id="firstName" placeholder="John" className="h-11" />
            </div>

            {/* Last Name */}
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" className="h-11" />
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                className="h-11"
              />
            </div>

            {/* Password */}
            <div className="grid gap-2 mb-5">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" className="h-11" />
            </div>
            <div className="grid gap-2 mb-5">
              <Label htmlFor="confirmedPassword">Confirmed Password</Label>
              <Input
                id="confirmedPassword"
                type="confirmedPassword"
                className="h-11"
              />
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-5">
            <Button className="w-full h-11 text-base">Create Account</Button>

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
            <div className="grid gap-3 w-full">
              <Button
                variant="outline"
                className="w-full h-11 flex items-center gap-2"
              >
                <FcGoogle size={20} />
                Continue with Google
              </Button>

              <Button variant="outline" className="w-full h-11">
                <FaFacebook size={20} className="text-blue-600" /> Continue with
                Facebook
              </Button>

              <Button
                variant="outline"
                className="w-full h-11 flex items-center gap-2"
              >
                <FaGithub size={20} />
                Continue with GitHub
              </Button>
            </div>

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
