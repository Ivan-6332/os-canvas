import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Wifi, Signal, BatteryFull } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';
import pixelWallpaper from '@/assets/pixel-wallpaper.jpg';

interface PixelLockScreenProps {
  onUnlock: () => void;
}

export function PixelLockScreen({ onUnlock }: PixelLockScreenProps) {
  const [showHint, setShowHint] = useState(false);
  const [time, setTime] = useState(new Date());
  const [isUnlocking, setIsUnlocking] = useState(false);

  const { loginCredentials } = portfolioData;

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleUnlock = () => {
    setIsUnlocking(true);
    setTimeout(onUnlock, 500);
  };

  const formatTime = () => {
    return time.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: false 
    });
  };

  const formatDate = () => {
    return time.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <motion.div 
      className={`relative h-screen w-screen overflow-hidden ${isUnlocking ? 'animate-pixel-unlock' : ''}`}
    >
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${pixelWallpaper})` }}
      />

      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-3 z-20">
        <span className="text-sm font-medium text-pixel-on-surface">
          {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
        </span>
        <div className="flex items-center gap-2 text-pixel-on-surface">
          <Signal size={16} />
          <Wifi size={16} />
          <BatteryFull size={16} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-8">
        {/* Large Clock */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="text-8xl font-extralight text-pixel-on-surface tracking-tight">
            {formatTime()}
          </div>
          <div className="mt-4 text-xl text-pixel-on-surface/80">
            {formatDate()}
          </div>
        </motion.div>

        {/* Swipe to Unlock Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-6"
        >
          <motion.button
            onClick={handleUnlock}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 rounded-full bg-pixel-primary text-white font-medium text-lg shadow-lg"
          >
            Tap to Unlock
          </motion.button>

          {/* Login Hint */}
          <motion.button
            onClick={() => setShowHint(!showHint)}
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-center gap-2 mx-auto px-4 py-2 rounded-full bg-pixel-on-surface/10 backdrop-blur-lg text-pixel-on-surface/80 text-sm"
          >
            <Lightbulb size={16} />
            Login Tip 💡
          </motion.button>
        </motion.div>

        {/* Hint Panel */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="mt-6 w-80 rounded-3xl bg-pixel-surface/90 backdrop-blur-xl p-5 shadow-xl"
            >
              <p className="text-sm text-pixel-on-surface leading-relaxed">
                {loginCredentials.pixel.hint}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full bg-pixel-on-surface/30" />
    </motion.div>
  );
}
