import { useEffect, useState } from "react";
import { HardwareInput, AnalysisResult } from "../types";
import { Copy, Share2, Award, Zap, AlertTriangle, ArrowUpCircle, Sparkles, Check, Flame, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ResultsViewProps {
  specs: HardwareInput;
  results: AnalysisResult;
  onBackClick: () => void;
}

export default function ResultsView({ specs, results, onBackClick }: ResultsViewProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [copied, setCopied] = useState(false);

  // Animate the score counter on mount for an immersive, premium UX
  useEffect(() => {
    const duration = 1500; // 1.5 seconds
    const target = results.score;
    let start = 0;
    const stepTime = Math.abs(Math.floor(duration / target));
    
    const timer = setInterval(() => {
      start += 1;
      setAnimatedScore(start);
      if (start >= target) {
        clearInterval(timer);
        setAnimatedScore(target);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [results.score]);

  // Handle generating copy/share text
  const getShareText = () => {
    return `My RateMyPC AI Score:

CPU: ${specs.cpu}
GPU: ${specs.gpu}
RAM: ${specs.ram}

Score: ${results.score}/100
Tier: ${results.tier}

Analyze your PC at: ${window.location.origin}`;
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
          title: "My RateMyPC AI Score",
          text: getShareText(),
          url: window.location.origin
        });
      } catch (err) {
        console.warn("Share failed, falling back to copy:", err);
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  // Determine colors based on Score
  const getScoreColorClass = (score: number) => {
    if (score >= 80) return "text-emerald-400 stroke-emerald-500";
    if (score >= 50) return "text-cyan-400 stroke-cyan-500";
    if (score >= 30) return "text-amber-400 stroke-amber-500";
    return "text-pink-500 stroke-pink-500";
  };

  const getTierBadgeClass = (tier: string) => {
    const normalized = tier.toLowerCase();
    if (normalized.includes("enthusiast") || normalized.includes("ultra") || normalized.includes("extreme")) {
      return "bg-purple-950/40 border-purple-500/30 text-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.15)]";
    }
    if (normalized.includes("mid") || normalized.includes("good")) {
      return "bg-cyan-950/40 border-cyan-500/30 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]";
    }
    if (normalized.includes("budget") || normalized.includes("average")) {
      return "bg-amber-950/40 border-amber-500/30 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)]";
    }
    return "bg-pink-950/40 border-pink-500/30 text-pink-400 shadow-[0_0_15px_rgba(244,63,94,0.15)]";
  };

  // SVG Circle Stroke calculation
  const circleRadius = 52;
  const strokeCircumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = strokeCircumference - (animatedScore / 100) * strokeCircumference;

  // Games detail mapping for custom colors and design
  const gameStats = [
    { name: "Valorant", fps: results.valorant_fps, themeColor: "bg-rose-500 text-rose-400 border-rose-500/20 shadow-rose-500/5", maxFps: 400 },
    { name: "Fortnite", fps: results.fortnite_fps, themeColor: "bg-purple-500 text-purple-400 border-purple-500/20 shadow-purple-500/5", maxFps: 240 },
    { name: "Minecraft", fps: results.minecraft_fps, themeColor: "bg-emerald-500 text-emerald-400 border-emerald-500/20 shadow-emerald-500/5", maxFps: 300 },
    { name: "GTA V", fps: results.gta5_fps, themeColor: "bg-amber-500 text-amber-400 border-amber-500/20 shadow-amber-500/5", maxFps: 180 },
    { name: "Cyberpunk 2077", fps: results.cyberpunk_fps, themeColor: "bg-yellow-500 text-yellow-400 border-yellow-500/20 shadow-yellow-500/5", maxFps: 120 }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const widgetVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 18 },
    },
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Back Button with subtle arrow bounce */}
      <motion.button
        onClick={onBackClick}
        whileHover={{ x: -4 }}
        className="mb-8 inline-flex items-center space-x-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors focus:outline-none cursor-pointer group"
      >
        <ChevronLeft className="h-4 w-4 text-cyan-400 group-hover:text-pink-500 transition-colors" />
        <span className="font-mono uppercase tracking-wider text-xs">Analyze New Build</span>
      </motion.button>

      {/* Main Grid: Header Metrics */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8"
      >
        
        {/* Score Meter & Badge (4 columns) */}
        <motion.div 
          variants={widgetVariants}
          className="lg:col-span-4 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden shadow-xl shadow-cyan-500/[0.02]"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none"></div>
          
          <h3 className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-6">Unified PC Rating</h3>
          
          {/* Circular Score Indicator */}
          <div className="relative h-36 w-36 flex items-center justify-center mb-6">
            <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 120 120">
              {/* Back Circle */}
              <circle
                cx="60"
                cy="60"
                r={circleRadius}
                fill="none"
                stroke="#121214"
                strokeWidth="10"
              />
              {/* Score Fill Circle */}
              <motion.circle
                cx="60"
                cy="60"
                r={circleRadius}
                fill="none"
                className={`transition-all duration-300 ${getScoreColorClass(results.score)}`}
                strokeWidth="8"
                strokeDasharray={strokeCircumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center z-10">
              <span className="text-4xl font-extrabold font-display text-white">{animatedScore}</span>
              <span className="block text-[9px] font-mono uppercase tracking-wider text-zinc-500 mt-1">out of 100</span>
            </div>
          </div>

          {/* Gaming Tier Badge */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className={`rounded-lg border px-4 py-1.5 text-xs font-bold uppercase tracking-wider mb-4 ${getTierBadgeClass(results.tier)}`}
          >
            {results.tier} Tier
          </motion.div>

          <p className="text-[10px] font-mono text-zinc-500 max-w-xs leading-normal uppercase tracking-wider">
            Calculated conservatively against standard modern 1080p workloads.
          </p>
        </motion.div>

        {/* Specs & AI Summary (8 columns) */}
        <motion.div 
          variants={widgetVariants}
          className="lg:col-span-8 rounded-2xl border border-zinc-800 bg-zinc-950/80 p-8 flex flex-col justify-between relative overflow-hidden shadow-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none"></div>

          <div>
            {/* Input Hardware specs tags */}
            <div className="flex flex-wrap gap-2.5 mb-6">
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-2.5 text-xs flex-1 min-w-[120px]">
                <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-wider block mb-1">Processor (CPU)</span>
                <span className="font-semibold text-white truncate block">{specs.cpu}</span>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-2.5 text-xs flex-1 min-w-[120px]">
                <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-wider block mb-1">Graphics (GPU)</span>
                <span className="font-semibold text-white truncate block">{specs.gpu}</span>
              </div>
              <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-2.5 text-xs flex-1 min-w-[120px]">
                <span className="text-zinc-500 font-mono text-[9px] uppercase tracking-wider block mb-1">Memory (RAM)</span>
                <span className="font-semibold text-white truncate block">{specs.ram}</span>
              </div>
            </div>

            {/* AI Summary Card */}
            <div className="space-y-3.5">
              <h2 className="text-lg font-bold text-white flex items-center gap-1.5 font-display">
                <Sparkles className="h-4.5 w-4.5 text-cyan-400" />
                <span>AI Performance Evaluation</span>
              </h2>
              <p className="text-sm text-zinc-400 leading-relaxed font-sans border-l-2 border-cyan-500/40 pl-4 py-1 italic bg-cyan-950/5 rounded-r-lg pr-2">
                &ldquo;{results.summary}&rdquo;
              </p>
            </div>
          </div>

          {/* Share Block */}
          <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Share your build rating</span>
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <motion.button
                onClick={handleCopy}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-1.5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-950 px-4 py-2.5 text-xs font-semibold text-zinc-300 hover:text-white transition-colors focus:outline-none cursor-pointer"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-400 animate-pulse" /> : <Copy className="h-4 w-4 text-cyan-400" />}
                <span>{copied ? "Copied!" : "Copy Text"}</span>
              </motion.button>
              <motion.button
                onClick={handleShare}
                whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(6,182,212,0.25)" }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-1.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 px-5 py-2.5 text-xs font-bold text-white transition-all focus:outline-none cursor-pointer"
              >
                <Share2 className="h-4 w-4" />
                <span>Share Rating</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* FPS Grid Block with staggered entrance */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-lg font-bold text-white tracking-tight font-display mb-4 flex items-center gap-2">
          <Flame className="h-5 w-5 text-pink-500" />
          <span>Conservative FPS Estimations (1080p, High)</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {gameStats.map((game, idx) => {
            const pct = Math.min(100, Math.max(2, (game.fps / game.maxFps) * 100));
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4, borderColor: "rgba(6,182,212,0.3)" }}
                className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-5 shadow-inner transition-all duration-300"
              >
                <span className="text-[10px] font-mono text-zinc-500 block uppercase tracking-wider mb-1.5">{game.name}</span>
                <div className="flex items-baseline space-x-1 mb-3.5">
                  <span className="text-3xl font-black font-display text-white">{game.fps}</span>
                  <span className="text-[9px] font-mono text-cyan-400 uppercase tracking-widest font-bold">FPS</span>
                </div>
                {/* Horizontal Progress bar graph */}
                <div className="h-2 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/40">
                  <motion.div
                    className={`h-full rounded-full ${game.themeColor.split(" ")[0]}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1, delay: 0.3 + idx * 0.05 }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Bottlenecks and Upgrades Block */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Bottleneck report */}
        <motion.div 
          whileHover={{ y: -3, borderColor: "rgba(244,63,94,0.3)" }}
          className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-6 relative overflow-hidden transition-all duration-300"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-rose-950/30 rounded-lg border border-rose-500/20 text-rose-400 animate-pulse">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white font-display">Bottleneck Analysis</h3>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed font-sans mb-1">
            {results.bottleneck || "No significant bottleneck identified. CPU and GPU match each other's throughput exceptionally well."}
          </p>
        </motion.div>

        {/* Upgrade Suggestion */}
        <motion.div 
          whileHover={{ y: -3, borderColor: "rgba(16,185,129,0.3)" }}
          className="rounded-xl border border-zinc-800 bg-zinc-950/40 p-6 relative overflow-hidden transition-all duration-300"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-emerald-950/30 rounded-lg border border-emerald-500/20 text-emerald-400 animate-pulse">
              <ArrowUpCircle className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-white font-display">Upgrade Priority</h3>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed font-sans mb-1">
            {results.upgrade_priority || "Your system is perfectly balanced. No immediate upgrades are required for 1080p gaming configurations."}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

