import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  Palette, 
  Cpu, 
  Server, 
  Activity, 
  CheckCircle2, 
  ArrowUpRight, 
  Sparkles, 
  Zap, 
  Maximize2, 
  X, 
  Eye, 
  ShieldCheck, 
  Code2, 
  Layers, 
  Sparkle,
  Play,
  Pause,
  Video,
  Sliders,
  Clock
} from 'lucide-react';
import { PROFILE_INFO } from '../../data/portfolio';
import { AnimatedAvatar } from '../ui/AnimatedAvatar';
import { FunSectionBackground } from '../ui/FunSectionBackground';

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  zone: 'blue' | 'yellow' | 'red';
  icon: React.ReactNode;
  previewImage: string;
  previewAlt: string;
  capabilities: string[];
  technologies: string[];
  isComingSoon?: boolean;
}

const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'ai-automations',
    number: '01',
    title: 'AI Automation & Helpers',
    category: 'AI & Automation',
    summary: 'Automate repetitive tasks, read and organize text automatically, and connect smart AI tools that save you hours every week.',
    zone: 'blue',
    icon: <Cpu className="w-3.5 h-3.5 text-[#155EEF]" />,
    previewImage: '/src/assets/images/services/service_ai_automation.jpg',
    previewAlt: 'Custom AI automation and analytics dashboard with smart text summaries and insights',
    capabilities: ['Smart Text Summaries', 'Automated Email & Chat AI', 'Reads & Categorizes Data'],
    technologies: ['Gemini AI', 'Python', 'Next.js', 'APIs'],
  },
  {
    id: 'process-automation',
    number: '02',
    title: 'Process Automation & Rules',
    category: 'Workflows & Rules',
    summary: 'Connect your business steps together so orders, data updates, and customer notifications happen automatically without manual work.',
    zone: 'yellow',
    icon: <Activity className="w-3.5 h-3.5 text-[#946C00]" />,
    previewImage: '/src/assets/images/services/service_process_automation.jpg',
    previewAlt: 'Visual workflow automation builder with conditional branch rules and live trigger monitoring',
    capabilities: ['Hands-Free Data Entry', 'Multi-Step Approval Rules', 'Instant Discord & Email Alerts'],
    technologies: ['Node.js', 'Webhooks', 'Docker', 'Automation'],
  },
  {
    id: 'portfolio-websites',
    number: '03',
    title: 'Custom Portfolio Websites',
    category: 'Portfolios & Personal Sites',
    summary: 'Eye-catching personal portfolios that showcase your best work, resume, and skills with smooth animations and interactive details.',
    zone: 'red',
    icon: <Sparkles className="w-3.5 h-3.5 text-[#D92D20]" />,
    previewImage: '/src/assets/images/services/service_portfolio_website.jpg',
    previewAlt: 'Modern dark-mode creative portfolio website design with interactive work showcase',
    capabilities: ['Looks Great on Phones', 'Interactive Project Previews', 'Smooth Dark & Light Modes'],
    technologies: ['React 19', 'Tailwind CSS', 'Motion', 'Vercel'],
  },
  {
    id: 'landing-pages',
    number: '04',
    title: 'High-Converting Landing Pages',
    category: 'Sales & Marketing',
    summary: 'Fast, beautifully designed landing pages with crystal-clear text and photos that guide visitors to call, book, or buy.',
    zone: 'blue',
    icon: <Globe className="w-3.5 h-3.5 text-[#155EEF]" />,
    previewImage: '/src/assets/images/services/service_landing_page.jpg',
    previewAlt: 'Clean conversion-focused landing page with clear CTA buttons, hero banner, and metrics',
    capabilities: ['Opens in < 1 Second', 'Mobile-Friendly Booking', 'High Google SEO Scores'],
    technologies: ['Next.js', 'Tailwind CSS', 'Responsive UI', 'SEO'],
  },
  {
    id: 'inventory-websites',
    number: '05',
    title: 'Inventory & Stock Management',
    category: 'Stock & Warehouses',
    summary: 'Track stock levels in real time, get alerts before items run out, scan barcodes, and export reports to Excel with one click.',
    zone: 'yellow',
    icon: <Layers className="w-3.5 h-3.5 text-[#946C00]" />,
    previewImage: '/src/assets/images/services/service_inventory_system.jpg',
    previewAlt: 'Warehouse and SKU stock management dashboard with low-stock alerts and movement logs',
    capabilities: ['Real-Time Stock Counts', 'Low-Stock Warning Alerts', 'Excel Import & Export'],
    technologies: ['React', 'PostgreSQL', 'Excel Engine', 'Barcode'],
  },
  {
    id: 'billing-systems',
    number: '06',
    title: 'Billing & Invoicing Systems',
    category: 'Billing & Cashiering',
    summary: 'Calculate tiered fees and utility rates automatically, issue printable customer bills with QR codes, and balance daily cashier collections.',
    zone: 'red',
    icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#D92D20]" />,
    previewImage: '/src/assets/images/services/service_billing_invoicing.jpg',
    previewAlt: 'Commercial billing and invoicing dashboard with invoice ledger, status badges, and payment breakdown',
    capabilities: ['Automatic Rate Math', 'Printable Bills with QR', 'Daily Cashier Ledgers'],
    technologies: ['PostgreSQL', 'Node.js', 'QR Pay', 'React'],
  },
  {
    id: 'queuing-systems',
    number: '07',
    title: 'Live Queuing & Check-In Systems',
    category: 'Check-In & Queues',
    summary: 'Replace crowded paper lines with digital queue screens, RFID card tap check-ins, and live priority order tracking.',
    zone: 'blue',
    icon: <Zap className="w-3.5 h-3.5 text-[#155EEF]" />,
    previewImage: '/src/assets/images/services/service_queuing_system.jpg',
    previewAlt: 'Digital counter queuing display showing current ticket numbers, counter status, and wait times',
    capabilities: ['RFID & QR Card Taps', 'Live Waiting Line TV Display', 'Sub-Second Check-In Speed'],
    technologies: ['WebSockets', 'RFID Scanners', 'Hardware HID', 'React'],
  },
  {
    id: 'clinical-websites',
    number: '08',
    title: 'Clinic & Healthcare Portals (EMR)',
    category: 'Healthcare & Clinics',
    summary: 'Secure digital medical records for clinics and doctors: record consultations, track bed occupancy, manage prescriptions, and work offline safely.',
    zone: 'yellow',
    icon: <ShieldCheck className="w-3.5 h-3.5 text-[#946C00]" />,
    previewImage: '/src/assets/images/services/service_clinic_emr.jpg',
    previewAlt: 'Medical clinic EMR dashboard with patient triage, appointment schedule, and consultation records',
    capabilities: ['Safe Patient Histories', '100% Offline Capable', 'Doctor Prescription Slips'],
    technologies: ['React', 'Local Database', 'Node.js', 'Tailwind'],
  },
  {
    id: 'school-portals',
    number: '09',
    title: 'School & QR Admissions Portals',
    category: 'Education & Campus',
    summary: 'Modern websites for schools and colleges with online admissions, fast QR student enrollment, announcements, and campus photo galleries.',
    zone: 'red',
    icon: <Code2 className="w-3.5 h-3.5 text-[#D92D20]" />,
    previewImage: '/src/assets/images/services/service_school_portal.jpg',
    previewAlt: 'School institutional portal with online admissions, student enrollment cards, and academic notices',
    capabilities: ['Online Student Enrollment', 'QR Code Verification', 'Campus News & Galleries'],
    technologies: ['Next.js', 'React 19', 'QR Protocol', 'TypeScript'],
  },
  {
    id: 'enterprise-crm',
    number: '10',
    title: 'Enterprise CRM & Admin Portals',
    category: 'Team Portals & CRM',
    summary: 'Organize customer relationships, track applicants across multi-step pipelines, and manage team permissions in one clean workspace.',
    zone: 'blue',
    icon: <Server className="w-3.5 h-3.5 text-[#155EEF]" />,
    previewImage: '/src/assets/images/services/service_enterprise_crm.jpg',
    previewAlt: 'Enterprise CRM dashboard with pipeline stages, customer profiles, and team activity timeline',
    capabilities: ['Candidate & Client Pipelines', 'Staff Access Controls', 'Clear Performance Stats'],
    technologies: ['React 19', 'TypeScript', 'Docker', 'REST APIs'],
  },
  {
    id: 'video-editing',
    number: '11',
    title: 'Short-Form & Video Editing',
    category: 'Post-Production & Video',
    summary: 'High-retention video editing for YouTube, Reels, and commercials with punchy pacing, motion graphics, sound design, and narrative flow.',
    zone: 'yellow',
    icon: <Video className="w-3.5 h-3.5 text-[#946C00]" />,
    previewImage: '/src/assets/images/services/service_video_editing.jpg',
    previewAlt: 'Professional multi-track NLE video editing timeline with audio waveforms, B-roll cuts, and playback monitor',
    capabilities: ['High-Retention Reels & TikToks', 'Motion Graphics & Subtitles', 'Sound Design & Audio SFX'],
    technologies: ['Premiere Pro', 'DaVinci Resolve', 'After Effects', 'CapCut Pro'],
    isComingSoon: true,
  },
  {
    id: 'video-color-grading',
    number: '12',
    title: 'Cinematic Video Color Grading',
    category: 'Color & Mastering',
    summary: 'Professional color grading in DaVinci Resolve: mood styling, camera shot matching, accurate skin tones, HDR adjustments, and custom cinematic film looks.',
    zone: 'red',
    icon: <Sliders className="w-3.5 h-3.5 text-[#D92D20]" />,
    previewImage: '/src/assets/images/services/service_video_color_grading.jpg',
    previewAlt: 'DaVinci Resolve color grading suite with 3-way color balance wheels, node graph tree, scopes, and parade monitors',
    capabilities: ['Cinematic Film Emulation', 'Multi-Cam Shot Matching', 'Skin Tone & HDR Balancing'],
    technologies: ['DaVinci Resolve', 'Log / RAW Grading', 'Color Wheels', 'ACES Workflow'],
    isComingSoon: true,
  },
];

