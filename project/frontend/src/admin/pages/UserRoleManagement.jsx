import React, { useState, useEffect } from "react";
import { createUser, getUsers, updateUser, deleteUser } from "../api/userApi";
import { createRole, getRoles, updateRole } from "../api/roleApi";
import AdminLayout from "../components/AdminLayout";

function UserRoleManagement() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [newUser, setNewUser] = useState({ email: "", password: "", role_id: "" });
  const [newRole, setNewRole] = useState({ role_name: "", description: "" });
  const [editingUser, setEditingUser] = useState(null);
  const [editingRole, setEditingRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("users");

  useEffect(() => {
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUsers = async () => {
    try {
      const result = await getUsers();
      if (result.success) {
        setUsers(result.users);
      }
    } catch (err) {
      setError(err.message);
    }
  };

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

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await createUser(newUser);
      if (result.success) {
        setUsers([...users, result.user]);
        setNewUser({ email: "", password: "", role_id: "" });
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
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

  const handleUpdateUser = async (user) => {
    setLoading(true);
    setError("");

    try {
      const result = await updateUser(user);
      if (result.success) {
        setUsers(users.map(u => u.id === user.id ? user : u));
        setEditingUser(null);
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

  const handleDeleteUser = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await deleteUser(userId);
      if (result.success) {
        setUsers(users.filter(u => u.id !== userId));
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRoleName = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    return role ? role.role_name : 'No Role';
  };

  return (
    <AdminLayout activeModule="management">
      <h2>User and Role Management</h2>
      
      {error && (
        <div style={{ color: "red", marginBottom: "20px", padding: "10px", backgroundColor: "#ffebee" }}>
          {error}
        </div>
      )}

      {/* Tabs */}
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={() => setActiveTab("users")}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            backgroundColor: activeTab === "users" ? "#007bff" : "#f8f9fa",
            color: activeTab === "users" ? "white" : "#007bff",
            border: "1px solid #007bff",
            borderRadius: "4px 4px 0 0",
            cursor: "pointer"
          }}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab("roles")}
          style={{
            padding: "10px 20px",
            backgroundColor: activeTab === "roles" ? "#007bff" : "#f8f9fa",
            color: activeTab === "roles" ? "white" : "#007bff",
            border: "1px solid #007bff",
            borderRadius: "0 4px 4px 0",
            cursor: "pointer"
          }}
        >
          Roles
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === "users" && (
        <div>
          {/* Create New User */}
          <div style={{ marginBottom: "30px", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h3>Create New User</h3>
            <form onSubmit={handleCreateUser}>
              <div style={{ marginBottom: "15px" }}>
                <label>Email:</label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  required
                  style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label>Password:</label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  required
                  style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                />
              </div>
              <div style={{ marginBottom: "15px" }}>
                <label>Role:</label>
                <select
                  value={newUser.role_id}
                  onChange={(e) => setNewUser({ ...newUser, role_id: e.target.value })}
                  required
                  style={{ width: "100%", padding: "8px", marginTop: "5px" }}
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.role_name}
                    </option>
                  ))}
                </select>
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
                {loading ? "Creating..." : "Create User"}
              </button>
            </form>
          </div>

          {/* Existing Users */}
          <div style={{ padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
            <h3>Existing Users</h3>
            {users.length === 0 ? (
              <p>No users found</p>
            ) : (
              <div style={{ display: "grid", gap: "15px" }}>
                {users.map((user) => (
                  <div
                    key={user.id}
                    style={{
                      padding: "15px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      backgroundColor: "#f9f9f9"
                    }}
                  >
                    {editingUser?.id === user.id ? (
                      <div>
                        <input
                          type="email"
                          value={editingUser.email}
                          onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                          style={{ width: "100%", marginBottom: "10px" }}
                        />
                        <input
                          type="password"
                          placeholder="New password (leave blank to keep current)"
                          onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                          style={{ width: "100%", marginBottom: "10px" }}
                        />
                        <select
                          value={editingUser.role_id}
                          onChange={(e) => setEditingUser({ ...editingUser, role_id: e.target.value })}
                          style={{ width: "100%", marginBottom: "10px" }}
                        >
                          {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                              {role.role_name}
                            </option>
                          ))}
                        </select>
                        <button
                          onClick={() => handleUpdateUser(editingUser)}
                          style={{ padding: "5px 10px", marginRight: "5px" }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingUser(null)}
                          style={{ padding: "5px 10px" }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div>
                        <h4>{user.email}</h4>
                        <p><strong>Role:</strong> {getRoleName(user.role_id)}</p>
                        <div style={{ marginTop: "10px" }}>
                          <button
                            onClick={() => setEditingUser(user)}
                            style={{ padding: "5px 10px", marginRight: "5px" }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            style={{ 
                              padding: "5px 10px", 
                              backgroundColor: "#dc3545",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer"
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "roles" && (
        <div>
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
      )}
    </AdminLayout>
  );
}

export default UserRoleManagement;
