import React, { useEffect, useState } from "react";
import ProviderHeader from "../components/ProviderHeader";
import ProviderTable from "../components/ProviderTable";
import "./ProviderSlotListPage.css";

export default function ProviderSlotListPage() {
  const [slots, setSlots] = useState([]);
  const API_BASE = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE}/slots/mine`, { credentials: "include" }) // <-- ✅ route correcte
      .then((res) => res.json())
      .then((data) => setSlots(data))
      .catch((err) => {
        console.error(err);
        alert("Failed to load slots");
      });
  }, []);

  const handleUpdate = async (slotId, editedSlot) => {
    try {
      const res = await fetch(`${API_BASE}/slots/${slotId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(editedSlot),
      });

      if (!res.ok) throw new Error("Failed to update slot");

      const updated = await res.json();
      setSlots((prev) => prev.map((s) => (s.id === slotId ? updated : s)));
    } catch (err) {
      console.error(err);
      alert("Failed to update slot");
    }
  };

  const handleDelete = async (slotId) => {
    if (!window.confirm("Are you sure you want to delete this slot?")) return;

    try {
      const res = await fetch(`${API_BASE}/slots/${slotId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete slot");

      setSlots((prev) => prev.filter((s) => s.id !== slotId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete slot");
    }
  };

  return (
    <div className="slot-list-page">
      <ProviderHeader />
      <h1>Your Created Time Slots</h1>
      <ProviderTable
        slots={slots}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
}
