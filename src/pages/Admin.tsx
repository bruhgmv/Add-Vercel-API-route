import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, KeyRound, AlertTriangle, CheckCircle, Home } from "lucide-react";
import { motion } from "motion/react";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const correctPassword = (import.meta as any).env.VITE_ADMIN_PASSWORD;

    if (!correctPassword) {
      setError("VITE_ADMIN_PASSWORD is not configured in the environment variables.");
      return;
    }

    if (password === correctPassword) {
      localStorage.setItem("admin", "true");
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1500);
    } else {
      setError("Incorrect administrator password access token.");
    }
  };

  return (
    <div className="mx-auto max-w-md py-20 px-4 sm:px-6 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none z-0"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden z-10"
      >
        <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"></div>

        {/* Brand Icon */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="p-3 bg-cyan-950/40 rounded-xl border border-cyan-500/30 text-cyan-400 mb-4 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <Shield className="h-7 w-7 text-cyan-400" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight font-display">Administrator Portal</h1>
          <p className="mt-1.5 text-xs text-zinc-500 font-mono tracking-wider uppercase">RateMyPC AI Gateway</p>
        </div>

        {success ? (
          <div className="text-center py-6">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-950/50 border border-emerald-500/40 text-emerald-400 mb-4 animate-bounce">
              <CheckCircle className="h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1.5 font-sans">Access Granted</h3>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto">
              Administrator mode initialized. Redirecting you to the diagnostics console...
            </p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 text-xs text-rose-400 flex items-start space-x-2">
                <AlertTriangle className="h-4.5 w-4.5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="admin-pass" className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                Secure Password Access Key
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-zinc-500">
                  <KeyRound className="h-4 w-4" />
                </div>
                <input
                  id="admin-pass"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-zinc-800/80 bg-zinc-900/10 pl-11 pr-4 py-3 text-sm text-white placeholder-zinc-700 focus:border-cyan-500/50 focus:bg-zinc-900/40 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-all duration-300"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-sm font-semibold text-white hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md shadow-cyan-500/10 cursor-pointer"
            >
              Verify Authority
            </button>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="w-full flex items-center justify-center space-x-2 rounded-xl border border-zinc-800 bg-transparent py-2.5 text-xs font-medium text-zinc-400 hover:text-white hover:border-zinc-700 transition-all cursor-pointer"
            >
              <Home className="h-3.5 w-3.5" />
              <span>Return Home</span>
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
}
