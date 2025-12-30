import express from "express";
import { v4 as uuidv4 } from "uuid";
import { Storage } from "../models/storage";
import { Context } from "../types";

const router = express.Router();

/**
 * POST /context
 * Body: { checkinId, tags: string[], text? }
 */
router.post("/", (req, res) => {
  const { checkinId, tags, text } = req.body;
  if (!checkinId || !Array.isArray(tags)) {
    return res.status(400).json({ ok: false, error: "checkinId and tags[] required" });
  }
  // validate checkin exists (best-effort)
  const checkin = Storage.getCheckIn(checkinId);
  if (!checkin) {
    return res.status(404).json({ ok: false, error: "checkin not found" });
  }

  const ctx: Context = {
    id: uuidv4(),
    checkinId,
    tags: tags.map(String),
    text: text ? String(text) : undefined,
    timestamp: new Date().toISOString()
  };

  Storage.addContext(ctx);
  res.status(201).json({ ok: true, context: ctx });
});

export default router;
