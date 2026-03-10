import React, { useEffect, useState } from "react";
import { fetchContactInfo } from "../api/contactApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { LogoMapPin, LogoPhone, LogoMessageCircle, LogoMail, LogoClock } from "../components/CardLogos";
import "../css/Contact.css";

const HERO_IMAGE = "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80";

function Contact() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchContactInfo().then(setData);
  }, []);

  if (!data) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  const formatAddress = (address) => {
    if (typeof address === "object") {
      return `${address.line1}, ${address.line2}, ${address.city}, ${address.state} ${address.postalCode}`;
    }
    return address;
  };

  return (
    <div className="contact-page page-enter">
      <Navbar />

      {/* Hero */}
      <section className="contact-hero hero-with-image section-geom" style={{ backgroundImage: `url(${HERO_IMAGE})` }}>
        <div className="hero-overlay" />
        <div className="hero-overlay-blend" />
        <div className="container contact-hero-inner">
          <p className="contact-hero-label">Contact</p>
          <h1 className="contact-hero-title">Get in touch</h1>
          <p className="contact-hero-subtitle">We’d love to hear from you. Reach out for support, partnerships, or just to say hello.</p>
          <div className="contact-hero-strip">
            <a href={`tel:${data.phone.primary}`} className="contact-strip-item">
              <LogoPhone className="strip-icon" aria-hidden />
              <span>Call</span>
            </a>
            <span className="contact-strip-dot" aria-hidden="true" />
            <a href={`mailto:${data.email.general}`} className="contact-strip-item">
              <LogoMail className="strip-icon" aria-hidden />
              <span>Email</span>
            </a>
            <span className="contact-strip-dot" aria-hidden="true" />
            <a href={data.googleMaps.mapLink} target="_blank" rel="noopener noreferrer" className="contact-strip-item">
              <LogoMapPin className="strip-icon" aria-hidden />
              <span>Visit</span>
            </a>
          </div>
        </div>
      </section>

      {/* Main: Contact info + Form */}
      <section className="contact-main">
        <div className="container contact-main-grid">
          {/* Left: Bento contact blocks */}
          <div className="contact-bento">
            <div className="bento-card bento-address card-reveal">
              <div className="bento-card-inner">
                <LogoMapPin className="card-logo bento-logo" />
                <h3>Visit us</h3>
                <p className="bento-address-text">{formatAddress(data.officeAddress)}</p>
                <a href={data.googleMaps.mapLink} target="_blank" rel="noopener noreferrer" className="bento-cta">
                  Open in Google Maps →
                </a>
              </div>
            </div>
            <div className="bento-row">
              <a href={`tel:${data.phone.primary}`} className="bento-pill card-reveal">
                <LogoPhone className="card-logo pill-icon" />
                <span className="pill-label">Primary</span>
                <span className="pill-value">{data.phone.primary}</span>
              </a>
              <a href={`tel:${data.phone.secondary}`} className="bento-pill card-reveal">
                <LogoPhone className="card-logo pill-icon" />
                <span className="pill-label">Secondary</span>
                <span className="pill-value">{data.phone.secondary}</span>
              </a>
            </div>
            <a href={`https://wa.me/${data.phone.whatsapp.replace(/[^\d]/g, "")}`} className="bento-card bento-whatsapp card-reveal">
              <div className="bento-card-inner">
                <LogoMessageCircle className="card-logo bento-logo" />
                <h3>WhatsApp</h3>
                <span className="pill-value">{data.phone.whatsapp}</span>
              </div>
            </a>
            <div className="bento-row">
              <a href={`mailto:${data.email.general}`} className="bento-pill card-reveal">
                <LogoMail className="card-logo pill-icon" />
                <span className="pill-label">General</span>
                <span className="pill-value">{data.email.general}</span>
              </a>
              <a href={`mailto:${data.email.support}`} className="bento-pill card-reveal">
                <LogoMail className="card-logo pill-icon" />
                <span className="pill-label">Support</span>
                <span className="pill-value">{data.email.support}</span>
              </a>
            </div>
            <div className="bento-card bento-hours card-reveal">
              <div className="bento-card-inner">
                <LogoClock className="card-logo bento-logo" />
                <h3>Office hours</h3>
                <p>{data.officeHours.weekdays}</p>
                <p>{data.officeHours.timing}</p>
                <p className="hours-sunday">{data.officeHours.sunday}</p>
              </div>
            </div>
          </div>

          {/* Right: Message form */}
          <div className="contact-form-wrap card-reveal">
            <div className="contact-form-accent" aria-hidden="true" />
            <h2 className="contact-form-title">Send a message</h2>
            <p className="contact-form-desc">Fill in the form and we’ll get back to you shortly.</p>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-name">Name</label>
                  <input type="text" id="contact-name" name="name" placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label htmlFor="contact-email">Email</label>
                  <input type="email" id="contact-email" name="email" placeholder="you@example.com" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="contact-subject">Subject</label>
                <input type="text" id="contact-subject" name="subject" placeholder="What’s this about?" />
              </div>
              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea id="contact-message" name="message" rows={5} placeholder="Tell us more…" />
              </div>
              <button type="submit" className="submit-btn">Send message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Departments */}
      <section className="contact-departments">
        <div className="container">
          <h2 className="contact-section-title">Department contacts</h2>
          <div className="dept-grid">
            {data.departments.map((dept, i) => (
              <div key={i} className="dept-card card-reveal">
                <h4 className="dept-name">{dept.name}</h4>
                <div className="dept-links">
                  {dept.email && (
                    <a href={`mailto:${dept.email}`} className="dept-link">
                      <LogoMail className="dept-link-icon" aria-hidden />
                      {dept.email}
                    </a>
                  )}
                  {dept.phone && (
                    <a href={`tel:${dept.phone}`} className="dept-link">
                      <LogoPhone className="dept-link-icon" aria-hidden />
                      {dept.phone}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Map CTA strip */}
      <section className="contact-map-strip">
        <div className="container contact-map-strip-inner">
          <LogoMapPin className="card-logo map-strip-icon" aria-hidden />
          <div className="map-strip-text">
            <h3>Find us on the map</h3>
            <p>{formatAddress(data.officeAddress)}</p>
          </div>
          <a href={data.googleMaps.mapLink} target="_blank" rel="noopener noreferrer" className="map-strip-btn">
            Open in Google Maps
          </a>
        </div>
      </section>

      <Footer organizationName="Giri Nestham Sports Welfare Foundation" />
    </div>
  );
}

export default Contact;
