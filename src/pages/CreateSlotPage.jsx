import React, { useState } from "react";
import ProviderHeader from "../components/ProviderHeader";
import SlotForm from "../components/SlotForm";
import "./CreateSlotPage.css";

export default function CreateSlotPage() {
  const [createdSlots, setCreatedSlots] = useState([]);

  const handleSlotCreated = (newSlot) => {
    alert("Slot created successfully!");
    setCreatedSlots((prev) => [...prev, newSlot]);
  };

  return (
    <div className="create-slot-page">
      <ProviderHeader />
      <main className="slot-form-container">
        <h1>Create a Time Slot</h1>
        <SlotForm onSlotCreated={handleSlotCreated} />

        {createdSlots.length > 0 && (
          <div className="created-slots">
            <h2>Slots Created:</h2>
            <ul>
              {createdSlots.map((slot) => (
                <li key={slot.id}>
                  {new Date(slot.start_time).toLocaleString()} -{" "}
                  {slot.duration_minutes} mins
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
