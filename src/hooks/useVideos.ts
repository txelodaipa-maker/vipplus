import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  paymentLink: string;
  price: number;
  views: string;
  duration: string;
  addedAt: string;
  isVip: boolean;
  isExclusive: boolean;
  isActive: boolean;
  stripeEnabled: boolean;
  paypalEnabled: boolean;
  createdAt: string;
}

interface DbVideo {
  id: string;
  title: string;
  description: string | null;
  thumbnail: string;
  video_url: string | null;
  payment_link: string | null;
  price: number | null;
  views: string | null;
  duration: string | null;
  added_at: string | null;
  is_vip: boolean | null;
  is_exclusive: boolean | null;
  is_active: boolean | null;
  stripe_enabled: boolean | null;
  paypal_enabled: boolean | null;
  created_at: string;
}

const mapDbToVideo = (db: DbVideo): Video => ({
  id: db.id,
  title: db.title,
  description: db.description || "",
  thumbnail: db.thumbnail,
  videoUrl: db.video_url || "",
  paymentLink: db.payment_link || "",
  price: Number(db.price) || 30,
  views: db.views || "0",
  duration: db.duration || "0:00",
  addedAt: db.added_at || "Just now",
  isVip: db.is_vip ?? false,
  isExclusive: db.is_exclusive ?? false,
  isActive: db.is_active ?? true,
  stripeEnabled: db.stripe_enabled ?? true,
  paypalEnabled: db.paypal_enabled ?? true,
  createdAt: db.created_at,
});

const mapVideoToDb = (video: Partial<Video>) => ({
  title: video.title,
  description: video.description,
  thumbnail: video.thumbnail,
  video_url: video.videoUrl,
  payment_link: video.paymentLink,
  price: video.price,
  views: video.views,
  duration: video.duration,
  added_at: video.addedAt,
  is_vip: video.isVip,
  is_exclusive: video.isExclusive,
  is_active: video.isActive,
  stripe_enabled: video.stripeEnabled,
  paypal_enabled: video.paypalEnabled,
});

export const useVideos = () => {
  return useQuery({
    queryKey: ["videos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching videos:", error);
        throw error;
      }

      return (data as DbVideo[]).map(mapDbToVideo);
    },
  });
};

export const useActiveVideos = () => {
  return useQuery({
    queryKey: ["videos", "active"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("videos")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching active videos:", error);
        throw error;
      }

      return (data as DbVideo[]).map(mapDbToVideo);
    },
  });
};

export const useAddVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (video: Omit<Video, "id" | "createdAt">) => {
      const dbVideo = mapVideoToDb(video);
      const { data, error } = await supabase
        .from("videos")
        .insert(dbVideo)
        .select()
        .single();

      if (error) {
        console.error("Error adding video:", error);
        throw error;
      }

      return mapDbToVideo(data as DbVideo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
      toast.success("Vídeo adicionado com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao adicionar vídeo: " + error.message);
    },
  });
};

export const useUpdateVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Video> }) => {
      const dbUpdates = mapVideoToDb(updates);
      const { data, error } = await supabase
        .from("videos")
        .update(dbUpdates)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        console.error("Error updating video:", error);
        throw error;
      }

      return mapDbToVideo(data as DbVideo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
      toast.success("Vídeo atualizado com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao atualizar vídeo: " + error.message);
    },
  });
};

export const useDeleteVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("videos").delete().eq("id", id);

      if (error) {
        console.error("Error deleting video:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
      toast.success("Vídeo removido com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao remover vídeo: " + error.message);
    },
  });
};
