import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { X, Loader2, Video } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface VideoUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export const VideoUpload = ({ value, onChange }: VideoUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string>(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      toast.error("Apenas vídeos são permitidos");
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      toast.error("Arquivo muito grande. Máximo 100MB");
      return;
    }

    setIsUploading(true);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("videos")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("videos")
        .getPublicUrl(fileName);

      setPreview(urlData.publicUrl);
      onChange(urlData.publicUrl);
      toast.success("Vídeo enviado!");
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error("Erro ao enviar: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview("");
    onChange("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {preview ? (
        <div className="relative group">
          <video
            src={preview}
            className="w-full h-28 object-cover rounded-lg border border-border"
          />
          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
            <Video className="w-8 h-8 text-white" />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-7 w-7 bg-background/80 hover:bg-destructive/20 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleRemove}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className="w-full h-28 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors"
        >
          {isUploading ? (
            <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
          ) : (
            <>
              <Video className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Upload Vídeo</span>
            </>
          )}
        </div>
      )}
    </div>
  );
};
