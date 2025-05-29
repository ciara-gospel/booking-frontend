import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import du contexte
import "./LoginForm.css";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { setAuthenticated, setUserType } = useAuth(); // Récupération depuis le contexte

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      console.log("Logged in user:", data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      const token = localStorage.getItem("token");
      console.log(token)
      

      const role = data.user.role;
      setAuthenticated(true);
      setUserType(role);

      if (role === "user") {
        navigate("/home/user");
      } else if (role === "provider") {
        navigate("/home/provider");
      } else {
        setErrorMessage("Unknown user role.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to login.");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
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
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button type="submit">Login</button>
    </form>
  );
}
