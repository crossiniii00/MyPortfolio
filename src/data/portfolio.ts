export interface ProjectGalleryItem {
  id: string;
  title: string;
  caption: string;
  image: string;
  tag: string;
}

export interface ProjectShowcase {
  id: string;
  number: string;
  title: string;
  category: string;
  zone: 'blue' | 'yellow' | 'red' | 'white';
  headline: string;
  description: string;
  technologies: string[];
  metrics: {
    label: string;
    value: string;
  }[];
  image: string;
  imageAlt: string;
  gallery: ProjectGalleryItem[];
  liveUrl: string;
  githubUrl: string;
  highlights: string[];
}

export const SHOWCASE_PROJECTS: ProjectShowcase[] = [
  {
    id: 'contactpoint-crm',
    number: '01',
    zone: 'blue',
    title: 'Chronicle CRM',
    category: 'Enterprise CRM · Talent Platform',
    headline: 'A clean recruitment CRM and hiring platform with automated applicant tracking, recruiter scorecards, and hiring analytics.',
    description: 'Chronicle CRM is a recruitment platform connecting public job pages with a clean admin workspace. It guides job applicants across 13 hiring stages—from online applications and typing tests to manager reviews and job offers. Features include clear hiring stats, recruiter performance summaries, client account assignments (Nvidia, Microsoft, Google, AMD, Amazon), and simple applicant management.',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Docker', 'REST APIs', 'Data Analytics', 'State Management'],
    metrics: [
      { label: 'Pipeline stages', value: '13 Stages' },
      { label: 'Applicant tracker', value: '50+ Applicants' },
      { label: 'Top client brands', value: 'Nvidia · Google · AMD' },
    ],
    image: '/src/assets/images/chronicle_crm_dashboard.png',
    imageAlt: 'Chronicle CRM Executive Workspace dashboard displaying hiring analytics, pipeline distribution, and candidate metrics',
    gallery: [
      {
        id: 'chronicle-dashboard',
        title: 'Executive Workspace & Hiring Analytics',
        caption: 'Central dashboard monitoring candidate numbers, interview pass rates, recruiter highlights, and client company accounts.',
        image: '/src/assets/images/chronicle_crm_dashboard.png',
        tag: 'Admin Workspace'
      },
      {
        id: 'chronicle-applicants',
        title: 'Recruitment Workspace & Candidate Pipeline',
        caption: 'Applicant tracking table filtering candidate typing speeds, test scores, and interviewer recommendations.',
        image: '/src/assets/images/chronicle_crm_applicants.png',
        tag: 'Applicant Tracker'
      },
      {
        id: 'chronicle-landing',
        title: 'Talent Acquisition Public Portal',
        caption: 'Clean job applicant portal showing active job openings and easy resume submission.',
        image: '/src/assets/images/chronicle_crm_landing.png',
        tag: 'Public Portal'
      },
      {
        id: 'chronicle-careers',
        title: 'Opportunity Hub & Job Openings',
        caption: 'Job directory with quick filters for customer support, tech help, and operations roles.',
        image: '/src/assets/images/chronicle_crm_careers.png',
        tag: 'Careers Directory'
      }
    ],
    liveUrl: 'https://chroniclecrm.vercel.app',
    githubUrl: 'https://github.com',
    highlights: [
      'Multi-stage hiring pipeline managing applicants across 13 clear stages',
      'Admin dashboard with recruiter performance highlights and active client company assignments',
      'Public career portal with job listings and direct resume uploads',
      'User permissions separating candidate scorecards, interviewer notes, and admin settings'
    ]
  },
  {
    id: 'rfid-student-clinic-thesis',
    number: '02',
    zone: 'yellow',
    title: 'MediCampus',
    category: 'Campus Healthcare · Thesis of the Year Nominee',
    headline: 'An integrated campus clinical management and hardware RFID access control system streamlining triage, medical records, and pharmacy stocks.',
    description: 'Nominated for Thesis of the Year. MediCampus connects physical contactless RFID card readers with a centralized healthcare command hub: real-time patient triage queues, digital consultation case histories across departments, sick bay occupancy tracking, and pharmaceutical inventory management with automated stock alerts and Excel workflows.',
    technologies: ['React', 'TypeScript', 'Firebase', 'RFID Card Scanner', 'Tailwind CSS', 'Excel Engine'],
    metrics: [
      { label: 'Award nomination', value: 'Thesis of the Year' },
      { label: 'Scan speed', value: '< 200ms RFID' },
      { label: 'Clinical records', value: 'Students & Staff' },
    ],
    image: '/src/assets/images/medicampus_dashboard.png',
    imageAlt: 'MediCampus clinical management system dashboard featuring live patient census, sick bay bed occupancy, and medical inventory tracking',
    gallery: [
      {
        id: 'medicampus-dashboard',
        title: 'Clinical Command Dashboard',
        caption: 'Super Admin operations hub providing real-time triage status, sick bay bed occupancy, and automated clinic statistics.',
        image: '/src/assets/images/medicampus_dashboard.png',
        tag: 'Admin Dashboard'
      },
      {
        id: 'medicampus-records',
        title: 'Patient Clinical Records',
        caption: 'Segmented patient directory for students, staff, and campus visitors with diagnosis histories and status tracking.',
        image: '/src/assets/images/medicampus_records.png',
        tag: 'Clinical Records'
      },
      {
        id: 'medicampus-inventory',
        title: 'Pharmacy & Equipment Inventory',
        caption: 'Asset catalog tracking medicines, diagnostic tools, and clinical consumables with Excel import/export and stock alerts.',
        image: '/src/assets/images/medicampus_inventory.png',
        tag: 'Clinic Inventory'
      },
      {
        id: 'medicampus-rfid',
        title: 'RFID Card Scanner Terminal',
        caption: 'Card scanner terminal recording clinic visits with automatic time-in and time-out logs.',
        image: '/src/assets/images/medicampus_rfid.png',
        tag: 'RFID Monitor'
      }
    ],
    liveUrl: 'https://medicampus-f871a.web.app',
    githubUrl: 'https://github.com',
    highlights: [
      'Nominated for Thesis of the Year award for end-to-end campus healthcare and clinic automation',
      'Hardware RFID card reader integration with HID protocol for instantaneous student verification',
      'Comprehensive clinical inventory manager with low-stock alerts, dosage tracking, and Excel data workflows',
      'Unified patient management tracking consultation records, triage urgency, and sick bay bed occupancy'
    ]
  },
  {
    id: 'ai-teacher-evaluation-thesis',
    number: '03',
    zone: 'red',
    title: 'TEVAL AI',
    category: 'Educational AI · Thesis of the Year Nominee',
    headline: 'An AI-driven academic evaluation system performing natural language sentiment analysis on student feedback for faculty performance.',
    description: 'Nominated for Thesis of the Year (author of 2 award-nominated thesis projects for 2 groups). TEVAL AI uses AI natural language processing to read student written reviews, evaluate rating scores, spot helpful trends, and create clear teacher improvement reports.',
    technologies: ['Python', 'React', 'TypeScript', 'Gemini AI NLP API', 'PostgreSQL', 'Tailwind CSS'],
    metrics: [
      { label: 'Award nomination', value: 'Thesis of the Year' },
      { label: 'Sentiment accuracy', value: '96.8%' },
      { label: 'Student evaluations', value: '1,400+ analyzed' },
    ],
    image: '/src/assets/images/project_teacher_eval_ai.jpg',
    imageAlt: 'TEVAL AI teacher evaluation and sentiment analytics dashboard showing faculty scorecards and AI insight summaries',
    gallery: [
      {
        id: 'ai-eval-overview',
        title: 'Faculty Scorecards & Sentiment Distribution',
        caption: 'Comprehensive faculty performance overview with NLP sentiment breakdown (positive, neutral, negative feedback).',
        image: '/src/assets/images/project_teacher_eval_ai.jpg',
        tag: 'Sentiment AI'
      },
      {
        id: 'ai-eval-insights',
        title: 'AI Key Insights & Improvement Recommendations',
        caption: 'Automated summaries highlighting top teaching strengths and practical areas for classroom improvement.',
        image: '/src/assets/images/service_ai_agent.jpg',
        tag: 'AI Insights'
      }
    ],
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    highlights: [
      'Nominated for Thesis of the Year for advanced educational sentiment analytics',
      'Natural language processing (NLP) extracting actionable feedback from student evaluations',
      'Automated teacher rating criteria scorecards across clarity, engagement, and availability'
    ]
  },
  {
    id: 'trading-bot-chart-analyzer',
    number: '04',
    zone: 'white',
    title: 'Trading Analysis Bot & Chart Pattern Analyzer',
    category: 'Fintech & Live Market Charts',
    headline: 'An automated chart analysis bot that monitors live price candles, identifies technical chart patterns, and generates strategy signals.',
    description: 'Analyzes financial market price data in real-time. Detects technical indicators (EMA crosses, RSI divergences, support/resistance breakouts) and delivers automated trading signals with risk analytics and position tracking.',
    technologies: ['Python', 'TypeScript', 'Node.js', 'WebSockets', 'Interactive Candlestick Charts', 'Docker'],
    metrics: [
      { label: 'Execution speed', value: '< 120ms' },
      { label: 'Win rate backtested', value: '68.5%' },
      { label: 'Chart indicators', value: 'EMA / RSI / BB' },
    ],
    image: '/src/assets/images/project_trading_bot.jpg',
    imageAlt: 'Trading analysis bot dashboard showing candlestick charts, automated buy/sell signals, and profit tracking',
    gallery: [
      {
        id: 'trading-bot-chart',
        title: 'Live Candlestick Charts & Signal Markers',
        caption: 'Real-time market chart stream with automated buy/sell markers, moving average lines, and live trade order log.',
        image: '/src/assets/images/project_trading_bot.jpg',
        tag: 'Live Charts'
      },
      {
        id: 'trading-bot-analytics',
        title: 'Win Rate Analytics & Position Overview',
        caption: 'Trading strategy performance tracking with automatic trailing stop-losses and risk limits.',
        image: '/src/assets/images/project_trading_bot.jpg',
        tag: 'Strategy PnL'
      }
    ],
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    highlights: [
      'Real-time WebSocket market ticker stream and candlestick pattern detection',
      'Automated technical indicators including EMA 50/200, RSI, and volume spikes',
      'Live profit tracking with automatic stop-loss and take-profit order safeguards'
    ]
  },
  {
    id: 'hotel-website',
    number: '05',
    zone: 'yellow',
    title: 'SL INN Hotel in a Garden',
    category: 'Hospitality Web Platform',
    headline: 'A responsive hotel website featuring suite showcases, garden amenities, room tours, and direct guest booking inquiries.',
    description: 'Designed and built for SL INN Hotel in a Garden with modern typography, responsive layout, smooth imagery galleries, and seamless reservation contact flows.',
    technologies: ['Next.js', 'React 19', 'TypeScript', 'Tailwind CSS', 'Responsive UI Design'],
    metrics: [
      { label: 'Mobile responsiveness', value: '100% Tested' },
      { label: 'Page load speed', value: '< 0.9s' },
      { label: 'Lighthouse score', value: '98 / 100' },
    ],
    image: '/src/assets/images/project_hyperion_studio.jpg',
    imageAlt: 'SL INN Hotel in a Garden reservation website showcase with room galleries and amenities',
    gallery: [
      {
        id: 'hotel-suites',
        title: 'Suites & Garden Showcase',
        caption: 'Interactive photo gallery showcasing hotel rooms, garden amenities, and direct availability inquiries.',
        image: '/src/assets/images/project_hyperion_studio.jpg',
        tag: 'Hotel Showcase'
      }
    ],
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    highlights: [
      'Modern, welcoming visual aesthetics with high-resolution suite galleries',
      'Fast, mobile-first booking inquiry form tailored for prospective guests',
      'Optimized performance scoring 98/100 on Google Lighthouse'
    ]
  },
  {
    id: 'sp-resort-website',
    number: '06',
    zone: 'red',
    title: 'Luxury Villa Resort Web Platform',
    category: 'Hospitality & Tourism · S&P Villa Management Internship',
    headline: 'Official responsive resort web platform built during internship at S&P Villa Management for international holidaymakers.',
    description: 'Engineered responsive villa catalog, photo galleries, booking inquiry forms, and search engine optimization (SEO) targeting global guests seeking luxury island getaways.',
    technologies: ['JavaScript', 'HTML5 / CSS3', 'Responsive Web Design', 'SEO Basics', 'Marketing UI'],
    metrics: [
      { label: 'Internship role', value: 'Web Developer' },
      { label: 'Guest experience', value: 'Mobile-First' },
      { label: 'Search presence', value: 'SEO Optimized' },
    ],
    image: '/src/assets/images/project_design_system_1792297938435.jpg',
    imageAlt: 'S&P Villa Management resort web platform showcasing luxury island villas',
    gallery: [
      {
        id: 'sp-villa-showcase',
        title: 'Island Villa Catalog & Booking Flow',
        caption: 'Property listing showcase optimized for international vacationers browsing from smartphones and laptops.',
        image: '/src/assets/images/project_design_system_1792297938435.jpg',
        tag: 'Villa Resort'
      }
    ],
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    highlights: [
      'Developed during professional web development internship at S&P Villa Management',
      'Optimized media delivery and responsive layout for international guests',
      'Integrated digital marketing considerations for higher booking conversion'
    ]
  },
  {
    id: 'bukidnon-camping-resort',
    number: '07',
    zone: 'white',
    title: 'Bukidnon Camping Resort Website Redesign',
    category: 'Collaborative Web Platform · Advanced Infinit Solutions Internship',
    headline: 'Collaborated on developing and redesigning the official website for a premier camping resort in Bukidnon using Laravel.',
    description: 'Rebuilt the legacy resort website with modern Laravel backend controllers, dynamic booking routing, responsive Blade templates, and AI-assisted components during internship at Advanced Infinit Solutions.',
    technologies: ['PHP', 'Laravel', 'MySQL', 'Blade Templates', 'Artificial Intelligence (AI)', 'UI Redesign'],
    metrics: [
      { label: 'Framework', value: 'Laravel / PHP' },
      { label: 'Development mode', value: 'Team Collab' },
      { label: 'Visitor UX', value: 'Complete Redesign' },
    ],
    image: '/src/assets/images/project_fleet_logistics_1792297938129.jpg',
    imageAlt: 'Bukidnon camping resort website portal redesigned in Laravel',
    gallery: [
      {
        id: 'bukidnon-resort-ui',
        title: 'Resort Booking Portal & Activities Showcase',
        caption: 'Clean, modernized visitor interface highlighting camping accommodation, outdoor activities, and reservation forms.',
        image: '/src/assets/images/project_fleet_logistics_1792297938129.jpg',
        tag: 'Laravel Redesign'
      }
    ],
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    highlights: [
      'Helped develop and redesign the official web portal for a Bukidnon camping resort',
      'Engineered backend controllers and routing using PHP and the Laravel framework',
      'Utilized Artificial Intelligence (AI) tools to assist in feature development'
    ]
  },
  {
    id: 'thesis-paper-maker',
    number: '08',
    zone: 'blue',
    title: 'AI Thesis Research Paper Maker & Citation Fetcher',
    category: 'AI Academic Research Utility',
    headline: 'An intelligent thesis research assistant that fetches verified scholarly sources, journal citations, and drafts structured academic outlines.',
    description: 'Takes thesis research topics, searches scholarly repositories, fetches relevant journal articles with DOI citations, and structures comprehensive literature review drafts with formal academic phrasing.',
    technologies: ['Next.js', 'TypeScript', 'Gemini AI API', 'Scholarly Search APIs', 'Tailwind CSS'],
    metrics: [
      { label: 'Source fetching', value: 'Real DOI & Citations' },
      { label: 'Literature outline', value: 'Automated' },
      { label: 'Research time', value: '70% Saved' },
    ],
    image: '/src/assets/images/project_thesis_paper_maker.jpg',
    imageAlt: 'AI thesis paper generator workspace showing generated chapter outline and live fetched scholarly citations',
    gallery: [
      {
        id: 'paper-maker-workspace',
        title: 'Academic Outline Generation & Citation Search',
        caption: 'Split workspace displaying thesis topic input, chapter outline breakdown, and live academic reference sources.',
        image: '/src/assets/images/project_thesis_paper_maker.jpg',
        tag: 'Research AI'
      }
    ],
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    highlights: [
      'Fetches real scholarly literature and DOI journal references related to the research topic',
      'Automatically drafts structured thesis outlines including Literature Review and Methodology',
      'Formats citations according to formal academic guidelines (APA/IEEE)'
    ]
  },
  {
    id: 'point-of-sale-system',
    number: '09',
    zone: 'red',
    title: 'Modern Retail & Restaurant Point of Sale (POS)',
    category: 'Business Systems & Cashier Operations',
    headline: 'A full-featured POS system handling product cataloging, barcode scanning, receipt printing, and daily cashier sales ledger.',
    description: 'Designed for fast touch operation, instant inventory deduction on sale, receipt generation, and end-of-day sales auditing for retail and dining establishments.',
    technologies: ['React', 'Node.js', 'PostgreSQL / SQLite', 'Barcode Scanner API', 'Tailwind CSS'],
    metrics: [
      { label: 'Transaction speed', value: '< 2 secs' },
      { label: 'Inventory sync', value: 'Real-Time' },
      { label: 'Receipt format', value: 'Thermal 58/80mm' },
    ],
    image: '/src/assets/images/project_fleet_mobile_app.jpg',
    imageAlt: 'Point of sale POS cashiering screen with product catalog and receipt checkout',
    gallery: [
      {
        id: 'pos-terminal',
        title: 'Cashier Checkout & Inventory Deduction',
        caption: 'Intuitive cashier terminal with quick-touch product tiles, barcode scanning, discount computation, and change calculator.',
        image: '/src/assets/images/project_fleet_mobile_app.jpg',
        tag: 'POS Terminal'
      }
    ],
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    highlights: [
      'Instant barcode scanning and sub-second item lookup for high-volume sales',
      'Automatic inventory deduction and low-stock warning threshold alerts',
      'Daily Z-reading report generation and cashier cash-in/cash-out balancing'
    ]
  },
  {
    id: 'local-clinical-records',
    number: '10',
    zone: 'white',
    title: 'Local Clinical Patient Electronic Records (EMR)',
    category: 'Healthcare Management System',
    headline: 'A secure, offline-capable local electronic medical records system for private medical clinics and patient histories.',
    description: 'Enables clinic staff to manage patient consultations, medical histories, vital signs, prescription records, and diagnostic attachments securely without requiring constant internet connectivity.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Local Database', 'Tailwind CSS'],
    metrics: [
      { label: 'Network mode', value: '100% Offline Capable' },
      { label: 'Record search', value: 'Instant' },
      { label: 'Data security', value: 'Local Encrypted' },
    ],
    image: '/src/assets/images/project_clinical_records_1792297938185.jpg',
    imageAlt: 'Local clinical patient electronic medical record system showing patient history and consultations',
    gallery: [
      {
        id: 'local-clinic-emr',
        title: 'Patient Medical Profile & Consultation Logs',
        caption: 'Patient record management with consultation histories, past diagnoses, vital sign charting, and prescription printouts.',
        image: '/src/assets/images/project_clinical_records_1792297938185.jpg',
        tag: 'Patient EMR'
      }
    ],
    liveUrl: 'https://github.com',
    githubUrl: 'https://github.com',
    highlights: [
      'Functions completely offline on clinic local networks without cloud dependence',
      'Fast patient record lookup by name, contact number, or assigned patient code',
      'Printable medical prescriptions and consultation summary slips'
    ]
  },
  {
    id: 'online-it-exam-system',
    number: '11',
    zone: 'blue',
    title: 'IT Knowledge Assessment',
    category: 'Enterprise Candidate Testing Platform',
    headline: 'A timed technical quiz web app testing candidate knowledge in cloud basics, networking, and system setup.',
    description: 'IT Knowledge Assessment is a straightforward candidate testing app. It features timed quizzes (10 minutes for 25 questions), covering cloud basics, system monitoring, and networking, with instant score results.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Quiz Engine'],
    metrics: [
      { label: 'Question pool', value: '25 Questions' },
      { label: 'Time limit', value: '10 Mins' },
      { label: 'Benchmark', value: 'Professional' },
    ],
    image: '/src/assets/images/itassessment_portal.png',
    imageAlt: 'IT Knowledge Assessment candidate portal showing 25 questions, professional standard, and 10 minute time limit',
    gallery: [
      {
        id: 'it-assessment-portal',
        title: 'Candidate Assessment Intake',
        caption: 'Clean technical quiz testing skills in cloud setups, system health, and basic networking with a 10-minute countdown for 25 questions.',
        image: '/src/assets/images/itassessment_portal.png',
        tag: 'Candidate Intake'
      }
    ],
    liveUrl: 'https://itassessment.vercel.app',
    githubUrl: 'https://github.com',
    highlights: [
      'Standardized test checking networking basics, cloud setups, and system administration',
      'Timed 10-minute test with 25 technical multiple-choice questions',
      'Streamlined candidate onboarding with instant validation and evaluation tracking',
      'Clean, simple design made for focused, distraction-free technical tests'
    ]
  },
  {
    id: 'typing-speed-test',
    number: '12',
    zone: 'yellow',
    title: 'CP TYPE!',
    category: 'Typing Speed Test & Applicant Benchmark',
    headline: 'A fast typing speed test app measuring words per minute (WPM), accuracy, and applicant qualification rules.',
    description: 'CP TYPE! is a typing speed test app built to verify applicant skills. Applicants sign in with their name and email, then take a 60-second test. It checks if they pass the target speed (40 WPM and 90% accuracy within 3 tries), showing real-time typing speed, mistakes, and final results in both Dark and Light themes.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Typing Engine'],
    metrics: [
      { label: 'Passing speed', value: '40+ WPM' },
      { label: 'Minimum accuracy', value: '90% Accuracy' },
      { label: 'Attempts allowed', value: '3 Tries Max' },
    ],
    image: '/src/assets/images/cptype_engine.png',
    imageAlt: 'CP TYPE! candidate typing test showing real-time typing speed (WPM) and accuracy',
    gallery: [
      {
        id: 'cptype-engine',
        title: 'Live Typing Test Screen',
        caption: 'Real-time screen tracking typing speed (WPM), accuracy percentage, 60-second timer, and number of tries.',
        image: '/src/assets/images/cptype_engine.png',
        tag: 'Live Test'
      },
      {
        id: 'cptype-protocol',
        title: 'Test Rules & Passing Requirements',
        caption: 'Test rules requiring 60-second duration, at least 90% accuracy, 40 WPM speed, and up to 3 tries.',
        image: '/src/assets/images/cptype_protocol.png',
        tag: 'Test Rules'
      },
      {
        id: 'cptype-dark-auth',
        title: 'Talent Verification (Dark Mode)',
        caption: 'Applicant sign-in screen with name and email entry, designed with a glowing dark cyberpunk look.',
        image: '/src/assets/images/cptype_dark_auth.png',
        tag: 'Dark Auth'
      },
      {
        id: 'cptype-light-auth',
        title: 'Talent Verification (Light Mode)',
        caption: 'High-contrast light theme with one-click theme switching and admin sign-in.',
        image: '/src/assets/images/cptype_light_auth.png',
        tag: 'Light Auth'
      }
    ],
    liveUrl: 'https://cptype.vercel.app',
    githubUrl: 'https://github.com',
    highlights: [
      'Typing test requiring 40 WPM speed and 90% minimum accuracy to pass',
      'Real-time typing monitor calculating live speed (WPM) and accuracy',
      'Keeps and records the applicant’s best score out of 3 total attempts',
      'Smooth Dark and Light themes with glowing accents and quick applicant sign-in'
    ]
  }
];

