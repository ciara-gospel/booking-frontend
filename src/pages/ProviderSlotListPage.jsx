import React, { useEffect, useState } from "react";
import ProviderHeader from "../components/ProviderHeader";
import ProviderTable from "../components/ProviderTable";
import "./ProviderSlotListPage.css";

export default function ProviderSlotListPage() {
  const [slots, setSlots] = useState([]);
  const API_BASE = import.meta.env.VITE_BASE_URL;
  const token = localStorage.getItem("token");

  const fetchSlots = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/slots/mine`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch");
      }

      const data = await res.json();
      console.log("✅ Slots fetched from backend:", data.slots);
      setSlots(data.slots);
    } catch (err) {
      console.error("❌ Error while fetching slots:", err);
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleUpdate = async (slotId, editedSlot) => {
    try {
      const res = await fetch(`${API_BASE}/api/slots/${slotId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editedSlot),
      });

      if (!res.ok) throw new Error("Failed to update slot");

      await fetchSlots();
    } catch (err) {
      console.error(err);
      alert("Failed to update slot");
    }
  };

  const handleDelete = async (slotId) => {
    if (!window.confirm("Are you sure you want to delete this slot?")) return;

    try {
      const res = await fetch(`${API_BASE}/api/slots/${slotId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete slot");

      setSlots((prev) => prev.filter((s) => s.id !== slotId));
    } catch (err) {
      console.error(err);
      alert("Failed to delete slot");
    }
  };

  const handlePublishAll = async () => {
    if (!window.confirm("Are you sure you want to publish all your slots?"))
      return;

    try {
      const res = await fetch(`${API_BASE}/api/slots/publish`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to publish slots");

      alert("All slots have been published!");
      await fetchSlots();
    } catch (err) {
      console.error(err);
      alert("Failed to publish slots");
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
      <button onClick={handlePublishAll} className="publish-btn">
        📢 Publish All Slots
      </button>
    </div>
  );
}
