import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { JOB_EXPERIENCES, JobExperience, PROFILE_INFO } from '../../data/portfolio';
import { CockpitDashboardModal } from '../ui/CockpitDashboardModal';
import { 
  Folder,
  FolderOpen,
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  ArrowUpRight, 
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ExternalLink,
  Eye,
  Lock,
  CornerDownRight,
  Flag,
  Clock,
  FileText,
  BookOpen,
  Layers,
  ArrowRight,
  Check
} from 'lucide-react';
import { FunSectionBackground } from '../ui/FunSectionBackground';

/**
 * Playful hand-drawn doodle arrow & annotation pointing to the folder trigger
 */
const DoodleFolderIndicator: React.FC<{ isOpen: boolean; onClick: () => void }> = ({ isOpen, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="cursor-pointer select-none relative inline-block group"
      title={isOpen ? "Click to close work history folder" : "Click to open work history folder"}
    >
      <div className="flex items-center gap-2">
        {/* Animated Hand-Drawn Doodle SVG Arrow */}
        <motion.div
          animate={isOpen ? { rotate: [0, -8, 0], y: [0, 2, 0] } : { y: [0, -5, 0], x: [0, 2, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="shrink-0"
        >
          <svg 
            width="54" 
            height="38" 
            viewBox="0 0 54 38" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#17191D] filter drop-shadow-xs"
          >
            {/* Hand-drawn squiggly arrow curve */}
            <motion.path 
              d="M 6 12 C 18 4, 32 6, 42 22" 
              stroke="#17191D" 
              strokeWidth="2.8" 
              strokeLinecap="round" 
              strokeDasharray={isOpen ? "none" : "5 2"}
              fill="none"
            />
            {/* Arrowhead */}
            <path 
              d="M 32 23 L 43 23 L 42 12" 
              stroke="#17191D" 
              strokeWidth="2.8" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              fill="none"
            />
            {/* Sparkle doodle near arrow */}
            <motion.path
              animate={{ scale: [1, 1.3, 1], rotate: [0, 45, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              d="M 12 28 Q 14 32 18 33 Q 14 34 12 38 Q 10 34 6 33 Q 10 32 12 28 Z"
              fill="#D92D20"
            />
          </svg>
        </motion.div>

        {/* Doodle Hand-Lettered Badge */}
        <motion.div
          animate={{ rotate: [-1.5, 1.5, -1.5] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="bg-[#17191D] text-white px-3 py-1.5 rounded-xl border border-white/20 shadow-md flex items-center gap-1.5"
        >
          <span className="text-amber-400 font-bold text-xs">✨</span>
          <span className="text-[11px] sm:text-xs font-bold tracking-tight">
            {isOpen ? "Folder open! Click to close" : "psst... click to see my work history!"}
          </span>
          <span className="text-xs">{isOpen ? "📂" : "👉"}</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

const CHECKPOINT_ZONE_STYLES: Record<string, {
  flagBg: string;
  flagBorder: string;
  flagText: string;
  nodeBg: string;
  nodeRing: string;
  accentBorder: string;
  badgeBg: string;
  badgeText: string;
}> = {
  blue: {
    flagBg: 'bg-[#155EEF] text-white',
    flagBorder: 'border-blue-600',
    flagText: 'text-[#155EEF]',
    nodeBg: 'bg-[#155EEF] text-white',
    nodeRing: 'ring-blue-100',
    accentBorder: 'border-blue-200 hover:border-blue-400',
    badgeBg: 'bg-blue-50 text-[#155EEF] border-blue-200',
    badgeText: 'text-[#155EEF]',
  },
  yellow: {
    flagBg: 'bg-[#F5C400] text-[#17191D]',
    flagBorder: 'border-amber-400',
    flagText: 'text-[#946C00]',
    nodeBg: 'bg-[#F5C400] text-[#17191D]',
    nodeRing: 'ring-amber-100',
    accentBorder: 'border-amber-200 hover:border-amber-400',
    badgeBg: 'bg-amber-50 text-[#946C00] border-amber-200',
    badgeText: 'text-[#946C00]',
  },
  red: {
    flagBg: 'bg-[#D92D20] text-white',
    flagBorder: 'border-red-600',
    flagText: 'text-[#D92D20]',
    nodeBg: 'bg-[#D92D20] text-white',
    nodeRing: 'ring-red-100',
    accentBorder: 'border-red-200 hover:border-red-400',
    badgeBg: 'bg-red-50 text-[#D92D20] border-red-200',
    badgeText: 'text-[#D92D20]',
  },
  white: {
    flagBg: 'bg-[#17191D] text-white',
    flagBorder: 'border-slate-800',
    flagText: 'text-[#17191D]',
    nodeBg: 'bg-[#17191D] text-white',
    nodeRing: 'ring-slate-100',
    accentBorder: 'border-slate-200 hover:border-slate-400',
    badgeBg: 'bg-slate-100 text-slate-800 border-slate-200',
    badgeText: 'text-slate-800',
  },
};

interface MilestoneItemProps {
  exp: JobExperience;
  index: number;
  totalCount: number;
  isExpanded: boolean;
  onToggleExpand: (id: string) => void;
  onSelectExperience: (exp: JobExperience) => void;
  zoneStyle?: typeof CHECKPOINT_ZONE_STYLES[string];
  showTimelineSpine?: boolean;
}

const MilestoneItem: React.FC<MilestoneItemProps> = ({
  exp,
  index,
  isExpanded,
  onToggleExpand,
  onSelectExperience,
}) => {
  const isOngoing = exp.status === 'ongoing';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.25, delay: index * 0.03 }}
      className="relative group/milestone w-full"
    >
      {/* Clean Experience Card */}
      <div 
        className={`rounded-xl border transition-all duration-200 overflow-hidden ${
          isExpanded 
            ? 'border-blue-500/80 ring-2 ring-blue-500/10 shadow-md bg-white' 
            : 'border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-xs bg-white'
        }`}
      >
        {/* Card Header & Summary (Clickable to Expand) */}
        <div 
          onClick={() => onToggleExpand(exp.id)}
          className="p-4 sm:p-5 cursor-pointer select-none"
        >
          <div className="flex items-start justify-between gap-3">
            {/* Left: Monogram Logo & Primary Details */}
            <div className="flex items-start gap-3 sm:gap-3.5 min-w-0">
              <div 
                className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-sm shrink-0 shadow-2xs border border-slate-200/80 ${exp.companyLogoBg}`}
                title={exp.company}
              >
                {exp.companyLogoText}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-base font-bold text-slate-900 group-hover/milestone:text-blue-600 transition-colors leading-snug">
                    {exp.role}
                  </h4>
                </div>

                <div className="text-xs sm:text-sm font-semibold text-slate-700 mt-0.5">
                  <span>{exp.company}</span>
                  <span className="text-slate-300 mx-1.5">·</span>
                  <span className="text-slate-500 font-normal">{exp.employmentType}</span>
                </div>

                {/* Metadata Row: Date & Location */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-1.5 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{exp.linkedinDate}</span>
                    <span className="text-slate-400">({exp.duration})</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{exp.location}</span>
                    <span className="text-slate-400">· {exp.locationType}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Status Pill & Toggle Chevron */}
            <div className="shrink-0 flex items-center gap-2">
              {isOngoing ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200 shadow-2xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Active</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold border border-slate-200">
                  <CheckCircle2 className="w-3 h-3 text-slate-400" />
                  <span>Completed</span>
                </span>
              )}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleExpand(exp.id);
                }}
                className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all cursor-pointer ${
                  isExpanded 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-xs' 
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
                aria-label={isExpanded ? 'Collapse role' : 'Expand role'}
              >
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Role Summary */}
          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {exp.summary}
          </p>

          {/* Quick Skills Pill Badges */}
          <div className="mt-3 flex flex-wrap gap-1.5 items-center">
            {exp.skills.map((skill, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200/80"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Expandable Drawer */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden border-t border-slate-100 bg-slate-50/50"
            >
              <div className="p-4 sm:p-5 space-y-4">
                {/* Visual Preview Screenshot / Evidence */}
                {exp.previewImage && (
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-slate-900 border border-slate-200 shadow-inner group/thumb">
                    <img 
                      src={exp.previewImage} 
                      alt={exp.previewImageAlt} 
                      className="w-full h-full object-cover object-top group-hover/thumb:scale-102 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-3">
                      <div className="text-white text-xs">
                        <div className="font-bold flex items-center gap-1.5 mb-0.5">
                          <Eye className="w-3.5 h-3.5 text-[#F5C400]" />
                          <span>{exp.missionName}</span>
                        </div>
                        <p className="text-white/80 text-[11px] line-clamp-1">{exp.previewImageAlt}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Key Accomplishments & Deliverables */}
                <div>
                  <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5 font-mono">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Key Accomplishments &amp; Deliverables</span>
                  </h5>
                  <ul className="space-y-1.5">
                    {exp.achievements.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technical Stack Loadout Categorized */}
                {exp.loadoutCategories && exp.loadoutCategories.length > 0 && (
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 font-mono">
                      <span>Technical Stack</span>
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {exp.loadoutCategories.map((cat, i) => (
                        <div key={i} className="bg-white p-2.5 rounded-lg border border-slate-200">
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                            {cat.category}
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {cat.items.map((it, j) => (
                              <span key={j} className="text-[10px] font-medium text-slate-800 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">
                                {it}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* View Details Button */}
                <div className="pt-2 flex justify-end">
                  <button
                    type="button"
                    onClick={() => onSelectExperience(exp)}
                    className="px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs hover:border-blue-400"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#F5C400]" />
                    <span>View Career Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
};

export const ExperienceSection: React.FC = () => {
  // Folder open/closed state (MINIMIZED / FOLDED BY DEFAULT)
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<JobExperience | null>(null);
  
  // Track expanded state per individual role ID inside the folder
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'exp-freelance': true,
  });

  const freelanceExperience = JOB_EXPERIENCES.find((e) => e.id === 'exp-freelance') || JOB_EXPERIENCES[0];
  const corporateExperiences = JOB_EXPERIENCES.filter((e) => e.id !== 'exp-freelance');

  const toggleFolder = () => {
    setIsFolderOpen((prev) => !prev);
  };

  const toggleRoleExpand = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const allRolesExpanded = JOB_EXPERIENCES.every((e) => expandedIds[e.id]);

  const toggleExpandAllRoles = () => {
    const areAllOpen = JOB_EXPERIENCES.every((e) => expandedIds[e.id]);
    const newState: Record<string, boolean> = {};
    JOB_EXPERIENCES.forEach((e) => {
      newState[e.id] = !areAllOpen;
    });
    setExpandedIds(newState);
  };

  return (
    <section 
      id="experience" 
      className="py-16 md:py-24 bg-[#F5C400] text-[#17191D] relative overflow-hidden font-sans"
    >
      {/* Fun Dynamic Animated Background */}
      <FunSectionBackground theme="yellow" variant="experience" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-xl mx-auto mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#17191D] rounded-full text-xs font-semibold text-[#F5C400] mb-3 shadow-xs">
            <Briefcase className="w-3.5 h-3.5 text-[#F5C400]" />
            <span className="text-[11px] font-bold text-[#F5C400] uppercase tracking-wider">
              Freelance &amp; Work History
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#17191D]">
            Freelance &amp; Experience
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-[#17191D]/85 font-medium">
            I do freelancing mostly—building bespoke web applications, responsive websites, and digital products for clients, alongside engineering contracts and development internships.
          </p>
        </motion.div>

        {/* Doodle Animation & Interactive Callout above the Folder */}
        <div className="flex justify-end mb-2 pr-2 sm:pr-4">
          <DoodleFolderIndicator 
            isOpen={isFolderOpen} 
            onClick={toggleFolder} 
          />
        </div>

        {/* =========================================================================
            3D FOLDER CASING WITH SMOOTH UNFOLDING / FOLDING ANIMATIONS
           ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative [perspective:1400px]"
        >
          
          {/* Layered Paper Shadows Behind Folder */}
          <motion.div 
            animate={{ 
              scale: isFolderOpen ? [1, 1.02, 1] : 1,
              opacity: isFolderOpen ? 0.35 : 0.2
            }}
            transition={{ duration: 0.6 }}
            className="absolute inset-x-3 -bottom-3 h-12 bg-black/20 rounded-3xl blur-lg pointer-events-none" 
          />

          {/* Under-flap Layered Sheets Peeking Out */}
          <motion.div 
            animate={{ 
              y: isFolderOpen ? -8 : 0,
              rotate: isFolderOpen ? -0.8 : -0.4,
              opacity: isFolderOpen ? 0.9 : 0.6
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -top-2 left-4 right-4 h-6 bg-white rounded-t-2xl border-t border-l border-r border-slate-300 pointer-events-none" 
          />
          <motion.div 
            animate={{ 
              y: isFolderOpen ? -4 : 0,
              rotate: isFolderOpen ? 0.6 : 0.3,
              opacity: isFolderOpen ? 0.95 : 0.8
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute -top-1 left-2 right-6 h-6 bg-white rounded-t-2xl border-t border-l border-r border-slate-300 pointer-events-none" 
          />

          {/* Folder Top Tabs Bar */}
          <div className="relative z-20 flex items-end justify-between px-2 sm:px-4">
            
            {/* Main Folder Tab (Sharp Technical Binder Tab) */}
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
              onClick={toggleFolder}
              className={`px-5 sm:px-6 py-2 sm:py-2.5 rounded-t-lg font-mono text-xs font-bold border-2 border-b-0 border-[#17191D] transition-all flex items-center gap-2 cursor-pointer select-none ${
                isFolderOpen 
                  ? 'bg-white text-[#17191D] -mb-[1px] shadow-lg' 
                  : 'bg-[#17191D] text-white hover:bg-black -mb-[1px]'
              }`}
            >
              {isFolderOpen ? (
                <FolderOpen className="w-4 h-4 text-[#155EEF]" />
              ) : (
                <Folder className="w-4 h-4 text-[#F5C400]" />
              )}
              <span className="tracking-tight">FOLDER 05 // CAREER RESUME</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ml-1" />
            </motion.button>

            {/* Folder Tab Metadata Stamp */}
            <div className="hidden sm:flex items-center gap-2 pb-1.5 text-[11px] font-mono font-bold text-[#17191D]">
              <span className="px-2.5 py-1 rounded-t-md bg-white/90 text-slate-900 border border-b-0 border-slate-900/30">
                {isFolderOpen ? 'VIEW: FULL RESUME' : 'FORMAT: 1-PAGE RESUME'}
              </span>
            </div>
          </div>

          {/* =======================================================================
              MAIN FOLDER BODY WITH SHARP BINDING
             ======================================================================= */}
          <div className="relative z-10 bg-white rounded-b-xl rounded-tr-xl border-2 border-[#17191D] shadow-2xl overflow-hidden text-[#17191D]">
            
            {/* Top Multi-Color Architectural Trim */}
            <div className="h-1 w-full flex select-none pointer-events-none mb-0.5">
              <div className="flex-1 bg-[#155EEF]" />
              <div className="flex-1 bg-[#F5C400]" />
              <div className="flex-1 bg-[#D92D20]" />
              <div className="w-16 bg-slate-200" />
            </div>

            <AnimatePresence initial={false} mode="wait">
              {/* ===================================================================
                  STATE A: FOLDED / MINIMIZED FOLDER FLAP COVER (DEFAULT)
                 =================================================================== */}
              {!isFolderOpen ? (
                <motion.div
                  key="folder-cover"
                  initial={{ opacity: 0, rotateX: 65, transformOrigin: 'top center' }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  exit={{ opacity: 0, rotateX: -65, transformOrigin: 'top center', transition: { duration: 0.35, ease: [0.32, 0, 0.67, 0] } }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  onClick={toggleFolder}
                  className="p-6 sm:p-9 md:p-12 cursor-pointer group bg-[#FCFBF7] hover:bg-white transition-colors relative"
                >
                  {/* Crease Line Accent */}
                  <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-amber-200 to-transparent" />

                  {/* Watermark Stamp */}
                  <div className="absolute right-4 sm:right-8 top-6 pointer-events-none select-none opacity-15 rotate-12">
                    <div className="border-4 border-dashed border-[#D92D20] px-4 py-2 rounded-xl text-center">
                      <span className="font-mono text-xl sm:text-2xl font-black text-[#D92D20] tracking-widest block">
                        CAREER RESUME
                      </span>
                      <span className="text-[10px] font-mono text-[#D92D20] font-bold block">
                        VERIFIED WORK RECORD
                      </span>
                    </div>
                  </div>

                  <div className="max-w-3xl">
                    {/* Folder Label Header */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2.5 py-0.5 bg-[#17191D] text-white rounded font-mono text-[10px] font-bold uppercase tracking-wider">
                        Work Record #002 · 1-Page Resume
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        Freelance Practice &amp; Corporate History
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-[#17191D] tracking-tight group-hover:text-[#155EEF] transition-colors">
                      {PROFILE_INFO.name} — Career History &amp; Experience
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2 font-normal max-w-xl">
                      I work primarily as an independent freelance developer delivering bespoke web applications, responsive client websites, and digital solutions, alongside corporate engineering contracts and development internships.
                    </p>

                    {/* DIRECTORY PREVIEW CARDS */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6 pt-5 border-t border-slate-200/80">
                      
                      {/* Freelance Highlight Card */}
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsFolderOpen(true);
                        }}
                        className="p-4 rounded-xl bg-white border-2 border-slate-200/90 shadow-2xs hover:border-[#155EEF] hover:shadow-md transition-all group/p1 cursor-pointer relative"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#155EEF]/10 text-[#155EEF] border border-[#155EEF]/20 flex items-center gap-1.5">
                            <FileText className="w-3 h-3 text-[#155EEF]" />
                            <span>PRIMARY FOCUS // FREELANCE</span>
                          </span>
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        </div>
                        <h4 className="font-bold text-sm sm:text-base text-slate-900 group-hover/p1:text-[#155EEF] transition-colors">
                          Independent Freelance Practice
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          Bespoke web applications, custom business portals, SEO-tuned websites, and client solutions.
                        </p>
                        <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#155EEF]">
                          <span>Open Full Resume</span>
                          <ArrowRight className="w-3 h-3 group-hover/p1:translate-x-1 transition-transform" />
                        </div>
                      </div>

                      {/* Corporate Highlight Card */}
                      <div 
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsFolderOpen(true);
                        }}
                        className="p-4 rounded-xl bg-white border-2 border-slate-200/90 shadow-2xs hover:border-[#D92D20] hover:shadow-md transition-all group/p2 cursor-pointer relative"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#D92D20]/10 text-[#D92D20] border border-[#D92D20]/20 flex items-center gap-1.5">
                            <Briefcase className="w-3 h-3 text-[#D92D20]" />
                            <span>WORK HISTORY // COMPANIES</span>
                          </span>
                          <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                            3 POSITIONS
                          </span>
                        </div>
                        <h4 className="font-bold text-sm sm:text-base text-slate-900 group-hover/p2:text-[#D92D20] transition-colors">
                          Corporate Contracts &amp; Internships
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          ContactPoint 360 (Contract), S&amp;P Villa Management, and Advanced Infinit Solutions.
                        </p>
                        <div className="mt-3 flex items-center gap-1 text-[11px] font-bold text-[#D92D20]">
                          <span>Open Full Resume</span>
                          <ArrowRight className="w-3 h-3 group-hover/p2:translate-x-1 transition-transform" />
                        </div>
                      </div>

                    </div>

                    {/* Summary Metric Chips */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-5">
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200/90 shadow-2xs">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Format</span>
                        <span className="text-base sm:text-lg font-black text-[#155EEF]">1-Pager</span>
                      </div>

                      <div className="bg-white p-2.5 rounded-xl border border-slate-200/90 shadow-2xs">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Primary Focus</span>
                        <span className="text-base sm:text-lg font-black text-[#17191D]">Freelancing</span>
                      </div>

                      <div className="bg-white p-2.5 rounded-xl border border-slate-200/90 shadow-2xs">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Industry Track</span>
                        <span className="text-base sm:text-lg font-black text-emerald-600">3 Positions</span>
                      </div>

                      <div className="bg-white p-2.5 rounded-xl border border-slate-200/90 shadow-2xs">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Core Domain</span>
                        <span className="text-base sm:text-lg font-black text-[#946C00]">Full-Stack Web</span>
                      </div>
                    </div>

                    {/* Click to Unfold Action Bar */}
                    <div className="mt-8 pt-5 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Lock className="w-4 h-4 text-slate-400" />
                        <span>Folder closed · Click anywhere to view the 1-page resume</span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFolder();
                        }}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#17191D] hover:bg-[#155EEF] text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 group-hover:scale-103 active:scale-95 cursor-pointer"
                      >
                        <FolderOpen className="w-4 h-4 text-[#F5C400]" />
                        <span>Open Career Resume</span>
                        <CornerDownRight className="w-3.5 h-3.5 text-white/70" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* ===================================================================
                    STATE B: UNFOLDED FOLDER (1-PAGE EXECUTIVE CAREER DOSSIER)
                   =================================================================== */
                <motion.div
                  key="folder-unfolded"
                  initial={{ opacity: 0, y: 35, scale: 0.98, rotateX: 12, transformOrigin: 'top center' }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                  exit={{ opacity: 0, y: 30, scale: 0.98, rotateX: 12, transformOrigin: 'top center', transition: { duration: 0.3 } }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* 1. Resume Top Controls Bar */}
                  <div className="p-4 sm:p-5 bg-slate-50/95 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    
                    {/* Left: Identity */}
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-[#17191D] text-white flex items-center justify-center shrink-0 shadow-xs">
                        <BookOpen className="w-4 h-4 text-[#F5C400]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm sm:text-base font-black text-[#17191D] tracking-tight">
                            CAREER RESUME
                          </h3>
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-[#155EEF] font-black border border-blue-200">
                            1-PAGE RESUME
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium">
                          Freelance Practice &amp; Corporate History
                        </p>
                      </div>
                    </div>

                    {/* Right: Expand/Collapse All Roles & Close Button */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={toggleExpandAllRoles}
                        className="px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-[#17191D] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        title={allRolesExpanded ? 'Collapse all roles' : 'Expand all roles'}
                      >
                        {allRolesExpanded ? (
                          <>
                            <ChevronUp className="w-3.5 h-3.5 text-slate-700" />
                            <span>Collapse All</span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="w-3.5 h-3.5 text-slate-700" />
                            <span>Expand All</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={toggleFolder}
                        className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs active:scale-95"
                        title="Close folder"
                      >
                        <Folder className="w-3.5 h-3.5 text-[#D92D20]" />
                        <span>Close</span>
                      </button>
                    </div>

                  </div>

                  {/* 2. Dossier Content Area: Clean Continuous 1-Page Resume */}
                  <div className="p-4 sm:p-6 md:p-8 bg-[#FCFBF8]/60 space-y-7">
                    
                    {/* SECTION 1: PRIMARY WORK — FREELANCE PRACTICE */}
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                          <h4 className="font-mono text-xs font-bold text-slate-900 tracking-wider uppercase">
                            PRIMARY WORK // INDEPENDENT FREELANCE PRACTICE
                          </h4>
                        </div>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          ACTIVE WORKSTREAM
                        </span>
                      </div>

                      <MilestoneItem
                        exp={freelanceExperience}
                        index={0}
                        totalCount={1}
                        isExpanded={!!expandedIds[freelanceExperience.id]}
                        onToggleExpand={toggleRoleExpand}
                        onSelectExperience={setSelectedExperience}
                      />
                    </div>

                    {/* SECTION 2: WORK HISTORY — CORPORATE CONTRACTS & INTERNSHIPS */}
                    <div className="space-y-3.5">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                          <h4 className="font-mono text-xs font-bold text-slate-900 tracking-wider uppercase">
                            WORK HISTORY // COMPANIES &amp; INTERNSHIPS (3)
                          </h4>
                        </div>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                          3 POSITIONS
                        </span>
                      </div>

                      <div className="space-y-4">
                        {corporateExperiences.map((exp, idx) => (
                          <MilestoneItem
                            key={exp.id}
                            exp={exp}
                            index={idx}
                            totalCount={corporateExperiences.length}
                            isExpanded={!!expandedIds[exp.id]}
                            onToggleExpand={toggleRoleExpand}
                            onSelectExperience={setSelectedExperience}
                          />
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* 3. Dossier Bottom Navigation Footer */}
                  <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
                    
                    {/* 1-Page Indicator */}
                    <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span>1-Page Career Resume · Complete Overview</span>
                    </div>

                    {/* External Connections & Close Folder */}
                    <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 w-full sm:w-auto">
                      <a
                        href={PROFILE_INFO.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-lg bg-[#0A66C2] hover:bg-[#084e96] text-white font-semibold transition-colors flex items-center gap-1.5 shadow-2xs text-xs"
                      >
                        <span>LinkedIn Profile</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <a
                        href="#contact"
                        className="px-3.5 py-1.5 rounded-lg bg-[#17191D] hover:bg-slate-800 text-white font-semibold transition-colors flex items-center gap-1.5 shadow-2xs text-xs"
                      >
                        <span>Send Message</span>
                        <ArrowUpRight className="w-3 h-3 text-[#F5C400]" />
                      </a>

                      <button
                        onClick={toggleFolder}
                        className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                        title="Close resume folder"
                      >
                        <Folder className="w-3.5 h-3.5 text-[#D92D20]" />
                        <span>Close</span>
                      </button>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </motion.div>

      </div>

      {/* Role Details Modal */}
      <CockpitDashboardModal
        experience={selectedExperience}
        allExperiences={JOB_EXPERIENCES}
        onClose={() => setSelectedExperience(null)}
        onSelectExperience={(exp) => setSelectedExperience(exp)}
      />
    </section>
  );
};
