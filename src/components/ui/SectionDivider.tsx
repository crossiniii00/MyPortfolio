import React from 'react';

interface SectionDividerProps {
  variant: 'hero-to-projects' | 'projects-to-experience' | 'experience-to-skills' | 'skills-to-services' | 'services-to-contact' | 'skills-to-contact' | 'experience-to-contact' | 'projects-to-contact' | 'contact-to-footer';
  label?: string;
  sublabel?: string;
}

export const SectionDivider: React.FC<SectionDividerProps> = () => {
  // Seamless solid-color transitions between sections without transparent gaps
  return null;
};
