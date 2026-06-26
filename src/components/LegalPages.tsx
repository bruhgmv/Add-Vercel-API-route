import React, { useState } from "react";
import { Mail, Shield, Scale, Info, Cookie, Send, Sparkles, CheckCircle } from "lucide-react";

// ==========================================
// ABOUT US VIEW
// ==========================================
export function AboutView({ onCtaClick }: { onCtaClick: () => void }) {
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
          onClick={onCtaClick}
          className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-medium text-white hover:from-cyan-400 hover:to-blue-500 transition-colors"
        >
          Try the Analyzer Now
        </button>
      </div>
    </div>
  );
}

// ==========================================
// PRIVACY POLICY VIEW
// ==========================================
export function PrivacyView() {
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

// ==========================================
// TERMS OF SERVICE VIEW
// ==========================================
export function TermsView() {
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

// ==========================================
// COOKIE POLICY VIEW
// ==========================================
export function CookiesView() {
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

// ==========================================
// CONTACT VIEW
// ==========================================
export function ContactView() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !subject || !message) {
      setError("Please fill in all the fields before submitting.");
      return;
    }
    setError("");
    setSubmitted(true);
    // Clear inputs
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8">
      <div className="grid gap-12 md:grid-cols-5">
        
        {/* Contact Info */}
        <div className="md:col-span-2 text-zinc-300">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2.5 bg-cyan-950/40 rounded-lg border border-cyan-500/30 text-cyan-400">
              <Mail className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white font-sans">Get In Touch</h1>
          </div>
          <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
            Have questions about benchmark ratings, partnership inquiries, custom solutions, or advertising on RateMyPC AI? Reach out, and we'll reply within 24-48 business hours.
          </p>

          <div className="space-y-4 rounded-xl border border-zinc-855/50 bg-zinc-900/10 p-5 border-zinc-800">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">Support Email</span>
              <a href="mailto:support@ratemypc.ai" className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors">
                support@ratemypc.ai
              </a>
            </div>
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block mb-1">Corporate & Media</span>
              <a href="mailto:partners@ratemypc.ai" className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors">
                partners@ratemypc.ai
              </a>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="md:col-span-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/30 p-8 shadow-xl shadow-zinc-950/50">
            {submitted ? (
              <div className="text-center py-8">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-950/50 border border-emerald-500/40 text-emerald-400 mb-4 animate-bounce">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 font-sans">Message Dispatched!</h3>
                <p className="text-sm text-zinc-400 max-w-xs mx-auto mb-6">
                  Thank you for reaching out to RateMyPC AI. Our systems have logged your inquiry, and an analyst will respond soon.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="rounded-lg border border-zinc-700 hover:border-zinc-500 px-4 py-2 text-xs font-medium text-zinc-300 transition-all hover:text-white"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-lg font-bold text-white font-sans mb-2">Send a Secure Message</h3>
                
                {error && (
                  <div className="rounded-lg border border-red-500/30 bg-red-950/20 p-3.5 text-xs text-red-400">
                    {error}
                  </div>
                )}

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-medium text-zinc-400 mb-1.5">Your Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950/50 px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contact-subject" className="block text-xs font-medium text-zinc-400 mb-1.5">Subject</label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="General Hardware Question"
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950/50 px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-medium text-zinc-400 mb-1.5">Message Body</label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message details here..."
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950/50 px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-sm font-medium text-white hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md shadow-cyan-500/10"
                >
                  <Send className="h-4 w-4" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
