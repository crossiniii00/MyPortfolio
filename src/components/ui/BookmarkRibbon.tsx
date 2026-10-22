import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';
import { Bookmark, Sparkles, MoveLeft, MoveRight, BookOpen } from 'lucide-react';

interface BookmarkRibbonProps {
  currentPage: 1 | 2;
  onFlip: () => void;
}

export const BookmarkRibbon: React.FC<BookmarkRibbonProps> = ({ currentPage, onFlip }) => {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isPageOne = currentPage === 1;

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    setIsDragging(false);

    if (currentPage === 1) {
      // Pulled left past 40px or flicked left
      if (info.offset.x < -40 || info.velocity.x < -150) {
        onFlip();
      }
    } else {
      // Pulled right past 40px or flicked right
      if (info.offset.x > 40 || info.velocity.x > 150) {
        onFlip();
      }
    }
  };

  // Wait for client-side mount for createPortal
  if (!mounted || typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <div
      id="portfolio-bookmark-root"
      style={{
        position: 'fixed',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 9999,
        ...(isPageOne ? { right: 0 } : { left: 0 }),
      }}
      className="select-none pointer-events-auto"
    >
      <motion.div
        drag="x"
        dragSnapToOrigin={true}
        dragConstraints={isPageOne ? { left: -250, right: 0 } : { left: 0, right: 250 }}
        dragElastic={0.25}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          if (!isDragging) {
            onFlip();
          }
        }}
        className={`cursor-grab active:cursor-grabbing flex items-center relative ${
          isPageOne ? 'flex-row' : 'flex-row-reverse'
        }`}
        title={isPageOne ? 'Click or drag left to flip to Page 2' : 'Click or drag right to flip back to Page 1'}
      >
        {/* Animated Drag Left / Drag Right Prompt Bubble */}
        <motion.div
          initial={{ opacity: 0, x: isPageOne ? 15 : -15 }}
          animate={{
            opacity: isHovered || isDragging ? 1 : 0.85,
            x: 0,
          }}
          transition={{ duration: 0.2 }}
          className={`hidden sm:flex items-center gap-1.5 py-1.5 px-3 rounded-full text-[11px] font-bold shadow-lg border backdrop-blur-md mr-2 ${
            isPageOne
              ? 'bg-[#17191D]/90 border-slate-700 text-[#F5C400]'
              : 'bg-[#155EEF]/90 border-blue-400 text-white ml-2 mr-0'
          }`}
        >
          {isPageOne ? (
            <>
              <MoveLeft className="w-3.5 h-3.5 animate-pulse text-[#F5C400]" />
              <span>{isDragging ? 'Release to flip!' : 'Drag left or click to flip'}</span>
            </>
          ) : (
            <>
              <span>{isDragging ? 'Release to return!' : 'Drag right or click to return'}</span>
              <MoveRight className="w-3.5 h-3.5 animate-pulse text-white" />
            </>
          )}
        </motion.div>

        {/* Physical Bookmark Ribbon Tab */}
        <div
          className={`relative flex items-center gap-3 py-3 px-4 shadow-2xl transition-all duration-200 border-2 ${
            isPageOne
              ? 'bg-[#17191D] border-[#155EEF] text-white rounded-l-2xl pr-3.5 pl-4'
              : 'bg-[#155EEF] border-white text-white rounded-r-2xl pl-3.5 pr-4'
          }`}
          style={{
            boxShadow: '0 15px 35px -5px rgba(0, 0, 0, 0.45), 0 0 15px 2px rgba(21, 94, 239, 0.25)',
          }}
        >
          {/* Gundam Signature Tricolor Edge Stripe */}
          <div
            className={`absolute top-0 bottom-0 w-2 flex flex-col overflow-hidden ${
              isPageOne ? 'right-0 rounded-r' : 'left-0 rounded-l'
            }`}
          >
            <span className="flex-1 bg-[#155EEF]" />
            <span className="flex-1 bg-[#F5C400]" />
            <span className="flex-1 bg-[#D92D20]" />
          </div>

          {/* Golden/Brass Eyelet Hole */}
          <div
            className={`w-2.5 h-2.5 rounded-full border border-black/40 shadow-inner shrink-0 ${
              isPageOne ? 'bg-[#F5C400]' : 'bg-white'
            }`}
          />

          {/* Bookmark Icon */}
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border shadow-xs ${
              isPageOne
                ? 'bg-gradient-to-br from-[#155EEF] to-[#0e44b8] border-[#4382ff] text-white'
                : 'bg-white text-[#155EEF] border-white/70'
            }`}
          >
            {isPageOne ? (
              <Bookmark className="w-4 h-4 fill-white" />
            ) : (
              <BookOpen className="w-4 h-4 fill-[#155EEF]" />
            )}
          </div>

          {/* Bookmark Badge Labels */}
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-black uppercase text-[#F5C400] flex items-center gap-1 tracking-wider">
                <Sparkles className="w-2.5 h-2.5" />
                {isPageOne ? 'PAGE 02' : 'PAGE 01'}
              </span>
              <span
                className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                  isPageOne ? 'bg-[#155EEF] text-white' : 'bg-black/30 text-white'
                }`}
              >
                {isPageOne ? 'Appendix' : 'Portfolio'}
              </span>
            </div>

            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-xs font-black tracking-tight text-white whitespace-nowrap">
                {isPageOne ? 'Technical Lab' : 'Main Portfolio'}
              </span>
              {isPageOne ? (
                <MoveLeft className="w-3 h-3 text-[#F5C400]" />
              ) : (
                <MoveRight className="w-3 h-3 text-white" />
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};
