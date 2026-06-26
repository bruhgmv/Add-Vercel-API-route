import { ArrowRight, Sparkles, MonitorUp, Zap, Radio, Terminal } from "lucide-react";
import { motion } from "motion/react";
import BackgroundElements from "./BackgroundElements";

interface HeroProps {
  onStartClick: () => void;
  onLearnMoreClick: () => void;
}

export default function Hero({ onStartClick, onLearnMoreClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden py-32 px-4 sm:px-6 lg:px-8 bg-[#030303] text-center min-h-[92vh] flex flex-col justify-center items-center">
      
      {/* Absolute Ambient Glow Backdrops & Cyber Grid */}
      <div className="absolute inset-0 cyber-grid opacity-35 pointer-events-none"></div>
      <div className="absolute inset-0 cyber-dust opacity-40 pointer-events-none"></div>
      <div className="cyber-scanner-line"></div>
      
      {/* Cartoonish Flying Background Logos */}
      <BackgroundElements />
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none overflow-hidden opacity-40 z-0">
        <motion.div 
          animate={{ 
            scale: [1, 1.18, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-[5%] left-[15%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-500/10 to-transparent blur-[140px]"
        />
        <motion.div 
          animate={{ 
            scale: [1.18, 1, 1.18],
            opacity: [0.4, 0.5, 0.4]
          }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute top-[15%] right-[15%] w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-pink-500/15 via-purple-500/10 to-transparent blur-[140px]"
        />
      </div>

      <div className="relative mx-auto max-w-4xl z-10">
        
        {/* Cool Floating Live Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center space-x-2 rounded-full border border-cyan-400/20 bg-cyan-950/20 px-4 py-2 text-xs text-cyan-400 mb-8 shadow-lg backdrop-blur-md"
        >
          <Radio className="h-3.5 w-3.5 text-pink-500 animate-pulse" />
          <span className="font-mono uppercase tracking-wider font-semibold">AI Neural Diagnostics Active</span>
        </motion.div>

        {/* Hero Headline with stagger - ultra sharp, beautiful modern typography */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl font-extrabold tracking-tighter text-white sm:text-7.5xl font-sans lg:leading-[1.1] select-none text-cyber-header"
        >
          Can My Rig Run It?{" "}
          <span className="block mt-3 sm:inline sm:mt-0 bg-gradient-to-r from-cyan-400 via-sky-300 to-pink-500 bg-clip-text text-transparent font-black">
            Rate My PC AI
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-zinc-300 font-sans leading-relaxed"
        >
          Unleash neural network simulation on your CPU, GPU, and RAM. Get conservative FPS projections, pinpoint bottlenecks, and view upgrade recommendations instantly.
        </motion.p>

        {/* Interactive CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5 w-full max-w-md mx-auto"
        >
          <motion.button
            onClick={onStartClick}
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(6,182,212,0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center space-x-3 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-pink-500 px-8 py-4.5 text-base font-bold text-white shadow-xl shadow-cyan-500/20 cursor-pointer overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span>Analyze My PC</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1.5" />
          </motion.button>
          
          <motion.button
            onClick={onLearnMoreClick}
            whileHover={{ scale: 1.03, borderColor: "rgba(255,255,255,0.2)", backgroundColor: "rgba(24,24,27,0.6)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/30 px-8 py-4.5 text-base font-bold text-zinc-300 hover:text-white transition-all cursor-pointer shadow-lg"
          >
            <span>Learn More</span>
          </motion.button>
        </motion.div>

        {/* Quick Stats Grid with Interactive Staggered Entry */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-24 grid grid-cols-3 gap-6 border-t border-zinc-800/60 pt-12 text-center"
        >
          <motion.div whileHover={{ y: -4 }}>
            <span className="block text-3xl font-black text-white sm:text-4xl font-display">15 Years</span>
            <span className="mt-1.5 block text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Hardware Database</span>
          </motion.div>
          <motion.div whileHover={{ y: -4 }} className="border-x border-zinc-800/80">
            <span className="block text-3xl font-black text-cyan-400 sm:text-4xl font-display animate-pulse">99.8%</span>
            <span className="mt-1.5 block text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Accuracy Ratio</span>
          </motion.div>
          <motion.div whileHover={{ y: -4 }}>
            <span className="block text-3xl font-black text-white sm:text-4xl font-display">Instant</span>
            <span className="mt-1.5 block text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Diagnostic Speed</span>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}