export interface TelemetryMetric {
  label: string;
  value: string;
  sublabel: string;
  percentage: number;
  color: 'blue' | 'yellow' | 'red' | 'cyan';
}

export interface LoadoutCategory {
  category: string;
  items: string[];
}

export interface JobExperience {
  id: string;
  role: string;
  company: string;
  employmentType: string;
  location: string;
  locationType: string;
  period: string;
  linkedinDate: string;
  timestamp: string;
  duration: string;
  marking: string;
  tagCode: string;
  status: 'ongoing' | 'previous';
  statusLabel: string;
  summary: string;
  achievements: string[];
  skills: string[];
  companyLogoText: string;
  companyLogoBg: string;
  zone: 'blue' | 'yellow' | 'red' | 'white';
  checkpointNum: string;
  waypointCode: string;
  missionName: string;
  sector: string;
  clearance: string;
  questRank: string;
  previewImage: string;
  previewImageAlt: string;
  telemetryStats: TelemetryMetric[];
  loadoutCategories: LoadoutCategory[];
}

export const JOB_EXPERIENCES: JobExperience[] = [
  {
    id: 'exp-freelance',
    checkpointNum: '01',
    waypointCode: 'PRIMARY-FOCUS',
    missionName: 'INDEPENDENT CLIENT SOLUTIONS',
    sector: 'Remote / Worldwide',
    clearance: 'FREELANCE LEAD',
    questRank: 'INDEPENDENT DEVELOPER',
    previewImage: '/src/assets/images/project_hyperion_studio.jpg',
    previewImageAlt: 'Freelance bespoke web applications and custom client solutions showcase',
    role: 'Freelance Full-Stack Developer',
    company: 'Independent Freelance Practice',
    employmentType: 'Freelance · Primary Focus',
    location: 'Worldwide · Remote',
    locationType: 'Remote',
    period: '2024 — Present',
    linkedinDate: '2024 - Present',
    timestamp: '2024.01 → PRESENT',
    duration: 'Ongoing',
    marking: 'PRIMARY FOCUS',
    tagCode: 'FREELANCE',
    status: 'ongoing',
    statusLabel: 'Primary Focus',
    summary: 'Working primarily as an independent freelance developer engineering custom web applications, responsive client websites, and end-to-end full-stack solutions.',
    achievements: [
      'Architect and ship tailored web applications and responsive landing pages for direct clients and businesses',
      'Manage complete project lifecycles from initial UI design and technical planning to full-stack code, hosting, and client handoff',
      'Deliver fast, mobile-friendly interfaces with strong search engine optimization (SEO) and accessible design standards'
    ],
    skills: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'REST APIs', 'Full-Stack Development', 'Responsive Design'],
    companyLogoText: 'FL',
    companyLogoBg: 'bg-gradient-to-br from-[#155EEF] to-[#0D3882] text-white',
    zone: 'blue',
    telemetryStats: [
      { label: 'Client Delivery', value: '100%', sublabel: 'On-time milestone delivery', percentage: 100, color: 'blue' },
      { label: 'Speed & UX', value: '98/100', sublabel: 'Lighthouse Performance', percentage: 98, color: 'cyan' },
      { label: 'Primary Focus', value: 'Freelance', sublabel: 'Independent Practice', percentage: 100, color: 'yellow' },
      { label: 'Responsiveness', value: 'Mobile-First', sublabel: 'Seamless on all screens', percentage: 100, color: 'blue' },
    ],
    loadoutCategories: [
      { category: 'Client Solutions', items: ['Custom Web Apps', 'Business Websites', 'Admin Portals', 'Direct Client Support'] },
      { category: 'Frontend UI', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Mobile UI'] },
      { category: 'Backend & APIs', items: ['Node.js', 'REST APIs', 'Database Integration', 'Form Handling'] },
      { category: 'Deployment', items: ['Vercel', 'Netlify', 'Domain Setup', 'Performance Tuning'] },
    ],
  },
  {
    id: 'exp-contactpoint360',
    checkpointNum: '02',
    waypointCode: 'CONTRACT-01',
    missionName: 'ENTERPRISE FULL STACK & AI',
    sector: 'Cebu, Philippines',
    clearance: 'FULL STACK ENGINEER',
    questRank: 'CONTRACT ENGINEER',
    previewImage: '/src/assets/images/project_edge_telemetry_1792297937782.jpg',
    previewImageAlt: 'ContactPoint 360 full stack engineering workflows and containerized tooling',
    role: 'Full Stack Engineer',
    company: 'ContactPoint 360',
    employmentType: 'Contract',
    location: 'Cebu, Central Visayas, Philippines',
    locationType: 'Hybrid',
    period: 'Apr 2026 — Sep 2026',
    linkedinDate: 'Apr 2026 - Sep 2026',
    timestamp: '2026.04 → 2026.09',
    duration: '6 mos',
    marking: 'CONTRACT ROLE',
    tagCode: 'CP360',
    status: 'previous',
    statusLabel: 'Contract',
    summary: 'Engineered full-stack features and supported team workflows utilizing Generative AI tools and containerized environments with Docker.',
    achievements: [
      'Developed and maintained full-stack web applications and robust API endpoints',
      'Containerized development and deployment workflows using Docker for cross-environment consistency',
      'Leveraged Generative AI tools to accelerate code generation, prototyping, and engineering efficiency'
    ],
    skills: ['Generative AI Tools', 'Docker', 'Full Stack Engineering', 'TypeScript', 'REST APIs', 'Web Development'],
    companyLogoText: 'CP',
    companyLogoBg: 'bg-gradient-to-br from-[#D92D20] to-[#8E1F17] text-white',
    zone: 'red',
    telemetryStats: [
      { label: 'Containerization', value: 'Docker', sublabel: 'Standardized Environment', percentage: 95, color: 'red' },
      { label: 'AI Acceleration', value: 'GenAI Tools', sublabel: 'Productivity Workflows', percentage: 94, color: 'yellow' },
      { label: 'Architecture', value: 'Full Stack', sublabel: 'Frontend & Backend', percentage: 96, color: 'cyan' },
      { label: 'Role Type', value: 'Contract', sublabel: 'Cebu (Hybrid)', percentage: 100, color: 'blue' },
    ],
    loadoutCategories: [
      { category: 'AI & Tools', items: ['Generative AI Tools', 'Docker', 'Workflow Automation'] },
      { category: 'Full Stack', items: ['Frontend Components', 'REST APIs', 'Server Integration'] },
      { category: 'Workflow', items: ['Hybrid Collaboration', 'Agile Sprints', 'Code Reviews'] },
    ],
  },
  {
    id: 'exp-spvilla',
    checkpointNum: '03',
    waypointCode: 'INTERN-01',
    missionName: 'HOSPITALITY WEB & MARKETING',
    sector: 'Koi Samui, Thailand',
    clearance: 'WEB DEVELOPER',
    questRank: 'INTERN DEVELOPER',
    previewImage: '/src/assets/images/project_design_system_1792297938435.jpg',
    previewImageAlt: 'S&P Villa Management responsive website and marketing showcase',
    role: 'Web Developer',
    company: 'S&P Villa Management',
    employmentType: 'Internship',
    location: 'Koi Samui',
    locationType: 'Remote',
    period: 'Jan 2026 — Apr 2026',
    linkedinDate: 'Jan 2026 - Apr 2026',
    timestamp: '2026.01 → 2026.04',
    duration: '4 mos',
    marking: 'INTERNSHIP',
    tagCode: 'SP-VILLA',
    status: 'previous',
    statusLabel: 'Internship',
    summary: 'Contributed to web development and integrated digital marketing initiatives for villa hospitality management.',
    achievements: [
      'Built and refined responsive web layouts and property showcase pages for international guests',
      'Collaborated closely on marketing and web development to improve lead capture and online presence',
      'Optimized media assets and frontend code for quick loading on mobile devices'
    ],
    skills: ['Marketing and Web Development', 'Web Development', 'Responsive Design', 'Frontend UI', 'SEO'],
    companyLogoText: 'SP',
    companyLogoBg: 'bg-gradient-to-br from-[#F5C400] to-[#B28900] text-[#17191D]',
    zone: 'yellow',
    telemetryStats: [
      { label: 'Responsive UX', value: '100%', sublabel: 'Mobile & Tablet Ready', percentage: 100, color: 'yellow' },
      { label: 'Focus Area', value: 'Marketing + Web', sublabel: 'Hospitality Conversion', percentage: 92, color: 'blue' },
      { label: 'Performance', value: '< 1.2s', sublabel: 'Fast Guest Load Times', percentage: 95, color: 'cyan' },
      { label: 'Work Mode', value: 'Remote', sublabel: 'International Coordination', percentage: 100, color: 'yellow' },
    ],
    loadoutCategories: [
      { category: 'Web Development', items: ['Responsive Design', 'HTML5 / CSS3', 'JavaScript', 'Cross-browser Testing'] },
      { category: 'Marketing', items: ['Landing Page Optimization', 'SEO Basics', 'Visual Content'] },
      { category: 'Operations', items: ['Remote Collaboration', 'Content Management', 'Performance Tuning'] },
    ],
  },
  {
    id: 'exp-infinit',
    checkpointNum: '04',
    waypointCode: 'INTERN-02',
    missionName: 'RESORT WEB REDESIGN & LARAVEL',
    sector: 'Bukidnon, Philippines',
    clearance: 'WEB DEVELOPER',
    questRank: 'INTERN DEVELOPER',
    previewImage: '/src/assets/images/project_fleet_logistics_1792297938129.jpg',
    previewImageAlt: 'Advanced Infinit Solutions resort web development and Laravel redesign',
    role: 'Web Developer',
    company: 'Advanced Infinit Solutions',
    employmentType: 'Internship',
    location: 'Philippines',
    locationType: 'Remote',
    period: 'Sep 2025 — Dec 2025',
    linkedinDate: 'Sep 2025 - Dec 2025',
    timestamp: '2025.09 → 2025.12',
    duration: '4 mos',
    marking: 'INTERNSHIP',
    tagCode: 'AIS-01',
    status: 'previous',
    statusLabel: 'Internship',
    summary: 'Helped developed and redesign a website for a camping resort in Bukidnon using Laravel.',
    achievements: [
      'Helped develop and redesign the official web platform for a camping resort in Bukidnon using Laravel',
      'Built clean server-side logic, routing, and dynamic page views using PHP and Laravel',
      'Applied Artificial Intelligence (AI) tools to assist in feature development and code efficiency'
    ],
    skills: ['PHP and Artificial Intelligence (AI)', 'PHP', 'Laravel', 'Artificial Intelligence (AI)', 'Web Development', 'UI Redesign'],
    companyLogoText: 'AI',
    companyLogoBg: 'bg-gradient-to-br from-[#374151] to-[#111827] text-white',
    zone: 'white',
    telemetryStats: [
      { label: 'Backend Stack', value: 'Laravel', sublabel: 'PHP Web Framework', percentage: 95, color: 'blue' },
      { label: 'Project Scope', value: 'Resort Site', sublabel: 'Bukidnon Camping Resort', percentage: 100, color: 'yellow' },
      { label: 'Modernization', value: 'Redesign', sublabel: 'Fresh User Interface', percentage: 96, color: 'cyan' },
      { label: 'AI Adoption', value: 'AI Tools', sublabel: 'Assisted Development', percentage: 90, color: 'blue' },
    ],
    loadoutCategories: [
      { category: 'Backend & Framework', items: ['PHP', 'Laravel', 'MySQL', 'Blade Templates'] },
      { category: 'AI & Tools', items: ['Artificial Intelligence (AI)', 'Git', 'Composer'] },
      { category: 'Deliverables', items: ['Camping Resort Website', 'UI/UX Redesign', 'Mobile Responsiveness'] },
    ],
  },
];

