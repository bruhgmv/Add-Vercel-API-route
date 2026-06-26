import React, { useState, useEffect } from "react";
import { HardwareInput, AnalysisResult, UsageLimit } from "../types";
import { Cpu, HelpCircle, Monitor, HardDrive, RefreshCw, AlertTriangle, Play, Zap } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AnalyzerProps {
  onAnalysisSuccess: (specs: HardwareInput, results: AnalysisResult) => void;
  remainingAnalyses: number;
  setRemainingAnalyses: (count: number) => void;
}

const LOADING_STATUS_MESSAGES = [
  "Analyzing CPU architecture and clock potential...",
  "Analyzing GPU shader cores and VRAM throughput...",
  "Searching physical benchmark database databases...",
  "Calculating gaming score and computing load indices...",
  "Estimating relative gaming FPS ranges...",
  "Generating complete neural network AI diagnostics report..."
];

export default function Analyzer({ onAnalysisSuccess, remainingAnalyses, setRemainingAnalyses }: AnalyzerProps) {
  const [cpu, setCpu] = useState("");
  const [gpu, setGpu] = useState("");
  const [ram, setRam] = useState("16GB");
  const [loading, setLoading] = useState(false);
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  const ramOptions = ["4GB", "8GB", "12GB", "16GB", "24GB", "32GB", "48GB", "64GB", "128GB"];

  // Cycle loading messages & smooth progress simulation
  useEffect(() => {
    let msgInterval: NodeJS.Timeout;
    let progressInterval: NodeJS.Timeout;
    if (loading) {
      setProgress(0);
      setLoadingMsgIdx(0);
      
      msgInterval = setInterval(() => {
        setLoadingMsgIdx((prev) => (prev + 1) % LOADING_STATUS_MESSAGES.length);
      }, 1600);

      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 98) return prev;
          // Dynamic increment curves: faster at first, then tapering off gracefully
          const increment = prev < 40 ? 4 : prev < 75 ? 2 : 1;
          return prev + increment;
        });
      }, 150);
    } else {
      setLoadingMsgIdx(0);
      setProgress(0);
    }
    return () => {
      clearInterval(msgInterval);
      clearInterval(progressInterval);
    };
  }, [loading]);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Field validations
    if (!cpu.trim()) {
      setError("Please input a CPU model (e.g., Ryzen 5 5600X, Intel i7-12700K).");
      return;
    }
    if (!gpu.trim()) {
      setError("Please input a GPU graphics card (e.g., RTX 3060, GTX 1660 Super).");
      return;
    }

    // Rate limit enforcement check
    if (remainingAnalyses <= 0) {
      setError("Daily limit of 3 free analyses reached. Please wait for your daily quota to reset.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ cpu, gpu, ram })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server responded with status code: ${response.status}`);
      }

      const results: AnalysisResult = await response.json();

      // Decrement scan count in localStorage & state
      const usageData = localStorage.getItem("ratemypc_usage_limits");
      if (usageData) {
        const parsed: UsageLimit = JSON.parse(usageData);
        const updatedLimit = {
          count: Math.max(0, parsed.count - 1),
          lastReset: parsed.lastReset
        };
        localStorage.setItem("ratemypc_usage_limits", JSON.stringify(updatedLimit));
        setRemainingAnalyses(updatedLimit.count);
      }

      // Success callback
      onAnalysisSuccess({ cpu, gpu, ram }, results);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred while connecting to our AI diagnostic engine. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 relative">
      {/* Visual cyber floating ambient light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-8 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden z-10"
      >
        {/* Glowing border accents */}
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

        {/* Header */}
        <div className="text-center mb-10 relative z-10">
          <motion.div 
            className="inline-flex items-center space-x-2 rounded-full border border-cyan-500/30 bg-cyan-950/40 px-3.5 py-1.5 text-[11px] text-cyan-400 mb-4 font-mono uppercase tracking-widest"
            whileHover={{ scale: 1.05 }}
          >
            <Zap className="h-3.5 w-3.5 text-pink-500 animate-pulse" />
            <span>AI Diagnostic Terminal</span>
          </motion.div>
          <h1 className="text-3xl font-black text-white tracking-tight font-display text-cyber-header">System Profiler</h1>
          <p className="mt-2 text-sm text-zinc-400">
            Specify your specs below to simulate high-fidelity gaming benchmarks and potential bottlenecks.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 text-sm text-rose-400 flex items-start space-x-2.5 overflow-hidden"
            >
              <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {loading ? (
            /* Loading State screen with high-end animations */
            <motion.div 
              key="loading-screen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="py-12 flex flex-col items-center text-center"
            >
              {/* Circular Ring with Glow and Ticking Percent */}
              <div className="relative flex h-28 w-28 items-center justify-center mb-8">
                <svg className="absolute inset-0 transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="44"
                    fill="none"
                    stroke="#18181b"
                    strokeWidth="6"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="44"
                    fill="none"
                    stroke="#06b6d4"
                    strokeWidth="6"
                    strokeDasharray={2 * Math.PI * 44}
                    strokeDashoffset={2 * Math.PI * 44 - (progress / 100) * (2 * Math.PI * 44)}
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
                  />
                </svg>
                <div className="z-10 flex flex-col items-center">
                  <span className="text-3xl font-black font-display text-white tabular-nums leading-none">{progress}%</span>
                  <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest mt-1">ANALYZING</span>
                </div>
              </div>
              
              <h3 className="text-xl font-black text-white tracking-tight font-display uppercase">
                Simulating Benchmark Workloads
              </h3>
              
              {/* Horizontal Neon Glowing Loading Bar */}
              <div className="w-full max-w-md bg-zinc-900 border border-zinc-800/80 rounded-full h-3.5 mt-6 mb-2 overflow-hidden p-0.5 relative">
                <motion.div 
                  className="h-full bg-gradient-to-r from-cyan-500 via-sky-400 to-indigo-500 rounded-full shadow-[0_0_12px_rgba(6,182,212,0.8)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeInOut" }}
                />
              </div>

              <div className="mt-4 px-4 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 font-mono text-[11px] text-cyan-400 tracking-wider uppercase max-w-sm w-full text-center shadow-inner min-h-[38px] flex items-center justify-center">
                <span className="animate-pulse">{LOADING_STATUS_MESSAGES[loadingMsgIdx]}</span>
              </div>

              <p className="mt-8 text-xs text-zinc-500 max-w-sm leading-relaxed font-sans">
                Running 1080p rendering passes, estimating CPU-GPU synchronization efficiency, and compiling expected frame delivery rates.
              </p>
            </motion.div>
          ) : (
            /* Input Form with high fidelity layout & animations */
            <motion.form 
              key="spec-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleAnalyze} 
              className="space-y-6 relative z-10"
            >
              {/* CPU Input */}
              <div className="group">
                <label htmlFor="cpu-input" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2 flex items-center justify-between">
                  <span className="group-hover:text-cyan-400 transition-colors">1. Central Processor (CPU)</span>
                  <span className="text-zinc-600 font-sans text-[10px] normal-case">e.g., Ryzen 7 7800X3D, i5-12400</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-zinc-500 group-focus-within:text-cyan-400 transition-colors">
                    <Cpu className="h-4.5 w-4.5" />
                  </div>
                  <input
                    id="cpu-input"
                    type="text"
                    required
                    value={cpu}
                    onChange={(e) => setCpu(e.target.value)}
                    placeholder="Intel Core i7-13700K or Ryzen 5 5600"
                    className="w-full rounded-xl border border-zinc-800/80 bg-zinc-900/10 pl-11 pr-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:border-cyan-500/50 focus:bg-zinc-900/40 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all duration-300"
                  />
                </div>
              </div>

              {/* GPU Input */}
              <div className="group">
                <label htmlFor="gpu-input" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2 flex items-center justify-between">
                  <span className="group-hover:text-cyan-400 transition-colors">2. Graphics Controller (GPU)</span>
                  <span className="text-zinc-600 font-sans text-[10px] normal-case">e.g., RTX 4070, RX 6700 XT, Intel HD 4000</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-zinc-500 group-focus-within:text-cyan-400 transition-colors">
                    <Monitor className="h-4.5 w-4.5" />
                  </div>
                  <input
                    id="gpu-input"
                    type="text"
                    required
                    value={gpu}
                    onChange={(e) => setGpu(e.target.value)}
                    placeholder="Nvidia GeForce RTX 3060 Ti or Radeon RX 580"
                    className="w-full rounded-xl border border-zinc-800/80 bg-zinc-900/10 pl-11 pr-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:border-cyan-500/50 focus:bg-zinc-900/40 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all duration-300"
                  />
                </div>
              </div>

              {/* RAM Input */}
              <div className="group">
                <label htmlFor="ram-dropdown" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2 group-hover:text-cyan-400 transition-colors">
                  3. System RAM Capacity
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-zinc-500 group-focus-within:text-cyan-400 transition-colors">
                    <HardDrive className="h-4.5 w-4.5" />
                  </div>
                  <select
                    id="ram-dropdown"
                    value={ram}
                    onChange={(e) => setRam(e.target.value)}
                    className="w-full rounded-xl border border-zinc-800/80 bg-zinc-900/10 pl-11 pr-4 py-3.5 text-sm text-white focus:border-cyan-500/50 focus:bg-zinc-900/40 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all duration-300 appearance-none cursor-pointer"
                  >
                    {ramOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-zinc-950 text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-zinc-500">
                    <span className="text-xs">&#9662;</span>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6 border-t border-zinc-800/60">
                <motion.button
                  type="submit"
                  disabled={remainingAnalyses <= 0}
                  whileHover={{ scale: remainingAnalyses > 0 ? 1.02 : 1 }}
                  whileTap={{ scale: remainingAnalyses > 0 ? 0.98 : 1 }}
                  className="group w-full flex items-center justify-center space-x-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 py-4 text-base font-bold text-white shadow-xl shadow-cyan-500/10 hover:shadow-cyan-500/25 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  <Play className="h-4 w-4 fill-white shrink-0" />
                  <span>Run Live Diagnostics</span>
                </motion.button>

                {/* Reset Details */}
                <div className="mt-4 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                  <span>Free Scans Remaining: <strong className="text-cyan-400">{remainingAnalyses} / 3</strong></span>
                  <span>Limits reset every 24 hours</span>
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

