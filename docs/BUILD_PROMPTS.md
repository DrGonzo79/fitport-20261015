# Phased build prompts

1. **Concierge console:** Build analyst-only claim capture with source URL, date, class, exact demand, mandatory/optional segment, confidence and expiry. Reject unsourced claims. Add fixtures and contract tests.
2. **Reviewed report:** Add traveler consent/intake, deterministic comparison, reviewer override with rationale, accessible PDF/web delivery, audit log, deletion controls and discrepancy reporting.
3. **Freshness system:** Add queued extraction that proposes—not approves—claims, source-span citations, conflict detection, expiry alerts, operator confirmation and metrics for unknowns/overrides.
4. **Evidence network:** Add ship/port/operator identity resolution, outcome feedback with consent, reusable claim history, agent workspace and API. Do not expose a score without provenance.

At each phase: threat-model sensitive travel/health-adjacent data, test keyboard/screen-reader use, instrument latency and failures, red-team fabricated citations, and require human approval before recommendations.
