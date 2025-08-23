
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'react-hot-toast';

export interface QuoteItem {
  description: string;
  quantity: number;
  unit_price: number;
  total: number;
}

export interface Quote {
  id: string;
  reservation_id: string;
  artisan_id: string;
  client_id: string;
  title: string;
  description?: string;
  items: QuoteItem[];
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

export interface QuoteData {
  reservation_id: string;
  title: string;
  description?: string;
  items: QuoteItem[];
  validity_days?: number;
}

export const quoteService = {
  async generateQuote(quoteData: QuoteData) {
    try {
      const { data, error } = await supabase.functions.invoke('generate-quote', {
        body: quoteData
      });

      if (error) throw error;
      
      if (data.success) {
        toast.success('Devis créé avec succès');
        return data.quote;
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error generating quote:', error);
      toast.error(error.message || 'Erreur lors de la création du devis');
      return null;
    }
  },

  async getQuotesByReservation(reservationId: string): Promise<Quote[]> {
    try {
      const { data, error } = await supabase
        .from('quotes' as any)
        .select('*')
        .eq('reservation_id', reservationId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Quote[];
    } catch (error) {
      console.error('Error fetching quotes:', error);
      return [];
    }
  },

  async getClientQuotes(): Promise<Quote[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('quotes' as any)
        .select(`
          *,
          reservations(
            scheduled_date,
            scheduled_time,
            address,
            artisan_profiles(business_name, phone)
          )
        `)
        .eq('client_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Quote[];
    } catch (error) {
      console.error('Error fetching client quotes:', error);
      return [];
    }
  },

  async getArtisanQuotes(): Promise<Quote[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // First get artisan profile
      const { data: artisanProfile, error: profileError } = await supabase
        .from('artisan_profiles' as any)
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (profileError || !artisanProfile) {
        throw new Error('Artisan profile not found');
      }

      const { data, error } = await supabase
        .from('quotes' as any)
        .select(`
          *,
          reservations(
            scheduled_date,
            scheduled_time,
            address,
            profiles!client_id(first_name, last_name, phone)
          )
        `)
        .eq('artisan_id', artisanProfile.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Quote[];
    } catch (error) {
      console.error('Error fetching artisan quotes:', error);
      return [];
    }
  },

  async sendQuote(quoteId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('quotes' as any)
        .update({ 
          status: 'sent',
          sent_at: new Date().toISOString()
        })
        .eq('id', quoteId);

      if (error) throw error;
      
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
      const { error } = await supabase
        .from('quotes' as any)
        .update({ 
          status: 'accepted',
          accepted_at: new Date().toISOString()
        })
        .eq('id', quoteId);

      if (error) throw error;
      
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
      const { error } = await supabase
        .from('quotes' as any)
        .update({ status: 'rejected' })
        .eq('id', quoteId);

      if (error) throw error;
      
      toast.success('Devis refusé');
      return true;
    } catch (error) {
      console.error('Error rejecting quote:', error);
      toast.error('Erreur lors du refus du devis');
      return false;
    }
  }
};

export type { Quote, QuoteItem, QuoteData };
