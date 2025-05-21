import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header({ showAuthButtons = true }) {
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="logo">AppointmentApp</div>
      {showAuthButtons && (
        <div className="header-buttons">
          <button onClick={() => navigate("/login")}>Login</button>
          <button onClick={() => navigate("/")}>Register</button>
        </div>
      )}
    </header>
  );
}
