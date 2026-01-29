import { Button } from "@/components/ui/button";
import { Lock, Send, Star, Users, Eye, ArrowLeft } from "lucide-react";
import { useContentStore } from "@/stores/contentStore";
import { PreviewCard } from "@/components/PreviewCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { AnimatedSection, StaggerContainer, StaggerItem } from "@/components/animations/AnimatedSection";
import { AnimatedButton, PulseElement } from "@/components/animations/AnimatedCard";

const TELEGRAM_LINK = "https://t.me/videosplus";

const Videos = () => {
  const { videos, settings } = useContentStore();
  const allVideos = videos.filter((v) => v.isActive);
  const vipVideos = videos.filter((v) => v.isActive && v.isVip);
  const previewVideos = videos.filter((v) => v.isActive && !v.isVip);

  return (
    <div className="min-h-screen bg-background">
      {/* Stats Bar */}
      <section className="py-6 border-b border-border bg-card">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <Link to="/">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </Button>
                  </motion.div>
                </Link>
                <div>
                  <h1 className="text-2xl font-bold">All Videos</h1>
                  <p className="text-sm text-muted-foreground">{allVideos.length} videos available</p>
                </div>
              </div>
              
              <motion.div 
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="stat-badge">
                  <Users className="w-3.5 h-3.5" />
                  <span>1251+ Customers</span>
                </div>
                <div className="stat-badge">
                  <Star className="w-3.5 h-3.5 text-warning fill-warning" />
                  <span>4.5/5 Rating</span>
                </div>
                <div className="online-badge">
                  <PulseElement>
                    <span className="w-2 h-2 rounded-full bg-success"></span>
                  </PulseElement>
                  <span>65 online</span>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Preview Videos */}
      {previewVideos.length > 0 && (
        <section className="py-10">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <h2 className="text-xl font-bold mb-6">Preview Videos</h2>
            </AnimatedSection>
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
          </div>
        </section>
      )}

      {/* VIP Content */}
      <section className="py-10 bg-card border-y border-border">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-bold">VIP Content</h2>
              <motion.span 
                className="price-badge text-xs"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                PREMIUM
              </motion.span>
            </div>
          </AnimatedSection>
          
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {vipVideos.map((video) => (
              <StaggerItem key={video.id}>
                <motion.div 
                  className="glass-card overflow-hidden"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative aspect-video bg-muted">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover opacity-40 blur-sm"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div 
                        className="text-center space-y-2"
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="w-14 h-14 mx-auto rounded-full bg-muted flex items-center justify-center">
                          <Lock className="w-6 h-6 text-muted-foreground" />
                        </div>
                        <p className="text-xs text-muted-foreground font-medium">VIP Only</p>
                      </motion.div>
                    </div>
                    <motion.div 
                      className="absolute top-3 right-3"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="price-badge">$45.00</span>
                    </motion.div>
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold text-sm line-clamp-2">{video.title}</h3>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3.5 h-3.5" />
                        <span>5.2K views</span>
                      </div>
                      <span>2 weeks ago</span>
                    </div>
                    <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
                      <AnimatedButton>
                        <Button size="sm" className="w-full btn-telegram gap-2 h-9">
                          <Send className="w-3.5 h-3.5" />
                          Unlock via Telegram
                        </Button>
                      </AnimatedButton>
                    </a>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}

            {/* Placeholder cards if no VIP videos */}
            {vipVideos.length === 0 &&
              [1, 2, 3, 4].map((i) => (
                <StaggerItem key={i}>
                  <motion.div 
                    className="glass-card overflow-hidden"
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative aspect-video bg-muted">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div 
                          className="text-center space-y-2"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="w-14 h-14 mx-auto rounded-full bg-secondary flex items-center justify-center">
                            <Lock className="w-6 h-6 text-muted-foreground" />
                          </div>
                          <p className="text-xs text-muted-foreground font-medium">VIP Only</p>
                        </motion.div>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="price-badge">${(30 + i * 5).toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="p-4 space-y-3">
                      <h3 className="font-semibold text-sm">Premium Content #{i}</h3>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Hidden content</span>
                        <span>VIP access</span>
                      </div>
                      <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
                        <AnimatedButton>
                          <Button size="sm" className="w-full btn-telegram gap-2 h-9">
                            <Send className="w-3.5 h-3.5" />
                            Unlock via Telegram
                          </Button>
                        </AnimatedButton>
                      </a>
                    </div>
                  </motion.div>
                </StaggerItem>
              ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <motion.div 
              className="max-w-2xl mx-auto glass-card p-8 text-center space-y-6"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold">Get All Content for {settings.offerPrice}</h2>
              <p className="text-muted-foreground">
                Unlock all VIP content with a single payment. Contact us on Telegram for instant access.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
                  <AnimatedButton>
                    <Button size="lg" className="btn-telegram gap-2">
                      <Send className="w-4 h-4" />
                      Contact on Telegram
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

export default Videos;
