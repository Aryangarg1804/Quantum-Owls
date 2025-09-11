import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

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
    const raw = localStorage.getItem(key);
    if (raw) {
      try {
        setProfile(JSON.parse(raw));
      } catch {
        setProfile({ userId: user.id, name: user.name, email: user.email });
      }
    } else {
      // Initialize from user info
      setProfile({ userId: user.id, name: user.name, email: user.email, avatarUrl: user.picture });
    }
  }, [user]);

  const saveProfile = (data: Partial<Profile>) => {
    if (!user) return;
    setProfile(prev => {
      const next: Profile = { userId: user.id, name: user.name, email: user.email, avatarUrl: user.picture, ...(prev || {}), ...data };
      localStorage.setItem(STORAGE_PREFIX + user.id, JSON.stringify(next));
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
