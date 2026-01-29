import { Button } from "@/components/ui/button";
import { Play, Send, CreditCard } from "lucide-react";
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
      <div className="relative aspect-video bg-muted">
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
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            
            {/* Play overlay */}
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center glow-primary transition-transform hover:scale-110">
                <Play className="w-7 h-7 text-primary-foreground ml-1" />
              </div>
            </button>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPlaying(true)}
            className="gap-1.5 flex-1"
          >
            <Play className="w-4 h-4" />
            Preview
          </Button>
          <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer" className="flex-1">
            <Button size="sm" className="btn-telegram gap-1.5 w-full">
              <Send className="w-4 h-4" />
              Telegram
            </Button>
          </a>
          <Button
            size="sm"
            className="gradient-primary text-primary-foreground gap-1.5 flex-1"
          >
            <CreditCard className="w-4 h-4" />
            Pay Now
          </Button>
        </div>

        {/* Payment Methods */}
        <div className="pt-3 border-t border-border/50">
          <p className="text-xs text-muted-foreground mb-2">Payment methods:</p>
          <div className="flex gap-2">
            <span className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">
              Stripe
            </span>
            <span className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">
              PayPal
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-2 italic">
            After payment, send proof via Telegram to get access.
          </p>
        </div>
      </div>
    </div>
  );
};
