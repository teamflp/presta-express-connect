
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'react-hot-toast';

// Types temporaires jusqu'à ce que les types Supabase soient régénérés
interface AvailabilitySlot {
  id: string;
  artisan_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
  created_at: string;
}

interface BookingException {
  id: string;
  artisan_id: string;
  exception_date: string;
  start_time?: string;
  end_time?: string;
  reason?: string;
  exception_type: 'unavailable' | 'special_hours';
  created_at: string;
}

export const availabilityService = {
  async getArtisanAvailability(artisanId: string): Promise<AvailabilitySlot[]> {
    try {
      const { data, error } = await supabase
        .from('availability_slots' as any)
        .select('*')
        .eq('artisan_id', artisanId)
        .eq('is_available', true)
        .order('day_of_week')
        .order('start_time');

      if (error) throw error;
      return (data || []) as AvailabilitySlot[];
    } catch (error) {
      console.error('Error fetching availability:', error);
      return [];
    }
  },

  async updateAvailabilitySlots(slots: Omit<AvailabilitySlot, 'id' | 'created_at'>[]): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Delete existing slots for this artisan
      await supabase
        .from('availability_slots' as any)
        .delete()
        .eq('artisan_id', user.id);

      // Insert new slots
      const { error } = await supabase
        .from('availability_slots' as any)
        .insert(slots.map(slot => ({ ...slot, artisan_id: user.id })));

      if (error) throw error;
      
      toast.success('Disponibilités mises à jour');
      return true;
    } catch (error) {
      console.error('Error updating availability slots:', error);
      toast.error('Erreur lors de la mise à jour des disponibilités');
      return false;
    }
  },

  async getBookingExceptions(artisanId: string, startDate?: string, endDate?: string): Promise<BookingException[]> {
    try {
      let query = supabase
        .from('booking_exceptions' as any)
        .select('*')
        .eq('artisan_id', artisanId)
        .order('exception_date');

      if (startDate) {
        query = query.gte('exception_date', startDate);
      }
      if (endDate) {
        query = query.lte('exception_date', endDate);
      }

      const { data, error } = await query;
      if (error) throw error;
      return (data || []) as BookingException[];
    } catch (error) {
      console.error('Error fetching booking exceptions:', error);
      return [];
    }
  },

  async createBookingException(exception: Omit<BookingException, 'id' | 'artisan_id' | 'created_at'>): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('booking_exceptions' as any)
        .insert({ ...exception, artisan_id: user.id });

      if (error) throw error;
      
      toast.success('Exception ajoutée');
      return true;
    } catch (error) {
      console.error('Error creating booking exception:', error);
      toast.error('Erreur lors de l\'ajout de l\'exception');
      return false;
    }
  },

  async deleteBookingException(exceptionId: string): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('booking_exceptions' as any)
        .delete()
        .eq('id', exceptionId);

      if (error) throw error;
      
      toast.success('Exception supprimée');
      return true;
    } catch (error) {
      console.error('Error deleting booking exception:', error);
      toast.error('Erreur lors de la suppression de l\'exception');
      return false;
    }
  }
};

// Export des types pour utilisation dans d'autres fichiers
export type { AvailabilitySlot, BookingException };
