
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'react-hot-toast';

// Interface étendue pour inclure les propriétés dynamiques
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
  // Propriétés dynamiques ajoutées lors des recherches
  distance?: number;
  artisan_services?: ArtisanServiceType[];
}

export interface ArtisanServiceType {
  id: string;
  name: string;
  description?: string;
  pricing_type: 'fixed' | 'hourly' | 'quote';
  base_price?: number;
  min_price?: number;
  max_price?: number;
  service_categories?: {
    name: string;
    slug: string;
    icon?: string;
  };
}

export interface SearchFiltersType {
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
  async searchArtisans(filters: SearchFiltersType, page = 1, limit = 10) {
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
      // Utiliser les profils existants avec fallback robuste
      const { data, error } = await supabase
        .from('profiles' as any)
        .select('*')
        .eq('id', artisanId)
        .eq('role', 'artisan')
        .single();

      if (error) {
        console.error('Error fetching artisan profile:', error);
        return null;
      }

      // Vérifier que les données existent avant d'y accéder
      if (!data) {
        return null;
      }

      // Convertir les données existantes vers le format ArtisanProfile avec vérification
      const rawData = data as any;
      const profile: ArtisanProfile = {
        id: rawData.id || artisanId,
        user_id: rawData.user_id || rawData.id,
        business_name: rawData.business_name || `${rawData.first_name || ''} ${rawData.last_name || ''}`.trim() || 'Artisan Professionnel',
        siret: rawData.siret,
        specialties: rawData.specialties || [],
        experience_years: rawData.experience_years,
        service_radius: rawData.service_radius || 30,
        address: rawData.address,
        city: rawData.city,
        postal_code: rawData.postal_code,
        phone: rawData.phone,
        website: rawData.website,
        description: rawData.description,
        hourly_rate: rawData.hourly_rate,
        minimum_service_fee: rawData.minimum_service_fee,
        is_verified: rawData.is_verified || false,
        is_premium: rawData.is_premium || false,
        rating: rawData.rating || 0,
        review_count: rawData.review_count || 0,
        response_time: rawData.response_time || 24,
        created_at: rawData.created_at || new Date().toISOString(),
        updated_at: rawData.updated_at || new Date().toISOString(),
        artisan_services: []
      };

      return profile;
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
        .from('profiles' as any)
        .update(profileData)
        .eq('id', user.id);

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
        .from('profiles' as any)
        .update({ 
          role: 'artisan',
          ...profileData 
        })
        .eq('id', user.id);

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
      // Retourner un tableau vide pour le moment
      // Cette fonctionnalité sera implémentée quand les tables seront créées
      return [];
    } catch (error) {
      console.error('Error fetching artisan services:', error);
      return [];
    }
  },

  async getAvailability(artisanId: string, startDate?: string, endDate?: string) {
    try {
      // Retourner une disponibilité par défaut
      // Cette fonctionnalité sera implémentée quand les tables seront créées
      return {
        slots: [],
        exceptions: []
      };
    } catch (error) {
      console.error('Error fetching availability:', error);
      return { slots: [], exceptions: [] };
    }
  }
};
