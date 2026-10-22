import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Code2, 
  CheckCircle2, 
  ArrowUpRight,
  Play,
  Pause
} from 'lucide-react';
import { FunSectionBackground } from '../ui/FunSectionBackground';
import { DoodleInteractable } from '../ui/DoodleInteractable';

export interface TechSkill {
  id: string;
  name: string;
  category: 'frontend' | 'ai' | 'cloud' | 'backend';
  categoryLabel: string;
  zone: 'blue' | 'yellow' | 'red' | 'cyan';
  status: string;
  proficiency: number;
  tagline: string;
  description: string;
  keyFeatures: string[];
  codeSnippet: string;
  deployedIn: string[];
}

const ROW_1_SKILLS: TechSkill[] = [
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'frontend',
    categoryLabel: 'Safe Coding Language',
    zone: 'blue',
    status: 'Primary Tool',
    proficiency: 98,
    tagline: 'Reliable Code & Fewer Bugs',
    description: 'Catches typos, formatting mistakes, and errors while writing code so your website runs reliably without unexpected crashes.',
    keyFeatures: ['Catches bugs before release', 'Keeps code organized as projects grow', 'Instant validation for forms and user data', 'Prevents unexpected website crashes'],
    deployedIn: ['Server Health Dashboard', 'Delivery Fleet Tracker', 'Clinic Patient Portal', 'Design Component Library'],
    codeSnippet: `type Result<T, E = Error> = \n  | { ok: true; value: T; timestamp: number }\n  | { ok: false; error: E; code: string };\n\nexport async function queryData<T>(\n  endpoint: string\n): Promise<Result<T>> { ... }`,
  },
  {
    id: 'react',
    name: 'React.js',
    category: 'frontend',
    categoryLabel: 'Interactive Webpages',
    zone: 'blue',
    status: 'Main Website Tool',
    proficiency: 96,
    tagline: 'Interactive, Responsive Webpages',
    description: 'Builds modern, responsive interfaces where pages and buttons react instantly without clunky screen reloads.',
    keyFeatures: ['Fast, reusable webpage parts', 'Instant button and screen updates', 'Smooth transitions and animations', 'Works across mobile and desktop'],
    deployedIn: ['Server Health Dashboard', 'Delivery Fleet Tracker', 'Design Component Library', 'Client Websites'],
    codeSnippet: `export const useLiveStream = (channelId: string) => {\n  const [events, setEvents] = useState<LivePacket[]>([]);\n  useOptimisticChannel(channelId, (incoming) => {\n    setEvents((prev) => [incoming, ...prev.slice(0, 99)]);\n  });\n  return events;\n};`,
  },
  {
    id: 'ai-automation',
    name: 'AI Automation',
    category: 'ai',
    categoryLabel: 'Smart AI Tools',
    zone: 'yellow',
    status: 'Daily Workflow',
    proficiency: 94,
    tagline: 'Smart Automated Tasks & Workflows',
    description: 'Connects AI language models to business tools to handle repetitive tasks, customer inquiries, and data sorting automatically.',
    keyFeatures: ['Automatic multi-step actions', 'Clean, structured data extraction', 'Works behind the scenes with webhooks', 'Custom prompts tailored to your needs'],
    deployedIn: ['AI Studio Tooling', 'Automatic Customer Triage', 'Test Data Generators'],
    codeSnippet: `const automationAgent = new Agent({\n  model: 'gemini-2.5-pro',\n  tools: [fetchDatabaseRecords, dispatchNotification],\n  systemInstruction: 'Check incoming customer inquiries and route them.'\n});\nconst result = await automationAgent.execute(task);`,
  },
  {
    id: 'ai-assisted-dev',
    name: 'AI Assisted Development',
    category: 'ai',
    categoryLabel: 'AI Coding & Speed',
    zone: 'yellow',
    status: 'Used Daily',
    proficiency: 96,
    tagline: 'Faster Development with AI Assistance',
    description: 'Uses advanced AI coding assistants to write clean code faster, test apps thoroughly, and turn ideas into working software in record time.',
    keyFeatures: ['Rapid prototyping and feature building', 'Automated testing and bug finding', 'Smart refactoring and cleaner code', 'Accelerates delivery times'],
    deployedIn: ['Portfolio Architecture', 'Full-Stack Apps', 'API Testing Suites'],
    codeSnippet: `// Antigravity SDK Agentic Loop\nconst agent = await agy.createAgent({\n  role: 'Pair Programmer',\n  skills: ['typescript', 'docker', 'playwright'],\n  autonomousVerify: true\n});`,
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend',
    categoryLabel: 'Fast Full-Stack Websites',
    zone: 'blue',
    status: 'Production Ready',
    proficiency: 92,
    tagline: 'Fast Websites & Web Apps',
    description: 'The industry-standard platform for building super-fast websites that load instantly, rank high on Google (SEO), and run smoothly.',
    keyFeatures: ['Instant page loading and SEO ready', 'Server and webpage in one package', 'Smooth page-to-page navigation', 'Secure logins and member areas'],
    deployedIn: ['Clinic Patient Portal', 'Client Portals', 'Business Dashboards'],
    codeSnippet: `export async function GET(request: Request) {\n  const session = await auth();\n  if (!session) return new Response('Unauthorized', { status: 401 });\n  const payload = await fetchEdgeData();\n  return Response.json(payload);\n}`,
  },
  {
    id: 'javascript',
    name: 'JavaScript (ES6+)',
    category: 'frontend',
    categoryLabel: 'Core Web Language',
    zone: 'yellow',
    status: 'Native Fluency',
    proficiency: 98,
    tagline: 'The Engine of the Modern Web',
    description: 'Powers interactive features, calculations, background tasks, and smooth animations right inside the user\'s web browser.',
    keyFeatures: ['Modern, clean code standards', 'Runs smooth background calculations', 'Handles clicks, gestures, and animations', 'Supported by every modern browser'],
    deployedIn: ['All Flagship Apps', 'Studio Portals', 'Utility Scripts'],
    codeSnippet: `const worker = new Worker(new URL('./app.worker.ts', import.meta.url));\nworker.postMessage({ buffer: rawStreamBuffer }, [rawStreamBuffer]);\nworker.onmessage = ({ data }) => updateUI(data);`,
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend',
    categoryLabel: 'Design & Styling',
    zone: 'cyan',
    status: 'Fast Styling',
    proficiency: 96,
    tagline: 'Clean, Custom Design & Layouts',
    description: 'Builds beautiful, pixel-perfect designs, tailored color themes, and mobile-friendly layouts without heavy design bloat.',
    keyFeatures: ['Looks great on phones, tablets & desktops', 'Custom colors and branding themes', 'Dark mode & modern styling', 'Super-fast loading times'],
    deployedIn: ['Portfolio App', 'Server Health Dashboard', 'UI Design Kits'],
    codeSnippet: `@theme {\n  --color-brand-blue: #155EEF;\n  --color-brand-yellow: #F5C400;\n  --color-brand-red: #D92D20;\n  --font-mono: 'JetBrains Mono', monospace;\n}`,
  },
  {
    id: 'websockets',
    name: 'WebSockets & Realtime',
    category: 'frontend',
    categoryLabel: 'Instant Live Updates',
    zone: 'red',
    status: 'Real-Time',
    proficiency: 94,
    tagline: 'Live Updates Without Refreshing',
    description: 'Connects the browser directly to the server so new messages, live prices, and status changes appear on screen in real time.',
    keyFeatures: ['Sub-second instant data delivery', 'No need to refresh the page', 'Automatic reconnect if internet drops', 'Perfect for live chat, feeds, and maps'],
    deployedIn: ['Live Health Console', 'Delivery Fleet Live Map'],
    codeSnippet: `const socket = new WebSocket('wss://api.nexus.net/stream');\nsocket.binaryType = 'arraybuffer';\nsocket.onmessage = (event) => decodeLiveFrame(event.data);`,
  },
];

