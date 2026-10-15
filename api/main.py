from typing import Literal
from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI(title="FitPort API", version="0.1.0")

class Excursion(BaseModel):
    name: str = Field(min_length=1)
    walkingMinutes: int = Field(ge=0)
    standingMinutes: int = Field(ge=0)
    stairs: int = Field(ge=0)
    terrain: Literal["flat", "mixed", "rough"]
    seatsEveryMinutes: int = Field(ge=0)
    pace: Literal["self", "group"]
    escapeRoute: bool
    confidence: Literal["verified", "traveler", "estimate"]

class Traveler(BaseModel):
    walkingLimit: int = Field(ge=0)
    standingLimit: int = Field(ge=0)
    maxStairs: int = Field(ge=0)
    roughTerrain: bool
    needsSeatsEvery: int = Field(ge=0)
    groupPace: bool

class Request(BaseModel):
    excursion: Excursion
    traveler: Traveler

@app.get("/health")
def health(): return {"status": "ok"}

@app.post("/assess")
def assess(body: Request):
    e, t = body.excursion, body.traveler
    blockers=[]; cautions=[]; unknowns=[]
    if e.walkingMinutes > t.walkingLimit: blockers.append("walking_limit")
    if e.standingMinutes > t.standingLimit: blockers.append("standing_limit")
    if e.stairs > t.maxStairs: blockers.append("stairs")
    if e.terrain == "rough" and not t.roughTerrain: blockers.append("terrain")
    if e.seatsEveryMinutes == 0: unknowns.append("seat_spacing")
    elif e.seatsEveryMinutes > t.needsSeatsEvery: cautions.append("seat_spacing")
    if e.pace == "group" and not t.groupPace: cautions.append("pace")
    if not e.escapeRoute: cautions.append("escape_route")
    if e.confidence != "verified": unknowns.append("source_verification")
    score=max(0,100-len(blockers)*28-len(cautions)*12-len(unknowns)*7)
    verdict="DO NOT BOOK" if len(blockers)>=2 or score<45 else "RISKY" if blockers or len(cautions)>=2 or score<75 else "FIT"
    return {"verdict":verdict,"score":score,"blockers":blockers,"cautions":cautions,"unknowns":unknowns}
