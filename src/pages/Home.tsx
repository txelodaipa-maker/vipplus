import { PreviewCard } from "@/components/PreviewCard";
import { Button } from "@/components/ui/button";
import { Send, Sparkles, Shield, CreditCard } from "lucide-react";
import { useContentStore } from "@/stores/contentStore";

const TELEGRAM_LINK = "https://t.me/videosplus";

const Home = () => {
  const { videos, settings } = useContentStore();
  const previewVideos = videos.filter((v) => v.isActive && !v.isVip);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary animate-pulse-glow">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Special Offer</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              🎉 All Content{" "}
              <span className="text-gradient">{settings.offerPrice}</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Get exclusive access to our premium collection. High-quality content, instant delivery, complete privacy.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="btn-telegram gap-2 text-lg px-8">
                  <Send className="w-5 h-5" />
                  Join Telegram
                </Button>
              </a>
              <Button
                size="lg"
                className="gradient-primary text-primary-foreground gap-2 text-lg px-8 glow-primary"
              >
                <CreditCard className="w-5 h-5" />
                Pay Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 border-y border-border/50 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">100% Privacy</h3>
                <p className="text-sm text-muted-foreground">Your data is protected</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 rounded-xl bg-telegram flex items-center justify-center">
                <Send className="w-6 h-6 text-telegram-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Telegram Support</h3>
                <p className="text-sm text-muted-foreground">24/7 VIP assistance</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <div className="w-12 h-12 rounded-xl bg-success flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-success-foreground" />
              </div>
              <div>
                <h3 className="font-semibold">Secure Payments</h3>
                <p className="text-sm text-muted-foreground">Stripe & PayPal accepted</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Preview Videos */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Preview Content</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Watch previews of our exclusive content. Pay to unlock the full videos.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {previewVideos.map((video) => (
              <PreviewCard
                key={video.id}
                id={video.id}
                title={video.title}
                thumbnail={video.thumbnail}
                videoUrl={video.videoUrl}
              />
            ))}
          </div>

          {previewVideos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No preview videos available yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Payment Info */}
      <section className="py-16 bg-card/30 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-2xl font-bold">Payment Methods</h2>
            <div className="flex justify-center gap-4">
              <div className="glass-card p-6 flex-1 max-w-xs">
                <CreditCard className="w-10 h-10 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Stripe</h3>
                <p className="text-sm text-muted-foreground">
                  Secure card payment processing
                </p>
              </div>
              <div className="glass-card p-6 flex-1 max-w-xs">
                <div className="w-10 h-10 mx-auto mb-3 rounded bg-[#0070ba] flex items-center justify-center text-primary-foreground font-bold text-sm">
                  PP
                </div>
                <h3 className="font-semibold mb-2">PayPal</h3>
                <p className="text-sm text-muted-foreground">
                  Manual confirmation process
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground italic">
              After payment, send proof privately via Telegram to get access.
            </p>
          </div>
        </div>
      </section>

      {/* VIP Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto glass-card p-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-premium text-warning-foreground">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-bold">VIP ACCESS</span>
            </div>
            
            <h2 className="text-2xl font-bold">For more VIP content or all content</h2>
            <p className="text-muted-foreground">
              Get in touch with us for exclusive access to premium videos and complete content library. Your privacy is our priority.
            </p>
            
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="btn-telegram gap-2">
                <Send className="w-5 h-5" />
                Contact on Telegram
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