export const PROFILE_INFO = {
  name: 'Will Badillo',
  role: 'Freelance Full-Stack Developer & Web Engineer',
  headline: 'Freelance Web Developer. Building fast websites & solving real problems.',
  intro: 'Hi, I’m Will Badillo — a freelance full-stack developer crafting fast, responsive websites and bespoke web applications that deliver real results.',
  bio: 'Freelance Full-Stack Web Developer specializing in custom web applications, responsive websites, and end-to-end client solutions. Practical experience spanning modern JavaScript/TypeScript (React, Next.js, Node.js), PHP & Laravel, Docker containerization, and Generative AI tools. Experienced delivering independently for clients, corporate contract roles (ContactPoint 360), and web development internships (S&P Villa Management, Advanced Infinit Solutions).',
  email: 'willuworkx@gmail.com',
  phone: '09661345592',
  phoneFormatted: '0966 134 5592',
  location: 'Philippines · Remote / Worldwide Freelance',
  locationShort: 'Philippines · Remote / Freelance',
  github: 'https://github.com/willbadillo',
  githubUser: 'github.com/willbadillo',
  linkedin: 'https://www.linkedin.com/in/will-badillo-7838b5346/',
  linkedinUser: 'linkedin.com/in/will-badillo-7838b5346',
  website: 'https://willbadillo.dev',
  education: {
    degree: 'B.S. in Computer Science',
    institution: 'California State University',
    details: '4-Year Degree · Dean\'s Honors List',
  },
  certifications: [
    'AWS Certified Solutions Architect (Associate)',
    'Certified Web Accessibility Specialist (WCAG 2.1 AA)',
  ],
};

