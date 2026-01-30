import { useRef, useEffect, useState } from "react";
import { Eye, Clock, Play } from "lucide-react";
import { motion } from "framer-motion";

interface OpenVideoCardProps {
  id: string;
  title: string;
  thumbnail: string;
  videoUrl?: string;
  views?: string;
  duration?: string;
}

export const OpenVideoCard = ({
  id,
  title,
  thumbnail,
  videoUrl,
  views = "0",
  duration = "0:00",
}: OpenVideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!videoRef.current || !videoUrl) return;

    if (isVisible) {
      videoRef.current.play().catch(() => {
        // Autoplay blocked, user interaction needed
      });
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [isVisible, videoUrl]);

  const handleVideoClick = () => {
    if (!videoRef.current) return;
    
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      className="glass-card overflow-hidden group cursor-pointer"
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={handleVideoClick}
    >
      <div className="relative aspect-video bg-muted overflow-hidden">
        {videoUrl ? (
          <>
            <video
              ref={videoRef}
              src={videoUrl}
              poster={thumbnail}
              className="w-full h-full object-cover"
              muted
              loop
              playsInline
              preload="metadata"
            />
            {!isPlaying && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center bg-black/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Play className="w-6 h-6 text-white fill-white" />
                </div>
              </motion.div>
            )}
          </>
        ) : (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        )}
        
        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/70 text-white text-xs font-medium">
          {duration}
        </div>

        {/* Open badge */}
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-success/90 text-white text-xs font-bold">
          OPEN
        </div>
      </div>

      <div className="p-3 space-y-2">
        <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            <span>{views} views</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{duration}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
