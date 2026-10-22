import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ONGOING_PROJECTS, OngoingProject } from '../../data/portfolio';
import { OngoingBuildModal } from '../ui/OngoingBuildModal';
import { 
  Sparkles, 
  Folder, 
  FolderOpen, 
  ArrowUp, 
  CheckCircle2, 
  ArrowUpRight, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  X, 
  Images, 
  Maximize2,
  Clock,
  Layers,
  Activity,
  Droplets,
  GraduationCap,
  TrendingUp,
  Bot
} from 'lucide-react';
import { FunSectionBackground } from '../ui/FunSectionBackground';
import { DoodleInteractable, MiniOrigamiPlane } from '../ui/DoodleInteractable';

interface OngoingFolderDoodleProps {
  project: OngoingProject;
  colIndex: number;
}

const OngoingFolderDoodle: React.FC<OngoingFolderDoodleProps> = ({ project, colIndex }) => {
  const isFarRight = colIndex === 3 || colIndex === 2;
  const isFarLeft = colIndex === 0;

  const alignClass = isFarRight 
    ? 'right-0 sm:-right-2' 
    : isFarLeft 
    ? 'left-0 sm:-left-2' 
    : 'left-1/2 -translate-x-1/2';

  const tapeColors: Record<string, string> = {
    blue: 'bg-[#155EEF]/90',
    yellow: 'bg-[#F5C400]/95',
    cyan: 'bg-cyan-600/90',
    red: 'bg-[#D92D20]/90',
    white: 'bg-slate-800/90',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.88 }}
      animate={{ 
        opacity: 1, 
        y: [0, -4, 0], 
        scale: 1, 
        rotate: isFarRight ? [1.5, 3, 1.5] : isFarLeft ? [-1.5, -3, -1.5] : [-0.5, 0.5, -0.5] 
      }}
      exit={{ opacity: 0, y: 10, scale: 0.88, transition: { duration: 0.16 } }}
      transition={{
        opacity: { duration: 0.2 },
        scale: { type: 'spring', stiffness: 360, damping: 22 },
        y: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' },
        rotate: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
      }}
      className={`absolute -top-[248px] sm:-top-[256px] ${alignClass} z-50 pointer-events-none flex flex-col items-center w-[268px] select-none drop-shadow-2xl`}
    >
      {/* Hand-drawn Sticky Note Card (Floating Above Preview Image) */}
      <div className="relative bg-[#FFFEEB] text-[#17191D] rounded-xl p-3 border-2 border-[#17191D] shadow-xl w-full">
        {/* Playful Washi Tape on top */}
        <div className={`absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 h-4 ${tapeColors[project.zone] || 'bg-[#155EEF]'} text-white rounded-xs rotate-[-2.5deg] shadow-xs border-t border-b border-black/20 flex items-center justify-center`}>
          <span className="text-[7.5px] font-mono font-bold tracking-widest uppercase opacity-95">ACTIVE BUILD</span>
        </div>

        {/* Note Header with Sparkle */}
        <div className="flex items-center justify-between border-b border-slate-300/80 pb-1 mb-1 mt-0.5 font-mono">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-xs">⚡</span>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#155EEF] truncate">
              {project.category.split('·')[0].trim()}
            </span>
          </div>
          <span className="text-[9px] font-bold bg-[#17191D] text-[#F5C400] px-1.5 py-0.2 rounded shrink-0">
            {project.progressPercentage}%
          </span>
        </div>

        {/* Stage Highlight */}
        <div className="text-[10.5px] font-black leading-tight text-slate-800 line-clamp-1 mb-1 font-sans">
          {project.stage}
        </div>

        {/* Tech pills */}
        <div className="flex items-center gap-1 flex-wrap mb-1">
          {project.techStack.slice(0, 3).map((tech, i) => (
            <span 
              key={i}
              className="text-[8.5px] font-mono font-bold bg-white text-slate-700 px-1.5 py-0.5 rounded border border-slate-300 shadow-2xs"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Callout */}
        <div className="flex items-center justify-between text-[9px] font-bold text-[#D92D20] pt-1 border-t border-dashed border-slate-300 font-mono">
          <span>👉 Click folder to unfold build</span>
          <span className="text-[8px] text-slate-500 font-normal">SPRINTS · LIVE</span>
        </div>
      </div>

      {/* Contrail with 3D Origami Paperplane */}
      <div className="w-full flex items-center justify-center -mt-0.5 overflow-visible pointer-events-none">
        <svg 
          width="170" 
          height="52" 
          viewBox="0 0 170 52" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible filter drop-shadow-md"
        >
          <motion.path
            d={isFarRight 
              ? "M 135 2 C 135 18, 100 12, 85 22 C 72 32, 95 44, 62 42 C 48 40, 38 46, 28 44"
              : isFarLeft 
              ? "M 35 2 C 35 18, 70 12, 85 22 C 98 32, 75 44, 108 42 C 122 40, 132 46, 142 44"
              : "M 48 2 C 48 20, 82 22, 96 14 C 110 6, 118 22, 102 32 C 86 42, 74 44, 56 46"
            }
            stroke="#10B981"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeDasharray="4 3"
            fill="none"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: [0, -28] }}
            transition={{ strokeDashoffset: { duration: 1.8, repeat: Infinity, ease: "linear" } }}
          />

          <motion.g
            transform={
              isFarRight 
                ? "translate(18, 38) rotate(-160)" 
                : isFarLeft 
                ? "translate(148, 38) rotate(20)" 
                : "translate(48, 40) rotate(-142)"
            }
            animate={{
              y: [0, -3, 0],
              x: [0, 2, 0],
              rotate: isFarRight ? [-160, -156, -160] : isFarLeft ? [20, 24, 20] : [-142, -138, -142],
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <MiniOrigamiPlane color="#10B981" scale={0.9} />
          </motion.g>
        </svg>
      </div>
    </motion.div>
  );
};

