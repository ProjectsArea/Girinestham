import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../api/adminApi";
import "../css/Login.css";

function Login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await adminLogin(credentials);
      
      if (result.success) {
        // Store token in localStorage
        localStorage.setItem("adminToken", result.token);
        localStorage.setItem("adminInfo", JSON.stringify(result.admin));
        
        // Redirect to admin dashboard or home
        navigate("/admin/dashboard");
      } else {
        setError(result.message || "Login failed");
      }
    } catch (err) {
      setError(err.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">🔐</div>
            <h2>Admin Login</h2>
            <p>Welcome back! Please sign in to continue</p>
          </div>
          
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="admin@gmail.com"
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                className="form-input"
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="login-button"
            >
              {loading ? "Logging in..." : "Sign In"}
            </button>
          </form>
          
          <div className="credentials-info">
            <p>Default Credentials</p>
            <p>Email: admin@gmail.com</p>
            <p>Password: admin@123</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
