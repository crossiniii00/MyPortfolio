import React from 'react';
import { motion } from 'motion/react';

export type FunBackgroundTheme = 'blue' | 'yellow' | 'red' | 'white' | 'multicolor';
export type FunBackgroundVariant = 'hero' | 'skills' | 'projects' | 'ongoing' | 'experience' | 'services' | 'rates' | 'contact' | 'workstation';

interface FunSectionBackgroundProps {
  theme?: FunBackgroundTheme;
  variant?: FunBackgroundVariant;
  className?: string;
  showStripes?: boolean;
}

export const FunSectionBackground: React.FC<FunSectionBackgroundProps> = ({
  theme = 'blue',
  variant = 'services',
  className = '',
  showStripes = true,
}) => {
  // Theme-specific glow configurations
  const isDark = theme === 'blue' || theme === 'red';
  const isYellow = theme === 'yellow';
  const isWhite = theme === 'white';

  // Grid line styles based on background tone
  const gridLineColor = isWhite 
    ? '#CBD5E1' 
    : isYellow 
    ? 'rgba(0, 0, 0, 0.14)' 
    : 'rgba(255, 255, 255, 0.22)';

  // Accent colors for doodles
  const doodleStroke = isYellow ? '#17191D' : isWhite ? '#155EEF' : '#FFFFFF';
  const doodleFillGold = '#F5C400';
  const doodleFillRed = '#D92D20';

  // Gundam Diagonal Speed Line Palette tailored per background theme
  const getStripeColors = () => {
    switch (theme) {
      case 'white':
        return [
          'bg-[#D92D20] shadow-[0_0_12px_rgba(217,45,32,0.35)]',
          'bg-[#F5C400] shadow-[0_0_12px_rgba(245,196,0,0.35)]',
          'bg-[#155EEF] shadow-[0_0_12px_rgba(21,94,239,0.35)]',
          'bg-white border border-slate-300 shadow-[0_0_10px_rgba(255,255,255,0.7)]',
        ];
      case 'blue':
        return [
          'bg-[#D92D20] shadow-[0_0_14px_rgba(217,45,32,0.5)]',
          'bg-[#F5C400] shadow-[0_0_14px_rgba(245,196,0,0.5)]',
          'bg-white shadow-[0_0_14px_rgba(255,255,255,0.6)]',
          'bg-sky-200/60 shadow-[0_0_10px_rgba(186,230,253,0.4)]',
        ];
      case 'red':
        return [
          'bg-[#155EEF] shadow-[0_0_14px_rgba(21,94,239,0.5)]',
          'bg-[#F5C400] shadow-[0_0_14px_rgba(245,196,0,0.5)]',
          'bg-white shadow-[0_0_14px_rgba(255,255,255,0.6)]',
          'bg-amber-200/60 shadow-[0_0_10px_rgba(253,230,138,0.4)]',
        ];
      case 'yellow':
        return [
          'bg-[#D92D20] shadow-[0_0_12px_rgba(217,45,32,0.35)]',
          'bg-[#155EEF] shadow-[0_0_12px_rgba(21,94,239,0.35)]',
          'bg-[#17191D] shadow-[0_0_10px_rgba(23,25,29,0.35)]',
          'bg-white shadow-[0_0_10px_rgba(255,255,255,0.7)]',
        ];
      default:
        return [
          'bg-[#D92D20]',
          'bg-[#F5C400]',
          'bg-[#155EEF]',
          'bg-white',
        ];
    }
  };

  const stripeColors = getStripeColors();

  return (
    <div className={`absolute inset-0 pointer-events-none select-none overflow-hidden z-0 ${className}`}>
      
      {/* =========================================================================
          1. DYNAMIC AMBIENT AURORA BLOOMS (SLOW BREATHING ENERGY)
         ========================================================================= */}
      {theme === 'blue' && (
        <>
          <motion.div
            animate={{ x: [0, 40, -30, 0], y: [0, -40, 25, 0], scale: [1, 1.2, 0.95, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-32 -left-24 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-[#D92D20]/25 via-[#F5C400]/20 to-transparent blur-3xl opacity-75"
          />
          <motion.div
            animate={{ x: [0, -50, 30, 0], y: [0, 50, -35, 0], scale: [1, 1.25, 0.9, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-36 -right-24 w-[520px] h-[520px] rounded-full bg-gradient-to-tl from-[#F5C400]/25 via-cyan-400/20 to-transparent blur-3xl opacity-80"
          />
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sky-400/15 blur-[130px]"
          />
        </>
      )}

      {theme === 'red' && (
        <>
          <motion.div
            animate={{ x: [0, 45, -35, 0], y: [0, -35, 30, 0], scale: [1, 1.2, 0.95, 1] }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-32 -left-20 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#F5C400]/30 via-white/15 to-transparent blur-3xl opacity-80"
          />
          <motion.div
            animate={{ x: [0, -40, 35, 0], y: [0, 45, -30, 0], scale: [1, 1.2, 0.9, 1] }}
            transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-32 -right-20 w-[500px] h-[500px] rounded-full bg-gradient-to-tl from-[#155EEF]/30 via-[#F5C400]/20 to-transparent blur-3xl opacity-75"
          />
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.12, 0.28, 0.12] }}
            transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-amber-300/20 blur-[130px]"
          />
        </>
      )}

      {theme === 'yellow' && (
        <>
          <motion.div
            animate={{ x: [0, 35, -25, 0], y: [0, -30, 20, 0], scale: [1, 1.15, 0.95, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-28 -left-20 w-[460px] h-[460px] rounded-full bg-gradient-to-br from-[#155EEF]/20 via-white/40 to-transparent blur-3xl opacity-70"
          />
          <motion.div
            animate={{ x: [0, -40, 30, 0], y: [0, 40, -25, 0], scale: [1, 1.2, 0.9, 1] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-32 -right-20 w-[480px] h-[480px] rounded-full bg-gradient-to-tl from-[#D92D20]/20 via-white/35 to-transparent blur-3xl opacity-75"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-white/30 blur-[110px]"
          />
        </>
      )}

      {theme === 'white' && (
        <>
          <motion.div
            animate={{ x: [0, 40, -30, 0], y: [0, -30, 25, 0], scale: [1, 1.2, 0.95, 1] }}
            transition={{ duration: 17, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-28 -left-20 w-[450px] h-[450px] rounded-full bg-gradient-to-br from-[#155EEF]/15 via-[#F5C400]/15 to-transparent blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -45, 30, 0], y: [0, 45, -30, 0], scale: [1, 1.25, 0.9, 1] }}
            transition={{ duration: 21, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-32 -right-20 w-[480px] h-[480px] rounded-full bg-gradient-to-tl from-[#D92D20]/15 via-sky-300/15 to-transparent blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-amber-200/20 blur-[130px]"
          />
        </>
      )}

      {theme === 'multicolor' && (
        <>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-1/3 left-1/4 w-[420px] h-[420px] rounded-full bg-white/30 blur-3xl"
          />
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-1/3 right-1/4 w-[450px] h-[450px] rounded-full bg-white/25 blur-3xl"
          />
        </>
      )}

      {/* =========================================================================
          2. BLUEPRINT TECHNICAL GRID OVERLAY
         ========================================================================= */}
      <div 
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage: `linear-gradient(to right, ${gridLineColor} 1px, transparent 1px), linear-gradient(to bottom, ${gridLineColor} 1px, transparent 1px)`,
          backgroundSize: '36px 36px',
        }}
      />

      {/* =========================================================================
          GUNDAM ACCENT SPEED STRIPES & CIRCUIT DATA BUS LINES
         ========================================================================= */}
      {showStripes && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
          {(() => {
            // Helper for circuit bus lines with terminal nodes (user's preferred design)
            const renderCircuitBusLines = (config: {
              position?: string;
              align?: 'left' | 'right';
              opacity?: string;
              widths?: [string, string, string];
            } = {}) => {
              const {
                position = 'top-10 left-0',
                align = 'left',
                opacity = 'opacity-80 md:opacity-90',
                widths = ['w-32 md:w-56', 'w-56 md:w-96', 'w-24 md:w-44'],
              } = config;

              // Theme-adjusted colors for the 3 circuit lines & their terminal nodes
              const colors = (() => {
                switch (theme) {
                  case 'white':
                    return [
                      { line: 'bg-[#D92D20]', fill: 'bg-[#D92D20]', border: 'border-[#17191D]' },
                      { line: 'bg-[#F5C400]', fill: 'bg-[#F5C400]', border: 'border-[#17191D]' },
                      { line: 'bg-[#155EEF]', fill: 'bg-[#155EEF]', border: 'border-[#17191D]' },
                    ];
                  case 'blue':
                    return [
                      { line: 'bg-[#D92D20]', fill: 'bg-[#D92D20]', border: 'border-white' },
                      { line: 'bg-[#F5C400]', fill: 'bg-[#F5C400]', border: 'border-white' },
                      { line: 'bg-white', fill: 'bg-white', border: 'border-[#0F2D6B]' },
                    ];
                  case 'red':
                    return [
                      { line: 'bg-[#155EEF]', fill: 'bg-[#155EEF]', border: 'border-white' },
                      { line: 'bg-[#F5C400]', fill: 'bg-[#F5C400]', border: 'border-white' },
                      { line: 'bg-white', fill: 'bg-white', border: 'border-[#6B0F0F]' },
                    ];
                  case 'yellow':
                    return [
                      { line: 'bg-[#D92D20]', fill: 'bg-[#D92D20]', border: 'border-[#17191D]' },
                      { line: 'bg-[#155EEF]', fill: 'bg-[#155EEF]', border: 'border-[#17191D]' },
                      { line: 'bg-[#17191D]', fill: 'bg-[#17191D]', border: 'border-white' },
                    ];
                  default:
                    return [
                      { line: 'bg-[#D92D20]', fill: 'bg-[#D92D20]', border: 'border-[#17191D]' },
                      { line: 'bg-[#F5C400]', fill: 'bg-[#F5C400]', border: 'border-[#17191D]' },
                      { line: 'bg-[#155EEF]', fill: 'bg-[#155EEF]', border: 'border-[#17191D]' },
                    ];
                }
              })();

              const isRight = align === 'right';

              return (
                <div className={`absolute ${position} pointer-events-none flex flex-col gap-3.5 ${opacity}`}>
                  {colors.map((c, i) => (
                    <div key={`bus-${i}`} className={`flex items-center ${isRight ? 'flex-row-reverse' : ''}`}>
                      <div className={`h-1.5 md:h-2 ${widths[i] || 'w-32'} ${c.line} ${isRight ? 'rounded-r-full' : 'rounded-l-full'} shadow-xs`} />
                      <span
                        className={`w-3.5 h-3.5 md:w-4 md:h-4 rounded-full border-2 ${c.border} ${c.fill} ${
                          isRight ? '-mr-2' : '-ml-2'
                        } shrink-0 shadow-sm`}
                      />
                    </div>
                  ))}
                </div>
              );
            };

            switch (variant) {
              case 'hero':
                // Introductory section: UNTOUCHED original diagonal sweeping racing stripes
                return (
                  <>
                    {/* Top-Right Long Sweeping Racing Stripes */}
                    <div className="absolute -top-48 -right-36 md:-right-24 w-[420px] md:w-[580px] h-[900px] rotate-[-28deg] opacity-65 md:opacity-80 pointer-events-none flex flex-col justify-center gap-2.5">
                      {stripeColors.map((cls, i) => (
                        <div key={`hero-tr-${i}`} className={`relative h-1.5 md:h-2 w-full ${cls}`} />
                      ))}
                    </div>
                    {/* Bottom-Left Launch Track */}
                    <div className="absolute -bottom-48 -left-32 w-[380px] h-[500px] rotate-[-28deg] opacity-45 pointer-events-none hidden lg:flex flex-col justify-center gap-2">
                      {stripeColors.map((cls, i) => (
                        <div key={`hero-bl-${i}`} className={`h-1.5 w-full ${cls}`} />
                      ))}
                    </div>
                  </>
                );

              case 'skills':
                return (
                  <>
                    {renderCircuitBusLines({ position: 'top-10 left-0', align: 'left', widths: ['w-36 md:w-56', 'w-56 md:w-92', 'w-24 md:w-40'] })}
                    {renderCircuitBusLines({ position: 'bottom-12 right-0', align: 'right', opacity: 'opacity-40 hidden sm:flex', widths: ['w-24 md:w-36', 'w-36 md:w-56', 'w-18 md:w-28'] })}
                  </>
                );

              case 'projects':
                return (
                  <>
                    {renderCircuitBusLines({ position: 'top-12 left-0', align: 'left', widths: ['w-28 md:w-48', 'w-48 md:w-76', 'w-20 md:w-36'] })}
                  </>
                );

              case 'ongoing':
                return (
                  <>
                    {renderCircuitBusLines({ position: 'top-12 right-0', align: 'right', widths: ['w-28 md:w-48', 'w-48 md:w-76', 'w-20 md:w-36'] })}
                  </>
                );

              case 'experience':
                return (
                  <>
                    {renderCircuitBusLines({ position: 'top-16 right-0', align: 'right', widths: ['w-40 md:w-64', 'w-60 md:w-96', 'w-28 md:w-48'] })}
                    {renderCircuitBusLines({ position: 'bottom-16 left-0', align: 'left', opacity: 'opacity-40 hidden md:flex', widths: ['w-24 md:w-36', 'w-36 md:w-56', 'w-16 md:w-28'] })}
                  </>
                );

              case 'services':
                return (
                  <>
                    {renderCircuitBusLines({ position: 'top-12 left-0', align: 'left', widths: ['w-36 md:w-60', 'w-56 md:w-96', 'w-24 md:w-40'] })}
                    {renderCircuitBusLines({ position: 'bottom-14 right-0', align: 'right', opacity: 'opacity-40 hidden sm:flex', widths: ['w-28 md:w-44', 'w-44 md:w-68', 'w-20 md:w-32'] })}
                  </>
                );

              case 'rates':
                return (
                  <>
                    {renderCircuitBusLines({ position: 'top-14 right-0', align: 'right', widths: ['w-32 md:w-52', 'w-52 md:w-84', 'w-24 md:w-40'] })}
                  </>
                );

              case 'workstation':
                return (
                  <>
                    {renderCircuitBusLines({ position: 'top-10 left-0', align: 'left', widths: ['w-36 md:w-56', 'w-56 md:w-96', 'w-28 md:w-44'] })}
                  </>
                );

              case 'contact':
                return (
                  <>
                    {renderCircuitBusLines({ position: 'top-12 right-0', align: 'right', widths: ['w-32 md:w-52', 'w-52 md:w-84', 'w-24 md:w-36'] })}
                    {renderCircuitBusLines({ position: 'bottom-14 left-0', align: 'left', opacity: 'opacity-45 hidden md:flex', widths: ['w-28 md:w-44', 'w-44 md:w-68', 'w-20 md:w-32'] })}
                  </>
                );

              default:
                return (
                  <>
                    {renderCircuitBusLines({ position: 'top-10 left-0', align: 'left' })}
                  </>
                );
            }
          })()}
        </div>
      )}

      {/* =========================================================================
          3. KINETIC LASER SCAN BEAM
         ========================================================================= */}
      <motion.div
        animate={{ y: ['-100%', '600%'] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'linear' }}
        className={`absolute inset-x-0 h-44 bg-gradient-to-b from-transparent ${
          isYellow 
            ? 'via-black/10' 
            : isWhite 
            ? 'via-blue-500/10' 
            : 'via-white/12'
        } to-transparent`}
      />

      {/* =========================================================================
          4. PLAYFUL FLOATING DOODLES (SECTION SPECIFIC)
         ========================================================================= */}
      
      {/* Golden Star (Top Left) */}
      <motion.div
        animate={{
          y: [0, -18, 0],
          rotate: [0, 90, 180, 270, 360],
          scale: [1, 1.25, 1],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[8%] left-[6%]"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" fill={doodleFillGold} className="drop-shadow-md" />
        </svg>
      </motion.div>

      {/* Code Tag </> or Section Badge (Top Right) */}
      <motion.div
        animate={{
          y: [0, 16, 0],
          rotate: [-6, 6, -6],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[10%] right-[7%]"
      >
        <div className={`px-2.5 py-1 rounded-xl backdrop-blur-md border font-mono text-xs font-black flex items-center gap-1 shadow-md ${
          isYellow 
            ? 'bg-[#17191D] text-[#F5C400] border-black/20' 
            : isWhite 
            ? 'bg-white/80 text-[#155EEF] border-slate-200' 
            : 'bg-white/15 text-[#F5C400] border-white/30'
        }`}>
          {variant === 'skills' ? <span>&#123; code &#125;</span> :
           variant === 'hero' ? <span>HELLO WORLD</span> :
           variant === 'experience' ? <span>PRO // BUILDER</span> :
           variant === 'rates' ? <span>30-DAY WARRANTY</span> :
           variant === 'contact' ? <span>LET&#39;S TALK</span> :
           variant === 'workstation' ? <span>DEV // RIG</span> :
           <span>&lt;/&gt;</span>}
        </div>
      </motion.div>

      {/* Paper Airplane ✈ (Mid Left) */}
      <motion.div
        animate={{
          x: [0, 28, 0],
          y: [0, -22, 0],
          rotate: [16, 26, 16],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[42%] left-[4%]"
      >
        <svg 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke={doodleStroke} 
          strokeWidth="2.2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="drop-shadow-lg opacity-85"
        >
          <path d="M22 2L11 13" />
          <path d="M22 2L15 22L11 13L2 9L22 2Z" />
        </svg>
      </motion.div>

      {/* Lightning Bolt ⚡ (Mid Right) */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, -14, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[46%] right-[5%]"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill={doodleFillGold} className="drop-shadow-lg">
          <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" />
        </svg>
      </motion.div>

      {/* Bouncing Smiley Sticker :) (Bottom Left) */}
      <motion.div
        animate={{
          y: [0, 16, 0],
          rotate: [-10, 10, -10],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[14%] left-[5%]"
      >
        <div className={`w-8 h-8 rounded-full font-black text-xs flex items-center justify-center shadow-lg border-2 ${
          isYellow 
            ? 'bg-[#17191D] text-[#F5C400] border-white' 
            : 'bg-[#F5C400] text-[#17191D] border-white'
        }`}>
          :)
        </div>
      </motion.div>

      {/* Rotating Tech Radar / Crosshair (Bottom Right) */}
      <motion.div
        animate={{
          rotate: [0, 180, 360],
          scale: [0.95, 1.15, 0.95],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-[12%] right-[6%]"
      >
        <div className={`w-8 h-8 rounded-full border-2 border-dashed flex items-center justify-center ${
          isYellow ? 'border-black/35' : isWhite ? 'border-slate-400' : 'border-white/50'
        }`}>
          <span className={`w-2 h-2 rounded-full ${
            theme === 'red' ? 'bg-[#F5C400]' : 'bg-[#D92D20]'
          } ring-2 ring-white/70 animate-ping`} />
        </div>
      </motion.div>

      {/* Floating Squiggle Doodle (Upper Mid Left) */}
      <motion.div
        animate={{
          rotate: [-12, 12, -12],
          y: [0, 14, 0],
          x: [0, -10, 0],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[28%] left-[16%] opacity-60 hidden md:block"
      >
        <svg width="46" height="22" viewBox="0 0 48 22" fill="none">
          <path d="M2 11 Q 9 2, 16 11 T 30 11 T 44 11" stroke={doodleStroke} strokeWidth="3" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* Scarlet / Accent Sparkle Star (Upper Mid Right) */}
      <motion.div
        animate={{
          scale: [0.75, 1.25, 0.75],
          rotate: [0, -120, -240, -360],
        }}
        transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[24%] right-[18%] opacity-80 hidden md:block"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill={theme === 'red' ? doodleFillGold : doodleFillRed} className="drop-shadow-md">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
      </motion.div>

      {/* Bottom HUD Coordinate Stamp */}
      <div className={`absolute bottom-4 left-6 hidden lg:flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest ${
        isYellow ? 'text-black/35' : isWhite ? 'text-slate-400' : 'text-white/40'
      }`}>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span>SYS.{variant.toUpperCase()}_STAGE // ACTIVE</span>
      </div>

      {/* Bottom Rotating Gear/Ring */}
      <motion.div
        animate={{ rotate: [0, -360] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-6 right-20 opacity-25 hidden lg:block"
      >
        <svg width="40" height="40" viewBox="0 0 44 44">
          <circle cx="22" cy="22" r="18" stroke={doodleStroke} strokeWidth="2" strokeDasharray="8 6" fill="none" />
        </svg>
      </motion.div>

    </div>
  );
};
