import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/UserLogin.css";

function UserLogin() {
  return (
    <div className="user-login-page">
      <Navbar />
      <main className="user-login-main">
        <div className="user-login-card">
          <h1 className="user-login-title">User login</h1>
          <p className="user-login-msg">This page is under construction.</p>
          <Link to="/" className="user-login-back">← Back to home</Link>
        </div>
      </main>
      <Footer organizationName="Giri Nestham" />
    </div>
  );
}

export default UserLogin;
