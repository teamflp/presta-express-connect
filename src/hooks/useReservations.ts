
import { useState, useEffect } from 'react';
import { reservationService, ReservationType, ReservationDataType } from '../services/reservationService';

export const useReservations = (type: 'client' | 'artisan' = 'client') => {
  const [reservations, setReservations] = useState<ReservationType[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const data = type === 'client' 
        ? await reservationService.getUserReservations()
        : await reservationService.getArtisanReservations();
      
      setReservations(data);
    } catch (error) {
      console.error('Error fetching reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const createReservation = async (reservationData: ReservationDataType) => {
    try {
      const newReservation = await reservationService.createReservation(reservationData);
      if (newReservation) {
        await fetchReservations(); // Refresh list
      }
      return newReservation;
    } catch (error) {
      console.error('Error creating reservation:', error);
      return null;
    }
  };

  const updateReservationStatus = async (reservationId: string, status: ReservationType['status'], notes?: string) => {
    try {
      const success = await reservationService.updateReservationStatus(reservationId, status, notes);
      if (success) {
        await fetchReservations(); // Refresh list
      }
      return success;
    } catch (error) {
      console.error('Error updating reservation status:', error);
      return false;
    }
  };

  const cancelReservation = async (reservationId: string, reason?: string) => {
    try {
      const success = await reservationService.cancelReservation(reservationId, reason);
      if (success) {
        await fetchReservations(); // Refresh list
      }
      return success;
    } catch (error) {
      console.error('Error cancelling reservation:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [type]);

  return {
    reservations,
    loading,
    createReservation,
    updateReservationStatus,
    cancelReservation,
    refetch: fetchReservations
  };
};