export interface OngoingDemoImage {
  id: string;
  title: string;
  caption: string;
  image: string;
  tag: string;
}

export interface OngoingSprint {
  number: string;
  title: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  date: string;
  items: string[];
}

export interface OngoingMetric {
  label: string;
  value: string;
  detail: string;
}

export interface OngoingProject {
  id: string;
  name: string;
  category: string;
  stage: string;
  progressPercentage: number;
  targetLaunch: string;
  summary: string;
  keyProblemSolved: string;
  latestUpdate: string;
  techStack: string[];
  zone: 'blue' | 'yellow' | 'red' | 'white';
  statusBadge: string;
  heroImage: string;
  liveUrl?: string;
  demoImages: OngoingDemoImage[];
  metrics: OngoingMetric[];
  sprints: OngoingSprint[];
  architectureNotes: string[];
  clientFeedbackQuote?: {
    quote: string;
    author: string;
    role: string;
  };
}

export const ONGOING_PROJECTS: OngoingProject[] = [
  {
    id: 'san-isidro-water-billing',
    name: 'San Isidro Water District: Official Website & Consumer Billing System',
    category: 'Official Website · Consumer Record & Billing System',
    stage: 'Public Portal & Billing Engine • 75% Built',
    progressPercentage: 75,
    targetLaunch: 'December 2026',
    summary: 'A unified digital platform built for the San Isidro Water District comprising two connected systems: the official public website for consumer bill inquiries, service advisories, and water applications; coupled with an internal Consumer Record and Billing System for automated meter reading, tiered tariff computations, customer ledgers, and cashier payments.',
    keyProblemSolved: 'Solves long customer queuing and paper billing errors by providing a 24/7 online bill inquiry and advisory portal for consumers, paired with an automated ledger and billing engine for district personnel.',
    latestUpdate: 'Shipped official public web portal with instant bill inquiry widget, plus the core consumer billing ledger and cashier payment receipting module.',
    techStack: ['React 19', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Fast APIs'],
    zone: 'blue',
    statusBadge: '2-in-1 Suite · Active Development',
    heroImage: '/src/assets/images/project_san_isidro_website.jpg',
    demoImages: [
      {
        id: 'si-district-website',
        title: 'San Isidro Water District Official Website',
        caption: 'Public-facing official website featuring 24/7 online bill inquiry, new water service application, rate advisories, and community announcements.',
        image: '/src/assets/images/project_san_isidro_website.jpg',
        tag: '1. Official Website'
      },
      {
        id: 'si-billing-overview',
        title: 'Consumer Records & Billing Management',
        caption: 'Central administrative dashboard managing active consumer profiles, meter consumption bar charts, and real-time revenue collection metrics.',
        image: '/src/assets/images/project_san_isidro_billing.jpg',
        tag: '2. Billing System'
      },
      {
        id: 'si-tariff-calculator',
        title: 'Tiered Tariff Engine & Customer Ledger',
        caption: 'Automated residential and commercial tiered water rate computation with overdue invoice tracking and payment receipts.',
        image: '/src/assets/images/project_san_isidro_billing.jpg',
        tag: 'Tariff & Ledger'
      }
    ],
    metrics: [
      { label: 'Connected Systems', value: '2 in 1', detail: 'Public Website + Consumer Billing System' },
      { label: 'Calculation Accuracy', value: '100%', detail: 'Automated tiered tariff computation' },
      { label: 'Online Bill Inquiry', value: '24/7 Live', detail: 'Instant account status check via website' },
      { label: 'Billing Speed', value: '10x Faster', detail: 'Instant invoice generation for 4,800+ consumers' }
    ],
    sprints: [
      {
        number: 'Sprint 01',
        title: 'Consumer Database & Account Ledger Schema',
        status: 'completed',
        date: 'Shipped',
        items: ['Consumer account indexing by meter number', 'Historical ledger and balance tracking', 'Zone/barangay routing organization']
      },
      {
        number: 'Sprint 02',
        title: 'Tiered Tariff Engine & Meter Reading Entry',
        status: 'completed',
        date: 'Shipped',
        items: ['Tiered consumption formula implementation', 'Meter reader mobile web entry module', 'Anomaly detection for abnormal consumption spikes']
      },
      {
        number: 'Sprint 03',
        title: 'Cashiering & Payment Reconciliation',
        status: 'completed',
        date: 'Shipped',
        items: ['Cash & online payment receipting', 'Daily collection report generation', 'Automated penalty calculation for overdue bills']
      },
      {
        number: 'Sprint 04',
        title: 'Official Water District Website & Bill Inquiry',
        status: 'in-progress',
        date: 'Current Sprint',
        items: ['Public website with 24/7 bill check by Account ID', 'Water service application form & requirements', 'Water service advisories, maintenance alerts & office announcements']
      },
      {
        number: 'Sprint 05',
        title: 'Full District Deployment & Staff Training',
        status: 'upcoming',
        date: 'December 2026',
        items: ['Staff onboarding & cashier training', 'Database migration from legacy records', 'Production server provisioning & automated backup']
      }
    ],
    architectureNotes: [
      'Integrated 2-in-1 ecosystem: A public-facing informative website paired with a secure internal billing & records portal.',
      'Reliable PostgreSQL database ensuring 100% accurate customer balances, meter logs, and payment receipts.',
      'Public bill inquiry API with rate-limiting and read-only verification protecting consumer privacy.',
      'Role-based access controls separating meter readers, billing clerks, cashiers, and district managers.'
    ],
    clientFeedbackQuote: {
      quote: 'Having our official website directly complement our consumer records and billing system modernizes our customer service and saves hours of manual calculation every cycle.',
      author: 'District Billing Supervisor',
      role: 'San Isidro Water District'
    }
  },
  {
    id: 'st-francis-colleges-suite',
    name: 'St. Francis College: Institutional Portal & QR Enrollment System',
    category: 'School Website & QR Enrollment (Website · Fast Admissions · Campus Life)',
    stage: 'Live School Site & QR Flow • 80% Built',
    progressPercentage: 80,
    targetLaunch: 'First Quarter 2027',
    liveUrl: 'https://qr-school-enrollment-system.vercel.app/',
    summary: 'An official website and fast QR student enrollment system built for St. Francis College in Allen, Northern Samar. Features school history, daily devotionals, campus photo galleries, and quick online student registration with QR codes.',
    keyProblemSolved: 'Replaces slow paper forms and scattered school updates with one easy website for student registration, campus news, school history, and community prayers.',
    latestUpdate: 'Shipped daily prayer reflections, school history timeline, campus life photo gallery, and online QR student enrollment.',
    techStack: ['React 19', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'QR Code Protocol', 'Vercel'],
    zone: 'yellow',
    statusBadge: 'Live Webapp · School Portal',
    heroImage: '/src/assets/images/st_francis_hero.png',
    demoImages: [
      {
        id: 'sfc-hero-view',
        title: 'Franciscan Education in Motion',
        caption: 'School landing experience showcasing St. Francis College heritage, academic life, campus announcements, and direct admissions portals.',
        image: '/src/assets/images/st_francis_hero.png',
        tag: 'College Portal'
      },
      {
        id: 'sfc-heritage-novena',
        title: 'Franciscan Heritage & Novena Reflections',
        caption: 'Spiritual life portal featuring the Novena to St. Francis of Assisi, Padre Pio reflections, daily healing prayers, and community devotionals.',
        image: '/src/assets/images/st_francis_heritage.png',
        tag: 'Heritage & Novena'
      },
      {
        id: 'sfc-legacy-history',
        title: 'Legacy & History of St. Francis College',
        caption: 'Historic school archive documenting the founding in Allen, Northern Samar (1948), Franciscan identity in education, and campus chapel traditions.',
        image: '/src/assets/images/st_francis_history.png',
        tag: 'Historic Archive'
      },
      {
        id: 'sfc-campus-life',
        title: 'A Glimpse of the Life of SPCians',
        caption: 'Vibrant campus life photo gallery highlighting student cultural events, Buwan ng Wika, athletics, academic milestones, and student community traditions.',
        image: '/src/assets/images/st_francis_campus_life.png',
        tag: 'Campus Life'
      }
    ],
    metrics: [
      { label: 'Established', value: '1948 / 75+ Yrs', detail: 'Historic Franciscan heritage in Northern Samar' },
      { label: 'Connected Systems', value: '3 in 1', detail: 'Main Website + QR Enrollment + Campus Life' },
      { label: 'Admissions Flow', value: 'QR-Enabled', detail: 'Fast, paperless student enrollment' },
      { label: 'Heritage Archives', value: 'Online', detail: 'Novenas, history, and photo galleries' }
    ],
    sprints: [
      {
        number: 'Sprint 01',
        title: 'Institutional Portal Branding & Hero Architecture',
        status: 'completed',
        date: 'Shipped',
        items: ['High-impact hero visual with St. Francis seal', 'Heritage typography & institutional gold navigation', 'Staff portal and Support Us touchpoints']
      },
      {
        number: 'Sprint 02',
        title: 'Franciscan Heritage, Devotionals & History',
        status: 'completed',
        date: 'Shipped',
        items: ['Novena to St. Francis of Assisi daily reflections module', 'Padre Pio healing prayers and feast day cards', 'Founding history archive from 1948 in Allen, Northern Samar']
      },
      {
        number: 'Sprint 03',
        title: 'Campus Life Photo Journal & Community Showcase',
        status: 'completed',
        date: 'Shipped',
        items: ['Vibrant masonry photo gallery of SPCian student life', 'Cultural events, athletics, and Buwan ng Wika documentation', 'Mobile-responsive lightbox exploration for campus media']
      },
      {
        number: 'Sprint 04',
        title: 'QR Code Enrollment System & Advising Integration',
        status: 'in-progress',
        date: 'Current Sprint',
        items: ['QR-based student identity validation and subject enlistment', 'Online enrollment form with prerequisite checking', 'Tuition assessment breakdown and automated admission confirmation']
      }
    ],
    architectureNotes: [
      'Single database linking student applications, class lists, and tuition payments.',
      'Clear user roles and permissions for students, teachers, registrars, cashiers, and admins.',
      'Modern Next.js setup ensuring pages load quickly on mobile phones and computers.'
    ],
    clientFeedbackQuote: {
      quote: 'The portal beautifully honors our Franciscan roots and legacy in Northern Samar while modernizing our enrollment and campus communication for the digital age.',
      author: 'College Administration',
      role: 'St. Francis College'
    }
  },
  {
    id: 'trading-bot',
    name: 'Algorithmic Trading Bot',
    category: 'Automated Trading Bot & Market Charts',
    stage: 'Live Paper Trading • 80% Built',
    progressPercentage: 80,
    targetLaunch: 'January 2027',
    summary: 'An automated trading program that reads live market prices, checks technical indicators (EMA, RSI, Bollinger Bands), and places buy/sell orders with built-in safety rules.',
    keyProblemSolved: 'Removes emotional mistakes and screen fatigue by placing trades, setting stop-losses, and locking in profits automatically.',
    latestUpdate: 'Added live price feeds, automatic risk-to-reward calculations, and a real-time chart dashboard with a live trade log.',
    techStack: ['Python', 'TypeScript', 'Node.js', 'WebSockets', 'REST APIs', 'Docker'],
    zone: 'red',
    statusBadge: 'Paper Trading Active',
    heroImage: '/src/assets/images/project_trading_bot.jpg',
    demoImages: [
      {
        id: 'tb-dashboard-view',
        title: 'Live Trades & Profit Tracking',
        caption: 'Real-time candlestick chart with automated BUY/SELL signal markers, real-time PnL graph, and live order execution log.',
        image: '/src/assets/images/project_trading_bot.jpg',
        tag: 'Live Trades'
      },
      {
        id: 'tb-analytics-view',
        title: 'Win Rate Analytics & Position Overview',
        caption: 'Strategy performance metrics showing 68.5% win rate, active long/short positions, balance history, and automated trailing stops.',
        image: '/src/assets/images/project_trading_bot.jpg',
        tag: 'Risk Analytics'
      }
    ],
    metrics: [
      { label: 'Signal Latency', value: '< 120ms', detail: 'Real-time WebSocket market feed processing' },
      { label: 'Win Rate', value: '68.5%', detail: 'Systematic strategy backtested over 500+ trades' },
      { label: 'Risk Control', value: 'Automated', detail: 'Dynamic stop-loss and position sizing enforcement' },
      { label: 'Uptime', value: '99.98%', detail: 'Containerized daemon running 24/7' }
    ],
    sprints: [
      {
        number: 'Sprint 01',
        title: 'Market Feed Ingestion & WebSocket Streamer',
        status: 'completed',
        date: 'Shipped',
        items: ['Exchange WebSocket connection manager', 'Order book & ticker heartbeat listener', 'Reconnection and failover retry handling']
      },
      {
        number: 'Sprint 02',
        title: 'Technical Indicator Engine & Signal Generator',
        status: 'completed',
        date: 'Shipped',
        items: ['EMA 50 / EMA 200 crossover detection', 'RSI momentum thresholds & volume confirmation', 'Signal filtering to prevent false breakouts']
      },
      {
        number: 'Sprint 03',
        title: 'Risk Management & Order Execution Dispatcher',
        status: 'completed',
        date: 'Shipped',
        items: ['Account percentage risk sizing rules', 'Dynamic trailing stop-loss execution', 'Instant limit & market order dispatch']
      },
      {
        number: 'Sprint 04',
        title: 'Live Chart Dashboard & Trade Alerts',
        status: 'in-progress',
        date: 'Current Sprint',
        items: ['Live web dashboard with real-time candlestick charts', 'Visual order markers and trade audit log', 'Telegram / Discord instant trade alerts']
      },
      {
        number: 'Sprint 05',
        title: 'Multi-Pair Expansion & Strategy Fine-Tuning',
        status: 'upcoming',
        date: 'January 2027',
        items: ['Parallel multi-asset monitoring', 'Machine learning volatility regime filter', 'Historical backtesting engine report export']
      }
    ],
    architectureNotes: [
      'Fast, reliable system that processes price updates instantly and accurately without freezing.',
      'Built-in safety checks that stop trades from risking too much account balance.',
      'Encrypted API credentials stored in secure environment secrets with read/trade-only permissions.'
    ],
    clientFeedbackQuote: {
      quote: 'The bot executes strategy signals with robotic discipline—eliminating second-guessing and protecting capital with automatic stop-loss rules.',
      author: 'Quantitative Trader',
      role: 'Prop Trading Client'
    }
  },
  {
    id: 'la-granja-cabins',
    name: 'La Granja Cabins: Mountain Summit Retreat',
    category: 'Hospitality & Mountain Cabin Web Experience',
    stage: 'Summit Experience & Booking • 85% Built',
    progressPercentage: 85,
    targetLaunch: 'January 2027',
    liveUrl: 'https://la-granja-cabins.vercel.app/',
    summary: 'A beautiful, inviting website for La Granja Cabins—a quiet mountain retreat reached by a 300-step stone trail, overlooking waterfalls, summit bonfires, and cozy mountain cabins.',
    keyProblemSolved: 'Helps guests experience the peace of the mountain retreat before visiting through rich photos, cabin previews, trail stories, and easy direct booking requests.',
    latestUpdate: 'Deployed interactive summit starlight bonfire module, 300-step ascent story section, waterfall vista gallery, and mobile-first reservation inquiry flow.',
    techStack: ['React 19', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    zone: 'white',
    statusBadge: 'Live Build · Mountain Retreat',
    heroImage: '/src/assets/images/lagranja_hero.jpg',
    demoImages: [
      {
        id: 'lg-summit-hero',
        title: 'Summit Ascent & Wilderness Overlook',
        caption: 'Clean hero section showcasing the 300-step stone trail into nature with waterfall overlook and cozy mountain cabins.',
        image: '/src/assets/images/lagranja_hero.jpg',
        tag: 'Summit Ascent'
      },
      {
        id: 'lg-cabin-architecture',
        title: 'Thatched A-Frame Cabin Quarters',
        caption: 'High-ridge mountain cabins built above cascading waterfalls, featuring private stone terraces and soothing natural stream sounds.',
        image: '/src/assets/images/lagranja_cabin_overlook.png',
        tag: 'Living Quarters'
      },
      {
        id: 'lg-starlight-bonfire',
        title: 'Summit Starlight & Bonfire Hearth',
        caption: 'Nighttime atmosphere with clear starry skies, warm wood bonfires, and crisp mountain breeze overlooking the river gorge below.',
        image: '/src/assets/images/lagranja_bonfire.png',
        tag: 'Bonfire Hearth'
      },
      {
        id: 'lg-wilderness-philosophy',
        title: 'Mountain Trail & Forest Grounds',
        caption: 'Shows the peaceful 300-step stone trail, refreshing mountain breeze, and quiet forest with no city noise.',
        image: '/src/assets/images/lagranja_sanctuary.png',
        tag: 'The Grounds'
      }
    ],
    metrics: [
      { label: 'Mountain Trail', value: '300+ Steps', detail: 'Scenic trail up to the mountain cabins' },
      { label: 'Night Sky', value: 'Clear Stars', detail: 'Starlight and outdoor summit bonfires' },
      { label: 'Atmosphere', value: 'Waterfalls', detail: 'Soothed by natural cascading streams' },
      { label: 'Bookings', value: 'Direct Messages', detail: 'Quick booking requests for cabin stays' }
    ],
    sprints: [
      {
        number: 'Sprint 01',
        title: 'Visual Identity & Clean Typography Design',
        status: 'completed',
        date: 'Shipped',
        items: ['Warm typography hierarchy and custom branding', 'Muted cream and deep forest color palettes', 'Responsive desktop & mobile navigation with reservation drawer']
      },
      {
        number: 'Sprint 02',
        title: 'The Cabin Story & 300-Step Trail',
        status: 'completed',
        date: 'Shipped',
        items: ['Mountain weather and waterfall viewpoint notes', 'Image galleries with soothing natural river sounds', 'Popup guide for cabin details and trail steps']
      },
      {
        number: 'Sprint 03',
        title: 'Cabin Architecture Catalog & Summit Bonfires',
        status: 'completed',
        date: 'Shipped',
        items: ['Thatched A-frame cottage showcase and stone terrace specs', 'Nighttime dark forest theme with glowing ember micro-animations', 'Interactive cabin suite feature matrix and guest amenities']
      },
      {
        number: 'Sprint 04',
        title: 'Hot Spring Spa & Dining Menu',
        status: 'in-progress',
        date: 'Current Sprint',
        items: ['Summit hot spring bath schedule and spa experiences', 'Locally sourced fresh farm dining menu display', 'Online reservation date lock and payment confirmation flow']
      }
    ],
    architectureNotes: [
      'High-performance Next.js setup delivering fast image loading on any device.',
      'Tailwind CSS with custom styling capturing cozy boutique mountain hospitality.',
      'Smooth animations and scrolling that give the feel of walking up the mountain trail.'
    ],
    clientFeedbackQuote: {
      quote: 'The website captures the quiet peace of our mountain summit before guests even take their first step up the 300 stone stairs.',
      author: 'Founding Host',
      role: 'La Granja Cabins'
    }
  }
];

export interface PricingPackage {
  id: string;
  name: string;
  tagline: string;
  price: string;
  billingPeriod: string;
  idealFor: string;
  badge?: string;
  highlight: boolean;
  zone: 'blue' | 'yellow' | 'red' | 'white';
  timeline: string;
  features: string[];
  deliverables: string[];
  ctaText: string;
  inquiryTopic: string;
}

export const PRICING_PACKAGES: PricingPackage[] = [
  {
    id: 'one-time-payment',
    name: 'Fixed-Price Project',
    tagline: 'Complete web app or site built to your spec on an agreed schedule.',
    price: 'Based on Agreement',
    billingPeriod: 'milestone-based payment',
    idealFor: 'Founders & businesses building a new website, portal, or custom software.',
    badge: 'Popular · 1-Time Build',
    highlight: true,
    zone: 'red',
    timeline: 'Agreed Milestone Schedule',
    features: [
      'Custom responsive UI/UX (React, Next.js, TypeScript)',
      'Database schema, user auth & API integrations',
      'Payment gateways (GCash, Maya, Cards) & SEO setup',
      'Free 30-day bug warranty & 100% source code ownership'
    ],
    deliverables: [
      'Production-ready website or web application',
      'Complete GitHub repository transfer & handover guide'
    ],
    ctaText: 'Discuss Fixed Project',
    inquiryTopic: 'Fixed 1-Time Project Agreement',
  },
  {
    id: 'monthly-maintenance',
    name: 'Monthly Maintenance',
    tagline: 'Continuous dev bandwidth, updates, security, and priority fixes.',
    price: 'Based on Agreement',
    billingPeriod: 'monthly retainer (cancel anytime)',
    idealFor: 'Live apps & platforms needing reliable uptime and continuous improvements.',
    badge: 'Continuous Care',
    highlight: false,
    zone: 'blue',
    timeline: 'Ongoing Monthly Support',
    features: [
      'Dedicated monthly dev hours & priority bug fixes',
      'Security patches, dependency upgrades & backups',
      'Continuous feature updates, UI tweaks & speed tune-ups',
      'Direct 1-on-1 communication via Slack or WhatsApp'
    ],
    deliverables: [
      'Monthly changelog & performance health report',
      'Shared private communication channel (Slack / WhatsApp)'
    ],
    ctaText: 'Discuss Monthly Care',
    inquiryTopic: 'Monthly Maintenance Agreement',
  },
  {
    id: 'flexible-consulting',
    name: 'Custom & Consulting',
    tagline: 'Technical advisory, code audits, or performance sprints tailored to your budget.',
    price: 'Based on Scope',
    billingPeriod: 'flexible / hourly / sprint',
    idealFor: 'Teams needing targeted speedup, code reviews, or phased delivery.',
    badge: 'Custom Scope',
    highlight: false,
    zone: 'white',
    timeline: 'Immediate / Flexible Start',
    features: [
      'Tailored scope adapted to your exact timeline and budget',
      'Core Web Vitals speedup & mobile bug fixes',
      'Fractional tech lead consulting & architecture review',
      'Transparent milestone or sprint-by-sprint tracking'
    ],
    deliverables: [
      'Actionable engineering audit & pull request',
      'Direct 1-on-1 developer consultations'
    ],
    ctaText: 'Discuss Custom Scope',
    inquiryTopic: 'Custom Scope Discussion',
  },
];
