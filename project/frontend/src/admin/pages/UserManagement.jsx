import React, { useState, useEffect } from "react";
import { createUser, getUsers, updateUser } from "../api/userApi";
import { getRoles } from "../api/roleApi";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [newUser, setNewUser] = useState({ email: "", password: "", role_id: "" });
  const [editingUser, setEditingUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Management</h2>
      
      {error && (
        <div style={{ color: "red", marginBottom: "20px", padding: "10px", backgroundColor: "#ffebee" }}>
          {error}
        </div>
      )}

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
                    <p><strong>Role:</strong> {user.role_description || user.role_name}</p>
                    <button
                      onClick={() => setEditingUser(user)}
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

export default UserManagement;
