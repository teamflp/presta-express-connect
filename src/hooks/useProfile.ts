
import { useState, useEffect } from 'react';
import { profileService } from '../services/profileService';
import { Profile } from '../types/database';

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    setLoading(true);
    const data = await profileService.getCurrentUserProfile();
    setProfile(data);
    setLoading(false);
  };

  const updateProfile = async (profileData: Partial<Profile>) => {
    const updatedProfile = await profileService.updateProfile(profileData);
    if (updatedProfile) {
      setProfile(updatedProfile);
    }
    return updatedProfile;
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return {
    profile,
    loading,
    updateProfile,
    refetch: fetchProfile
  };
};
