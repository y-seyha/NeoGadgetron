import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UserProfile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  role: string;
  is_verified: boolean;
}

interface EditProfileModalProps {
  profile: UserProfile;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSave: (updated: UserProfile) => void;
  saving: boolean;
}

export default function EditProfileModal({
  profile,
  isOpen,
  setIsOpen,
  onSave,
  saving,
}: EditProfileModalProps) {
  const [editProfile, setEditProfile] = useState<UserProfile>(profile);

  const handleChange = (field: keyof UserProfile, value: string) => {
    setEditProfile({ ...editProfile, [field]: value });
  };

  const handleSaveClick = () => {
    onSave(editProfile);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <div className="flex justify-center sm:justify-start">
        <DialogTrigger asChild>
          <Button
            onClick={() => setEditProfile(profile)}
            className="w-full sm:w-fit px-4"
          >
            Edit Profile
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent className="sm:max-w-md w-full bg-white dark:bg-black text-gray-900 dark:text-gray-100">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {["first_name", "last_name", "email", "phone"].map((field) => (
            <div key={field}>
              <Label className="block mb-1">
                {field
                  .replace("_", " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase())}
              </Label>
              <Input
                type={field === "email" ? "email" : "text"}
                value={String(editProfile[field as keyof UserProfile] || "")}
                onChange={(e) =>
                  handleChange(field as keyof UserProfile, e.target.value)
                }
                className="w-full bg-gray-50 dark:bg-black text-gray-900 dark:text-gray-100"
              />
            </div>
          ))}

          <Button
            className="w-full mt-4"
            onClick={handleSaveClick}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
