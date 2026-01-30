import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

interface SplashScreenProps {
  isVisible: boolean;
}

export const SplashScreen = ({ isVisible }: SplashScreenProps) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              ease: [0.22, 1, 0.36, 1]
            }}
            className="relative"
          >
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 blur-3xl opacity-50"
              style={{ background: "radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, transparent 70%)" }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Logo */}
            <motion.img
              src={logo}
              alt="VIP Plus"
              className="w-64 md:w-80 lg:w-96 relative z-10"
              animate={{ 
                filter: [
                  "drop-shadow(0 0 20px rgba(212, 175, 55, 0.5))",
                  "drop-shadow(0 0 40px rgba(212, 175, 55, 0.8))",
                  "drop-shadow(0 0 20px rgba(212, 175, 55, 0.5))"
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />

            {/* Loading indicator */}
            <motion.div
              className="mt-8 flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="w-12 h-1 bg-gradient-to-r from-purple-600 via-yellow-500 to-purple-600 rounded-full"
                animate={{ scaleX: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
