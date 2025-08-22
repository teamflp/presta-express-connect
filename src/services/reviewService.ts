
import { supabase } from '@/integrations/supabase/client';
import { Review } from '../types/database';
import { toast } from 'react-hot-toast';

export const reviewService = {
  async getArtisanReviews(artisanId: string): Promise<Review[]> {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          reviewer:profiles!reviewer_id(first_name, last_name, avatar_url)
        `)
        .eq('artisan_id', artisanId)
        .eq('is_moderated', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  },

  async createReview(reviewData: {
    artisan_id: string;
    reservation_id?: string;
    rating: number;
    title?: string;
    comment?: string;
  }): Promise<Review | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('reviews')
        .insert({
          ...reviewData,
          reviewer_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      
      toast.success('Avis publié avec succès');
      return data;
    } catch (error) {
      console.error('Error creating review:', error);
      toast.error('Erreur lors de la publication de l\'avis');
      return null;
    }
  },

  async updateArtisanResponse(reviewId: string, response: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ response_from_artisan: response })
        .eq('id', reviewId);

      if (error) throw error;
      
      toast.success('Réponse ajoutée avec succès');
      return true;
    } catch (error) {
      console.error('Error updating artisan response:', error);
      toast.error('Erreur lors de l\'ajout de la réponse');
      return false;
    }
  },

  async getArtisanRating(artisanId: string): Promise<{ average: number; count: number }> {
    try {
      const { data, error } = await supabase
        .rpc('get_artisan_average_rating', { artisan_uuid: artisanId });

      if (error) throw error;

      const { data: countData, error: countError } = await supabase
        .rpc('get_artisan_reviews_count', { artisan_uuid: artisanId });

      if (countError) throw countError;

      return {
        average: data || 0,
        count: countData || 0
      };
    } catch (error) {
      console.error('Error fetching artisan rating:', error);
      return { average: 0, count: 0 };
    }
  }
};
