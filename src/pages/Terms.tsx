import { Scale } from "lucide-react";

export default function Terms() {
  return (
    <div className="mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8 text-zinc-300 leading-relaxed">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2.5 bg-cyan-950/40 rounded-lg border border-cyan-500/30 text-cyan-400">
          <Scale className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white font-sans">Terms of Service</h1>
      </div>
      <p className="text-sm text-zinc-400 mb-8">Last Updated: June 25, 2026</p>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
          <p className="text-zinc-400 text-sm">
            By accessing and using RateMyPC AI, you agree to comply with and be bound by these Terms of Service. If you do not agree, please cease usage of the application immediately.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">2. Service Scope & Disclaimer</h2>
          <p className="text-zinc-400 text-sm">
            RateMyPC AI is a performance estimation simulation. All benchmark charts, game score meters, and FPS statistics are model forecasts and calculations. Real-world frame rates depend on thermal efficiency, OS background tasks, drivers, and visual game updates. We offer no guarantees of precise accuracy.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">3. Fair Use & Limits</h2>
          <p className="text-zinc-400 text-sm">
            Users are granted access to a standard allotment of 3 diagnostic scans per 24 hours. Any attempt to scrape our endpoints, initiate automated requests, spoof rate headers, or bypass usage policies will result in IP-based resource throttling.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">4. Intellectual Property</h2>
          <p className="text-zinc-400 text-sm">
            All code, graphics, score meters, layout styles, and copywriting elements are protected under intellectual property laws. Users may share and screenshot results for non-commercial social and community purposes.
          </p>
        </div>
      </section>
    </div>
  );
}
