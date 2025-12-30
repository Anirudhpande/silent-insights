import express from "express";
import cors from "cors";
import morgan from "morgan";
import checkinRoutes from "./routes/checkin";
import contextRoutes from "./routes/context";
import analysisRoutes from "./routes/analysis";
import trendsRoutes from "./routes/trends";
import { Storage } from "./models/storage";

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Basic health
app.get("/health", (_req, res) => res.json({ ok: true, now: new Date().toISOString() }));

app.use("/checkin", checkinRoutes);
app.use("/context", contextRoutes);
app.use("/analysis", analysisRoutes);
app.use("/trends", trendsRoutes);

// start
app.listen(PORT, () => {
  // ensure DB file exists
  // eslint-disable-next-line no-console
  console.log(`SilentRisk backend (demo) listening on http://localhost:${PORT}`);
  Storage.getAllCheckIns(); // touch db file
});
