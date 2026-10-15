export type Terrain = "flat" | "mixed" | "rough";
export type Excursion = {name:string; walkingMinutes:number; standingMinutes:number; stairs:number; terrain:Terrain; seatsEveryMinutes:number; pace:"self"|"group"; escapeRoute:boolean; confidence:"verified"|"traveler"|"estimate"};
export type Traveler = {walkingLimit:number; standingLimit:number; maxStairs:number; roughTerrain:boolean; needsSeatsEvery:number; groupPace:boolean};
export type Assessment = {verdict:"FIT"|"RISKY"|"DO NOT BOOK"; score:number; blockers:string[]; cautions:string[]; matched:string[]; unknowns:string[]; nextQuestions:string[]};
export function assessFit(excursion: Excursion, traveler: Traveler): Assessment {
  for (const [label,value] of [["walkingMinutes",excursion.walkingMinutes],["standingMinutes",excursion.standingMinutes],["stairs",excursion.stairs],["seatsEveryMinutes",excursion.seatsEveryMinutes],["walkingLimit",traveler.walkingLimit],["standingLimit",traveler.standingLimit],["maxStairs",traveler.maxStairs],["needsSeatsEvery",traveler.needsSeatsEvery]] as const) if (!Number.isFinite(value) || value < 0) throw new Error(`${label} must be zero or greater.`);
  const blockers:string[]=[]; const cautions:string[]=[]; const matched:string[]=[]; const unknowns:string[]=[];
  if (excursion.walkingMinutes > traveler.walkingLimit) blockers.push(`Walking is ${excursion.walkingMinutes - traveler.walkingLimit} minutes over the stated limit.`); else matched.push("Walking duration is within the stated limit.");
  if (excursion.standingMinutes > traveler.standingLimit) blockers.push(`Standing is ${excursion.standingMinutes - traveler.standingLimit} minutes over the stated limit.`); else matched.push("Standing duration is within the stated limit.");
  if (excursion.stairs > traveler.maxStairs) blockers.push(`${excursion.stairs} stairs exceed the stated maximum of ${traveler.maxStairs}.`); else matched.push("Stair count is within the stated limit.");
  if (excursion.terrain === "rough" && !traveler.roughTerrain) blockers.push("Rough or uneven terrain conflicts with the traveler profile.");
  if (excursion.seatsEveryMinutes === 0) unknowns.push("Rest-seat spacing is unknown."); else if (excursion.seatsEveryMinutes > traveler.needsSeatsEvery) cautions.push(`Seats may be ${excursion.seatsEveryMinutes} minutes apart.`); else matched.push("Reported rest spacing fits the traveler profile.");
  if (excursion.pace === "group" && !traveler.groupPace) cautions.push("Fixed group pace may prevent self-paced breaks.");
  if (!excursion.escapeRoute) cautions.push("No confirmed early-return or escape route.");
  if (excursion.confidence !== "verified") unknowns.push(`Core demands are based on a ${excursion.confidence === "traveler" ? "dated traveler report" : "staff estimate"}, not operator verification.`);
  const score=Math.max(0,100-blockers.length*28-cautions.length*12-unknowns.length*7);
  return {verdict:blockers.length>=2||score<45?"DO NOT BOOK":blockers.length||cautions.length>=2||score<75?"RISKY":"FIT",score,blockers,cautions,matched,unknowns,nextQuestions:["How many minutes of mandatory walking occur from vehicle drop-off to the first seat?","Are stairs avoidable, and is the alternative route available on this departure?","Can a guest leave early without separating from the group in an unfamiliar port?"]};
}
