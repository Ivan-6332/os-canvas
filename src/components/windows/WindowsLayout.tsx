import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { WindowsLoginScreen } from './WindowsLoginScreen';
import { WindowsDesktop } from './WindowsDesktop';

export function WindowsLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!isLoggedIn ? (
        <motion.div
          key="login"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <WindowsLoginScreen onLogin={() => setIsLoggedIn(true)} />
        </motion.div>
      ) : (
        <motion.div
          key="desktop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <WindowsDesktop />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
