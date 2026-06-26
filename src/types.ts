export interface PerformanceScores {
  gaming: number;
  productivity: number;
  streaming: number;
  programming: number;
  video_editing: number;
}

export interface GameMetrics {
  fps: number;
  preset: string;
  rating: string;
}

export interface GamesList {
  valorant: GameMetrics;
  fortnite: GameMetrics;
  minecraft: GameMetrics;
  gta5: GameMetrics;
  cyberpunk2077: GameMetrics;
}

export interface BottleneckReport {
  component: string;
  severity: string;
  reason: string;
}

export interface UpgradeSuggestion {
  component: string;
  priority: string;
  recommended_part: string;
  expected_gain_percent: number;
  reason: string;
}

export interface AnalysisResult {
  score: number;
  tier: string;
  performance: PerformanceScores;
  games: GamesList;
  bottleneck: BottleneckReport;
  upgrade: UpgradeSuggestion;
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
