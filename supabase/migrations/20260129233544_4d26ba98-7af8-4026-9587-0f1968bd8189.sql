-- Add is_exclusive column to videos table
ALTER TABLE public.videos ADD COLUMN is_exclusive boolean DEFAULT false;