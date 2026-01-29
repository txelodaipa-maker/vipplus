-- Create storage bucket for videos
INSERT INTO storage.buckets (id, name, public)
VALUES ('videos', 'videos', true);

-- Allow public read access
CREATE POLICY "Public read access for videos"
ON storage.objects FOR SELECT
USING (bucket_id = 'videos');

-- Allow uploads to videos
CREATE POLICY "Allow uploads to videos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'videos');

-- Allow updates to videos
CREATE POLICY "Allow updates to videos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'videos');

-- Allow deletes from videos
CREATE POLICY "Allow deletes from videos"
ON storage.objects FOR DELETE
USING (bucket_id = 'videos');