import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* Public Pages */
import Home from "./public/pages/Home";
import About from "./public/pages/About";
import Tournaments from "./public/pages/Tournaments";
import Contact from "./public/pages/Contact";
import Donate from "./public/pages/Donate";

/* Admin Pages */
import Login from "./admin/pages/Login";
import AdminDashboard from "./admin/pages/AdminDashboard";
import UserRoleManagement from "./admin/pages/UserRoleManagement";
import PageUnderConstruction from "./admin/components/PageUnderConstruction";

function App() {
  return (
    <Router>
      <Routes>

        {/* Admin Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/roles" element={<UserRoleManagement />} />
        <Route path="/admin/users" element={<UserRoleManagement />} />
        
        {/* Admin Routes - Under Construction */}
        <Route path="/admin/:page" element={<PageUnderConstruction />} />
        
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/donate" element={<Donate />} />
      </Routes>
    </Router>
  );
}

export default App;