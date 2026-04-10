import React from "react";
import Dashboard from "./components/Dashboard";
import Charts from "./components/Charts";
import Leaderboard from "./components/Leaderboard";

export default function App() {
  return (
    <div
      style={{
        padding: 20,
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ color: "red", textAlign: "center" }}>
        Saffron Dynamo U13 Wolves
      </h1>

      {/* 📊 TEAM DASHBOARD */}
      <div style={{ marginTop: 30 }}>
        <Dashboard />
      </div>

      {/* 📈 CHARTS */}
      <div style={{ marginTop: 40 }}>
        <Charts />
      </div>

      {/* 🏆 PLAYER LEADERBOARD */}
      <div style={{ marginTop: 40 }}>
        <Leaderboard />
      </div>
    </div>
  );
}