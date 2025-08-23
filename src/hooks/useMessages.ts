
import { useState, useEffect } from 'react';
import { messageService, MessageThread, Message } from '../services/messageService';

export const useMessages = () => {
  const [threads, setThreads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchThreads = async () => {
    setLoading(true);
    try {
      const data = await messageService.getMessageThreads();
      setThreads(data);
    } catch (error) {
      console.error('Error fetching threads:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const count = await messageService.getUnreadMessagesCount();
      setUnreadCount(count);
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  const sendMessage = async (threadId: string, content: string) => {
    try {
      const message = await messageService.sendMessage(threadId, content);
      if (message) {
        await fetchThreads(); // Refresh threads
        await fetchUnreadCount();
      }
      return message;
    } catch (error) {
      console.error('Error sending message:', error);
      return null;
    }
  };

  const createThread = async (artisanId: string, reservationId?: string) => {
    try {
      const thread = await messageService.createOrGetThread(artisanId, reservationId);
      if (thread) {
        await fetchThreads();
      }
      return thread;
    } catch (error) {
      console.error('Error creating thread:', error);
      return null;
    }
  };

  useEffect(() => {
    fetchThreads();
    fetchUnreadCount();
  }, []);

  return {
    threads,
    loading,
    unreadCount,
    sendMessage,
    createThread,
    refetch: fetchThreads
  };
};
