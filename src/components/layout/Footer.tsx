import React from 'react';
import { PROFILE_INFO } from '../../data/portfolio';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#17191D] text-white py-8 border-t-2 border-[#17191D] font-mono text-xs relative overflow-hidden">
      {/* Signature 4-Color Architectural Trim */}
      <div className="absolute top-0 inset-x-0 h-1 flex select-none pointer-events-none">
        <div className="flex-1 bg-[#155EEF]" />
        <div className="flex-1 bg-[#F5C400]" />
        <div className="flex-1 bg-[#D92D20]" />
        <div className="w-16 bg-slate-700" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <div className="flex items-center gap-2.5">
          {/* Gundam Tricolor Mini Dots */}
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#155EEF]" />
            <span className="w-2 h-2 rounded-full bg-[#F5C400]" />
            <span className="w-2 h-2 rounded-full bg-[#D92D20]" />
          </div>
          <span className="font-bold text-white tracking-wide">{PROFILE_INFO.name}</span>
          <span className="text-gray-600">//</span>
          <span className="text-gray-400 uppercase tracking-wider text-[11px]">Engineering Projects &amp; Archive</span>
        </div>

        <div className="flex items-center gap-3 text-gray-400 text-[11px]">
          <span>© {currentYear} WILL BADILLO</span>
          <span>//</span>
          <span>ALL RIGHTS RESERVED</span>
        </div>

      </div>
    </footer>
  );
};
