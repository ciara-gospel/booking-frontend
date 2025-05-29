import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import "./UserBookingListPage.css";

export default function UserBookingListPage() {
  const [appointments, setAppointments] = useState([]);
  const API_BASE = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE}/appointment/my`, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load appointments");
        return res.json();
      })
      .then((data) => setAppointments(data))
      .catch((err) => {
        console.error(err);
        alert("Failed to load your appointments");
      });
  }, []);

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      const res = await fetch(`${API_BASE}/appointment/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to cancel appointment");

      setAppointments((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to cancel appointment");
    }
  };

  return (
    <div className="user-booking-list-page">
      <UserHeader />
      <main className="appointment-list-container">
        <h1>Your Appointments</h1>
        <table>
          <thead>
            <tr>
              <th>Provider</th>
              <th>Service</th>
              <th>Start Time</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="6">You haven't booked any appointments yet.</td>
              </tr>
            ) : (
              appointments.map((appt) => (
                <tr key={appt.id}>
                  <td>{appt.provider_name}</td>
                  <td>{appt.service_name}</td>
                  <td>{new Date(appt.start_time).toLocaleString()}</td>
                  <td>{appt.duration_minutes} mins</td>
                  <td>{appt.status || "Booked"}</td>
                  <td>
                    <button onClick={() => handleCancel(appt.id)}>Cancel</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}
