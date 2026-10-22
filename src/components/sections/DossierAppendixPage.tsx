import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Terminal as TerminalIcon, 
  RotateCcw, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  Sparkles, 
  Zap, 
  Copy, 
  Check, 
  Activity, 
  ArrowLeft,
  Server,
  Database,
  Globe,
  Sliders,
  Send,
  BookOpen
} from 'lucide-react';
import { PROFILE_INFO } from '../../data/portfolio';

const CORE_SKILLS = [
  { name: 'TypeScript', level: 98, category: 'Frontend' },
  { name: 'React 19 / Next.js', level: 96, category: 'Frontend' },
  { name: 'Tailwind CSS', level: 95, category: 'Styling' },
  { name: 'Node.js / Express', level: 92, category: 'Backend' },
  { name: 'PostgreSQL / Supabase', level: 90, category: 'Database' },
  { name: 'Docker / Cloudflare', level: 88, category: 'DevOps' },
  { name: 'AI / LLM Agents', level: 91, category: 'AI Tools' },
  { name: 'REST & WebSockets', level: 94, category: 'Backend' },
];

interface DossierAppendixPageProps {
  onFlipBack: () => void;
}

export const DossierAppendixPage: React.FC<DossierAppendixPageProps> = ({ onFlipBack }) => {
  // Terminal state
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<Array<{ command: string; output: string | React.ReactNode }>>([
    {
      command: 'init --system',
      output: (
        <span className="text-emerald-400">
          ✓ Core modules loaded. Portfolio Appendix v2.4 initialized in sandbox mode.
        </span>
      ),
    },
    {
      command: 'help',
      output: (
        <span className="text-slate-300">
          Available commands: <span className="text-[#F5C400] font-bold">whoami</span>,{' '}
          <span className="text-[#155EEF] font-bold">skills</span>,{' '}
          <span className="text-[#D92D20] font-bold">ping</span>,{' '}
          <span className="text-emerald-400 font-bold">flip</span>,{' '}
          <span className="text-cyan-400 font-bold">clear</span>
        </span>
      ),
    },
  ]);

  // Copied token state
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let output: string | React.ReactNode = '';

    switch (cmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-slate-300">
            <div><span className="text-[#F5C400] font-bold">whoami</span> - Developer profile &amp; background</div>
            <div><span className="text-[#155EEF] font-bold">skills</span> - Core technology competency stack</div>
            <div><span className="text-[#D92D20] font-bold">ping</span> - Test simulated network response time</div>
            <div><span className="text-purple-400 font-bold">status</span> - Current server &amp; application health</div>
            <div><span className="text-emerald-400 font-bold">flip</span> / <span className="text-emerald-400 font-bold">back</span> - Flip back to main portfolio page</div>
            <div><span className="text-cyan-400 font-bold">clear</span> - Clear terminal session output</div>
          </div>
        );
        break;
      case 'whoami':
        output = (
          <span className="text-slate-200">
            <strong className="text-white">{PROFILE_INFO.name}</strong> — {PROFILE_INFO.role}.<br />
            {PROFILE_INFO.bio.slice(0, 160)}...
          </span>
        );
        break;
      case 'skills':
        output = (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs pt-1">
            {CORE_SKILLS.map((s) => (
              <span key={s.name} className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                {s.name} ({s.level}%)
              </span>
            ))}
          </div>
        );
        break;
      case 'ping':
        output = <span className="text-emerald-400">PONG: edge-server latency 11ms · 0% packet loss</span>;
        break;
      case 'status':
        output = <span className="text-cyan-300">System Healthy. 100% test coverage on critical paths. Uptime 99.98%.</span>;
        break;
      case 'flip':
      case 'back':
        onFlipBack();
        return;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        output = <span className="text-red-400">Command not recognized: &quot;{cmd}&quot;. Type &quot;help&quot; for valid commands.</span>;
    }

    setTerminalHistory((prev) => [...prev, { command: cmd, output }]);
    setTerminalInput('');
  };

  return (
    <div className="min-h-screen bg-[#0F1115] text-slate-100 font-sans selection:bg-[#F5C400] selection:text-[#17191D] pb-24">
      {/* Top Engineering Blueprint Bar */}
      <div className="h-1 gundam-tricolor-bar w-full" />

      {/* Header Sticky Action Bar */}
      <header className="sticky top-0 z-40 bg-[#17191D]/90 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onFlipBack}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#155EEF] hover:bg-[#124ec6] text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer group"
              title="Flip back to main portfolio page"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Flip to Main Portfolio (Page 01)</span>
            </button>

            <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-[11px] font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>PAGE 02: APPENDIX &amp; SYSTEM BLUEPRINTS</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700">
              RX-78-2 CORE SPEC
            </span>
            <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 flex items-center gap-1">
              <Activity className="w-3 h-3 animate-pulse" />
              <span>SYS OPTIMAL</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main Page 2 Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 space-y-12">
        {/* Page 2 Title Hero */}
        <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#17191D] to-[#121418] border-2 border-slate-800 shadow-2xl overflow-hidden">
          {/* Subtle grid pattern */}
          <div className="absolute inset-0 cozy-grid-white opacity-40 pointer-events-none" />

          {/* Tricolor accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1 gundam-tricolor-bar" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#155EEF]/20 border border-[#155EEF]/40 text-[#4382ff] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#F5C400]" />
              <span>Technical Field Appendix · Chapter 02</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Architecture Blueprints &amp; Technical Lab
            </h1>

            <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Welcome to Page 02. This interactive appendix details the architectural patterns, latency benchmarks, color tokens, and a live CLI terminal that power my web applications.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={onFlipBack}
                className="px-4 py-2 rounded-xl bg-white text-[#17191D] hover:bg-slate-200 text-xs font-black transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <BookOpen className="w-4 h-4 text-[#155EEF]" />
                <span>Return to Page 01 (Main Portfolio)</span>
              </button>

              <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5C400]" />
                <span>Drag the bookmark on the left anytime to flip back</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 1: LIVE INTERACTIVE DEV TERMINAL */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-5 h-5 text-[#F5C400]" />
              <h2 className="text-xl font-bold text-white tracking-tight">
                Interactive Developer Terminal
              </h2>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Type <strong className="text-white">help</strong> for command list
            </span>
          </div>

          <div className="rounded-2xl bg-black/90 border-2 border-slate-800 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
            {/* Terminal Window Header */}
            <div className="px-4 py-2.5 bg-[#17191D] border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#D92D20]" />
                <span className="w-3 h-3 rounded-full bg-[#F5C400]" />
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-400 ml-2">will@hyperion-node:~</span>
              </div>
              <span className="text-[11px] text-slate-500">zsh · interactive</span>
            </div>

            {/* Terminal Output Body */}
            <div className="p-4 sm:p-6 space-y-3 max-h-72 overflow-y-auto">
              {terminalHistory.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="text-[#155EEF] font-bold">➜</span>
                    <span className="text-cyan-400">~</span>
                    <span className="text-white">{item.command}</span>
                  </div>
                  <div className="pl-4">{item.output}</div>
                </div>
              ))}

              {/* Active Prompt Line */}
              <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 pt-2">
                <span className="text-[#155EEF] font-bold">➜</span>
                <span className="text-cyan-400">~</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Type a command (help, skills, whoami, ping, flip)..."
                  className="flex-1 bg-transparent border-none outline-none text-white placeholder-slate-600 font-mono"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs cursor-pointer flex items-center gap-1"
                >
                  <Send className="w-3 h-3" />
                  <span>Run</span>
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* SECTION 2: SYSTEM ARCHITECTURE BLUEPRINTS */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-[#155EEF]" />
            <h2 className="text-xl font-bold text-white tracking-tight">
              High-Availability Web Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#17191D] border border-slate-800 shadow-md flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#155EEF]/20 text-[#155EEF] flex items-center justify-center mb-3">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-sm">Edge CDN Layer</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Cloudflare global edge network with HTTP/3, Brotli compression, and regional smart caching for &lt;20ms worldwide TTFB.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-emerald-400 flex items-center justify-between">
                <span>Latency</span>
                <span>~12ms TTFB</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#17191D] border border-slate-800 shadow-md flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#F5C400]/20 text-[#F5C400] flex items-center justify-center mb-3">
                  <Server className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-sm">SSR &amp; Client Hydration</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Next.js 15 Server Components combined with React 19 Client boundaries for zero unnecessary client bundle overhead.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-emerald-400 flex items-center justify-between">
                <span>Bundle Size</span>
                <span>Optimized &lt;180kB</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#17191D] border border-slate-800 shadow-md flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-[#D92D20]/20 text-[#D92D20] flex items-center justify-center mb-3">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-sm">PostgreSQL + Realtime</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Supabase relational database with Row Level Security (RLS) policies, indexed queries, and real-time WebSocket diffing.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-emerald-400 flex items-center justify-between">
                <span>Security</span>
                <span>RLS Active</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#17191D] border border-slate-800 shadow-md flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white text-sm">CI/CD &amp; Testing</h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Automated GitHub Actions pipelines with linting, TypeScript strict mode verification, and Lighthouse CI speed gates.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] font-mono text-emerald-400 flex items-center justify-between">
                <span>Lighthouse</span>
                <span>98+ Score</span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: DESIGN SYSTEM TOKENS LEDGER */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#D92D20]" />
              <h2 className="text-xl font-bold text-white tracking-tight">
                Design System Palette &amp; Tokens
              </h2>
            </div>
            <span className="text-xs text-slate-400">Click any card to copy HEX</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {[
              { name: 'Gundam Blue', hex: '#155EEF', role: 'Primary Brand / CTAs' },
              { name: 'Gundam Gold', hex: '#F5C400', role: 'Highlights / Accents' },
              { name: 'Gundam Red', hex: '#D92D20', role: 'Attention / Alerts' },
              { name: 'Titanium Dark', hex: '#17191D', role: 'Dark Surface Contrast' },
              { name: 'Pure Canvas', hex: '#FFFFFF', role: 'Card & Surface Pure' },
            ].map((token) => (
              <button
                key={token.name}
                onClick={() => handleCopy(token.hex)}
                className="p-3.5 rounded-2xl bg-[#17191D] border border-slate-800 hover:border-slate-600 transition-all text-left flex flex-col justify-between group cursor-pointer shadow-xs active:scale-95"
              >
                <div
                  className="w-full h-12 rounded-xl mb-3 border border-black/20 shadow-inner flex items-center justify-end p-2"
                  style={{ backgroundColor: token.hex }}
                >
                  <span className="p-1 rounded bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity text-[10px] flex items-center gap-1 font-mono">
                    {copiedToken === token.hex ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedToken === token.hex ? 'Copied!' : 'Copy'}</span>
                  </span>
                </div>
                <div>
                  <div className="font-bold text-white text-xs">{token.name}</div>
                  <div className="text-[11px] font-mono text-[#F5C400] mt-0.5">{token.hex}</div>
                  <div className="text-[10px] text-slate-500 mt-1">{token.role}</div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* SECTION 4: CALL TO ACTION FOOTER */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#155EEF]/20 via-[#17191D] to-[#D92D20]/20 border border-slate-800 text-center flex flex-col items-center justify-center gap-4">
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Ready to explore the rest of the work?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg">
            Flip back to Page 01 to review featured production projects, active builds, verified experience, and rates.
          </p>
          <button
            onClick={onFlipBack}
            className="px-6 py-3 rounded-2xl bg-[#155EEF] hover:bg-[#124ec6] text-white font-bold text-xs sm:text-sm shadow-xl transition-all flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Flip Back to Page 01 (Main Portfolio)</span>
          </button>
        </div>
      </main>
    </div>
  );
};
