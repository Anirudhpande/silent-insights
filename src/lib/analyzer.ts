import { CheckIn, AnalysisResult } from "../types";

/**
 * Simple rule-based scoring for demo:
 * - stress >7 adds points
 * - sleep <6 adds points
 * - mood <4 adds points
 * - recovery <4 adds points
 * - routine false adds points
 *
 * Returns score, riskLevel, contributors and explanations.
 */
export function analyzeCheckIn(checkin: CheckIn): AnalysisResult {
  let score = 0;
  const contributors: string[] = [];
  const explanations: string[] = [];

  const presentCount = [
    typeof checkin.stress === "number",
    typeof checkin.sleepHours === "number",
    typeof checkin.mood === "number",
    typeof checkin.recovery === "number",
    typeof checkin.routine === "boolean"
  ].filter(Boolean).length;

  // Stress
  if (typeof checkin.stress === "number") {
    if (checkin.stress >= 8) {
      score += 2;
      contributors.push("high_stress");
      explanations.push(`Stress is high (${checkin.stress}/10).`);
    } else if (checkin.stress >= 6) {
      score += 1;
      contributors.push("elevated_stress");
      explanations.push(`Stress is elevated (${checkin.stress}/10).`);
    }
  }

  // Sleep
  if (typeof checkin.sleepHours === "number") {
    if (checkin.sleepHours < 5) {
      score += 2;
      contributors.push("very_little_sleep");
      explanations.push(`Low sleep (${checkin.sleepHours}h).`);
    } else if (checkin.sleepHours < 6.5) {
      score += 1;
      contributors.push("reduced_sleep");
      explanations.push(`Below-optimal sleep (${checkin.sleepHours}h).`);
    }
  }

  // Mood
  if (typeof checkin.mood === "number") {
    if (checkin.mood <= 3) {
      score += 2;
      contributors.push("low_mood");
      explanations.push(`Low mood (${checkin.mood}/10).`);
    } else if (checkin.mood <= 5) {
      score += 1;
      contributors.push("diminished_mood");
      explanations.push(`Slightly low mood (${checkin.mood}/10).`);
    }
  }

  // Recovery
  if (typeof checkin.recovery === "number") {
    if (checkin.recovery <= 3) {
      score += 2;
      contributors.push("poor_recovery");
      explanations.push(`Poor recovery (${checkin.recovery}/10).`);
    } else if (checkin.recovery <= 5) {
      score += 1;
      contributors.push("suboptimal_recovery");
      explanations.push(`Suboptimal recovery (${checkin.recovery}/10).`);
    }
  }

  // Routine
  if (typeof checkin.routine === "boolean") {
    if (!checkin.routine) {
      score += 1;
      contributors.push("routine_break");
      explanations.push(`Daily routine not followed.`);
    }
  }

  // Determine risk level
  let riskLevel: AnalysisResult["riskLevel"] = "low";
  if (score >= 4) riskLevel = "high";
  else if (score >= 2) riskLevel = "moderate";

  // Confidence: depends on how many key fields are present (min 0.2)
  const confidence = Math.min(1, Math.max(0.2, presentCount / 5));

  return {
    checkinId: checkin.id,
    riskLevel,
    score,
    confidence: Number(confidence.toFixed(2)),
    contributors,
    explanations,
    generatedAt: new Date().toISOString()
  };
}
