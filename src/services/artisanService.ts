
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'react-hot-toast';

export interface ArtisanProfile {
  id: string;
  user_id: string;
  business_name?: string;
  siret?: string;
  specialties?: string[];
  experience_years?: number;
  service_radius?: number;
  address?: string;
  city?: string;
  postal_code?: string;
  phone?: string;
  website?: string;
  description?: string;
  hourly_rate?: number;
  minimum_service_fee?: number;
  is_verified: boolean;
  is_premium: boolean;
  rating: number;
  review_count: number;
  response_time?: number;
  created_at: string;
  updated_at: string;
}

export interface SearchFilters {
  category?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  radius?: number;
  rating?: number;
  emergency?: boolean;
  availability?: string;
  priceRange?: {
    min?: number;
    max?: number;
  };
}

export const artisanService = {
  async searchArtisans(filters: SearchFilters, page = 1, limit = 10) {
    try {
      const { data, error } = await supabase.functions.invoke('search-artisans', {
        body: { filters, page, limit }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error searching artisans:', error);
      toast.error('Erreur lors de la recherche d\'artisans');
      return { artisans: [], total: 0 };
    }
  },

  async getArtisanProfile(artisanId: string): Promise<ArtisanProfile | null> {
    try {
      const { data, error } = await supabase
        .from('artisan_profiles' as any)
        .select(`
          *,
          artisan_services(
            id,
            name,
            description,
            pricing_type,
            base_price,
            min_price,
            max_price,
            service_categories(name, slug, icon)
          )
        `)
        .eq('id', artisanId)
        .single();

      if (error) throw error;
      return data as ArtisanProfile;
    } catch (error) {
      console.error('Error fetching artisan profile:', error);
      return null;
    }
  },

  async updateArtisanProfile(profileData: Partial<ArtisanProfile>): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('artisan_profiles' as any)
        .update(profileData)
        .eq('user_id', user.id);

      if (error) throw error;
      
      toast.success('Profil artisan mis à jour');
      return true;
    } catch (error) {
      console.error('Error updating artisan profile:', error);
      toast.error('Erreur lors de la mise à jour du profil');
      return false;
    }
  },

  async createArtisanProfile(profileData: Omit<ArtisanProfile, 'id' | 'user_id' | 'created_at' | 'updated_at'>): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('artisan_profiles' as any)
        .insert({ ...profileData, user_id: user.id });

      if (error) throw error;
      
      toast.success('Profil artisan créé');
      return true;
    } catch (error) {
      console.error('Error creating artisan profile:', error);
      toast.error('Erreur lors de la création du profil');
      return false;
    }
  },

  async getArtisanServices(artisanId: string) {
    try {
      const { data, error } = await supabase
        .from('artisan_services' as any)
        .select(`
          *,
          service_categories(name, slug, icon)
        `)
        .eq('artisan_id', artisanId)
        .eq('is_active', true);

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching artisan services:', error);
      return [];
    }
  },

  async getAvailability(artisanId: string, startDate?: string, endDate?: string) {
    try {
      const { data: slots, error: slotsError } = await supabase
        .from('availability_slots' as any)
        .select('*')
        .eq('artisan_id', artisanId)
        .eq('is_available', true);

      if (slotsError) throw slotsError;

      let exceptionsQuery = supabase
        .from('booking_exceptions' as any)
        .select('*')
        .eq('artisan_id', artisanId);

      if (startDate) {
        exceptionsQuery = exceptionsQuery.gte('exception_date', startDate);
      }
      if (endDate) {
        exceptionsQuery = exceptionsQuery.lte('exception_date', endDate);
      }

      const { data: exceptions, error: exceptionsError } = await exceptionsQuery;
      if (exceptionsError) throw exceptionsError;

      return {
        slots: slots || [],
        exceptions: exceptions || []
      };
    } catch (error) {
      console.error('Error fetching availability:', error);
      return { slots: [], exceptions: [] };
    }
  }
};

export type { SearchFilters };
