import React, { useEffect, useState } from "react";

const SHEET_ID = "1JiKZ7wLBEMm6PQNhNgD_uhq9hfj5rJ_o37ZWZ7k9qBw";
const API_KEY = "AIzaSyDuV-_bR7geClLTY4GwnloOMRTXsG_W_ys";

const parseStats = (text) => {
  if (!text) return [];
  return text
    .replace(/\s+/g, " ")
    .split(/,| (?=[A-Za-z]+:)/)
    .map((e) => e.trim())
    .filter((e) => e.includes(":"))
    .map((e) => {
      const [name, count] = e.split(":");
      return { name: name.trim(), count: Number(count) || 0 };
    });
};

const parseNames = (text) => {
  if (!text) return [];
  return text.split(",").map((n) => n.trim()).filter(Boolean);
};

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Matches?key=${API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        const rows = data.values?.slice(1) || [];

        const playerMap = {};
        let totalVotes = 0;

        const ensurePlayer = (name) => {
          if (!name) return;
          if (!playerMap[name]) {
            playerMap[name] = {
              name,
              games: 0,
              starts: 0,
              subs: 0,
              goals: 0,
              assists: 0,
              braces: 0,
              hattricks: 0,
              wins: 0,
              draws: 0,
              losses: 0,
              cleanSheets: 0,
              coachMOTM: 0,
              parentVotes: 0,
            };
          }
        };

        rows.forEach((row) => {
          const goalsFor = Number(row[2] || 0);
          const goalsAgainst = Number(row[3] || 0);

          let result = "draw";
          if (goalsFor > goalsAgainst) result = "win";
          if (goalsFor < goalsAgainst) result = "loss";

          const scorers = parseStats(row[4]);
          const assists = parseStats(row[5]);
          const coach = row[6];
          const parentVotesRaw = row[7];

          const starting = parseNames(row[22]);
          const subs = parseNames(row[23]);

          const allPlayers = [...starting, ...subs];

          // Clean sheets (if 0 conceded)
          if (goalsAgainst === 0) {
            allPlayers.forEach((p) => {
              ensurePlayer(p);
              playerMap[p].cleanSheets += 1;
            });
          }

          // Goals
          scorers.forEach(({ name, count }) => {
            ensurePlayer(name);
            playerMap[name].goals += count;

            if (count === 2) playerMap[name].braces += 1;
            if (count >= 3) playerMap[name].hattricks += 1;
          });

          // Assists
          assists.forEach(({ name, count }) => {
            ensurePlayer(name);
            playerMap[name].assists += count;
          });

          // Coach MOTM
          if (coach) {
            ensurePlayer(coach);
            playerMap[coach].coachMOTM += 1;
          }

          // Parent votes (Tom:3, Jack:1)
          const votes = parseStats(parentVotesRaw);
          votes.forEach(({ name, count }) => {
            ensurePlayer(name);
            playerMap[name].parentVotes += count;
            totalVotes += count;
          });

          // Appearances
          starting.forEach((p) => {
            ensurePlayer(p);
            playerMap[p].games += 1;
            playerMap[p].starts += 1;

            if (result === "win") playerMap[p].wins += 1;
            if (result === "draw") playerMap[p].draws += 1;
            if (result === "loss") playerMap[p].losses += 1;
          });

          subs.forEach((p) => {
            ensurePlayer(p);
            playerMap[p].games += 1;
            playerMap[p].subs += 1;

            if (result === "win") playerMap[p].wins += 1;
            if (result === "draw") playerMap[p].draws += 1;
            if (result === "loss") playerMap[p].losses += 1;
          });
        });

        const list = Object.values(playerMap).map((p) => ({
          ...p,
          contribution: p.goals + p.assists,
          goalsPerGame: p.games ? (p.goals / p.games).toFixed(2) : "0.00",
          assistsPerGame: p.games ? (p.assists / p.games).toFixed(2) : "0.00",
          winRate: p.games ? ((p.wins / p.games) * 100).toFixed(0) : "0",
          votePercent: totalVotes ? ((p.parentVotes / totalVotes) * 100).toFixed(1) : "0",
        }));

        list.sort((a, b) => b.contribution - a.contribution);

        setPlayers(list);
      });
  }, []);

  return (
    <div>
      <h2>🏆 Leaderboard</h2>

      {players.map((p, i) => (
        <div key={i} style={{ borderBottom: "1px solid gray", marginBottom: 10 }}>
          <p><strong>{i + 1}. {p.name}</strong></p>

          <p>Games: {p.games} | Starts: {p.starts} | Subs: {p.subs}</p>

          <p>Goals: {p.goals} | Assists: {p.assists}</p>

          <p>Contribution: {p.contribution}</p>

          <p>Braces: {p.braces} | Hat Tricks: {p.hattricks}</p>

          <p>Clean Sheets: {p.cleanSheets}</p>

          <p>Coach MOTM: {p.coachMOTM}</p>

          <p>Votes: {p.parentVotes} ({p.votePercent}%)</p>

          <p>GPG: {p.goalsPerGame} | APG: {p.assistsPerGame}</p>

          <p>Win Rate: {p.winRate}%</p>
        </div>
      ))}
    </div>
  );
}