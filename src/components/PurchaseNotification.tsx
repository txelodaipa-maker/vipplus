import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, X } from "lucide-react";

interface Purchase {
  name: string;
  content: string;
  value: number;
}

const randomNames = [
  "João S.", "Maria L.", "Pedro M.", "Ana C.", "Lucas R.",
  "Julia F.", "Carlos A.", "Fernanda B.", "Rafael G.", "Beatriz H.",
  "Gabriel T.", "Larissa N.", "Thiago O.", "Amanda P.", "Diego Q.",
  "Camila V.", "Marcos W.", "Patricia X.", "Bruno Y.", "Daniela Z."
];

const randomContents = [
  "VIP Pack", "Exclusive Video", "Premium Content", "Special Bundle",
  "Full Collection", "VIP Access", "Private Content"
];

const generateRandomPurchase = (): Purchase => {
  const name = randomNames[Math.floor(Math.random() * randomNames.length)];
  const content = randomContents[Math.floor(Math.random() * randomContents.length)];
  const value = Math.floor(Math.random() * 50) + 20; // $20 - $70
  return { name, content, value };
};

export const PurchaseNotification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [purchase, setPurchase] = useState<Purchase | null>(null);

  useEffect(() => {
    // Show first notification after 3-8 seconds
    const initialDelay = Math.random() * 5000 + 3000;
    
    const showNotification = () => {
      setPurchase(generateRandomPurchase());
      setIsVisible(true);
      
      // Hide after 4 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 4000);
    };

    const initialTimeout = setTimeout(showNotification, initialDelay);

    // Show new notification every 10-20 seconds
    const interval = setInterval(() => {
      showNotification();
    }, Math.random() * 10000 + 10000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && purchase && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed top-20 left-4 z-50 bg-card border border-border rounded-lg shadow-xl p-4 max-w-xs"
        >
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          >
            <X className="w-3 h-3" />
          </button>
          
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">
                {purchase.name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                Comprou: {purchase.content}
              </p>
              <p className="text-sm font-bold text-primary mt-1">
                ${purchase.value.toFixed(2)}
              </p>
            </div>
          </div>
          
          <p className="text-[10px] text-muted-foreground mt-2 opacity-70">
            há poucos segundos
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
