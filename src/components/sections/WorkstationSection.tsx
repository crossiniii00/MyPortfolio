import React from 'react';
import { motion } from 'motion/react';
import { 
  Cpu, 
  HardDrive, 
  Monitor, 
  Zap, 
  Activity, 
  Sparkles,
  Terminal,
  Clock
} from 'lucide-react';
import { FunSectionBackground } from '../ui/FunSectionBackground';

export const WorkstationSection: React.FC = () => {
  return (
    <section 
      id="workstation" 
      className="py-16 md:py-24 bg-white text-[#17191D] relative overflow-hidden font-sans border-t border-b border-[#E9EDF2]"
    >
      {/* Fun Dynamic Animated Background with Speed Stripes */}
      <FunSectionBackground theme="white" variant="workstation" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* =========================================================================
            SECTION HEADER: CLEAN, EDITORIAL & PROFESSIONAL
           ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-14"
        >
          {/* Header Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-md text-xs font-semibold text-slate-800 border border-slate-200 shadow-2xs mb-3">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#155EEF]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5C400]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#D92D20]" />
            </div>
            <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider font-mono">
              DEVELOPMENT HARDWARE // 08
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#17191D] mb-3">
            Devices Used for Development
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-normal leading-relaxed">
            High-performance dual machines configured for instant local compiles, heavy AI model inference, and cross-platform desktop and mobile verification.
          </p>
        </motion.div>


        {/* =========================================================================
            DUAL MACHINES: SHARP HIGH-PRECISION ENGINEERING SPEC SHEETS
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

          {/* =======================================================================
              DEVICE 1: LENOVO LEGION PRO 7i (INTEL CORE ULTRA 9 275HX + RTX 5070 Ti)
             ======================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
            className="bg-white rounded-xl border-2 border-slate-300 shadow-sm hover:shadow-xl hover:border-slate-400 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Cockpit Status Header */}
              <div className="bg-[#17191D] text-white px-4 sm:px-6 py-3 border-b border-black flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <span className="font-mono text-xs font-bold tracking-wider text-slate-200">
                    PRIMARY NODE // 01
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/10 text-emerald-400 border border-white/10">
                    HEAVY COMPUTE RIG
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
                  <span className="text-[#155EEF] font-bold">ARROW LAKE-HX</span>
                  <span>·</span>
                  <span className="text-emerald-400 font-bold">BLACKWELL</span>
                </div>
              </div>

              {/* Title Block */}
              <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/50">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-2xl font-black text-[#17191D] tracking-tight">
                      Lenovo Legion Pro 7i
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-blue-50 text-[#155EEF] border border-blue-200">
                      GEN 10 · 2025/2026
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Heavy Compute Workstation · Local AI Inference &amp; Backend Microservices
                  </p>
                </div>
                <div className="hidden sm:flex flex-col items-end shrink-0">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">FORM FACTOR</span>
                  <span className="text-xs font-mono font-bold text-slate-700">16" Aluminum Rig</span>
                </div>
              </div>

              {/* Sharp Precision Spec Rows */}
              <div className="divide-y divide-slate-100 font-sans">
                {/* 1. Processor (CPU) - Verified Intel Core Ultra 9 275HX */}
                <div className="p-4 sm:px-6 hover:bg-slate-50/80 transition-colors flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 text-[#155EEF] flex items-center justify-center shrink-0 mt-0.5">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10.5px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                        PROCESSOR (CPU)
                      </span>
                      <span className="text-[10px] font-mono font-bold bg-blue-50 text-[#155EEF] px-2 py-0.5 rounded border border-blue-200">
                        24C / 24T
                      </span>
                    </div>
                    <p className="text-sm sm:text-base font-bold text-[#17191D] mt-0.5">
                      Intel® Core™ Ultra 9 275HX
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed font-mono">
                      8 Performance + 16 Efficient Cores · Up to 5.4 GHz Turbo · 36MB L3 Cache · Integrated NPU
                    </p>
                  </div>
                </div>

                {/* 2. Graphics (GPU) */}
                <div className="p-4 sm:px-6 hover:bg-slate-50/80 transition-colors flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10.5px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                        GRAPHICS ACCELERATOR (GPU)
                      </span>
                      <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                        140W TGP
                      </span>
                    </div>
                    <p className="text-sm sm:text-base font-bold text-[#17191D] mt-0.5">
                      NVIDIA® GeForce RTX™ 5070 Ti Laptop GPU
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed font-mono">
                      12GB GDDR7 Dedicated VRAM · Next-Gen Tensor AI Cores · DLSS 4 &amp; Ray Reconstruction
                    </p>
                  </div>
                </div>

                {/* 3. Memory & Storage (2-Column Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                  {/* Memory (RAM) */}
                  <div className="p-4 sm:px-6 hover:bg-slate-50/80 transition-colors flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10.5px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        SYSTEM MEMORY (RAM)
                      </span>
                      <p className="text-sm font-bold text-[#17191D] mt-0.5">
                        32GB DDR5-5600
                      </p>
                      <p className="text-xs text-slate-500 font-mono">
                        Dual-Channel · Low Latency
                      </p>
                    </div>
                  </div>

                  {/* Storage */}
                  <div className="p-4 sm:px-6 hover:bg-slate-50/80 transition-colors flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                      <HardDrive className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10.5px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        STORAGE SUBSYSTEM
                      </span>
                      <p className="text-sm font-bold text-[#17191D] mt-0.5">
                        2TB NVMe M.2 PCIe 4.0
                      </p>
                      <p className="text-xs text-slate-500 font-mono">
                        ~7,400 MB/s Fast Workspace Read
                      </p>
                    </div>
                  </div>
                </div>

                {/* 4. Display Panel - Lenovo PureSight OLED */}
                <div className="p-4 sm:px-6 hover:bg-slate-50/80 transition-colors flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Monitor className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10.5px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                        CALIBRATED DISPLAY
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-200">
                          OLED 240Hz
                        </span>
                        <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                          16:10
                        </span>
                      </div>
                    </div>
                    <p className="text-sm sm:text-base font-bold text-[#17191D] mt-0.5">
                      16.0" 2.5K WQXGA (2560 × 1600) PureSight OLED
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed font-mono">
                      240Hz VRR · 0.03ms Response · 100% DCI-P3 · VESA DisplayHDR™ True Black 500 · NVIDIA G-SYNC &amp; Advanced Optimus
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Technical Runtime Bar */}
            <div className="px-5 sm:px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-[#155EEF]" />
                <span className="font-mono text-[11px] font-semibold text-slate-700">
                  Windows 11 Pro + Native WSL2 (Ubuntu 24.04 LTS)
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white text-slate-600 border border-slate-200">
                DOCKER CLUSTERS READY
              </span>
            </div>
          </motion.div>


          {/* =======================================================================
              DEVICE 2: APPLE MACBOOK PRO 16" (M5 PRO)
             ======================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="bg-white rounded-xl border-2 border-slate-300 shadow-sm hover:shadow-xl hover:border-slate-400 transition-all duration-300 overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Cockpit Status Header */}
              <div className="bg-[#17191D] text-white px-4 sm:px-6 py-3 border-b border-black flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                  <span className="font-mono text-xs font-bold tracking-wider text-slate-200">
                    MOBILE NODE // 02
                  </span>
                  <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/10 text-amber-400 border border-white/10">
                    FIELD DEPLOYMENT RIG
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-slate-400">
                  <span className="text-amber-400 font-bold">APPLE SILICON</span>
                  <span>·</span>
                  <span className="text-slate-300 font-bold">3NM PROCESS</span>
                </div>
              </div>

              {/* Title Block */}
              <div className="p-5 sm:p-6 pb-4 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/50">
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h3 className="text-2xl font-black text-[#17191D] tracking-tight">
                      Apple MacBook Pro 16"
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      M5 PRO · 3NM
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    Mobile UNIX Engineering Flagship · UI/UX Prototyping &amp; iOS Testing
                  </p>
                </div>
                <div className="hidden sm:flex flex-col items-end shrink-0">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest">FINISH</span>
                  <span className="text-xs font-mono font-bold text-slate-700">Space Black</span>
                </div>
              </div>

              {/* Sharp Precision Spec Rows */}
              <div className="divide-y divide-slate-100 font-sans">
                {/* 1. System on Chip (SoC) */}
                <div className="p-4 sm:px-6 hover:bg-slate-50/80 transition-colors flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10.5px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                        SYSTEM ON CHIP (SoC)
                      </span>
                      <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
                        16C CPU / 20C GPU
                      </span>
                    </div>
                    <p className="text-sm sm:text-base font-bold text-[#17191D] mt-0.5">
                      Apple M5 Pro Processor
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed font-mono">
                      16-Core High-Throughput CPU · 20-Core Metal GPU · 16-Core Neural Engine
                    </p>
                  </div>
                </div>

                {/* 2. Unified Memory & High-Speed Storage (2-Column Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
                  {/* Memory (RAM) */}
                  <div className="p-4 sm:px-6 hover:bg-slate-50/80 transition-colors flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-200 text-purple-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10.5px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        UNIFIED MEMORY
                      </span>
                      <p className="text-sm font-bold text-[#17191D] mt-0.5">
                        36GB Unified RAM
                      </p>
                      <p className="text-xs text-slate-500 font-mono">
                        150+ GB/s Zero-Copy Bus
                      </p>
                    </div>
                  </div>

                  {/* Storage */}
                  <div className="p-4 sm:px-6 hover:bg-slate-50/80 transition-colors flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                      <HardDrive className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[10.5px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                        STORAGE SUBSYSTEM
                      </span>
                      <p className="text-sm font-bold text-[#17191D] mt-0.5">
                        1TB Ultra-Fast SSD
                      </p>
                      <p className="text-xs text-slate-500 font-mono">
                        Up to 7.4 GB/s NVMe Speed
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Display Panel */}
                <div className="p-4 sm:px-6 hover:bg-slate-50/80 transition-colors flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Monitor className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10.5px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                        DISPLAY PANEL
                      </span>
                      <span className="text-[10px] font-mono font-bold bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
                        LIQUID RETINA XDR
                      </span>
                    </div>
                    <p className="text-sm sm:text-base font-bold text-[#17191D] mt-0.5">
                      16.2" Mini-LED Display (3456 × 2234)
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed font-mono">
                      1,600 nits Peak HDR · ProMotion 120Hz Adaptive Refresh · P3 Wide Color Space
                    </p>
                  </div>
                </div>

                {/* 4. Endurance & Thermals */}
                <div className="p-4 sm:px-6 hover:bg-slate-50/80 transition-colors flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10.5px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                        ENDURANCE &amp; THERMAL ENVELOPE
                      </span>
                      <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                        22 HOURS
                      </span>
                    </div>
                    <p className="text-sm sm:text-base font-bold text-[#17191D] mt-0.5">
                      All-Day Autonomous Runtime
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed font-mono">
                      Silent Dual-Fan Thermal System · Zero Throttling on Battery Power
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Technical Runtime Bar */}
            <div className="px-5 sm:px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-mono text-[11px] font-semibold text-slate-700">
                  macOS Sequoia + Native Zsh &amp; Swift Toolchain
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white text-slate-600 border border-slate-200">
                SAFARI iOS FLEET READY
              </span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
