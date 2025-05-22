// import React, { useState } from "react";
// import ProviderHeader from "../components/ProviderHeader";
// import "./CreateSlotPage.css";

// export default function CreateSlotPage() {
//   const [startTime, setStartTime] = useState("");
//   const [duration, setDuration] = useState("");
//   const API_BASE = import.meta.env.VITE_API_BASE_URL;

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!startTime || !duration) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       const res = await fetch(`${API_BASE}/slots`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include", // si token/cookie utilisé
//         body: JSON.stringify({
//           start_time: startTime,
//           duration_minutes: parseInt(duration),
//         }),
//       });

//       if (!res.ok) throw new Error("Failed to save slot");
//       alert("Slot created successfully!");
//       setStartTime("");
//       setDuration("");
//     } catch (err) {
//       console.error(err);
//       alert("Error saving slot");
//     }
//   };

//   return (
//     <div className="create-slot-page">
//       <ProviderHeader />
//       <main className="slot-form-container">
//         <h1>Create a Time Slot</h1>
//         <form onSubmit={handleSubmit} className="slot-form">
//           <label>Start Time:</label>
//           <input
//             type="datetime-local"
//             value={startTime}
//             onChange={(e) => setStartTime(e.target.value)}
//           />

//           <label>Duration (minutes):</label>
//           <input
//             type="number"
//             value={duration}
//             onChange={(e) => setDuration(e.target.value)}
//             min="1"
//           />

//           <button type="submit">Save</button>
//         </form>
//       </main>
//     </div>
//   );
// }
