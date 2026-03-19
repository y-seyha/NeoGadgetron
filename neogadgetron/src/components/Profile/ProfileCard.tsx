import ProfileField from "./ProfileField";
import EditProfileModal from "./EditProfileModal";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import type { UserProfile } from "@/types";

interface ProfileCardProps {
  profile: UserProfile;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
  handleSave: (updated: UserProfile) => void;
  saving: boolean;
}

export default function ProfileCard({
  profile,
  isModalOpen,
  setIsModalOpen,
  handleSave,
  saving,
}: ProfileCardProps) {
  return (
    <Card className="p-4 sm:p-5 my-2">
      <CardHeader className="flex justify-between">
        <CardTitle className="text-lg sm:text-xl text-gray-900 dark:text-gray-100">
          Profile Info
        </CardTitle>
        <EditProfileModal
          profile={profile}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          onSave={handleSave}
          saving={saving}
        />
      </CardHeader>

      <CardContent className="space-y-4">
        <ProfileField label="First Name" value={profile.first_name} />
        <ProfileField label="Last Name" value={profile.last_name} />
        <ProfileField label="Email" value={profile.email} />
        <ProfileField label="Phone" value={profile.phone || "N/A"} />
        {/* <ProfileField label="Role" value={profile.role} /> */}
        {/* <ProfileField
          label="Verified"
          value={profile.is_verified ? "Yes" : "No"}
        /> */}
      </CardContent>
    </Card>
  );
}
