import React, { useState, useEffect } from 'react';
import { SHOWCASE_PROJECTS, PROFILE_INFO } from '../../data/portfolio';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { DoodleInteractable } from '../ui/DoodleInteractable';

interface NavbarProps {
  activeSection: 'intro' | 'skills' | 'workstation' | 'projects' | 'ongoing' | 'experience' | 'services' | 'rates' | 'contact';
  onSelectProject?: (projectId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onSelectProject }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProjectClick = (projectId: string) => {
    if (onSelectProject) {
      onSelectProject(projectId);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-sans ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-[#E9EDF2] shadow-sm'
          : 'bg-[#F7F8FA]/90 backdrop-blur-xs border-b border-transparent'
      }`}
    >
      {/* Signature Gundam Tricolor Top Edge */}
      <div className="h-[3px] gundam-tricolor-bar w-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Brand Wordmark linking to #intro */}
          <a
            href="#intro"
            className="flex items-center gap-3 text-[#17191D] group"
          >
            {/* Geometric technical badge with Gundam Tricolor */}
            <div className="w-8 h-8 rounded-md bg-white border-2 border-[#17191D] flex items-center justify-center p-1 shadow-sm">
              <div className="w-full h-full rounded-xs overflow-hidden flex flex-col">
                <span className="h-1/3 bg-[#155EEF]" />
                <span className="h-1/3 bg-[#F5C400]" />
                <span className="h-1/3 bg-[#D92D20]" />
              </div>
            </div>

            <div className="flex flex-col">
              <span className="font-mono font-bold leading-tight tracking-tight text-sm sm:text-base group-hover:text-[#155EEF] transition-colors">{PROFILE_INFO.name}</span>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">Software Portfolio</span>
            </div>
          </a>

          {/* Clean Central Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 p-1 rounded-md bg-slate-100 border border-slate-200" aria-label="Main Navigation">
            {/* Overview / Home link */}
            <a
              href="#intro"
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded transition-all ${
                activeSection === 'intro'
                  ? 'bg-[#17191D] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#17191D] hover:bg-slate-200/60'
              }`}
            >
              Overview
            </a>

            {/* Tools & Tech Link */}
            <a
              href="#skills"
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded transition-all ${
                activeSection === 'skills'
                  ? 'bg-[#17191D] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#17191D] hover:bg-slate-200/60'
              }`}
            >
              Stack
            </a>

            {/* Projects Hub Link with Gundam Colors */}
            <a
              href="#projects"
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded transition-all flex items-center gap-1.5 ${
                activeSection === 'projects'
                  ? 'bg-[#17191D] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#17191D] hover:bg-slate-200/60'
              }`}
            >
              <div className="flex items-center gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#155EEF]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5C400]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#D92D20]" />
              </div>
              <span>Projects</span>
            </a>

            {/* Ongoing / Active Builds Link */}
            <a
              href="#ongoing"
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded transition-all flex items-center gap-1.5 ${
                activeSection === 'ongoing'
                  ? 'bg-[#17191D] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#17191D] hover:bg-slate-200/60'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Ongoing</span>
            </a>

            {/* Job Experience Link */}
            <a
              href="#experience"
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded transition-all ${
                activeSection === 'experience'
                  ? 'bg-[#17191D] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#17191D] hover:bg-slate-200/60'
              }`}
            >
              Experience
            </a>

            {/* Services Link */}
            <a
              href="#services"
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded transition-all ${
                activeSection === 'services'
                  ? 'bg-[#17191D] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#17191D] hover:bg-slate-200/60'
              }`}
            >
              Services
            </a>

