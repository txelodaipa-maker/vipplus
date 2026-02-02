import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Settings {
  id?: string;
  telegramLink: string;
  telegramUsername: string;
  stripeLink: string;
  paypalEmail: string;
  offerPrice: string;
}

interface DbSettings {
  id: string;
  telegram_link: string | null;
  telegram_username: string | null;
  stripe_link: string | null;
  paypal_email: string | null;
  offer_price: string | null;
}

const defaultSettings: Settings = {
  telegramLink: "https://t.me/vip_adminx2",
  telegramUsername: "vip_adminx2",
  stripeLink: "",
  paypalEmail: "",
  offerPrice: "$100",
};

const mapDbToSettings = (db: DbSettings): Settings => ({
  id: db.id,
  telegramLink: db.telegram_link || defaultSettings.telegramLink,
  telegramUsername: db.telegram_username || defaultSettings.telegramUsername,
  stripeLink: db.stripe_link || "",
  paypalEmail: db.paypal_email || "",
  offerPrice: db.offer_price || defaultSettings.offerPrice,
});

const mapSettingsToDb = (settings: Partial<Settings>) => ({
  telegram_link: settings.telegramLink,
  telegram_username: settings.telegramUsername,
  stripe_link: settings.stripeLink,
  paypal_email: settings.paypalEmail,
  offer_price: settings.offerPrice,
});

export const useSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("settings")
        .select("*")
        .limit(1)
        .single();

      if (error) {
        console.error("Error fetching settings:", error);
        // Return default settings if none exist
        return defaultSettings;
      }

      return mapDbToSettings(data as DbSettings);
    },
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settings: Partial<Settings>) => {
      // First, get the existing settings row
      const { data: existing } = await supabase
        .from("settings")
        .select("id")
        .limit(1)
        .single();

      const dbSettings = mapSettingsToDb(settings);

      if (existing) {
        // Update existing
        const { data, error } = await supabase
          .from("settings")
          .update(dbSettings)
          .eq("id", existing.id)
          .select()
          .single();

        if (error) throw error;
        return mapDbToSettings(data as DbSettings);
      } else {
        // Insert new
        const { data, error } = await supabase
          .from("settings")
          .insert(dbSettings)
          .select()
          .single();

        if (error) throw error;
        return mapDbToSettings(data as DbSettings);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success("Configurações salvas com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao salvar configurações: " + error.message);
    },
  });
};