const ROW_2_SKILLS: TechSkill[] = [
  {
    id: 'docker',
    name: 'Docker',
    category: 'cloud',
    categoryLabel: 'App Packaging & Setup',
    zone: 'blue',
    status: 'Setup & Deploy',
    proficiency: 90,
    tagline: 'Consistent Setup Across Any Computer',
    description: 'Packages applications and all their dependencies into neat containers so they run identically on a laptop, server, or cloud.',
    keyFeatures: ['Runs the exact same way anywhere', 'Clean setup without messy installations', 'Safe and isolated environments', 'Easy deployment to the cloud'],
    deployedIn: ['Clinic Patient Portal', 'Logistics Dispatch API', 'Local Dev Environments'],
    codeSnippet: `FROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --prefer-offline\nCOPY . .\nRUN npm run build\n\nFROM nginx:alpine\nCOPY --from=builder /app/dist /usr/share/nginx/html`,
  },
  {
    id: 'nginx',
    name: 'NGINX',
    category: 'cloud',
    categoryLabel: 'Web Server & Routing',
    zone: 'red',
    status: 'Server Routing',
    proficiency: 88,
    tagline: 'Traffic Direction & Secure Web Serving',
    description: 'Directs incoming web traffic smoothly to the right servers, handles secure HTTPS/SSL certificates, and keeps sites running under heavy load.',
    keyFeatures: ['Directs visitors to the right server', 'Automatic HTTPS security and lock icons', 'Speed compression for faster loading', 'Protects servers from overload'],
    deployedIn: ['Production Gateways', 'API Dispatch Clusters', 'Cloud Hosting'],
    codeSnippet: `location /api/stream {\n  proxy_pass http://backend_upstream;\n  proxy_http_version 1.1;\n  proxy_set_header Upgrade $http_upgrade;\n  proxy_set_header Connection "upgrade";\n  proxy_read_timeout 86400;\n}`,
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'backend',
    categoryLabel: 'Database & User Accounts',
    zone: 'cyan',
    status: 'Safe Database',
    proficiency: 95,
    tagline: 'Secure Database, User Logins & Files',
    description: 'A modern cloud database that handles user signups, secure permissions, file uploads, and instant live data updates out of the box.',
    keyFeatures: ['Safe user logins and passwords', 'Strict permissions so users only see their data', 'Real-time live updates', 'Easy storage for photos and documents'],
    deployedIn: ['School Enrollment Portal', 'User Login Systems', 'Live Audit Logs'],
    codeSnippet: `CREATE POLICY "User owns their profile record"\nON public.profiles FOR ALL\nUSING (auth.uid() = user_id)\nWITH CHECK (auth.uid() = user_id);`,
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    category: 'cloud',
    categoryLabel: 'Worldwide Speed & Protection',
    zone: 'yellow',
    status: 'Global Network',
    proficiency: 92,
    tagline: 'Worldwide Speed & Website Protection',
    description: 'Distributes your website across hundreds of global servers so pages load fast anywhere in the world while shielding against attacks.',
    keyFeatures: ['Loads fast in every country', 'Shields websites from cyber attacks & bots', 'Automatic security certificates (SSL)', 'High reliability and uptime'],
    deployedIn: ['Global Website Gateways', 'Image & Asset Hosting', 'Security Shield'],
    codeSnippet: `export default {\n  async fetch(request, env, ctx) {\n    const cached = await caches.default.match(request);\n    if (cached) return cached;\n    return fetchAndCache(request);\n  }\n};`,
  },
  {
    id: 'vercel',
    name: 'Vercel',
    category: 'cloud',
    categoryLabel: 'Cloud Hosting & Deploy',
    zone: 'red',
    status: 'One-Click Publish',
    proficiency: 95,
    tagline: 'Instant Website Publishing',
    description: 'Publishes code updates to the web in seconds with automated testing, staging links to preview changes, and 99.99% uptime.',
    keyFeatures: ['Publishes updates in seconds', 'Shareable preview links before going live', 'One-click rollback if mistakes happen', 'High-speed worldwide hosting'],
    deployedIn: ['Client Web Apps', 'Company Portals', 'Test Preview Environments'],
    codeSnippet: `// vercel.json\n{\n  "framework": "nextjs",\n  "regions": ["sfo1", "iad1"],\n  "headers": [{ "source": "/(.*)", "headers": [{ "key": "X-Robots-Tag", "value": "all" }] }]\n}`,
  },
  {
    id: 'paymongo',
    name: 'PayMongo',
    category: 'backend',
    categoryLabel: 'Online Payments & Checkout',
    zone: 'cyan',
    status: 'Payment Ready',
    proficiency: 92,
    tagline: 'Simple, Secure Online Payments',
    description: 'Integrates Philippine payment methods including GCash, Maya, credit/debit cards, and bank transfers with instant digital receipts.',
    keyFeatures: ['Accepts GCash, Maya & Cards', 'Secure checkout with fraud protection', 'Instant payment confirmation receipts', 'Automated order status updates'],
    deployedIn: ['School Enrollment Portal', 'Online Store Checkout', 'Subscription Billing'],
    codeSnippet: `const signature = request.headers['paymongo-signature'];\nconst verified = verifyPayMongoWebhook(rawBody, signature, env.PAYMONGO_WEBHOOK_SECRET);\nif (verified.type === 'payment.paid') {\n  await fulfillStudentEnrollment(verified.data);\n}`,
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend',
    categoryLabel: 'Server & API Engine',
    zone: 'blue',
    status: 'Server Systems',
    proficiency: 92,
    tagline: 'Fast Server Logic & APIs',
    description: 'Runs backend server code to handle business rules, send emails, process orders, and connect websites to databases reliably.',
    keyFeatures: ['Handles many visitors at the same time', 'Connects websites to databases and tools', 'Secure session logins and authentication', 'Automated background tasks and emails'],
    deployedIn: ['Logistics Dispatch API', 'Microservice Clusters'],
    codeSnippet: `import fastify from 'fastify';\nconst app = fastify({ logger: true });\napp.register(import('@fastify/cors'));\napp.register(appRoutes, { prefix: '/v1/api' });\nawait app.listen({ port: 8080, host: '0.0.0.0' });`,
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'backend',
    categoryLabel: 'Structured Database',
    zone: 'blue',
    status: 'Reliable Storage',
    proficiency: 94,
    tagline: 'Reliable, Organized Data Storage',
    description: 'An industry-grade database that keeps customer records, orders, and business data organized, safe, and easily searchable.',
    keyFeatures: ['Keeps records organized and accurate', 'Fast searches even with large datasets', 'Prevents accidental data loss or corruption', 'Handles text, numbers, locations, and files'],
    deployedIn: ['Fleet Tracking Engine', 'Clinic Patient Records', 'Enrollment DB'],
    codeSnippet: `CREATE INDEX idx_user_record_time \nON public.user_records (user_id, recorded_at DESC);\n-- Fast geospatial lookup query\nSELECT * FROM vehicles WHERE ST_DWithin(geom, $1, 5000);`,
  },
];

