
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'react-hot-toast';

// Types temporaires jusqu'à ce que les types Supabase soient régénérés
interface Review {
  id: string;
  reviewer_id: string;
  artisan_id: string;
  reservation_id?: string;
  rating: number;
  title?: string;
  comment?: string;
  response_from_artisan?: string;
  is_verified: boolean;
  is_moderated: boolean;
  created_at: string;
  updated_at: string;
}

export const reviewService = {
  async getArtisanReviews(artisanId: string): Promise<Review[]> {
    try {
      const { data, error } = await supabase
        .from('reviews' as any)
        .select(`
          *,
          reviewer:profiles!reviewer_id(first_name, last_name, avatar_url)
        `)
        .eq('artisan_id', artisanId)
        .eq('is_moderated', true)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching reviews:', error);
        return [];
      }
      
      return (data || []) as unknown as Review[];
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
        .from('reviews' as any)
        .insert({
          ...reviewData,
          reviewer_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      
      toast.success('Avis publié avec succès');
      return data as unknown as Review;
    } catch (error) {
      console.error('Error creating review:', error);
      toast.error('Erreur lors de la publication de l\'avis');
      return null;
    }
  },

  async updateArtisanResponse(reviewId: string, response: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('reviews' as any)
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
      // Calcul simple en attendant que les fonctions RPC soient disponibles
      const { data, error } = await supabase
        .from('reviews' as any)
        .select('rating')
        .eq('artisan_id', artisanId)
        .eq('is_moderated', true);

      if (error) throw error;

      const reviews = data || [];
      const count = reviews.length;
      const average = count > 0 ? reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / count : 0;

      return { average, count };
    } catch (error) {
      console.error('Error fetching artisan rating:', error);
      return { average: 0, count: 0 };
    }
  }
};

// Export des types pour utilisation dans d'autres fichiers
export type { Review };
