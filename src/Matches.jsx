import React from "react";

const Matches = ({ matches }) => {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2>📅 Matches</h2>
      {matches.map((m, i) => (
        <div key={i} style={{ borderBottom: "1px solid gray", marginBottom: 10, paddingBottom: 5 }}>
          <p>{m.date} vs {m.opponent}</p>
          <p>{m.goalsFor} - {m.goalsAgainst}</p>
          <p>Scorers: {m.scorers}</p>
          <p>Assists: {m.assists}</p>
          <p>Coach MOTM: {m.coachMOTM}, Parent MOTM: {m.parentMOTM}</p>
        </div>
      ))}
    </div>
  );
};

export default Matches;