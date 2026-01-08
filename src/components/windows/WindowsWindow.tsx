import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Minus, Square, Maximize2 } from 'lucide-react';

interface WindowsWindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  isActive: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  zIndex: number;
}

export function WindowsWindow({
  id,
  title,
  children,
  isActive,
  isMinimized,
  isMaximized,
  initialPosition = { x: 100, y: 50 },
  initialSize = { width: 700, height: 500 },
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  zIndex,
}: WindowsWindowProps) {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const constraintsRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  const handleDragStart = () => setIsDragging(true);
  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false);
    setPosition({ x: position.x + info.offset.x, y: position.y + info.offset.y });
  };

  if (isMinimized) return null;

  return (
    <motion.div
      ref={windowRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        x: isMaximized ? 0 : position.x,
        y: isMaximized ? 0 : position.y,
        width: isMaximized ? '100%' : size.width,
        height: isMaximized ? 'calc(100vh - 48px)' : size.height,
      }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      style={{ zIndex }}
      className={`absolute top-0 left-0 win-window flex flex-col ${
        isActive ? 'ring-1 ring-primary/50' : ''
      }`}
      onClick={onFocus}
    >
      {/* Title Bar */}
      <motion.div
        drag={!isMaximized}
        dragMomentum={false}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        className={`flex items-center justify-between h-10 px-4 win-glass cursor-move select-none ${
          isActive ? 'bg-card' : 'bg-card/80'
        }`}
      >
        <span className="text-sm font-medium text-foreground truncate">
          {title}
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            className="p-2 rounded hover:bg-muted transition-colors"
          >
            <Minus size={14} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize(); }}
            className="p-2 rounded hover:bg-muted transition-colors"
          >
            {isMaximized ? <Square size={12} /> : <Maximize2 size={14} />}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="p-2 rounded hover:bg-destructive hover:text-destructive-foreground transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 bg-card overflow-auto">
        {children}
      </div>

      {/* Resize Handle */}
      {!isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize"
          onMouseDown={(e) => {
            e.preventDefault();
            setIsResizing(true);
            const startX = e.clientX;
            const startY = e.clientY;
            const startWidth = size.width;
            const startHeight = size.height;

            const handleMouseMove = (moveEvent: MouseEvent) => {
              const newWidth = Math.max(400, startWidth + (moveEvent.clientX - startX));
              const newHeight = Math.max(300, startHeight + (moveEvent.clientY - startY));
              setSize({ width: newWidth, height: newHeight });
            };

            const handleMouseUp = () => {
              setIsResizing(false);
              document.removeEventListener('mousemove', handleMouseMove);
              document.removeEventListener('mouseup', handleMouseUp);
            };

            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
          }}
        />
      )}
    </motion.div>
  );
}
