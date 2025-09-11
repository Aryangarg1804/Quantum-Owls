import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { apiGet, apiSend } from "@/lib/api";

export interface Profile {
  userId: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  bio?: string;
  businessName?: string;
  avatarUrl?: string;
}

interface ProfileContextType {
  profile: Profile | null;
  saveProfile: (data: Partial<Profile>) => void;
}

const STORAGE_PREFIX = "saheli-profile-";

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      setProfile(null);
      return;
    }
    const key = STORAGE_PREFIX + user.id;
    (async () => {
      // Try API
      try {
        const remote = await apiGet<any>(`/api/profile?userId=${encodeURIComponent(user.id)}`);
        if (remote) {
          const p: Profile = {
            userId: remote.user_id,
            name: remote.name ?? user.name,
            email: user.email,
            phone: remote.phone ?? undefined,
            address: remote.address ?? undefined,
            bio: remote.bio ?? undefined,
            businessName: remote.business_name ?? undefined,
            avatarUrl: remote.avatar_url ?? user.picture,
          };
          setProfile(p);
          localStorage.setItem(key, JSON.stringify(p));
          return;
        }
      } catch {}

      const raw = localStorage.getItem(key);
      if (raw) {
        try {
          setProfile(JSON.parse(raw));
          return;
        } catch {}
      }
      setProfile({ userId: user.id, name: user.name, email: user.email, avatarUrl: user.picture });
    })();
  }, [user]);

  const saveProfile = (data: Partial<Profile>) => {
    if (!user) return;
    setProfile(prev => {
      const next: Profile = { userId: user.id, name: user.name, email: user.email, avatarUrl: user.picture, ...(prev || {}), ...data };
      localStorage.setItem(STORAGE_PREFIX + user.id, JSON.stringify(next));
      // Best-effort sync to API
      (async () => {
        try {
          await apiSend(`/api/profile`, "PUT", {
            user_id: next.userId,
            name: next.name,
            phone: next.phone ?? null,
            address: next.address ?? null,
            bio: next.bio ?? null,
            business_name: next.businessName ?? null,
            avatar_url: next.avatarUrl ?? null,
          });
        } catch {}
      })();
      return next;
    });
    toast({ title: "Profile saved", description: "Your changes have been updated." });
  };

  const value = useMemo(() => ({ profile, saveProfile }), [profile]);

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export const useProfile = (): ProfileContextType => {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
};
