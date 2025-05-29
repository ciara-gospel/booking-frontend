import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProviderRegisterForm.css";

export default function ProviderRegisterForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    service_name: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registerRes = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/auth/register/provider`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      let registerData = await registerRes.json();

      if (!registerRes.ok) {
        throw new Error(registerData.message || "Registration failed");
      }

      navigate("/login");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <form className="provider-form" onSubmit={handleSubmit}>
      <h2>Provider Registration</h2>
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
      <input
        type="text"
        name="service_name"
        placeholder="Service Name"
        onChange={handleChange}
        required
      />
      <button type="submit">Register</button>

      {error && <p className="error-message">{error}</p>}
    </form>
  );
}
