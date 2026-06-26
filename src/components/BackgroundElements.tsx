import { ReactNode } from "react";
import { motion } from "motion/react";
import { Gamepad2, Cpu, Monitor, Zap, Flame, Gauge, Sparkles } from "lucide-react";

interface FloatingSticker {
  icon: ReactNode;
  label: string;
  subLabel?: string;
  badgeColor: string; // Background color of the sticker
  textColor: string;
  shadowClass: string; // solid drop shadow
  initialX: string;
  initialY: string;
  moveX: number[];
  moveY: number[];
  rotates: number[];
  duration: number;
  scale?: number;
}

export default function BackgroundElements() {
  const stickers: FloatingSticker[] = [
    {
      icon: <Gamepad2 className="h-6 w-6 text-white" />,
      label: "GAMEPAD",
      subLabel: "ACTIVE 240Hz",
      badgeColor: "bg-pink-500",
      textColor: "text-white",
      shadowClass: "shadow-[5px_5px_0px_0px_#ffffff]",
      initialX: "6%",
      initialY: "14%",
      moveX: [0, 20, -15, 0],
      moveY: [0, -30, 15, 0],
      rotates: [-6, 12, -15, -6],
      duration: 8,
      scale: 0.9,
    },
    {
      icon: <Cpu className="h-6 w-6 text-black animate-spin" style={{ animationDuration: "5s" }} />,
      label: "CPU ULTRA",
      subLabel: "AMD/INTEL CORE",
      badgeColor: "bg-cyan-400",
      textColor: "text-black font-extrabold",
      shadowClass: "shadow-[5px_5px_0px_0px_#ffffff]",
      initialX: "84%",
      initialY: "12%",
      moveX: [0, -25, 15, 0],
      moveY: [0, 40, -20, 0],
      rotates: [8, -10, 12, 8],
      duration: 10,
      scale: 1.0,
    },
    {
      icon: <Monitor className="h-6 w-6 text-white" />,
      label: "RTX GPU",
      subLabel: "16GB VRAM MAX",
      badgeColor: "bg-indigo-600",
      textColor: "text-white",
      shadowClass: "shadow-[5px_5px_0px_0px_#ffffff]",
      initialX: "78%",
      initialY: "74%",
      moveX: [0, -20, 20, 0],
      moveY: [0, -35, 15, 0],
      rotates: [-4, 6, -8, -4],
      duration: 9,
      scale: 0.95,
    },
    {
      icon: <Zap className="h-6 w-6 text-black animate-bounce" />,
      label: "OVERCLOCK",
      subLabel: "100% EXTREME",
      badgeColor: "bg-yellow-400",
      textColor: "text-black font-extrabold",
      shadowClass: "shadow-[5px_5px_0px_0px_#ffffff]",
      initialX: "4%",
      initialY: "72%",
      moveX: [0, 15, -20, 0],
      moveY: [0, 25, -15, 0],
      rotates: [10, -12, 14, 10],
      duration: 7.5,
      scale: 0.9,
    },
    {
      icon: <Flame className="h-6 w-6 text-white" />,
      label: "FORDS FPS",
      subLabel: "360+ ULTRA",
      badgeColor: "bg-red-500",
      textColor: "text-white",
      shadowClass: "shadow-[5px_5px_0px_0px_#ffffff]",
      initialX: "46%",
      initialY: "82%",
      moveX: [0, 30, -30, 0],
      moveY: [0, -25, 25, 0],
      rotates: [-2, 10, -10, -2],
      duration: 11,
      scale: 1.05,
    },
    {
      icon: <Gauge className="h-6 w-6 text-white" />,
      label: "FPS BENCH",
      subLabel: "DIAGNOSTICS",
      badgeColor: "bg-emerald-500",
      textColor: "text-white",
      shadowClass: "shadow-[5px_5px_0px_0px_#ffffff]",
      initialX: "86%",
      initialY: "44%",
      moveX: [0, -15, 25, 0],
      moveY: [0, -30, 10, 0],
      rotates: [-8, 8, -6, -8],
      duration: 9.5,
      scale: 0.85,
    },
    {
      icon: <Sparkles className="h-6 w-6 text-black" />,
      label: "AI ENGINE",
      subLabel: "NEURAL CORE",
      badgeColor: "bg-purple-400",
      textColor: "text-black font-extrabold",
      shadowClass: "shadow-[5px_5px_0px_0px_#ffffff]",
      initialX: "12%",
      initialY: "44%",
      moveX: [0, 25, -15, 0],
      moveY: [0, 20, -30, 0],
      rotates: [12, -15, 10, 12],
      duration: 8.5,
      scale: 0.95,
    }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
      {stickers.map((sticker, idx) => (
        <motion.div
          key={idx}
          style={{
            position: "absolute",
            left: sticker.initialX,
            top: sticker.initialY,
            scale: sticker.scale || 1,
          }}
          animate={{
            x: sticker.moveX,
            y: sticker.moveY,
            rotate: sticker.rotates,
          }}
          transition={{
            duration: sticker.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`flex items-center space-x-2.5 px-4 py-2.5 rounded-2xl border-[3px] border-white ${sticker.badgeColor} ${sticker.textColor} ${sticker.shadowClass} select-none pointer-events-none transform transition-transform duration-300 hover:scale-110`}
        >
          <div className="flex-shrink-0 drop-shadow-[2px_2px_0px_rgba(0,0,0,0.5)]">
            {sticker.icon}
          </div>
          <div className="flex flex-col text-left font-mono">
            <span className="text-[11px] font-black uppercase tracking-wider leading-none">
              {sticker.label}
            </span>
            {sticker.subLabel && (
              <span className="text-[9px] opacity-90 uppercase tracking-widest leading-none mt-1 font-bold">
                {sticker.subLabel}
              </span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
