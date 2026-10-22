import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './components/layout/Navbar';
import { FrontPage } from './components/sections/FrontPage';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { WorkstationSection } from './components/sections/WorkstationSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { RatesSection } from './components/sections/RatesSection';
import { ContactSection } from './components/sections/ContactSection';
import { FormalResumePage } from './components/resume/FormalResumePage';
import { TableOfContents } from './components/ui/TableOfContents';
import { InteractivePageFlip } from './components/ui/InteractivePageFlip';
import { GlobalDoodleManager } from './components/ui/GlobalDoodleManager';
import { Footer } from './components/layout/Footer';
import { MobileBottomDock } from './components/layout/MobileBottomDock';

export default function App(): React.ReactElement {
  const [currentPage, setCurrentPage] = useState<1 | 2>(1);
  const [activeSection, setActiveSection] = useState<'intro' | 'skills' | 'workstation' | 'projects' | 'ongoing' | 'experience' | 'services' | 'rates' | 'contact'>('intro');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Keyboard shortcut (Escape to flip back to page 1)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && currentPage === 2) {
        setCurrentPage(1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  // Track active section for table of contents and navbar
  useEffect(() => {
    if (currentPage !== 1) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      const sections: ('intro' | 'skills' | 'workstation' | 'projects' | 'ongoing' | 'experience' | 'services' | 'rates' | 'contact')[] = [
        'intro', 
        'skills',
        'projects', 
        'ongoing',
        'experience', 
        'services', 
        'rates',
        'workstation',
        'contact'
      ];

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="min-h-screen relative bg-[#F7F8FA] font-sans antialiased selection:bg-[#F5C400] selection:text-[#17191D] overflow-x-hidden">
      {/* Top Global Scroll Progress Bar with Gundam Tricolor Gradient */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-1 origin-left z-50 pointer-events-none gundam-tricolor-bar shadow-sm"
      />

      {/* Dynamic Hover Table of Contents (Only on Main Dossier Page 01) */}
      {currentPage === 1 && <TableOfContents activeSection={activeSection} />}

      {/* Interactive Page Flip Orchestrator with Real-time Pull & Reveal Preview */}
      <InteractivePageFlip
        currentPage={currentPage}
        onPageChange={(newPage) => setCurrentPage(newPage)}
        page1Node={
          <div className="min-h-screen flex flex-col w-full bg-[#F7F8FA] pb-28 sm:pb-0">
            {/* Top Navbar */}
            <Navbar 
              activeSection={activeSection} 
              onSelectProject={(id) => setSelectedProjectId(id)}
            />

            {/* Main Content Sections */}
            <main className="flex-1">
              {/* 1. Front Page (White) */}
              <FrontPage />

              {/* 2. Core Technical Skills & Tools (Solid Blue #155EEF) */}
              <SkillsSection />

              {/* 3. Projects (Split Section: Accomplished & On Going) */}
              <ProjectsSection selectedProjectId={selectedProjectId} />

              {/* 5. Job Experiences (Solid Yellow #F5C400) */}
              <ExperienceSection />

              {/* 6. Services Offered (Solid Blue #155EEF) */}
              <ServicesSection />

              {/* 7. Nature of Work (Solid Red #D92D20) */}
              <RatesSection />

              {/* 8. Development Workstation & Hardware Gear (Clean White) */}
              <WorkstationSection />

              {/* 9. Direct Connect & Letter Folder (Solid Yellow #F5C400) */}
              <ContactSection />
            </main>

            {/* Clean Minimalist Footer */}
            <Footer />
          </div>
        }
        page2Node={
          <div className="min-h-screen flex flex-col w-full pb-28 sm:pb-0">
            <FormalResumePage onFlipBack={() => setCurrentPage(1)} />
          </div>
        }
      />

      {/* Global Interactive Doodle Overlay across all buttons, tabs, links, and cards */}
      <GlobalDoodleManager />

      {/* Floating Eye-Candy Mobile Dock (Thumb-accessible for iPhone/Android) */}
      <MobileBottomDock
        activeSection={activeSection}
        currentPage={currentPage}
        onPageChange={(p) => {
          setCurrentPage(p);
        }}
      />
    </div>
  );
}
