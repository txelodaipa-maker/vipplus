import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckCircle, XCircle } from "lucide-react";
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
          <DialogContent className="max-w-lg p-0 overflow-hidden border-0" hideCloseButton>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "backOut" }}
            >
              {/* Header */}
              <motion.div 
                className="gradient-hero p-8 text-center text-white"
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <motion.div 
                  className="flex justify-center items-center gap-4 mb-4"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                >
                  <div className="w-12 h-12 rounded-full bg-warning flex items-center justify-center">
                    <span className="text-warning-foreground text-xl">⚠</span>
                  </div>
                </motion.div>
                <motion.h2 
                  className="text-3xl font-bold tracking-wide flex items-center justify-center gap-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.span 
                    className="w-8 h-8 rounded-full bg-white/20"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  AGE VERIFICATION
                  <motion.span 
                    className="w-8 h-8 rounded-full bg-warning"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                </motion.h2>
              </motion.div>

              {/* Warning Banner */}
              <motion.div 
                className="gradient-hero py-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <p className="text-white font-bold tracking-widest text-lg">
                  ADULT CONTENT - 18+ ONLY
                </p>
              </motion.div>
              
              {/* Buttons */}
              <motion.div 
                className="p-8 bg-card space-y-4"
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
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 text-base gap-2"
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
                      className="w-full border-2 border-muted-foreground/30 hover:bg-muted py-6 text-base font-bold gap-2"
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
