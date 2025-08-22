
import { useState, useEffect } from 'react';
import { messageService } from '../services/messageService';
import { MessageThread, Message } from '../types/database';

export const useMessages = () => {
  const [threads, setThreads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchThreads = async () => {
    setLoading(true);
    const data = await messageService.getMessageThreads();
    setThreads(data);
    setLoading(false);
  };

  const fetchUnreadCount = async () => {
    const count = await messageService.getUnreadMessagesCount();
    setUnreadCount(count);
  };

  const sendMessage = async (threadId: string, content: string) => {
    const message = await messageService.sendMessage(threadId, content);
    if (message) {
      await fetchThreads(); // Refresh threads
      await fetchUnreadCount();
    }
    return message;
  };

  const createThread = async (artisanId: string, reservationId?: string) => {
    const thread = await messageService.createOrGetThread(artisanId, reservationId);
    if (thread) {
      await fetchThreads();
    }
    return thread;
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
