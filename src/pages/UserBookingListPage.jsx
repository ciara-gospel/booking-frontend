import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import "./UserBookingListPage.css";

export default function UserBookingListPage() {
  const [bookings, setBookings] = useState([]);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE}/my-bookings`, {
      credentials: "include", // si token/cookie est utilisé
    })
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => {
        console.error(err);
        alert("Failed to load bookings");
      });
  }, []);

  return (
    <div className="user-booking-list">
      <UserHeader />
      <h1>Your Appointments</h1>
      <table>
        <thead>
          <tr>
            <th>Provider</th>
            <th>Service</th>
            <th>Date</th>
            <th>Duration (min)</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.provider_name}</td>
              <td>{booking.service_name}</td>
              <td>{new Date(booking.start_time).toLocaleString()}</td>
              <td>{booking.duration_minutes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
