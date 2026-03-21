import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import MainLayout from "@/components/layout/MainLayout";
import { Edit, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

type Seller = {
  id: string;
  user_id: string;
  store_name: string;
  store_description: string;
  store_address: string;
  phone: string;
  logo_url?: string | null;
  created_at: string;
  updated_at: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
};


export default function AdminSellerPage() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // --- Fetch sellers
  const fetchSellers = async () => {
    setLoading(true);
    try {
      const res = await axios.get<Seller[]>(
        "http://localhost:3000/api/v1/sellers",
        {
          withCredentials: true,
        },
      );
      setSellers(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch sellers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);


  const openEditModal = (seller: Seller) => {
    setSelectedSeller(seller);
    setIsEditOpen(true);
  };

  const openDeleteModal = (seller: Seller) => {
    setSelectedSeller(seller);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedSeller) return;
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/sellers/${selectedSeller.id}`,
        { withCredentials: true },
      );
      toast.success("Seller deleted successfully!");
      setIsDeleteOpen(false);
      fetchSellers();
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to delete seller");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  const handleEditSubmit = async (data: Partial<Seller>) => {
    if (!selectedSeller) return;
    try {
      await axios.put(
        `http://localhost:3000/api/v1/sellers/${selectedSeller.id}`,
        data, 
        { withCredentials: true },
      );
      toast.success("Seller updated successfully!");
      setIsEditOpen(false);
      fetchSellers();
    } catch (error: unknown) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to update seller");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to update seller");
      }
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Manage Sellers
        </h1>

        {/* Sellers Table */}
        <div className="overflow-auto border rounded dark:border-gray-700">
          {/* Table Header */}
          <div className="grid grid-cols-[96px_128px_1fr_1fr_1fr_128px_128px_128px_128px_128px_128px] bg-gray-100 dark:bg-gray-900 text-sm font-semibold border-b sticky top-0 z-10">
            <div className="px-3 py-3">Logo</div>
            <div className="px-3 py-3">Store Name</div>
            <div className="px-3 py-3">Description</div>
            <div className="px-3 py-3">Address</div>
            <div className="px-3 py-3">Phone</div>
            <div className="px-3 py-3">Email</div>
            <div className="px-3 py-3">First Name</div>
            <div className="px-3 py-3">Last Name</div>
            <div className="px-3 py-3">Role</div>
            <div className="px-3 py-3">Created</div>
            <div className="px-3 py-3 text-center">Actions</div>
          </div>

          {/* Table Rows */}
          {loading ? (
            <div className="p-10 text-center">Loading sellers...</div>
          ) : sellers.length === 0 ? (
            <div className="p-10 text-center text-gray-500">
              No sellers found
            </div>
          ) : (
            sellers.map((s) => (
              <div
                key={s.id}
                className="grid grid-cols-[96px_128px_1fr_1fr_1fr_128px_128px_128px_128px_128px_128px] items-center border-b hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
              >
                <div className="px-3 py-2">
                  <img
                    src={s.logo_url || "/placeholder.png"}
                    alt={s.store_name}
                    className="w-12 h-12 object-cover rounded border"
                  />
                </div>
                <div className="px-3 py-2 font-medium truncate">
                  {s.store_name}
                </div>
                <div className="px-3 py-2 truncate text-gray-500">
                  {s.store_description}
                </div>
                <div className="px-3 py-2 truncate">{s.store_address}</div>
                <div className="px-3 py-2">{s.phone}</div>
                <div className="px-3 py-2">{s.email}</div>
                <div className="px-3 py-2">{s.first_name}</div>
                <div className="px-3 py-2">{s.last_name}</div>
                <div className="px-3 py-2">{s.role}</div>
                <div className="px-3 py-2 text-xs">
                  {new Date(s.created_at).toLocaleDateString()}
                </div>
                <div className="px-3 py-2 flex gap-2 justify-center">
                  <Button variant="ghost" onClick={() => openEditModal(s)}>
                    <Edit size={16} />
                  </Button>
                  <Button variant="ghost" onClick={() => openDeleteModal(s)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/*  Modals */}
      {isEditOpen && selectedSeller && (
        <SellerEditModal
          seller={selectedSeller}
          open={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          onSubmit={handleEditSubmit}
        />
      )}
      {isDeleteOpen && selectedSeller && (
        <DeleteConfirmModal
          open={isDeleteOpen}
          productName={selectedSeller.store_name}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </MainLayout>
  );
}

// Edit Seller Modal
function SellerEditModal({
  seller,
  open,
  onClose,
  onSubmit,
}: {
  seller: Seller;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Seller>) => void;
}) {
  const [storeName, setStoreName] = useState(seller.store_name);
  const [description, setDescription] = useState(seller.store_description);
  const [address, setAddress] = useState(seller.store_address);
  const [phone, setPhone] = useState(seller.phone);
  const [logo, setLogo] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setLogo(e.target.files[0]);
  };

  const handleSubmit = () => {
    onSubmit({
      store_name: storeName,
      store_description: description,
      store_address: address,
      phone: phone,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg space-y-5">
        <DialogHeader>
          <DialogTitle>Edit Seller</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div>
            <Label>Store Name</Label>
            <Input
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
          </div>
          <div>
            <Label>Description</Label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-24"
            />
          </div>
          <div>
            <Label>Address</Label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div>
            <Label>Phone</Label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div>
            <Label>Logo (optional)</Label>
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            {logo && (
              <img
                src={URL.createObjectURL(logo)}
                alt="Preview"
                className="mt-2 w-24 h-24 object-cover rounded border"
              />
            )}
          </div>
        </div>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-primary text-white" onClick={handleSubmit}>
            Update Seller
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

//  Delete Confirm Modal 
function DeleteConfirmModal({
  open,
  productName,
  onClose,
  onConfirm,
}: {
  open: boolean;
  productName: string;
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Deletion</DialogTitle>
        </DialogHeader>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Are you sure you want to delete <strong>{productName}</strong>? This
          action cannot be undone.
        </p>
        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
