import React from "react";
import { Outlet, Link } from "react-router-dom";

function VolunteerLayout() {
  const roleId = localStorage.getItem("role_id");
  const userName = localStorage.getItem("name") || "Volunteer";

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Volunteer Sidebar */}
      <div style={{ 
        width: "250px", 
        backgroundColor: "#2c3e50", 
        color: "white", 
        padding: "20px" 
      }}>
        <h3>Volunteer Panel</h3>
        <p style={{ marginBottom: "30px", fontSize: "14px" }}>
          Welcome, {userName}
        </p>
        
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ marginBottom: "10px" }}>
              <Link 
                to="/volunteer/dashboard" 
                style={{ 
                  color: "white", 
                  textDecoration: "none",
                  padding: "10px",
                  display: "block",
                  borderRadius: "5px",
                  backgroundColor: "#34495e"
                }}
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </nav>

        <div style={{ marginTop: "auto", paddingTop: "30px" }}>
          <button 
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            style={{ 
              backgroundColor: "#e74c3c", 
              color: "white", 
              border: "none", 
              padding: "10px 20px", 
              borderRadius: "5px",
              cursor: "pointer",
              width: "100%"
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, backgroundColor: "#ecf0f1" }}>
        <div style={{ 
          backgroundColor: "white", 
          padding: "20px", 
          borderBottom: "1px solid #bdc3c7" 
        }}>
          <h2>Volunteer Dashboard</h2>
        </div>
        <div style={{ padding: "20px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default VolunteerLayout;
