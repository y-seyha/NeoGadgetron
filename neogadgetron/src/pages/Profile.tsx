import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import MainLayout from "@/components/layout/MainLayout";
import type { UserProfile } from "@/types";
import ProfileCard from "@/components/Profile/ProfileCard";
import Loading from "@/components/common/Loading";

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/auth/me", {
          withCredentials: true,
        });
        setProfile(res.data.user);
      } catch {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async (updated: UserProfile) => {
    setSaving(true);
    try {
      setProfile(updated);

      const res = await axios.put(
        `http://localhost:3000/api/v1/users/${updated.id}`,
        {
          first_name: updated.first_name,
          last_name: updated.last_name,
          email: updated.email,
          phone: updated.phone,
        },
        { withCredentials: true },
      );

      if (res.data?.user) {
        setProfile(res.data.user);
      }

      toast.success("Profile updated!");
      setIsModalOpen(false);
    } catch {
      toast.error("Failed to update profile");
      const res = await axios.get("http://localhost:3000/api/v1/auth/me", {
        withCredentials: true,
      });
      setProfile(res.data.user);
    } finally {
      setSaving(false);
    }
  };

  if (loading)
    return (
      <MainLayout>
        <Loading />
      </MainLayout>
    );
  if (!profile) return <p>No profile found</p>;

  return (
    <MainLayout>
      <div className="mt-5 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl space-y-6">
          <ProfileCard
            profile={profile}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            handleSave={handleSave}
            saving={saving}
          />
        </div>
      </div>
    </MainLayout>
  );
}
