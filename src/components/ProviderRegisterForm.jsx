// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./ProviderRegisterForm.css";

// export default function ProviderRegisterForm() {
//   const [formData, setFormData] = useState({
//     first_name: "",
//     last_name: "",
//     email: "",
//     password: "",
//     service_name: "",
//   });

//   const navigate = useNavigate();

//   const handleChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(
//         `${import.meta.env.VITE_API_BASE_URL}/register/provider`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(formData),
//         }
//       );

//       if (!res.ok) throw new Error("Failed to register");

//       navigate("/login");
//     } catch (err) {
//       console.error(err);
//       alert("Registration failed.");
//     }
//   };

//   return (
//     <form className="provider-form" onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="first_name"
//         placeholder="First Name"
//         onChange={handleChange}
//         required
//       />
//       <input
//         type="text"
//         name="last_name"
//         placeholder="Last Name"
//         onChange={handleChange}
//         required
//       />
//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         onChange={handleChange}
//         required
//       />
//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         onChange={handleChange}
//         required
//       />
//       <input
//         type="text"
//         name="service_name"
//         placeholder="Service Name"
//         onChange={handleChange}
//         required
//       />
//       <button type="submit">Register</button>
//     </form>
//   );
// }
