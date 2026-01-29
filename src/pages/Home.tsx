import { PreviewCard } from "@/components/PreviewCard";
import { Button } from "@/components/ui/button";
import { Send, Star, Users, Eye, ArrowRight, Zap, CreditCard, CheckCircle } from "lucide-react";
import { useContentStore } from "@/stores/contentStore";
import { Link } from "react-router-dom";

const TELEGRAM_LINK = "https://t.me/videosplus";

const Home = () => {
  const { videos, settings } = useContentStore();
  const previewVideos = videos.filter((v) => v.isActive && !v.isVip);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="gradient-hero py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white space-y-6">
            <p className="text-sm opacity-90">We do not share or store your data. It is 100% secure.</p>
            
            <h1 className="text-3xl md:text-5xl font-bold">
              🎉 Special Offer - All Content {settings.offerPrice}
            </h1>
            
            <p className="text-lg opacity-90">
              Complete collection • Instant delivery • Secure payment
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 pt-4">
              <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 gap-2">
                  <Send className="w-4 h-4" />
                  Telegram
                </Button>
              </a>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2 font-semibold">
                <CreditCard className="w-4 h-4" />
                Pay {settings.offerPrice} Now
              </Button>
            </div>

            {/* Features */}
            <div className="flex flex-wrap justify-center gap-6 pt-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Full access</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                <span>Auto delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                <span>One-time payment</span>
              </div>
            </div>

            <div className="pt-4">
              <ArrowRight className="w-6 h-6 mx-auto animate-bounce opacity-60" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-6 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">Available Videos</h2>
              <p className="text-muted-foreground">From $25.00</p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <div className="stat-badge">
                <Users className="w-3.5 h-3.5" />
                <span>1251+ Happy Customers</span>
              </div>
              <div className="stat-badge">
                <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                <span>4.5/5 Rating</span>
              </div>
              <div className="online-badge">
                <span className="w-2 h-2 rounded-full bg-success pulse-dot"></span>
                <span>65 online</span>
              </div>
              <div className="stat-badge">
                <span>Up to $100.00</span>
              </div>
              <div className="stat-badge">
                <span>Avg: $42.67</span>
              </div>
            </div>

            <Link to="/videos">
              <Button variant="outline" className="gap-2">
                View All Videos
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Video Grid */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {previewVideos.map((video, index) => (
              <div key={video.id} className={`animate-fade-in-delay-${Math.min(index % 3 + 1, 2)}`}>
                <PreviewCard
                  id={video.id}
                  title={video.title}
                  thumbnail={video.thumbnail}
                  videoUrl={video.videoUrl}
                  price={29.99}
                  views="2.5K"
                  duration="2min 30s"
                  addedTime="1 week ago"
                />
              </div>
            ))}
          </div>

          {previewVideos.length === 0 && (
            <div className="text-center py-16">
              <div className="glass-card p-12 max-w-md mx-auto">
                <Eye className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No videos available</h3>
                <p className="text-muted-foreground">New content coming soon.</p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 border-t border-border bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-2xl font-bold">Get All Content for {settings.offerPrice}</h2>
            <p className="text-muted-foreground">
              Complete collection with instant delivery. One-time payment, lifetime access.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="btn-telegram gap-2">
                  <Send className="w-4 h-4" />
                  Contact on Telegram
                </Button>
              </a>
              <Button size="lg" className="btn-pay gap-2">
                <CreditCard className="w-4 h-4" />
                Pay Instantly
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
