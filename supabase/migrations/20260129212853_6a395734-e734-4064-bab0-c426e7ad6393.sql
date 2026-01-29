-- Create storage bucket for video thumbnails
INSERT INTO storage.buckets (id, name, public)
VALUES ('thumbnails', 'thumbnails', true);

-- Allow public read access
CREATE POLICY "Public read access for thumbnails"
ON storage.objects FOR SELECT
USING (bucket_id = 'thumbnails');

-- Allow authenticated uploads
CREATE POLICY "Allow uploads to thumbnails"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'thumbnails');

-- Allow authenticated updates
CREATE POLICY "Allow updates to thumbnails"
ON storage.objects FOR UPDATE
USING (bucket_id = 'thumbnails');

-- Allow authenticated deletes
CREATE POLICY "Allow deletes from thumbnails"
ON storage.objects FOR DELETE
USING (bucket_id = 'thumbnails');