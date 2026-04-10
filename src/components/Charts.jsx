import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const SHEET_ID = "1JiKZ7wLBEMm6PQNhNgD_uhq9hfj5rJ_o37ZWZ7k9qBw";
const API_KEY = "AIzaSyDuV-_bR7geClLTY4GwnloOMRTXsG_W_ys";

export default function Charts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/Matches?key=${API_KEY}`)
      .then((res) => res.json())
      .then((res) => {
        const rows = res.values?.slice(1) || [];

        const chartData = rows.map((row, i) => ({
          game: i + 1,
          goalsFor: Number(row[2] || 0),
          goalsAgainst: Number(row[3] || 0),
          shots: Number(row[11] || 0),
        }));

        setData(chartData);
      });
  }, []);

  if (!data.length) return <p>Loading charts...</p>;

  return (
    <div style={{ marginTop: 30 }}>
      <h2>📈 Performance Charts</h2>

      {/* Goals Trend */}
      <h3>⚽ Goals Trend</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="game" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="goalsFor" />
          <Line type="monotone" dataKey="goalsAgainst" />
        </LineChart>
      </ResponsiveContainer>

      {/* Shots */}
      <h3>🎯 Shots per Game</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="game" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="shots" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
