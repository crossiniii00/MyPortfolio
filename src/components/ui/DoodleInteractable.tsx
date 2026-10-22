import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface DoodleInteractableProps {
  children: React.ReactNode;
  /** Variant of the doodle effect */
  variant?: 'button' | 'tab' | 'card' | 'badge' | 'link';
  /** Accent color for the plane and tracing lines */
  accentColor?: string;
  /** Optional playful doodle sticky note or speech bubble text */
  doodleText?: string;
  /** Additional container classes */
  className?: string;
  /** Disable the effect if desired */
  disabled?: boolean;
}

/**
 * 3D-faceted Origami Paper Airplane SVG
 */
export const MiniOrigamiPlane: React.FC<{ 
  color?: string; 
  className?: string;
  scale?: number;
}> = ({ color = '#155EEF', className = '', scale = 1 }) => (
  <g className={`filter drop-shadow-xs ${className}`} transform={`scale(${scale})`}>
    {/* Plane Cast Shadow */}
    <polygon 
      points="0,0 20,-4.5 8,7" 
      fill="rgba(0, 0, 0, 0.22)" 
      transform="translate(1.2, 2.8)" 
    />
    {/* Left Main Wing (Pure White) */}
    <polygon 
      points="0,0 20,-4.5 7,2.5" 
      fill="#FFFFFF" 
      stroke="#17191D" 
      strokeWidth="1.1" 
      strokeLinejoin="round" 
    />
    {/* Keel Left Fold (Soft Tinted Blue/Grey) */}
    <polygon 
      points="7,2.5 20,-4.5 11,7" 
      fill="#E0E7FF" 
      stroke="#17191D" 
      strokeWidth="1.1" 
      strokeLinejoin="round" 
    />
    {/* Keel Shadow Fold */}
    <polygon 
      points="11,7 20,-4.5 14,5" 
      fill="#94A3B8" 
      stroke="#17191D" 
      strokeWidth="1.1" 
      strokeLinejoin="round" 
    />
    {/* Right Wing */}
    <polygon 
      points="14,5 20,-4.5 16,1" 
      fill="#CBD5E1" 
      stroke="#17191D" 
      strokeWidth="1.1" 
      strokeLinejoin="round" 
    />
    {/* Spine Crease Accent */}
    <line 
      x1="0" 
      y1="0" 
      x2="20" 
      y2="-4.5" 
      stroke={color} 
      strokeWidth="1" 
      strokeLinecap="round" 
    />
  </g>
);

/**
 * DoodleInteractable wraps any button, tab, card, or link with an aesthetic
 * paperplane contrail tracing line and hand-drawn micro-doodle on hover.
 */
