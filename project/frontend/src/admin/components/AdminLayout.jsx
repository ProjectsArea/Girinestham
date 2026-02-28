import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verifyAdminToken } from "../api/adminApi";
import { handleNavigation } from "../utils/navigation";
import LeftMenu from "./LeftMenu";

function AdminLayout({ children, activeModule }) {
  const [adminInfo, setAdminInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const result = await verifyAdminToken();
        if (result.success) {
          setAdminInfo(result.admin);
        } else {
          navigate("/login");
        }
      } catch (error) {
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminInfo");
    navigate("/login");
  };

  const handleModuleClick = (module) => {
    handleNavigation(module, navigate);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <LeftMenu 
        activeModule={activeModule}
        onModuleClick={handleModuleClick}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <div style={{
        flex: 1,
        padding: "30px",
        backgroundColor: "#f8f9fa"
      }}>
        {adminInfo && (
          <div style={{ 
            backgroundColor: "#d4edda", 
            color: "#155724", 
            padding: "10px", 
            borderRadius: "4px", 
            marginBottom: "20px" 
          }}>
            Welcome, {adminInfo.email} ({adminInfo.role})
          </div>
        )}
        
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;
