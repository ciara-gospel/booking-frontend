import React, { useEffect, useState } from "react";
import ProviderHeader from "../components/ProviderHeader";
import "./ViewAppointmentsPage.css";

export default function ViewAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetch(`${API_BASE}/provider/appointments`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => {
        console.error(err);
        alert("Failed to load appointments");
      });
  }, []);

  const handleCancel = async (appointmentId) => {
    if (!window.confirm("Cancel this appointment?")) return;

    try {
      const res = await fetch(`${API_BASE}/appointments/${appointmentId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to cancel appointment");

      setAppointments(appointments.filter((a) => a.id !== appointmentId));
    } catch (err) {
      console.error(err);
      alert("Error cancelling appointment");
    }
  };

  return (
    <div className="view-appointments-page">
      <ProviderHeader />
      <h1>Client Appointments</h1>
      <table>
        <thead>
          <tr>
            <th>Client</th>
            <th>Service</th>
            <th>Start Time</th>
            <th>Duration</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 ? (
            <tr>
              <td colSpan="5">No appointments yet</td>
            </tr>
          ) : (
            appointments.map((appt) => (
              <tr key={appt.id}>
                <td>{appt.user_name}</td>
                <td>{appt.service_name}</td>
                <td>{new Date(appt.start_time).toLocaleString()}</td>
                <td>{appt.duration_minutes} mins</td>
                <td>
                  <button
                    onClick={() => handleCancel(appt.id)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
