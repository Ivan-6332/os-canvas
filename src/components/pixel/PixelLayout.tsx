import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PixelLockScreen } from './PixelLockScreen';
import { PixelHomeScreen } from './PixelHomeScreen';

export function PixelLayout() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!isUnlocked ? (
        <motion.div
          key="lock"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <PixelLockScreen onUnlock={() => setIsUnlocked(true)} />
        </motion.div>
      ) : (
        <motion.div
          key="home"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <PixelHomeScreen />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
