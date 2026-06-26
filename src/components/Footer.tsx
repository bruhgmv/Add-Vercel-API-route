import { Link } from "react-router-dom";
import { Heart, Activity } from "lucide-react";

export default function Footer() {
  const footerLinks = [
    { label: "About Us", to: "/about" },
    { label: "Privacy Policy", to: "/privacy-policy" },
    { label: "Terms of Service", to: "/terms" },
    { label: "Cookie Policy", to: "/cookie-policy" },
    { label: "Contact Info", to: "/contact" }
  ] as const;

  return (
    <footer className="border-t border-zinc-900 bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center border-b border-zinc-900 pb-8 mb-8">
          
          {/* Logo Brand matching Navbar */}
          <Link to="/">
            <div className="flex items-center space-x-2.5 justify-center md:justify-start">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-500 to-indigo-600 shadow-lg shadow-cyan-500/20">
                <Activity className="h-4.5 w-4.5 text-white animate-pulse" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display font-black tracking-wider text-white text-sm uppercase">
                  RateMyPC<span className="text-pink-500 font-mono text-[9px] ml-1">AI</span>
                </span>
                <span className="text-[8px] font-mono tracking-widest text-zinc-500 uppercase -mt-0.5">Hardware Diagnostics</span>
              </div>
            </div>
          </Link>

          {/* Inline Navigation Links */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-xs text-zinc-400 hover:text-white transition-colors focus:outline-none cursor-pointer"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social / Support label */}
          <div className="text-center md:text-right">
            <p className="text-xs text-zinc-500 font-mono uppercase tracking-widest">
              Live Neural AI Engine
            </p>
          </div>
        </div>

        {/* Disclaimer and copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-zinc-500 leading-normal text-center sm:text-left max-w-lg font-sans">
            Disclaimer: RateMyPC AI benchmarks are simulated forecasts and real-world results may vary depending on hardware configuration, thermal condition, system software state, and game updates. We do not host executable diagnostic files on our servers.
          </p>
          <div className="flex items-center space-x-1 text-[11px] text-zinc-600 font-mono">
            <span>&copy; 2026 RateMyPC AI.</span>
            <span>Made with</span>
            <Heart className="h-3 w-3 text-pink-500 fill-pink-500 mx-0.5 animate-pulse" />
          </div>
        </div>
      </div>
    </footer>
  );
}
