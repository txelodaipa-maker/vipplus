import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Save, Loader2 } from "lucide-react";
import { Video } from "@/hooks/useVideos";
import { ThumbnailUpload } from "./ThumbnailUpload";
import { VideoUpload } from "./VideoUpload";

interface VideoFormProps {
  video: Partial<Video>;
  onChange: (updates: Partial<Video>) => void;
  onSave: () => void;
  saveLabel?: string;
  isLoading?: boolean;
}

export const VideoForm = ({ video, onChange, onSave, saveLabel = "Salvar", isLoading = false }: VideoFormProps) => {
  return (
    <div className="space-y-3 pt-2">
      {/* Title & Description */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs">Título</Label>
          <Input
            value={video.title || ""}
            onChange={(e) => onChange({ title: e.target.value })}
            placeholder="Título do vídeo"
            className="bg-background/50 h-8 text-sm"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Descrição</Label>
          <Input
            value={video.description || ""}
            onChange={(e) => onChange({ description: e.target.value })}
            placeholder="Descrição curta"
            className="bg-background/50 h-8 text-sm"
          />
        </div>
      </div>

      {/* Thumbnail & Video Upload */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs">Thumbnail</Label>
          <ThumbnailUpload
            value={video.thumbnail || ""}
            onChange={(url) => onChange({ thumbnail: url })}
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Vídeo</Label>
          <VideoUpload
            value={video.videoUrl || ""}
            onChange={(url, duration) => {
              const updates: Partial<typeof video> = { videoUrl: url };
              if (duration) updates.duration = duration;
              onChange(updates);
            }}
          />
        </div>
      </div>

      {/* Price & Duration (read-only) */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs">Preço ($)</Label>
          <Input
            type="number"
            value={video.price || 30}
            onChange={(e) => onChange({ price: parseFloat(e.target.value) || 0 })}
            placeholder="30"
            className="bg-background/50 h-8 text-sm"
          />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Duração (automático)</Label>
          <Input
            value={video.duration || "0:00"}
            readOnly
            disabled
            className="bg-background/30 h-8 text-sm text-muted-foreground"
          />
        </div>
      </div>

      {/* Payment Link */}
      <div className="space-y-1">
        <Label className="text-xs">Link de Pagamento</Label>
        <Input
          value={video.paymentLink || ""}
          onChange={(e) => onChange({ paymentLink: e.target.value })}
          placeholder="https://buy.stripe.com/..."
          className="bg-background/50 h-8 text-sm"
        />
      </div>

      {/* Toggles */}
      <div className="grid grid-cols-5 gap-2">
        <div className="flex items-center justify-between p-2 rounded-lg bg-background/50">
          <Label className="text-xs">Ativo</Label>
          <Switch
            checked={video.isActive ?? true}
            onCheckedChange={(checked) => onChange({ isActive: checked })}
          />
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-background/50">
          <Label className="text-xs">VIP</Label>
          <Switch
            checked={video.isVip ?? false}
            onCheckedChange={(checked) => onChange({ isVip: checked })}
          />
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-background/50">
          <Label className="text-xs">Exclusive</Label>
          <Switch
            checked={video.isExclusive ?? false}
            onCheckedChange={(checked) => onChange({ isExclusive: checked })}
          />
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-background/50">
          <Label className="text-xs">Stripe</Label>
          <Switch
            checked={video.stripeEnabled ?? true}
            onCheckedChange={(checked) => onChange({ stripeEnabled: checked })}
          />
        </div>
        <div className="flex items-center justify-between p-2 rounded-lg bg-background/50">
          <Label className="text-xs">PayPal</Label>
          <Switch
            checked={video.paypalEnabled ?? true}
            onCheckedChange={(checked) => onChange({ paypalEnabled: checked })}
          />
        </div>
      </div>

      {/* Save Button */}
      <Button onClick={onSave} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-9" disabled={isLoading}>
        {isLoading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
        {saveLabel}
      </Button>
    </div>
  );
};
