import { useNavigate } from "react-router-dom";
import { Info, Sparkles, Shield } from "lucide-react";

export default function About() {
  const navigate = useNavigate();

  const handleCtaClick = () => {
    navigate("/?scan=true");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8 text-zinc-300">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2.5 bg-cyan-950/40 rounded-lg border border-cyan-500/30 text-cyan-400">
          <Info className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white font-sans">About RateMyPC AI</h1>
      </div>
      
      <p className="text-lg text-zinc-400 mb-8 leading-relaxed">
        RateMyPC AI is a premium SaaS benchmark simulator and system optimization index. We democratize computer hardware performance diagnostics using advanced, low-latency artificial intelligence.
      </p>

      <div className="grid gap-8 md:grid-cols-2 mb-12">
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-cyan-400" />
            Our Mission
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Standard hardware benchmarks require downloading bulky 3D engines or running complex diagnostic software. Our goal is to offer zero-friction, instant system ratings using natural language hardware processing.
          </p>
        </div>
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-6">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-400" />
            Accurate Benchmarks
          </h3>
          <p className="text-sm text-zinc-400 leading-relaxed">
            Our model accounts for real-world variables, thermal behaviors, architectural parities, and common bottlenecks to produce conservative, highly representative scores that match typical heavy gaming.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-cyan-500/10 bg-gradient-to-tr from-zinc-900/40 to-cyan-950/10 p-8 mb-12">
        <h2 className="text-xl font-bold text-white mb-4">How Does It Compute Ratings?</h2>
        <p className="text-sm leading-relaxed text-zinc-400 mb-4">
          When you enter any CPU, GPU, and RAM, our parser standardizes the nomenclature. The system processes characteristics like core counts, core clock speeds, GPU tensor architecture, memory speed, and PCI express bottlenecks.
        </p>
        <p className="text-sm leading-relaxed text-zinc-400">
          We compare the specs against a reference database and run simulated gaming engines to forecast expected frame rates on standard configurations (1080p, High Settings).
        </p>
      </div>

      <div className="text-center">
        <button
          onClick={handleCtaClick}
          className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-medium text-white hover:from-cyan-400 hover:to-blue-500 transition-colors cursor-pointer"
        >
          Try the Analyzer Now
        </button>
      </div>
    </div>
  );
}
