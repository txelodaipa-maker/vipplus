import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  index?: number;
}

export const AnimatedCard = ({ children, className = "", index = 0 }: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.3 }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedButton = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const AnimatedBadge = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        ease: "backOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FloatingElement = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      animate={{ 
        y: [0, -8, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const PulseElement = ({ children, className = "" }: { children: ReactNode; className?: string }) => {
  return (
    <motion.div
      animate={{ 
        scale: [1, 1.05, 1],
        opacity: [1, 0.8, 1]
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
