import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import "./UserBookingListPage.css";

export default function UserBookingListPage() {
  const [appointments, setAppointments] = useState([]);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE}/my-appointments`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => {
        console.error(err);
        alert("Failed to load your appointments");
      });
  }, []);

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
            </tr>
          </thead>
          <tbody>
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="5">You haven't booked any appointments yet.</td>
              </tr>
            ) : (
              appointments.map((appt) => (
                <tr key={appt.id}>
                  <td>{appt.provider_name}</td>
                  <td>{appt.service_name}</td>
                  <td>{new Date(appt.start_time).toLocaleString()}</td>
                  <td>{appt.duration_minutes} mins</td>
                  <td>{appt.status || "Booked"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </main>
    </div>
  );
}
