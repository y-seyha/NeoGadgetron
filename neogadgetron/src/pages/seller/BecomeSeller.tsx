import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const BecomeSeller = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    store_name: "",
    store_description: "",
    store_address: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { ...form };

      const response = await axios.put(
        "http://localhost:3000/api/v1/sellers/become",
        payload,
        { withCredentials: true },
      );

      console.log("Success:", response.data);

      toast.success("Store created successfully! You are now a seller.");
      if (user) {
        setUser({ ...user, role: "seller" });
      }
      navigate("/seller/me");
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-background">
      <Card className="w-full max-w-2xl shadow-lg border">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold">Become a Seller</CardTitle>
          <CardDescription>
            Set up your store and start selling your products.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="store_name">Store Name</Label>
              <Input
                id="store_name"
                name="store_name"
                placeholder="Test Store"
                value={form.store_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="store_description">Store Description</Label>
              <Textarea
                id="store_description"
                name="store_description"
                placeholder="We sell amazing products"
                value={form.store_description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="store_address">Store Address</Label>
              <Input
                id="store_address"
                name="store_address"
                placeholder="123 Main St, Phnom Penh"
                value={form.store_address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="+85512345678"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full text-base"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Become Seller"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BecomeSeller;
