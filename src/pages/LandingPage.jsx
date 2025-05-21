import React, { useState } from "react";
import Header from "../components/Header";
import UserRegisterForm from "../components/UserRegisterForm";
import ProviderRegisterForm from "../components/ProviderRegisterForm";
import "./LandingPage.css";

export default function LandingPage() {
  const [selection, setSelection] = useState(null); // 'user' | 'provider'

  return (
    <div className="landing-container">
      <Header />
      <h1>Welcome</h1>
      <p>Are you a user or provider?</p>

      {!selection && (
        <div className="role-buttons">
          <button onClick={() => setSelection("user")}>User</button>
          <button onClick={() => setSelection("provider")}>Provider</button>
        </div>
      )}

      {selection === "user" && <UserRegisterForm />}
      {selection === "provider" && <ProviderRegisterForm />}
    </div>
  );
}