const ALL_SKILLS = [...ROW_1_SKILLS, ...ROW_2_SKILLS];

/**
 * Authentic vector logos & symbols for each skill
 */
export const SkillLogo: React.FC<{ id: string; className?: string }> = ({ id, className = "w-5 h-5" }) => {
  switch (id) {
    case 'typescript':
      return (
        <svg viewBox="0 0 128 128" className={className} fill="none">
          <rect width="128" height="128" rx="20" fill="#3178C6" />
          <path d="M72.5 98.7c3.9 2.2 8.5 3.5 13.4 3.5 10.4 0 16.3-5.3 16.3-13.6 0-8.2-5.6-11.9-16.7-16.6-11.7-4.9-17.1-10.8-17.1-21.7 0-12.7 10-21.3 25.1-21.3 5.4 0 9.8 1.1 13 2.7l-3.2 11.2c-2.7-1.4-6.3-2.4-10.2-2.4-8.1 0-12.9 4.3-12.9 10.4 0 7.4 4.8 10.4 15.5 15 12.8 5.5 18.5 11.5 18.5 23.3 0 14.1-10.8 23.3-28.5 23.3-6.6 0-12.6-1.5-16.6-3.8l3.4-11zm-48.4-58.4h43.7v11.6H54v60.9H41.6V51.9H24.1V40.3z" fill="#FFF" />
        </svg>
      );
    case 'react':
      return (
        <svg viewBox="-11.5 -10.23 23 20.46" className={className}>
          <circle cx="0" cy="0" r="2.05" fill="#61DAFB"/>
          <g stroke="#61DAFB" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      );
    case 'nextjs':
      return (
        <svg viewBox="0 0 180 180" className={className} fill="none">
          <circle cx="90" cy="90" r="90" fill="#000000"/>
          <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.168 149.508 157.52Z" fill="url(#paint0_next)"/>
          <rect x="115" y="54" width="12" height="72" fill="url(#paint1_next)"/>
          <defs>
            <linearGradient id="paint0_next" x1="109" y1="116.5" x2="144.5" y2="160.5" gradientUnits="userSpaceOnUse">
              <stop stopColor="white"/>
              <stop offset="1" stopColor="white" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="paint1_next" x1="121" y1="54" x2="120.799" y2="106.875" gradientUnits="userSpaceOnUse">
              <stop stopColor="white"/>
              <stop offset="1" stopColor="white" stopOpacity="0"/>
            </linearGradient>
          </defs>
        </svg>
      );
    case 'javascript':
      return (
        <svg viewBox="0 0 128 128" className={className}>
          <rect width="128" height="128" rx="20" fill="#F7DF1E"/>
          <path d="M72.5 98.7c3.9 2.2 8.5 3.5 13.4 3.5 10.4 0 16.3-5.3 16.3-13.6 0-8.2-5.6-11.9-16.7-16.6-11.7-4.9-17.1-10.8-17.1-21.7 0-12.7 10-21.3 25.1-21.3 5.4 0 9.8 1.1 13 2.7l-3.2 11.2c-2.7-1.4-6.3-2.4-10.2-2.4-8.1 0-12.9 4.3-12.9 10.4 0 7.4 4.8 10.4 15.5 15 12.8 5.5 18.5 11.5 18.5 23.3 0 14.1-10.8 23.3-28.5 23.3-6.6 0-12.6-1.5-16.6-3.8l3.4-11zm-32.3 2.8c4.2 2.5 8.9 3.9 13.5 3.9 11.8 0 18.8-5.7 18.8-18.7V40.3H60.1v45.9c0 6.6-3.3 9.4-8.6 9.4-3.6 0-6.6-1.1-8.5-2.2l-2.8 8.1z" fill="#000000"/>
        </svg>
      );
    case 'tailwind':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#38BDF8">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"/>
        </svg>
      );
    case 'docker':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#2496ED">
          <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.714h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186H8.1a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.928 0h2.12a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185M23.76 9.89c-.365-1.01-1.396-1.574-1.442-1.602l-.372-.213-.243.353c-.394.57-.96 1.05-1.624 1.378-.292-.257-.62-.48-1.026-.643l-.407-.163-.163.407c-.475 1.18-.328 2.378.367 3.238-.344.17-.723.298-1.127.378H1.327c-.246 0-.46.126-.58.33-.122.204-.132.457-.026.671C2.106 17.067 5.64 19.5 9.774 19.5c6.334 0 11.238-4.223 12.637-10.42.545-.074 1.183-.247 1.545-.733.22-.295.337-.648.337-1.037 0-.472-.18-.946-.533-1.42"/>
        </svg>
      );
    case 'nginx':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#009639">
          <path d="M12 0L1.604 6v12L12 24l10.396-6V6L12 0zm0 2.21l8.477 4.894v9.792L12 21.79 3.523 16.896V7.104L12 2.21zm-4.717 5.5v8.58h1.928v-5.228l5.578 5.228h1.928V7.71h-1.928v5.228L9.211 7.71H7.283z"/>
        </svg>
      );
    case 'supabase':
      return (
        <svg viewBox="0 0 24 24" className={className}>
          <path d="M13.4 1.5L2 15.3h8.3L8.6 22.5 22 8.7h-8.3l1.7-7.2z" fill="#3ECF8E"/>
        </svg>
      );
    case 'cloudflare':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#F38020">
          <path d="M18.23 9.09A6.5 6.5 0 006.32 8.5a4.5 4.5 0 00-1.82 8.62h13.91a3.5 3.5 0 00-.18-8.03zm-1.82 6.53H4.5a2.5 2.5 0 010-5c.2 0 .4.02.6.07a4.5 4.5 0 018.66-1.57A4.5 4.5 0 0117 11.5a1.5 1.5 0 01-.59 2.12z"/>
        </svg>
      );
    case 'vercel':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#000000">
          <path d="M12 1L24 22H0L12 1Z"/>
        </svg>
      );
    case 'paymongo':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <rect width="24" height="24" rx="6" fill="#00D06C"/>
          <path d="M6.5 17V7h2.8l2.7 5.6L14.7 7h2.8v10h-2.2v-6.2L12.7 16h-1.4L8.7 10.8V17H6.5z" fill="#FFF"/>
        </svg>
      );
    case 'nodejs':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#539E43">
          <path d="M12 2l9 5.2v10.4L12 23l-9-5.4V7.2L12 2zm0 2.3L4.8 8.5v7.2L12 20.1l7.2-4.4V8.5L12 4.3z"/>
        </svg>
      );
    case 'postgresql':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="#336791">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      );
    case 'ai-automation':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a4 4 0 0 0-4 4v1H7a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1v1a4 4 0 0 0 4 4h0a4 4 0 0 0 4-4v-1h1a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3h-1V6a4 4 0 0 0-4-4z"/>
          <circle cx="9.5" cy="11.5" r="1.5" fill="#7C3AED"/>
          <circle cx="14.5" cy="11.5" r="1.5" fill="#7C3AED"/>
        </svg>
      );
    case 'ai-assisted-dev':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" fill="#F5C400"/>
          <path d="M5 4L6 7L9 8L6 9L5 12L4 9L1 8L4 7L5 4Z" fill="#155EEF"/>
        </svg>
      );
    case 'websockets':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1"/>
          <path d="M6 8H5a4 4 0 0 0 0 8h1"/>
          <line x1="8" y1="12" x2="16" y2="12"/>
          <polyline points="14 10 16 12 14 14"/>
          <polyline points="10 14 8 12 10 10"/>
        </svg>
      );
    default:
      return (
        <div className={`rounded bg-slate-800 text-white flex items-center justify-center text-[10px] font-bold ${className}`}>
          {id.slice(0, 2).toUpperCase()}
        </div>
      );
  }
};

