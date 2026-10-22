import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'motion/react';
import { Bookmark, MoveLeft, MoveRight, BookOpen, Sparkles } from 'lucide-react';
import { MiniOrigamiPlane } from './DoodleInteractable';

interface InteractivePageFlipProps {
  currentPage: 1 | 2;
  onPageChange: (newPage: 1 | 2) => void;
  page1Node: React.ReactNode;
  page2Node: React.ReactNode;
}

export const InteractivePageFlip: React.FC<InteractivePageFlipProps> = ({
  currentPage,
  onPageChange,
  page1Node,
  page2Node,
}) => {
  const [mounted, setMounted] = useState(false);
  const [activePage, setActivePage] = useState<1 | 2>(currentPage);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Persistent scroll position refs to guarantee ZERO jump and ZERO reload
  const page1ScrollRef = useRef(0);
  const page2ScrollRef = useRef(0);

  // dragOffset: for Page 1, ranges from 0 to -windowWidth.
  // for Page 2, ranges from 0 to +windowWidth.
  const dragOffset = useMotionValue(0);

  // Window width tracking
  const windowWidthRef = useRef(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    setMounted(true);
    const handleResize = () => {
      windowWidthRef.current = window.innerWidth;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track scroll position of active page continuously
  useEffect(() => {
    const handleScroll = () => {
      if (isAnimating) return;
      if (activePage === 1) {
        page1ScrollRef.current = window.scrollY;
      } else {
        page2ScrollRef.current = window.scrollY;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activePage, isAnimating]);

  const isPageOne = activePage === 1;

  // Real-time peel distance (positive pixels peeled into view)
  const peelPixels = useTransform(dragOffset, (val) => {
    return isPageOne ? Math.max(0, -val) : Math.max(0, val);
  });

  // Real-time clipPath for the revealed page underneath
  const previewClipPath = useTransform(peelPixels, (val) => {
    return isPageOne
      ? `inset(0px 0px 0px calc(100% - ${val}px))`
      : `inset(0px calc(100% - ${val}px) 0px 0px)`;
  });

  // Fold cylinder position
  const foldRight = useTransform(peelPixels, (val) => `${val}px`);
  const foldLeft = useTransform(peelPixels, (val) => `${val}px`);

  // Track progress for visual cues
  const [progressVal, setProgressVal] = useState(0);

  useEffect(() => {
    const unsubscribe = dragOffset.on('change', (latest) => {
      const width = windowWidthRef.current || 1200;
      const dist = isPageOne ? Math.max(0, -latest) : Math.max(0, latest);
      setProgressVal(Math.min(1, dist / width));
    });
    return () => unsubscribe();
  }, [isPageOne, dragOffset]);

  // Execute full cinematic 3D page flip animation to target page
  const triggerFlipTo = useCallback(
    (targetPage: 1 | 2) => {
      if (isAnimating) return;
      setIsAnimating(true);
      const width = windowWidthRef.current || 1200;
      const targetOffset = targetPage === 2 ? -width : width;

      // If going to Page 1, prep scroll restoration right before page settles
      if (targetPage === 1) {
        // Page 1 is becoming visible
      } else {
        page1ScrollRef.current = window.scrollY;
      }

      animate(dragOffset, targetOffset, {
        duration: 0.58,
        ease: [0.16, 1, 0.3, 1], // Smooth physical inertia
        onComplete: () => {
          setActivePage(targetPage);
          onPageChange(targetPage);
          dragOffset.set(0);
          setIsAnimating(false);
          setIsDragging(false);

          if (targetPage === 1) {
            window.scrollTo({ top: page1ScrollRef.current, behavior: 'instant' });
          } else {
            window.scrollTo({ top: page2ScrollRef.current || 0, behavior: 'instant' });
          }
        },
      });
    },
    [isAnimating, dragOffset, onPageChange]
  );

  // Sync external changes to currentPage prop (e.g. from Resume "Back" button, Dock, or Esc key)
  useEffect(() => {
    if (currentPage !== activePage && !isAnimating) {
      triggerFlipTo(currentPage);
    }
  }, [currentPage, activePage, isAnimating, triggerFlipTo]);

  // Cancel flip and spring back to rest
  const cancelFlip = () => {
    setIsAnimating(true);
    animate(dragOffset, 0, {
      type: 'spring',
      stiffness: 420,
      damping: 30,
      onComplete: () => {
        setIsAnimating(false);
        setIsDragging(false);
      },
    });
  };

  // Drag handlers
  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (_: unknown, info: { offset: { x: number }; velocity: { x: number } }) => {
    const width = windowWidthRef.current || 1200;
    const threshold = Math.min(160, width * 0.16);

    if (isPageOne) {
      const pulledDist = -info.offset.x;
      const isFastFlick = info.velocity.x < -220;
      if (pulledDist > threshold || isFastFlick) {
        triggerFlipTo(2);
      } else {
        cancelFlip();
      }
    } else {
      const pulledDist = info.offset.x;
      const isFastFlick = info.velocity.x > 220;
      if (pulledDist > threshold || isFastFlick) {
        triggerFlipTo(1);
      } else {
        cancelFlip();
      }
    }
  };

  // Handle click on bookmark
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDragging && !isAnimating) {
      triggerFlipTo(isPageOne ? 2 : 1);
    }
  };

  const isPeelActive = isDragging || isAnimating || progressVal > 0.005;

  return (
    <>
      {/* =========================================================================
          1. PERSISTENT DUAL-PAGE STACK (Zero Unmounting, Zero Reloads)
         ========================================================================= */}
      <div className="relative w-full min-h-screen">
        {/* Page 1 (Visual Dossier) - Kept permanently mounted in DOM */}
        <div
          style={{
            display: activePage === 1 ? 'block' : 'none',
          }}
          className={`w-full min-h-screen transition-opacity duration-200 ${
            activePage !== 1 ? 'pointer-events-none' : ''
          }`}
          aria-hidden={activePage !== 1}
        >
          {page1Node}
        </div>

        {/* Page 2 (Formal Resume) - Kept permanently mounted in DOM */}
        <div
          style={{
            display: activePage === 2 ? 'block' : 'none',
          }}
          className={`w-full min-h-screen transition-opacity duration-200 ${
            activePage !== 2 ? 'pointer-events-none' : ''
          }`}
          aria-hidden={activePage !== 2}
        >
          {page2Node}
        </div>

        {/* =======================================================================
            2. REAL-TIME 3D PHYSICAL PEEL & TURN OVERLAY
           ======================================================================= */}
        {isPeelActive && (
          <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden select-none">
            {/* The revealed destination page preview layer */}
            <motion.div
              className="absolute inset-0 bg-[#F0F2F5] overflow-hidden"
              style={{
                clipPath: previewClipPath,
              }}
            >
              {/* Elegant Folio Aperture Header & Spec Sheet Backdrop */}
              <div className="w-full h-full bg-[#F7F8FA] flex flex-col justify-between p-8 sm:p-14 relative">
                {/* Gundam Architectural Watermark Background */}
                <div className="absolute inset-0 cozy-grid-dark opacity-40 pointer-events-none" />

                {/* Top Banner of Revealed Document */}
                <div className="relative z-10 flex items-center justify-between border-b-2 border-[#17191D] pb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-md bg-[#17191D] flex items-center justify-center text-white font-mono font-bold text-sm shadow-md">
                      {isPageOne ? '02' : '01'}
                    </div>
                    <div>
                      <h3 className="font-mono font-extrabold text-[#17191D] text-lg sm:text-xl tracking-tight">
                        {isPageOne ? 'FORMAL CURRICULUM VITAE' : 'INTERACTIVE DOSSIER'}
                      </h3>
                      <p className="text-xs text-slate-500 font-mono">
                        {isPageOne
                          ? 'PAGE 02 • EXECUTIVE RESUME & SPEC SHEET'
                          : 'PAGE 01 • INTERACTIVE TECHNICAL DOSSIER'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#155EEF] animate-pulse" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-700">
                      REVEALING {isPageOne ? 'RESUME' : 'PORTFOLIO'}
                    </span>
                  </div>
                </div>

                {/* Center Cinematic 3D Presentation Card */}
                <div className="relative z-10 max-w-xl mx-auto my-auto text-center space-y-4 bg-white/95 backdrop-blur-md p-8 rounded-2xl border-2 border-[#17191D] shadow-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-300 text-xs font-mono font-bold text-[#155EEF]">
                    <Sparkles className="w-3.5 h-3.5 text-[#F5C400]" />
                    <span>SMOOTH 3D FOLIO PAGE TURN</span>
                  </div>
                  <h4 className="text-2xl font-black text-[#17191D] tracking-tight">
                    {isPageOne ? 'Unfolding Executive Resume' : 'Returning to Technical Dossier'}
                  </h4>
                  <p className="text-xs text-slate-600 font-sans leading-relaxed">
                    Zero page reload • Hardware accelerated perspective turn • State & scroll preserved
                  </p>
                  <div className="h-1.5 w-full rounded-full gundam-tricolor-bar overflow-hidden" />
                </div>

                {/* Bottom Signature Tricolor Bar */}
                <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-slate-300 pt-4">
                  <span>RX-78-2 DUAL-PAGE FOLIO SPECIFICATION</span>
                  <span>CONFIDENTIAL &amp; PROPRIETARY</span>
                </div>
              </div>

              {/* Dynamic lighting depth shadow sweeping over the revealed page */}
              <div
                className={`absolute inset-0 pointer-events-none transition-opacity ${
                  isPageOne
                    ? 'bg-gradient-to-r from-black/65 via-black/20 to-transparent'
                    : 'bg-gradient-to-l from-black/65 via-black/20 to-transparent'
                }`}
                style={{
                  opacity: Math.max(0.2, 1 - progressVal * 0.8),
                }}
              />
            </motion.div>

            {/* ===================================================================
                3. PHYSICAL 3D PAGE CURL CYLINDER WITH DOODLE ORIGAMI AIRPLANE
               =================================================================== */}
            <motion.div
              className="fixed top-0 bottom-0 z-45 pointer-events-none flex"
              style={{
                ...(isPageOne ? { right: foldRight } : { left: foldLeft }),
                transform: isPageOne ? 'translateX(50%)' : 'translateX(-50%)',
              }}
            >
              {/* Realistic paper fold cylinder with specular highlight & deep shadow */}
              <div
                className="w-10 sm:w-14 h-full relative"
                style={{
                  background: isPageOne
                    ? 'linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(255,255,255,0.92) 42%, rgba(21,94,239,0.95) 72%, rgba(0,0,0,0.6) 100%)'
                    : 'linear-gradient(to left, rgba(0,0,0,0.65) 0%, rgba(255,255,255,0.92) 42%, rgba(21,94,239,0.95) 72%, rgba(0,0,0,0.6) 100%)',
                  boxShadow: isPageOne
                    ? '-28px 0 55px 8px rgba(0, 0, 0, 0.72), 12px 0 30px rgba(255, 255, 255, 0.25)'
                    : '28px 0 55px 8px rgba(0, 0, 0, 0.72), -12px 0 30px rgba(255, 255, 255, 0.25)',
                }}
              >
                {/* Paper thickness white core edge */}
                <div
                  className={`absolute top-0 bottom-0 w-1.5 shadow-sm ${
                    isPageOne ? 'left-0 bg-white' : 'right-0 bg-white'
                  }`}
                />

                {/* Gundam Accent Crease Stripe */}
                <div
                  className={`absolute top-0 bottom-0 w-0.5 ${
                    isPageOne ? 'left-2 bg-[#F5C400]' : 'right-2 bg-[#F5C400]'
                  }`}
                />

                {/* Flying Doodle Origami Airplane riding the top crease */}
                <div
                  className="absolute top-12 left-1/2 -translate-x-1/2 pointer-events-none filter drop-shadow-md"
                  style={{
                    transform: `translate(-50%, 0) rotate(${isPageOne ? -20 : 20}deg)`,
                  }}
                >
                  <svg width="40" height="32" viewBox="0 0 32 24" fill="none">
                    <MiniOrigamiPlane color="#F5C400" scale={1} />
                  </svg>
                </div>

                {/* Mid-crease Twinkling Sparkle Star */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{ rotate: [0, 180, 360], scale: [0.8, 1.4, 0.8] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                    className="w-3 h-3 bg-[#F5C400] rounded-xs shadow-xs"
                    style={{ clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* =========================================================================
          4. TACTILE DRAGGABLE BOOKMARK RIBBON (Mounted via Portal)
         ========================================================================= */}
      {mounted &&
        createPortal(
          <div
            id="portfolio-interactive-bookmark"
            style={{
              position: 'fixed',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 9999,
              ...(isPageOne ? { right: 0 } : { left: 0 }),
            }}
            className="select-none pointer-events-auto hidden sm:block"
          >
            <motion.div
              drag="x"
              dragConstraints={
                isPageOne
                  ? { left: -windowWidthRef.current, right: 0 }
                  : { left: 0, right: windowWidthRef.current }
              }
              dragElastic={0.06}
              style={{ x: dragOffset }}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              onClick={handleClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`cursor-grab active:cursor-grabbing flex items-center relative ${
                isPageOne ? 'flex-row' : 'flex-row-reverse'
              }`}
            >
              {/* Subtle hover tooltip bubble */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: isPageOne ? 8 : -8 }}
                animate={{
                  opacity: isHovered || isDragging ? 1 : 0,
                  scale: isHovered || isDragging ? 1 : 0.9,
                  x: isHovered || isDragging ? 0 : isPageOne ? 8 : -8,
                }}
                className={`pointer-events-none hidden sm:flex items-center gap-1.5 py-1 px-2.5 rounded-lg text-[11px] font-bold shadow-lg border backdrop-blur-md whitespace-nowrap ${
                  isPageOne
                    ? 'mr-2 bg-[#17191D]/95 border-slate-700 text-[#F5C400]'
                    : 'ml-2 bg-[#155EEF]/95 border-blue-400 text-white'
                }`}
              >
                {isPageOne ? (
                  <>
                    <MoveLeft className="w-3 h-3 text-[#F5C400] animate-pulse" />
                    <span>{progressVal >= 0.16 ? 'Release to flip!' : 'Pull or click to flip'}</span>
                  </>
                ) : (
                  <>
                    <span>{progressVal >= 0.16 ? 'Release to return!' : 'Pull or click to return'}</span>
                    <MoveRight className="w-3 h-3 text-white animate-pulse" />
                  </>
                )}
              </motion.div>

              {/* Sleek Compact Bookmark Tab */}
              <div
                className={`relative flex items-center justify-center w-11 h-12 shadow-xl transition-all duration-200 border-2 cursor-pointer ${
                  isPageOne
                    ? 'bg-[#17191D] border-[#155EEF] text-white rounded-l-xl pr-1.5 pl-1'
                    : 'bg-[#155EEF] border-white text-white rounded-r-xl pl-1.5 pr-1'
                }`}
                style={{
                  boxShadow:
                    isDragging || isHovered
                      ? '0 12px 28px -4px rgba(0, 0, 0, 0.5), 0 0 16px 2px rgba(21, 94, 239, 0.4)'
                      : '0 6px 18px -2px rgba(0, 0, 0, 0.35)',
                }}
              >
                {/* Gundam Signature Tricolor Edge Stripe */}
                <div
                  className={`absolute top-0 bottom-0 w-1 flex flex-col overflow-hidden ${
                    isPageOne ? 'right-0 rounded-r' : 'left-0 rounded-l'
                  }`}
                >
                  <span className="flex-1 bg-[#155EEF]" />
                  <span className="flex-1 bg-[#F5C400]" />
                  <span className="flex-1 bg-[#D92D20]" />
                </div>

                {/* Bookmark Icon */}
                {isPageOne ? (
                  <Bookmark className="w-5 h-5 fill-white text-white drop-shadow-xs group-hover:scale-110 transition-transform" />
                ) : (
                  <BookOpen className="w-5 h-5 fill-white text-white drop-shadow-xs group-hover:scale-110 transition-transform" />
                )}
              </div>
            </motion.div>
          </div>,
          document.body
        )}
    </>
  );
};
