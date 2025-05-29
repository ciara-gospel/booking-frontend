import React, { useState } from "react";
import "./ProviderTable.css";

export default function ProviderTable({ slots, onUpdate, onDelete }) {
  const [editingSlotId, setEditingSlotId] = useState(null);
  const [editedSlot, setEditedSlot] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleEdit = (slot) => {
    const combinedDateTime = `${slot.date}T${slot.start_time.slice(0, 5)}`;
    setEditingSlotId(slot.id);
    setEditedSlot({
      start_time: combinedDateTime,
      duration_minutes: slot.duration_minutes || "",
    });
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleSave = (slotId) => {
    if (!editedSlot.start_time || editedSlot.duration_minutes <= 0) {
      setErrorMessage(
        "⛔ please enter a valid date or duration more than 0."
      );
      setSuccessMessage("");
      return;
    }

    const slotToSend = {
      ...editedSlot,
      duration_minutes: parseInt(editedSlot.duration_minutes, 10),
      start_time: new Date(editedSlot.start_time).toISOString(),
    };

    onUpdate(slotId, slotToSend);
    setEditingSlotId(null);
    setErrorMessage("");
    setSuccessMessage("✅ timeslot updated successfully !");
  };

  const handleCancel = () => {
    setEditingSlotId(null);
    setEditedSlot({});
    setErrorMessage("");
    setSuccessMessage("");
  };

  const formatDateTime = (date, time) => {
    try {
      return new Date(`${date}T${time}`).toLocaleString();
    } catch {
      return "Invalid Date";
    }
  };

  return (
    <>
      <table className="provider-slot-table">
        <thead>
          <tr>
            <th>Slot ID</th>
            <th>Start Time</th>
            <th>Duration (min)</th>
            <th>Published</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {slots.length === 0 ? (
            <tr>
              <td colSpan="5">No slots available</td>
            </tr>
          ) : (
            slots.map((slot) => (
              <tr key={slot.id}>
                <td>{slot.id}</td>
                <td>
                  {editingSlotId === slot.id ? (
                    <input
                      type="datetime-local"
                      value={editedSlot.start_time}
                      onChange={(e) =>
                        setEditedSlot({
                          ...editedSlot,
                          start_time: e.target.value,
                        })
                      }
                    />
                  ) : (
                    formatDateTime(slot.date, slot.start_time)
                  )}
                </td>
                <td>
                  {editingSlotId === slot.id ? (
                    <input
                      type="number"
                      min="1"
                      value={editedSlot.duration_minutes}
                      onChange={(e) =>
                        setEditedSlot({
                          ...editedSlot,
                          duration_minutes: e.target.value,
                        })
                      }
                    />
                  ) : (
                    slot.duration_minutes ?? "-"
                  )}
                </td>
                <td>{slot.published ? "✅ Yes" : "❌ No"}</td>
                <td>
                  {editingSlotId === slot.id ? (
                    <>
                      <button onClick={() => handleSave(slot.id)}>Save</button>
                      <button onClick={handleCancel} className="cancel-btn">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button onClick={() => handleEdit(slot)}>Update</button>
                  )}
                  <button
                    onClick={() => onDelete(slot.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {errorMessage && (
        <div
          className="error-message"
          style={{ color: "red", marginTop: "10px" }}
        >
          {errorMessage}
        </div>
      )}
      {successMessage && (
        <div
          className="success-message"
          style={{ color: "green", marginTop: "10px" }}
        >
          {successMessage}
        </div>
      )}
    </>
  );
}
