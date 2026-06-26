import { ShieldAlert, Cpu, Settings2, BarChart } from "lucide-react";
import { motion } from "motion/react";

export default function HowItWorks() {
  const steps = [
    {
      step: "01",
      icon: <Cpu className="h-6 w-6 text-cyan-400" />,
      title: "Enter Hardware Specs",
      description: "Type any CPU model, GPU graphics card, and select your RAM configuration. No installation required."
    },
    {
      step: "02",
      icon: <Settings2 className="h-6 w-6 text-cyan-400" />,
      title: "AI Analysis Simulation",
      description: "Our neural AI parses the architectures, clocks, and bandwidth parameters conservatively in real-time."
    },
    {
      step: "03",
      icon: <BarChart className="h-6 w-6 text-pink-500" />,
      title: "Get Comprehensive Results",
      description: "Receive your score (0-100), FPS forecasts, detailed bottlenecks, priority upgrade insights, and diagnostic summaries."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const stepVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 15 },
    },
  };

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900/80 bg-zinc-950/20 relative overflow-hidden">
      
      {/* Background cyber ambient gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="mx-auto max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-black tracking-tight text-white font-display text-cyber-header">
            How It Works
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-base">
            Get professional PC hardware benchmarking reports in three simple steps.
          </p>
        </div>

        {/* Steps Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8"
        >
          
          {/* Connector Line for Desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-cyan-500/20 via-blue-500/40 to-pink-500/20 -translate-y-[45px] pointer-events-none"></div>

          {steps.map((item, index) => (
            <motion.div
              key={index}
              variants={stepVariants}
              whileHover={{ y: -6 }}
              className="relative flex flex-col items-center text-center px-6 py-4 group"
            >
              {/* Step Badge */}
              <span className="absolute top-0 right-4 md:right-2 lg:right-6 text-6xl font-black font-mono text-zinc-900/40 group-hover:text-cyan-500/10 transition-colors select-none">
                {item.step}
              </span>

              {/* Icon Container with glowing background */}
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-950 shadow-inner group-hover:border-cyan-500/30 transition-all duration-300 mb-6">
                {item.icon}
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300"></div>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-white font-display mb-3 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
              <p className="text-zinc-400 leading-relaxed text-sm max-w-sm">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}

