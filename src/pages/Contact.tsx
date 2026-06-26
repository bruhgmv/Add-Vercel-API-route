import React, { useState } from "react";
import { Mail, Send, CheckCircle } from "lucide-react";

export default function Contact() {
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

          <div className="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/10 p-5">
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
                  className="rounded-lg border border-zinc-700 hover:border-zinc-500 px-4 py-2 text-xs font-medium text-zinc-300 transition-all hover:text-white cursor-pointer"
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
                    required
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
                    required
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
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message details here..."
                    className="w-full rounded-lg border border-zinc-800 bg-zinc-950/50 px-3.5 py-2.5 text-sm text-white placeholder-zinc-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center space-x-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-sm font-medium text-white hover:from-cyan-400 hover:to-blue-500 transition-all shadow-md shadow-cyan-500/10 cursor-pointer"
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
