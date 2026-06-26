import { Shield } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8 text-zinc-300 leading-relaxed">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2.5 bg-cyan-950/40 rounded-lg border border-cyan-500/30 text-cyan-400">
          <Shield className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white font-sans">Privacy Policy</h1>
      </div>
      <p className="text-sm text-zinc-400 mb-8">Last Updated: June 25, 2026</p>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-white mb-3">1. Information We Collect</h2>
          <p className="text-zinc-400 text-sm">
            We operate on a zero-personal-data retention architecture. We do not collect names, email addresses, IP addresses, or personal information. The only information entered into the system is the hardware configuration you choose to analyze (CPU, GPU, and RAM capacity).
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">2. How We Use Information</h2>
          <p className="text-zinc-400 text-sm">
            The hardware configurations you input are forwarded securely to our backend server and processed through our advanced neural AI endpoint to simulate performance. This diagnostic data is completely anonymous and cannot be tied to any individual.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">3. Cookies and Local Storage</h2>
          <p className="text-zinc-400 text-sm">
            We use browser `localStorage` to persist a diagnostic scan counter. This simple tracker ensures you do not exceed our 3 free analyses per day limit and does not track you across the web or collect personal information. We also use standard, non-invasive Google Analytics cookies to monitor traffic volumes.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">4. Security of Data</h2>
          <p className="text-zinc-400 text-sm">
            We utilize secure HTTPS endpoints to transmit data between your browser and our server. Since no personal information is requested or saved, there is no threat of identity theft or database leaks.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold text-white mb-3">5. Third-Party Links & Ads</h2>
          <p className="text-zinc-400 text-sm">
            We may display third-party advertisements (such as Google AdSense) on our site. These advertisers may use cookies, web beacons, or interest-based targeting tracking systems. You can configure your browser privacy options to opt-out of interest-based ads.
          </p>
        </div>
      </section>
    </div>
  );
}
