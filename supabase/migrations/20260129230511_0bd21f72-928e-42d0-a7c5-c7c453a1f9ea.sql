-- Drop existing restrictive RLS policies
DROP POLICY IF EXISTS "Anyone can view settings" ON public.settings;
DROP POLICY IF EXISTS "Authenticated users can manage settings" ON public.settings;
DROP POLICY IF EXISTS "Anyone can view active videos" ON public.videos;
DROP POLICY IF EXISTS "Authenticated users can manage videos" ON public.videos;

-- Create permissive policies for videos
CREATE POLICY "Anyone can view videos" 
ON public.videos 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert videos" 
ON public.videos 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update videos" 
ON public.videos 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete videos" 
ON public.videos 
FOR DELETE 
USING (true);

-- Create permissive policies for settings
CREATE POLICY "Anyone can view settings" 
ON public.settings 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can insert settings" 
ON public.settings 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update settings" 
ON public.settings 
FOR UPDATE 
USING (true);

CREATE POLICY "Anyone can delete settings" 
ON public.settings 
FOR DELETE 
USING (true);