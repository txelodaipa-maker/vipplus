import { Button } from "@/components/ui/button";
import { Play, Send, CreditCard, Eye, Clock } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContentStore } from "@/stores/contentStore";

interface PreviewCardProps {
  id: string;
  title: string;
  description?: string;
  thumbnail: string;
  videoUrl?: string;
  paymentLink?: string;
  price?: number;
  views?: string;
  duration?: string;
  addedTime?: string;
}

export const PreviewCard = ({ 
  id, 
  title, 
  description,
  thumbnail, 
  videoUrl, 
  paymentLink,
  price = 30,
  views = "1.2K",
  duration = "1min 30s",
  addedTime = "2 weeks ago"
}: PreviewCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { settings } = useContentStore();

  // Generate Telegram message with video details
  const generateTelegramMessage = () => {
    const message = `🎬 **${title}**

💰 **Price:** $${price.toFixed(2)}
⏱️ **Duration:** ${duration}
👀 **Views:** ${views}
📅 **Added:** ${addedTime}

📝 **Description:**
${description || title}

Please let me know how to proceed with payment.`;
    
    return encodeURIComponent(message);
  };

  const telegramLink = `${settings.telegramLink}?text=${generateTelegramMessage()}`;

  return (
    <motion.div 
      className="glass-card overflow-hidden group"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Video/Thumbnail */}
      <div className="relative aspect-video bg-muted overflow-hidden">
        <AnimatePresence mode="wait">
          {isPlaying && videoUrl ? (
            <motion.video
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              src={videoUrl}
              controls
              autoPlay
              className="w-full h-full object-cover"
            />
          ) : (
            <motion.div key="thumbnail" className="relative w-full h-full">
              <motion.img
                src={thumbnail}
                alt={title}
                className="w-full h-full object-cover"
                animate={{ scale: isHovered ? 1.08 : 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
              
              {/* Price Badge */}
              <motion.div 
                className="absolute top-3 right-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
              >
                <span className="price-badge">${price.toFixed(2)}</span>
              </motion.div>
              
              {/* Duration Badge */}
              <motion.div 
                className="absolute bottom-3 right-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <span className="video-duration">
                  <Clock className="w-3 h-3" />
                  {duration}
                </span>
              </motion.div>
              
              {/* Play overlay on hover */}
              <motion.button
                onClick={() => videoUrl && setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center bg-foreground/0"
                animate={{ backgroundColor: isHovered ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0)" }}
                transition={{ duration: 0.3 }}
              >
                <motion.div 
                  className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-xl"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ 
                    opacity: isHovered ? 1 : 0, 
                    scale: isHovered ? 1 : 0.5 
                  }}
                  transition={{ duration: 0.3, ease: "backOut" }}
                >
                  <Play className="w-7 h-7 text-foreground ml-1" fill="currentColor" />
                </motion.div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        <h3 className="font-semibold line-clamp-1 text-sm leading-tight">{title}</h3>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>{views}</span>
          </div>
          <span>{addedTime}</span>
        </div>

        {/* Action Buttons - 3 columns like reference site */}
        <div className="grid grid-cols-3 gap-1.5 pt-1">
          {/* Preview Button */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button 
              size="sm" 
              variant="outline"
              className="gap-1 w-full text-xs h-8"
              onClick={() => videoUrl && setIsPlaying(true)}
            >
              <Play className="w-3 h-3" />
              Preview
            </Button>
          </motion.div>

          {/* Telegram Button */}
          <a href={telegramLink} target="_blank" rel="noopener noreferrer">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="h-full">
              <Button size="sm" className="btn-telegram gap-1 w-full text-xs h-8">
                <Send className="w-3 h-3" />
                Telegram
              </Button>
            </motion.div>
          </a>

          {/* Pay Button */}
          <a href={paymentLink || "#"} target="_blank" rel="noopener noreferrer">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button size="sm" className="btn-pay gap-1 text-xs h-8 w-full">
                <CreditCard className="w-3 h-3" />
                Pay
              </Button>
            </motion.div>
          </a>
        </div>
      </div>
    </motion.div>
  );
};
