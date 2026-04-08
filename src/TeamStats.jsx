import React from "react";

const TeamStats = ({ matches }) => {
  const gamesPlayed = matches.length;
  const wins = matches.filter((m) => m.goalsFor > m.goalsAgainst).length;
  const draws = matches.filter((m) => m.goalsFor === m.goalsAgainst).length;
  const losses = matches.filter((m) => m.goalsFor < m.goalsAgainst).length;
  const goalsFor = matches.reduce((a, m) => a + m.goalsFor, 0);
  const goalsAgainst = matches.reduce((a, m) => a + m.goalsAgainst, 0);

  return (
    <div style={{ marginBottom: 20 }}>
      <h2>📊 Team Stats</h2>
      <p>Games: {gamesPlayed}</p>
      <p>W/D/L: {wins}/{draws}/{losses}</p>
      <p>Goals: {goalsFor} - {goalsAgainst}</p>
    </div>
  );
};

export default TeamStats;