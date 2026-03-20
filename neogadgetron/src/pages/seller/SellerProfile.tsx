import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import MainLayout from "@/components/layout/MainLayout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Seller {
  id: string;
  store_name: string;
  store_description: string;
  store_address: string;
  phone: string | null;
  logo_url: string | null;
  created_at: string;
  updated_at: string;
}

const SellerProfile = () => {
  const [loading, setLoading] = useState(true);
  const [seller, setSeller] = useState<Seller | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    store_name: "",
    store_description: "",
    store_address: "",
    phone: "",
  });

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const { data } = await axios.get<{ seller: Seller }>(
          "http://localhost:3000/api/v1/sellers/me",
          { withCredentials: true },
        );
        setSeller(data.seller);
        setForm({
          store_name: data.seller.store_name || "",
          store_description: data.seller.store_description || "",
          store_address: data.seller.store_address || "",
          phone: data.seller.phone || "",
        });
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        toast.error(
          error.response?.data?.message || "Failed to load seller profile",
        );
      } finally {
        setLoading(false);
      }
    };

    void fetchSeller();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put("http://localhost:3000/api/v1/sellers/me", form, {
        withCredentials: true,
      });
      setSeller({ ...seller!, ...form });
      toast.success("Seller profile updated successfully!");
      setIsOpen(false);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <MainLayout>
      <div className="flex flex-col items-center w-full min-h-full pt-20">
        <Card className="w-full max-w-2xl">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-2xl font-bold">Seller Profile</CardTitle>
            <CardDescription>
              Manage your store details and contact info.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Display current info */}
            <div className="space-y-2">
              <Label>Store Name</Label>
              <Input value={seller?.store_name || ""} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Store Description</Label>
              <Textarea value={seller?.store_description || ""} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Store Address</Label>
              <Input value={seller?.store_address || ""} readOnly />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input value={seller?.phone || "N/A"} readOnly />
            </div>

            {/* Edit Button + Modal */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="mt-4 w-full sm:w-auto">Edit Profile</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                  <DialogTitle>Edit Seller Profile</DialogTitle>
                </DialogHeader>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="store_name">Store Name</Label>
                    <Input
                      id="store_name"
                      name="store_name"
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
                      value={form.store_address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={form.phone || ""}
                      onChange={handleChange}
                      placeholder="+85512345678"
                    />
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      onClick={handleUpdate}
                      className="w-full sm:w-auto"
                    >
                      Save Changes
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default SellerProfile;
