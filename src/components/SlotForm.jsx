import React, { useState } from "react";
import "./SlotForm.css";

export default function SlotForm({ onSlotCreated }) {
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startTime || !duration) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/slots`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          start_time: startTime,
          duration_minutes: parseInt(duration),
        }),
      });

      if (!res.ok) throw new Error("Failed to create slot");

      const data = await res.json();
      onSlotCreated(data); // callback vers CreateSlotPage

      // Reset form
      setStartTime("");
      setDuration("");
    } catch (err) {
      console.error(err);
      alert("Error creating slot");
    }
  };

  return (
    <form className="slot-form" onSubmit={handleSubmit}>
      <h2>Create Time Slot</h2>

      <label htmlFor="start_time">Start Time</label>
      <input
        type="datetime-local"
        id="start_time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />

      <label htmlFor="duration">Duration (minutes)</label>
      <input
        type="number"
        id="duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        min="1"
      />

      <button type="submit">Save</button>
    </form>
  );
}
