import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Folder, 
  Activity, 
  Briefcase, 
  Cpu, 
  Layers, 
  CreditCard, 
  Mail, 
  Compass, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

export interface TocItem {
  id: string;
  num: string;
  label: string;
  category: string;
  zone: 'blue' | 'yellow' | 'red';
}

export const TOC_ITEMS: TocItem[] = [
  { id: 'intro', num: '01', label: 'Overview', category: 'Hero & Intro', zone: 'blue' },
  { id: 'skills', num: '02', label: 'Tools & Technologies', category: 'Tech Stack & Tools', zone: 'blue' },
  { id: 'projects', num: '03', label: 'Projects', category: 'Showcase Folders', zone: 'blue' },
  { id: 'ongoing', num: '04', label: 'On Going Projects', category: 'Live In-Progress', zone: 'yellow' },
  { id: 'experience', num: '05', label: 'Work Experience', category: 'Career Timeline', zone: 'yellow' },
  { id: 'services', num: '06', label: 'Services Offered', category: 'Capabilities Matrix', zone: 'blue' },
  { id: 'rates', num: '07', label: 'Nature of Work', category: 'Work Terms & Rates', zone: 'red' },
  { id: 'workstation', num: '08', label: 'Dev Workstation', category: 'Hardware & Rig', zone: 'blue' },
  { id: 'contact', num: '09', label: 'Contact Letter', category: 'Correspondence', zone: 'yellow' },
];

interface TableOfContentsProps {
  activeSection: string;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ activeSection }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track overall scroll progress percentage
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(100, Math.max(0, Math.round((window.scrollY / totalScroll) * 100)));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeIndex = TOC_ITEMS.findIndex((item) => item.id === activeSection);
  const activeItem = activeIndex !== -1 ? TOC_ITEMS[activeIndex] : TOC_ITEMS[0];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getIcon = (id: string, className = "w-3.5 h-3.5") => {
    switch (id) {
      case 'intro': return <Home className={className} />;
      case 'projects': return <Folder className={className} />;
      case 'ongoing': return <Activity className={className} />;
      case 'experience': return <Briefcase className={className} />;
      case 'skills': return <Cpu className={className} />;
      case 'services': return <Layers className={className} />;
      case 'rates': return <CreditCard className={className} />;
      case 'contact': return <Mail className={className} />;
      default: return <Compass className={className} />;
    }
  };

  return (
    <aside 
      aria-label="Table of Contents Quick Navigation"
      className="hidden md:block fixed left-2 sm:left-4 top-1/2 -translate-y-1/2 z-40 select-none font-sans"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
        className={`bg-slate-950/90 text-white rounded-2xl border border-white/20 shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-300 relative ${
          isHovered ? 'w-64 sm:w-72 shadow-blue-500/10' : 'w-11 sm:w-12'
        }`}
      >
        {/* Leftmost Gundam Tricolor Edge Strip */}
        <div className="absolute top-0 bottom-0 left-0 w-1 flex flex-col z-20">
          <div className="h-1/3 bg-[#155EEF]" />
          <div className="h-1/3 bg-[#F5C400]" />
          <div className="h-1/3 bg-[#D92D20]" />
        </div>

        {/* =========================================================================
            STATE A: COLLAPSED / IDLE INDICATOR RAIL
           ========================================================================= */}
        {!isHovered && (
          <div className="py-4 pl-2.5 pr-1.5 flex flex-col items-center justify-between gap-3 min-h-[300px]">
            
            {/* Top Compass / Menu Icon */}
            <div 
              className="w-7 h-7 rounded-xl bg-white/10 flex items-center justify-center text-[#F5C400] hover:bg-white/20 transition-colors cursor-pointer"
              title="Hover to expand Table of Contents"
              onClick={() => setIsHovered(true)}
            >
              <Compass className="w-4 h-4 animate-spin-slow" />
            </div>

            {/* Vertical Active Dot Array */}
            <div className="flex flex-col items-center gap-2.5 my-auto">
              {TOC_ITEMS.map((item, idx) => {
                const isActive = item.id === activeSection;

                return (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="group/dot relative p-1 cursor-pointer"
                    title={`${item.num} ${item.label}`}
                    aria-label={`Scroll to ${item.label}`}
                  >
                    <motion.div
                      animate={{
                        scale: isActive ? 1.35 : 1,
                        backgroundColor: isActive 
                          ? (item.zone === 'blue' ? '#155EEF' : item.zone === 'yellow' ? '#F5C400' : '#D92D20')
                          : '#475569'
                      }}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        isActive ? 'ring-2 ring-white/50 shadow-sm' : 'hover:bg-slate-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>

            {/* Bottom Active Number Pill */}
            <div className="text-[10px] font-mono font-bold text-slate-400">
              {activeItem.num}
            </div>

          </div>
        )}

        {/* =========================================================================
            STATE B: EXPANDED TABLE OF CONTENTS (ON HOVER / TAP)
           ========================================================================= */}
        {isHovered && (
          <div className="p-4 pl-5">
            
            {/* Drawer Header */}
            <div className="pb-3 mb-2.5 border-b border-white/10 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#F5C400] uppercase tracking-wider">
                  <Compass className="w-3.5 h-3.5" />
                  <span>Table of Contents</span>
                </div>
                <div className="text-xs text-slate-400 font-mono mt-0.5">
                  Section {activeItem.num} of 08 · {scrollProgress}% scrolled
                </div>
              </div>

              {/* Progress Bar pill */}
              <div className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] font-mono text-emerald-400 font-bold border border-white/10">
                {scrollProgress}%
              </div>
            </div>

            {/* Scrollable List of 8 Sections */}
            <div className="space-y-1">
              {TOC_ITEMS.map((item) => {
                const isActive = item.id === activeSection;

                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollTo(item.id)}
                    className={`w-full px-2.5 py-1.5 rounded-xl text-left flex items-center justify-between group/item transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#155EEF] text-white shadow-md font-bold'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      {/* Icon */}
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-400 group-hover/item:text-white'
                      }`}>
                        {getIcon(item.id, "w-3 h-3")}
                      </div>

                      {/* Number & Title */}
                      <div className="min-w-0">
                        <div className="text-xs truncate leading-tight flex items-center gap-1.5">
                          <span className="font-mono text-[10px] opacity-75">{item.num}</span>
                          <span className="truncate">{item.label}</span>
                        </div>
                        <div className={`text-[9px] truncate ${isActive ? 'text-white/80' : 'text-slate-500'}`}>
                          {item.category}
                        </div>
                      </div>
                    </div>

                    {/* Active chevron */}
                    {isActive ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F5C400] animate-pulse" />
                    ) : (
                      <ChevronRight className="w-3 h-3 text-slate-500 group-hover/item:text-white opacity-0 group-hover/item:opacity-100 transition-opacity" />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Footer Quick Hint */}
            <div className="pt-3 mt-2 border-t border-white/10 text-[10px] text-slate-400 flex items-center justify-between">
              <span>Click any to jump</span>
              <span className="font-mono text-slate-500">Auto-tracking</span>
            </div>

          </div>
        )}

      </motion.div>
    </aside>
  );
};
