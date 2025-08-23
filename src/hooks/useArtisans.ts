
import { useState, useEffect } from 'react';
import { artisanService, SearchFilters, ArtisanProfile } from '../services/artisanService';

export const useArtisans = (initialFilters?: SearchFilters) => {
  const [artisans, setArtisans] = useState<ArtisanProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<SearchFilters>(initialFilters || {});

  const searchArtisans = async (newFilters?: SearchFilters, newPage = 1) => {
    setLoading(true);
    try {
      const searchFilters = newFilters || filters;
      const result = await artisanService.searchArtisans(searchFilters, newPage);
      
      setArtisans(result.artisans);
      setTotal(result.total);
      setPage(newPage);
      
      if (newFilters) {
        setFilters(newFilters);
      }
    } catch (error) {
      console.error('Error searching artisans:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    searchArtisans(filters, page + 1);
  };

  useEffect(() => {
    if (Object.keys(filters).length > 0) {
      searchArtisans();
    }
  }, []);

  return {
    artisans,
    loading,
    total,
    page,
    filters,
    searchArtisans,
    loadMore,
    setFilters
  };
};

export const useArtisanProfile = (artisanId?: string) => {
  const [profile, setProfile] = useState<ArtisanProfile | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async (id?: string) => {
    if (!id && !artisanId) return;
    
    setLoading(true);
    try {
      const profileData = await artisanService.getArtisanProfile(id || artisanId!);
      setProfile(profileData);
    } catch (error) {
      console.error('Error fetching artisan profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData: Partial<ArtisanProfile>) => {
    try {
      const success = await artisanService.updateArtisanProfile(profileData);
      if (success && profile) {
        setProfile({ ...profile, ...profileData });
      }
      return success;
    } catch (error) {
      console.error('Error updating profile:', error);
      return false;
    }
  };

  useEffect(() => {
    if (artisanId) {
      fetchProfile();
    }
  }, [artisanId]);

  return {
    profile,
    loading,
    fetchProfile,
    updateProfile,
    refetch: () => fetchProfile(artisanId)
  };
};
