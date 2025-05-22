import React from "react";
import { Link } from "react-router-dom";
import "./ProviderHeader.css";

export default function ProviderHeader() {
  return (
    <header className="provider-header">
      <div className="logo">AppointmentApp</div>
      <nav className="provider-nav">
        <Link to="/home/provider">Home</Link>
        <Link to="/createslot">Create Slot</Link>
        <Link to="/list">List</Link>
        <Link to="/appointments">View Appointments</Link>
      </nav>
    </header>
  );
}
