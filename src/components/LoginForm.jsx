import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

export default function LoginForm({ setAuthenticated, setUserType }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

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
      console.log("Logged in user:", data.user);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const role = data.user.role;
      setAuthenticated(true);
      setUserType(role);

      if (role === "user") {
        navigate("/home/user");
      } else if (role === "provider") {
        navigate("/home/provider");
      } else {
        setErrorMessage("unknow user role.");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("failed to login.");
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
