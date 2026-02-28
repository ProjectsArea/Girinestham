import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ marginBottom: "20px" }}>
      <Link to="/">Home</Link> |{" "}
      <Link to="/about">About Us</Link> |{" "}
      <Link to="/tournaments">Tournaments</Link> |{" "}
      <Link to="/contact">Contact</Link> |{" "}
      <Link to="/donate">Donate</Link> |{" "}
      <Link to="/login">
        <button style={{ marginLeft: "10px" }}>Login</button>
      </Link>
    </nav>
  );
}

export default Navbar;