export const OngoingProjectsSection: React.FC = () => {
  const [activeFolderId, setActiveFolderId] = useState<string | null>(null);
  const [hoveredFolderId, setHoveredFolderId] = useState<string | null>(null);
  const [modalProject, setModalProject] = useState<OngoingProject | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const activeProject = ONGOING_PROJECTS.find((p) => p.id === activeFolderId);

  const folderStyles = {
    blue: {
      folderBg: 'bg-[#155EEF]',
      folderBorder: 'border-[#155EEF]',
      tabBg: 'bg-[#155EEF] text-white',
      accent: '#155EEF',
      glow: 'shadow-blue-500/20',
      badge: 'bg-blue-50 text-[#155EEF] border-blue-200',
      icon: <Droplets className="w-3.5 h-3.5 text-white" />
    },
    yellow: {
      folderBg: 'bg-[#F5C400]',
      folderBorder: 'border-[#E0B000]',
      tabBg: 'bg-[#F5C400] text-[#17191D]',
      accent: '#F5C400',
      glow: 'shadow-yellow-500/20',
      badge: 'bg-yellow-50 text-[#855F00] border-yellow-200',
      icon: <GraduationCap className="w-3.5 h-3.5 text-[#17191D]" />
    },
    red: {
      folderBg: 'bg-[#D92D20]',
      folderBorder: 'border-[#D92D20]',
      tabBg: 'bg-[#D92D20] text-white',
      accent: '#D92D20',
      glow: 'shadow-red-500/20',
      badge: 'bg-red-50 text-[#D92D20] border-red-200',
      icon: <TrendingUp className="w-3.5 h-3.5 text-white" />
    },
    white: {
      folderBg: 'bg-white',
      folderBorder: 'border-slate-300',
      tabBg: 'bg-white text-[#17191D]',
      accent: '#17191D',
      glow: 'shadow-slate-500/20',
      badge: 'bg-slate-100 text-slate-800 border-slate-300',
      icon: <Layers className="w-3.5 h-3.5 text-[#155EEF]" />
    }
  };

  const scrollToOngoingDossier = () => {
    setTimeout(() => {
      const el = document.getElementById('ongoing-dossier-stage');
      if (el) {
        const navOffset = 90;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = Math.max(0, elementPosition - navOffset);

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 120);
  };

  const handleFolderClick = (id: string) => {
    if (activeFolderId === id) {
      scrollToOngoingDossier();
    } else {
      setActiveFolderId(id);
      setActiveImageIndex(0);
      scrollToOngoingDossier();
    }
  };

  return (
    <section 
      id="ongoing" 
      className="py-16 md:py-24 relative overflow-hidden font-sans border-t border-b border-slate-300 shadow-inner"
    >
      {/* 4-Color Section Background (Blue, Red, White, Yellow) */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <div className="absolute inset-0 grid grid-cols-4 h-full w-full">
          <div className="bg-[#155EEF] h-full w-full" />
          <div className="bg-[#D92D20] h-full w-full" />
          <div className="bg-white h-full w-full" />
          <div className="bg-[#F5C400] h-full w-full" />
        </div>

        {/* Fun Dynamic Animated Background Overlay */}
        <FunSectionBackground theme="multicolor" variant="ongoing" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Frosted Glass Backdrop */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/60 shadow-xl"
        >
          {/* Header Pill with Live Pulsing Green Dot */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-slate-100 rounded-full text-xs font-semibold text-slate-800 mb-3 border border-slate-300 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
              Live In Progress · {ONGOING_PROJECTS.length} Active Build Folders
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[#17191D] leading-tight">
            On Going Projects
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            Click any active project folder below to view project details, live screens, and sprint progress.
          </p>
        </motion.div>

        {/* ============================================================== */}
        {/* 1. THE OPENED IN-PROGRESS DOSSIER STAGE (OPENS ABOVE)          */}
        {/* ============================================================== */}
        <AnimatePresence mode="wait">
          {activeProject && (
            <motion.div
              id="ongoing-dossier-stage"
              key={activeProject.id}
              initial={{ opacity: 0, y: 35, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -25, scale: 0.98 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10 sm:mb-12 relative z-20 scroll-mt-24"
            >
              <div className="bg-white rounded-xl shadow-2xl border-2 border-[#17191D] overflow-hidden">
                {/* Dossier Top File Tab Bar */}
                <div className="px-5 sm:px-6 py-3 bg-[#17191D] text-white flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#17191D]">
                  <div className="flex items-center gap-3">
                    <span 
                      className="px-2.5 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider text-white shadow-xs"
                      style={{ backgroundColor: folderStyles[activeProject.zone].accent }}
                    >
                      FOLDER 0{ONGOING_PROJECTS.findIndex((p) => p.id === activeProject.id) + 1}
                    </span>
                    <span className="font-mono font-bold text-sm sm:text-base text-white tracking-wide">
                      {activeProject.name}
                    </span>
                    <span className="hidden sm:inline-block px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-white/10 text-emerald-400 border border-white/20">
                      {activeProject.stage}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setModalProject(activeProject)}
                      className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 border border-white/20"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#F5C400]" />
                      <span>View Screenshots</span>
                    </button>

                    <button
                      onClick={() => setActiveFolderId(null)}
                      className="p-1.5 rounded-md bg-white/10 hover:bg-[#D92D20] text-white transition-colors cursor-pointer border border-white/20"
                      title="Fold folder closed"
                      aria-label="Close folder"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Gundam 4-Color Architectural Trim */}
                <div className="h-1 w-full flex select-none pointer-events-none">
                  <div className="flex-1 bg-[#155EEF]" />
                  <div className="flex-1 bg-[#F5C400]" />
                  <div className="flex-1 bg-[#D92D20]" />
                  <div className="w-16 bg-slate-300" />
                </div>

                {/* Dossier Interior Body */}
                <div className="p-4 sm:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                    
                    {/* Left: Gallery Viewport */}
                    <div className="lg:col-span-7 space-y-3">
                      <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-slate-950 shadow-lg border-2 border-[#17191D]">
                        <img
                          src={activeProject.demoImages[activeImageIndex]?.image || activeProject.heroImage}
                          alt={activeProject.name}
                          className="w-full h-full object-cover"
                        />

                        {/* Top Overlay Badge */}
                        <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 text-xs font-mono font-bold text-white rounded-md border border-white/20">
                          <span>{activeProject.demoImages[activeImageIndex]?.tag || 'Active Demo'}</span>
                        </div>

                        {/* Carousel Arrows if multiple images */}
                        {activeProject.demoImages.length > 1 && (
                          <>
                            <button
                              onClick={() => setActiveImageIndex((prev) => (prev - 1 + activeProject.demoImages.length) % activeProject.demoImages.length)}
                              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setActiveImageIndex((prev) => (prev + 1) % activeProject.demoImages.length)}
                              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>

                      {/* Image Thumbnail Selector */}
                      {activeProject.demoImages.length > 1 && (
                        <div className="flex items-center gap-2">
                          {activeProject.demoImages.map((demo, idx) => (
                            <button
                              key={demo.id}
                              onClick={() => setActiveImageIndex(idx)}
                              className={`flex-1 p-2 rounded-md border-2 text-left text-xs transition-all cursor-pointer font-mono ${
                                activeImageIndex === idx 
                                  ? 'border-[#155EEF] bg-blue-50 font-bold text-[#155EEF]' 
                                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                              }`}
                            >
                              <div className="truncate font-bold">{demo.title}</div>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right: Technical Specs & Progress */}
                    <div className="lg:col-span-5 space-y-4">
                      <div>
                        <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                          {activeProject.category}
                        </span>
                        <h3 className="text-2xl font-black text-[#17191D] mt-0.5 tracking-tight">
                          {activeProject.name}
                        </h3>
                      </div>

                      {/* Progress Bar */}
                      <div className="p-3.5 rounded-lg bg-slate-50 border-2 border-slate-200">
                        <div className="flex items-center justify-between text-xs font-mono font-bold mb-1.5">
                          <span className="text-slate-700">{activeProject.stage}</span>
                          <span className="text-[#155EEF]">{activeProject.progressPercentage}%</span>
                        </div>
                        <div className="w-full h-2 rounded bg-slate-200 overflow-hidden">
                          <div 
                            className="h-full transition-all duration-500"
                            style={{ 
                              width: `${activeProject.progressPercentage}%`,
                              backgroundColor: folderStyles[activeProject.zone].accent 
                            }}
                          />
                        </div>
                        <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1.5 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>Target Launch: <strong>{activeProject.targetLaunch}</strong></span>
                        </div>
                      </div>

                      {/* Summary & Value Proposition */}
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {activeProject.summary}
                      </p>

                      {/* Problem Solved Callout */}
                      <div className="p-3 rounded-lg bg-blue-50/70 border-2 border-blue-200 text-xs text-blue-950">
                        <span className="font-mono font-bold block mb-0.5 uppercase tracking-wide text-[#155EEF]">Problem Solved:</span>
                        <p className="leading-snug text-blue-900">{activeProject.keyProblemSolved}</p>
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                          Core Technology Stack
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeProject.techStack.map((tech) => (
                            <span 
                              key={tech}
                              className="px-2.5 py-1 rounded-md bg-slate-100 text-[#17191D] text-xs font-mono font-bold border border-slate-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action CTA with Doodle Effect */}
                      <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                        {activeProject.liveUrl && (
                          <DoodleInteractable variant="button" accentColor="#F5C400" doodleText="OPEN SITE 🚀">
                            <a
                              href={activeProject.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-5 py-2.5 rounded-md bg-[#155EEF] hover:bg-[#104ECC] text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95 border-2 border-[#155EEF]"
                            >
                              <span>LAUNCH DEMO</span>
                              <ArrowUpRight className="w-4 h-4 text-[#F5C400]" />
                            </a>
                          </DoodleInteractable>
                        )}
                        <DoodleInteractable variant="button" accentColor="#10B981" doodleText="GALLERY 📸">
                          <button
                            onClick={() => setModalProject(activeProject)}
                            className="flex-1 py-2.5 px-4 rounded-md bg-[#17191D] hover:bg-slate-800 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-95 border-2 border-[#17191D]"
                          >
                            <Sparkles className="w-4 h-4 text-[#F5C400]" />
                            <span>View Screenshots ({activeProject.demoImages.length})</span>
                          </button>
                        </DoodleInteractable>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Downward Directional Connector Arrow pointing into active folder below */}
                <motion.div 
                  className="absolute bottom-0 hidden lg:flex items-center justify-center pointer-events-none z-20"
                  animate={{ 
                    left: activeProject 
                      ? `${(ONGOING_PROJECTS.findIndex(p => p.id === activeProject.id) * (100 / ONGOING_PROJECTS.length)) + (100 / (ONGOING_PROJECTS.length * 2))}%`
                      : '50%'
                  }}
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  style={{ transform: 'translateX(-50%) translateY(50%)' }}
                >
                  <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[14px] border-t-white drop-shadow-md" />
                </motion.div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>


        {/* ============================================================== */}
        {/* 2. THE GUNDAM IN-PROGRESS FOLDERS RACK (DOCKED BELOW)          */}
        {/* ============================================================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 gap-y-36 sm:gap-y-40 relative z-10 pt-28 sm:pt-36 lg:pt-40 pb-12 overflow-visible">
          {ONGOING_PROJECTS.map((proj, idx) => {
            const isSelected = activeFolderId === proj.id;
            const isHovered = hoveredFolderId === proj.id;
            const style = folderStyles[proj.zone];

            // 4-tab stepped layout (staggered 1/4 cut indexing)
            const colIndex = idx % 4;
            const tabPositionClass = 
              colIndex === 0 ? 'left-3 sm:left-4' :
              colIndex === 1 ? 'left-[22%] sm:left-[24%]' :
              colIndex === 2 ? 'left-[46%] sm:left-[48%]' :
              'right-3 sm:right-4 left-auto';

            return (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.65, delay: idx * 0.12, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className={`relative select-none cursor-pointer group transition-all duration-300 ${
                  isHovered ? 'z-40' : isSelected ? 'z-30' : 'z-10'
                }`}
                style={{ perspective: 1200 }}
                onMouseEnter={() => setHoveredFolderId(proj.id)}
                onMouseLeave={() => setHoveredFolderId(null)}
                onClick={() => handleFolderClick(proj.id)}
                role="button"
                tabIndex={0}
                aria-expanded={isSelected}
                aria-label={`Open folder ${proj.name} above`}
              >
                {/* Visual Folder Wrapper */}
                <div className={`relative rounded-xl transition-all duration-300 ${
                  isSelected ? 'scale-[1.02] -translate-y-2' : ''
                }`}>
                  
                  {/* Whimsical Doodle with Paperplane & Contrail on Hover */}
                  <AnimatePresence>
                    {isHovered && !isSelected && (
                      <OngoingFolderDoodle project={proj} colIndex={idx} />
                    )}
                  </AnimatePresence>
                  
                  {/* Top Folder Tab with Stepped Position & Rivet Hole */}
                  <div className={`absolute -top-5.5 ${tabPositionClass} px-4 py-1.5 rounded-t-md text-xs font-mono font-bold flex items-center gap-2 shadow-md transition-all z-0 border-t-2 border-x-2 border-[#17191D] ${
                    style.tabBg
                  } ${
                    isSelected ? 'ring-2 ring-white -translate-y-1' : isHovered ? 'scale-105' : 'opacity-95'
                  }`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-black/25 ring-1 ring-white/50" />
                    {isSelected ? <FolderOpen className="w-3.5 h-3.5" /> : <Folder className="w-3.5 h-3.5" />}
                    <span className="tracking-wide">FOLDER 0{idx + 1} · {proj.zone.toUpperCase()}</span>
                  </div>

                  {/* Back Folder Sleeve Container (overflow-visible for emerging sneak peek paper) */}
                  <div className={`h-[200px] w-full rounded-xl border-2 transition-all relative overflow-visible flex flex-col justify-end bg-white border-[#17191D] ${
                    isSelected ? 'ring-4 ring-white shadow-2xl' : 'shadow-lg hover:shadow-2xl'
                  }`}>

                    {/* ========================================================= */}
                    {/* SNEAK PEEK DOCUMENT PAPER (SLIDES OUT UPWARD ON HOVER)    */}
                    {/* ========================================================= */}
                    <motion.div
                      animate={{
                        y: isHovered ? -135 : isSelected ? -42 : 0,
                        rotate: isHovered ? (idx === 0 ? -2 : idx === 1 ? 0 : 2) : (isSelected ? -1 : 0),
                        scale: isHovered ? 1.02 : 1,
                      }}
                      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                      className="absolute inset-x-3 top-2.5 bg-[#FCFDFF] rounded-lg shadow-2xl border-2 border-slate-300 p-2.5 sm:p-3 z-10 pointer-events-none flex flex-col justify-between overflow-hidden"
                      style={{
                        height: '225px',
                        boxShadow: isHovered 
                          ? '0 25px 50px -12px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255,255,255,0.9)' 
                          : '0 8px 16px -4px rgba(0, 0, 0, 0.15)',
                      }}
                    >
                      {/* Top Header Bar */}
                      <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 mb-1 font-mono">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[9px] font-bold tracking-wider uppercase text-slate-700">
                            ACTIVE BUILD · 0{idx + 1}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[8.5px] font-mono font-bold uppercase tracking-tight bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {proj.progressPercentage}% COMPLETE
                        </span>
                      </div>

                      {/* Preview Image */}
                      <div className="relative w-full h-24 sm:h-28 rounded-md overflow-hidden border border-slate-200/90 bg-slate-900 shadow-inner group-hover:shadow-md transition-all">
                        <img 
                          src={proj.heroImage} 
                          alt={proj.name} 
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                        />
                        {/* Live Preview Tag */}
                        <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[8.5px] font-mono font-bold text-white flex items-center gap-1 shadow-sm">
                          <Sparkles className="w-2.5 h-2.5 text-[#F5C400]" />
                          <span>SNEAK PEEK</span>
                        </div>
                        {/* Bottom category caption overlay */}
                        <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-black/75 to-transparent flex items-end px-2.5 pb-1 font-mono">
                          <span className="text-[9px] text-white/95 font-semibold truncate">
                            {proj.category.split('·')[0]}
                          </span>
                        </div>
                      </div>

                      {/* Document Bottom Callout */}
                      <div className="pt-1.5 flex items-center justify-between border-t border-slate-100 font-mono">
                        <span className="text-[9.5px] font-bold text-[#155EEF] tracking-wide truncate max-w-[160px]">
                          {proj.name}
                        </span>
                        <span className="text-[8.5px] font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-0.5">
                          <span>EXPAND DETAILS</span>
                          <ArrowUp className="w-2.5 h-2.5" />
                        </span>
                      </div>
                    </motion.div>

                    {/* 3D Front Folder Flap */}
                    <motion.div
                      animate={{
                        rotateX: isSelected ? -24 : isHovered ? -16 : 0,
                        y: isSelected ? 8 : isHovered ? 4 : 0,
                        boxShadow: isSelected 
                          ? '0 20px 32px -8px rgba(0,0,0,0.35)' 
                          : isHovered 
                          ? '0 14px 24px -4px rgba(0,0,0,0.2)' 
                          : '0 6px 14px -2px rgba(0,0,0,0.1)',
                      }}
                      transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                      style={{ 
                        transformOrigin: 'bottom center',
                        transformStyle: 'preserve-3d',
                      }}
                      className="relative z-20 bg-white rounded-lg p-4 border-2 border-[#17191D] shadow-md flex flex-col justify-between space-y-3 min-h-[145px]"
                    >
                      {/* Folder Crease Line */}
                      <div className="absolute top-0 inset-x-0 h-1 bg-black/10 rounded-t-xl" />

                      {/* Top identity bar with live status */}
                      <div className="flex items-center justify-between gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${style.badge} flex items-center gap-1.5`}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                          <span>{proj.statusBadge}</span>
                        </span>
                        <span className="text-[11px] font-mono font-bold text-[#155EEF]">
                          {proj.progressPercentage}%
                        </span>
                      </div>

                      {/* Project Title & Category */}
                      <div>
                        <h4 className="font-black text-base text-[#17191D] group-hover:text-[#155EEF] transition-colors line-clamp-1">
                          {proj.name}
                        </h4>
                        <span className="text-xs text-slate-500 font-medium line-clamp-1">
                          {proj.category}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-500"
                          style={{ 
                            width: `${proj.progressPercentage}%`,
                            backgroundColor: style.accent
                          }}
                        />
                      </div>

                      {/* Folder Bottom Trigger Bar */}
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-[11px] text-slate-500 font-medium">
                          {proj.demoImages.length} demo screens
                        </span>
                        <span className={`font-bold flex items-center gap-1 text-[11px] ${
                          isSelected ? 'text-emerald-600' : isHovered ? 'text-[#F5C400]' : 'text-[#155EEF]'
                        }`}>
                          <span>{isSelected ? 'Folder Open' : isHovered ? 'Slide out preview ↑' : 'Open Folder ↑'}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </motion.div>

                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

      {/* Deep-Dive Sprints & Architecture Modal */}
      <OngoingBuildModal 
        project={modalProject} 
        onClose={() => setModalProject(null)} 
      />
    </section>
  );
};
