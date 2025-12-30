import express from "express";
import { Storage } from "../models/storage";
import { analyzeCheckIn } from "../lib/analyzer";

const router = express.Router();

/**
 * GET /analysis?checkinId=...
 * Returns the analysis result for a checkin (computed on the fly).
 */
router.get("/", (req, res) => {
  const checkinId = String(req.query.checkinId || "");
  if (!checkinId) {
    return res.status(400).json({ ok: false, error: "checkinId query param required" });
  }

  const checkin = Storage.getCheckIn(checkinId);
  if (!checkin) {
    return res.status(404).json({ ok: false, error: "checkin not found" });
  }

  const contexts = Storage.getContextsForCheckin(checkinId);
  const analysis = analyzeCheckIn(checkin);

  // add context-based explanations (simple)
  if (contexts.length > 0) {
    analysis.explanations.push(`Tags: ${Array.from(new Set(contexts.flatMap((c) => c.tags))).join(", ")}`);
  }

  res.json({ ok: true, analysis });
});

export default router;
