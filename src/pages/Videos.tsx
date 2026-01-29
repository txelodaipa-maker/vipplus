import { Button } from "@/components/ui/button";
import { Lock, Send, Sparkles } from "lucide-react";
import { useContentStore } from "@/stores/contentStore";

const TELEGRAM_LINK = "https://t.me/videosplus";

const Videos = () => {
  const { videos } = useContentStore();
  const vipVideos = videos.filter((v) => v.isActive && v.isVip);

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-premium text-warning-foreground mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-bold">VIP CONTENT</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">Exclusive Videos</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            This content is available only for VIP members. Contact us to get access.
          </p>
        </div>

        {/* Locked Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {vipVideos.map((video) => (
            <div key={video.id} className="glass-card overflow-hidden group">
              <div className="relative aspect-video bg-muted">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover opacity-50 blur-sm"
                />
                <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 mx-auto rounded-full bg-muted/80 flex items-center justify-center">
                      <Lock className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">VIP Only</p>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold line-clamp-2 mb-3">{video.title}</h3>
                <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full btn-telegram gap-2">
                    <Send className="w-4 h-4" />
                    Unlock via Telegram
                  </Button>
                </a>
              </div>
            </div>
          ))}

          {/* Placeholder cards if no VIP videos */}
          {vipVideos.length === 0 &&
            [1, 2, 3].map((i) => (
              <div key={i} className="glass-card overflow-hidden">
                <div className="relative aspect-video bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-3">
                      <div className="w-16 h-16 mx-auto rounded-full bg-muted/80 flex items-center justify-center">
                        <Lock className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground">VIP Only</p>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold mb-3">Premium Content #{i}</h3>
                  <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full btn-telegram gap-2">
                      <Send className="w-4 h-4" />
                      Unlock via Telegram
                    </Button>
                  </a>
                </div>
              </div>
            ))}
        </div>

        {/* CTA */}
        <div className="max-w-2xl mx-auto glass-card p-8 text-center space-y-6">
          <h2 className="text-2xl font-bold">Get VIP Access Now</h2>
          <p className="text-muted-foreground">
            Unlock all VIP content with a single payment. Contact us on Telegram for instant access.
          </p>
          <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="btn-telegram gap-2">
              <Send className="w-5 h-5" />
              Contact on Telegram
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Videos;
