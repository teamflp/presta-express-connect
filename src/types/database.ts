
export interface Profile {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: 'client' | 'artisan' | 'admin';
  phone?: string;
  address?: string;
  city?: string;
  postal_code?: string;
  latitude?: number;
  longitude?: number;
  avatar_url?: string;
  bio?: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Review {
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

export interface MessageThread {
  id: string;
  client_id: string;
  artisan_id: string;
  reservation_id?: string;
  subject?: string;
  is_archived: boolean;
  last_message_at: string;
  created_at: string;
}

export interface Message {
  id: string;
  thread_id: string;
  sender_id: string;
  content: string;
  message_type: 'text' | 'image' | 'file';
  file_url?: string;
  is_read: boolean;
  created_at: string;
}

export interface AvailabilitySlot {
  id: string;
  artisan_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
  created_at: string;
}

export interface BookingException {
  id: string;
  artisan_id: string;
  exception_date: string;
  start_time?: string;
  end_time?: string;
  reason?: string;
  exception_type: 'unavailable' | 'special_hours';
  created_at: string;
}
