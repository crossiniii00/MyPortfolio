import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  SHOWCASE_PROJECTS, 
  ONGOING_PROJECTS, 
  ProjectShowcase, 
  OngoingProject 
} from '../../data/portfolio';
import { 
  ArrowUpRight, 
  Folder, 
  FolderOpen, 
  Sparkles, 
  Activity, 
  Check, 
  ExternalLink, 
  ArrowUp, 
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Calendar,
  Clock,
  ArrowRight,
  ArrowLeft,
  Columns,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { FunSectionBackground } from '../ui/FunSectionBackground';
import { DoodleInteractable, MiniOrigamiPlane } from '../ui/DoodleInteractable';
import { OngoingBuildModal } from '../ui/OngoingBuildModal';

const formatProjectNum = (num: string) => (num.length === 1 ? `0${num}` : num);

/* ========================================================================== */
/* DOODLE 1: ACCOMPLISHED FOLDER DOODLE                                      */
/* ========================================================================== */
interface FolderHoverDoodleProps {
  project: ProjectShowcase;
  colIndex: number;
}

const FolderHoverDoodle: React.FC<FolderHoverDoodleProps> = ({ project, colIndex }) => {
  const isFarRight = colIndex === 3;
  const isFarLeft = colIndex === 0;

  const alignClass = isFarRight 
    ? 'right-0 sm:-right-2' 
    : isFarLeft 
    ? 'left-0 sm:-left-2' 
    : 'left-1/2 -translate-x-1/2';

  const primaryMetric = project.metrics && project.metrics[0] 
    ? `${project.metrics[0].label}: ${project.metrics[0].value}` 
    : project.headline;

  const tapeColors: Record<string, string> = {
    blue: 'bg-[#155EEF]/90',
    yellow: 'bg-[#F5C400]/95',
    red: 'bg-[#D92D20]/90',
    white: 'bg-slate-700/85',
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
      className={`absolute -top-[248px] sm:-top-[256px] ${alignClass} z-50 pointer-events-none hidden sm:flex flex-col items-center w-[268px] select-none drop-shadow-2xl`}
    >
      <div className="relative bg-[#FFFEEB] text-[#17191D] rounded-xl p-3 border-2 border-[#17191D] shadow-xl w-full">
        <div className={`absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 h-4 ${tapeColors[project.zone] || 'bg-[#155EEF]'} text-white rounded-xs rotate-[-2.5deg] shadow-xs border-t border-b border-black/20 flex items-center justify-center`}>
          <span className="text-[7.5px] font-mono font-bold tracking-widest uppercase opacity-95">TAP TO OPEN</span>
        </div>

        <div className="flex items-center justify-between border-b border-slate-300/80 pb-1 mb-1 mt-0.5">
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-xs">✨</span>
            <span className="font-mono text-[10px] font-black uppercase tracking-wider text-[#155EEF] truncate">
              {project.category.split('·')[0].trim()}
            </span>
          </div>
          <span className="text-[9px] font-mono font-bold bg-[#17191D] text-white px-1.5 py-0.2 rounded shrink-0">
            {formatProjectNum(project.number)}
          </span>
        </div>

        <div className="text-[10.5px] font-black leading-tight text-slate-800 line-clamp-1 mb-1">
          {primaryMetric}
        </div>

        <div className="flex items-center gap-1 flex-wrap mb-1">
          {project.technologies.slice(0, 3).map((tech, i) => (
            <span 
              key={i} 
              className="text-[8.5px] font-mono font-bold bg-white text-slate-700 px-1.5 py-0.5 rounded border border-slate-300 shadow-2xs"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-[9px] font-bold text-[#155EEF] pt-1 border-t border-dashed border-slate-300 font-mono">
          <span>👉 Click to unfold dossier</span>
          <span className="text-[8px] text-slate-500 font-normal">DOSSIER VIEW</span>
        </div>
      </div>

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
            stroke="#155EEF"
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
            <MiniOrigamiPlane color="#155EEF" scale={0.9} />
          </motion.g>
        </svg>
      </div>
    </motion.div>
  );
};

/* ========================================================================== */
/* DOODLE 2: ONGOING FOLDER DOODLE                                            */
/* ========================================================================== */
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
      className={`absolute -top-[248px] sm:-top-[256px] ${alignClass} z-50 pointer-events-none hidden sm:flex flex-col items-center w-[268px] select-none drop-shadow-2xl`}
    >
      <div className="relative bg-[#FFFEEB] text-[#17191D] rounded-xl p-3 border-2 border-[#17191D] shadow-xl w-full">
        <div className={`absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 h-4 ${tapeColors[project.zone] || 'bg-[#155EEF]'} text-white rounded-xs rotate-[-2.5deg] shadow-xs border-t border-b border-black/20 flex items-center justify-center`}>
          <span className="text-[7.5px] font-mono font-bold tracking-widest uppercase opacity-95">ACTIVE BUILD</span>
        </div>

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

        <div className="text-[10.5px] font-black leading-tight text-slate-800 line-clamp-1 mb-1 font-sans">
          {project.stage}
        </div>

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

        <div className="flex items-center justify-between text-[9px] font-bold text-[#D92D20] pt-1 border-t border-dashed border-slate-300 font-mono">
          <span>👉 Click folder to unfold build</span>
          <span className="text-[8px] text-slate-500 font-normal">SPRINTS · LIVE</span>
        </div>
      </div>

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

/* ========================================================================== */
/* DOODLE 3: SPLIT CANVAS ACCOMPLISHED HOVER DOODLE                           */
/* ========================================================================== */
const SplitAccomplishedHoverDoodle: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.9, rotate: -2 }}
      animate={{ 
        opacity: 1, 
        y: [0, -6, 0], 
        scale: 1, 
        rotate: [-2, 1, -2] 
      }}
      exit={{ opacity: 0, y: 10, scale: 0.9, transition: { duration: 0.16 } }}
      transition={{
        opacity: { duration: 0.2 },
        scale: { type: 'spring', stiffness: 360, damping: 22 },
        y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
        rotate: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
      }}
      className="absolute -top-32 sm:-top-36 left-1/2 -translate-x-1/2 z-30 pointer-events-none hidden sm:block w-[280px] sm:w-[320px] select-none drop-shadow-2xl"
    >
      <div className="relative bg-[#FFFEEB] text-[#17191D] rounded-xl p-3 sm:p-3.5 border-2 border-[#17191D] shadow-2xl w-full text-left">
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 h-4 bg-[#155EEF] text-white rounded-xs rotate-[-2.5deg] shadow-xs border-t border-b border-black/20 flex items-center justify-center">
          <span className="text-[7.5px] font-mono font-bold tracking-widest uppercase opacity-95">✨ 11 PRODUCTION BUILDS</span>
        </div>

        <div className="flex items-center justify-between border-b border-slate-300 pb-1 mb-1 mt-0.5 font-mono">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#155EEF]">
            FULL GALLERY ARCHIVE
          </span>
          <span className="text-[9px] font-bold bg-[#D92D20] text-white px-1.5 py-0.2 rounded">
            DEPLOYED
          </span>
        </div>

        <div className="text-[10.5px] font-bold text-slate-800 line-clamp-1 mb-1 font-sans">
          CRM · Thesis Award Systems · Hotel Platforms
        </div>

        <div className="flex items-center justify-between text-[9px] font-bold text-[#155EEF] pt-1 border-t border-dashed border-slate-300 font-mono">
          <span>👉 Click to unfold full portfolio</span>
          <span>OPEN ↗</span>
        </div>
      </div>

      <div className="w-full flex items-center justify-center -mt-0.5 overflow-visible">
        <svg width="40" height="24" viewBox="0 0 40 24" fill="none" className="overflow-visible filter drop-shadow-xs">
          <motion.path
            d="M 20 0 Q 22 14, 20 22 M 14 16 L 20 22 L 26 16"
            stroke="#FFFFFF"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
    </motion.div>
  );
};

/* ========================================================================== */
/* DOODLE 4: SPLIT CANVAS ONGOING HOVER DOODLE                                */
/* ========================================================================== */
const SplitOngoingHoverDoodle: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.9, rotate: 2 }}
      animate={{ 
        opacity: 1, 
        y: [0, -6, 0], 
        scale: 1, 
        rotate: [2, -1, 2] 
      }}
      exit={{ opacity: 0, y: 10, scale: 0.9, transition: { duration: 0.16 } }}
      transition={{
        opacity: { duration: 0.2 },
        scale: { type: 'spring', stiffness: 360, damping: 22 },
        y: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
        rotate: { duration: 3.5, repeat: Infinity, ease: 'easeInOut' },
      }}
      className="absolute -top-32 sm:-top-36 left-1/2 -translate-x-1/2 z-30 pointer-events-none hidden sm:block w-[280px] sm:w-[320px] select-none drop-shadow-2xl"
    >
      <div className="relative bg-[#FFFEEB] text-[#17191D] rounded-xl p-3 sm:p-3.5 border-2 border-[#17191D] shadow-2xl w-full text-left">
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 h-4 bg-[#D92D20] text-white rounded-xs rotate-[2.5deg] shadow-xs border-t border-b border-black/20 flex items-center justify-center">
          <span className="text-[7.5px] font-mono font-bold tracking-widest uppercase opacity-95">⚡ 7 ACTIVE SPRINTS</span>
        </div>

        <div className="flex items-center justify-between border-b border-slate-300 pb-1 mb-1 mt-0.5 font-mono">
          <span className="text-[10px] font-black uppercase tracking-wider text-[#D92D20]">
            ACTIVE LABS &amp; TELEMETRY
          </span>
          <span className="text-[9px] font-bold bg-[#17191D] text-[#F5C400] px-1.5 py-0.2 rounded">
            SPRINTING
          </span>
        </div>

        <div className="text-[10.5px] font-bold text-slate-800 line-clamp-1 mb-1 font-sans">
          RFID Clinic · AI Teacher Evaluator · POS
        </div>

        <div className="flex items-center justify-between text-[9px] font-bold text-[#D92D20] pt-1 border-t border-dashed border-slate-300 font-mono">
          <span>👉 Click to inspect live dev sprints</span>
          <span>OPEN ↗</span>
        </div>
      </div>

      <div className="w-full flex items-center justify-center -mt-0.5 overflow-visible">
        <svg width="40" height="24" viewBox="0 0 40 24" fill="none" className="overflow-visible filter drop-shadow-xs">
          <motion.path
            d="M 20 0 Q 22 14, 20 22 M 14 16 L 20 22 L 26 16"
            stroke="#17191D"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
    </motion.div>
  );
};

