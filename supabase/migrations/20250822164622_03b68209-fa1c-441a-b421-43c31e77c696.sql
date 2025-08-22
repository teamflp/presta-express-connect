
-- Phase 1.1: Améliorer les profils utilisateurs
-- Étendre la table profiles avec les champs spécifiques Presta Express
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'client' CHECK (role IN ('client', 'artisan', 'admin'));
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS address TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS city TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS postal_code TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS latitude DECIMAL(10, 8);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS longitude DECIMAL(11, 8);
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS bio TEXT;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_verified BOOLEAN DEFAULT FALSE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- Phase 1.2: Système d'avis et notes
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reviewer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  artisan_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  reservation_id UUID REFERENCES public.nc_reservations(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  comment TEXT,
  response_from_artisan TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  is_moderated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT reviews_reviewer_not_artisan CHECK (reviewer_id != artisan_id)
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_reviews_artisan_id ON public.reviews(artisan_id);
CREATE INDEX IF NOT EXISTS idx_reviews_rating ON public.reviews(rating);
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews(created_at DESC);

-- Phase 1.3: Système de messagerie
CREATE TABLE IF NOT EXISTS public.message_threads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  artisan_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  reservation_id UUID REFERENCES public.nc_reservations(id) ON DELETE SET NULL,
  subject TEXT,
  is_archived BOOLEAN DEFAULT FALSE,
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(client_id, artisan_id, reservation_id)
);

CREATE TABLE IF NOT EXISTS public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  thread_id UUID REFERENCES public.message_threads(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'file')),
  file_url TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour la messagerie
CREATE INDEX IF NOT EXISTS idx_message_threads_client_id ON public.message_threads(client_id);
CREATE INDEX IF NOT EXISTS idx_message_threads_artisan_id ON public.message_threads(artisan_id);
CREATE INDEX IF NOT EXISTS idx_messages_thread_id ON public.messages(thread_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at DESC);

-- Phase 1.4: Gestion des disponibilités
CREATE TABLE IF NOT EXISTS public.availability_slots (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  artisan_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0 = dimanche
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT availability_valid_time CHECK (start_time < end_time)
);

CREATE TABLE IF NOT EXISTS public.booking_exceptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  artisan_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  exception_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  reason TEXT,
  exception_type TEXT DEFAULT 'unavailable' CHECK (exception_type IN ('unavailable', 'special_hours')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour les disponibilités
CREATE INDEX IF NOT EXISTS idx_availability_slots_artisan_id ON public.availability_slots(artisan_id);
CREATE INDEX IF NOT EXISTS idx_booking_exceptions_artisan_id ON public.booking_exceptions(artisan_id);
CREATE INDEX IF NOT EXISTS idx_booking_exceptions_date ON public.booking_exceptions(exception_date);

-- Politiques RLS pour les reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all reviews" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "Users can create reviews for their reservations" ON public.reviews
  FOR INSERT WITH CHECK (
    auth.uid() = reviewer_id AND
    EXISTS (
      SELECT 1 FROM public.nc_reservations 
      WHERE id = reservation_id AND client_id = auth.uid()
    )
  );

CREATE POLICY "Artisans can update their review responses" ON public.reviews
  FOR UPDATE USING (auth.uid() = artisan_id)
  WITH CHECK (auth.uid() = artisan_id);

-- Politiques RLS pour les message_threads
ALTER TABLE public.message_threads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own message threads" ON public.message_threads
  FOR SELECT USING (auth.uid() = client_id OR auth.uid() = artisan_id);

CREATE POLICY "Users can create message threads" ON public.message_threads
  FOR INSERT WITH CHECK (auth.uid() = client_id OR auth.uid() = artisan_id);

CREATE POLICY "Users can update their own message threads" ON public.message_threads
  FOR UPDATE USING (auth.uid() = client_id OR auth.uid() = artisan_id)
  WITH CHECK (auth.uid() = client_id OR auth.uid() = artisan_id);

-- Politiques RLS pour les messages
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view messages in their threads" ON public.messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.message_threads 
      WHERE id = thread_id AND (client_id = auth.uid() OR artisan_id = auth.uid())
    )
  );

CREATE POLICY "Users can create messages in their threads" ON public.messages
  FOR INSERT WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM public.message_threads 
      WHERE id = thread_id AND (client_id = auth.uid() OR artisan_id = auth.uid())
    )
  );

-- Politiques RLS pour availability_slots
ALTER TABLE public.availability_slots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view availability slots" ON public.availability_slots
  FOR SELECT USING (true);

CREATE POLICY "Artisans can manage their availability slots" ON public.availability_slots
  FOR ALL USING (auth.uid() = artisan_id)
  WITH CHECK (auth.uid() = artisan_id);

-- Politiques RLS pour booking_exceptions
ALTER TABLE public.booking_exceptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view booking exceptions" ON public.booking_exceptions
  FOR SELECT USING (true);

CREATE POLICY "Artisans can manage their booking exceptions" ON public.booking_exceptions
  FOR ALL USING (auth.uid() = artisan_id)
  WITH CHECK (auth.uid() = artisan_id);

-- Fonction pour calculer la note moyenne d'un artisan
CREATE OR REPLACE FUNCTION public.get_artisan_average_rating(artisan_uuid UUID)
RETURNS DECIMAL AS $$
BEGIN
  RETURN (
    SELECT ROUND(AVG(rating)::numeric, 2)
    FROM public.reviews 
    WHERE artisan_id = artisan_uuid AND is_moderated = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Fonction pour compter les avis d'un artisan
CREATE OR REPLACE FUNCTION public.get_artisan_reviews_count(artisan_uuid UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)::integer
    FROM public.reviews 
    WHERE artisan_id = artisan_uuid AND is_moderated = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- Trigger pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Appliquer le trigger aux tables pertinentes
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_reviews_updated_at ON public.reviews;
CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Fonction pour marquer les messages comme lus
CREATE OR REPLACE FUNCTION public.mark_messages_as_read(thread_uuid UUID, user_uuid UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE public.messages 
  SET is_read = true 
  WHERE thread_id = thread_uuid 
    AND sender_id != user_uuid 
    AND is_read = false;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Fonction pour obtenir le nombre de messages non lus
CREATE OR REPLACE FUNCTION public.get_unread_messages_count(user_uuid UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)::integer
    FROM public.messages m
    JOIN public.message_threads mt ON m.thread_id = mt.id
    WHERE (mt.client_id = user_uuid OR mt.artisan_id = user_uuid)
      AND m.sender_id != user_uuid
      AND m.is_read = false
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;