            {/* Rates & Pricing Link */}
            <a
              href="#rates"
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded transition-all ${
                activeSection === 'rates'
                  ? 'bg-[#17191D] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#17191D] hover:bg-slate-200/60'
              }`}
            >
              Rates
            </a>

            {/* Direct Connect Link */}
            <a
              href="#contact"
              className={`px-3 py-1.5 text-xs font-mono font-bold uppercase tracking-wider rounded transition-all ${
                activeSection === 'contact'
                  ? 'bg-[#17191D] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#17191D] hover:bg-slate-200/60'
              }`}
            >
              Contact
            </a>
          </nav>

          {/* Say Hello Action with Paperplane Doodle */}
          <div className="hidden md:flex items-center gap-3">
            <DoodleInteractable variant="button" accentColor="#F5C400" doodleText="DISPATCH ✉️">
              <a
                href={`mailto:${PROFILE_INFO.email}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-md bg-[#17191D] text-white hover:bg-[#155EEF] border-2 border-[#17191D] shadow-sm transition-all active:scale-95"
              >
                <span>Say hello</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#F5C400]" />
              </a>
            </DoodleInteractable>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md border-2 border-[#17191D] text-[#17191D]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-50 bg-slate-950/70 backdrop-blur-md animate-fadeIn flex flex-col justify-start">
          <div className="bg-white text-[#17191D] border-b-2 border-x-2 border-[#17191D] shadow-2xl rounded-b-2xl overflow-hidden max-h-[82vh] flex flex-col">
            {/* Top Architectural Trim */}
            <div className="h-1 w-full flex select-none pointer-events-none shrink-0">
              <div className="flex-1 bg-[#155EEF]" />
              <div className="flex-1 bg-[#F5C400]" />
              <div className="flex-1 bg-[#D92D20]" />
              <div className="w-12 bg-slate-300" />
            </div>

            {/* Drawer Header Stamp */}
            <div className="px-5 py-2.5 bg-slate-100 border-b border-slate-200 flex items-center justify-between font-mono text-[11px] font-bold text-slate-700 shrink-0">
              <span>// PORTFOLIO INDEX</span>
              <span className="text-[#155EEF]">9 SECTIONS LOADED</span>
            </div>

            {/* Scrollable Navigation List */}
            <div className="p-4 space-y-2 overflow-y-auto font-mono">
              {[
                { href: '#intro', num: '01', title: 'OVERVIEW // HERO', sub: 'Introduction', active: activeSection === 'intro', color: '#155EEF' },
                { href: '#skills', num: '02', title: 'TECH STACK // ARSENAL', sub: 'Engines & Tools', active: activeSection === 'skills', color: '#155EEF' },
                { href: '#projects', num: '03', title: 'PROJECTS // SHOWCASE', sub: '12 Delivered Systems', active: activeSection === 'projects', color: '#155EEF' },
                { href: '#ongoing', num: '04', title: 'ONGOING // ACTIVE LABS', sub: '3 Sprint Builds', active: activeSection === 'ongoing', color: '#10B981', isLive: true },
                { href: '#experience', num: '05', title: 'EXPERIENCE // ROLES', sub: 'Career Timeline', active: activeSection === 'experience', color: '#F5C400' },
                { href: '#services', num: '06', title: 'SERVICES // SOLUTIONS', sub: 'Cost Estimator', active: activeSection === 'services', color: '#155EEF' },
                { href: '#rates', num: '07', title: 'NATURE OF WORK // RATES', sub: 'Engagement Tiers', active: activeSection === 'rates', color: '#D92D20' },
                { href: '#workstation', num: '08', title: 'DEV RIG // WORKSTATION', sub: 'Hardware Specs', active: activeSection === 'workstation', color: '#155EEF' },
                { href: '#contact', num: '09', title: 'CONTACT // ARCHIVE', sub: 'willuworkx@gmail.com', active: activeSection === 'contact', color: '#F5C400' },
              ].map((item) => (
                <a
                  key={item.num}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-2.5 rounded-lg border-2 transition-all ${
                    item.active
                      ? 'bg-[#17191D] text-white border-[#17191D] shadow-sm'
                      : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span 
                      className={`w-2 h-2 rounded-full ${item.isLive ? 'bg-emerald-400 animate-pulse' : ''}`}
                      style={{ backgroundColor: item.isLive ? undefined : item.color }}
                    />
                    <span className="text-xs font-bold tracking-tight">
                      {item.title}
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono ${item.active ? 'text-slate-300' : 'text-slate-500'}`}>
                    {item.sub}
                  </span>
                </a>
              ))}
            </div>

            {/* Drawer Bottom Action Bar */}
            <div className="p-4 bg-slate-50 border-t-2 border-slate-200 flex items-center gap-2.5 shrink-0">
              <a
                href={`mailto:${PROFILE_INFO.email}`}
                className="flex-1 py-2.5 px-3 rounded-md bg-[#17191D] hover:bg-[#155EEF] text-white font-mono font-bold text-xs uppercase tracking-wider text-center border-2 border-[#17191D] transition-colors"
              >
                Send Email
              </a>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-4 rounded-md border-2 border-slate-300 hover:bg-slate-200 text-slate-700 font-mono font-bold text-xs transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