export const SkillsSection: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<TechSkill | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Keyboard navigation inside modal
  useEffect(() => {
    if (!selectedSkill) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedSkill(null);
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedSkill]);

  const currentIndex = selectedSkill ? ALL_SKILLS.findIndex((s) => s.id === selectedSkill.id) : -1;
  const totalCount = ALL_SKILLS.length;

  const handlePrev = () => {
    if (currentIndex === -1) return;
    const prevIdx = (currentIndex - 1 + totalCount) % totalCount;
    setSelectedSkill(ALL_SKILLS[prevIdx]);
  };

  const handleNext = () => {
    if (currentIndex === -1) return;
    const nextIdx = (currentIndex + 1) % totalCount;
    setSelectedSkill(ALL_SKILLS[nextIdx]);
  };

  return (
    <section 
      id="skills" 
      className="py-16 md:py-24 bg-[#155EEF] text-white relative overflow-hidden font-sans"
    >
      {/* Fun Dynamic Animated Background */}
      <FunSectionBackground theme="blue" variant="skills" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-xl mx-auto mb-8"
        >
          {/* Header Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white rounded-full text-xs font-semibold text-[#155EEF] mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#155EEF]" />
            <span className="text-[11px] font-bold text-[#155EEF] uppercase tracking-wider">
              Tech Stack &amp; Tools
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            Tools &amp; Technologies I Use
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-white/85 font-normal">
            Hover to pause, click any logo to see how I use it to build your website.
          </p>

          {/* Pause / Resume Toggle */}
          <div className="mt-4 inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-xs text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-white font-medium">Auto-Scroll</span>

            <button
              onClick={() => setIsPaused(!isPaused)}
              className="px-2 py-0.5 rounded bg-white/20 hover:bg-white/30 text-white text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
            >
              {isPaused ? (
                <>
                  <Play className="w-2.5 h-2.5 text-white" />
                  <span>Resume</span>
                </>
              ) : (
                <>
                  <Pause className="w-2.5 h-2.5 text-white" />
                  <span>Pause</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

      </div>

      {/* =========================================================================
          DUAL KINETIC CAROUSELS: SYMBOLS AND LOGOS ONLY
         ========================================================================= */}
      <motion.div 
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        className="w-full relative py-2 space-y-3.5 overflow-hidden"
      >
        
        {/* Soft edge fade masks on Left and Right matching Solid Blue */}
        <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#155EEF] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#155EEF] to-transparent z-20 pointer-events-none" />

        {/* ROW 1: Moves Left to Right */}
        <div className="relative w-full overflow-hidden">
          <div 
            className="animate-marquee-right gap-3 px-2"
            style={{ animationPlayState: isPaused ? 'paused' : undefined }}
          >
            {[...ROW_1_SKILLS, ...ROW_1_SKILLS, ...ROW_1_SKILLS, ...ROW_1_SKILLS].map((skill, idx) => (
              <DoodleInteractable 
                key={`r1-${skill.id}-${idx}`}
                variant="tab" 
                accentColor={skill.zone === 'yellow' ? '#F5C400' : skill.zone === 'red' ? '#D92D20' : '#155EEF'}
              >
                <motion.button
                  whileHover={{ scale: 1.07, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSkill(skill)}
                  className="inline-flex items-center gap-2.5 px-3.5 py-2 bg-white rounded-xl border border-slate-300/80 shadow-2xs hover:shadow-lg hover:border-[#155EEF] transition-colors cursor-pointer group shrink-0 select-none"
                  title={`Inspect ${skill.name}`}
                >
                  <div className="w-6 h-6 flex items-center justify-center shrink-0">
                    <SkillLogo id={skill.id} className="w-5 h-5 object-contain" />
                  </div>
                  <span className="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-[#155EEF] transition-colors whitespace-nowrap">
                    {skill.name}
                  </span>
                </motion.button>
              </DoodleInteractable>
            ))}
          </div>
        </div>

        {/* ROW 2: Moves Right to Left */}
        <div className="relative w-full overflow-hidden">
          <div 
            className="animate-marquee-left gap-3 px-2"
            style={{ animationPlayState: isPaused ? 'paused' : undefined }}
          >
            {[...ROW_2_SKILLS, ...ROW_2_SKILLS, ...ROW_2_SKILLS, ...ROW_2_SKILLS].map((skill, idx) => (
              <DoodleInteractable 
                key={`r2-${skill.id}-${idx}`}
                variant="tab" 
                accentColor={skill.zone === 'yellow' ? '#F5C400' : skill.zone === 'red' ? '#D92D20' : '#155EEF'}
              >
                <motion.button
                  whileHover={{ scale: 1.07, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedSkill(skill)}
                  className="inline-flex items-center gap-2.5 px-3.5 py-2 bg-white rounded-xl border border-slate-300/80 shadow-2xs hover:shadow-lg hover:border-[#155EEF] transition-colors cursor-pointer group shrink-0 select-none"
                  title={`Inspect ${skill.name}`}
                >
                  <div className="w-6 h-6 flex items-center justify-center shrink-0">
                    <SkillLogo id={skill.id} className="w-5 h-5 object-contain" />
                  </div>
                  <span className="text-xs sm:text-[13px] font-bold text-slate-800 group-hover:text-[#155EEF] transition-colors whitespace-nowrap">
                    {skill.name}
                  </span>
                </motion.button>
              </DoodleInteractable>
            ))}
          </div>
        </div>

      </motion.div>

      {/* =========================================================================
          CLEAN DETAIL INSPECTOR MODAL (ON CLICK)
         ========================================================================= */}
      <AnimatePresence>
        {selectedSkill && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="skill-modal-title"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSkill(null)}
              className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm"
            />

            <motion.div
              key={selectedSkill.id}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="relative z-10 w-full max-w-xl bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[88vh] flex flex-col font-sans border border-slate-200"
            >
              {/* Top Accent Strip */}
              <div className="h-1.5 w-full bg-[#155EEF] shrink-0" />

              {/* Modal Header */}
              <div className="px-5 py-3.5 border-b border-slate-200 flex items-center justify-between gap-3 shrink-0 bg-[#F8FAFC]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center shrink-0">
                    <SkillLogo id={selectedSkill.id} className="w-6 h-6 object-contain" />
                  </div>

                  <div>
                    <h3 id="skill-modal-title" className="text-base font-bold text-[#17191D] leading-tight">
                      {selectedSkill.name}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {selectedSkill.categoryLabel} • {selectedSkill.status}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={handlePrev}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                    title="Previous Skill"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleNext}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                    title="Next Skill"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => setSelectedSkill(null)}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer ml-1"
                    title="Close (ESC)"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-5 overflow-y-auto grow space-y-4 text-xs sm:text-sm">
                
                {/* Description */}
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
                    What It Does
                  </h4>
                  <p className="text-slate-700 leading-relaxed font-normal">
                    {selectedSkill.description}
                  </p>
                </div>

                {/* Key Features */}
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Key Benefits
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedSkill.keyFeatures.map((feat, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-[#F8FAFC] border border-slate-200/80 flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Code Architecture Sample */}
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Code2 className="w-3.5 h-3.5 text-[#155EEF]" />
                    <span>Code Example</span>
                  </h4>
                  <div className="p-3 rounded-xl bg-[#0F172A] text-slate-200 font-mono text-[11px] leading-relaxed overflow-x-auto border border-slate-800">
                    <pre><code>{selectedSkill.codeSnippet}</code></pre>
                  </div>
                </div>

                {/* Deployed In */}
                <div>
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                    Used In Projects
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedSkill.deployedIn.map((app) => (
                      <span key={app} className="px-2 py-0.5 rounded-md bg-[#F1F5F9] text-slate-700 text-xs font-medium border border-slate-200">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="px-5 py-3 border-t border-slate-200 bg-[#F8FAFC] flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium">
                  {currentIndex + 1} of {totalCount} Skills
                </span>

                <button
                  onClick={() => setSelectedSkill(null)}
                  className="px-3.5 py-1 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-700 font-medium transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};
