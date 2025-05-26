import React, { useState } from "react";
import "./ProviderTable.css";

export default function ProviderTable({ slots, onUpdate, onDelete }) {
  const [editingSlotId, setEditingSlotId] = useState(null);
  const [editedSlot, setEditedSlot] = useState({});

  const handleEdit = (slot) => {
    setEditingSlotId(slot.id);
    setEditedSlot({
      start_time: slot.start_time.slice(0, 16),
      duration_minutes: slot.duration_minutes,
    });
  };

  const handleSave = (slotId) => {
    if (!editedSlot.start_time || editedSlot.duration_minutes <= 0) {
      alert("Please enter valid slot data.");
      return;
    }

    const slotToSend = {
      ...editedSlot,
      duration_minutes: parseInt(editedSlot.duration_minutes, 10),
      start_time: new Date(editedSlot.start_time).toISOString(),
    };

    onUpdate(slotId, slotToSend);
    setEditingSlotId(null);
  };

  const handleCancel = () => {
    setEditingSlotId(null);
    setEditedSlot({});
  };

  return (
    <table className="provider-slot-table">
      <thead>
        <tr>
          <th>Slot ID</th>
          <th>Start Time</th>
          <th>Duration (min)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {slots.length === 0 ? (
          <tr>
            <td colSpan="4">No slots available</td>
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
                  new Date(slot.start_time).toLocaleString()
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
                  slot.duration_minutes
                )}
              </td>
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
  );
}
