import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROFILE_INFO } from '../../data/portfolio';
import { 
  Sliders, 
  Check, 
  Calendar, 
  Clock, 
  Sparkles, 
  Mail, 
  Copy, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Layers,
  Zap,
  Cpu,
  Lock,
  CreditCard,
  Activity,
  RotateCcw
} from 'lucide-react';

export type PartnershipModel = 'one-time' | 'monthly' | 'bundle';
export type ProjectType = 'webapp' | 'marketing' | 'portal' | 'speed';

interface FeatureModule {
  id: string;
  name: string;
  desc: string;
  icon: React.ReactNode;
  category: 'core' | 'backend' | 'advanced';
  estimatedDays: number;
}

const AVAILABLE_MODULES: FeatureModule[] = [
  {
    id: 'auth',
    name: 'User Logins & Role Permissions',
    desc: 'Secure email/social signups, password resets, and admin access levels.',
    icon: <Lock className="w-4 h-4 text-[#155EEF]" />,
    category: 'core',
    estimatedDays: 4,
  },
  {
    id: 'database',
    name: 'Database & Cloud API Backend',
    desc: 'Fast PostgreSQL / Supabase backend with protected records.',
    icon: <Layers className="w-4 h-4 text-[#155EEF]" />,
    category: 'backend',
    estimatedDays: 5,
  },
  {
    id: 'payments',
    name: 'Payment Gateway & Checkout',
    desc: 'Accept credit cards, GCash, Maya, or Stripe with automated invoices.',
    icon: <CreditCard className="w-4 h-4 text-emerald-600" />,
    category: 'backend',
    estimatedDays: 4,
  },
  {
    id: 'ai-agents',
    name: 'Smart AI Helpers & Automations',
    desc: 'Gemini AI integrations for smart search, autofill, or support.',
    icon: <Cpu className="w-4 h-4 text-[#D92D20]" />,
    category: 'advanced',
    estimatedDays: 5,
  },
  {
    id: 'realtime',
    name: 'Real-Time Sync & Live Updates',
    desc: 'Instant updates without refreshing: live maps, feeds, or messaging.',
    icon: <Activity className="w-4 h-4 text-[#F5C400]" />,
    category: 'advanced',
    estimatedDays: 4,
  },
  {
    id: 'speed-seo',
    name: 'Sub-Second Speed & Google SEO',
    desc: 'Lighthouse 95+ score guarantee, instant caching, and meta tags.',
    icon: <Zap className="w-4 h-4 text-[#F5C400]" />,
    category: 'core',
    estimatedDays: 3,
  },
];

interface ProjectScopeEstimatorProps {
  onClose?: () => void;
  onApplyScopeToContact?: (scopeSummary: string) => void;
}

