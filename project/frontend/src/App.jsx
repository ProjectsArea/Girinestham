import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/* Public Pages */
import Home from "./public/pages/Home";
import About from "./public/pages/About";
import Tournaments from "./public/pages/Tournaments";
import Contact from "./public/pages/Contact";
import Donate from "./public/pages/Donate";

/* Admin Pages */
import Login from "./public/pages/Login";

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

        
        {/* Admin Routes */}
        <Route path="/login" element={<Login />} />

      </Routes>
    </Router>
  );
}

export default App;