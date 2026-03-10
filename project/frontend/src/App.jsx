import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* Public Pages */
import Home from "./public/pages/Home";
import About from "./public/pages/About";
import Tournaments from "./public/pages/Tournaments";
import Contact from "./public/pages/Contact";
import Donate from "./public/pages/Donate";

/* Auth / Admin */
import Login from "./public/pages/Login";
import UserLogin from "./public/pages/UserLogin";
import AdminDashboard from "./admin/pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/donate" element={<Donate />} />

        
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

      </Routes>
    </Router>
  );
}

export default App;