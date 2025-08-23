
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'react-hot-toast';

export interface Reservation {
  id: string;
  client_id: string;
  artisan_id: string;
  service_id: string;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'disputed';
  scheduled_date: string;
  scheduled_time: string;
  duration?: number;
  address: string;
  postal_code: string;
  city: string;
  description?: string;
  estimated_price?: number;
  final_price?: number;
  is_emergency: boolean;
  created_at: string;
  updated_at: string;
}

export interface ReservationData {
  artisan_id: string;
  service_id: string;
  scheduled_date: string;
  scheduled_time: string;
  address: string;
  postal_code: string;
  city: string;
  description?: string;
  is_emergency?: boolean;
  latitude?: number;
  longitude?: number;
}

export const reservationService = {
  async createReservation(reservationData: ReservationData) {
    try {
      const { data, error } = await supabase.functions.invoke('create-reservation', {
        body: reservationData
      });

      if (error) throw error;
      
      if (data.success) {
        toast.success('Réservation créée avec succès');
        return data.reservation;
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
      toast.error(error.message || 'Erreur lors de la création de la réservation');
      return null;
    }
  },

  async getUserReservations(): Promise<Reservation[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('reservations' as any)
        .select(`
          *,
          artisan_profiles(business_name, phone, rating),
          artisan_services(name, description),
          service_categories(name, icon)
        `)
        .eq('client_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Reservation[];
    } catch (error) {
      console.error('Error fetching user reservations:', error);
      return [];
    }
  },

  async getArtisanReservations(): Promise<Reservation[]> {
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
        .from('reservations' as any)
        .select(`
          *,
          profiles!client_id(first_name, last_name, phone),
          artisan_services(name, description),
          service_categories(name, icon)
        `)
        .eq('artisan_id', artisanProfile.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Reservation[];
    } catch (error) {
      console.error('Error fetching artisan reservations:', error);
      return [];
    }
  },

  async updateReservationStatus(reservationId: string, status: Reservation['status'], notes?: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('reservations' as any)
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', reservationId);

      if (error) throw error;
      
      toast.success('Statut de la réservation mis à jour');
      return true;
    } catch (error) {
      console.error('Error updating reservation status:', error);
      toast.error('Erreur lors de la mise à jour du statut');
      return false;
    }
  },

  async cancelReservation(reservationId: string, reason?: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('reservations' as any)
        .update({ 
          status: 'cancelled',
          updated_at: new Date().toISOString()
        })
        .eq('id', reservationId);

      if (error) throw error;
      
      toast.success('Réservation annulée');
      return true;
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      toast.error('Erreur lors de l\'annulation');
      return false;
    }
  }
};

export type { Reservation, ReservationData };
