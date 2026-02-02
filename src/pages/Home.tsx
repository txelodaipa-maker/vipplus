import { PreviewCard } from "@/components/PreviewCard";
import { OpenVideoCard } from "@/components/OpenVideoCard";
import { Button } from "@/components/ui/button";
import { Send, Star, Users, Eye, ArrowRight, Zap, CreditCard, CheckCircle, ArrowDown, Loader2, Play } from "lucide-react";
import { useActiveVideos } from "@/hooks/useVideos";
import { useSettings } from "@/hooks/useSettings";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { AnimatedButton, FloatingElement, PulseElement } from "@/components/animations/AnimatedCard";

const Home = () => {
  const { data: videos = [], isLoading: videosLoading } = useActiveVideos();
  const { data: settings } = useSettings();
  
  const vipVideos = videos.filter((v) => v.isVip);
  const exclusiveVideos = videos.filter((v) => v.isExclusive && !v.isVip);
  const openVideos = videos.filter((v) => v.isOpen && !v.isVip && !v.isExclusive);
  const previewVideos = videos.filter((v) => !v.isVip && !v.isExclusive && !v.isOpen);

  // Calculate stats from videos
  const minPrice = videos.length > 0 ? Math.min(...videos.map(v => v.price || 25)) : 25;
  const maxPrice = videos.length > 0 ? Math.max(...videos.map(v => v.price || 100)) : 100;
  const avgPrice = videos.length > 0 
    ? (videos.reduce((sum, v) => sum + (v.price || 0), 0) / videos.length).toFixed(2) 
    : "42.67";

  // Generate Telegram message for special offer
  const generateOfferMessage = () => {
    const message = `Hi! I'm interested in the $50 offer including all content (TODAY ONLY). Could you guide me on how to pay?`;
    return encodeURIComponent(message);
  };

  const telegramOfferLink = `${settings?.telegramLink || "https://t.me/vip_adminx2"}?text=${generateOfferMessage()}`;

  if (videosLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Hero Section */}
      <section className="gradient-hero py-3 md:py-4 relative">
        {/* Animated background shapes */}
        <motion.div 
          className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl"
          animate={{ 
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl"
          animate={{ 
            x: [0, -20, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white space-y-2">
            <motion.p 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm opacity-90"
            >
              We do not share or store your data. It is 100% secure.
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl md:text-3xl font-bold"
            >
              🎉 Special Offer - All Content{" "}
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "backOut" }}
                className="inline-block"
              >
                $50
              </motion.span>
            </motion.h1>

            {/* Urgency badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="inline-block"
            >
              <span className="px-4 py-2 rounded-full text-sm font-bold bg-red-500/90 text-white animate-pulse">
                ⏰ Valid only for TODAY!
              </span>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg opacity-90"
            >
              Complete collection • Instant delivery • Secure payment
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-2 pt-2"
            >
              <a href={telegramOfferLink} target="_blank" rel="noopener noreferrer">
                <AnimatedButton>
                  <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white hover:bg-white/20 gap-2">
                    <Send className="w-4 h-4" />
                    Telegram
                  </Button>
                </AnimatedButton>
              </a>
              <a href={telegramOfferLink} target="_blank" rel="noopener noreferrer">
                <AnimatedButton>
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 gap-2 font-semibold">
                    <CreditCard className="w-4 h-4" />
                    Pay $50 Now
                  </Button>
                </AnimatedButton>
              </a>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-4 border-b border-border">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold">Available Videos</h2>
                <p className="text-muted-foreground">From ${minPrice.toFixed(2)}</p>
              </div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap gap-3"
              >
                {[
                  { icon: Users, text: "1251+ Happy Customers", className: "stat-badge" },
                  { icon: Star, text: "4.5/5 Rating", className: "stat-badge", iconClass: "text-warning fill-warning" },
                ].map((stat, i) => (
                  <motion.div 
                    key={stat.text}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                    className={stat.className}
                  >
                    <stat.icon className={`w-3.5 h-3.5 ${stat.iconClass || ''}`} />
                    <span>{stat.text}</span>
                  </motion.div>
                ))}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                  className="online-badge"
                >
                  <PulseElement>
                    <span className="w-2 h-2 rounded-full bg-success"></span>
                  </PulseElement>
                  <span>65 online</span>
                </motion.div>
                <div className="stat-badge">
                  <span>Up to ${maxPrice.toFixed(2)}</span>
                </div>
                <div className="stat-badge">
                  <span>Avg: ${avgPrice}</span>
                </div>
              </motion.div>

              <Link to="/videos">
                <AnimatedButton>
                  <Button variant="outline" className="gap-2">
                    View All Videos
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </AnimatedButton>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* VIP Section */}
      {vipVideos.length > 0 && (
        <section className="py-12 bg-gradient-to-b from-amber-500/5 to-background border-b border-border">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="text-center mb-8">
                <motion.span 
                  className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  🔥 VIP
                </motion.span>
                <h2 className="text-2xl font-bold mt-3">VIP Content</h2>
                <p className="text-muted-foreground text-sm mt-1">Premium videos with exclusive access</p>
              </div>
            </AnimatedSection>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {vipVideos.map((video) => (
                <StaggerItem key={video.id}>
                  <PreviewCard
                    id={video.id}
                    title={video.title}
                    description={video.description}
                    thumbnail={video.thumbnail}
                    videoUrl={video.videoUrl}
                    paymentLink={video.paymentLink}
                    price={video.price}
                    views={video.views}
                    duration={video.duration}
                    addedTime={video.addedAt}
                    isVip={true}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Exclusive Section */}
      {exclusiveVideos.length > 0 && (
        <section className="py-12 bg-gradient-to-b from-primary/5 to-background border-b border-border">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="text-center mb-8">
                <motion.span 
                  className="px-3 py-1 rounded-full text-xs font-bold bg-primary/20 text-primary border border-primary/30"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  ⭐ EXCLUSIVE
                </motion.span>
                <h2 className="text-2xl font-bold mt-3">Exclusive Content</h2>
                <p className="text-muted-foreground text-sm mt-1">Special curated videos for you</p>
              </div>
            </AnimatedSection>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {exclusiveVideos.map((video) => (
                <StaggerItem key={video.id}>
                  <PreviewCard
                    id={video.id}
                    title={video.title}
                    description={video.description}
                    thumbnail={video.thumbnail}
                    videoUrl={video.videoUrl}
                    paymentLink={video.paymentLink}
                    price={video.price}
                    views={video.views}
                    duration={video.duration}
                    addedTime={video.addedAt}
                    isVip={false}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Open Videos Section - Autoplay on scroll */}
      {openVideos.length > 0 && (
        <section className="py-12 bg-gradient-to-b from-success/5 to-background border-b border-border">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="text-center mb-8">
                <motion.span 
                  className="px-3 py-1 rounded-full text-xs font-bold bg-success/20 text-success border border-success/30"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <Play className="w-3 h-3 inline-block mr-1" />
                  OPEN
                </motion.span>
                <h2 className="text-2xl font-bold mt-3">Open Videos</h2>
                <p className="text-muted-foreground text-sm mt-1">Free videos that play automatically</p>
              </div>
            </AnimatedSection>
            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {openVideos.map((video) => (
                <StaggerItem key={video.id}>
                  <OpenVideoCard
                    id={video.id}
                    title={video.title}
                    videoUrl={video.videoUrl}
                    views={video.views}
                    duration={video.duration}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      )}

      {/* Preview Videos */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {previewVideos.length > 0 && (
            <AnimatedSection>
              <h2 className="text-xl font-bold mb-6">Preview Videos</h2>
            </AnimatedSection>
          )}
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {previewVideos.map((video) => (
              <StaggerItem key={video.id}>
                <PreviewCard
                  id={video.id}
                  title={video.title}
                  description={video.description}
                  thumbnail={video.thumbnail}
                  videoUrl={video.videoUrl}
                  paymentLink={video.paymentLink}
                  price={video.price}
                  views={video.views}
                  duration={video.duration}
                  addedTime={video.addedAt}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>

          {videos.length === 0 && (
            <AnimatedSection className="text-center py-16">
              <div className="glass-card p-12 max-w-md mx-auto">
                <Eye className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No videos available</h3>
                <p className="text-muted-foreground">New content coming soon.</p>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 border-t border-border bg-card">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <motion.div 
              className="max-w-2xl mx-auto text-center space-y-6"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold">For more VIP content or all content</h2>
              <p className="text-muted-foreground">
                Get in touch with us for exclusive access to premium videos and complete content library. Your privacy is our priority.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={telegramOfferLink} target="_blank" rel="noopener noreferrer">
                  <AnimatedButton>
                    <Button size="lg" className="btn-telegram gap-2">
                      <Send className="w-4 h-4" />
                      Contact via Telegram
                    </Button>
                  </AnimatedButton>
                </a>
                <a href={telegramOfferLink} target="_blank" rel="noopener noreferrer">
                  <AnimatedButton>
                    <Button size="lg" className="btn-pay gap-2">
                      <CreditCard className="w-4 h-4" />
                      Pay Instantly
                    </Button>
                  </AnimatedButton>
                </a>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Home;
