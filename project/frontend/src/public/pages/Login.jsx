import React, { useState, useEffect } from "react";
import { getCsrfToken, loginAdmin, logoutAdmin, getRoles } from "../api/authApi";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [roles, setRoles] = useState([]);
  const [rolesLoading, setRolesLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchRoles = async () => {
      setRolesLoading(true);
      try {
        const rolesData = await getRoles();
        setRoles(rolesData);
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      } finally {
        setRolesLoading(false);
      }
    };

    fetchRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const csrfToken = await getCsrfToken();

      const response = await loginAdmin(formData, csrfToken);

      const data = await response.json();

      if (response.ok) {
        const token = data.token;

        if (token) {
          localStorage.setItem("jwt_token", token);
        }

        if (csrfToken) {
          localStorage.setItem("csrf_token", csrfToken);
        }

        setSuccess("Login successful!");
        setFormData({ email: "", password: "", role: "" });
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      setError("Network error. Please try again.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("jwt_token");
      const csrfToken = localStorage.getItem("csrf_token");

      await logoutAdmin(token, csrfToken);

      localStorage.removeItem("jwt_token");
      localStorage.removeItem("csrf_token");

      setSuccess("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const checkTokens = () => {
    const jwt = localStorage.getItem("jwt_token");
    const csrf = localStorage.getItem("csrf_token");

    console.log("JWT Token:", jwt ? "exists" : "not found");
    console.log("CSRF Token:", csrf ? "exists" : "not found");

    return { jwt, csrf };
  };

  return (
    <div>
      <h2>Login</h2>

      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>{success}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Role:</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            disabled={rolesLoading}
          >
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.role_name}>
                {role.role_name}
              </option>
            ))}
          </select>
          {rolesLoading && <small>Loading roles...</small>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={checkTokens}>Check Tokens (Console)</button>
      </div>
    </div>
  );
};

export default Login;