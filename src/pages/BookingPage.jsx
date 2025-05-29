import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import BookingRow from "../components/BookingRow";
import "./BookingPage.css";

export default function BookingPage() {
  const [slots, setSlots] = useState([]);
  const API_BASE = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE}/available-slots`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setSlots(data))
      .catch((err) => {
        console.error(err);
        alert("Failed to load slots");
      });
  }, []);

  const handleBook = async (slotId) => {
    if (!window.confirm("Confirm this booking?")) return;

    try {
      const res = await fetch(`${API_BASE}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ slot_id: slotId }),
      });

      if (!res.ok) throw new Error("Booking failed");

      const updatedSlots = slots.map((slot) =>
        slot.id === slotId ? { ...slot, is_booked: true } : slot
      );
      setSlots(updatedSlots);
      alert("Booking successful!");
    } catch (err) {
      console.error(err);
      alert("Failed to book appointment");
    }
  };

  return (
    <div className="booking-page">
      <UserHeader />
      <main className="booking-container">
        <h1>Book Your Appointment</h1>
        <table>
          <thead>
            <tr>
              <th>Provider</th>
              <th>Service</th>
              <th>Start Time</th>
              <th>Duration</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {slots.length === 0 ? (
              <tr>
                <td colSpan="5">No available slots at the moment</td>
              </tr>
            ) : (
              slots.map((slot) => (
                <BookingRow key={slot.id} slot={slot} onBook={handleBook} />
              ))
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}
