import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PRICING_PACKAGES, PricingPackage } from '../../data/portfolio';
import { 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  ArrowUpRight, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  Code2, 
  Calendar,
  Lock,
  MessagesSquare,
  Folder,
  FolderOpen,
  HeartHandshake
} from 'lucide-react';
import { FunSectionBackground } from '../ui/FunSectionBackground';
import { DoodleInteractable } from '../ui/DoodleInteractable';

/**
 * Playful hand-drawn doodle arrow & annotation pointing to the folder trigger
 */
const DoodleRatesIndicator: React.FC<{ isOpen: boolean; onClick: () => void }> = ({ isOpen, onClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="cursor-pointer select-none relative inline-flex items-center gap-2 group"
      title={isOpen ? "Click to close rates folder" : "Click to open rates & pricing folder"}
    >
      {/* Animated squiggly doodle arrow */}
      <motion.div
        animate={isOpen ? { rotate: [0, -8, 0], y: [0, 2, 0] } : { y: [0, -5, 0], x: [0, 2, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
        className="shrink-0"
      >
        <svg 
          width="50" 
          height="36" 
          viewBox="0 0 54 38" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-white filter drop-shadow-xs"
        >
          <motion.path 
            d="M 6 12 C 18 4, 32 6, 42 22" 
            stroke="#FFFFFF" 
            strokeWidth="2.8" 
            strokeLinecap="round" 
            strokeDasharray={isOpen ? "none" : "5 2"}
            fill="none"
          />
          <path 
            d="M 32 23 L 43 23 L 42 12" 
            stroke="#FFFFFF" 
            strokeWidth="2.8" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            fill="none"
          />
          <motion.path
            animate={{ scale: [1, 1.3, 1], rotate: [0, 45, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            d="M 12 28 Q 14 32 18 33 Q 14 34 12 38 Q 10 34 6 33 Q 10 32 12 28 Z"
            fill="#F5C400"
          />
        </svg>
      </motion.div>

      {/* Hand-drawn styled text bubble */}
      <div className="bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/40 shadow-md flex items-center gap-1.5 group-hover:scale-105 transition-transform">
        <span className="text-[12px] font-bold text-[#17191D] tracking-tight">
          {isOpen ? 'Folder open! Click to fold' : 'psst... click to view rates & pricing!'}
        </span>
        <span className="text-xs">
          {isOpen ? '📂' : '🏷️'}
        </span>
      </div>
    </motion.div>
  );
};

export const RatesSection: React.FC = () => {
  // Folder minimized / folded by default
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'How does pricing and payment work?',
      a: 'Rates are discussed and agreed upon together based on project scope and deliverables. For 1-time builds, payments follow milestone deliveries (e.g., 50% deposit to begin, and 50% upon final launch and sign-off). For monthly webapp maintenance, we establish a flat monthly agreement with zero lock-in.'
    },
    {
      q: 'Can I do a 1-time payment for the build and add monthly maintenance later?',
      a: 'Yes, absolutely! Most clients build their web application as a 1-time milestone project, and then transition into monthly maintenance for ongoing feature updates, security patches, and performance monitoring.'
    },
    {
      q: 'What is included in monthly webapp maintenance?',
      a: 'Dedicated monthly engineering bandwidth, regular security and dependency updates, continuous bug fixing, performance monitoring, database backups, and direct 1-on-1 priority support.'
    },
    {
      q: 'What happens if a bug appears after the website goes live?',
      a: 'Every project comes with an automatic 30-day bug warranty. If any glitch, formatting bug, or error appears within 30 days of launch, I will fix it immediately at zero additional charge.'
    }
  ];

  return (
    <section 
      id="rates" 
      className="py-16 md:py-24 bg-[#D92D20] text-white relative overflow-hidden font-sans border-t border-red-700/60"
    >
      {/* Fun Dynamic Animated Background */}
      <FunSectionBackground theme="red" variant="rates" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-6 sm:mb-8"
        >
          {/* Header Pill with Gundam Tricolor Dots */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/15 backdrop-blur-xs rounded-full text-xs font-semibold text-white mb-3 border border-white/25 shadow-2xs">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#155EEF]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5C400]" />
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            <span className="text-[11px] font-bold text-white uppercase tracking-wider">
              Discussion &amp; Agreement Based
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Nature of Work
          </h2>

          <p className="mt-3 text-sm sm:text-base text-red-100 leading-relaxed font-normal">
            No surprise invoices or rigid pricing. My rates are discussed and agreed upon together based on your project requirements—available as a 1-time project payment or monthly webapp maintenance.
          </p>
        </motion.div>

        {/* Doodle Animation & Callout */}
        <div className="flex justify-end mb-2 pr-2 sm:pr-4">
          <DoodleRatesIndicator 
            isOpen={isFolderOpen} 
            onClick={() => setIsFolderOpen(!isFolderOpen)} 
            />
        </div>

        {/* =========================================================================
            3D FOLDER CASING: MINIMIZED BY DEFAULT, UNFOLDS ON INTERACTION
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
              scale: isFolderOpen ? [1, 1.015, 1] : 1,
              opacity: isFolderOpen ? 0.35 : 0.2
            }}
            transition={{ duration: 0.6 }}
            className="absolute inset-x-3 -bottom-3 h-12 bg-black/20 rounded-3xl blur-lg pointer-events-none" 
          />

          {/* Top Folder Tab */}
          <div className="flex items-center justify-between px-2 sm:px-4 -mb-px relative z-20">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setIsFolderOpen(!isFolderOpen)}
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-[#17191D] text-white rounded-t-lg font-mono text-xs font-bold tracking-wider shadow-md hover:bg-black transition-colors cursor-pointer border-2 border-b-0 border-[#17191D]"
                aria-expanded={isFolderOpen}
                aria-label="Toggle rates folder"
              >
                {isFolderOpen ? (
                  <FolderOpen className="w-4 h-4 text-[#F5C400]" />
                ) : (
                  <Folder className="w-4 h-4 text-[#F5C400]" />
                )}
                <span>FOLDER 07 // NATURE OF WORK &amp; RATES</span>
                <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
              </button>

              <div className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-t-md bg-white/90 text-slate-900 border border-b-0 border-slate-900/30 text-[11px] font-mono font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5C400]" />
                <span>SPEC: 1-TIME &amp; MONTHLY MAINTENANCE</span>
              </div>
            </div>

            {/* Quick fold/unfold button */}
            <button
              onClick={() => setIsFolderOpen(!isFolderOpen)}
              className="px-3 py-1.5 rounded-t-md bg-white hover:bg-slate-100 text-[#17191D] text-xs font-bold font-mono shadow-xs border border-b-0 border-[#17191D] flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>{isFolderOpen ? 'FOLD FOLDER' : 'UNFOLD FOLDER'}</span>
              <span className="text-[10px]">{isFolderOpen ? '▲' : '▼'}</span>
            </button>
          </div>

          {/* Folder Sleeve Body */}
          <div className="bg-white rounded-b-xl rounded-tr-xl p-4 sm:p-6 shadow-2xl border-2 border-[#17191D] relative overflow-hidden">
            
            {/* Signature Gundam Multi-Color Stripe */}
            <div className="h-1 w-full flex select-none pointer-events-none mb-4">
              <div className="flex-1 bg-[#155EEF]" />
              <div className="flex-1 bg-[#F5C400]" />
              <div className="flex-1 bg-[#D92D20]" />
              <div className="w-16 bg-slate-200" />
            </div>

            {/* Inner Content Sleeve */}
            <div className="bg-white text-[#17191D] rounded-lg p-2 sm:p-4">

              {/* =========================================================================
                  STATE A: FOLDED PREVIEW (MINIMIZED BY DEFAULT)
                 ========================================================================= */}
              {!isFolderOpen && (
                <div className="space-y-4 py-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                    <div>
                      <h4 className="font-bold text-base text-[#17191D]">
                        Rates Based on Discussion &amp; Project Agreement
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5 font-normal">
                        Choose between a fixed 1-time milestone payment or ongoing monthly webapp maintenance. Click "Unfold Rates Folder" to inspect deliverables &amp; details.
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <DoodleInteractable variant="button" accentColor="#F5C400" doodleText="UNFOLD 📂">
                        <button
                          onClick={() => setIsFolderOpen(true)}
                          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#D92D20] hover:bg-[#B42318] text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                        >
                          <span>Unfold Rates Folder</span>
                          <ChevronDown className="w-4 h-4 text-[#F5C400] animate-bounce" />
                        </button>
                      </DoodleInteractable>
                    </div>
                  </div>

                  {/* Quick Summary Pill Bar of the 3 Pricing Packages */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {PRICING_PACKAGES.map((pkg) => {
                      const isRed = pkg.zone === 'red' || pkg.id === 'one-time-payment';
                      const isBlue = pkg.zone === 'blue' || pkg.id === 'monthly-maintenance';

                      return (
                        <motion.div 
                          key={pkg.id}
                          whileHover={{ y: -5, scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setIsFolderOpen(true)}
                          className={`p-3.5 rounded-xl border transition-all cursor-pointer shadow-2xs group ${
                            isRed
                              ? 'bg-white border-[#D92D20] ring-1 ring-[#D92D20]/30 hover:shadow-md'
                              : isBlue 
                              ? 'bg-blue-50/70 border-[#155EEF] ring-1 ring-[#155EEF]/30 hover:shadow-md' 
                              : 'bg-slate-50 hover:bg-white border-slate-200 hover:border-slate-300 hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className="text-[10px] font-bold uppercase tracking-wide truncate text-slate-500">
                              {pkg.timeline}
                            </span>
                            {pkg.badge && (
                              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                                isRed ? 'bg-[#D92D20] text-white shadow-xs' : isBlue ? 'bg-[#155EEF] text-white' : 'bg-[#17191D] text-white'
                              }`}>
                                {pkg.badge}
                              </span>
                            )}
                          </div>

                          <div className={`font-bold text-sm text-[#17191D] transition-colors truncate ${
                            isRed ? 'group-hover:text-[#D92D20]' : isBlue ? 'group-hover:text-[#155EEF]' : 'group-hover:text-[#17191D]'
                          }`}>
                            {pkg.name}
                          </div>

                          <div className="mt-2 pt-2 border-t border-slate-200/70">
                            <div className="text-sm font-black text-[#17191D] flex items-baseline gap-1">
                              <span>{pkg.price}</span>
                            </div>
                            <div className="text-[11px] text-slate-500 font-medium">
                              {pkg.billingPeriod}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* 4 Guarantees Compact Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] text-slate-600 font-semibold border-t border-slate-100">
                    <span className="flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#155EEF]" />
                      <span>100% Code Ownership</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>30-Day Bug Warranty</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessagesSquare className="w-3.5 h-3.5 text-amber-700" />
                      <span>Direct 1-on-1 Access</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-purple-600" />
                      <span>Sub-Second Loading Speed</span>
                    </span>
                  </div>
                </div>
              )}

              {/* =========================================================================
                  STATE B: UNFOLDED FULL PRICING PACKAGES + GUARANTEE + FAQS
                 ========================================================================= */}
              <AnimatePresence>
                {isFolderOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="overflow-hidden space-y-6 pt-1"
                  >
                    {/* Header: Transparent Rates & Payment Agreements */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                      <div>
                        <h4 className="font-bold text-base text-[#17191D] flex items-center gap-2">
                          <span>Transparent Rates &amp; Payment Agreements</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-[#155EEF]">
                            3 Standard Tiers
                          </span>
                        </h4>
                        <p className="text-xs text-slate-500 font-normal mt-0.5">
                          All options include direct collaboration, complete source code ownership, and 30-day bug warranty.
                        </p>
                      </div>
                    </div>

                    {/* 3 Pricing Cards Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
                      {PRICING_PACKAGES.map((pkg, idx) => {
                        const isRed = pkg.zone === 'red' || pkg.id === 'one-time-payment';
                        const isBlue = pkg.zone === 'blue' || pkg.id === 'monthly-maintenance';

                        return (
                          <motion.div
                            key={pkg.id}
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35, delay: idx * 0.08 }}
                            whileHover={{ y: -6, scale: 1.015 }}
                            className={`rounded-2xl flex flex-col justify-between overflow-hidden relative transition-all duration-300 ${
                              isRed
                                ? 'bg-white border-3 border-[#D92D20] shadow-xl ring-4 ring-red-500/15'
                                : isBlue
                                ? 'bg-white border-2 border-blue-200 hover:border-[#155EEF] shadow-md hover:shadow-lg'
                                : 'bg-[#F8FAFC] border-2 border-slate-200 shadow-md hover:border-slate-300'
                            }`}
                          >
                            {/* Popular Pill Badge on Featured Card */}
                            {pkg.badge && (
                              <div className={`py-1.5 px-4 text-center font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs ${
                                isRed ? 'bg-[#D92D20] text-white' : isBlue ? 'bg-[#155EEF] text-white' : 'bg-[#17191D] text-white'
                              }`}>
                                <Sparkles className="w-3.5 h-3.5 text-[#F5C400]" />
                                <span>{pkg.badge}</span>
                              </div>
                            )}

                            {/* Card Header & Price */}
                            <div className="p-5 sm:p-6 space-y-3.5">
                              <div>
                                <h3 className="text-xl font-black text-[#17191D] tracking-tight">
                                  {pkg.name}
                                </h3>
                                <p className="text-xs text-slate-500 mt-1 font-normal leading-relaxed">
                                  {pkg.tagline}
                                </p>
                              </div>

                              {/* Price Tag */}
                              <div className="py-2.5 border-y border-slate-200">
                                <div className="text-2xl font-black text-[#17191D] tracking-tight">
                                  {pkg.price}
                                </div>
                                <div className="text-xs text-slate-500 font-medium mt-0.5 flex items-center gap-1.5">
                                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                    isRed ? 'bg-[#D92D20]' : isBlue ? 'bg-[#155EEF]' : 'bg-slate-500'
                                  }`} />
                                  <span>{pkg.billingPeriod}</span>
                                </div>
                              </div>

                              {/* Timeline Badge */}
                              <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white py-1.5 px-2.5 rounded-lg border border-slate-200">
                                <Clock className={`w-3.5 h-3.5 shrink-0 ${
                                  isRed ? 'text-[#D92D20]' : isBlue ? 'text-[#155EEF]' : 'text-slate-500'
                                }`} />
                                <span>Estimated Timeline: <strong>{pkg.timeline}</strong></span>
                              </div>

                              {/* Ideal For */}
                              <div className="text-xs text-slate-600 leading-relaxed font-normal">
                                <strong className="text-slate-800">Ideal for:</strong> {pkg.idealFor}
                              </div>

                              {/* Included Features List */}
                              <div className="space-y-1.5 pt-0.5">
                                <div className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
                                  What's Included:
                                </div>
                                {pkg.features.map((feat, i) => (
                                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                                    <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                                      isRed ? 'text-[#D92D20]' : 'text-emerald-600'
                                    }`} />
                                    <span>{feat}</span>
                                  </div>
                                ))}
                              </div>

                              {/* Deliverables List */}
                              <div className="pt-2 border-t border-slate-200 space-y-1">
                                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                  Key Deliverables:
                                </div>
                                <ul className="text-xs text-slate-600 space-y-0.5">
                                  {pkg.deliverables.map((del, d) => (
                                    <li key={d} className="flex items-center gap-1.5">
                                      <span className={`w-1 h-1 rounded-full ${
                                        isRed ? 'bg-[#D92D20]' : isBlue ? 'bg-[#155EEF]' : 'bg-slate-400'
                                      }`} />
                                      <span>{del}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            {/* Card CTA Action */}
                            <div className="p-5 sm:p-6 pt-0">
                              <a
                                href="#contact"
                                className={`w-full py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer ${
                                  isRed
                                    ? 'bg-[#D92D20] hover:bg-[#B42318] text-white shadow-red-500/25 hover:scale-102'
                                    : isBlue
                                    ? 'bg-[#155EEF] hover:bg-[#104ECC] text-white shadow-blue-500/25 hover:scale-102'
                                    : 'bg-[#17191D] hover:bg-black text-white hover:scale-102'
                                }`}
                              >
                                <span>{pkg.ctaText}</span>
                                <ArrowUpRight className="w-4 h-4 text-[#F5C400]" />
                              </a>
                            </div>

                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Standard With Every Project Guarantee */}
                    <div className="bg-slate-50 rounded-2xl p-5 sm:p-8 border border-slate-200">
                      <div className="text-center max-w-xl mx-auto mb-6">
                        <h4 className="text-lg font-black text-[#17191D] tracking-tight">
                          Standard With Every Project
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5 font-normal">
                          Peace of mind is built into every engagement, regardless of budget size.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5">
                          <div className="w-8 h-8 rounded-lg bg-blue-100 text-[#155EEF] flex items-center justify-center">
                            <Lock className="w-4 h-4" />
                          </div>
                          <h5 className="font-bold text-xs text-[#17191D]">100% Code Ownership</h5>
                          <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                            You own all repository source code and assets upon delivery.
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5">
                          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                            <ShieldCheck className="w-4 h-4" />
                          </div>
                          <h5 className="font-bold text-xs text-[#17191D]">30-Day Bug Warranty</h5>
                          <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                            Zero surprise costs. Bugs within 30 days are fixed for free.
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5">
                          <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                            <MessagesSquare className="w-4 h-4" />
                          </div>
                          <h5 className="font-bold text-xs text-[#17191D]">Direct Communication</h5>
                          <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                            Speak directly to the engineer writing your code via Slack or email.
                          </p>
                        </div>

                        <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5">
                          <div className="w-8 h-8 rounded-lg bg-rose-100 text-[#D92D20] flex items-center justify-center">
                            <HeartHandshake className="w-4 h-4" />
                          </div>
                          <h5 className="font-bold text-xs text-[#17191D]">Dedicated Care</h5>
                          <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                            Attentive handover, deployment guidance, and dependable ongoing support.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* FAQ Accordion */}
                    <div className="space-y-2.5 max-w-3xl mx-auto">
                      <div className="text-center mb-4">
                        <h4 className="text-lg font-black text-[#17191D] tracking-tight">
                          Frequently Asked Questions
                        </h4>
                        <p className="text-xs text-slate-500 font-normal">
                          Quick answers about hiring, payments, and deliverables.
                        </p>
                      </div>

                      {faqs.map((faq, i) => {
                        const isOpen = openFaq === i;

                        return (
                          <div
                            key={i}
                            className="rounded-xl bg-slate-50 border border-slate-200 overflow-hidden transition-colors"
                          >
                            <button
                              onClick={() => setOpenFaq(isOpen ? null : i)}
                              className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left gap-3 font-bold text-xs sm:text-sm text-[#17191D] hover:text-[#155EEF] transition-colors cursor-pointer"
                              aria-expanded={isOpen}
                            >
                              <span>{faq.q}</span>
                              <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                                isOpen ? 'rotate-180 text-[#155EEF]' : ''
                              }`} />
                            </button>

                            <AnimatePresence>
                              {isOpen && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden"
                                >
                                  <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-200/80 font-normal bg-white">
                                    {faq.a}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                    {/* Bottom Close Button Bar */}
                    <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <a
                          href="#contact"
                          className="text-xs font-bold text-[#155EEF] hover:underline flex items-center gap-1.5"
                        >
                          <span>Have questions or a custom scope? Contact me directly →</span>
                        </a>
                      </div>

                      <button
                        onClick={() => setIsFolderOpen(false)}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer self-end sm:self-auto"
                      >
                        <span>Fold rates folder</span>
                        <ChevronUp className="w-4 h-4 text-slate-500" />
                      </button>
                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};