export const DoodleInteractable: React.FC<DoodleInteractableProps> = ({
  children,
  variant = 'button',
  accentColor = '#F5C400',
  doodleText,
  className = '',
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  if (disabled) {
    return <div className={`inline-block ${className}`}>{children}</div>;
  }

  return (
    <div
      className={`relative inline-flex items-center justify-center group/doodle ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Target interactive element */}
      {children}

      {/* =====================================================================
          VARIANT 1: BUTTON OVERLAY (Paperplane flying along top edge)
         ===================================================================== */}
      {variant === 'button' && (
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 4, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 3, scale: 0.9, transition: { duration: 0.15 } }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute -top-7 inset-x-0 pointer-events-none z-30 flex items-center justify-center select-none"
            >
              <svg 
                width="140" 
                height="32" 
                viewBox="0 0 140 32" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="overflow-visible"
              >
                {/* Tracing Line / Contrail */}
                <motion.path
                  d="M 6 24 C 18 12, 34 8, 52 16 C 68 24, 82 10, 98 12 C 108 14, 116 10, 122 8"
                  stroke={accentColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="3.5 2.5"
                  fill="none"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: [0, -24] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                />

                {/* Secondary Air Wisp */}
                <path
                  d="M 22 18 C 34 12, 46 14, 56 20"
                  stroke="#94A3B8"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeDasharray="2 2"
                  fill="none"
                  opacity="0.7"
                />

                {/* Sparkle Star */}
                <motion.path
                  d="M 0 -3 Q 0 0 3 0 Q 0 0 0 3 Q 0 0 -3 0 Q 0 0 0 -3 Z"
                  fill={accentColor}
                  transform="translate(52, 16)"
                  animate={{ scale: [0.8, 1.3, 0.8], rotate: [0, 90, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Paper Airplane at the end of the line */}
                <motion.g
                  transform="translate(120, 8) rotate(-15)"
                  animate={{
                    y: [0, -2, 0],
                    x: [0, 1.5, 0],
                    rotate: [-15, -11, -15],
                  }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <MiniOrigamiPlane color="#155EEF" scale={0.9} />
                </motion.g>
              </svg>

              {/* Optional playful micro sticky label */}
              {doodleText && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 3 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="absolute -top-3.5 right-0 bg-[#FFFEEB] text-[#17191D] border border-[#17191D] px-1.5 py-0.5 rounded text-[8px] font-mono font-bold shadow-xs whitespace-nowrap rotate-3"
                >
                  {doodleText}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* =====================================================================
          VARIANT 2: TAB OVERLAY (Loop-de-loop contrail above active/hovered tabs)
         ===================================================================== */}
      {variant === 'tab' && (
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 3, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 2, scale: 0.85, transition: { duration: 0.12 } }}
              className="absolute -top-6 left-1/2 -translate-x-1/2 pointer-events-none z-30 select-none"
            >
              <svg 
                width="80" 
                height="24" 
                viewBox="0 0 80 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="overflow-visible"
              >
                {/* Loop-de-loop contrail */}
                <motion.path
                  d="M 4 18 C 16 18, 28 8, 38 8 C 48 8, 48 18, 38 18 C 30 18, 40 4, 62 6"
                  stroke={accentColor}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeDasharray="3 2"
                  fill="none"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                />

                {/* Micro Sparkle */}
                <path
                  d="M 0 -2.5 Q 0 0 2.5 0 Q 0 0 0 2.5 Q 0 0 -2.5 0 Q 0 0 0 -2.5 Z"
                  fill="#FFFFFF"
                  transform="translate(38, 8)"
                />

                {/* Flying Paperplane */}
                <motion.g
                  transform="translate(62, 6) rotate(-10)"
                  animate={{
                    y: [0, -1.5, 0],
                    rotate: [-10, -6, -10],
                  }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <MiniOrigamiPlane color="#D92D20" scale={0.75} />
                </motion.g>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* =====================================================================
          VARIANT 3: CARD CORNER / BADGE (Swoop out from top-right corner)
         ===================================================================== */}
      {variant === 'card' && (
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: -6, y: 6 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: -4, y: 4, transition: { duration: 0.15 } }}
              className="absolute -top-5 -right-3 pointer-events-none z-30 select-none"
            >
              <svg 
                width="70" 
                height="36" 
                viewBox="0 0 70 36" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="overflow-visible"
              >
                {/* Curved Contrail */}
                <motion.path
                  d="M 6 30 C 16 26, 26 12, 42 10 C 52 8, 58 6, 62 4"
                  stroke={accentColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="3 2"
                  fill="none"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: [0, -20] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                />

                {/* Tiny Sparkle Star */}
                <motion.path
                  d="M 0 -3 Q 0 0 3 0 Q 0 0 0 3 Q 0 0 -3 0 Q 0 0 0 -3 Z"
                  fill={accentColor}
                  transform="translate(26, 16)"
                  animate={{ scale: [0.8, 1.2, 0.8], rotate: [0, 90, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Paperplane soaring up-right */}
                <motion.g
                  transform="translate(60, 4) rotate(-22)"
                  animate={{
                    y: [0, -2, 0],
                    x: [0, 1.5, 0],
                    rotate: [-22, -18, -22],
                  }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <MiniOrigamiPlane color="#155EEF" scale={0.8} />
                </motion.g>
              </svg>

              {doodleText && (
                <div className="absolute -top-3 right-8 bg-[#FFFEEB] text-[#17191D] border border-[#17191D] px-1.5 py-0.5 rounded text-[8px] font-mono font-bold shadow-xs whitespace-nowrap rotate-[-3deg]">
                  {doodleText}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* =====================================================================
          VARIANT 4: LINK / NAV ITEM (Playful squiggly contrail underline)
         ===================================================================== */}
      {variant === 'link' && (
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scaleX: 0.4 }}
              animate={{ opacity: 1, scaleX: 1 }}
              exit={{ opacity: 0, scaleX: 0.4, transition: { duration: 0.12 } }}
              className="absolute -bottom-2 left-0 right-0 pointer-events-none z-20 flex items-center justify-center select-none"
            >
              <svg 
                width="60" 
                height="12" 
                viewBox="0 0 60 12" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="overflow-visible"
              >
                {/* Waved flight contrail */}
                <motion.path
                  d="M 2 8 C 12 2, 22 10, 32 4 C 42 10, 50 6, 54 4"
                  stroke={accentColor}
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeDasharray="3 2"
                  fill="none"
                  initial={{ strokeDashoffset: 0 }}
                  animate={{ strokeDashoffset: [0, -18] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                />

                {/* Mini Paperplane */}
                <motion.g
                  transform="translate(54, 4) rotate(-15)"
                  animate={{ y: [0, -1, 0] }}
                  transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <MiniOrigamiPlane color="#155EEF" scale={0.65} />
                </motion.g>
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};
