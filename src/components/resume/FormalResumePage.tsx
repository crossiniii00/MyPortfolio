import React, { useState, useMemo } from 'react';
import { 
  Download, 
  Copy, 
  Check, 
  ArrowLeft, 
  Mail, 
  Globe, 
  MapPin, 
  ExternalLink 
} from 'lucide-react';
import { 
  PROFILE_INFO, 
  JOB_EXPERIENCES, 
  SHOWCASE_PROJECTS 
} from '../../data/portfolio';
import { DoodleInteractable } from '../ui/DoodleInteractable';

interface FormalResumePageProps {
  onFlipBack: () => void;
}

export const FormalResumePage: React.FC<FormalResumePageProps> = ({ onFlipBack }) => {
  const [copied, setCopied] = useState(false);

  // Trigger native browser print / save-to-PDF
  const handlePrint = () => {
    window.print();
  };

  // Dynamically compute clean technical skill sets from portfolio
  const technicalSkills = useMemo(() => {
    return {
      languages: ['TypeScript', 'JavaScript (ES6+)', 'PHP', 'HTML5', 'CSS3', 'SQL'],
      frontend: ['React 19', 'Next.js', 'Tailwind CSS', 'Responsive UI Design', 'Web Development', 'UI Redesign'],
      backend: ['Laravel', 'PHP', 'Node.js', 'RESTful APIs', 'Database Architecture', 'MySQL / PostgreSQL'],
      toolsAndDevops: ['Docker', 'Generative AI Tools', 'Artificial Intelligence (AI)', 'Git', 'Vercel', 'Vite', 'SEO'],
    };
  }, []);

  // Professional grounded summary derived from profile
  const professionalSummary = useMemo(() => {
    return `Full-Stack Web Developer primarily working as an independent freelancer, specializing in custom web applications, responsive client websites, and modern full-stack development. Practical engineering experience spanning modern JavaScript/TypeScript (React, Next.js, Node.js), PHP & Laravel, Docker containerization, and Generative AI tools. Grounded across freelance client delivery, corporate engineering contracts (ContactPoint 360), and web development internships (S&P Villa Management, Advanced Infinit Solutions).`;
  }, []);

  // Grounded formal descriptions for experiences
  const formalExperienceList = useMemo(() => {
    return [
      {
        id: 'freelance',
        role: 'Freelance Full-Stack Developer',
        company: 'Independent Freelance Practice',
        employmentType: 'Freelance · Primary Focus',
        location: 'Remote / Worldwide',
        period: '2024 — Present',
        summary: 'Providing end-to-end web engineering, bespoke application development, and responsive website delivery directly to clients.',
        bullets: [
          'Architect and deliver custom web applications and responsive landing pages tailored to individual client and business requirements.',
          'Lead complete project lifecycles from UI planning and component architecture to full-stack implementation, deployment, and ongoing technical support.',
          'Implement modern performance, mobile-first design, and search engine optimization (SEO) best practices.',
        ],
        skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'REST APIs', 'Responsive Design'],
      },
      {
        id: 'contactpoint360',
        role: 'Full Stack Engineer',
        company: 'ContactPoint 360',
        employmentType: 'Contract',
        location: 'Cebu, Central Visayas, Philippines (Hybrid)',
        period: 'Apr 2026 — Sep 2026 (6 mos)',
        summary: 'Engineered full-stack features and supported team workflows utilizing Generative AI tools and containerized deployments.',
        bullets: [
          'Developed and maintained full-stack web applications and robust API endpoints for business operations.',
          'Containerized development and deployment workflows using Docker to maintain environment parity.',
          'Integrated Generative AI tools to accelerate prototyping, code implementation, and engineering productivity.',
        ],
        skills: ['Generative AI Tools', 'Docker', 'Full Stack Engineering', 'TypeScript', 'REST APIs'],
      },
      {
        id: 'spvilla',
        role: 'Web Developer',
        company: 'S&P Villa Management',
        employmentType: 'Internship',
        location: 'Koi Samui (Remote)',
        period: 'Jan 2026 — Apr 2026 (4 mos)',
        summary: 'Contributed to web development and supported digital marketing initiatives for luxury villa hospitality management.',
        bullets: [
          'Created responsive web pages and property showcase listings for international guests.',
          'Collaborated closely on marketing and web development to improve lead capture and online presence.',
          'Optimized media assets and frontend code for quick loading on mobile devices.',
        ],
        skills: ['Marketing and Web Development', 'Web Development', 'Responsive Design', 'Frontend UI', 'SEO'],
      },
      {
        id: 'infinit',
        role: 'Web Developer',
        company: 'Advanced Infinit Solutions',
        employmentType: 'Internship',
        location: 'Philippines (Remote)',
        period: 'Sep 2025 — Dec 2025 (4 mos)',
        summary: 'Helped developed and redesign a website for a camping resort in Bukidnon using Laravel.',
        bullets: [
          'Helped develop and redesign the official web platform for a premier camping resort in Bukidnon using Laravel.',
          'Built server-side controllers, database queries, and dynamic Blade templates in PHP.',
          'Applied Artificial Intelligence (AI) tools to assist in feature development and code efficiency.',
        ],
        skills: ['PHP and Artificial Intelligence (AI)', 'PHP', 'Laravel', 'Artificial Intelligence (AI)', 'Web Development', 'UI Redesign'],
      },
    ];
  }, []);

  // Copy plain text resume to clipboard
  const handleCopyText = () => {
    const plainText = `
${PROFILE_INFO.name.toUpperCase()}
${PROFILE_INFO.role}
Email: ${PROFILE_INFO.email} | Location: ${PROFILE_INFO.locationShort}
GitHub: ${PROFILE_INFO.github} | LinkedIn: ${PROFILE_INFO.linkedin}

PROFESSIONAL SUMMARY
${professionalSummary}

TECHNICAL SKILLS
- Languages: ${technicalSkills.languages.join(', ')}
- Frontend & UI: ${technicalSkills.frontend.join(', ')}
- Backend & Databases: ${technicalSkills.backend.join(', ')}
- Tools & Cloud: ${technicalSkills.toolsAndDevops.join(', ')}

PROFESSIONAL EXPERIENCE
${formalExperienceList.map(
  (exp, idx) => `
${idx + 1}. ${exp.role} — ${exp.company} (${exp.period})
   Location: ${exp.location}
   ${exp.summary}
${exp.bullets.map((b) => `   - ${b}`).join('\n')}`
).join('\n')}

SELECTED PROJECTS
${SHOWCASE_PROJECTS.slice(0, 3).map(
  (proj) => `
- ${proj.title} (${proj.technologies.slice(0, 4).join(', ')})
  ${proj.headline || proj.description}`
).join('\n')}

EDUCATION & CREDENTIALS
- ${PROFILE_INFO.education?.degree || 'B.S. in Computer Science'} — ${PROFILE_INFO.education?.institution || 'California State University'}
${PROFILE_INFO.certifications?.map((c) => `- ${c}`).join('\n')}
`.trim();

    navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-[#17191D] font-sans selection:bg-[#F5C400] selection:text-[#17191D] py-6 sm:py-10 px-3 sm:px-6">
      {/* Print-specific style sheet */}
      <style>{`
        @media print {
          body {
            background: #ffffff !important;
            color: #000000 !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          .resume-sheet {
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          @page {
            size: letter portrait;
            margin: 12mm 14mm;
          }
        }
      `}</style>

      {/* =======================================================================
          TOP ACTION TOOLBAR (Hidden in Print)
         ======================================================================= */}
      <div className="no-print max-w-4xl mx-auto mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-md">
        <DoodleInteractable variant="button" accentColor="#F5C400" doodleText="FLIP TO PAGE 01 📖">
          <button
            onClick={onFlipBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#17191D] text-xs font-bold transition-all cursor-pointer active:scale-95 group w-full sm:w-auto justify-center"
            title="Return to visual portfolio"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Flip to Portfolio (Page 01)</span>
          </button>
        </DoodleInteractable>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {/* Copy Plain Text */}
          <DoodleInteractable variant="button" accentColor="#10B981" doodleText="RAW TEXT 📋">
            <button
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer active:scale-95"
              title="Copy plain text resume to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Text!' : 'Copy Plain Text'}</span>
            </button>
          </DoodleInteractable>

          {/* Download PDF / Print Button */}
          <DoodleInteractable variant="button" accentColor="#F5C400" doodleText="PDF PRINT 🖨️">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#155EEF] hover:bg-[#124ec6] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
              title="Download formatted PDF or send to printer"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF / Print</span>
            </button>
          </DoodleInteractable>
        </div>
      </div>

      {/* =======================================================================
          FORMAL RESUME SHEET (Dignified, Professional, Clean)
         ======================================================================= */}
      <article className="resume-sheet max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-12 relative overflow-hidden">
        {/* Subtle top Gundam Tricolor accent rule */}
        <div className="h-1.5 gundam-tricolor-bar w-full absolute top-0 left-0 right-0" />

        {/* -------------------------------------------------------------------
            1. HEADER & CONTACT DETAILS
           ------------------------------------------------------------------- */}
        <header className="border-b border-slate-200 pb-5 mb-5">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#17191D] tracking-tight">
                {PROFILE_INFO.name}
              </h1>
              <p className="text-base sm:text-lg font-bold text-[#155EEF] mt-0.5">
                {PROFILE_INFO.role}
              </p>
            </div>

            <div className="text-xs text-slate-500 font-mono sm:text-right">
              <span>{PROFILE_INFO.locationShort}</span>
            </div>
          </div>

          {/* Contact Links */}
          <div className="mt-3.5 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-xs text-slate-600">
            <a href={`mailto:${PROFILE_INFO.email}`} className="flex items-center gap-1.5 hover:text-[#155EEF] transition-colors">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{PROFILE_INFO.email}</span>
            </a>

            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              <span>{PROFILE_INFO.location}</span>
            </div>

            <a href={PROFILE_INFO.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#155EEF] transition-colors">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <span>{PROFILE_INFO.githubUser || 'github.com/willbadillo'}</span>
            </a>

            <a href={PROFILE_INFO.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[#155EEF] transition-colors">
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              <span>{PROFILE_INFO.linkedinUser || 'linkedin.com/in/will-badillo-7838b5346'}</span>
            </a>
          </div>
        </header>

        {/* -------------------------------------------------------------------
            2. PROFESSIONAL SUMMARY
           ------------------------------------------------------------------- */}
        <section className="mb-6">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2">
            Professional Summary
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
            {professionalSummary}
          </p>
        </section>

        {/* -------------------------------------------------------------------
            3. TECHNICAL SKILLS
           ------------------------------------------------------------------- */}
        <section className="mb-6">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-2.5">
            Technical Skills
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs bg-slate-50/70 rounded-2xl p-4 border border-slate-200">
            <div>
              <span className="font-bold text-[#17191D] block mb-1">Languages</span>
              <p className="text-slate-600 leading-relaxed">
                {technicalSkills.languages.join(', ')}
              </p>
            </div>

            <div>
              <span className="font-bold text-[#17191D] block mb-1">Frontend &amp; UI</span>
              <p className="text-slate-600 leading-relaxed">
                {technicalSkills.frontend.join(', ')}
              </p>
            </div>

            <div>
              <span className="font-bold text-[#17191D] block mb-1">Backend &amp; DB</span>
              <p className="text-slate-600 leading-relaxed">
                {technicalSkills.backend.join(', ')}
              </p>
            </div>

            <div>
              <span className="font-bold text-[#17191D] block mb-1">Tools &amp; DevOps</span>
              <p className="text-slate-600 leading-relaxed">
                {technicalSkills.toolsAndDevops.join(', ')}
              </p>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------------------------
            4. PROFESSIONAL EXPERIENCE
           ------------------------------------------------------------------- */}
        <section className="mb-6">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4">
            Professional Experience
          </h2>

          <div className="space-y-5">
            {formalExperienceList.map((exp) => (
              <div 
                key={exp.id}
                className="relative pl-4 border-l-2 border-slate-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h3 className="text-sm font-black text-[#17191D]">
                      {exp.role}
                    </h3>
                    <div className="text-xs font-semibold text-[#155EEF]">
                      {exp.company} <span className="text-slate-400 font-normal">· {exp.employmentType}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-slate-500">
                    {exp.period} · {exp.location}
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-1">
                  {exp.summary}
                </p>

                <ul className="mt-2 text-xs text-slate-700 space-y-1.5 list-disc list-outside pl-3.5 leading-relaxed">
                  {exp.bullets.map((item, aIdx) => (
                    <li key={aIdx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* -------------------------------------------------------------------
            5. SELECTED PRODUCTION PROJECTS
           ------------------------------------------------------------------- */}
        <section className="mb-6">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
            Selected Projects
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {SHOWCASE_PROJECTS.slice(0, 4).map((proj) => (
              <div key={proj.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/40 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1">
                    <span className="font-bold text-[#17191D]">{proj.title}</span>
                    <span className="text-[10px] font-mono text-slate-500">
                      {proj.category}
                    </span>
                  </div>
                  <p className="text-slate-600 mt-1 leading-snug">
                    {proj.description.slice(0, 150)}
                  </p>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex flex-wrap gap-1">
                  {proj.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="px-1.5 py-0.5 rounded bg-white text-[9px] font-mono text-slate-600 border border-slate-200">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* -------------------------------------------------------------------
            6. EDUCATION & CREDENTIALS
           ------------------------------------------------------------------- */}
        <section className="border-t border-slate-200 pt-5">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-3">
            Education &amp; Credentials
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <div className="font-bold text-[#17191D]">
                {PROFILE_INFO.education?.degree || 'B.S. in Computer Science'}
              </div>
              <div className="text-slate-500">
                {PROFILE_INFO.education?.institution || 'California State University'}
              </div>
            </div>

            <div>
              <div className="font-bold text-[#17191D]">Certifications</div>
              <div className="text-slate-500">
                {PROFILE_INFO.certifications?.join(' · ') || 'AWS Certified Solutions Architect · WCAG 2.1 AA Specialist'}
              </div>
            </div>
          </div>
        </section>

        {/* Footer subtle text */}
        <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <span>{PROFILE_INFO.name} — Resume</span>
          <span>{new Date().getFullYear()}</span>
        </div>
      </article>

      {/* Footer Return Callout (no-print) */}
      <div className="no-print max-w-4xl mx-auto mt-6 text-center text-xs text-slate-500">
        <DoodleInteractable variant="button" accentColor="#155EEF" doodleText="RETURN TO DOSSIER 🚀">
          <button
            onClick={onFlipBack}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-200 text-[#17191D] font-bold text-xs hover:bg-slate-50 shadow-xs cursor-pointer active:scale-95"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Visual Portfolio (Page 01)</span>
          </button>
        </DoodleInteractable>
      </div>
    </div>
  );
};
