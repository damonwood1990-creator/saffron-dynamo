import React, { useState } from "react";

const AddMatchForm = ({ addMatch }) => {
  const [form, setForm] = useState({
    date: "",
    opponent: "",
    goalsFor: 0,
    goalsAgainst: 0,
    scorers: "",
    assists: "",
    coachMOTM: "",
    parentMOTM: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    addMatch({ ...form, goalsFor: Number(form.goalsFor), goalsAgainst: Number(form.goalsAgainst) });
    setForm({ date: "", opponent: "", goalsFor: 0, goalsAgainst: 0, scorers: "", assists: "", coachMOTM: "", parentMOTM: "" });
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h2>➕ Add Match</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8 }}>
        <input name="date" value={form.date} onChange={handleChange} placeholder="Date (YYYY-MM-DD)" required />
        <input name="opponent" value={form.opponent} onChange={handleChange} placeholder="Opponent" required />
        <input type="number" name="goalsFor" value={form.goalsFor} onChange={handleChange} placeholder="Goals For" required />
        <input type="number" name="goalsAgainst" value={form.goalsAgainst} onChange={handleChange} placeholder="Goals Against" required />
        <input name="scorers" value={form.scorers} onChange={handleChange} placeholder="Scorers e.g. Tom:2 Jack:1" />
        <input name="assists" value={form.assists} onChange={handleChange} placeholder="Assists e.g. Jack:1" />
        <input name="coachMOTM" value={form.coachMOTM} onChange={handleChange} placeholder="Coach MOTM" />
        <input name="parentMOTM" value={form.parentMOTM} onChange={handleChange} placeholder="Parent MOTM" />
        <button type="submit">Add Match</button>
      </form>
    </div>
  );
};

export default AddMatchForm;