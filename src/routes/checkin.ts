import express from "express";
import { v4 as uuidv4 } from "uuid";
import { Storage } from "../models/storage";
import { CheckIn } from "../types";

const router = express.Router();

/**
 * POST /checkin
 * Body: { sleepHours?, stress?, mood?, routine?, recovery?, timestamp? }
 * Returns created checkin with id and timestamp.
 */
router.post("/", (req, res) => {
  const { sleepHours, stress, mood, routine, recovery, timestamp } = req.body;

  const checkin: CheckIn = {
    id: uuidv4(),
    sleepHours: typeof sleepHours === "number" ? sleepHours : undefined,
    stress: typeof stress === "number" ? stress : undefined,
    mood: typeof mood === "number" ? mood : undefined,
    routine: typeof routine === "boolean" ? routine : undefined,
    recovery: typeof recovery === "number" ? recovery : undefined,
    timestamp: timestamp ? String(timestamp) : new Date().toISOString()
  };

  Storage.saveCheckIn(checkin);
  res.status(201).json({ ok: true, checkin });
});

export default router;
