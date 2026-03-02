import React, { useState, useEffect } from "react";
import { createRole, getRoles, updateRole } from "../api/roleApi";

function RoleManagement() {
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState({ role_name: "", description: "" });
  const [editingRole, setEditingRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const result = await getRoles();
      if (result.success) {
        setRoles(result.roles);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCreateRole = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await createRole(newRole);
      if (result.success) {
        setRoles([...roles, result.role]);
        setNewRole({ role_name: "", description: "" });
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (role) => {
    setLoading(true);
    setError("");

    try {
      const result = await updateRole(role);
      if (result.success) {
        setRoles(roles.map(r => r.id === role.id ? role : r));
        setEditingRole(null);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Role Management</h2>
      
      {error && (
        <div style={{ color: "red", marginBottom: "20px", padding: "10px", backgroundColor: "#ffebee" }}>
          {error}
        </div>
      )}

      {/* Create New Role */}
      <div style={{ marginBottom: "30px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h3>Create New Role</h3>
        <form onSubmit={handleCreateRole}>
          <div style={{ marginBottom: "15px" }}>
            <label>Role Name:</label>
            <input
              type="text"
              value={newRole.role_name}
              onChange={(e) => setNewRole({ ...newRole, role_name: e.target.value })}
              required
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label>Description:</label>
            <textarea
              value={newRole.description}
              onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
              rows="3"
              style={{ width: "100%", padding: "8px", marginTop: "5px" }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "10px 20px",
              backgroundColor: loading ? "#ccc" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "Creating..." : "Create Role"}
          </button>
        </form>
      </div>

      {/* Existing Roles */}
      <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
        <h3>Existing Roles</h3>
        {roles.length === 0 ? (
          <p>No roles found</p>
        ) : (
          <div style={{ display: "grid", gap: "15px" }}>
            {roles.map((role) => (
              <div
                key={role.id}
                style={{
                  padding: "15px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  backgroundColor: "#f9f9f9"
                }}
              >
                {editingRole?.id === role.id ? (
                  <div>
                    <input
                      type="text"
                      value={editingRole.role_name}
                      onChange={(e) => setEditingRole({ ...editingRole, role_name: e.target.value })}
                      style={{ width: "100%", marginBottom: "10px" }}
                    />
                    <textarea
                      value={editingRole.description}
                      onChange={(e) => setEditingRole({ ...editingRole, description: e.target.value })}
                      rows="2"
                      style={{ width: "100%", marginBottom: "10px" }}
                    />
                    <button
                      onClick={() => handleUpdateRole(editingRole)}
                      style={{ padding: "5px 10px", marginRight: "5px" }}
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingRole(null)}
                      style={{ padding: "5px 10px" }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div>
                    <h4>{role.role_name}</h4>
                    {role.description && <p>{role.description}</p>}
                    <button
                      onClick={() => setEditingRole(role)}
                      style={{ padding: "5px 10px", marginTop: "10px" }}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RoleManagement;
