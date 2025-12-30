export type ISODateString = string;

export interface CheckIn {
  id: string;
  sleepHours?: number;    // e.g. 7.5
  stress?: number;        // 1-10 (higher = more stress)
  mood?: number;          // 1-10 (higher = better mood)
  routine?: boolean;      // true = followed routine
  recovery?: number;      // 1-10 (higher = better recovery)
  timestamp: ISODateString;
}

export interface Context {
  id: string;
  checkinId: string;
  tags: string[];         // e.g. ["work", "travel"]
  text?: string;
  timestamp: ISODateString;
}

export type RiskLevel = "low" | "moderate" | "high";

export interface AnalysisResult {
  checkinId: string;
  riskLevel: RiskLevel;
  score: number;                  // numeric aggregated score
  confidence: number;             // 0.0 - 1.0
  contributors: string[];         // factors increasing risk
  explanations: string[];         // human readable notes
  generatedAt: ISODateString;
}
