/**
 * 🏆 IPL Season Points Table
 *
 * IPL ka season chal raha hai aur tujhe points table banana hai!
 * Tujhe match results ka array milega, aur tujhe har team ke points
 * calculate karke sorted table return karna hai.
 *
 * Match result types:
 *   - "win": Winning team gets 2 points, losing team gets 0
 *   - "tie": Both teams get 1 point each
 *   - "no_result": Both teams get 1 point each (rain/bad light)
 *
 * Each match object: { team1: "CSK", team2: "MI", result: "win", winner: "CSK" }
 *   - For "tie" and "no_result", the winner field is absent or ignored
 *
 * Rules (use for loop with object accumulator):
 *   - Loop through matches array
 *   - Build an object accumulator: { "CSK": { team, played, won, lost, tied, noResult, points }, ... }
 *   - After processing all matches, convert to array and sort:
 *     1. By points DESCENDING
 *     2. If points are equal, by team name ASCENDING (alphabetical)
 *
 * Validation:
 *   - Agar matches array nahi hai ya empty hai, return []
 *
 * @param {Array<{team1: string, team2: string, result: string, winner?: string}>} matches
 * @returns {Array<{team: string, played: number, won: number, lost: number, tied: number, noResult: number, points: number}>}
 *
 * @example
 *   iplPointsTable([
 *     { team1: "CSK", team2: "MI", result: "win", winner: "CSK" },
 *     { team1: "RCB", team2: "CSK", result: "tie" },
 *   ])
 *   // CSK: played=2, won=1, tied=1, points=3
 *   // MI: played=1, won=0, lost=1, points=0
 *   // RCB: played=1, tied=1, points=1
 *   // Sorted: CSK(3), RCB(1), MI(0)
 */
export function iplPointsTable(matches) {
  if (!Array.isArray(matches) || matches.length === 0) return [];

  const table = {};

  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];

    // ensure team objects exist
    if (!table[m.team1]) {
      table[m.team1] = { team: m.team1, played: 0, won: 0, lost: 0, tied: 0, noResult: 0, points: 0 };
    }
    if (!table[m.team2]) {
      table[m.team2] = { team: m.team2, played: 0, won: 0, lost: 0, tied: 0, noResult: 0, points: 0 };
    }

    const t1 = table[m.team1];
    const t2 = table[m.team2];

    // played match
    t1.played++;
    t2.played++;

    if (m.result === "win") {
      if (m.winner === m.team1) {
        t1.won++; t1.points += 2;
        t2.lost++;
      } else {
        t2.won++; t2.points += 2;
        t1.lost++;
      }
    }
    else if (m.result === "tie") {
      t1.tied++; t2.tied++;
      t1.points++; t2.points++;
    }
    else if (m.result === "no_result") {
      t1.noResult++; t2.noResult++;
      t1.points++; t2.points++;
    }
  }

  return Object.values(table).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    return a.team.localeCompare(b.team);
  });
}