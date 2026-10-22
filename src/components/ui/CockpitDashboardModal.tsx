import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { JobExperience } from '../../data/portfolio';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  ArrowUpRight,
  Activity,
  Sparkles
} from 'lucide-react';

interface CockpitDashboardModalProps {
  experience: JobExperience | null;
  allExperiences: JobExperience[];
  onClose: () => void;
  onSelectExperience: (exp: JobExperience) => void;
}

export const CockpitDashboardModal: React.FC<CockpitDashboardModalProps> = ({
  experience,
  allExperiences,
  onClose,
  onSelectExperience,
}) => {
  // Keyboard navigation: ESC to close, Left/Right arrow to cycle items
  useEffect(() => {
    if (!experience) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [experience]);

  if (!experience) return null;

  const currentIndex = allExperiences.findIndex((e) => e.id === experience.id);
  const totalCount = allExperiences.length;

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + totalCount) % totalCount;
    onSelectExperience(allExperiences[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % totalCount;
    onSelectExperience(allExperiences[nextIndex]);
  };

  const zoneColors = {
    blue: {
      accent: 'bg-[#155EEF]',
      badge: 'bg-[#155EEF]/10 border-[#155EEF]/30 text-[#155EEF]',
      activeTab: 'bg-[#155EEF] text-white',
    },
    yellow: {
      accent: 'bg-[#F5C400]',
      badge: 'bg-[#F5C400]/15 border-[#F5C400]/40 text-[#946C00]',
      activeTab: 'bg-[#F5C400] text-[#17191D]',
    },
    red: {
      accent: 'bg-[#D92D20]',
      badge: 'bg-[#D92D20]/10 border-[#D92D20]/30 text-[#D92D20]',
      activeTab: 'bg-[#D92D20] text-white',
    },
    white: {
      accent: 'bg-slate-500',
      badge: 'bg-slate-100 border-slate-300 text-slate-700',
      activeTab: 'bg-slate-700 text-white',
    },
  };

  const theme = zoneColors[experience.zone];
  const isOngoing = experience.status === 'ongoing';

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm"
        />

        {/* Modal Window Container */}
        <motion.div
          key={experience.id}
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-3xl bg-white text-slate-900 rounded-xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col font-sans border-2 border-[#17191D]"
        >
          {/* Top Gundam 4-Color Architectural Trim */}
          <div className="h-1 w-full flex select-none pointer-events-none shrink-0">
            <div className="flex-1 bg-[#155EEF]" />
            <div className="flex-1 bg-[#F5C400]" />
            <div className="flex-1 bg-[#D92D20]" />
            <div className="w-16 bg-slate-300" />
          </div>

          {/* Modal Header Bar */}
          <div className="px-5 sm:px-6 py-4 border-b-2 border-[#17191D] flex items-center justify-between gap-3 shrink-0 bg-[#17191D] text-white">
            {/* Left: Role & Company */}
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-10 h-10 rounded-md flex items-center justify-center font-mono font-bold text-sm shrink-0 select-none border border-white/20 ${experience.companyLogoBg}`}>
                {experience.companyLogoText}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase tracking-wider border ${theme.badge}`}>
                    ROLE 0{experience.checkpointNum}
                  </span>

                  {isOngoing ? (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[11px] font-mono font-bold border border-emerald-500/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      CURRENT
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 text-slate-300 text-[11px] font-mono font-bold border border-white/20">
                      <CheckCircle2 className="w-3 h-3 text-[#155EEF]" />
                      COMPLETED
                    </span>
                  )}
                </div>

                <h3 id="modal-title" className="text-base sm:text-lg font-bold text-white truncate leading-tight tracking-wide font-mono">
                  {experience.role}
                </h3>
                <p className="text-xs text-slate-300 truncate mt-0.5 font-mono">
                  <span className="font-bold text-white">{experience.company}</span>
                  <span className="mx-1 text-slate-500">•</span>
                  <span>{experience.location} ({experience.locationType})</span>
                </p>
              </div>
            </div>

            {/* Right: Steppers & Close Button */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handlePrev}
                className="p-1.5 rounded-md border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Previous Role (←)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono font-bold text-slate-400 px-1 hidden sm:inline">
                {currentIndex + 1} / {totalCount}
              </span>

              <button
                onClick={handleNext}
                className="p-1.5 rounded-md border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Next Role (→)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-md border border-white/20 bg-white/10 hover:bg-[#D92D20] text-white transition-colors cursor-pointer ml-1"
                title="Close (ESC)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Content */}
          <div className="p-5 sm:p-6 overflow-y-auto grow space-y-5">
            
            {/* Preview Image Frame */}
            {experience.previewImage && (
              <div className="relative rounded-lg overflow-hidden border-2 border-[#17191D] shadow-lg bg-slate-900 aspect-[16/8] sm:aspect-[16/7]">
                <img 
                  src={experience.previewImage} 
                  alt={experience.previewImageAlt || experience.role} 
                  className="w-full h-full object-cover object-top"
                />
                
                {/* Subtle clean badge overlay */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-xs text-white text-[11px] font-mono font-bold flex items-center gap-1.5 border border-white/20">
                    <Sparkles className="w-3 h-3 text-[#F5C400]" />
                    <span>{experience.period}</span>
                  </span>
                </div>
              </div>
            )}

            {/* Overview / Role Summary */}
            <div>
              <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                Role Brief &amp; Focus
              </h4>
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                {experience.summary}
              </p>
            </div>

            {/* Key Deliverables & Achievements */}
            <div>
              <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
                Key Achievements &amp; Impact
              </h4>
              <div className="space-y-2">
                {experience.achievements.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-50 border-2 border-slate-200 flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700 leading-relaxed"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Metrics */}
            <div>
              <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#155EEF]" />
                <span>Key Stats &amp; Performance</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {experience.telemetryStats.map((stat, i) => (
                  <div 
                    key={i} 
                    className="p-3 rounded-lg bg-slate-50 border-2 border-slate-200 flex flex-col justify-between font-mono"
                  >
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider truncate">
                      {stat.label}
                    </span>
                    <span className="text-base sm:text-lg font-black text-[#17191D] my-0.5">
                      {stat.value}
                    </span>
                    <span className="text-[10px] text-slate-500 truncate">
                      {stat.sublabel}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Modal Footer */}
          <div className="px-5 sm:px-6 py-3 border-t-2 border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-3 shrink-0">
            {/* Quick Role Navigation */}
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono font-bold text-slate-500 mr-1 hidden sm:inline">SELECT:</span>
              {allExperiences.map((exp, i) => {
                const isSelected = exp.id === experience.id;
                return (
                  <button
                    key={exp.id}
                    onClick={() => onSelectExperience(exp)}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all cursor-pointer ${
                      isSelected
                        ? `${theme.activeTab} shadow-xs font-bold border-2 border-[#17191D]`
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300 font-medium'
                    }`}
                  >
                    0{i + 1}
                  </button>
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <a
                href="#contact"
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-md bg-[#17191D] hover:bg-[#155EEF] text-white text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-sm border-2 border-[#17191D]"
              >
                <span>Get in touch</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#F5C400]" />
              </a>

              <button
                onClick={onClose}
                className="px-3.5 py-1.5 rounded-md border-2 border-slate-300 hover:bg-slate-200 text-slate-700 text-xs font-mono font-bold transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
