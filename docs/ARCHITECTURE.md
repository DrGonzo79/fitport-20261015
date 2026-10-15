# Architecture

The static Next.js demo imports shared fictional fixtures and a deterministic TypeScript evaluator; it works under a GitHub Pages base path with no network or persistence. The FastAPI service mirrors the core domain operation at `POST /assess`, validates typed input with Pydantic and is tested locally/CI but is **not deployed**.

Production separates: intake/consent; evidence ingestion; immutable source claims; rules/versioned assessment; analyst review; report delivery; outcome/correction loop. PostgreSQL stores structured claims and audit events; object storage holds consented source captures; a queue handles extraction. Every result includes rule version, source age, confidence and reviewer. Observability tracks latency, extraction rejection, unknown/conflict rates, reviewer overrides, stale claims, discrepancy reports and safety escalations. PII is minimized, encrypted and deleted on a stated schedule.

Failure policy: missing/stale evidence becomes UNKNOWN; source disagreement is shown, not averaged; service failure preserves no partial booking recommendation; itinerary/weather/operator changes trigger re-check. No automated medical inference or guaranteed-accessibility claim.
