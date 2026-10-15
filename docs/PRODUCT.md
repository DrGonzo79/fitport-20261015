# Product plan

## ICP and JTBD
Initial ICP: U.S. cruisers 55+ with explicit physical limits, and family planners, already comparing named shore excursions. JTBD: “Before I pay, tell me what this option physically requires, what is known, and what I must verify so we avoid a preventable bad day.”

## MVP
Intake traveler thresholds; capture excursion demand claims with source/date/confidence; compare walking, standing, stairs, terrain, rest interval, pace and exit route; produce a plain-language verdict, conflicts, unknowns and operator questions. Concierge analyst review is mandatory. Exclude booking, medical recommendations, wheelchair inventory and broad trip planning.

## Data model
`TravelerProfile` (thresholds, consent, expiry); `Excursion` (line, ship, port, operator, departure); `DemandClaim` (dimension, value/unit, mandatory flag, segment, source URL/type/date, confidence, expiry); `Assessment` (rule version, match/conflict/unknown, verdict); `Review` (analyst, overrides, rationale); `Outcome` (booked, completed, discrepancy, consented feedback).

## Economics and validation
Start $29 single check, $149 eight-check report, $249 with call, $99 refresh. Target median analyst time under 45 minutes for single and under 150 minutes for full report; gross margin target >70% before support. Run five paid singles after ten observed free checks. Measure pay rate, research minutes, unknown rate, decision impact, refund rate and factual discrepancies.

## AI/model strategy and moat
Use deterministic rules for verdict inputs. AI may extract candidate claims and draft questions, but must attach source spans and cannot upgrade confidence. Human approves every paid report. Moat is a fresh, versioned demand-evidence graph plus correction/outcome feedback—not model access.

## Roadmap
- **0–30 days:** concierge workflow, 10 observations, five paid checks, source taxonomy, safety review.
- **31–60:** repeatable analyst console, 30 paid checks, operator outreach, discrepancy log, referral experiment.
- **61–90:** 100 checks if retention supports it, eight-excursion bundle, freshness automation, agent partnership pilot; kill if paid conversion or unit labor misses thresholds.
