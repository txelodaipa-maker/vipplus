import { Button } from "@/components/ui/button";
import { Play, Send, CreditCard, Eye, Clock } from "lucide-react";
import { useState } from "react";

interface PreviewCardProps {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl?: string;
  price?: number;
  views?: string;
  duration?: string;
  addedTime?: string;
}

const TELEGRAM_LINK = "https://t.me/videosplus";

export const PreviewCard = ({ 
  id, 
  title, 
  thumbnail, 
  videoUrl, 
  price = 30,
  views = "1.2K",
  duration = "1min 30s",
  addedTime = "2 weeks ago"
}: PreviewCardProps) => {
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
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            
            {/* Price Badge */}
            <div className="absolute top-3 right-3">
              <span className="price-badge">${price.toFixed(2)}</span>
            </div>
            
            {/* Duration Badge */}
            <div className="absolute bottom-3 right-3">
              <span className="video-duration">
                <Clock className="w-3 h-3" />
                {duration}
              </span>
            </div>
            
            {/* Play overlay on hover */}
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center bg-foreground/0 hover:bg-foreground/20 transition-colors"
            >
              <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                <Play className="w-6 h-6 text-foreground ml-1" fill="currentColor" />
              </div>
            </button>
          </>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold line-clamp-2 text-sm leading-tight">{title}</h3>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            <span>{views} views</span>
          </div>
          <span>{addedTime}</span>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-3 gap-2 pt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPlaying(true)}
            className="gap-1 text-xs h-9"
          >
            <Play className="w-3.5 h-3.5" />
            Preview
          </Button>
          <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="btn-telegram gap-1 w-full text-xs h-9">
              <Send className="w-3.5 h-3.5" />
              Telegram
            </Button>
          </a>
          <Button
            size="sm"
            className="btn-pay gap-1 text-xs h-9"
          >
            <CreditCard className="w-3.5 h-3.5" />
            Pay
          </Button>
        </div>
      </div>
    </div>
  );
};
