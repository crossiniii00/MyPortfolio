import React from 'react';
import { motion } from 'motion/react';
import { 
  Home, 
  FolderGit2, 
  Cpu, 
  Activity, 
  Sparkles, 
  Mail, 
  FileText
} from 'lucide-react';

interface MobileBottomDockProps {
  activeSection: string;
  currentPage: 1 | 2;
  onPageChange: (page: 1 | 2) => void;
}

export const MobileBottomDock: React.FC<MobileBottomDockProps> = ({
  activeSection,
  currentPage,
  onPageChange,
}) => {
  const isPageOne = currentPage === 1;

  const scrollTo = (id: string) => {
    if (!isPageOne) {
      onPageChange(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'intro', label: 'Intro', icon: Home },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'ongoing', label: 'Live Labs', icon: Activity, hasPulse: true },
    { id: 'skills', label: 'Stack', icon: Cpu },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <div className="fixed bottom-2 inset-x-2 sm:hidden z-40 select-none pointer-events-auto pb-[env(safe-area-inset-bottom)]">
      <div className="bg-[#17191D]/95 backdrop-blur-xl rounded-xl border-2 border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.6)] overflow-hidden">
        {/* Top Gundam 4-Color Architectural Trim */}
        <div className="h-[2px] w-full flex select-none pointer-events-none">
          <div className="flex-1 bg-[#155EEF]" />
          <div className="flex-1 bg-[#F5C400]" />
          <div className="flex-1 bg-[#D92D20]" />
          <div className="w-10 bg-slate-500" />
        </div>

        {/* Dock Items Bar */}
        <div className="px-1.5 py-1.5 flex items-center justify-between gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = isPageOne && activeSection === item.id;

            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.88 }}
                onClick={() => scrollTo(item.id)}
                className={`relative flex-1 py-1.5 px-1 rounded-lg flex flex-col items-center justify-center transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white/15 text-white font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="relative">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#F5C400]' : 'currentColor'}`} />
                  {item.hasPulse && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-400 animate-pulse ring-1 ring-black" />
                  )}
                </div>
                <span className="text-[9.5px] font-mono tracking-tight mt-0.5 leading-none">
                  {item.label}
                </span>

                {/* Active Indicator Underline */}
                {isActive && (
                  <motion.span 
                    layoutId="mobileDockActivePill"
                    className="absolute -bottom-0.5 w-3 h-0.5 rounded-full bg-[#155EEF]" 
                  />
                )}
              </motion.button>
            );
          })}

          {/* Quick Flip to Formal Resume (Page 02) */}
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => onPageChange(isPageOne ? 2 : 1)}
            className={`py-1.5 px-2.5 rounded-lg flex flex-col items-center justify-center transition-all cursor-pointer border ${
              !isPageOne 
                ? 'bg-[#155EEF] text-white border-blue-400 shadow-sm' 
                : 'bg-white/10 hover:bg-white/20 text-[#F5C400] border-white/20'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span className="text-[9.5px] font-mono font-bold tracking-tight mt-0.5 leading-none">
              {!isPageOne ? 'Page 01' : 'Resume'}
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};
