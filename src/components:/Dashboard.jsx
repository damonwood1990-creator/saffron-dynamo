import React, { useEffect, useState } from "react";

const SHEET_ID = "REPLACE_ME";
const API_KEY = "REPLACE_ME";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Matches?key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        const rows = data.values?.slice(1) || [];

        let games = rows.length;

        let goalsFor = 0;
        let goalsAgainst = 0;

        let shots = 0;
        let oppShots = 0;

        let corners = 0;
        let oppCorners = 0;

        let passes = 0;
        let oppPasses = 0;

        rows.forEach((row) => {
          goalsFor += Number(row[2] || 0);
          goalsAgainst += Number(row[3] || 0);

          shots += Number(row[11] || 0);
          corners += Number(row[12] || 0);
          passes += Number(row[13] || 0);

          oppShots += Number(row[14] || 0);
          oppCorners += Number(row[15] || 0);
          oppPasses += Number(row[16] || 0);
        });

        const safeDivide = (a, b) => (b ? (a / b).toFixed(2) : 0);

        setStats({
          games,
          goalsFor,
          goalsAgainst,

          shotsPerGame: safeDivide(shots, games),
          oppShotsPerGame: safeDivide(oppShots, games),

          cornersPerGame: safeDivide(corners, games),
          oppCornersPerGame: safeDivide(oppCorners, games),

          passesPerGame: safeDivide(passes, games),
          oppPassesPerGame: safeDivide(oppPasses, games),

          conversionRate: shots ? ((goalsFor / shots) * 100).toFixed(1) : 0,
          concededConversion: oppShots ? ((goalsAgainst / oppShots) * 100).toFixed(1) : 0,
        });
      });
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  return (
    <div>
      <h2>📊 Team Dashboard</h2>

      <h3>⚽ Goals</h3>
      <p>Scored: {stats.goalsFor}</p>
      <p>Conceded: {stats.goalsAgainst}</p>

      <h3>📈 Shooting</h3>
      <p>Shots/Game: {stats.shotsPerGame}</p>
      <p>Opp Shots/Game: {stats.oppShotsPerGame}</p>

      <p>Conversion Rate: {stats.conversionRate}%</p>
      <p>Opp Conversion: {stats.concededConversion}%</p>

      <h3>🚩 Corners</h3>
      <p>For/Game: {stats.cornersPerGame}</p>
      <p>Against/Game: {stats.oppCornersPerGame}</p>

      <h3>🧠 Passing</h3>
      <p>Passes/Game: {stats.passesPerGame}</p>
      <p>Opp Passes/Game: {stats.oppPassesPerGame}</p>
    </div>
  );
}