import fs from "fs";
import path from "path";
import { CheckIn, Context } from "../types";

const DB_FILE = path.join(process.cwd(), "data", "db.json");

type DBShape = {
  checkins: CheckIn[];
  contexts: Context[];
};

function ensureDbFile() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DB_FILE)) {
    const seed: DBShape = { checkins: [], contexts: [] };
    fs.writeFileSync(DB_FILE, JSON.stringify(seed, null, 2));
  }
}

function readDb(): DBShape {
  ensureDbFile();
  const raw = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(raw) as DBShape;
}

function writeDb(db: DBShape) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

export const Storage = {
  getAllCheckIns(): CheckIn[] {
    return readDb().checkins;
  },

  getCheckIn(id: string): CheckIn | undefined {
    return readDb().checkins.find((c) => c.id === id);
  },

  saveCheckIn(checkin: CheckIn) {
    const db = readDb();
    db.checkins.push(checkin);
    writeDb(db);
  },

  addContext(ctx: Context) {
    const db = readDb();
    db.contexts.push(ctx);
    writeDb(db);
  },

  getContextsForCheckin(checkinId: string): Context[] {
    return readDb().contexts.filter((c) => c.checkinId === checkinId);
  },

  getAllContexts(): Context[] {
    return readDb().contexts;
  }
};
