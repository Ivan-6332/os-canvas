import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Briefcase, Mail, Share2, Wifi, Signal, BatteryFull, X } from 'lucide-react';
import { AboutMeContent } from '../shared/AboutMeContent';
import { MyWorkContent } from '../shared/MyWorkContent';
import { ContactContent } from '../shared/ContactContent';
import { SocialContent } from '../shared/SocialContent';
import pixelWallpaper from '@/assets/pixel-wallpaper.jpg';

const apps = [
  { id: 'about', title: 'About Me', icon: User, color: 'bg-teal-500', content: <AboutMeContent /> },
  { id: 'work', title: 'My Work', icon: Briefcase, color: 'bg-blue-500', content: <MyWorkContent /> },
  { id: 'contact', title: 'Contact', icon: Mail, color: 'bg-green-500', content: <ContactContent /> },
  { id: 'social', title: 'Social', icon: Share2, color: 'bg-purple-500', content: <SocialContent /> },
];

export function PixelHomeScreen() {
  const [openApp, setOpenApp] = useState<typeof apps[0] | null>(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-pixel-surface">
      {/* Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${pixelWallpaper})` }}
      />

      {/* Status Bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-3 z-20 bg-pixel-surface/80 backdrop-blur-sm">
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
      <div className="relative z-10 flex flex-col h-full pt-16 pb-8">
        {/* Clock Widget */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 py-8"
        >
          <div className="pixel-card text-center">
            <div className="text-5xl font-light text-pixel-on-surface">
              {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
            </div>
            <div className="mt-2 text-pixel-on-surface-variant">
              {time.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </div>
          </div>
        </motion.div>

        {/* App Grid */}
        <div className="flex-1 px-6">
          <div className="grid grid-cols-2 gap-4">
            {apps.map((app, index) => (
              <motion.button
                key={app.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setOpenApp(app)}
                className="pixel-card flex flex-col items-center gap-3 py-6 active:scale-95 transition-transform"
              >
                <div className={`p-4 rounded-2xl ${app.color}`}>
                  <app.icon size={28} className="text-white" />
                </div>
                <span className="text-sm font-medium text-pixel-on-surface">
                  {app.title}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="px-6 pt-4">
          <div className="h-14 rounded-full bg-pixel-surface-variant flex items-center justify-center">
            <div className="w-12 h-1 rounded-full bg-pixel-on-surface/30" />
          </div>
        </div>
      </div>

      {/* App Panel */}
      <AnimatePresence>
        {openApp && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="absolute inset-0 z-30 bg-pixel-surface"
          >
            {/* App Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-pixel-outline/30">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${openApp.color}`}>
                  <openApp.icon size={20} className="text-white" />
                </div>
                <span className="font-semibold text-pixel-on-surface">
                  {openApp.title}
                </span>
              </div>
              <button
                onClick={() => setOpenApp(null)}
                className="p-2 rounded-full hover:bg-pixel-surface-variant transition-colors"
              >
                <X size={24} className="text-pixel-on-surface" />
              </button>
            </div>

            {/* App Content */}
            <div className="overflow-auto h-[calc(100%-64px)]">
              {openApp.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Home Indicator */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full bg-pixel-on-surface/30 z-40" />
    </div>
  );
}
