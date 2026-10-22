import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PROFILE_INFO } from '../../data/portfolio';
import { 
  Mail, 
  Github, 
  Linkedin, 
  Copy, 
  Check, 
  ArrowUp, 
  Send, 
  Clock, 
  Globe, 
  ArrowUpRight,
  Folder,
  CheckCircle2,
  Phone,
  MessageSquare,
  AlertTriangle
} from 'lucide-react';
import { FunSectionBackground } from '../ui/FunSectionBackground';
import { DoodleInteractable } from '../ui/DoodleInteractable';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PROFILE_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(PROFILE_INFO.phone || '09661345592');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const mailtoUrl = `mailto:${PROFILE_INFO.email}?subject=${encodeURIComponent('Project Inquiry / Collaboration')}`;

  return (
    <section 
      id="contact" 
      className="py-16 md:py-24 bg-[#F5C400] text-[#17191D] relative overflow-hidden font-sans"
    >
      {/* Fun Dynamic Animated Background */}
      <FunSectionBackground theme="yellow" variant="contact" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-lg mx-auto mb-6 sm:mb-8"
        >
          {/* Header Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#17191D] rounded-md text-xs font-semibold text-[#F5C400] mb-3 shadow-xs">
            <Mail className="w-3.5 h-3.5 text-[#F5C400]" />
            <span className="text-[11px] font-bold text-[#F5C400] uppercase tracking-wider font-mono">
              DIRECT INQUIRY // 08
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#17191D]">
            Let’s work together.
          </h2>
        </motion.div>

        {/* Sharp Folderized Contact Card */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="relative"
        >
          
          {/* Top Folder Tab Header */}
          <div className="flex items-center justify-between px-2 sm:px-4 -mb-px relative z-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 bg-[#17191D] text-white rounded-t-lg font-mono text-xs font-bold tracking-wider shadow-md border-2 border-b-0 border-[#17191D]">
              <Folder className="w-3.5 h-3.5 text-[#F5C400]" />
              <span>FOLDER 08 // CONTACT ARCHIVE</span>
              <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-1" />
            </div>

            <div className="font-mono text-[10px] sm:text-xs font-bold text-slate-900 bg-white/80 backdrop-blur-xs px-2.5 py-1 rounded-t-md border border-b-0 border-slate-900/20">
              SPEC: DIRECT COMMS
            </div>
          </div>

          {/* Sharp Folder Jacket Body */}
          <div className="bg-white rounded-b-xl rounded-tr-xl p-6 sm:p-8 md:p-9 shadow-2xl border-2 border-[#17191D] relative overflow-hidden">
            
            {/* Top Multi-Color Architectural Trim */}
            <div className="h-1 w-full flex select-none pointer-events-none mb-6">
              <div className="flex-1 bg-[#155EEF]" />
              <div className="flex-1 bg-[#F5C400]" />
              <div className="flex-1 bg-[#D92D20]" />
              <div className="w-16 bg-slate-200" />
            </div>

            {/* Identity & Verified Status Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b-2 border-slate-100">
              <div className="flex items-center gap-3.5">
                {/* Sharp Monogram Badge */}
                <div className="w-12 h-12 rounded-lg bg-[#155EEF] text-white font-mono font-black text-lg flex items-center justify-center shadow-md shadow-blue-500/20 shrink-0 border border-blue-400">
                  <span>WB</span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl sm:text-3xl font-black text-[#17191D] tracking-tight">
                      {PROFILE_INFO.name}
                    </h3>
                    <span className="text-emerald-800 bg-emerald-50 border border-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded font-mono inline-flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      VERIFIED
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">
                    {PROFILE_INFO.role}
                  </p>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold font-mono self-start sm:self-auto">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>OPEN FOR WORK</span>
              </div>
            </div>

            {/* Small Professional Message */}
            <div className="pt-5 pb-4">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                Have an upcoming project, freelance inquiry, or engineering role? Reach out directly through either channel below:
              </p>
            </div>

            {/* Twin Channel Grid: Balanced 2-Column Cockpit Modules */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              
              {/* Module 1: Direct Email */}
              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border-2 border-slate-200 hover:border-[#155EEF] transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#155EEF]/10 text-[#155EEF] flex items-center justify-center border border-[#155EEF]/20 shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                          DIRECT EMAIL
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium">Primary Inbox</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-[#155EEF] border border-blue-200">
                      FAST REPLY
                    </span>
                  </div>

                  <a
                    href={mailtoUrl}
                    className="text-sm sm:text-base font-bold text-[#17191D] group-hover:text-[#155EEF] transition-colors font-mono tracking-tight block py-2 select-all break-all"
                    title="Click to compose email"
                  >
                    {PROFILE_INFO.email}
                  </a>
                </div>

                {/* Email Actions: Equal 2-Column Grid */}
                <div className="grid grid-cols-2 gap-2 pt-3 mt-2 border-t border-slate-200/80">
                  <DoodleInteractable variant="tab" accentColor="#155EEF">
                    <button
                      onClick={handleCopyEmail}
                      className="w-full py-2 px-2.5 rounded-lg bg-white hover:bg-slate-100 text-[#17191D] text-xs font-semibold border border-slate-300 shadow-2xs transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer font-mono"
                      title="Copy email to clipboard"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-600" />
                          <span>COPY</span>
                        </>
                      )}
                    </button>
                  </DoodleInteractable>

                  <DoodleInteractable variant="button" accentColor="#F5C400" doodleText="COMPOSE ✉️">
                    <a
                      href={mailtoUrl}
                      className="w-full py-2 px-2.5 rounded-lg bg-[#155EEF] hover:bg-[#0E4FD1] text-white text-xs font-bold shadow-xs transition-all active:scale-95 flex items-center justify-center gap-1 cursor-pointer font-mono border border-blue-600"
                    >
                      <Send className="w-3 h-3 text-[#F5C400]" />
                      <span>COMPOSE</span>
                      <ArrowUpRight className="w-3 h-3 text-blue-200" />
                    </a>
                  </DoodleInteractable>
                </div>
              </div>

              {/* Module 2: Cellular Line & SMS */}
              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border-2 border-slate-200 hover:border-amber-400 transition-all flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center border border-amber-500/20 shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
                          DIRECT CONTACT
                        </div>
                        <div className="text-[11px] text-slate-400 font-medium">Cellular &amp; SMS</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      PHILIPPINES
                    </span>
                  </div>

                  <a
                    href="tel:09661345592"
                    className="text-base sm:text-lg font-bold text-[#17191D] group-hover:text-amber-800 transition-colors font-mono tracking-tight block py-2 select-all"
                    title="Click to dial"
                  >
                    0966 134 5592
                  </a>
                </div>

                {/* Mobile Actions: Equal 2-Column Grid */}
                <div className="grid grid-cols-2 gap-2 pt-3 mt-2 border-t border-slate-200/80">
                  <DoodleInteractable variant="tab" accentColor="#D92D20">
                    <button
                      onClick={handleCopyPhone}
                      className="w-full py-2 px-2.5 rounded-lg bg-white hover:bg-slate-100 text-[#17191D] text-xs font-semibold border border-slate-300 shadow-2xs transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer font-mono"
                      title="Copy phone number"
                    >
                      {copiedPhone ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-600" />
                          <span>COPY</span>
                        </>
                      )}
                    </button>
                  </DoodleInteractable>

                  <DoodleInteractable variant="button" accentColor="#155EEF" doodleText="SMS 💬">
                    <a
                      href="sms:09661345592"
                      className="w-full py-2 px-2.5 rounded-lg bg-[#17191D] hover:bg-black text-white text-xs font-bold shadow-xs transition-all active:scale-95 flex items-center justify-center gap-1 cursor-pointer font-mono border border-slate-800"
                    >
                      <MessageSquare className="w-3 h-3 text-[#F5C400]" />
                      <span>SEND SMS</span>
                      <ArrowUpRight className="w-3 h-3 text-slate-400" />
                    </a>
                  </DoodleInteractable>
                </div>
              </div>

            </div>

            {/* Dedicated Full-Width Screening Warning Banner */}
            <div className="p-3.5 sm:p-4 rounded-xl bg-amber-500/10 border-2 border-amber-400/70 flex items-start sm:items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-800 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
              </div>
              <div className="text-xs sm:text-[13px] text-amber-950 leading-relaxed font-sans">
                <strong className="font-bold font-mono text-[11px] sm:text-xs uppercase tracking-wide text-amber-900 mr-1.5 block sm:inline">
                  ⚠️ Note · Please Text First:
                </strong>
                <span className="text-slate-800">
                  Kindly send an SMS or text message before calling. Unnamed or unrecognized incoming calls are screened and not answered.
                </span>
              </div>
            </div>

            {/* Sharp Technical Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-3 border-y-2 border-slate-100 text-xs sm:text-sm text-slate-700 font-medium font-sans">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Response time: <strong className="text-slate-900 font-semibold font-mono">Within 24 hours</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#155EEF] shrink-0" />
                <span>Location: <strong className="text-slate-900 font-semibold font-mono">Manila (UTC+8) • Remote</strong></span>
              </div>
            </div>

            {/* Card Footer: Profiles & Back to Top */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
                  PROFILES:
                </span>

                <DoodleInteractable variant="tab" accentColor="#155EEF">
                  <a
                    href={PROFILE_INFO.github}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-300 font-mono"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-500" />
                  </a>
                </DoodleInteractable>

                <DoodleInteractable variant="tab" accentColor="#155EEF">
                  <a
                    href={PROFILE_INFO.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-300 font-mono"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#155EEF]" />
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3 h-3 text-slate-500" />
                  </a>
                </DoodleInteractable>
              </div>

              <DoodleInteractable variant="button" accentColor="#F5C400" doodleText="TOP ⬆️">
                <button
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-[#17191D] font-bold text-xs transition-colors cursor-pointer border border-slate-300 font-mono"
                  title="Back to top of page"
                >
                  <span>TOP</span>
                  <ArrowUp className="w-3.5 h-3.5 text-[#155EEF]" />
                </button>
              </DoodleInteractable>
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};
