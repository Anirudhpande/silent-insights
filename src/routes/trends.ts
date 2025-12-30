import express from "express";
import { Storage } from "../models/storage";
import { analyzeCheckIn } from "../lib/analyzer";

const router = express.Router();

/**
 * GET /trends?limit=20
 * Returns a list of recent analyses and a simple average risk score.
 */
router.get("/", (req, res) => {
  const limit = Math.min(200, Number(req.query.limit || 50));
  const checkins = Storage.getAllCheckIns()
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);

  const analyses = checkins.map((c) => analyzeCheckIn(c));
  const avgScore = analyses.length ? analyses.reduce((s, a) => s + a.score, 0) / analyses.length : 0;

  res.json({
    ok: true,
    meta: { count: analyses.length, averageScore: Number(avgScore.toFixed(2)) },
    analyses
  });
});

export default router;
