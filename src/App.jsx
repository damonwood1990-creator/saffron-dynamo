import React, { useState } from "react";
import TeamStats from "./TeamStats";
import Matches from "./Matches";
import Leaderboard from "./Leaderboard";
import AddMatchForm from "./AddMatchForm";

const initialMatches = [
  {
    date: "2026-04-01",
    opponent: "Team A",
    goalsFor: 3,
    goalsAgainst: 1,
    scorers: "Tom:2 Jack:1",
    assists: "Jack:1",
    coachMOTM: "Tom",
    parentMOTM: "Jack",
  },
  {
    date: "2026-04-05",
    opponent: "Team B",
    goalsFor: 2,
    goalsAgainst: 2,
    scorers: "Tom:1",
    assists: "Jack:1",
    coachMOTM: "Jack",
    parentMOTM: "Tom",
  },
];

const App = () => {
  const [matches, setMatches] = useState(initialMatches);

  const addMatch = (newMatch) => {
    setMatches([newMatch, ...matches]);
  };

  return (
    <div style={{ padding: 20, background: "#111", color: "white", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ color: "red" }}>⚽ Saffron Dynamo U13 Wolves</h1>

      <TeamStats matches={matches} />
      <AddMatchForm addMatch={addMatch} />
      <Matches matches={matches} />
      <Leaderboard matches={matches} />
    </div>
  );
};

export default App;