import React from "react";
import { getAvailableModules } from "../utils/navigation";

function LeftMenu({ activeModule, onModuleClick, onLogout }) {
  const availableModules = getAvailableModules();

  return (
    <div style={{
      width: "250px",
      backgroundColor: "#2c3e50",
      color: "white",
      padding: "20px",
      boxShadow: "2px 0 5px rgba(0,0,0,0.1)"
    }}>
      <h3 style={{ marginBottom: "30px", color: "#ecf0f1" }}>Admin Panel</h3>
      
      {availableModules.map((module) => (
        <div key={module.key} style={{ marginBottom: "10px" }}>
          <button
            onClick={() => onModuleClick(module.key)}
            style={{
              width: "100%",
              padding: "10px",
              backgroundColor: activeModule === module.key ? "#3498db" : "transparent",
              color: "white",
              border: "1px solid #34495e",
              borderRadius: "4px",
              cursor: "pointer",
              textAlign: "left"
            }}
          >
            {module.icon} {module.label}
          </button>
        </div>
      ))}

      <div style={{ marginTop: "30px" }}>
        <button
          onClick={onLogout}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default LeftMenu;
