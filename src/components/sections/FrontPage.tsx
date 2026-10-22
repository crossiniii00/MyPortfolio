import React from 'react';
import { motion } from 'motion/react';
import { PROFILE_INFO } from '../../data/portfolio';
import { AnimatedAvatar } from '../ui/AnimatedAvatar';
import { ArrowDown, Mail, ArrowRight, Sparkles, Shield, Cpu } from 'lucide-react';
import { FunSectionBackground } from '../ui/FunSectionBackground';
import { DoodleInteractable } from '../ui/DoodleInteractable';

export const FrontPage: React.FC = () => {
  return (
    <section 
      id="intro"
      className="relative min-h-[88vh] lg:min-h-[92vh] bg-white text-[#17191D] pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden flex flex-col items-center justify-center font-sans"
    >
      {/* Fun Dynamic Animated Background with Gundam Diagonal Speed Stripes */}
      <FunSectionBackground theme="white" variant="hero" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 w-full text-center flex flex-col items-center">
        
        {/* Animated Avatar with Floating Motion, Natural Blinking & Gundam Halo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 relative"
        >
          {/* Parallel Accent Lines Frame behind the Avatar */}
          <div className="absolute -inset-x-8 top-1/2 -translate-y-1/2 h-8 pointer-events-none -z-10 hidden sm:flex flex-col justify-center gap-1 opacity-70">
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#D92D20] to-transparent" />
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#F5C400] to-transparent" />
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#155EEF] to-transparent" />
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-white to-transparent" />
          </div>

          <AnimatedAvatar />
        </motion.div>

        {/* Introductory Pill with Gundam 4-Color Parallel Bars & Doodle Hover */}
        <DoodleInteractable variant="tab" accentColor="#F5C400">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="inline-flex items-center gap-3 px-4 py-1.5 bg-[#17191D] border-2 border-[#17191D] rounded-md text-xs font-mono font-bold text-white mb-5 shadow-md cursor-default"
          >
            {/* 4 Parallel Vertical Color Bars */}
            <div className="flex items-center gap-1 py-0.5">
              <span className="w-1.5 h-3.5 rounded-xs bg-[#D92D20]" title="Red" />
              <span className="w-1.5 h-3.5 rounded-xs bg-[#F5C400]" title="Yellow" />
              <span className="w-1.5 h-3.5 rounded-xs bg-[#155EEF]" title="Blue" />
              <span className="w-1.5 h-3.5 rounded-xs bg-slate-400" title="White" />
            </div>

            <span className="text-xs font-mono font-bold tracking-wider uppercase text-white">
              {PROFILE_INFO.role}
            </span>
          </motion.div>
        </DoodleInteractable>

        {/* Main Centralized Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#17191D] leading-[1.15] text-balance max-w-3xl"
        >
          Building fast websites.{' '}
          <span className="text-[#155EEF] relative inline-block">
            Solving real problems.
            <span className="absolute bottom-1 left-0 right-0 h-1.5 bg-[#155EEF]/20 rounded-full" />
          </span>
        </motion.h1>

        {/* Clean Accent Divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="my-4 flex items-center justify-center gap-1.5"
        >
          <span className="h-1 w-7 rounded bg-[#D92D20]" />
          <span className="h-1 w-7 rounded bg-[#F5C400]" />
          <span className="h-1 w-7 rounded bg-[#155EEF]" />
          <span className="h-1 w-7 rounded bg-slate-300" />
        </motion.div>

        {/* Core Value Statement - Direct & Professional */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.22 }}
          className="text-base sm:text-lg text-[#475467] leading-relaxed max-w-xl text-balance font-normal"
        >
          Freelance full-stack developer crafting fast, responsive websites and bespoke web applications tailored to deliver real results.
        </motion.p>

        {/* Centralized Action Buttons with Doodle Paperplane Tracing Effects */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.26 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 w-full max-w-xs sm:max-w-none"
        >
          <DoodleInteractable variant="button" accentColor="#F5C400" doodleText="EXPLORE PROJECTS 📂" className="w-full sm:w-auto">
            <motion.a
              href="#projects"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#155EEF] hover:bg-[#104ECC] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-md border-2 border-[#155EEF] shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4 text-[#F5C400]" />
            </motion.a>
          </DoodleInteractable>

          <DoodleInteractable variant="button" accentColor="#155EEF" doodleText="SAY HELLO ✉️" className="w-full sm:w-auto">
            <motion.a
              href="#contact"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#17191D] hover:bg-[#252830] text-white font-mono font-bold text-xs uppercase tracking-wider rounded-md border-2 border-[#17191D] shadow-md transition-all cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#F5C400]" />
              <span>Get in Touch</span>
            </motion.a>
          </DoodleInteractable>
        </motion.div>

        {/* Scroll Cue with 4-Color Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mt-12 flex flex-col items-center gap-2"
        >
          <motion.a
            href="#skills"
            whileHover={{ y: 2 }}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#606875] hover:text-[#155EEF] transition-colors group cursor-pointer"
          >
            <span>Scroll to explore sections</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#155EEF] animate-bounce group-hover:text-[#D92D20]" />
          </motion.a>

          {/* Mini Parallel Lines Indicator */}
          <div className="flex items-center gap-1 opacity-70">
            <span className="w-3 h-1 rounded-full bg-[#D92D20]" />
            <span className="w-3 h-1 rounded-full bg-[#F5C400]" />
            <span className="w-3 h-1 rounded-full bg-[#155EEF]" />
            <span className="w-3 h-1 rounded-full bg-slate-300" />
          </div>
        </motion.div>

      </div>
    </section>
  );
};
