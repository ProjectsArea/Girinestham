import React from "react";
import AdminLayout from "./AdminLayout";

function PageUnderConstruction() {
  return (
    <AdminLayout activeModule="">
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center"
      }}>
        <div style={{
          fontSize: "4rem",
          marginBottom: "20px",
          color: "#ffc107"
        }}>
          🚧
        </div>
        <h1 style={{ 
          color: "#333", 
          marginBottom: "15px",
          fontSize: "2rem"
        }}>
          Page Under Construction
        </h1>
        <p style={{ 
          color: "#666", 
          fontSize: "1.1rem",
          marginBottom: "30px",
          maxWidth: "500px"
        }}>
          This page is currently being developed. Please check back later or contact the administrator for more information.
        </p>
        <div style={{
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          border: "1px solid #dee2e6"
        }}>
          <p style={{ margin: "0", color: "#6c757d" }}>
            <strong>Available Pages:</strong><br/>
            • Dashboard<br/>
            • User and Role Management
          </p>
        </div>
      </div>
    </AdminLayout>
  );
}

export default PageUnderConstruction;
