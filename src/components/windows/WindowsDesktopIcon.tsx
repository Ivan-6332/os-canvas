import { motion } from 'framer-motion';
import { LucideIcon, Folder } from 'lucide-react';

interface WindowsDesktopIconProps {
  icon: LucideIcon;
  label: string;
  onDoubleClick: () => void;
}

export function WindowsDesktopIcon({ icon: Icon, label, onDoubleClick }: WindowsDesktopIconProps) {
  return (
    <motion.button
      onDoubleClick={onDoubleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-white/10 transition-colors cursor-pointer select-none group w-24"
    >
      <div className="relative">
        {/* Folder background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Folder className="h-14 w-14 text-amber-400 fill-amber-300 drop-shadow-lg" />
        </div>
        {/* Icon overlay */}
        <div className="relative z-10 flex items-center justify-center h-14 w-14">
          <Icon className="h-5 w-5 text-amber-800 mt-1" />
        </div>
      </div>
      <span className="text-xs text-white text-center drop-shadow-md font-medium leading-tight px-1 py-0.5 rounded bg-black/20 group-hover:bg-black/40 transition-colors">
        {label}
      </span>
    </motion.button>
  );
}
