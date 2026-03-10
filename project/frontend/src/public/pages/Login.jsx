import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getCsrfToken, loginAdmin, getRoles } from "../api/authApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../css/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "admin",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [roles, setRoles] = useState([]);
  const [rolesLoading, setRolesLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
        const adminRole = rolesData.find((r) => r.role_name.toLowerCase() === "admin");
        if (adminRole) {
          setFormData((prev) => ({ ...prev, role: adminRole.role_name }));
        }
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
        setFormData({ email: "", password: "", role: formData.role || "admin" });
        
        // Redirect to admin dashboard after successful login
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1000);
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

  return (
    <div className="login-page">
      <Navbar />
      <main className="login-main">
        <div className="login-wrap card-reveal">
          <div className="login-panel">
            <span className="login-panel-badge">Admin</span>
            <h1 className="login-panel-title">Giri Nestham</h1>
            <p className="login-panel-desc">Sign in to manage content, tournaments, and foundation settings.</p>
            <div className="login-panel-dot" aria-hidden="true" />
          </div>

          <div className="login-form-panel">
            <div className="login-form-panel-inner">
              <div className="login-form-header">
                <div>
                  <h2 className="login-form-title">Sign in</h2>
                  <p className="login-form-subtitle">Use your admin credentials to continue.</p>
                </div>
                <Link to="/" className="login-back">← Back to site</Link>
              </div>

              {error && <p className="login-msg error" role="alert">{error}</p>}
              {success && <p className="login-msg success" role="status">{success}</p>}

              <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="login-email">Email</label>
                  <input
                    id="login-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="login-password">Password</label>
                  <div className="login-password-wrap">
                    <input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      required
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      className="login-password-toggle"
                      onClick={() => setShowPassword((p) => !p)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                      ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="login-role">Role</label>
                  <select
                    id="login-role"
                    name="role"
                    value={formData.role}
                    required
                    disabled
                    readOnly
                    aria-readonly="true"
                    className="login-role-readonly"
                  >
                    <option value="">Select a role</option>
                    {roles.map((role) => (
                      <option key={role.id} value={role.role_name}>
                        {role.role_name}
                      </option>
                    ))}
                  </select>
                  {rolesLoading && <span className="login-roles-hint">Loading roles…</span>}
                </div>

                <div className="login-actions">
                  <button type="submit" className="login-btn" disabled={loading}>
                    {loading ? "Signing in…" : "Sign in"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer organizationName="Giri Nestham" />
    </div>
  );
};

export default Login;