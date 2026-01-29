import { Button } from "@/components/ui/button";
import { Play, Send, CreditCard, Lock } from "lucide-react";
import { useState } from "react";

interface PreviewCardProps {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl?: string;
}

const TELEGRAM_LINK = "https://t.me/videosplus";

export const PreviewCard = ({ id, title, thumbnail, videoUrl }: PreviewCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="glass-card overflow-hidden hover-lift group">
      {/* Video/Thumbnail */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        {isPlaying && videoUrl ? (
          <video
            src={videoUrl}
            controls
            autoPlay
            className="w-full h-full object-cover"
          />
        ) : (
          <>
            <img
              src={thumbnail}
              alt={title}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            
            {/* VIP Badge */}
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm text-xs font-semibold border border-border/50">
                <Lock className="w-3 h-3 text-primary" />
                Premium
              </span>
            </div>
            
            {/* Play overlay */}
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center group/play"
            >
              <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center glow-primary-lg transition-all duration-300 group-hover/play:scale-110">
                <Play className="w-9 h-9 text-primary-foreground ml-1" fill="currentColor" />
              </div>
            </button>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-6 space-y-5">
        <h3 className="text-xl font-bold line-clamp-2 leading-tight">{title}</h3>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPlaying(true)}
            className="gap-1.5 h-11 border-border/50 hover:bg-secondary/80"
          >
            <Play className="w-4 h-4" />
            <span className="hidden sm:inline">Preview</span>
          </Button>
          <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="btn-telegram gap-1.5 w-full h-11">
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Telegram</span>
            </Button>
          </a>
          <Button
            size="sm"
            className="btn-premium text-primary-foreground gap-1.5 h-11"
          >
            <CreditCard className="w-4 h-4" />
            <span className="hidden sm:inline">Pagar</span>
          </Button>
        </div>

        {/* Payment Methods */}
        <div className="pt-4 border-t border-border/30">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <span className="text-xs px-3 py-1.5 rounded-full bg-secondary/80 text-secondary-foreground font-medium">
                Stripe
              </span>
              <span className="text-xs px-3 py-1.5 rounded-full bg-secondary/80 text-secondary-foreground font-medium">
                PayPal
              </span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            💬 Envie comprovante via Telegram para acesso.
          </p>
        </div>
      </div>
    </div>
  );
};
