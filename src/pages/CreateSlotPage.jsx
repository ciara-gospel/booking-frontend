import React, { useState } from "react";
import ProviderHeader from "../components/ProviderHeader";
import SlotForm from "../components/SlotForm";
import "./CreateSlotPage.css";

export default function CreateSlotPage() {
  const [createdSlots, setCreatedSlots] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");

  const handleSlotCreated = (result) => {
    if (result?.error) {
      setMessageType("error");
      setMessage(result.error || "Failed to create slot");
    } else {
      setCreatedSlots((prev) => [...prev, result.slot]);
      setMessageType("success");
      setMessage("Slot created successfully!");
    }

    setTimeout(() => {
      setMessage(null);
      setMessageType("");
    }, 4000);
  };

  return (
    <div className="create-slot-page">
      <ProviderHeader />
      <main className="slot-form-container">
        <h1>Create a Time Slot</h1>
        {message && (
          <div className={`feedback-message ${messageType}`}>{message}</div>
        )}

        <SlotForm onSlotCreated={handleSlotCreated} />

        {createdSlots.length > 0 && (
          <div className="created-slots">
            <h2>Slots Created:</h2>
            <ul>
              {createdSlots.map((slot, index) => {
                if (!slot || !slot.start_time || !slot.duration_minutes)
                  return null;
                return (
                  <li key={slot.id || index}>
                    {new Date(slot.start_time).toLocaleString()} -{" "}
                    {slot.duration_minutes} mins
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
