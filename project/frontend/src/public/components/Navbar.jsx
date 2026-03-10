import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "../css/Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const loginRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (loginRef.current && !loginRef.current.contains(e.target)) {
        setIsLoginOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsLoginOpen(false);
  };

  return (
    <nav className={`navbar navbar-fixed ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-symbol" aria-hidden="true" />
          <span className="logo-text">Giri Nestham</span>
        </Link>

        <button 
          className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-overlay ${isMenuOpen ? 'active' : ''}`} onClick={closeMenu}></div>

        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link 
              to="/" 
              className={`navbar-link ${isActive('/') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/about" 
              className={`navbar-link ${isActive('/about') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <span>About Us</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/tournaments" 
              className={`navbar-link ${isActive('/tournaments') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <span>Tournaments</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/contact" 
              className={`navbar-link ${isActive('/contact') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <span>Contact</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/donate" 
              className={`navbar-link ${isActive('/donate') ? 'active' : ''}`}
              onClick={closeMenu}
            >
              <span>Donate</span>
            </Link>
          </li>
          <li className="navbar-login-item navbar-login-dropdown-wrap" ref={loginRef}>
            <button
              type="button"
              className={`navbar-link navbar-login navbar-login-trigger ${isLoginOpen ? 'open' : ''}`}
              onClick={(e) => { e.stopPropagation(); setIsLoginOpen(!isLoginOpen); }}
              aria-haspopup="true"
              aria-expanded={isLoginOpen}
              aria-label="Select login type"
            >
              <span>Select login type</span>
              <span className="navbar-login-chevron" aria-hidden="true">{isLoginOpen ? '↑' : '↓'}</span>
            </button>
            <div className={`navbar-login-dropdown ${isLoginOpen ? 'open' : ''}`} role="menu">
              <Link
                to="/login"
                className="navbar-login-option"
                onClick={closeMenu}
                role="menuitem"
              >
                <span className="navbar-login-option-arrow" aria-hidden="true">←</span>
                Admin
              </Link>
              <div className="navbar-login-dropdown-sep" aria-hidden="true" />
              <Link
                to="/user-login"
                className="navbar-login-option"
                onClick={closeMenu}
                role="menuitem"
              >
                <span className="navbar-login-option-arrow" aria-hidden="true">←</span>
                User
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;