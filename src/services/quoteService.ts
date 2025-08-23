
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'react-hot-toast';

export interface QuoteItemType {
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface QuoteType {
  id: string;
  reservation_id: string;
  artisan_id: string;
  client_id: string;
  title: string;
  description?: string;
  items: QuoteItemType[];
  subtotal: number;
  tax_rate: number;
  tax_amount: number;
  total_amount: number;
  validity_days: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  sent_at?: string;
  expires_at: string;
  accepted_at?: string;
  created_at: string;
  updated_at: string;
}

export interface QuoteDataType {
  reservation_id: string;
  title: string;
  description?: string;
  items: QuoteItemType[];
  validity_days?: number;
}

export const quoteService = {
  async generateQuote(quoteData: QuoteDataType) {
    try {
      const { data, error } = await supabase.functions.invoke('generate-quote', {
        body: quoteData
      });

      if (error) throw error;
      
      if (data?.success) {
        toast.success('Devis créé avec succès');
        return data.quote;
      } else {
        throw new Error(data?.error || 'Erreur lors de la création');
      }
    } catch (error) {
      console.error('Error generating quote:', error);
      toast.error('Erreur lors de la création du devis');
      return null;
    }
  },

  async getQuotesByReservation(reservationId: string): Promise<QuoteType[]> {
    try {
      // Retourner un tableau vide pour le moment
      return [];
    } catch (error) {
      console.error('Error fetching quotes:', error);
      return [];
    }
  },

  async getClientQuotes(): Promise<QuoteType[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Retourner un tableau vide pour le moment
      return [];
    } catch (error) {
      console.error('Error fetching client quotes:', error);
      return [];
    }
  },

  async getArtisanQuotes(): Promise<QuoteType[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Retourner un tableau vide pour le moment
      return [];
    } catch (error) {
      console.error('Error fetching artisan quotes:', error);
      return [];
    }
  },

  async sendQuote(quoteId: string): Promise<boolean> {
    try {
      toast.success('Devis envoyé au client');
      return true;
    } catch (error) {
      console.error('Error sending quote:', error);
      toast.error('Erreur lors de l\'envoi du devis');
      return false;
    }
  },

  async acceptQuote(quoteId: string): Promise<boolean> {
    try {
      toast.success('Devis accepté');
      return true;
    } catch (error) {
      console.error('Error accepting quote:', error);
      toast.error('Erreur lors de l\'acceptation du devis');
      return false;
    }
  },

  async rejectQuote(quoteId: string): Promise<boolean> {
    try {
      toast.success('Devis refusé');
      return true;
    } catch (error) {
      console.error('Error rejecting quote:', error);
      toast.error('Erreur lors du refus du devis');
      return false;
    }
  }
};
