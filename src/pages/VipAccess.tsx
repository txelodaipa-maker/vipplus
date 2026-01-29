import { Button } from "@/components/ui/button";
import { Send, Sparkles, Shield, Star, Crown, CheckCircle } from "lucide-react";

const TELEGRAM_LINK = "https://t.me/videosplus";

const VipAccess = () => {
  const benefits = [
    "Access to all premium content",
    "New releases every week",
    "Behind-the-scenes exclusive",
    "Direct contact with creators",
    "Priority support 24/7",
    "Lifetime updates included",
  ];

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full gradient-premium text-warning-foreground mb-4">
            <Crown className="w-4 h-4" />
            <span className="text-sm font-bold">VIP MEMBERSHIP</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Unlock <span className="text-gradient-premium">VIP Access</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Get in touch with us for exclusive access to premium videos and complete content library.
          </p>
        </div>

        {/* Main CTA Card */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="glass-card p-8 md:p-12 text-center space-y-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 gradient-premium" />
            
            <div className="w-20 h-20 mx-auto rounded-full gradient-premium flex items-center justify-center">
              <Star className="w-10 h-10 text-warning-foreground" />
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold">For more VIP content or all content</h2>
              <p className="text-muted-foreground max-w-lg mx-auto">
                Get in touch with us for exclusive access to premium videos and complete content library. Your privacy is our priority.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-left max-w-lg mx-auto">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="btn-telegram gap-2 text-lg px-10 py-6">
                  <Send className="w-5 h-5" />
                  Contact on Telegram
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="glass-card p-6 text-center space-y-3">
            <Shield className="w-10 h-10 mx-auto text-primary" />
            <h3 className="font-semibold">100% Privacy</h3>
            <p className="text-sm text-muted-foreground">
              Your data and identity are fully protected
            </p>
          </div>
          <div className="glass-card p-6 text-center space-y-3">
            <Sparkles className="w-10 h-10 mx-auto text-warning" />
            <h3 className="font-semibold">Premium Quality</h3>
            <p className="text-sm text-muted-foreground">
              Only the highest quality content available
            </p>
          </div>
          <div className="glass-card p-6 text-center space-y-3">
            <Send className="w-10 h-10 mx-auto text-telegram" />
            <h3 className="font-semibold">Instant Access</h3>
            <p className="text-sm text-muted-foreground">
              Get access immediately after confirmation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VipAccess;
