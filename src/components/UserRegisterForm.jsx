import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserRegisterForm.css";

export default function UserRegisterForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/auth/register/user`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      let data = {};
      try {
        data = await res.json();
      } catch (jsonErr) {
        console.error("Erreur JSON :", jsonErr);
      }

      if (!res.ok) {
        throw new Error(data.message || "Inscription échouée");
      }

      navigate("/login");
    } catch (err) {
      console.error("Erreur d’inscription :", err);
      setError(err.message);
    }
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>User Registration</h2>
      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />
      <button type="submit">Register</button>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
}
