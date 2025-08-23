
import { useState, useEffect } from 'react';
import { quoteService, Quote, QuoteData } from '../services/quoteService';

export const useQuotes = (type: 'client' | 'artisan' = 'client', reservationId?: string) => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchQuotes = async () => {
    setLoading(true);
    try {
      let data: Quote[];
      
      if (reservationId) {
        data = await quoteService.getQuotesByReservation(reservationId);
      } else if (type === 'client') {
        data = await quoteService.getClientQuotes();
      } else {
        data = await quoteService.getArtisanQuotes();
      }
      
      setQuotes(data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateQuote = async (quoteData: QuoteData) => {
    try {
      const newQuote = await quoteService.generateQuote(quoteData);
      if (newQuote) {
        await fetchQuotes(); // Refresh list
      }
      return newQuote;
    } catch (error) {
      console.error('Error generating quote:', error);
      return null;
    }
  };

  const sendQuote = async (quoteId: string) => {
    try {
      const success = await quoteService.sendQuote(quoteId);
      if (success) {
        await fetchQuotes(); // Refresh list
      }
      return success;
    } catch (error) {
      console.error('Error sending quote:', error);
      return false;
    }
  };

  const acceptQuote = async (quoteId: string) => {
    try {
      const success = await quoteService.acceptQuote(quoteId);
      if (success) {
        await fetchQuotes(); // Refresh list
      }
      return success;
    } catch (error) {
      console.error('Error accepting quote:', error);
      return false;
    }
  };

  const rejectQuote = async (quoteId: string) => {
    try {
      const success = await quoteService.rejectQuote(quoteId);
      if (success) {
        await fetchQuotes(); // Refresh list
      }
      return success;
    } catch (error) {
      console.error('Error rejecting quote:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, [type, reservationId]);

  return {
    quotes,
    loading,
    generateQuote,
    sendQuote,
    acceptQuote,
    rejectQuote,
    refetch: fetchQuotes
  };
};
