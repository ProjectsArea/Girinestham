import React from "react";
import AdminLayout from "../components/AdminLayout";

function AdminDashboard() {
  return (
    <AdminLayout activeModule="dashboard">
      <h1>Admin Dashboard</h1>
      <div>
        <h2>Dashboard Overview</h2>
        <p>Select a module from the left menu to manage roles and users.</p>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;
