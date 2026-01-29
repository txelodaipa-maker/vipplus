import { Link } from "react-router-dom";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const TELEGRAM_LINK = "https://t.me/videosplus";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold">VideosPlus</h3>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary text-primary-foreground font-bold">18+</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We offer exclusive premium adult content for our users. All videos are carefully selected to ensure the highest quality viewing experience for our 18+ audience.
            </p>
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="btn-telegram gap-2">
                <Send className="w-4 h-4" />
                Join Telegram
              </Button>
            </a>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/videos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Videos
              </Link>
              <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary font-medium w-fit">
                18+ Adults Only
              </span>
            </nav>
          </div>

          {/* Legal Information */}
          <div className="space-y-4">
            <h3 className="font-semibold">Legal</h3>
            <div className="text-xs text-muted-foreground space-y-1.5">
              <p>• Adult content (18+)</p>
              <p>• All models 18+ at production</p>
              <p>• USC 2257 Compliant</p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 <span className="font-semibold">VideosPlus</span>. All rights reserved. Adults only.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            By accessing this site you confirm you are 18+ years old.
          </p>
        </div>
      </div>
    </footer>
  );
};