export const ServicesSection: React.FC = () => {
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);
  const [modalImage, setModalImage] = useState<{ src: string; alt: string; title: string } | null>(null);

  const zoneColors = {
    blue: {
      accent: 'bg-[#155EEF]',
      border: 'border-[#155EEF]',
      badge: 'bg-[#155EEF]/10 text-[#155EEF] border-[#155EEF]/25',
      numBg: 'bg-[#155EEF]/10 text-[#155EEF]',
      btn: 'bg-[#155EEF] hover:bg-[#124ec6] text-white',
    },
    yellow: {
      accent: 'bg-[#F5C400]',
      border: 'border-[#F5C400]',
      badge: 'bg-[#F5C400]/15 text-[#946C00] border-[#F5C400]/30',
      numBg: 'bg-[#F5C400]/15 text-[#946C00]',
      btn: 'bg-[#F5C400] hover:bg-[#e0b300] text-[#17191D]',
    },
    red: {
      accent: 'bg-[#D92D20]',
      border: 'border-[#D92D20]',
      badge: 'bg-[#D92D20]/10 text-[#D92D20] border-[#D92D20]/25',
      numBg: 'bg-[#D92D20]/10 text-[#D92D20]',
      btn: 'bg-[#D92D20] hover:bg-[#b52418] text-white',
    },
  };

  return (
    <section 
      id="services" 
      className="py-14 md:py-20 bg-[#155EEF] text-white relative overflow-hidden font-sans"
    >
      {/* Fun Dynamic Animated Background */}
      <FunSectionBackground theme="blue" variant="services" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* =========================================================================
            1. AVATAR COMMAND DECK (HORIZONTAL BANNER ABOVE SERVICES FOLDER)
           ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="bg-white rounded-xl border-2 border-[#17191D] shadow-2xl p-4 sm:p-6 relative overflow-hidden mb-8 sm:mb-10 text-[#17191D]"
        >
          {/* Signature Gundam Tricolor Top Stripe */}
          <div className="absolute top-0 left-0 right-0 h-1 gundam-tricolor-bar" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-5 lg:gap-7">
            
            {/* Left: Animated Eagle Avatar with Status Indicator */}
            <div className="flex items-center gap-3.5 shrink-0">
              <div className="relative">
                <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#155EEF]/20 via-[#F5C400]/20 to-[#D92D20]/20 rounded-full blur-xs" />
                <div className="scale-85 origin-center">
                  <AnimatedAvatar />
                </div>
              </div>
              <div className="hidden sm:block">
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Available for New Projects</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 block mt-1">
                  Status: Open for Hire
                </span>
              </div>
            </div>

            {/* Center: Pilot Information & Engineering Guarantees */}
            <div className="flex-1 text-center lg:text-left min-w-0">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 mb-1.5">
                <span className="px-2 py-0.5 bg-slate-100 rounded-md border border-slate-200 text-[10px] font-bold text-slate-700 uppercase tracking-wider">
                  Web Developer &amp; UI Designer
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-black text-[#17191D] tracking-tight">
                {PROFILE_INFO.name}
                <span className="ml-2 text-xs font-semibold text-[#155EEF]">
                  · Full-Stack Web Developer &amp; UI Designer
                </span>
              </h2>

              <p className="text-[11px] text-slate-600 leading-relaxed mt-1 max-w-2xl">
                I help businesses, founders, and teams turn ideas into fast, easy-to-use websites and web apps that work smoothly on phones and computers.
              </p>

              {/* 3 Guarantees in simple language */}
              <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-1 text-[10.5px] text-slate-600">
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#155EEF] shrink-0" />
                  <span className="font-medium">Bug-Free, Tested Code</span>
                </div>
                <div className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#F5C400] shrink-0" />
                  <span className="font-medium">Super Fast Page Speed</span>
                </div>
                <div className="flex items-center gap-1">
                  <Code2 className="w-3.5 h-3.5 text-[#D92D20] shrink-0" />
                  <span className="font-medium">Direct 1-on-1 Collaboration</span>
                </div>
              </div>
            </div>

          </div>
        </motion.div>


        {/* =========================================================================
            2. SERVICES SECTION INTRO HEADER
           ========================================================================= */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-8"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold text-white mb-2 shadow-xs border border-white/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5C400]" />
            <span className="text-[#F5C400] font-bold uppercase tracking-wider text-[11px]">What I Can Do For You</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-2">
            Services Offered
          </h2>
          <p className="text-sm sm:text-base text-white/90 max-w-xl mx-auto font-medium">
            Moving continuously right to left · Hover any card to pause · Click picture to zoom
          </p>

          {/* Pause / Resume Toggle matching Tools */}
          <div className="mt-4 inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-xs text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-white font-medium">Auto-Scroll</span>

            <button
              onClick={() => setIsCarouselPaused(!isCarouselPaused)}
              className="px-2 py-0.5 rounded bg-white/20 hover:bg-white/30 text-white text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              {isCarouselPaused ? (
                <>
                  <Play className="w-2.5 h-2.5 text-white" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <Pause className="w-2.5 h-2.5 text-white" />
                  <span>Pause</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

      </div>

      {/* =========================================================================
          3. CONTINUOUS SERVICES CAROUSEL (EDGE-TO-EDGE FULL WIDTH)
         ========================================================================= */}
      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="w-full relative py-4 sm:py-6 overflow-hidden group/services"
      >
        {/* Soft edge fade masks on Left and Right matching Solid Blue (#155EEF) */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-[#155EEF] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-[#155EEF] to-transparent z-20 pointer-events-none" />

        {/* Single-line Marquee Track */}
        <div className="relative w-full overflow-hidden">
          <div 
            className="animate-marquee-left gap-4 sm:gap-5 px-4"
            style={{ 
              animationDuration: '58s',
              animationPlayState: isCarouselPaused ? 'paused' : undefined 
            }}
          >
            {[...SERVICES_LIST, ...SERVICES_LIST].map((service, index) => {
              const theme = zoneColors[service.zone];

              return (
                <div
                  key={`${service.id}-${index}`}
                  className="w-[290px] sm:w-[330px] bg-white rounded-2xl border-2 border-[#17191D] shadow-xl p-4 sm:p-4.5 flex flex-col justify-between overflow-hidden relative group/card hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 text-[#17191D] shrink-0 select-none"
                >
                  <div>
                    {/* Card Header: Number + Category Badge + Icon */}
                    <div className="flex items-center justify-between gap-1.5 mb-2.5">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className={`w-5 h-5 rounded-md flex items-center justify-center font-black text-[10px] shrink-0 ${theme.numBg}`}>
                          {service.number}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border truncate ${theme.badge}`}>
                          {service.category}
                        </span>
                        {service.isComingSoon && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-700 border border-amber-500/30 shrink-0 flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" />
                            Soon
                          </span>
                        )}
                      </div>

                      <div className="w-6 h-6 rounded-md bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                        {service.icon}
                      </div>
                    </div>

                    {/* Compact Preview Image Frame with Zoom Trigger */}
                    <div 
                      onClick={() => setModalImage({
                        src: service.previewImage,
                        alt: service.previewAlt,
                        title: service.title,
                      })}
                      className="relative aspect-[16/9] w-full rounded-xl overflow-hidden cursor-zoom-in bg-slate-900 border border-slate-200 shadow-2xs group/thumb mb-3"
                      title="Click picture to zoom"
                    >
                      {/* Coming Soon overlay badge */}
                      {service.isComingSoon && (
                        <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-md bg-[#17191D]/85 backdrop-blur-md border border-amber-400/50 text-amber-300 text-[9px] font-mono font-bold tracking-wider flex items-center gap-1.5 shadow-md">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                          <span>COMING SOON</span>
                        </div>
                      )}

                      <img 
                        src={service.previewImage} 
                        alt={service.previewAlt} 
                        className="w-full h-full object-cover object-top group-hover/thumb:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      
                      {/* Zoom Icon Button Overlay */}
                      <div className="absolute top-1.5 right-1.5 bg-black/60 hover:bg-black/80 backdrop-blur-xs text-white p-1 rounded-md transition-colors">
                        <Maximize2 className="w-3 h-3" />
                      </div>

                      {/* Subtle bottom hover hint */}
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent opacity-0 group-hover/thumb:opacity-100 transition-opacity p-1.5 text-center">
                        <span className="text-[10px] text-white font-medium flex items-center justify-center gap-1">
                          <Eye className="w-3 h-3 text-[#F5C400]" />
                          Click picture to zoom
                        </span>
                      </div>
                    </div>

                    {/* Title & Short Summary */}
                    <h3 className="text-sm sm:text-base font-bold text-[#17191D] tracking-tight group-hover/card:text-[#155EEF] transition-colors truncate mb-1">
                      {service.title}
                    </h3>
                    <p className="text-[11.5px] text-slate-500 leading-snug line-clamp-2 mb-3 font-normal">
                      {service.summary}
                    </p>

                    {/* Micro Deliverables Chips */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {service.capabilities.map((cap, cIdx) => (
                        <span 
                          key={cIdx} 
                          className="inline-flex items-center gap-1 text-[10px] text-slate-600 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/80 leading-none"
                        >
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                          <span className="truncate max-w-[140px]">{cap}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer: Tech Stack + Compact Inquire Button */}
                  <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-1.5 mt-auto">
                    <div className="flex items-center gap-1 min-w-0 overflow-hidden">
                      {service.technologies.slice(0, 2).map((tech) => (
                        <span 
                          key={tech} 
                          className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-600 text-[9.5px] font-medium truncate"
                        >
                          {tech}
                        </span>
                      ))}
                      {service.technologies.length > 2 && (
                        <span className="text-[9px] text-slate-400 font-medium shrink-0">
                          +{service.technologies.length - 2}
                        </span>
                      )}
                    </div>

                    {service.isComingSoon ? (
                      <a
                        href="#contact"
                        className="inline-flex items-center gap-1 py-1.5 px-3 rounded-lg text-[11px] font-bold transition-all bg-amber-400 hover:bg-amber-300 text-[#17191D] shadow-2xs hover:scale-102 active:scale-95 shrink-0"
                        title="Express early interest for this upcoming service"
                      >
                        <span>Inquire Early</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    ) : (
                      <a
                        href="#contact"
                        className={`inline-flex items-center gap-1 py-1.5 px-3 rounded-lg text-[11px] font-semibold transition-all ${theme.btn} shadow-2xs hover:scale-102 active:scale-95 shrink-0`}
                      >
                        <span>Get a Quote</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Bottom Action / CTA Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 relative z-10 text-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-3 px-5 py-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xs text-xs text-white">
          <span className="font-semibold text-white/90">10 Active Solutions · 2 Coming Soon</span>
          <span className="text-white/40 hidden sm:inline">•</span>
          <span className="text-white/80 hidden sm:inline">Have a specific project in mind?</span>
          <a
            href="#contact"
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-[#155EEF] font-bold transition-all flex items-center gap-1 shadow-md hover:scale-102 active:scale-95 text-xs"
          >
            <span>Let's talk about it</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
      {/* =========================================================================
          HIGH-DEFINITION PREVIEW IMAGE LIGHTBOX MODAL
         ========================================================================= */}
      <AnimatePresence>
        {modalImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModalImage(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 bg-[#17191D] border border-white/15 rounded-2xl shadow-2xl overflow-hidden max-w-4xl w-full text-white"
            >
              {/* Header */}
              <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#155EEF]" />
                  <span className="font-bold text-sm tracking-tight">{modalImage.title}</span>
                  <span className="text-xs text-slate-400 hidden sm:inline">· Full Preview</span>
                </div>

                <button
                  onClick={() => setModalImage(null)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
                  title="Close preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Full Image */}
              <div className="p-2 sm:p-3 bg-black/50 flex items-center justify-center">
                <img 
                  src={modalImage.src} 
                  alt={modalImage.alt} 
                  className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain shadow-lg"
                />
              </div>

              {/* Caption Footer */}
              <div className="px-4 py-3 bg-[#111317] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
                <p>{modalImage.alt}</p>
                <button
                  onClick={() => setModalImage(null)}
                  className="px-3 py-1 rounded-md bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
