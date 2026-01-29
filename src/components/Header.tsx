import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Send, Menu, X } from "lucide-react";
import { useState } from "react";

const TELEGRAM_LINK = "https://t.me/videosplus";

export const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Videos", path: "/videos" },
    { name: "VIP Access", path: "/vip" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gradient">VideosPlus</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
              18+
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.path) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
              <Button className="btn-telegram gap-2 hidden sm:flex">
                <Send className="w-4 h-4" />
                Telegram
              </Button>
            </a>
            
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(link.path)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <a 
                href={TELEGRAM_LINK} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-2"
              >
                <Button className="btn-telegram gap-2 w-full">
                  <Send className="w-4 h-4" />
                  Join Telegram
                </Button>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
