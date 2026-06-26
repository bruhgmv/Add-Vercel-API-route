import { useEffect, useState } from "react";
import { HardwareInput, AnalysisResult } from "../types";
import { 
  Gamepad2, 
  Code2, 
  Radio, 
  Video, 
  Gauge, 
  TrendingUp, 
  AlertTriangle, 
  Sparkles, 
  Copy, 
  Share2, 
  Check, 
  ChevronLeft, 
  Cpu, 
  Monitor, 
  HardDrive,
  Award,
  Terminal,
  Shield,
  Box,
  Car,
  Wrench,
  HelpCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ResultsViewProps {
  specs: HardwareInput;
  results: AnalysisResult;
  onBackClick: () => void;
}

export default function ResultsView({ specs, results, onBackClick }: ResultsViewProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [copied, setCopied] = useState(false);

  // Fallback guards to prevent crashes if JSON format has slight variations
  const score = results.score ?? 50;
  const tier = results.tier ?? "Mid-Range";
  
  const performance = results.performance ?? {
    gaming: score,
    productivity: Math.max(10, score - 5),
    streaming: Math.max(10, score - 8),
    programming: Math.max(15, score + 5),
    video_editing: Math.max(10, score - 10)
  };

  const games = results.games ?? {
    valorant: { fps: 144, preset: "High", rating: "Excellent" },
    fortnite: { fps: 120, preset: "Medium", rating: "Great" },
    minecraft: { fps: 200, preset: "Fancy", rating: "Excellent" },
    gta5: { fps: 80, preset: "Very High", rating: "Playable" },
    cyberpunk2077: { fps: 45, preset: "Medium", rating: "Playable" }
  };

  const bottleneck = results.bottleneck ?? {
    component: "Balanced",
    severity: "Low",
    reason: "Your system parts match each other's processing limits very well."
  };

  const upgrade = results.upgrade ?? {
    component: "None",
    priority: "Low",
    recommended_part: "N/A",
    expected_gain_percent: 0,
    reason: "Your system is already highly balanced and ready for gaming."
  };

  const summary = results.summary ?? "Ready for high performance gaming workloads.";

  // Animate the score counter on mount
  useEffect(() => {
    const duration = 1200; // 1.2 seconds
    const target = score;
    if (target <= 0) return;
    
    let start = 0;
    const stepTime = Math.max(10, Math.floor(duration / target));
    
    const timer = setInterval(() => {
      start += 1;
      setAnimatedScore(start);
      if (start >= target) {
        clearInterval(timer);
        setAnimatedScore(target);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [score]);

  // Copy share message configuration
  const getShareText = () => {
    return `🔥 RateMyPC AI Benchmark Results:
    
💻 Build Specifications:
- CPU: ${specs.cpu}
- GPU: ${specs.gpu}
- RAM: ${specs.ram}

🏆 Core Gaming Score: ${score}/100
🏷️ Performance Tier: ${tier}

🎮 Simulated FPS Estimates (1080p):
- Cyberpunk 2077: ${games.cyberpunk2077?.fps ?? 0} FPS (${games.cyberpunk2077?.preset ?? "High"})
- Fortnite: ${games.fortnite?.fps ?? 0} FPS (${games.fortnite?.preset ?? "Comp"})
- Valorant: ${games.valorant?.fps ?? 0} FPS (${games.valorant?.preset ?? "High"})

⚠️ Primary Bottleneck: ${bottleneck.component} (${bottleneck.severity} Severity)
🔧 Recommended Upgrade: ${upgrade.recommended_part} (+${upgrade.expected_gain_percent}% expected gain)

Rate your PC instantly at: ${window.location.origin}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getShareText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "RateMyPC AI Performance Diagnostics",
          text: getShareText(),
          url: window.location.origin
        });
      } catch (err) {
        console.warn("Share failed, copying text instead:", err);
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  // Solid theme colors based on Tier
  const getTierColorClass = (t: string) => {
    const norm = t.toLowerCase();
    if (norm.includes("ultimate") || norm.includes("enthusiast")) {
      return {
        bg: "bg-purple-500/10 border-purple-500/30 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.2)]",
        text: "text-purple-400",
        badge: "bg-purple-500 text-white"
      };
    }
    if (norm.includes("high-end") || norm.includes("extreme")) {
      return {
        bg: "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]",
        text: "text-cyan-400",
        badge: "bg-cyan-500 text-black"
      };
    }
    if (norm.includes("mid") || norm.includes("good")) {
      return {
        bg: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]",
        text: "text-emerald-400",
        badge: "bg-emerald-500 text-white"
      };
    }
    if (norm.includes("budget") || norm.includes("average")) {
      return {
        bg: "bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]",
        text: "text-amber-400",
        badge: "bg-amber-400 text-black"
      };
    }
    return {
      bg: "bg-rose-500/10 border-rose-500/30 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.2)]",
      text: "text-rose-400",
      badge: "bg-rose-500 text-white"
    };
  };

  const activeTheme = getTierColorClass(tier);

  // Circle progress computations
  const circleRadius = 54;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeOffset = circumference - (animatedScore / 100) * circumference;

  // Rating badge styles for game frame rates
  const getRatingBadgeStyle = (r: string) => {
    const norm = (r || "").toLowerCase();
    if (norm.includes("excellent")) return "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20";
    if (norm.includes("great")) return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
    if (norm.includes("playable")) return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
    return "bg-rose-500/10 text-rose-400 border border-rose-500/20";
  };

  // Severity badge styling for bottlenecks
  const getSeverityBadgeStyle = (sev: string) => {
    const norm = (sev || "").toLowerCase();
    if (norm.includes("extreme") || norm.includes("critical")) return "bg-red-500/20 text-red-400 border border-red-500/30";
    if (norm.includes("high")) return "bg-orange-500/20 text-orange-400 border border-orange-500/30";
    if (norm.includes("medium")) return "bg-amber-500/20 text-amber-400 border border-amber-500/30";
    return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 20 } }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-12" id="benchmark-card-capture">
      {/* Top action bar: Go back */}
      <div className="flex items-center justify-between mb-8">
        <motion.button
          onClick={onBackClick}
          whileHover={{ x: -4 }}
          className="inline-flex items-center space-x-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors focus:outline-none cursor-pointer group"
        >
          <ChevronLeft className="h-4 w-4 text-cyan-400 group-hover:text-pink-500 transition-colors" />
          <span className="font-mono uppercase tracking-wider text-xs">Run Another Spec</span>
        </motion.button>

        {/* Live system state visualizer */}
        <div className="hidden sm:flex items-center space-x-2 text-[10px] font-mono text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-950/20">
          <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span>Diagnostics Verified</span>
        </div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-6"
      >
        {/* ==================== CORE REPORT (Score & Specs HUD) ==================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Animated Score Display Card (4 columns) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 rounded-3xl border border-zinc-800/80 bg-zinc-950/70 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-2xl backdrop-blur-md"
          >
            {/* Soft Ambient glowing sphere behind */}
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-cyan-500/10 blur-[50px] pointer-events-none"></div>
            <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-pink-500/10 blur-[50px] pointer-events-none"></div>

            <h3 className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 mb-6">AI Hardware Rating</h3>

            {/* Futuristic Circle Gauges */}
            <div className="relative h-44 w-44 flex items-center justify-center mb-6">
              <svg className="absolute inset-0 transform -rotate-90 w-full h-full" viewBox="0 0 128 128">
                {/* Darker background circle track */}
                <circle
                  cx="64"
                  cy="64"
                  r={circleRadius}
                  fill="none"
                  stroke="#121214"
                  strokeWidth="10"
                />
                {/* Cyber Cyan score progress */}
                <motion.circle
                  cx="64"
                  cy="64"
                  r={circleRadius}
                  fill="none"
                  stroke="url(#cyan-grad)"
                  strokeWidth="10"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeOffset}
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]"
                />
                <defs>
                  <linearGradient id="cyan-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" />
                    <stop offset="100%" stopColor="#4f46e5" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="text-center z-10">
                <span className="text-5xl font-black font-display text-white tracking-tighter leading-none select-none">
                  {animatedScore}
                </span>
                <span className="block text-[10px] font-mono uppercase tracking-widest text-zinc-500 mt-2">
                  out of 100
                </span>
              </div>
            </div>

            {/* Dynamic Interactive Tier Badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`rounded-2xl border px-5 py-2 text-xs font-black uppercase tracking-widest mb-4 cursor-default select-none ${activeTheme.bg}`}
            >
              {tier} TIER
            </motion.div>

            <p className="text-[10px] font-mono text-zinc-500 max-w-xs leading-relaxed uppercase tracking-wider">
              Evaluated strictly for modern AAA/Competitive standard 1080p workloads.
            </p>
          </motion.div>

          {/* Specs HUD & Quick Assessment Block (8 columns) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-8 rounded-3xl border border-zinc-800/80 bg-zinc-950/70 p-8 flex flex-col justify-between relative overflow-hidden shadow-2xl backdrop-blur-md"
          >
            {/* Top right hardware glow */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/5 blur-[80px] pointer-events-none"></div>

            <div>
              {/* Hardware capsule HUD items */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-4 flex items-center space-x-3.5 shadow-sm">
                  <div className="p-2.5 bg-cyan-950/50 rounded-xl text-cyan-400 border border-cyan-500/20">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-widest block leading-none mb-1">Processor</span>
                    <span className="font-extrabold text-sm text-white truncate block" title={specs.cpu}>{specs.cpu}</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-4 flex items-center space-x-3.5 shadow-sm">
                  <div className="p-2.5 bg-pink-950/50 rounded-xl text-pink-400 border border-pink-500/20">
                    <Monitor className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-widest block leading-none mb-1">Graphics (GPU)</span>
                    <span className="font-extrabold text-sm text-white truncate block" title={specs.gpu}>{specs.gpu}</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-4 flex items-center space-x-3.5 shadow-sm">
                  <div className="p-2.5 bg-indigo-950/50 rounded-xl text-indigo-400 border border-indigo-500/20">
                    <HardDrive className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-widest block leading-none mb-1">Memory (RAM)</span>
                    <span className="font-extrabold text-sm text-white truncate block">{specs.ram}</span>
                  </div>
                </div>
              </div>

              {/* AI Expert Review Block */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-cyan-400">
                  <Sparkles className="h-4.5 w-4.5 text-pink-500 animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-widest font-black">AI System Assessment</span>
                </div>
                <div className="rounded-2xl bg-zinc-900/50 border border-zinc-800/80 p-5 font-sans relative overflow-hidden">
                  <span className="absolute top-2 right-3 font-mono text-[8px] text-zinc-600 uppercase tracking-widest select-none">AI-ST_v4_MODEL</span>
                  <p className="text-sm text-zinc-300 leading-relaxed font-sans border-l-[3px] border-cyan-400 pl-4">
                    {summary}
                  </p>
                </div>
              </div>
            </div>

            {/* Report footer share buttons */}
            <div className="mt-8 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Share benchmarks with friends</span>
              <div className="flex items-center space-x-3 w-full sm:w-auto">
                <motion.button
                  onClick={handleCopy}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 rounded-2xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 hover:bg-zinc-900 px-5 py-3 text-xs font-bold text-zinc-300 hover:text-white transition-colors focus:outline-none cursor-pointer"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400 animate-pulse" /> : <Copy className="h-4 w-4 text-cyan-400" />}
                  <span>{copied ? "Copied Spec!" : "Copy Report"}</span>
                </motion.button>
                <motion.button
                  onClick={handleShare}
                  whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(6,182,212,0.2)" }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-indigo-600 px-6 py-3 text-xs font-black text-white hover:opacity-95 transition-all focus:outline-none cursor-pointer"
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share Rating</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ==================== PERFORMANCE BENTO BREAKDOWN ==================== */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center space-x-2">
            <Gauge className="h-5 w-5 text-indigo-400" />
            <h3 className="text-md font-bold text-white tracking-tight uppercase font-mono">Workload Index Rankings</h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {/* Gaming Category */}
            <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/50 p-5 flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-pink-950/40 rounded-xl text-pink-400 border border-pink-500/10">
                  <Gamepad2 className="h-4.5 w-4.5" />
                </div>
                <span className="text-xl font-black font-mono text-white leading-none">{performance.gaming}%</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold block mb-2">Gaming</span>
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden p-[1px]">
                <motion.div
                  className="h-full bg-pink-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${performance.gaming}%` }}
                  transition={{ duration: 1.2, delay: 0.1 }}
                />
              </div>
            </div>

            {/* Productivity Category */}
            <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/50 p-5 flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-emerald-950/40 rounded-xl text-emerald-400 border border-emerald-500/10">
                  <Gauge className="h-4.5 w-4.5" />
                </div>
                <span className="text-xl font-black font-mono text-white leading-none">{performance.productivity}%</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold block mb-2">Productivity</span>
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden p-[1px]">
                <motion.div
                  className="h-full bg-emerald-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${performance.productivity}%` }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                />
              </div>
            </div>

            {/* Streaming Category */}
            <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/50 p-5 flex flex-col justify-between shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-purple-950/40 rounded-xl text-purple-400 border border-purple-500/10">
                  <Radio className="h-4.5 w-4.5" />
                </div>
                <span className="text-xl font-black font-mono text-white leading-none">{performance.streaming}%</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold block mb-2">Streaming</span>
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden p-[1px]">
                <motion.div
                  className="h-full bg-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${performance.streaming}%` }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                />
              </div>
            </div>

            {/* Programming Category */}
            <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/50 p-5 flex flex-col justify-between shadow-sm relative overflow-hidden col-span-1">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-cyan-950/40 rounded-xl text-cyan-400 border border-cyan-500/10">
                  <Code2 className="h-4.5 w-4.5" />
                </div>
                <span className="text-xl font-black font-mono text-white leading-none">{performance.programming}%</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold block mb-2">Programming</span>
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden p-[1px]">
                <motion.div
                  className="h-full bg-cyan-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${performance.programming}%` }}
                  transition={{ duration: 1.2, delay: 0.4 }}
                />
              </div>
            </div>

            {/* Video Editing Category */}
            <div className="rounded-2xl border border-zinc-800/60 bg-zinc-950/50 p-5 flex flex-col justify-between shadow-sm relative overflow-hidden col-span-1">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 bg-amber-950/40 rounded-xl text-amber-400 border border-amber-500/10">
                  <Video className="h-4.5 w-4.5" />
                </div>
                <span className="text-xl font-black font-mono text-white leading-none">{performance.video_editing}%</span>
              </div>
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold block mb-2">Video Editing</span>
              <div className="h-1.5 w-full bg-zinc-900 rounded-full overflow-hidden p-[1px]">
                <motion.div
                  className="h-full bg-amber-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${performance.video_editing}%` }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ==================== FPS GAME MATRIX SECTION ==================== */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center space-x-2">
            <Gamepad2 className="h-5 w-5 text-pink-500" />
            <h3 className="text-md font-bold text-white tracking-tight uppercase font-mono">Consolidated Gaming Benchmark Simulation</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Valorant Card */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-5 flex flex-col justify-between shadow-inner relative group hover:border-zinc-700/80 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Valorant</span>
                  <div className="p-1.5 bg-rose-500/10 text-rose-400 rounded-lg">
                    <Shield className="h-3.5 w-3.5" />
                  </div>
                </div>
                <div className="flex items-baseline space-x-1.5 mb-1">
                  <span className="text-4xl font-black font-display text-white tracking-tight">{games.valorant?.fps ?? 0}</span>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-black tracking-widest">FPS</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 block mb-4 uppercase tracking-widest">{games.valorant?.preset ?? "High Settings"}</span>
              </div>
              <div className={`text-center py-1.5 rounded-xl text-[10px] font-mono uppercase tracking-wider font-extrabold ${getRatingBadgeStyle(games.valorant?.rating ?? "Playable")}`}>
                {games.valorant?.rating ?? "Playable"}
              </div>
            </div>

            {/* Fortnite Card */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-5 flex flex-col justify-between shadow-inner relative group hover:border-zinc-700/80 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Fortnite</span>
                  <div className="p-1.5 bg-indigo-500/10 text-indigo-400 rounded-lg">
                    <Sparkles className="h-3.5 w-3.5" />
                  </div>
                </div>
                <div className="flex items-baseline space-x-1.5 mb-1">
                  <span className="text-4xl font-black font-display text-white tracking-tight">{games.fortnite?.fps ?? 0}</span>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-black tracking-widest">FPS</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 block mb-4 uppercase tracking-widest">{games.fortnite?.preset ?? "Competitive"}</span>
              </div>
              <div className={`text-center py-1.5 rounded-xl text-[10px] font-mono uppercase tracking-wider font-extrabold ${getRatingBadgeStyle(games.fortnite?.rating ?? "Playable")}`}>
                {games.fortnite?.rating ?? "Playable"}
              </div>
            </div>

            {/* Minecraft Card */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-5 flex flex-col justify-between shadow-inner relative group hover:border-zinc-700/80 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Minecraft</span>
                  <div className="p-1.5 bg-emerald-500/10 text-emerald-400 rounded-lg">
                    <Box className="h-3.5 w-3.5" />
                  </div>
                </div>
                <div className="flex items-baseline space-x-1.5 mb-1">
                  <span className="text-4xl font-black font-display text-white tracking-tight">{games.minecraft?.fps ?? 0}</span>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-black tracking-widest">FPS</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 block mb-4 uppercase tracking-widest">{games.minecraft?.preset ?? "Fancy Graphics"}</span>
              </div>
              <div className={`text-center py-1.5 rounded-xl text-[10px] font-mono uppercase tracking-wider font-extrabold ${getRatingBadgeStyle(games.minecraft?.rating ?? "Playable")}`}>
                {games.minecraft?.rating ?? "Playable"}
              </div>
            </div>

            {/* GTA V Card */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-5 flex flex-col justify-between shadow-inner relative group hover:border-zinc-700/80 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">GTA V</span>
                  <div className="p-1.5 bg-amber-500/10 text-amber-400 rounded-lg">
                    <Car className="h-3.5 w-3.5" />
                  </div>
                </div>
                <div className="flex items-baseline space-x-1.5 mb-1">
                  <span className="text-4xl font-black font-display text-white tracking-tight">{games.gta5?.fps ?? 0}</span>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-black tracking-widest">FPS</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 block mb-4 uppercase tracking-widest">{games.gta5?.preset ?? "Very High"}</span>
              </div>
              <div className={`text-center py-1.5 rounded-xl text-[10px] font-mono uppercase tracking-wider font-extrabold ${getRatingBadgeStyle(games.gta5?.rating ?? "Playable")}`}>
                {games.gta5?.rating ?? "Playable"}
              </div>
            </div>

            {/* Cyberpunk 2077 Card */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 p-5 flex flex-col justify-between shadow-inner relative group hover:border-zinc-700/80 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Cyberpunk 2077</span>
                  <div className="p-1.5 bg-yellow-500/10 text-yellow-400 rounded-lg">
                    <Terminal className="h-3.5 w-3.5" />
                  </div>
                </div>
                <div className="flex items-baseline space-x-1.5 mb-1">
                  <span className="text-4xl font-black font-display text-white tracking-tight">{games.cyberpunk2077?.fps ?? 0}</span>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-black tracking-widest">FPS</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 block mb-4 uppercase tracking-widest">{games.cyberpunk2077?.preset ?? "Medium Presets"}</span>
              </div>
              <div className={`text-center py-1.5 rounded-xl text-[10px] font-mono uppercase tracking-wider font-extrabold ${getRatingBadgeStyle(games.cyberpunk2077?.rating ?? "Playable")}`}>
                {games.cyberpunk2077?.rating ?? "Playable"}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ==================== BOTTLENECK & RECOMMENDATIONS HUD ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Dedicated Bottleneck HUD card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -3, borderColor: "rgba(244,63,94,0.3)" }}
            className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-7 relative overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/[0.02] blur-[40px] pointer-events-none"></div>
            
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-rose-950/50 rounded-2xl border border-rose-500/30 text-rose-400">
                    <AlertTriangle className="h-5 w-5" />
                  </div>
                  <h3 className="text-md font-bold text-white font-display">Hardware Bottleneck Analyzer</h3>
                </div>
                <span className={`text-[10px] font-mono uppercase tracking-wider font-extrabold px-3 py-1 rounded-full ${getSeverityBadgeStyle(bottleneck.severity)}`}>
                  {bottleneck.severity} SEVERITY
                </span>
              </div>

              {/* Identified Bottleneck Tag */}
              <div className="mb-4">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Primary Throttle Component</span>
                <span className="text-xl font-black text-white uppercase font-mono tracking-tight">{bottleneck.component}</span>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                {bottleneck.reason}
              </p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-zinc-900 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              Core balance calculation indices are highly approximate.
            </div>
          </motion.div>

          {/* Premium Hardware Upgrade Router Card */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -3, borderColor: "rgba(16,185,129,0.3)" }}
            className="rounded-3xl border border-zinc-800 bg-zinc-950/70 p-7 relative overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/[0.02] blur-[40px] pointer-events-none"></div>

            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center space-x-3">
                  <div className="p-2.5 bg-emerald-950/50 rounded-2xl border border-emerald-500/30 text-emerald-400">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <h3 className="text-md font-bold text-white font-display">Upgrade Recommendation Route</h3>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider font-extrabold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  +{upgrade.expected_gain_percent}% GAIN
                </span>
              </div>

              {/* Recommended Part */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Target Upgrade Spec</span>
                  <span className="text-sm font-black text-white uppercase font-mono tracking-tight">{upgrade.component}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">Recommended hardware</span>
                  <span className="text-sm font-black text-cyan-400 font-mono tracking-tight">{upgrade.recommended_part}</span>
                </div>
              </div>

              <p className="text-sm text-zinc-400 leading-relaxed font-sans">
                {upgrade.reason}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between text-[10px] font-mono">
              <span className="text-zinc-500 uppercase tracking-widest">Upgrade Priority</span>
              <span className="text-emerald-400 font-extrabold uppercase tracking-widest">{upgrade.priority}</span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
