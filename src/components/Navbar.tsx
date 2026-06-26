import { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Cpu, Menu, X, Landmark, RefreshCw, Terminal, Activity } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  remainingAnalyses: number;
}

export default function Navbar({ remainingAnalyses }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const currentPath = location.pathname;
  const isScanMode = searchParams.get("scan") === "true";

  const getActiveItem = () => {
    if (currentPath === "/about") return "about";
    if (currentPath === "/contact") return "contact";
    if (currentPath === "/") {
      return isScanMode ? "analyzer" : "home";
    }
    return "";
  };

  const activeItem = getActiveItem();

  const navItems = [
    { id: "home", label: "Home", to: "/" },
    { id: "analyzer", label: "AI Analyzer", to: "/?scan=true" },
    { id: "about", label: "About", to: "/about" },
    { id: "contact", label: "Contact", to: "/contact" }
  ] as const;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Cool Glowing Interactive Logo */}
          <Link to="/">
            <motion.div 
              className="flex cursor-pointer items-center space-x-3.5 group text-left" 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-indigo-600 shadow-lg shadow-cyan-500/25 border border-cyan-400/30 overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-pink-500/20"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                />
                <Activity className="h-5.5 w-5.5 text-white z-10 animate-pulse" />
                <div className="absolute -inset-1 rounded-xl bg-cyan-500 opacity-40 blur-md group-hover:opacity-75 transition-opacity duration-300"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-display bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-lg font-black tracking-wider text-transparent uppercase leading-none">
                  RateMyPC<span className="text-pink-500 font-mono text-[10px] ml-1.5 align-super tracking-widest bg-pink-500/10 px-1.5 py-0.5 rounded border border-pink-500/20">AI</span>
                </span>
                <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase mt-0.5">Hardware Diagnostics</span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const isActive = activeItem === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.to}
                  className="relative text-sm font-medium tracking-wide py-1.5 px-3 transition-colors text-zinc-400 hover:text-white"
                >
                  <span className={`relative z-10 transition-colors ${isActive ? "text-cyan-400 font-bold" : ""}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div 
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-lg bg-zinc-900/60 border border-cyan-500/30 shadow-[0_0_12px_rgba(6,182,212,0.15)] pointer-events-none"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Side CTA & Usage limit display */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.div 
              className="flex items-center space-x-2 rounded-full border border-zinc-800/80 bg-zinc-900/60 px-3.5 py-1.5 text-xs text-zinc-400 shadow-inner"
              whileHover={{ scale: 1.03 }}
            >
              <span className="relative flex h-2 w-2">
                <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${remainingAnalyses > 0 ? "bg-cyan-400 animate-ping" : "bg-rose-400"}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${remainingAnalyses > 0 ? "bg-cyan-500" : "bg-rose-500"}`}></span>
              </span>
              <span className="font-mono">{remainingAnalyses} / 3 Scans Left</span>
            </motion.div>
            
            <Link to="/?scan=true">
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(6,182,212,0.35)" }}
                whileTap={{ scale: 0.95 }}
                className="relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white tracking-wide border border-cyan-400/20 shadow-lg shadow-cyan-500/10 cursor-pointer overflow-hidden group"
              >
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                Analyze My PC
              </motion.div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <div className="flex items-center space-x-1 rounded-full border border-zinc-800 bg-zinc-900/40 px-2.5 py-1 text-[10px] text-zinc-400">
              <span className={`h-1.5 w-1.5 rounded-full ${remainingAnalyses > 0 ? "bg-cyan-500" : "bg-rose-500"}`}></span>
              <span className="font-mono">{remainingAnalyses} left</span>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-md p-2 text-zinc-400 hover:bg-zinc-900 hover:text-white focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden border-b border-zinc-800 bg-zinc-950/98 px-4 pt-2 pb-4 space-y-1 overflow-hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={`block w-full text-left rounded-lg px-4 py-2.5 text-base font-medium transition-all ${
                  activeItem === item.id
                    ? "bg-gradient-to-r from-cyan-950/40 to-transparent border-l-2 border-cyan-500 text-cyan-400 font-bold"
                    : "text-zinc-400 hover:bg-zinc-900/50 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-zinc-900">
              <Link to="/?scan=true" onClick={() => setIsOpen(false)}>
                <div className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-center text-sm font-semibold text-white hover:from-cyan-400 hover:to-blue-500">
                  Analyze My PC
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
