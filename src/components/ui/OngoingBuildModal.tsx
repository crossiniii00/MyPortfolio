import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { OngoingProject } from '../../data/portfolio';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink,
  Eye
} from 'lucide-react';

interface OngoingBuildModalProps {
  project: OngoingProject | null;
  onClose: () => void;
}

export const OngoingBuildModal: React.FC<OngoingBuildModalProps> = ({ project, onClose }) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  useEffect(() => {
    setActiveImageIdx(0);
  }, [project]);

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && project.demoImages.length > 1) {
        setActiveImageIdx((prev) => (prev - 1 + project.demoImages.length) % project.demoImages.length);
      } else if (e.key === 'ArrowRight' && project.demoImages.length > 1) {
        setActiveImageIdx((prev) => (prev + 1) % project.demoImages.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const currentImage = project.demoImages[activeImageIdx] || project.demoImages[0];

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`${project.name} Preview`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border-2 border-[#17191D] overflow-hidden flex flex-col max-h-[92vh] my-auto"
        >
          {/* Top Tricolor Trim */}
          <div className="h-1 w-full flex select-none pointer-events-none shrink-0">
            <div className="flex-1 bg-[#155EEF]" />
            <div className="flex-1 bg-[#F5C400]" />
            <div className="flex-1 bg-[#D92D20]" />
            <div className="w-16 bg-slate-300" />
          </div>

          {/* Clean, Compact Header */}
          <div className="px-5 sm:px-6 py-3.5 bg-[#17191D] text-white flex items-center justify-between gap-3 border-b border-slate-800 shrink-0">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white truncate">
                  {project.name}
                </h2>
                <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-slate-300 border border-white/15">
                  {project.category}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 rounded-lg bg-[#155EEF] hover:bg-[#104ECC] text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                  title="Open live website"
                >
                  <span>Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#F5C400]" />
                </a>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg bg-white/10 hover:bg-[#D92D20] text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Body - Focused on Clean Visuals */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {/* Main Screenshot Container */}
            <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-200 shadow-lg">
              <img
                src={currentImage.image}
                alt={currentImage.title}
                className="w-full aspect-[16/10] sm:aspect-[16/9] object-cover object-top"
              />

              {/* Top Tag & Counter */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-black/75 text-white backdrop-blur-md text-xs font-bold border border-white/20">
                  {currentImage.tag || 'Screenshot'}
                </span>
                {project.demoImages.length > 1 && (
                  <span className="px-2 py-1 rounded-md bg-black/60 text-white/90 backdrop-blur-md text-[11px] font-mono">
                    {activeImageIdx + 1} / {project.demoImages.length}
                  </span>
                )}
              </div>

              {/* Prev / Next Arrows */}
              {project.demoImages.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIdx((prev) => (prev - 1 + project.demoImages.length) % project.demoImages.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center shadow-md transition-all active:scale-90 cursor-pointer border border-white/20"
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => setActiveImageIdx((prev) => (prev + 1) % project.demoImages.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center shadow-md transition-all active:scale-90 cursor-pointer border border-white/20"
                    aria-label="Next screenshot"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Clean Short Caption below image */}
            <div className="flex items-center justify-between text-xs text-slate-600 px-1">
              <span className="font-bold text-slate-800">{currentImage.title}</span>
              {currentImage.caption && (
                <span className="hidden sm:inline text-slate-500 truncate max-w-md">{currentImage.caption}</span>
              )}
            </div>

            {/* Thumbnail Row */}
            {project.demoImages.length > 1 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {project.demoImages.map((img, idx) => (
                  <button
                    key={img.id}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`rounded-xl overflow-hidden border-2 transition-all p-1.5 flex items-center gap-2 text-left cursor-pointer ${
                      activeImageIdx === idx 
                        ? 'border-[#155EEF] bg-blue-50/70 shadow-xs' 
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <img 
                      src={img.image} 
                      alt={img.title} 
                      className="w-12 h-9 object-cover rounded-md shrink-0 border border-slate-200" 
                    />
                    <div className="overflow-hidden min-w-0">
                      <span className="text-[11px] font-bold text-slate-800 truncate block">
                        {img.title}
                      </span>
                      <span className="text-[10px] text-slate-500 truncate block">
                        {img.tag}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Clean, Simple Summary (Zero Bloat) */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xl">
                {project.summary}
              </p>

              <div className="flex items-center gap-2 shrink-0">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#17191D] hover:bg-[#155EEF] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#F5C400]" />
                    <span>Open Live Project</span>
                    <ExternalLink className="w-3 h-3 text-white/70" />
                  </a>
                )}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
