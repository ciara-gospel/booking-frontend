import React, { useState } from "react";
import "./SlotForm.css";

export default function SlotForm({ onSlotCreated }) {
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const API_BASE = import.meta.env.VITE_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!startTime || !duration || parseInt(duration, 10) <= 0) {
      setError("Please fill all fields with valid values.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      setError("User not authenticated. Please log in again.");
      return;
    }

    try {
      const isoStartTime = new Date(startTime).toISOString();

      const res = await fetch(`${API_BASE}/api/slots`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          start_time: isoStartTime,
          duration_minutes: parseInt(duration, 10),
        }),
      });

      const data = await res.json();
      console.log("API response:", data);

      if (!res.ok) {
        console.error("Error response status:", res.status);
        console.error("Error response body:", data);
        throw new Error(data.message || "Failed to create slot");
      }

      onSlotCreated(data.slot);
      setStartTime("");
      setDuration("");
      setSuccess("Slot created successfully!");
    } catch (err) {
      console.error("Slot creation error caught:", err);
      setError("Error creating slot: " + err.message);
    }
  };

  return (
    <form className="slot-form" onSubmit={handleSubmit}>
      <h2>Create Time Slot</h2>

      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}

      <label htmlFor="start_time">Start Time</label>
      <input
        type="datetime-local"
        id="start_time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
      />

      <label htmlFor="duration">Duration (minutes)</label>
      <input
        type="number"
        id="duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        min="1"
        required
      />

      <button type="submit">Save</button>
    </form>
  );
}
