# SilentRisk — Minimal Backend (demo)

This is a minimal Express + TypeScript backend scaffold for the SilentRisk hackathon/PWA demo.

Goals
- Fast to run locally
- Explainable, rule-based analysis (no ML)
- No auth (anonymous / client-generated userId if needed)
- Lightweight JSON persistence (data/db.json)

Endpoints
- POST /checkin
  - Body: { sleepHours?, stress?, mood?, routine?, recovery?, timestamp? }
  - Returns created checkin

- POST /context
  - Body: { checkinId, tags: string[], text? }
  - Attach tags / text to a checkin

- GET /analysis?checkinId=...
  - Returns rule-based AnalysisResult for that checkin

- GET /trends?limit=50
  - Returns recent analyses and a simple average score

Run locally
1. Install
   - npm install

2. Start dev server
   - npm run dev
   - Server runs at http://localhost:4000

Notes
- Persistence is file-based at `data/db.json`. It's intentionally simple for a hackathon/demo.
- Analyzer code is in `src/lib/analyzer.ts` and is purposely easy to read and tweak.
- If you'd like SQLite instead, I can swap the storage layer quickly.
- I created these files on branch `feature/backend-scaffold`. If you want I can push them to that branch and open a PR; otherwise copy & commit locally.
