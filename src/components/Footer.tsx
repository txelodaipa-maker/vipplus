import { Link } from "react-router-dom";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const TELEGRAM_LINK = "https://t.me/videosplus";

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-gradient">About</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-foreground font-semibold">VideosPlus</span><br />
              We offer exclusive premium adult content for our users. All videos are carefully selected to ensure the highest quality viewing experience for our 18+ audience.
            </p>
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
              <Button className="btn-telegram gap-2 mt-2">
                <Send className="w-4 h-4" />
                Join Telegram
              </Button>
            </a>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/videos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Videos
              </Link>
              <span className="text-xs px-2 py-1 rounded bg-primary/20 text-primary font-medium w-fit">
                18+ Adults Only
              </span>
            </nav>
          </div>

          {/* Legal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Legal Information</h3>
            <div className="text-xs text-muted-foreground space-y-2">
              <p>• Adult content disclaimer (18+)</p>
              <p>• All models were 18+ at time of production</p>
              <p>• USC 2257 Record-Keeping Requirements Compliance Statement</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-border/50 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            © 2026 <span className="text-gradient font-semibold">VideosPlus</span>. All rights reserved. Adults only.
          </p>
          <p className="text-xs text-muted-foreground">
            By accessing this site you agree that you are at least 18 years old.
          </p>
        </div>
      </div>
    </footer>
  );
};