/* ========================================================================== */
/* MAIN PROJECTS SECTION CONTAINER (FULL-BLEED IMMERSIVE SPLIT CANVAS)       */
/* ========================================================================== */
interface ProjectsSectionProps {
  selectedProjectId?: string | null;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ selectedProjectId }) => {
  // 'none' = 50/50 full-bleed split canvas. 'accomplished' or 'ongoing' = 100% full-screen immersive view.
  const [activeSide, setActiveSide] = useState<'none' | 'accomplished' | 'ongoing'>('none');
  const [slideDirection, setSlideDirection] = useState<number>(0);
  const [hoveredSplitSide, setHoveredSplitSide] = useState<'accomplished' | 'ongoing' | null>(null);

  // Accomplished state
  const [activeAccomplishedId, setActiveAccomplishedId] = useState<string | null>(selectedProjectId || null);
  const [hoveredAccomplishedId, setHoveredAccomplishedId] = useState<string | null>(null);
  const [accomplishedImageIndex, setAccomplishedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'enterprise' | 'thesis' | 'hospitality' | 'systems'>('all');

  // Ongoing state
  const [activeOngoingId, setActiveOngoingId] = useState<string | null>(null);
  const [hoveredOngoingId, setHoveredOngoingId] = useState<string | null>(null);
  const [ongoingModalProject, setOngoingModalProject] = useState<OngoingProject | null>(null);
  const [ongoingImageIndex, setOngoingImageIndex] = useState(0);

  // Synchronize hash links
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#ongoing') {
        setSlideDirection(1);
        setActiveSide('ongoing');
      } else if (hash === '#projects' && activeSide === 'none' && selectedProjectId) {
        setSlideDirection(-1);
        setActiveSide('accomplished');
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [selectedProjectId, activeSide]);

  useEffect(() => {
    if (selectedProjectId) {
      setActiveAccomplishedId(selectedProjectId);
      setActiveSide('accomplished');
    }
  }, [selectedProjectId]);

  // Click handlers
  const openAccomplished = () => {
    setSlideDirection(-1);
    setActiveSide('accomplished');
    setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const openOngoing = () => {
    setSlideDirection(1);
    setActiveSide('ongoing');
    setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const openSplitView = () => {
    setSlideDirection(activeSide === 'ongoing' ? -1 : 1);
    setActiveSide('none');
    setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  // Filtered accomplished projects
  const filteredProjects = useMemo(() => {
    if (selectedFilter === 'all') return SHOWCASE_PROJECTS;
    if (selectedFilter === 'enterprise') {
      return SHOWCASE_PROJECTS.filter((p) => ['contactpoint-crm', 'local-clinical-records'].includes(p.id));
    }
    if (selectedFilter === 'thesis') {
      return SHOWCASE_PROJECTS.filter((p) => ['rfid-student-clinic-thesis', 'ai-teacher-evaluation-thesis', 'thesis-paper-maker'].includes(p.id));
    }
    if (selectedFilter === 'hospitality') {
      return SHOWCASE_PROJECTS.filter((p) => ['hotel-website', 'sp-resort-website', 'bukidnon-camping-resort'].includes(p.id));
    }
    if (selectedFilter === 'systems') {
      return SHOWCASE_PROJECTS.filter((p) => ['trading-bot-chart-analyzer', 'point-of-sale-system', 'online-it-exam-system', 'typing-speed-test'].includes(p.id));
    }
    return SHOWCASE_PROJECTS;
  }, [selectedFilter]);

  const activeProject = activeAccomplishedId 
    ? SHOWCASE_PROJECTS.find((p) => p.id === activeAccomplishedId) || null 
    : null;

  const activeOngoingProject = activeOngoingId 
    ? ONGOING_PROJECTS.find((p) => p.id === activeOngoingId) || null 
    : null;

  const gallery = activeProject && activeProject.gallery && activeProject.gallery.length > 0
    ? activeProject.gallery
    : activeProject
    ? [{ id: 'main', title: activeProject.title, caption: activeProject.headline, image: activeProject.image, tag: 'Overview' }]
    : [];

  const currentGalleryItem = gallery[accomplishedImageIndex] || gallery[0];

  const ongoingFolderStyles = {
    blue: {
      folderBg: 'bg-[#155EEF]',
      tabBg: 'bg-[#155EEF] text-white',
      accent: '#155EEF',
      badge: 'bg-blue-50 text-[#155EEF] border-blue-200',
    },
    yellow: {
      folderBg: 'bg-[#F5C400]',
      tabBg: 'bg-[#F5C400] text-[#17191D]',
      accent: '#F5C400',
      badge: 'bg-yellow-50 text-[#855F00] border-yellow-200',
    },
    red: {
      folderBg: 'bg-[#D92D20]',
      tabBg: 'bg-[#D92D20] text-white',
      accent: '#D92D20',
      badge: 'bg-red-50 text-[#D92D20] border-red-200',
    },
    white: {
      folderBg: 'bg-white',
      tabBg: 'bg-white text-[#17191D]',
      accent: '#17191D',
      badge: 'bg-slate-100 text-slate-800 border-slate-300',
    }
  };

  const accomplishedFolderStyles = {
    blue: {
      tabBg: 'bg-[#155EEF] text-white',
      accent: '#155EEF',
      badge: 'bg-blue-50 text-[#155EEF] border-blue-200',
    },
    yellow: {
      tabBg: 'bg-[#F5C400] text-[#17191D]',
      accent: '#F5C400',
      badge: 'bg-yellow-50 text-[#855F00] border-yellow-200',
    },
    red: {
      tabBg: 'bg-[#D92D20] text-white',
      accent: '#D92D20',
      badge: 'bg-red-50 text-[#D92D20] border-red-200',
    },
    white: {
      tabBg: 'bg-white text-[#17191D]',
      accent: '#17191D',
      badge: 'bg-slate-100 text-slate-800 border-slate-300',
    }
  };

  const scrollToAccomplishedDossier = () => {
    setTimeout(() => {
      const el = document.getElementById('project-dossier-stage');
      if (el) {
        const navOffset = 90;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        window.scrollTo({
          top: Math.max(0, elementPosition - navOffset),
          behavior: 'smooth'
        });
      }
    }, 120);
  };

  const scrollToOngoingDossier = () => {
    setTimeout(() => {
      const el = document.getElementById('ongoing-dossier-stage');
      if (el) {
        const navOffset = 90;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = el.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        window.scrollTo({
          top: Math.max(0, elementPosition - navOffset),
          behavior: 'smooth'
        });
      }
    }, 120);
  };

  return (
    <section 
      id="projects" 
      className={`w-full relative overflow-hidden font-sans transition-colors duration-500 scroll-mt-16 select-none ${
        activeSide === 'ongoing' ? 'bg-[#F5C400] text-[#17191D]' : 'bg-[#D92D20] text-white'
      }`}
    >
      {/* Anchor bookmark for ongoing links */}
      <div id="ongoing" className="absolute -top-24 pointer-events-none" />

      {/* ================================================================== */}
      {/* FULL-BLEED IMMERSIVE SPLIT CANVAS & EXPANDED STAGES                */}
      {/* ================================================================== */}
      <AnimatePresence mode="wait" custom={slideDirection}>

        {/* -------------------------------------------------------------- */}
        {/* 1. INITIAL 50/50 FULL-BLEED SPLIT CANVAS: EXACT RED & YELLOW MATCH */}
        {/* -------------------------------------------------------------- */}
        {activeSide === 'none' && (
          <motion.div
            key="split-canvas"
            custom={slideDirection}
            variants={{
              enter: (dir: number) => ({
                opacity: 0,
                scale: 0.95,
                y: dir === 0 ? 0 : 25,
                transition: {
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }
              }),
              center: {
                opacity: 1,
                scale: 1,
                y: 0,
                transition: {
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }
              },
              exit: (dir: number) => ({
                opacity: 0,
                scale: 1.04,
                y: dir > 0 ? -25 : 25,
                transition: {
                  duration: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }
              })
            }}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full min-h-[92vh] flex flex-col lg:flex-row relative z-10"
          >
            
            {/* -------------------------------------------------------------- */}
            {/* LEFT HALF: ACCOMPLISHED PROJECTS (EXACT GUNDAM RED #D92D20)    */}
            {/* -------------------------------------------------------------- */}
            <div
              onClick={openAccomplished}
              onMouseEnter={() => setHoveredSplitSide('accomplished')}
              onMouseLeave={() => setHoveredSplitSide(null)}
              className="flex-1 relative p-8 sm:p-14 lg:p-20 flex flex-col justify-center items-center text-center cursor-pointer group transition-all duration-500 bg-[#D92D20] text-white overflow-hidden"
            >
              {/* Red Section Background Grid matching SkillsSection */}
              <FunSectionBackground theme="red" variant="skills" />

              {/* Subtle Hover Pulse */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-500 pointer-events-none" />

              {/* Clean Center Content */}
              <div className="relative z-10 max-w-lg space-y-4">
                {/* Whimsical Hover Doodle Info Card */}
                <AnimatePresence>
                  {hoveredSplitSide === 'accomplished' && (
                    <SplitAccomplishedHoverDoodle />
                  )}
                </AnimatePresence>

                <h2 className="text-3xl sm:text-5xl xl:text-7xl font-black tracking-tight text-white leading-none group-hover:scale-102 transition-transform duration-300">
                  Accomplished
                  <span className="block text-white/90 mt-1">
                    Projects
                  </span>
                </h2>

                <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal pt-2">
                  Production platforms, enterprise systems, and award-winning software.
                </p>

                <div className="pt-6 inline-flex items-center gap-2 font-mono text-xs font-bold text-white uppercase tracking-widest">
                  <span>Explore Accomplished ({SHOWCASE_PROJECTS.length})</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------- */}
            {/* RIGHT HALF: ON GOING PROJECTS (EXACT GUNDAM YELLOW #F5C400)    */}
            {/* -------------------------------------------------------------- */}
            <div
              onClick={openOngoing}
              onMouseEnter={() => setHoveredSplitSide('ongoing')}
              onMouseLeave={() => setHoveredSplitSide(null)}
              className="flex-1 relative p-8 sm:p-14 lg:p-20 flex flex-col justify-center items-center text-center cursor-pointer group transition-all duration-500 bg-[#F5C400] text-[#17191D] overflow-hidden"
            >
              {/* Yellow Section Background Grid matching ExperienceSection */}
              <FunSectionBackground theme="yellow" variant="experience" />

              {/* Subtle Hover Pulse */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none" />

              {/* Clean Center Content */}
              <div className="relative z-10 max-w-lg space-y-4">
                {/* Whimsical Hover Doodle Info Card */}
                <AnimatePresence>
                  {hoveredSplitSide === 'ongoing' && (
                    <SplitOngoingHoverDoodle />
                  )}
                </AnimatePresence>

                <h2 className="text-3xl sm:text-5xl xl:text-7xl font-black tracking-tight text-[#17191D] leading-none group-hover:scale-102 transition-transform duration-300">
                  On Going
                  <span className="block text-[#17191D]/80 mt-1">
                    Projects
                  </span>
                </h2>

                <p className="text-sm sm:text-base text-[#17191D]/85 leading-relaxed font-normal pt-2">
                  Active sprint builds, architecture dossiers, and systems in progress.
                </p>

                <div className="pt-6 inline-flex items-center gap-2 font-mono text-xs font-bold text-[#17191D] uppercase tracking-widest">
                  <span>Explore On Going ({ONGOING_PROJECTS.length})</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>

          </motion.div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* ACCOMPLISHED PROJECTS OCCUPIES ENTIRE SECTION                   */}
        {/* ---------------------------------------------------------------- */}
        {activeSide === 'accomplished' && (
          <motion.div
            key="full-accomplished"
            custom={slideDirection}
            variants={{
              enter: (dir: number) => ({
                x: dir > 0 ? 80 : -80,
                opacity: 0,
                scale: 0.97,
              }),
              center: {
                x: 0,
                opacity: 1,
                scale: 1,
                transition: {
                  x: { type: 'spring', stiffness: 260, damping: 26 },
                  opacity: { duration: 0.35 },
                  scale: { duration: 0.35 }
                }
              },
              exit: (dir: number) => ({
                x: dir > 0 ? -80 : 80,
                opacity: 0,
                scale: 0.96,
                transition: {
                  x: { type: 'spring', stiffness: 260, damping: 26 },
                  opacity: { duration: 0.28 },
                  scale: { duration: 0.28 }
                }
              })
            }}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full min-h-screen py-10 sm:py-14 px-4 sm:px-6 lg:px-12 relative z-10 space-y-10"
          >
            {/* Red Section Background Grid matching SkillsSection */}
            <FunSectionBackground theme="red" variant="skills" />

            {/* Top Seamless 2-Clickable Switcher Bar */}
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 border-b border-white/15 pb-6">
              {/* Left active title */}
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#D92D20] shadow-lg shadow-red-500/50" />
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Accomplished Projects
                  </h3>
                  <p className="text-xs text-red-200 font-mono">
                    {SHOWCASE_PROJECTS.length} PRODUCTION DEPLOYMENTS
                  </p>
                </div>
              </div>

              {/* The 2 Clickables + Split Reset */}
              <div className="flex items-center gap-3">
                {/* Clickable 2: Switch to On Going Projects (Yellow Transition) */}
                <button
                  onClick={openOngoing}
                  className="px-4 sm:px-5 py-2.5 rounded-xl bg-[#F5C400] hover:bg-yellow-400 text-[#17191D] font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-xl active:scale-95 cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-[#17191D] animate-pulse" />
                  <span>On Going Projects ({ONGOING_PROJECTS.length}) →</span>
                </button>

                {/* Back to Split Stage with Doodle Hover Effect */}
                <DoodleInteractable variant="button" accentColor="#F5C400" doodleText="SPLIT ◫">
                  <button
                    onClick={openSplitView}
                    className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-white/20"
                    title="Return to 50/50 split canvas"
                  >
                    <Columns className="w-4 h-4 text-[#F5C400]" />
                    <span className="hidden sm:inline">Split Canvas</span>
                  </button>
                </DoodleInteractable>
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar sm:flex-wrap gap-2 px-1 py-1 w-full">
              {[
                { id: 'all' as const, label: `All Projects (${SHOWCASE_PROJECTS.length})` },
                { id: 'enterprise' as const, label: 'Enterprise & Client' },
                { id: 'thesis' as const, label: 'Award Thesis & AI' },
                { id: 'hospitality' as const, label: 'Hotels & Resorts' },
                { id: 'systems' as const, label: 'Systems & Utilities' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedFilter(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedFilter === tab.id
                      ? 'bg-white text-[#155EEF] shadow-lg scale-105'
                      : 'bg-white/10 text-white/80 hover:bg-white/20 border border-white/20'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Accomplished Dossier Stage (Opened above on click) */}
            <AnimatePresence mode="wait">
              {activeProject && (
                <motion.div
                  id="project-dossier-stage"
                  key={activeProject.id}
                  initial={{ opacity: 0, y: 35, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -25, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-7xl mx-auto relative z-20 scroll-mt-24 text-[#17191D]"
                >
                  <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#17191D] overflow-hidden">
                    {/* Top Bar */}
                    <div className="px-5 sm:px-6 py-3.5 bg-[#17191D] text-white flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#17191D]">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-[#155EEF] text-white">
                          PROJECT 0{activeProject.number}
                        </span>
                        <span className="font-mono font-bold text-base text-white">
                          {activeProject.title}
                        </span>
                        <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[11px] font-mono bg-white/10 text-slate-300">
                          {activeProject.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {activeProject.liveUrl && (
                          <a
                            href={activeProject.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 rounded-md bg-[#155EEF] hover:bg-blue-600 text-white text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm transition-all"
                          >
                            <span>Live Demo</span>
                            <ExternalLink className="w-3.5 h-3.5 text-[#F5C400]" />
                          </a>
                        )}
                        <button
                          onClick={() => setIsLightboxOpen(true)}
                          className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/20"
                          title="Fullscreen preview"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setActiveAccomplishedId(null)}
                          className="p-1.5 rounded-md bg-white/10 hover:bg-[#D92D20] text-white transition-colors cursor-pointer border border-white/20"
                          title="Close dossier"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Gundam Tricolor Trim */}
                    <div className="h-1 w-full flex select-none pointer-events-none">
                      <div className="flex-1 bg-[#155EEF]" />
                      <div className="flex-1 bg-[#F5C400]" />
                      <div className="flex-1 bg-[#D92D20]" />
                      <div className="w-16 bg-slate-300" />
                    </div>

                    {/* Dossier Body */}
                    <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                      {/* Gallery Viewport */}
                      <div className="lg:col-span-7 space-y-3">
                        <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 shadow-lg border-2 border-[#17191D]">
                          <img
                            src={currentGalleryItem.image}
                            alt={currentGalleryItem.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 text-xs font-mono font-bold text-white rounded-md border border-white/20">
                            <span>{currentGalleryItem.tag || 'Screenshot'}</span>
                          </div>
                          {gallery.length > 1 && (
                            <>
                              <button
                                onClick={() => setAccomplishedImageIndex((prev) => (prev - 1 + gallery.length) % gallery.length)}
                                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer"
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setAccomplishedImageIndex((prev) => (prev + 1) % gallery.length)}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>

                        {gallery.length > 1 && (
                          <div className="flex items-center gap-2">
                            {gallery.map((item, idx) => (
                              <button
                                key={item.id}
                                onClick={() => setAccomplishedImageIndex(idx)}
                                className={`flex-1 p-2 rounded-lg border-2 text-left text-xs transition-all cursor-pointer font-mono ${
                                  accomplishedImageIndex === idx
                                    ? 'border-[#155EEF] bg-blue-50 font-bold text-[#155EEF]'
                                    : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                                }`}
                              >
                                <div className="truncate font-bold">{item.title}</div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Specs & Description */}
                      <div className="lg:col-span-5 space-y-4">
                        <div>
                          <span className="text-xs font-mono font-bold text-[#155EEF] uppercase tracking-wider">
                            {activeProject.headline}
                          </span>
                          <h3 className="text-2xl font-black text-[#17191D] mt-0.5 tracking-tight">
                            {activeProject.title}
                          </h3>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                          {activeProject.description}
                        </p>

                        {/* Key Highlights */}
                        {activeProject.highlights && activeProject.highlights.length > 0 && (
                          <div className="p-3 rounded-lg bg-blue-50/70 border-2 border-blue-200 text-xs text-blue-950">
                            <span className="font-mono font-bold block mb-1 uppercase tracking-wide text-[#155EEF]">Key Highlights:</span>
                            <ul className="space-y-1 list-disc list-inside text-blue-900">
                              {activeProject.highlights.slice(0, 2).map((h, i) => (
                                <li key={i} className="leading-snug">{h}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Tech stack */}
                        <div>
                          <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                            Technology Stack
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {activeProject.technologies.map((t) => (
                              <span key={t} className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-slate-100 text-slate-800 border border-slate-300">
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Accomplished 12-Folder Rack Dock */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 gap-y-12 sm:gap-y-36 lg:gap-y-40 relative z-10 pt-10 sm:pt-36 lg:pt-40 pb-12 overflow-visible">
              {filteredProjects.map((proj, idx) => {
                const isSelected = activeAccomplishedId === proj.id;
                const isHovered = hoveredAccomplishedId === proj.id;
                const style = accomplishedFolderStyles[proj.zone];

                const colIndex = idx % 4;
                const tabPositionClass = 
                  colIndex === 0 ? 'left-3 sm:left-4' :
                  colIndex === 1 ? 'left-[22%] sm:left-[24%]' :
                  colIndex === 2 ? 'left-[46%] sm:left-[48%]' :
                  'right-3 sm:right-4 left-auto';

                return (
                  <motion.div
                    key={proj.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.55, delay: idx * 0.06 }}
                    whileHover={{ y: -6 }}
                    className={`relative select-none cursor-pointer group transition-all duration-300 ${
                      isHovered ? 'z-40' : isSelected ? 'z-30' : 'z-10'
                    }`}
                    onMouseEnter={() => setHoveredAccomplishedId(proj.id)}
                    onMouseLeave={() => setHoveredAccomplishedId(null)}
                    onClick={() => {
                      setActiveAccomplishedId(proj.id);
                      scrollToAccomplishedDossier();
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <div className={`relative rounded-xl transition-all duration-300 ${isSelected ? 'scale-[1.02] -translate-y-2' : ''}`}>
                      {/* Whimsical Doodle Note on Hover */}
                      <AnimatePresence>
                        {isHovered && !isSelected && (
                          <FolderHoverDoodle project={proj} colIndex={colIndex} />
                        )}
                      </AnimatePresence>

                      {/* Folder Tab */}
                      <div className={`absolute -top-5.5 ${tabPositionClass} px-4 py-1.5 rounded-t-md text-xs font-mono font-bold flex items-center gap-2 shadow-md z-0 border-t-2 border-x-2 border-[#17191D] ${style.tabBg}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-black/25 ring-1 ring-white/50" />
                        <Folder className="w-3.5 h-3.5" />
                        <span className="tracking-wide">FOLDER {formatProjectNum(proj.number)}</span>
                      </div>

                      {/* Back Folder Sleeve Container */}
                      <div className={`h-[200px] w-full rounded-xl border-2 relative overflow-visible flex flex-col justify-end bg-white border-[#17191D] ${
                        isSelected ? 'ring-4 ring-white shadow-2xl' : 'shadow-lg hover:shadow-2xl'
                      }`}>
                        {/* Sneak Peek Document (Slides upward on hover) */}
                        <motion.div
                          animate={{
                            y: isHovered ? -135 : isSelected ? -42 : 0,
                            rotate: isHovered ? (colIndex === 0 ? -2 : colIndex === 1 ? 0 : 2) : 0,
                            scale: isHovered ? 1.02 : 1,
                          }}
                          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                          className="absolute inset-x-3 top-2.5 bg-[#FCFDFF] rounded-lg shadow-2xl border-2 border-slate-300 p-2.5 sm:p-3 z-10 pointer-events-none flex flex-col justify-between overflow-hidden"
                          style={{ height: '225px' }}
                        >
                          <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 font-mono">
                            <span className="text-[9px] font-bold text-slate-700 uppercase">
                              DELIVERED · {formatProjectNum(proj.number)}
                            </span>
                            <span className="text-[8.5px] font-bold text-[#155EEF]">
                              100% SHIPPED
                            </span>
                          </div>

                          <div className="relative w-full h-24 sm:h-28 rounded-md overflow-hidden border border-slate-200 bg-slate-900">
                            <img src={proj.image} alt={proj.title} className="w-full h-full object-cover object-top" />
                            <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded bg-black/80 text-[8.5px] font-mono font-bold text-white flex items-center gap-1">
                              <Sparkles className="w-2.5 h-2.5 text-[#F5C400]" />
                              <span>CASE STUDY</span>
                            </div>
                          </div>

                          <div className="pt-1.5 flex items-center justify-between border-t border-slate-100 font-mono">
                            <span className="text-[9.5px] font-bold text-[#155EEF] truncate max-w-[160px]">
                              {proj.title}
                            </span>
                            <span className="text-[8.5px] font-bold text-emerald-600 flex items-center gap-0.5">
                              <span>EXPAND</span>
                              <ArrowUp className="w-2.5 h-2.5" />
                            </span>
                          </div>
                        </motion.div>

                        {/* Front Folder Flap */}
                        <motion.div
                          animate={{
                            rotateX: isSelected ? -24 : isHovered ? -16 : 0,
                            y: isSelected ? 8 : isHovered ? 4 : 0,
                          }}
                          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                          style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d' }}
                          className="relative z-20 bg-white rounded-lg p-4 border-2 border-[#17191D] shadow-md flex flex-col justify-between space-y-3 min-h-[145px] text-[#17191D]"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border bg-blue-50 text-[#155EEF] border-blue-200">
                              Shipped & Deployed
                            </span>
                            <span className="text-[11px] font-mono font-bold text-slate-500">
                              #{formatProjectNum(proj.number)}
                            </span>
                          </div>

                          <div>
                            <h4 className="font-black text-base text-[#17191D] group-hover:text-[#155EEF] transition-colors line-clamp-1">
                              {proj.title}
                            </h4>
                            <span className="text-xs text-slate-500 font-medium line-clamp-1">
                              {proj.category}
                            </span>
                          </div>

                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-[11px] text-slate-500 font-medium font-mono">
                              {proj.gallery?.length || 1} screens
                            </span>
                            <span className="font-bold flex items-center gap-1 text-[11px] text-[#155EEF]">
                              <span>{isSelected ? 'Folder Open' : 'Open Folder ↑'}</span>
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
          </motion.div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* ON GOING PROJECTS OCCUPIES ENTIRE SECTION                       */}
        {/* ---------------------------------------------------------------- */}
        {activeSide === 'ongoing' && (
          <motion.div
            key="full-ongoing"
            custom={slideDirection}
            variants={{
              enter: (dir: number) => ({
                x: dir > 0 ? 80 : -80,
                opacity: 0,
                scale: 0.97,
              }),
              center: {
                x: 0,
                opacity: 1,
                scale: 1,
                transition: {
                  x: { type: 'spring', stiffness: 260, damping: 26 },
                  opacity: { duration: 0.35 },
                  scale: { duration: 0.35 }
                }
              },
              exit: (dir: number) => ({
                x: dir > 0 ? -80 : 80,
                opacity: 0,
                scale: 0.96,
                transition: {
                  x: { type: 'spring', stiffness: 260, damping: 26 },
                  opacity: { duration: 0.28 },
                  scale: { duration: 0.28 }
                }
              })
            }}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full min-h-screen py-10 sm:py-14 px-4 sm:px-6 lg:px-12 relative z-10 space-y-10 text-[#17191D]"
          >
            {/* Yellow Section Background Grid matching ExperienceSection */}
            <FunSectionBackground theme="yellow" variant="experience" />

            {/* Top Seamless 2-Clickable Switcher Bar */}
            <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 border-b border-black/15 pb-6">
              {/* Right active title */}
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-[#17191D] shadow-md" />
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#17191D] tracking-tight">
                    On Going Projects
                  </h3>
                  <p className="text-xs text-[#17191D]/75 font-mono font-bold tracking-wider">
                    {ONGOING_PROJECTS.length} ACTIVE SPRINTS & LABS
                  </p>
                </div>
              </div>

              {/* The 2 Clickables + Split Reset */}
              <div className="flex items-center gap-3">
                {/* Clickable 1: Switch to Accomplished Projects (Red Transition) */}
                <button
                  onClick={openAccomplished}
                  className="px-4 sm:px-5 py-2.5 rounded-xl bg-[#D92D20] hover:bg-red-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-xl active:scale-95 cursor-pointer"
                >
                  <Folder className="w-4 h-4 text-white" />
                  <span>← Accomplished Projects ({SHOWCASE_PROJECTS.length})</span>
                </button>

                {/* Back to Split Stage with Doodle Hover Effect */}
                <DoodleInteractable variant="button" accentColor="#D92D20" doodleText="SPLIT ◫">
                  <button
                    onClick={openSplitView}
                    className="p-2.5 rounded-xl bg-black/10 hover:bg-black/20 text-[#17191D] font-mono text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-black/20"
                    title="Return to 50/50 split canvas"
                  >
                    <Columns className="w-4 h-4 text-[#D92D20]" />
                    <span className="hidden sm:inline">Split Canvas</span>
                  </button>
                </DoodleInteractable>
              </div>
            </div>

            {/* Ongoing Dossier Viewer Stage (Opens above on click) */}
            <AnimatePresence mode="wait">
              {activeOngoingProject && (
                <motion.div
                  id="ongoing-dossier-stage"
                  key={activeOngoingProject.id}
                  initial={{ opacity: 0, y: 35, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -25, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="max-w-7xl mx-auto relative z-20 scroll-mt-24 text-[#17191D]"
                >
                  <div className="bg-white rounded-2xl shadow-2xl border-2 border-[#17191D] overflow-hidden">
                    {/* Top File Tab Bar */}
                    <div className="px-5 sm:px-6 py-3.5 bg-[#17191D] text-white flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#17191D]">
                      <div className="flex items-center gap-3">
                        <span 
                          className="px-2.5 py-1 rounded text-xs font-mono font-bold uppercase tracking-wider text-white shadow-xs"
                          style={{ backgroundColor: ongoingFolderStyles[activeOngoingProject.zone].accent }}
                        >
                          FOLDER 0{ONGOING_PROJECTS.findIndex((p) => p.id === activeOngoingProject.id) + 1}
                        </span>
                        <span className="font-mono font-bold text-base text-white">
                          {activeOngoingProject.name}
                        </span>
                        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-white/10 text-emerald-400 border border-white/20">
                          {activeOngoingProject.stage}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setOngoingModalProject(activeOngoingProject)}
                          className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-white/20"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#F5C400]" />
                          <span>View All Screens</span>
                        </button>
                        <button
                          onClick={() => setActiveOngoingId(null)}
                          className="p-1.5 rounded-md bg-white/10 hover:bg-[#D92D20] text-white transition-colors cursor-pointer border border-white/20"
                          title="Close folder"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Gundam Tricolor Trim */}
                    <div className="h-1 w-full flex select-none pointer-events-none">
                      <div className="flex-1 bg-[#155EEF]" />
                      <div className="flex-1 bg-[#F5C400]" />
                      <div className="flex-1 bg-[#D92D20]" />
                      <div className="w-16 bg-slate-300" />
                    </div>

                    {/* Interior Body */}
                    <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                      {/* Left: Gallery Viewport */}
                      <div className="lg:col-span-7 space-y-3">
                        <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-slate-950 shadow-lg border-2 border-[#17191D]">
                          <img
                            src={activeOngoingProject.demoImages[ongoingImageIndex]?.image || activeOngoingProject.heroImage}
                            alt={activeOngoingProject.name}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 text-xs font-mono font-bold text-white rounded-md border border-white/20">
                            <span>{activeOngoingProject.demoImages[ongoingImageIndex]?.tag || 'Active Demo'}</span>
                          </div>
                          {activeOngoingProject.demoImages.length > 1 && (
                            <>
                              <button
                                onClick={() => setOngoingImageIndex((prev) => (prev - 1 + activeOngoingProject.demoImages.length) % activeOngoingProject.demoImages.length)}
                                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer"
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setOngoingImageIndex((prev) => (prev + 1) % activeOngoingProject.demoImages.length)}
                                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md bg-black/70 hover:bg-black/90 text-white flex items-center justify-center transition-all cursor-pointer"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>

                        {activeOngoingProject.demoImages.length > 1 && (
                          <div className="flex items-center gap-2">
                            {activeOngoingProject.demoImages.map((demo, idx) => (
                              <button
                                key={demo.id}
                                onClick={() => setOngoingImageIndex(idx)}
                                className={`flex-1 p-2 rounded-lg border-2 text-left text-xs transition-all cursor-pointer font-mono ${
                                  ongoingImageIndex === idx 
                                    ? 'border-[#10B981] bg-emerald-50 font-bold text-emerald-800' 
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
                            {activeOngoingProject.category}
                          </span>
                          <h3 className="text-2xl font-black text-[#17191D] mt-0.5 tracking-tight">
                            {activeOngoingProject.name}
                          </h3>
                        </div>

                        {/* Progress bar */}
                        <div className="p-3.5 rounded-lg bg-slate-50 border-2 border-slate-200">
                          <div className="flex items-center justify-between text-xs font-mono font-bold mb-1.5">
                            <span className="text-slate-700">{activeOngoingProject.stage}</span>
                            <span className="text-[#10B981]">{activeOngoingProject.progressPercentage}%</span>
                          </div>
                          <div className="w-full h-2 rounded bg-slate-200 overflow-hidden">
                            <div 
                              className="h-full bg-[#10B981] transition-all duration-500"
                              style={{ width: `${activeOngoingProject.progressPercentage}%` }}
                            />
                          </div>
                          <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1.5 font-mono">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>Target Launch: <strong>{activeOngoingProject.targetLaunch}</strong></span>
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                          {activeOngoingProject.summary}
                        </p>

                        {/* Problem solved */}
                        <div className="p-3 rounded-lg bg-emerald-50/70 border-2 border-emerald-200 text-xs text-emerald-950">
                          <span className="font-mono font-bold block mb-0.5 uppercase tracking-wide text-emerald-700">Problem Solved:</span>
                          <p className="leading-snug">{activeOngoingProject.keyProblemSolved}</p>
                        </div>

                        {/* Tech stack */}
                        <div>
                          <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                            Core Technology Stack
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {activeOngoingProject.techStack.map((tech) => (
                              <span key={tech} className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-slate-100 text-slate-800 border border-slate-300">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Ongoing 4-Folder Rack Dock */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 gap-y-12 sm:gap-y-36 lg:gap-y-40 relative z-10 pt-10 sm:pt-36 lg:pt-40 pb-12 overflow-visible">
              {ONGOING_PROJECTS.map((proj, idx) => {
                const isSelected = activeOngoingId === proj.id;
                const isHovered = hoveredOngoingId === proj.id;
                const style = ongoingFolderStyles[proj.zone];

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
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    whileHover={{ y: -6 }}
                    className={`relative select-none cursor-pointer group transition-all duration-300 ${
                      isHovered ? 'z-40' : isSelected ? 'z-30' : 'z-10'
                    }`}
                    onMouseEnter={() => setHoveredOngoingId(proj.id)}
                    onMouseLeave={() => setHoveredOngoingId(null)}
                    onClick={() => {
                      setActiveOngoingId(proj.id);
                      scrollToOngoingDossier();
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <div className={`relative rounded-xl transition-all duration-300 ${isSelected ? 'scale-[1.02] -translate-y-2' : ''}`}>
                      {/* Whimsical Doodle Note on Hover */}
                      <AnimatePresence>
                        {isHovered && !isSelected && (
                          <OngoingFolderDoodle project={proj} colIndex={idx} />
                        )}
                      </AnimatePresence>

                      {/* Top Folder Tab */}
                      <div className={`absolute -top-5.5 ${tabPositionClass} px-4 py-1.5 rounded-t-md text-xs font-mono font-bold flex items-center gap-2 shadow-md z-0 border-t-2 border-x-2 border-[#17191D] ${style.tabBg}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-black/25 ring-1 ring-white/50" />
                        <Folder className="w-3.5 h-3.5" />
                        <span className="tracking-wide">BUILD 0{idx + 1}</span>
                      </div>

                      {/* Back Folder Sleeve Container */}
                      <div className={`h-[200px] w-full rounded-xl border-2 relative overflow-visible flex flex-col justify-end bg-white border-[#17191D] ${
                        isSelected ? 'ring-4 ring-white shadow-2xl' : 'shadow-lg hover:shadow-2xl'
                      }`}>
                        {/* Sneak Peek Document (Slides upward on hover) */}
                        <motion.div
                          animate={{
                            y: isHovered ? -135 : isSelected ? -42 : 0,
                            rotate: isHovered ? (idx === 0 ? -2 : idx === 1 ? 0 : 2) : 0,
                            scale: isHovered ? 1.02 : 1,
                          }}
                          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                          className="absolute inset-x-3 top-2.5 bg-[#FCFDFF] rounded-lg shadow-2xl border-2 border-slate-300 p-2.5 sm:p-3 z-10 pointer-events-none flex flex-col justify-between overflow-hidden"
                          style={{ height: '225px' }}
                        >
                          <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 font-mono">
                            <div className="flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                              <span className="text-[9px] font-bold tracking-wider uppercase text-slate-700">
                                BUILD · 0{idx + 1}
                              </span>
                            </div>
                            <span className="px-2 py-0.5 rounded text-[8.5px] font-mono font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {proj.progressPercentage}% COMPLETE
                            </span>
                          </div>

                          <div className="relative w-full h-24 sm:h-28 rounded-md overflow-hidden border border-slate-200 bg-slate-900 shadow-inner">
                            <img src={proj.heroImage} alt={proj.name} className="w-full h-full object-cover object-top" />
                            <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded bg-black/80 text-[8.5px] font-mono font-bold text-white flex items-center gap-1 shadow-sm">
                              <Sparkles className="w-2.5 h-2.5 text-[#F5C400]" />
                              <span>SNEAK PEEK</span>
                            </div>
                          </div>

                          <div className="pt-1.5 flex items-center justify-between border-t border-slate-100 font-mono">
                            <span className="text-[9.5px] font-bold text-[#155EEF] truncate max-w-[160px]">
                              {proj.name}
                            </span>
                            <span className="text-[8.5px] font-bold uppercase tracking-wider text-emerald-600 flex items-center gap-0.5">
                              <span>DETAILS</span>
                              <ArrowUp className="w-2.5 h-2.5" />
                            </span>
                          </div>
                        </motion.div>

                        {/* Front Folder Flap */}
                        <motion.div
                          animate={{
                            rotateX: isSelected ? -24 : isHovered ? -16 : 0,
                            y: isSelected ? 8 : isHovered ? 4 : 0,
                          }}
                          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
                          style={{ transformOrigin: 'bottom center', transformStyle: 'preserve-3d' }}
                          className="relative z-20 bg-white rounded-lg p-4 border-2 border-[#17191D] shadow-md flex flex-col justify-between space-y-3 min-h-[145px] text-[#17191D]"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${style.badge} flex items-center gap-1.5`}>
                              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                              <span>{proj.statusBadge}</span>
                            </span>
                            <span className="text-[11px] font-mono font-bold text-[#10B981]">
                              {proj.progressPercentage}%
                            </span>
                          </div>

                          <div>
                            <h4 className="font-black text-base text-[#17191D] group-hover:text-[#10B981] transition-colors line-clamp-1">
                              {proj.name}
                            </h4>
                            <span className="text-xs text-slate-500 font-medium line-clamp-1">
                              {proj.category}
                            </span>
                          </div>

                          {/* Progress line */}
                          <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all duration-500"
                              style={{ 
                                width: `${proj.progressPercentage}%`,
                                backgroundColor: style.accent
                              }}
                            />
                          </div>

                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                            <span className="text-[11px] text-slate-500 font-medium">
                              {proj.demoImages.length} screens
                            </span>
                            <span className="font-bold flex items-center gap-1 text-[11px] text-[#10B981]">
                              <span>{isSelected ? 'Folder Open' : 'Open Folder ↑'}</span>
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
          </motion.div>
        )}

      </AnimatePresence>

      {/* Accomplished Fullscreen Lightbox Modal */}
      {isLightboxOpen && activeProject && (
        <div 
          className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="flex items-center justify-between text-white border-b border-white/20 pb-3">
            <div>
              <h3 className="font-bold text-base sm:text-lg">{activeProject.title}</h3>
              <p className="text-xs text-slate-400">{currentGalleryItem.title}</p>
            </div>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 rounded-lg bg-white/10 hover:bg-[#D92D20] text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center py-4">
            <img 
              src={currentGalleryItem.image} 
              alt={currentGalleryItem.title} 
              className="max-h-[80vh] max-w-full object-contain rounded-xl shadow-2xl border border-white/20"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-white/80 border-t border-white/20 pt-3">
            <span>{currentGalleryItem.caption}</span>
            <span>{accomplishedImageIndex + 1} / {gallery.length}</span>
          </div>
        </div>
      )}

      {/* Ongoing Deep-Dive Modal */}
      <OngoingBuildModal
        project={ongoingModalProject}
        onClose={() => setOngoingModalProject(null)}
      />
    </section>
  );
};
