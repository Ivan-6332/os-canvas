import { motion } from 'framer-motion';
import { Search, Wifi, Volume2, BatteryFull, ChevronUp, LucideIcon } from 'lucide-react';

export interface WindowState {
  id: string;
  title: string;
  icon: LucideIcon;
  isActive: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  content: React.ReactNode;
  position: { x: number; y: number };
  zIndex: number;
}

interface WindowsTaskbarProps {
  openWindows: WindowState[];
  onWindowClick: (id: string) => void;
  onStartClick: () => void;
}

export function WindowsTaskbar({ openWindows, onWindowClick, onStartClick }: WindowsTaskbarProps) {
  const now = new Date();
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  const date = now.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' });

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 win-taskbar flex items-center justify-center px-3 z-50">
      {/* Left side */}
      <div className="absolute left-3 flex items-center gap-2">
        {/* Start Button */}
        <motion.button
          onClick={onStartClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-md hover:bg-white/10 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
            <rect x="3" y="3" width="8" height="8" rx="1" fill="currentColor" />
            <rect x="13" y="3" width="8" height="8" rx="1" fill="currentColor" />
            <rect x="3" y="13" width="8" height="8" rx="1" fill="currentColor" />
            <rect x="13" y="13" width="8" height="8" rx="1" fill="currentColor" />
          </svg>
        </motion.button>

        {/* Search */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-white/60 text-sm">
          <Search size={16} />
          <span className="hidden lg:inline">Search</span>
        </div>
      </div>

      {/* Center - Open Windows */}
      <div className="flex items-center gap-1">
        {openWindows.map((window) => (
          <motion.button
            key={window.id}
            onClick={() => onWindowClick(window.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-md transition-colors relative ${
              window.isActive 
                ? 'bg-white/20' 
                : 'hover:bg-white/10'
            }`}
          >
            <window.icon className="h-5 w-5 text-white" />
            {window.isActive && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-primary" />
            )}
          </motion.button>
        ))}
      </div>

      {/* Right side - System Tray */}
      <div className="absolute right-3 flex items-center gap-3">
        <button className="p-1 rounded hover:bg-white/10 transition-colors">
          <ChevronUp size={14} className="text-white/60" />
        </button>
        <div className="flex items-center gap-2 text-white/80">
          <Wifi size={16} />
          <Volume2 size={16} />
          <BatteryFull size={16} />
        </div>
        <div className="text-right text-xs text-white/80">
          <div>{time}</div>
          <div>{date}</div>
        </div>
      </div>
    </div>
  );
}
