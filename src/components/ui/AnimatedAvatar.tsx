import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const AnimatedAvatar: React.FC = () => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const avatarRef = useRef<HTMLDivElement>(null);

  // Natural blinking interval with slight random variation
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
        const nextBlink = 3000 + Math.random() * 2500;
        timeoutId = setTimeout(triggerBlink, nextBlink);
      }, 160);
    };

    timeoutId = setTimeout(triggerBlink, 2500);
    return () => clearTimeout(timeoutId);
  }, []);

  // Pupil cursor tracking for lifelike interactivity
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!avatarRef.current) return;
      const rect = avatarRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const dist = Math.hypot(deltaX, deltaY);

      if (dist < 600) {
        // Clamp pupil movement to max ±2.5px
        const angle = Math.atan2(deltaY, deltaX);
        const intensity = Math.min(dist / 200, 1) * 2.5;
        setPupilOffset({
          x: Math.cos(angle) * intensity,
          y: Math.sin(angle) * intensity,
        });
      } else {
        setPupilOffset({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Click greeting easter egg
  const handleClick = () => {
    setClickCount((prev) => prev + 1);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2400);
  };

  const messages = [
    "Eagle Eye Precision 🦅",
    "Apex Systems Active ⚡",
    "Soaring at High Altitude 🚀",
    "Target Acquired 🎯",
  ];
  const activeMessage = messages[clickCount % messages.length];

  return (
    <div 
      ref={avatarRef}
      className="relative flex items-center justify-center cursor-pointer select-none group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Interactive animated eagle avatar. Click to interact."
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {/* 1. Orbiting Gundam Tricolor Particle Rings */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
        className="absolute -inset-4 rounded-full pointer-events-none opacity-85"
        aria-hidden="true"
      >
        {/* Blue Vernier Particle */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#155EEF] shadow-[0_0_10px_#155EEF] border border-white" />
        {/* Yellow Sensor Particle */}
        <div className="absolute bottom-1 right-2 w-2.5 h-2.5 rounded-full bg-[#F5C400] shadow-[0_0_10px_#F5C400] border border-white" />
        {/* Red Thruster Particle */}
        <div className="absolute bottom-2 left-2 w-2.5 h-2.5 rounded-full bg-[#D92D20] shadow-[0_0_10px_#D92D20] border border-white" />
      </motion.div>

      {/* 2. Soft Ambient Color Glow */}
      <motion.div 
        animate={{ 
          scale: isHovered ? [1.1, 1.25, 1.1] : [1, 1.1, 1],
          opacity: isHovered ? [0.65, 0.9, 0.65] : [0.35, 0.55, 0.35]
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -inset-3 rounded-full bg-gradient-to-tr from-[#155EEF] via-[#F5C400] to-[#D92D20] blur-lg pointer-events-none"
        aria-hidden="true"
      />

      {/* 3. Main Avatar Housing with Floating Breathing Motion */}
      <motion.div
        animate={{ 
          y: isHovered ? -6 : [-3, 3, -3],
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ 
          y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
          scale: { duration: 0.25 }
        }}
        className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-white p-1.5 border-3 border-[#17191D] shadow-2xl overflow-hidden"
      >
        {/* =========================================================================
            ANIMATED MAJESTIC EAGLE SVG
           ========================================================================= */}
        <svg 
          viewBox="0 0 120 120" 
          className="w-full h-full"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Circular backdrop */}
          <circle cx="60" cy="60" r="58" fill="#F0F4F8" />
          
          {/* Subtle Gundam Tricolor Arc & Sky Radar Ring */}
          <path d="M15 60 A45 45 0 0 1 105 60" stroke="#155EEF" strokeWidth="2.5" strokeOpacity="0.25" strokeDasharray="4 4" />
          <circle cx="60" cy="60" r="44" stroke="#F5C400" strokeWidth="1" strokeOpacity="0.25" strokeDasharray="6 6" />

          {/* 1. Dark Eagle Body / Mantle Plumage (Shoulders & Chest) */}
          <motion.g
            animate={{ y: isHovered ? -1 : [0, -1, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Base Mantle */}
            <path d="M 12 116 C 12 88 32 76 60 76 C 88 76 108 88 108 116 Z" fill="#0F172A" />
            
            {/* Layered Midnight Feathers */}
            <path d="M 16 116 L 26 94 L 38 106 L 48 88 L 60 102 L 72 88 L 82 106 L 94 94 L 104 116 Z" fill="#1E293B" />
            
            {/* Gundam Chest V-Insignia Badge */}
            <path d="M 52 90 L 60 100 L 68 90 L 60 84 Z" fill="#155EEF" stroke="#0F172A" strokeWidth="1" />
            <path d="M 55 92 L 60 98 L 65 92" stroke="#F5C400" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </motion.g>

          {/* 2. White Eagle Head & Neck Feather Ruff */}
          <g>
            {/* Serrated White Neck Ruff cascading down onto dark mantle */}
            <path 
              d="M 28 82 C 30 84 35 92 40 85 C 45 94 52 84 60 94 C 68 84 75 94 80 85 C 85 92 90 84 92 82 C 90 54 84 38 60 20 C 36 38 30 54 28 82 Z" 
              fill="#FFFFFF" 
              stroke="#E2E8F0" 
              strokeWidth="1.5" 
            />

            {/* Subtle silver-blue feather shading on neck */}
            <path d="M 34 78 Q 40 85 46 78 Q 53 85 60 80 Q 67 85 74 78 Q 80 85 86 78" stroke="#CBD5E1" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M 40 84 Q 50 91 60 86 Q 70 91 80 84" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" fill="none" />

            {/* 3. Swaying Crown Crest Feathers (Top of Head) */}
            <motion.g
              animate={{ 
                y: isHovered ? -2 : [0, -1, 0],
                rotate: isHovered ? [0, 1.5, -1.5, 0] : 0 
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              {/* Central crown plumes */}
              <path d="M 52 24 L 60 8 L 68 24 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1" />
              <path d="M 44 28 L 52 14 L 58 26 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
              <path d="M 76 28 L 68 14 L 62 26 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
              {/* Crest accent tips */}
              <path d="M 58 12 L 60 9 L 62 12" stroke="#155EEF" strokeWidth="1.5" strokeLinecap="round" />
            </motion.g>

            {/* 4. Eagle Eye Brow Ridges (Fierce, noble, focused) */}
            <path d="M 36 43 Q 48 39 55 45" stroke="#334155" strokeWidth="3" strokeLinecap="round" />
            <path d="M 84 43 Q 72 39 65 45" stroke="#334155" strokeWidth="3" strokeLinecap="round" />

            {/* 5. Eagle Eyes with Piercing Golden Iris & Interactive Gaze Tracking */}
            {/* Left Eye */}
            <g>
              {/* Eye Socket */}
              <path d="M 38 45 Q 46 41 53 46 Q 46 52 38 45 Z" fill="#0F172A" />
              {/* Golden Amber Iris */}
              <circle cx="46.5" cy="46.5" r="3.6" fill="#F59E0B" />
              <circle cx="46.5" cy="46.5" r="2.8" fill="#FCD34D" />
              {/* Gaze-Tracking Pupil */}
              <circle 
                cx={46.5 + pupilOffset.x} 
                cy={46.5 + pupilOffset.y} 
                r="1.7" 
                fill="#0F172A" 
              />
              {/* White Light Catch / Glint */}
              <circle 
                cx={45.8 + pupilOffset.x} 
                cy={45.7 + pupilOffset.y} 
                r="0.7" 
                fill="white" 
              />
            </g>

            {/* Right Eye */}
            <g>
              {/* Eye Socket */}
              <path d="M 82 45 Q 74 41 67 46 Q 74 52 82 45 Z" fill="#0F172A" />
              {/* Golden Amber Iris */}
              <circle cx="73.5" cy="46.5" r="3.6" fill="#F59E0B" />
              <circle cx="73.5" cy="46.5" r="2.8" fill="#FCD34D" />
              {/* Gaze-Tracking Pupil */}
              <circle 
                cx={73.5 + pupilOffset.x} 
                cy={46.5 + pupilOffset.y} 
                r="1.7" 
                fill="#0F172A" 
              />
              {/* White Light Catch / Glint */}
              <circle 
                cx={72.8 + pupilOffset.x} 
                cy={45.7 + pupilOffset.y} 
                r="0.7" 
                fill="white" 
              />
            </g>

            {/* Natural Eagle Blink (Nictitating membrane / sharp blink) */}
            {isBlinking && (
              <>
                <path d="M 37 45 Q 46 42 54 46" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" fill="none" />
                <path d="M 83 45 Q 74 42 66 46" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" fill="none" />
              </>
            )}

            {/* 6. Powerful Hooked Golden Eagle Beak */}
            <g>
              {/* Cere (Upper Base of Beak) */}
              <path d="M 51 47 C 51 45 69 45 69 47 L 68 53 L 52 53 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
              
              {/* Nostrils */}
              <ellipse cx="55.5" cy="49.5" rx="1.2" ry="0.6" fill="#78350F" />
              <ellipse cx="64.5" cy="49.5" rx="1.2" ry="0.6" fill="#78350F" />

              {/* Lower Beak Mandible */}
              <path d="M 53 60 C 56 66 64 66 67 60 Z" fill="#D97706" stroke="#92400E" strokeWidth="1" />

              {/* Main Curved Hooked Upper Beak */}
              <path 
                d="M 51 51 C 51 51 49 64 60 72 C 71 64 69 51 69 51 Z" 
                fill="#F59E0B" 
                stroke="#B45309" 
                strokeWidth="1.5" 
              />

              {/* Golden Highlight on Beak Ridge */}
              <path d="M 57 52 Q 60 62 60 70" stroke="#FEF08A" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            </g>

            {/* 7. Gundam Pilot Earpiece / Cyber Sensor (Subtle High-Tech Accent) */}
            <g>
              <circle cx="85" cy="49" r="2.8" fill="#155EEF" stroke="#0F172A" strokeWidth="1.2" />
              <circle cx="85" cy="49" r="1.1" fill="#F5C400" />
              <motion.circle 
                cx="88" 
                cy="49" 
                r="1.8" 
                fill="#D92D20" 
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.2, 0.9] }} 
                transition={{ duration: 1.6, repeat: Infinity }} 
              />
            </g>

            {/* 8. Sparkle Glint on hover */}
            {isHovered && (
              <motion.path 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                d="M 76 38 L 78 34 L 80 38 L 84 40 L 80 42 L 78 46 L 76 42 L 72 40 Z" 
                fill="#F5C400" 
              />
            )}
          </g>
        </svg>

        {/* Hover Cue Banner */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          className="absolute inset-x-0 bottom-0 py-0.5 bg-[#17191D]/90 backdrop-blur-xs text-center"
        >
          <span className="text-[9px] font-bold text-[#F5C400] uppercase tracking-wider">
            EAGLE · APEX VISION
          </span>
        </motion.div>
      </motion.div>

      {/* 4. Active Availability Status Badge */}
      <div className="absolute -bottom-1 -right-1 bg-white border border-[#D8DCE2] px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-[#17191D] shadow-xs flex items-center gap-1.5 z-20">
        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>Available</span>
      </div>

      {/* 5. Speech Bubble Toast on Avatar Click */}
      <AnimatePresence>
        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: -8, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.85 }}
            className="absolute -top-12 z-30 px-3.5 py-1.5 rounded-full bg-[#17191D] text-white text-xs font-semibold shadow-xl border border-white/20 whitespace-nowrap flex items-center gap-1.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5C400] animate-ping" />
            <span>{activeMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
