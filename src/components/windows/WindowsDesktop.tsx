import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { User, Briefcase, Mail, Share2, LucideIcon, RefreshCw, Monitor, Folder, Settings } from 'lucide-react';
import { WindowsWindow } from './WindowsWindow';
import { WindowsDesktopIcon } from './WindowsDesktopIcon';
import { WindowsTaskbar } from './WindowsTaskbar';
import { AboutMeContent } from '../shared/AboutMeContent';
import { MyWorkContent } from '../shared/MyWorkContent';
import { ContactContent } from '../shared/ContactContent';
import { SocialContent } from '../shared/SocialContent';
import windowsWallpaper from '@/assets/windows-wallpaper.jpg';

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

const desktopFolders = [
  { id: 'about', title: 'About Me', icon: User, content: <AboutMeContent /> },
  { id: 'work', title: 'My Work', icon: Briefcase, content: <MyWorkContent /> },
  { id: 'contact', title: 'Contact', icon: Mail, content: <ContactContent /> },
  { id: 'social', title: 'Social', icon: Share2, content: <SocialContent /> },
];

interface ContextMenuState {
  isOpen: boolean;
  x: number;
  y: number;
}

export function WindowsDesktop() {
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [nextZIndex, setNextZIndex] = useState(1);
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({ isOpen: false, x: 0, y: 0 });

  const openWindow = (folder: typeof desktopFolders[0]) => {
    const existingWindow = windows.find(w => w.id === folder.id);
    if (existingWindow) {
      focusWindow(folder.id);
      if (existingWindow.isMinimized) {
        setWindows(prev => prev.map(w => 
          w.id === folder.id ? { ...w, isMinimized: false } : w
        ));
      }
      return;
    }

    const offset = windows.length * 30;
    const newWindow: WindowState = {
      id: folder.id,
      title: folder.title,
      icon: folder.icon,
      isActive: true,
      isMinimized: false,
      isMaximized: false,
      content: folder.content,
      position: { x: 100 + offset, y: 50 + offset },
      zIndex: nextZIndex,
    };

    setWindows(prev => prev.map(w => ({ ...w, isActive: false })).concat(newWindow));
    setNextZIndex(prev => prev + 1);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMinimized: true, isActive: false } : w
    ));
  };

  const maximizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => 
      w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
    ));
  };

  const focusWindow = (id: string) => {
    setWindows(prev => prev.map(w => ({
      ...w,
      isActive: w.id === id,
      isMinimized: w.id === id ? false : w.isMinimized,
      zIndex: w.id === id ? nextZIndex : w.zIndex,
    })));
    setNextZIndex(prev => prev + 1);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ isOpen: true, x: e.clientX, y: e.clientY });
  };

  const closeContextMenu = () => {
    setContextMenu({ isOpen: false, x: 0, y: 0 });
  };

  return (
    <div 
      className="relative h-screen w-screen overflow-hidden"
      onContextMenu={handleContextMenu}
      onClick={closeContextMenu}
    >
      {/* Wallpaper */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${windowsWallpaper})` }}
      />

      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-4 z-10">
        {desktopFolders.map((folder) => (
          <WindowsDesktopIcon
            key={folder.id}
            icon={folder.icon}
            label={folder.title}
            onDoubleClick={() => openWindow(folder)}
          />
        ))}
      </div>

      {/* Windows */}
      <AnimatePresence>
        {windows.map((window) => (
          <WindowsWindow
            key={window.id}
            id={window.id}
            title={window.title}
            isActive={window.isActive}
            isMinimized={window.isMinimized}
            isMaximized={window.isMaximized}
            initialPosition={window.position}
            onClose={() => closeWindow(window.id)}
            onMinimize={() => minimizeWindow(window.id)}
            onMaximize={() => maximizeWindow(window.id)}
            onFocus={() => focusWindow(window.id)}
            zIndex={window.zIndex}
          >
            {window.content}
          </WindowsWindow>
        ))}
      </AnimatePresence>

      {/* Context Menu */}
      <AnimatePresence>
        {contextMenu.isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.1 }}
            className="fixed win-glass rounded-lg py-1 w-56 z-50 shadow-xl"
            style={{ left: contextMenu.x, top: contextMenu.y }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="w-full px-4 py-2 text-left text-sm hover:bg-primary/10 flex items-center gap-3 text-foreground">
              <RefreshCw size={16} />
              Refresh
            </button>
            <button className="w-full px-4 py-2 text-left text-sm hover:bg-primary/10 flex items-center gap-3 text-foreground">
              <Monitor size={16} />
              Display settings
            </button>
            <div className="border-t border-border my-1" />
            <button className="w-full px-4 py-2 text-left text-sm hover:bg-primary/10 flex items-center gap-3 text-foreground">
              <Folder size={16} />
              New folder
            </button>
            <div className="border-t border-border my-1" />
            <button className="w-full px-4 py-2 text-left text-sm hover:bg-primary/10 flex items-center gap-3 text-foreground">
              <Settings size={16} />
              Personalize
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Taskbar */}
      <WindowsTaskbar
        openWindows={windows}
        onWindowClick={focusWindow}
        onStartClick={() => {}}
      />
    </div>
  );
}
