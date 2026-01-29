import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ShieldAlert } from "lucide-react";

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
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="glass-card border-primary/20 max-w-md" hideCloseButton>
        <DialogHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full gradient-primary flex items-center justify-center glow-primary">
            <ShieldAlert className="w-8 h-8 text-primary-foreground" />
          </div>
          <DialogTitle className="text-2xl font-bold">Age Verification Required</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          <p className="text-center text-muted-foreground leading-relaxed">
            <span className="text-foreground font-semibold">Adult content (18+).</span> By accessing this site, you confirm you are at least 18 years old.
          </p>
          
          <div className="flex flex-col gap-3">
            <Button 
              onClick={handleVerify}
              className="w-full gradient-primary text-primary-foreground font-semibold py-6 text-lg glow-primary hover:opacity-90 transition-opacity"
            >
              I am 18+
            </Button>
            <Button 
              onClick={handleLeave}
              variant="outline"
              className="w-full py-6 text-lg border-border hover:bg-muted"
            >
              Leave
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground text-center">
            By entering, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
