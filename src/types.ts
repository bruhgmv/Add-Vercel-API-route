export interface AnalysisResult {
  score: number;
  tier: string;
  valorant_fps: number;
  fortnite_fps: number;
  minecraft_fps: number;
  gta5_fps: number;
  cyberpunk_fps: number;
  bottleneck: string;
  upgrade_priority: string;
  summary: string;
}

export interface HardwareInput {
  cpu: string;
  gpu: string;
  ram: string;
}

export type ViewState = 
  | "home" 
  | "analyzer" 
  | "about" 
  | "privacy" 
  | "terms" 
  | "cookies" 
  | "contact";

export interface UsageLimit {
  count: number;
  lastReset: string; // ISO string
}
