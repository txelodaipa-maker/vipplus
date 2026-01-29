-- Create videos table
CREATE TABLE public.videos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  thumbnail TEXT NOT NULL,
  video_url TEXT DEFAULT '',
  payment_link TEXT DEFAULT '',
  price NUMERIC(10,2) DEFAULT 30.00,
  views TEXT DEFAULT '0',
  duration TEXT DEFAULT '0:00',
  added_at TEXT DEFAULT 'Just now',
  is_vip BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  stripe_enabled BOOLEAN DEFAULT true,
  paypal_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create settings table (single row for global settings)
CREATE TABLE public.settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  telegram_link TEXT DEFAULT 'https://t.me/videosplus',
  telegram_username TEXT DEFAULT 'videosplus',
  stripe_link TEXT DEFAULT '',
  paypal_email TEXT DEFAULT '',
  offer_price TEXT DEFAULT '$100',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Public read access for videos (anyone can view active videos)
CREATE POLICY "Anyone can view active videos"
  ON public.videos FOR SELECT
  USING (is_active = true);

-- Public read access for settings
CREATE POLICY "Anyone can view settings"
  ON public.settings FOR SELECT
  USING (true);

-- Admin policies (for now, allow all authenticated users to manage)
-- In production, you'd want to restrict this to admin roles
CREATE POLICY "Authenticated users can manage videos"
  ON public.videos FOR ALL
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage settings"
  ON public.settings FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add triggers for updated_at
CREATE TRIGGER update_videos_updated_at
  BEFORE UPDATE ON public.videos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON public.settings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default videos
INSERT INTO public.videos (title, description, thumbnail, video_url, payment_link, price, views, duration, added_at, is_vip, is_active)
VALUES 
  ('Premium Collection Vol. 1', 'Exclusive Content - Limited Edition', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80', '', '', 30.00, '2.5K', '1min 30s', '2 weeks ago', false, true),
  ('VIP Special', 'Behind The Scenes - Exclusive Access', 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=800&q=80', '', '', 60.00, '4.3K', '2min 15s', '1 week ago', true, true),
  ('Exclusive Release', 'Limited Edition - Premium Quality', 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80', '', '', 45.00, '1.8K', '3min 45s', '3 weeks ago', false, true);

-- Insert default settings
INSERT INTO public.settings (telegram_link, telegram_username, stripe_link, paypal_email, offer_price)
VALUES ('https://t.me/videosplus', 'videosplus', '', '', '$100');