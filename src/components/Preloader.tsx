import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStage(1), 500 * 30.5/100),      // Show "Take a deep breath..."
      setTimeout(() => setStage(2), 3000 * 50.5/100),     // Show "Exhale..."
      setTimeout(() => setStage(3), 5500),     // Fade out hya de
      setTimeout(() => onComplete(), 4000),    // Complete
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage < 3 && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          <div className="text-center">
            <AnimatePresence mode="wait">
              {stage === 1 && (
                <motion.p
                  key="inhale"
                  className="font-serif text-2xl md:text-3xl text-ghost tracking-widest"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                >
                  Take a deep breath...
                </motion.p>
              )}
              {stage === 2 && (
                <motion.p
                  key="exhale"
                  className="font-serif text-2xl md:text-3xl text-ghost tracking-widest"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                >
                  Exhale...
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
