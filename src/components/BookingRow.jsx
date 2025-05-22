import React from "react";
import "./BookingRow.css";

export default function BookingRow({ slot, onBook }) {
  const isBooked = slot.is_booked;

  return (
    <tr className="booking-row">
      <td>{slot.provider_name}</td>
      <td>{slot.service_name}</td>
      <td>{new Date(slot.start_time).toLocaleString()}</td>
      <td>{slot.duration_minutes} mins</td>
      <td className="booking-action">
        {isBooked ? (
          <>
            <span className="booked-span">Booked</span> ✅
          </>
        ) : (
          <button onClick={() => onBook(slot.id)} className="book-btn">
            Book
          </button>
        )}
      </td>
    </tr>
  );
}
