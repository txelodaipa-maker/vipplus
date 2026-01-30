-- Add is_open column to videos table for open/free videos
ALTER TABLE public.videos 
ADD COLUMN is_open BOOLEAN DEFAULT false;