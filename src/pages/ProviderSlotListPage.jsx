// import React, { useEffect, useState } from "react";
// import ProviderHeader from "../components/ProviderHeader";
// import "./ProviderSlotListPage.css";

// export default function ProviderSlotListPage() {
//   const [slots, setSlots] = useState([]);
//   const [editingSlotId, setEditingSlotId] = useState(null);
//   const [editedSlot, setEditedSlot] = useState({});
//   const API_BASE = import.meta.env.VITE_API_BASE_URL;

//   useEffect(() => {
//     fetch(`${API_BASE}/my-slots`, { credentials: "include" })
//       .then((res) => res.json())
//       .then((data) => setSlots(data))
//       .catch((err) => {
//         console.error(err);
//         alert("Failed to load slots");
//       });
//   }, []);

//   const handleEdit = (slot) => {
//     setEditingSlotId(slot.id);
//     setEditedSlot({
//       start_time: slot.start_time,
//       duration_minutes: slot.duration_minutes,
//     });
//   };

//   const handleSave = async (slotId) => {
//     try {
//       const res = await fetch(`${API_BASE}/slots/${slotId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify(editedSlot),
//       });

//       if (!res.ok) throw new Error("Failed to update slot");

//       const updated = await res.json();
//       setSlots(slots.map((s) => (s.id === slotId ? updated : s)));
//       setEditingSlotId(null);
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update slot");
//     }
//   };

//   const handleDelete = async (slotId) => {
//     if (!window.confirm("Are you sure you want to delete this slot?")) return;

//     try {
//       const res = await fetch(`${API_BASE}/slots/${slotId}`, {
//         method: "DELETE",
//         credentials: "include",
//       });

//       if (!res.ok) throw new Error("Failed to delete slot");

//       setSlots(slots.filter((s) => s.id !== slotId));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete slot");
//     }
//   };

//   return (
//     <div className="slot-list-page">
//       <ProviderHeader />
//       <h1>Your Created Time Slots</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Slot ID</th>
//             <th>Start Time</th>
//             <th>Duration</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {slots.map((slot) => (
//             <tr key={slot.id}>
//               <td>{slot.id}</td>
//               <td>
//                 {editingSlotId === slot.id ? (
//                   <input
//                     type="datetime-local"
//                     value={editedSlot.start_time}
//                     onChange={(e) =>
//                       setEditedSlot({
//                         ...editedSlot,
//                         start_time: e.target.value,
//                       })
//                     }
//                   />
//                 ) : (
//                   new Date(slot.start_time).toLocaleString()
//                 )}
//               </td>
//               <td>
//                 {editingSlotId === slot.id ? (
//                   <input
//                     type="number"
//                     value={editedSlot.duration_minutes}
//                     onChange={(e) =>
//                       setEditedSlot({
//                         ...editedSlot,
//                         duration_minutes: e.target.value,
//                       })
//                     }
//                   />
//                 ) : (
//                   slot.duration_minutes
//                 )}
//               </td>
//               <td>
//                 {editingSlotId === slot.id ? (
//                   <button onClick={() => handleSave(slot.id)}>Save</button>
//                 ) : (
//                   <button onClick={() => handleEdit(slot)}>Update</button>
//                 )}
//                 <button
//                   onClick={() => handleDelete(slot.id)}
//                   className="delete-btn"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
