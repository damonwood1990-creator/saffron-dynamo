import React, { useEffect, useState } from "react";

const SHEET_ID = "1JiKZ7wLBEMm6PQNhNgD_uhq9hfj5rJ_o37ZWZ7k9qBw";
const API_KEY = "AIzaSyDuV-_bR7geClLTY4GwnloOMRTXsG_W_ys";

export default function Matches() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Matches?key=${API_KEY}`)
      .then(res => res.json())
      .then(data => {
        if (!data.values) return;
        const rows = data.values.slice(1);
        const parsed = rows.map(row => ({
          date: row[0] || "",
          opponent: row[1] || "",
          goalsFor: Number(row[2] || 0),
          goalsAgainst: Number(row[3] || 0),
        }));
        setMatches(parsed);
      });
  }, []);

  return (
    <div>
      {matches.map((m, i) => (
        <div key={i} style={{ borderBottom: "1px solid gray", marginBottom: 10 }}>
          <p>{m.date} vs {m.opponent}</p>
          <p>{m.goalsFor} - {m.goalsAgainst}</p>
        </div>
      ))}
    </div>
  );
}