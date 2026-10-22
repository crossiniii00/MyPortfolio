import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MiniOrigamiPlane } from './DoodleInteractable';

interface HoveredTargetState {
  x: number;
  y: number;
  width: number;
  height: number;
  accentColor: string;
  planeColor: string;
  isWide: boolean;
}

const ACCENT_COLORS = ['#F5C400', '#155EEF', '#D92D20', '#10B981'];
const PLANE_COLORS = ['#155EEF', '#D92D20', '#17191D', '#F5C400'];

/**
 * GlobalDoodleManager automatically attaches an aesthetic origami paperplane
 * contrail and sparkle stars to ANY interactive element (button, link, tab, card, pill)
 * across the entire application without needing manual wrapping.
 */
export const GlobalDoodleManager: React.FC = () => {
  const [hoveredTarget, setHoveredTarget] = useState<HoveredTargetState | null>(null);
  const colorIndexRef = useRef(0);
  const currentElementRef = useRef<Element | null>(null);

  useEffect(() => {
    // Check if device supports hover (avoid mobile touch jitter)
    if (typeof window === 'undefined') return;
    const isTouchOnly = window.matchMedia('(hover: none)').matches;
    if (isTouchOnly) return;

    const handlePointerOver = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Find the nearest interactive ancestor
      const interactiveEl = target.closest<HTMLElement>(
        'button, a, [role="button"], input[type="submit"], input[type="button"], .cursor-pointer, [data-doodle]'
      );

      if (!interactiveEl) {
        if (currentElementRef.current) {
          currentElementRef.current = null;
          setHoveredTarget(null);
        }
        return;
      }

      // If it's already inside a bespoke DoodleInteractable or marked no-doodle, skip
      if (
        interactiveEl.closest('.group\\/doodle') ||
        interactiveEl.classList.contains('no-doodle') ||
        interactiveEl.getAttribute('data-no-doodle') === 'true'
      ) {
        currentElementRef.current = null;
        setHoveredTarget(null);
        return;
      }

      // If already hovered on the same element, return
      if (currentElementRef.current === interactiveEl) return;
      currentElementRef.current = interactiveEl;

      const rect = interactiveEl.getBoundingClientRect();
      // Ignore tiny or invisible elements
      if (rect.width < 12 || rect.height < 12) return;

      // Cycle accent colors
      const accent = ACCENT_COLORS[colorIndexRef.current % ACCENT_COLORS.length];
      const plane = PLANE_COLORS[colorIndexRef.current % PLANE_COLORS.length];
      colorIndexRef.current += 1;

      setHoveredTarget({
        x: rect.left,
        y: rect.top,
        width: rect.width,
        height: rect.height,
        accentColor: accent,
        planeColor: plane,
        isWide: rect.width > 90,
      });
    };

    const handlePointerOut = (e: PointerEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related || !currentElementRef.current || !currentElementRef.current.contains(related)) {
        currentElementRef.current = null;
        setHoveredTarget(null);
      }
    };

    const handleScrollOrResize = () => {
      if (currentElementRef.current) {
        const rect = (currentElementRef.current as HTMLElement).getBoundingClientRect();
        setHoveredTarget((prev) => (prev ? { ...prev, x: rect.left, y: rect.top } : null));
      }
    };

    window.addEventListener('pointerover', handlePointerOver, { passive: true });
    window.addEventListener('pointerout', handlePointerOut, { passive: true });
    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });

    return () => {
      window.removeEventListener('pointerover', handlePointerOver);
      window.removeEventListener('pointerout', handlePointerOut);
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, []);

  return (
    <div
      id="global-doodle-container"
      className="fixed inset-0 pointer-events-none z-[9990] overflow-hidden select-none"
      aria-hidden="true"
    >
      <AnimatePresence>
        {hoveredTarget && (
          <motion.div
            key={`${hoveredTarget.x}-${hoveredTarget.y}`}
            initial={{ opacity: 0, scale: 0.8, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -4, transition: { duration: 0.15 } }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            style={{
              position: 'fixed',
              left: hoveredTarget.x,
              top: hoveredTarget.y,
              width: hoveredTarget.width,
              height: hoveredTarget.height,
            }}
            className="pointer-events-none"
          >
            {/* Top-aligned gliding origami paperplane with curved dashed contrail */}
            <div className="absolute -top-6 inset-x-0 flex items-center justify-center">
              <svg
                width={Math.max(80, Math.min(160, hoveredTarget.width + 30))}
                height="28"
                viewBox="0 0 120 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="overflow-visible"
              >
                {/* Dashed Flight Contrail */}
                <motion.path
                  d="M 6 22 C 22 10, 42 8, 62 16 C 80 22, 95 10, 108 8"
                  stroke={hoveredTarget.accentColor}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeDasharray="3.5 2.5"
                  fill="none"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: [0, -24] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                />

                {/* Micro Air Wisps */}
                <path
                  d="M 18 16 C 30 11, 44 12, 54 18"
                  stroke="#94A3B8"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                  strokeDasharray="2 2"
                  fill="none"
                  opacity="0.65"
                />

                {/* Twinkling Sparkle Star */}
                <motion.path
                  d="M 0 -2.5 Q 0 0 2.5 0 Q 0 0 0 2.5 Q 0 0 -2.5 0 Q 0 0 0 -2.5 Z"
                  fill={hoveredTarget.accentColor}
                  transform="translate(62, 16)"
                  animate={{ scale: [0.7, 1.3, 0.7], rotate: [0, 90, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Mini Origami Paperplane at tail of contrail */}
                <motion.g
                  transform="translate(108, 8) rotate(-14)"
                  animate={{
                    y: [0, -2, 0],
                    x: [0, 1.2, 0],
                    rotate: [-14, -9, -14],
                  }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <MiniOrigamiPlane color={hoveredTarget.planeColor} scale={0.75} />
                </motion.g>
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
