# FitPort

A runnable concept for a source-aware shore-excursion fit check. It compares explicit physical demands with a traveler’s limits and returns matches, blockers, cautions, unknowns, and operator questions. All fixtures are fictional; this is not medical, accessibility, or booking advice.

## Run
```bash
npm ci
npm run typecheck
npm run test:e2e
npm run build
uv sync --project api --locked
uv run --project api pytest api/tests
uv run --project api uvicorn api.main:app --reload
```

Frontend: Next.js App Router + TypeScript static export. Backend: tested FastAPI source only; not publicly hosted. See `research/notes.md` and `docs/` for source-derived strategy, safety and review decisions.
