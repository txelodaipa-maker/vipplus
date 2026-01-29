import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

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
      <DialogContent className="max-w-lg p-0 overflow-hidden border-0" hideCloseButton>
        {/* Header */}
        <div className="gradient-hero p-8 text-center text-white">
          <div className="flex justify-center items-center gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-warning flex items-center justify-center">
              <span className="text-warning-foreground text-lg">⚠</span>
            </div>
          </div>
          <h2 className="text-3xl font-bold tracking-wide flex items-center justify-center gap-3">
            <span className="w-8 h-8 rounded-full bg-white/20"></span>
            AGE VERIFICATION
            <span className="w-8 h-8 rounded-full bg-warning"></span>
          </h2>
        </div>

        {/* Warning Banner */}
        <div className="gradient-hero py-4 text-center">
          <p className="text-white font-bold tracking-widest text-lg">
            ADULT CONTENT - 18+ ONLY
          </p>
        </div>
        
        {/* Buttons */}
        <div className="p-8 bg-card space-y-4">
          <div className="flex gap-4">
            <Button 
              onClick={handleVerify}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-6 text-base gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              YES, I AM 18+
            </Button>
            <Button 
              onClick={handleLeave}
              variant="outline"
              className="flex-1 border-2 border-muted-foreground/30 hover:bg-muted py-6 text-base font-bold gap-2"
            >
              <XCircle className="w-5 h-5" />
              NO, UNDER 18
            </Button>
          </div>
          
          <p className="text-xs text-muted-foreground text-center pt-2">
            By entering, you confirm you are at least 18 years old and agree to our Terms of Service.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};
