import React, { useState } from "react";
import "./ProviderTable.css";

export default function ProviderTable({ slots, onSlotUpdated }) {
  const [editingSlotId, setEditingSlotId] = useState(null);
  const [editedStartTime, setEditedStartTime] = useState("");
  const [editedDuration, setEditedDuration] = useState("");
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  const handleEdit = (slot) => {
    setEditingSlotId(slot.id);
    setEditedStartTime(slot.start_time.slice(0, 16)); // format for input[type=datetime-local]
    setEditedDuration(slot.duration_minutes);
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`${API_BASE}/slots/${editingSlotId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          start_time: editedStartTime,
          duration_minutes: parseInt(editedDuration),
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      const updatedSlot = await res.json();
      onSlotUpdated(updatedSlot);

      // Reset edit state
      setEditingSlotId(null);
      setEditedStartTime("");
      setEditedDuration("");
    } catch (err) {
      console.error(err);
      alert("Error updating slot");
    }
  };

  return (
    <div className="provider-table">
      <h2>Your Time Slots</h2>
      <table>
        <thead>
          <tr>
            <th>Slot ID</th>
            <th>Start Time</th>
            <th>Duration (min)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot) => (
            <tr key={slot.id}>
              <td>{slot.id}</td>
              <td>
                {editingSlotId === slot.id ? (
                  <input
                    type="datetime-local"
                    value={editedStartTime}
                    onChange={(e) => setEditedStartTime(e.target.value)}
                  />
                ) : (
                  new Date(slot.start_time).toLocaleString()
                )}
              </td>
              <td>
                {editingSlotId === slot.id ? (
                  <input
                    type="number"
                    value={editedDuration}
                    onChange={(e) => setEditedDuration(e.target.value)}
                    min="1"
                  />
                ) : (
                  slot.duration_minutes
                )}
              </td>
              <td>
                {editingSlotId === slot.id ? (
                  <button onClick={handleUpdate}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(slot)}>Update</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
