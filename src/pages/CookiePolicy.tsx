import { Cookie } from "lucide-react";

export default function CookiePolicy() {
  return (
    <div className="mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8 text-zinc-300 leading-relaxed">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2.5 bg-cyan-950/40 rounded-lg border border-cyan-500/30 text-cyan-400">
          <Cookie className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white font-sans">Cookie Policy</h1>
      </div>
      <p className="text-sm text-zinc-400 mb-8">Last Updated: June 25, 2026</p>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-3">1. What Are Cookies?</h2>
          <p className="text-zinc-400 text-sm">
            Cookies are simple text documents saved on your device when visiting websites. Local Storage represents a similar capability that holds simple structured strings.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">2. How We Use Storage</h2>
          <p className="text-zinc-400 text-sm">
            We use **browser Local Storage** purely for utility state management: specifically, to keep count of your diagnostic scans (with a limit of 3 scans per day resetting every 24 hours). This storage stays entirely on your local machine and is not synchronized to any centralized profiling database.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">3. Third-Party Analytics and Ads</h2>
          <p className="text-zinc-400 text-sm">
            Our diagnostic platform contains basic integrations for Google Analytics and Google AdSense. These networks place standard advertising and telemetry cookies to help monitor page activity and generate relevant, contextual advertisements. You can block or delete cookies via your browser preferences.
          </p>
        </div>
      </section>
    </div>
  );
}
