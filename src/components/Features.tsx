import { BarChart3, Award, Flame, Lightbulb, Brain, Gauge } from "lucide-react";
import { motion } from "motion/react";

export default function Features() {
  const features = [
    {
      icon: <Gauge className="h-6 w-6 text-cyan-400" />,
      title: "PC Score (0-100)",
      description: "A single, streamlined performance index compiled by analyzing CPU clocks, GPU floating-point throughput, and RAM memory speeds."
    },
    {
      icon: <Award className="h-6 w-6 text-emerald-400" />,
      title: "Gaming Tier Placement",
      description: "Instantly discover where your system lands, from Entry and Budget up to high-end Ultra Enthusiast classes."
    },
    {
      icon: <Flame className="h-6 w-6 text-pink-500" />,
      title: "Conservative FPS Estimates",
      description: "Get reliable, real-world frame rates for top titles like Valorant, Fortnite, Minecraft, GTA V, and Cyberpunk 2077."
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-yellow-400" />,
      title: "Smart Upgrade Priority",
      description: "Stop guessing. Find out exactly which component is holding you back and receive recommended upgrades with the best ROI."
    },
    {
      icon: <Brain className="h-6 w-6 text-purple-400" />,
      title: "AI Performance Summary",
      description: "Receive deep natural language hardware reviews outlining architecture, compatibility, and real-world gaming capabilities."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900/80 bg-zinc-950/40 relative">
      <div className="mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center mb-16 relative">
          <div className="inline-flex items-center space-x-2 rounded-full border border-zinc-800 bg-zinc-900/40 px-3.5 py-1.5 text-xs text-zinc-400 mb-4 font-mono uppercase tracking-widest">
            <BarChart3 className="h-3.5 w-3.5 text-cyan-400" />
            <span>Diagnostic Features</span>
          </div>
          <h2 className="text-4xl font-black tracking-tight text-white font-display text-cyber-header">
            Complete PC Benchmarking Suite
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-base">
            Our AI benchmark model analyzes deep hardware characteristics to deliver realistic, high-fidelity diagnostic reports.
          </p>
        </div>

        {/* Features Bento/Grid with Stagger Animation */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                borderColor: "rgba(6,182,212,0.4)",
                boxShadow: "0 10px 30px -10px rgba(6,182,212,0.15)"
              }}
              className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/10 p-8 transition-all duration-300"
            >
              {/* Decorative hover gradient border overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/0 via-cyan-500/0 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

              {/* Icon */}
              <div className="inline-flex rounded-xl bg-zinc-950 p-4 border border-zinc-800/80 group-hover:border-cyan-500/30 transition-colors shadow-inner">
                {item.icon}
              </div>

              {/* Title & Description */}
              <h3 className="mt-6 text-xl font-bold text-white font-display tracking-wide group-hover:text-cyan-400 transition-colors">
                {item.title}
              </h3>
              <p className="mt-3.5 text-zinc-400 leading-relaxed text-sm">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

