
import { useState, useEffect } from 'react';
import { profileService, Profile } from '../services/profileService';

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const data = await profileService.getCurrentUserProfile();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: Partial<Profile>) => {
    try {
      const updatedProfile = await profileService.updateProfile(profileData);
      if (updatedProfile) {
        setProfile(updatedProfile);
      }
      return updatedProfile;
    } catch (error) {
      console.error('Error updating profile:', error);
      return null;
    }
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
