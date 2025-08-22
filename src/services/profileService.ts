
import { supabase } from '@/integrations/supabase/client';
import { Profile } from '../types/database';
import { toast } from 'react-hot-toast';

export const profileService = {
  async getCurrentUserProfile(): Promise<Profile | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
  },

  async updateProfile(profileData: Partial<Profile>): Promise<Profile | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      toast.success('Profil mis à jour avec succès');
      return data;
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Erreur lors de la mise à jour du profil');
      return null;
    }
  },

  async getArtisanProfile(artisanId: string): Promise<Profile | null> {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', artisanId)
        .eq('role', 'artisan')
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching artisan profile:', error);
      return null;
    }
  },

  async searchArtisans(filters: {
    city?: string;
    service?: string;
    latitude?: number;
    longitude?: number;
    radius?: number;
  }): Promise<Profile[]> {
    try {
      let query = supabase
        .from('profiles')
        .select('*')
        .eq('role', 'artisan')
        .eq('is_verified', true);

      if (filters.city) {
        query = query.ilike('city', `%${filters.city}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      
      return data || [];
    } catch (error) {
      console.error('Error searching artisans:', error);
      return [];
    }
  }
};
