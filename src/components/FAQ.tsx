import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const faqs: FAQItem[] = [
    {
      id: "faq-1",
      question: "How does the RateMyPC AI evaluation work?",
      answer: "RateMyPC AI utilizes advanced artificial intelligence to parse your hardware specifications, cross-referencing real-world benchmarks, game engine architectures, clock speeds, cores, and memory bandwidth. It computes a unified performance score and conservative real-world frame rates for top-tier competitive games."
    },
    {
      id: "faq-2",
      question: "What is a bottleneck, and why is it important?",
      answer: "A bottleneck occurs when one component in your computer (usually the CPU or GPU) limits the maximum throughput of the other, preventing you from utilizing your computer's full hardware capacity. By identifying which part is holding your system back, you save money by upgrading only the limiting component."
    },
    {
      id: "faq-3",
      question: "How accurate are the estimated FPS counts?",
      answer: "We intentionally generate conservative, realistic FPS estimates representing stable 1080p high-performance gaming sessions on standard multiplayer maps. Instead of peak marketing numbers, our estimates are designed to reflect real-world sustained performance, taking thermal throttling and complex scenes into account."
    },
    {
      id: "faq-4",
      question: "What hardware components are supported?",
      answer: "We support virtually any consumer hardware released over the last 15 years, including legacy architectures like Intel HD Graphics, Nvidia GTX/RTX, AMD Radeon/Ryzen, and modern ultra-performance units like the RTX 4090 or Ryzen 7 7800X3D. If hardware is unknown, the AI automatically evaluates the component using architectural characteristics."
    },
    {
      id: "faq-5",
      question: "Why is there a limit of 3 analyses per day?",
      answer: "Our backend uses powerful enterprise-tier AI models. To ensure the service remains completely free for everyone and to protect our backend from automated scrapers and high API fees, we implement a lightweight local rate limit of 3 queries per 24 hours."
    },
    {
      id: "faq-6",
      question: "Does checking my PC install any software?",
      answer: "No! RateMyPC AI is 100% web-based. We will never ask you to install any executable files or extensions. Your privacy and computer security are fully respected."
    }
  ];

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900/80 bg-zinc-950">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px]"></div>
      
      <div className="mx-auto max-w-4xl relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 rounded-full border border-zinc-800 bg-zinc-900/40 px-3.5 py-1.5 text-xs text-cyan-400 mb-4 font-mono uppercase tracking-widest">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-4xl font-black tracking-tight text-white font-display text-cyber-header">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
            Learn more about how our AI diagnostics evaluate system capabilities, bottleneck metrics, and gaming frames.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                layout="position"
                key={faq.id}
                id={faq.id}
                className={`group overflow-hidden rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? "border-cyan-500/40 bg-zinc-900/50 shadow-[0_0_15px_rgba(6,182,212,0.08)]"
                    : "border-zinc-800 bg-zinc-900/10 hover:border-zinc-700/80 hover:bg-zinc-900/20"
                }`}
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none cursor-pointer"
                >
                  <span className={`text-base font-semibold transition-colors ${isOpen ? "text-cyan-400" : "text-zinc-100 group-hover:text-white"}`}>
                    {faq.question}
                  </span>
                  <span className={`ml-4 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-zinc-700 text-zinc-400 transition-transform duration-300 ${
                    isOpen ? "rotate-180 border-cyan-500/30 bg-cyan-950/30 text-cyan-400" : "group-hover:text-zinc-200"
                  }`}>
                    <ChevronDown className="h-4 w-4" />
                  </span>
                </button>
                
                {/* Accordion body animation with framer motion */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 pt-1 text-sm text-zinc-400 border-t border-zinc-800/40 leading-relaxed font-sans">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

