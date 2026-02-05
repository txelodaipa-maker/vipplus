import { Link } from "react-router-dom";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const TELEGRAM_LINK = "https://t.me/Dopamina_1";

export const Footer = () => {
  return (
    <motion.footer 
      className="border-t border-border bg-card"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <motion.div 
            className="md:col-span-2 space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold">VideosPlus</h3>
              <motion.span 
                className="text-[10px] px-1.5 py-0.5 rounded bg-primary text-primary-foreground font-bold"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                18+
              </motion.span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We offer exclusive premium adult content for our users. All videos are carefully selected to ensure the highest quality viewing experience for our 18+ audience.
            </p>
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button size="sm" className="btn-telegram gap-2">
                  <Send className="w-4 h-4" />
                  Join Telegram
                </Button>
              </motion.div>
            </a>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="font-semibold">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </motion.div>
              <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <Link to="/videos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Videos
                </Link>
              </motion.div>
              <span className="text-xs px-2 py-1 rounded bg-primary/10 text-primary font-medium w-fit">
                18+ Adults Only
              </span>
            </nav>
          </motion.div>

          {/* Legal Information */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="font-semibold">Legal</h3>
            <div className="text-xs text-muted-foreground space-y-1.5">
              <p>• Adult content (18+)</p>
              <p>• All models 18+ at production</p>
              <p>• USC 2257 Compliant</p>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          className="mt-10 pt-6 border-t border-border text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm text-muted-foreground">
            © 2026 <span className="font-semibold">VideosPlus</span>. All rights reserved. Adults only.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            By accessing this site you confirm you are 18+ years old.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};
