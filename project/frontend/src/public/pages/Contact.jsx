import React, { useEffect, useState } from "react";
import { fetchContactInfo } from "../api/contactApi";
import Navbar from "../components/Navbar";
import "../css/Contact.css";

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

    return (
        <div className="contact-page">
            <Navbar />
            
            {/* Hero Section */}
            <section className="contact-hero">
                <div className="container">
                    <h1 className="contact-hero-title">Get In Touch</h1>
                    <p className="contact-hero-subtitle">We'd love to hear from you. Reach out to us!</p>
                </div>
            </section>

            {/* Contact Information Cards */}
            <section className="contact-info-section">
                <div className="container">
                    <div className="contact-cards-grid">
                        {/* Address Card */}
                        <div className="contact-card address-card">
                            <div className="contact-card-icon">📍</div>
                            <h3>Our Address</h3>
                            <p>{data.officeAddress}</p>
                        </div>

                        {/* Phone Card */}
                        <div className="contact-card phone-card">
                            <div className="contact-card-icon">📞</div>
                            <h3>Phone</h3>
                            <a href={`tel:${data.phone}`} className="contact-link">{data.phone}</a>
                        </div>

                        {/* Email Card */}
                        <div className="contact-card email-card">
                            <div className="contact-card-icon">✉️</div>
                            <h3>Email</h3>
                            <a href={`mailto:${data.email}`} className="contact-link">{data.email}</a>
                        </div>

                        {/* Office Hours Card */}
                        <div className="contact-card hours-card">
                            <div className="contact-card-icon">🕐</div>
                            <h3>Office Hours</h3>
                            <p>{data.officeHours}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="contact-form-section">
                <div className="container">
                    <div className="form-wrapper">
                        <h2 className="form-title">Send Us a Message</h2>
                        <form className="contact-form">
                            <div className="form-group">
                                <label htmlFor="name">Your Name</label>
                                <input type="text" id="name" name="name" placeholder="Enter your name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Your Email</label>
                                <input type="email" id="email" name="email" placeholder="Enter your email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <input type="text" id="subject" name="subject" placeholder="What's this about?" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea id="message" name="message" rows="5" placeholder="Tell us more..."></textarea>
                            </div>
                            <button type="submit" className="submit-btn">Send Message</button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Map Section Placeholder */}
            <section className="map-section">
                <div className="container">
                    <div className="map-placeholder">
                        <div className="map-icon">🗺️</div>
                        <p>Map Location</p>
                        <span>Interactive map would be displayed here</span>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Contact;
