import React from "react";

const safeParseList = (text) => {
  if (!text) return [];
  return text
    .replace(/\s+/g, " ")
    .split(/,| (?=[A-Za-z]+:)/)
    .map((entry) => entry.trim())
    .filter((e) => e.includes(":"))
    .map((entry) => {
      const [name, count] = entry.split(":");
      return { name: name.trim(), count: Number(count) || 0 };
    });
};

const Leaderboard = ({ matches }) => {
  const playerMap = {};

  const ensurePlayer = (name) => {
    if (!name) return;
    if (!playerMap[name]) {
      playerMap[name] = { name, goals: 0, assists: 0, coachMOTM: 0, parentMOTM: 0 };
    }
  };

  matches.forEach((m) => {
    safeParseList(m.scorers).forEach(({ name, count }) => {
      ensurePlayer(name);
      playerMap[name].goals += count;
    });
    safeParseList(m.assists).forEach(({ name, count }) => {
      ensurePlayer(name);
      playerMap[name].assists += count;
    });
    if (m.coachMOTM) ensurePlayer(m.coachMOTM) && playerMap[m.coachMOTM].coachMOTM++;
    if (m.parentMOTM) ensurePlayer(m.parentMOTM) && playerMap[m.parentMOTM].parentMOTM++;
  });

  const players = Object.values(playerMap).map((p) => ({
    ...p,
    points: p.goals + p.assists + p.coachMOTM * 3 + p.parentMOTM * 2,
  })).sort((a, b) => b.points - a.points);

  return (
    <div>
      <h2>🏆 Leaderboard</h2>
      {players.map((p, i) => (
        <p key={i}>
          {i + 1}. {p.name} — {p.points} pts (G:{p.goals} A:{p.assists} CMOTM:{p.coachMOTM} PMOTM:{p.parentMOTM})
        </p>
      ))}
    </div>
  );
};

export default Leaderboard;