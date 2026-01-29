import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const AgeVerificationModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem("age_verified");
    if (!verified) {
      setIsOpen(true);
    }
  }, []);

  const handleVerify = () => {
    localStorage.setItem("age_verified", "true");
    setIsOpen(false);
  };

  const handleLeave = () => {
    window.location.href = "https://www.google.com";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={() => {}}>
          <DialogContent className="max-w-lg p-0 overflow-hidden border-0 bg-transparent" hideCloseButton>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "backOut" }}
              className="bg-card rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Header with Warning Icon */}
              <motion.div 
                className="bg-gradient-to-b from-card to-muted pt-8 pb-4 text-center"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                {/* Warning Triangle */}
                <motion.div 
                  className="flex justify-center mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <div className="w-20 h-20 rounded-lg bg-warning flex items-center justify-center rotate-0">
                    <AlertTriangle className="w-12 h-12 text-warning-foreground" strokeWidth={2.5} />
                  </div>
                </motion.div>

                {/* Title with animated circles */}
                <motion.h2 
                  className="text-3xl md:text-4xl font-bold tracking-wider flex items-center justify-center gap-4 text-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.span 
                    className="w-10 h-10 rounded-full bg-muted-foreground/20"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span>AGE VERIFICATION</span>
                  <motion.span 
                    className="w-10 h-10 rounded-full bg-warning"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                </motion.h2>
              </motion.div>

              {/* Warning Banner - Blue */}
              <motion.div 
                className="gradient-hero py-5 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-white font-bold tracking-widest text-lg md:text-xl">
                  ADULT CONTENT - 18+ ONLY
                </p>
              </motion.div>
              
              {/* Buttons */}
              <motion.div 
                className="p-6 md:p-8 bg-card space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex gap-4">
                  <motion.div 
                    className="flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      onClick={handleVerify}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 text-base gap-2 rounded-xl"
                    >
                      <CheckCircle className="w-5 h-5" />
                      YES, I AM 18+
                    </Button>
                  </motion.div>
                  <motion.div 
                    className="flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      onClick={handleLeave}
                      variant="outline"
                      className="w-full border-2 border-muted-foreground/30 hover:bg-muted py-6 text-base font-bold gap-2 rounded-xl"
                    >
                      <XCircle className="w-5 h-5" />
                      NO, UNDER 18
                    </Button>
                  </motion.div>
                </div>
                
                <motion.p 
                  className="text-xs text-muted-foreground text-center pt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  By entering, you confirm you are at least 18 years old and agree to our Terms of Service.
                </motion.p>
              </motion.div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