export const ProjectScopeEstimator: React.FC<ProjectScopeEstimatorProps> = ({
  onClose,
  onApplyScopeToContact
}) => {
  const [model, setModel] = useState<PartnershipModel>('one-time');
  const [projectType, setProjectType] = useState<ProjectType>('webapp');
  const [selectedModules, setSelectedModules] = useState<string[]>([
    'auth',
    'database',
    'speed-seo'
  ]);
  const [copied, setCopied] = useState(false);

  const toggleModule = (id: string) => {
    setSelectedModules((prev) => 
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const resetToDefault = () => {
    setModel('one-time');
    setProjectType('webapp');
    setSelectedModules(['auth', 'database', 'speed-seo']);
  };

  // Dynamic calculations based on selections
  const { timeline, deliverables, summaryTitle } = useMemo(() => {
    const totalDays = selectedModules.reduce((acc, modId) => {
      const found = AVAILABLE_MODULES.find((m) => m.id === modId);
      return acc + (found ? found.estimatedDays : 0);
    }, 10); // Base 10 days for UI & project scaffolding

    let timelineText = '';
    if (model === 'monthly') {
      timelineText = 'Immediate Start · Dedicated Monthly Dev Bandwidth';
    } else if (totalDays <= 14) {
      timelineText = '1 to 2 Weeks (Fast-Track Delivery)';
    } else if (totalDays <= 24) {
      timelineText = '2 to 4 Weeks (Standard Milestone Delivery)';
    } else {
      timelineText = '4 to 6 Weeks (Full-Scale Custom System)';
    }

    const typeNames: Record<ProjectType, string> = {
      webapp: 'Custom Web Application',
      marketing: 'High-Converting Website',
      portal: 'Business Admin & Team Portal',
      speed: 'Performance & SEO Overhaul'
    };

    const modelNames: Record<PartnershipModel, string> = {
      'one-time': '1-Time Milestone Payment (50/50 Split)',
      'monthly': 'Monthly Web App Maintenance Retainer',
      'bundle': '1-Time Build + Monthly Maintenance Care'
    };

    const moduleNames = selectedModules.map((id) => {
      return AVAILABLE_MODULES.find((m) => m.id === id)?.name || id;
    });

    return {
      timeline: timelineText,
      deliverables: [
        `Architecture & UI: ${typeNames[projectType]}`,
        `Partnership Terms: ${modelNames[model]}`,
        ...moduleNames,
        '100% Full Source Code Ownership & Repository Transfer',
        'Free 30-Day Post-Launch Bug Warranty Included'
      ],
      summaryTitle: `${typeNames[projectType]} (${modelNames[model].split(' ')[0]})`
    };
  }, [model, projectType, selectedModules]);

  // Generate formatted inquiry text
  const inquiryBody = useMemo(() => {
    const list = deliverables.map((d) => `  • ${d}`).join('\n');
    const recipient = PROFILE_INFO.name.split(' ')[0] || 'Will';
    return `Hi ${recipient},\n\nI configured this project agreement on your portfolio estimator and would like to discuss terms:\n\nScope Summary:\n${list}\n\nEstimated Timeline: ${timeline}\nPayment Term: Based on discussion & agreement\n\nPlease let me know when you are available for a brief discussion!\n\nBest regards,`;
  }, [deliverables, timeline]);

  const handleCopy = () => {
    navigator.clipboard.writeText(inquiryBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const mailtoUrl = `mailto:${PROFILE_INFO.email}?subject=${encodeURIComponent(`Project Scope Inquiry: ${summaryTitle}`)}&body=${encodeURIComponent(inquiryBody)}`;

  const handleJumpToContact = () => {
    if (onApplyScopeToContact) {
      onApplyScopeToContact(summaryTitle);
    }
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-xl overflow-hidden font-sans text-[#17191D]">
      {/* Top Banner Accent */}
      <div className="h-1.5 gundam-tricolor-bar w-full" />

      {/* Header */}
      <div className="p-5 sm:p-7 bg-[#FCFBF7] border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#155EEF]/10 text-[#155EEF] font-bold text-xs uppercase tracking-wider mb-2">
            <Sliders className="w-3.5 h-3.5 text-[#155EEF]" />
            <span>Interactive Scope Configurator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#17191D] tracking-tight">
            Design Your Custom Scope &amp; Agreement
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-normal mt-0.5">
            Select your preferred payment structure and features to generate a clear, transparent scope proposal.
          </p>
        </div>

        <button
          onClick={resetToDefault}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-300 text-xs font-semibold shadow-2xs transition-colors cursor-pointer self-start sm:self-auto"
          title="Reset selections to defaults"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      <div className="p-5 sm:p-7 space-y-7">
        
        {/* =========================================================================
            STEP 1: PARTNERSHIP & PAYMENT MODEL
           ========================================================================= */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-md bg-[#155EEF] text-white flex items-center justify-center text-[10px] font-black">1</span>
            <span>Choose Payment &amp; Partnership Model</span>
          </label>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              {
                id: 'one-time',
                title: 'Fixed Milestone Payment',
                badge: 'Fixed 1-Time Build',
                desc: 'Milestone payment (e.g. 50% deposit / 50% on final launch). Full code ownership upon handover.',
                accent: 'border-[#D92D20] bg-white ring-2 ring-red-500/20',
                checkColor: 'border-[#D92D20] bg-[#D92D20] text-white',
                badgeColor: 'bg-red-50 text-[#D92D20] border-red-200',
                titleColor: 'text-[#17191D]',
                descColor: 'text-slate-500',
              },
              {
                id: 'monthly',
                title: 'Monthly Maintenance Retainer',
                badge: 'Continuous Care',
                desc: 'Agreed monthly dev bandwidth for updates, server health, bug fixes & priority support. Cancel anytime.',
                accent: 'border-[#155EEF] bg-blue-50/50 ring-2 ring-blue-500/20',
                checkColor: 'border-[#155EEF] bg-[#155EEF] text-white',
                badgeColor: 'bg-blue-100 text-[#155EEF] border-blue-200',
                titleColor: 'text-[#17191D]',
                descColor: 'text-slate-500',
              },
              {
                id: 'bundle',
                title: 'Fixed Build + Monthly Care Bundle',
                badge: 'Complete Setup',
                desc: 'Complete fixed project build seamlessly transitioning into ongoing monthly care post-launch.',
                accent: 'border-[#F5C400] bg-amber-50/50 ring-2 ring-amber-500/20',
                checkColor: 'border-[#946C00] bg-[#F5C400] text-[#17191D]',
                badgeColor: 'bg-amber-100 text-[#946C00] border-amber-200',
                titleColor: 'text-[#17191D]',
                descColor: 'text-slate-500',
              }
            ].map((opt) => {
              const isSelected = model === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setModel(opt.id as PartnershipModel)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between relative select-none ${
                    isSelected 
                      ? `${opt.accent} shadow-md` 
                      : 'bg-slate-50 hover:bg-white border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border shadow-2xs ${
                        isSelected ? opt.badgeColor : 'bg-white text-slate-700 border-slate-200'
                      }`}>
                        {opt.badge}
                      </span>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        isSelected ? opt.checkColor : 'border-slate-300'
                      }`}>
                        {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                    </div>
                    <div className={`font-bold text-sm leading-snug ${
                      isSelected ? opt.titleColor : 'text-[#17191D]'
                    }`}>
                      {opt.title}
                    </div>
                  </div>
                  <p className={`text-[11px] mt-2 font-normal leading-relaxed ${
                    isSelected ? opt.descColor : 'text-slate-500'
                  }`}>
                    {opt.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            STEP 2: PROJECT TYPE / FOUNDATION
           ========================================================================= */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-md bg-[#155EEF] text-white flex items-center justify-center text-[10px] font-black">2</span>
            <span>Select Project Foundation</span>
          </label>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: 'webapp', title: 'Custom Web App', sub: 'Interactive React/Next.js tool' },
              { id: 'marketing', title: 'Marketing Website', sub: 'High conversion brand site' },
              { id: 'portal', title: 'Admin & Team Portal', sub: 'Internal CRM & operations' },
              { id: 'speed', title: 'Speed & SEO Overhaul', sub: 'Under 1 sec loading guarantee' },
            ].map((p) => {
              const isSelected = projectType === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setProjectType(p.id as ProjectType)}
                  className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-[#17191D] text-white border-[#17191D] shadow-md' 
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-[#17191D]'
                  }`}
                >
                  <div className="font-bold text-xs">{p.title}</div>
                  <div className={`text-[10.5px] mt-0.5 truncate ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {p.sub}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            STEP 3: KEY MODULES & DELIVERABLES (CHECKBOXES)
           ========================================================================= */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-[#155EEF] text-white flex items-center justify-center text-[10px] font-black">3</span>
              <span>Select Features &amp; Modules ({selectedModules.length} selected)</span>
            </label>
            <span className="text-[11px] text-slate-500 font-medium">Click to include or remove</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {AVAILABLE_MODULES.map((mod) => {
              const isChecked = selectedModules.includes(mod.id);
              return (
                <div
                  key={mod.id}
                  onClick={() => toggleModule(mod.id)}
                  className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-start gap-3 select-none ${
                    isChecked
                      ? 'bg-blue-50/40 border-[#155EEF] shadow-xs'
                      : 'bg-white hover:bg-slate-50/80 border-slate-200 opacity-80 hover:opacity-100'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md border-2 mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                    isChecked ? 'border-[#155EEF] bg-[#155EEF] text-white' : 'border-slate-300 bg-white'
                  }`}>
                    {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 font-bold text-xs text-[#17191D]">
                      {mod.icon}
                      <span className="truncate">{mod.name}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-normal leading-relaxed mt-1">
                      {mod.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =========================================================================
            STEP 4: ESTIMATED TIMELINE & SUMMARY CARDS
           ========================================================================= */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-[#17191D] text-white space-y-5 shadow-xl border-2 border-slate-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/15">
            <div>
              <span className="text-[10px] font-mono uppercase text-[#F5C400] font-bold tracking-wider">
                Tailored Agreement Proposal
              </span>
              <h4 className="text-lg sm:text-xl font-black text-white tracking-tight mt-0.5">
                {summaryTitle}
              </h4>
            </div>

            {/* Estimated Timeline Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold">
              <Clock className="w-4 h-4 text-[#F5C400]" />
              <span>Timeline: <strong>{timeline}</strong></span>
            </div>
          </div>

          {/* Included Deliverables Preview */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Estimated Agreement Deliverables:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-200">
              {deliverables.map((item, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rate Notice */}
          <div className="pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#F5C400]" />
              <span>Rates finalized through discussion &amp; agreed scope prior to commencement.</span>
            </div>

            <div className="text-[11px] font-mono text-emerald-400 font-semibold">
              ✓ Free 30-Day Bug Warranty Included
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={mailtoUrl}
              className="px-5 py-3 rounded-xl bg-[#155EEF] hover:bg-[#104ECC] text-white font-bold text-xs shadow-lg transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#F5C400]" />
              <span>Email This Scope to {PROFILE_INFO.name.split(' ')[0] || 'Will'}</span>
            </a>

            <button
              onClick={handleCopy}
              className="px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer border border-white/20"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-300" />
                  <span>Copy Agreement Brief</span>
                </>
              )}
            </button>

            <button
              onClick={handleJumpToContact}
              className="px-4 py-3 rounded-xl bg-white text-[#17191D] hover:bg-slate-100 font-bold text-xs transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <span>Fill Contact Letter</span>
              <ArrowRight className="w-4 h-4 text-[#155EEF]" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
