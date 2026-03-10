import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt_token");
    localStorage.removeItem("csrf_token");
    navigate("/login");
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <div className="admin-header-inner">
          <Link to="/" className="admin-brand">
            <span className="admin-brand-dot" aria-hidden="true" />
            Giri Nestham
          </Link>
          <div className="admin-header-actions">
            <span className="admin-header-link" aria-current="page">Dashboard</span>
            <Link to="/" className="admin-header-link">View site</Link>
            <button type="button" className="admin-header-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="admin-main">
        <section className="admin-welcome card-reveal">
          <div className="admin-welcome-accent" aria-hidden="true" />
          <h1>Admin dashboard</h1>
          <p>Welcome to the admin dashboard. Manage your content and settings from here.</p>
        </section>

        <div className="admin-cards">
          <div className="admin-card card-reveal">
            <p className="admin-card-title">Quick actions</p>
            <p className="admin-card-value">—</p>
            <p className="admin-card-desc">Manage tournaments, donations, and contacts from this area (coming soon).</p>
          </div>
          <div className="admin-card card-reveal">
            <p className="admin-card-title">Overview</p>
            <p className="admin-card-value">—</p>
            <p className="admin-card-desc">Stats and analytics will appear here.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
