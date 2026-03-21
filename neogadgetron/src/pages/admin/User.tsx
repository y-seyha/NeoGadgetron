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
import { Edit, Trash2, Plus } from "lucide-react";

interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  phone: string;
  is_verified: boolean;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export default function AdminUserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/v1/users", {
        withCredentials: true,
      });
      setUsers(res.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openAddModal = () => {
    setSelectedUser(null);
    setIsFormOpen(true);
  };

  const openEditModal = (user: User) => {
    setSelectedUser(user);
    setIsFormOpen(true);
  };

  const openDeleteModal = (user: User) => {
    setSelectedUser(user);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedUser) return;
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/users/${selectedUser.id}`,
        {
          withCredentials: true,
        },
      );
      toast.success("User deleted successfully!");
      setIsDeleteOpen(false);
      fetchUsers();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete user");
    }
  };

  const handleFormSubmit = async (formData: {
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    phone: string;
    is_verified: boolean;
  }) => {
    try {
      if (selectedUser) {
        await axios.put(
          `http://localhost:3000/api/v1/users/${selectedUser.id}`,
          formData,
          { withCredentials: true },
        );
        toast.success("User updated successfully!");
      } else {
        await axios.post("http://localhost:3000/api/v1/users", formData, {
          withCredentials: true,
        });
        toast.success("User added successfully!");
      }
      setIsFormOpen(false);
      fetchUsers();
    } catch (error) {
      console.log(error);
      toast.error("Failed to save user");
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Manage Users
          </h1>
          <Button
            className="bg-primary text-white flex gap-2"
            onClick={openAddModal}
          >
            <Plus size={18} /> Add User
          </Button>
        </div>

        {/* Users Table */}
        <div className="overflow-auto border rounded dark:border-gray-700">
          <div className="grid grid-cols-[1fr_1fr_96px_128px_96px_112px] bg-gray-100 dark:bg-gray-900 text-sm font-semibold border-b sticky top-0 z-10">
            <div className="px-2 py-2">Name</div>
            <div className="px-2 py-2">Email</div>
            <div className="px-2 py-2">Role</div>
            <div className="px-2 py-2">Phone</div>
            <div className="px-2 py-2">Verified</div>
            <div className="px-2 py-2 text-center">Actions</div>
          </div>

          {loading ? (
            <div className="p-6 text-center">Loading users...</div>
          ) : users.length === 0 ? (
            <div className="p-6 text-center text-gray-500">No users found</div>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className="grid grid-cols-[1fr_1fr_96px_128px_96px_112px] items-center border-b hover:bg-gray-50 dark:hover:bg-gray-800/50 transition"
              >
                <div className="px-2 py-1 font-medium truncate">{`${user.first_name} ${user.last_name}`}</div>
                <div className="px-2 py-1 truncate">{user.email}</div>
                <div className="px-2 py-1">{user.role}</div>
                <div className="px-2 py-1">{user.phone}</div>
                <div className="px-2 py-1">
                  {user.is_verified ? "Yes" : "No"}
                </div>
                <div className="px-2 py-1 flex gap-1 justify-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditModal(user)}
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openDeleteModal(user)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modals */}
      {isFormOpen && (
        <UserFormModal
          user={selectedUser}
          open={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onSubmit={handleFormSubmit}
        />
      )}

      {isDeleteOpen && (
        <DeleteConfirmModal
          open={isDeleteOpen}
          userName={
            selectedUser
              ? `${selectedUser.first_name} ${selectedUser.last_name}`
              : ""
          }
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </MainLayout>
  );
}

function UserFormModal({
  user,
  open,
  onClose,
  onSubmit,
}: {
  user?: User | null;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    first_name: string;
    last_name: string;
    email: string;
    role: string;
    phone: string;
    is_verified: boolean;
  }) => void;
}) {
  const isEdit = !!user;
  const roles = ["admin", "customer"];

  const [firstName, setFirstName] = useState(user?.first_name || "");
  const [lastName, setLastName] = useState(user?.last_name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [role, setRole] = useState(user?.role || "customer");
  const [phone, setPhone] = useState(user?.phone || "");
  const [isVerified, setIsVerified] = useState(user?.is_verified || false);

  const handleSubmit = () => {
    onSubmit({
      first_name: firstName,
      last_name: lastName,
      email,
      role,
      phone,
      is_verified: isVerified,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg space-y-5">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit User" : "Add New User"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>First Name</Label>
              <Input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Role</Label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border px-3 py-2 rounded w-full"
              >
                {roles.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>Phone</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="checkbox"
              checked={isVerified}
              onChange={(e) => setIsVerified(e.target.checked)}
            />
            <Label>Verified</Label>
          </div>
        </div>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-primary text-white" onClick={handleSubmit}>
            {isEdit ? "Update User" : "Create User"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

//  Delete Confirm Modal
function DeleteConfirmModal({
  open,
  userName,
  onClose,
  onConfirm,
}: {
  open: boolean;
  userName: string;
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
          Are you sure you want to delete <strong>{userName}</strong>? This
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
