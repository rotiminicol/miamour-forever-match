
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface LoaderProps {
  initialDelay?: number; // Time before showing the loader
  minDisplayTime?: number; // Minimum time to show loader
}

const Loader = ({ initialDelay = 0, minDisplayTime = 1000 }: LoaderProps) => {
  const [showLoader, setShowLoader] = useState(initialDelay === 0);
  const [canHide, setCanHide] = useState(false);
  
  useEffect(() => {
    // If there's an initial delay, show loader after that delay
    if (initialDelay > 0) {
      const timer = setTimeout(() => {
        setShowLoader(true);
      }, initialDelay);
      
      return () => clearTimeout(timer);
    }
    
    // Ensure the loader shows for at least minDisplayTime
    const minTimer = setTimeout(() => {
      setCanHide(true);
    }, minDisplayTime);
    
    return () => clearTimeout(minTimer);
  }, [initialDelay, minDisplayTime]);

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            <Heart className="text-miamour-burgundy h-16 w-16" />
          </motion.div>
          
          <motion.h1
            className="mt-6 text-2xl font-serif text-miamour-burgundy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            miamour.me
          </motion.h1>
          
          <motion.div 
            className="mt-8 bg-gray-100 h-1 w-48 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div 
              className="bg-gradient-to-r from-miamour-pink to-miamour-burgundy h-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 2, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
