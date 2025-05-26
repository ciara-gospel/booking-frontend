import React from "react";
import Header from "../components/Header";
import LoginForm from "../components/LoginForm";
import "./LoginPage.css";

export default function LoginPage({ setAuthenticated, setUserType }) {
  return (
    <div className="login-page">
      <Header />
      <h1>Connect to your account</h1>
      <LoginForm
        setAuthenticated={setAuthenticated}
        setUserType={setUserType}
      />
    </div>
  );
}
