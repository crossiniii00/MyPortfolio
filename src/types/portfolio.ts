/**
 * Project Showcase & Portfolio Types
 * Gundam Color Zones: Blue, Yellow, Red, White
 */

export interface ProjectShowcase {
  id: string;
  number: string;
  title: string;
  category: string;
  zone: 'blue' | 'yellow' | 'red' | 'white';
  headline: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  image: string;
  imageAlt: string;
  liveUrl: string;
  githubUrl: string;
  highlights: string[];
}

export interface ProfileInfo {
  name: string;
  title: string;
  tagline: string;
  email: string;
  github: string;
  linkedin: string;
  location: string;
}
