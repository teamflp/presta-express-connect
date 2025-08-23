
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'react-hot-toast';

// Types temporaires jusqu'à ce que les types Supabase soient régénérés
interface MessageThread {
  id: string;
  client_id: string;
  artisan_id: string;
  reservation_id?: string;
  subject?: string;
  is_archived: boolean;
  last_message_at: string;
  created_at: string;
}

interface Message {
  id: string;
  thread_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'image' | 'file';
  file_url?: string;
  is_read: boolean;
  created_at: string;
}

export const messageService = {
  async getMessageThreads(): Promise<(MessageThread & { 
    client: { first_name: string; last_name: string; avatar_url?: string };
    artisan: { first_name: string; last_name: string; avatar_url?: string };
  })[]> {
    try {
      const { data, error } = await supabase
        .from('message_threads' as any)
        .select(`
          *,
          client:profiles!client_id(first_name, last_name, avatar_url),
          artisan:profiles!artisan_id(first_name, last_name, avatar_url)
        `)
        .eq('is_archived', false)
        .order('last_message_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching message threads:', error);
      return [];
    }
  },

  async getThreadMessages(threadId: string): Promise<(Message & {
    sender: { first_name: string; last_name: string; avatar_url?: string };
  })[]> {
    try {
      const { data, error } = await supabase
        .from('messages' as any)
        .select(`
          *,
          sender:profiles!sender_id(first_name, last_name, avatar_url)
        `)
        .eq('thread_id', threadId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching thread messages:', error);
      return [];
    }
  },

  async createOrGetThread(artisanId: string, reservationId?: string): Promise<MessageThread | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      // Try to find existing thread
      const { data: existingThread } = await supabase
        .from('message_threads' as any)
        .select('*')
        .eq('client_id', user.id)
        .eq('artisan_id', artisanId)
        .eq('reservation_id', reservationId || null)
        .single();

      if (existingThread) {
        return existingThread as MessageThread;
      }

      // Create new thread
      const { data, error } = await supabase
        .from('message_threads' as any)
        .insert({
          client_id: user.id,
          artisan_id: artisanId,
          reservation_id: reservationId,
        })
        .select()
        .single();

      if (error) throw error;
      return data as MessageThread;
    } catch (error) {
      console.error('Error creating/getting thread:', error);
      return null;
    }
  },

  async sendMessage(threadId: string, content: string, messageType: 'text' | 'image' | 'file' = 'text'): Promise<Message | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('messages' as any)
        .insert({
          thread_id: threadId,
          sender_id: user.id,
          content,
          message_type: messageType,
        })
        .select()
        .single();

      if (error) throw error;

      // Update thread last_message_at
      await supabase
        .from('message_threads' as any)
        .update({ last_message_at: new Date().toISOString() })
        .eq('id', threadId);

      return data as Message;
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Erreur lors de l\'envoi du message');
      return null;
    }
  },

  async markMessagesAsRead(threadId: string): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase.rpc('mark_messages_as_read', {
        thread_uuid: threadId,
        user_uuid: user.id
      });
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  },

  async getUnreadMessagesCount(): Promise<number> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return 0;

      const { data, error } = await supabase
        .rpc('get_unread_messages_count', { user_uuid: user.id });

      if (error) throw error;
      return data || 0;
    } catch (error) {
      console.error('Error getting unread messages count:', error);
      return 0;
    }
  }
};

// Export des types pour utilisation dans d'autres fichiers
export type { MessageThread, Message };
