import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import "./BookingPage.css";

export default function BookingPage() {
  const [providers, setProviders] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE}/providers-with-slots`)
      .then((res) => res.json())
      .then((data) => setProviders(data))
      .catch((err) => {
        console.error(err);
        alert("Failed to load providers");
      });
  }, []);

  const handleBook = async (providerId, slotId) => {
    if (bookedSlots.includes(slotId)) return;

    try {
      const res = await fetch(`${API_BASE}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider_id: providerId,
          slot_id: slotId,
        }),
      });

      if (!res.ok) throw new Error("Booking failed");
      setBookedSlots([...bookedSlots, slotId]);
    } catch (err) {
      console.error(err);
      alert("Error booking slot.");
    }
  };

  return (
    <div className="booking-page">
      <UserHeader />
      <h1>Available Providers & Time Slots</h1>

      {providers.map((provider) => (
        <div key={provider.id} className="provider-section">
          <h2>
            {provider.service_name} - {provider.first_name} {provider.last_name}
          </h2>
          <table>
            <thead>
              <tr>
                <th>Slot ID</th>
                <th>Start Time</th>
                <th>Duration (minutes)</th>
                <th>Reserve</th>
              </tr>
            </thead>
            <tbody>
              {provider.slots.map((slot) => (
                <tr key={slot.id}>
                  <td>{slot.id}</td>
                  <td>{slot.start_time}</td>
                  <td>{slot.duration_minutes}</td>
                  <td>
                    {bookedSlots.includes(slot.id) ? (
                      <span className="booked">✅ Booked</span>
                    ) : (
                      <button onClick={() => handleBook(provider.id, slot.id)}>
                        Book
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
