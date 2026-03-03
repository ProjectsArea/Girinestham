import React, { useEffect, useState } from "react";
import { fetchAboutData } from "../api/aboutApi";
import Navbar from "../components/Navbar";
import "../css/About.css";

function About() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAboutData().then(setData);
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
    <div className="about-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1 className="about-hero-title">About {data.organizationName}</h1>
          <p className="about-hero-subtitle">Empowering Youth Through Sports & Education</p>
        </div>
      </section>

      {/* Founder Message */}
      <section className="founder-section">
        <div className="container">
          <div className="founder-card">
            <div className="founder-header">
              <div className="founder-icon">👤</div>
              <div>
                <h2 className="founder-name">{data.founderMessage.name}</h2>
                <p className="founder-designation">{data.founderMessage.designation}</p>
              </div>
            </div>
            <div className="founder-message">
              <p>"{data.founderMessage.message}"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Started */}
      <section className="why-started-section">
        <div className="container">
          <div className="content-card">
            <div className="section-icon">💡</div>
            <h2 className="section-heading">Why We Started</h2>
            <p className="section-content">{data.whyStarted}</p>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="objectives-section">
        <div className="container">
          <h2 className="section-title">Our Objectives</h2>
          <div className="objectives-grid">
            {data.objectives.map((obj, i) => (
              <div key={i} className="objective-card">
                <div className="objective-number">{i + 1}</div>
                <p>{obj}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="achievements-section">
        <div className="container">
          <h2 className="section-title">Our Achievements</h2>
          <div className="achievements-grid">
            {data.achievements.map((ach, i) => (
              <div key={i} className="achievement-card">
                <div className="achievement-icon">🏆</div>
                <p>{ach}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Plans */}
      <section className="future-plans-section">
        <div className="container">
          <h2 className="section-title">Future Plans</h2>
          <div className="plans-grid">
            {data.futurePlans.map((plan, i) => (
              <div key={i} className="plan-card">
                <div className="plan-icon">🚀</div>
                <h4>{plan}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Details */}
      <section className="legal-section">
        <div className="container">
          <div className="legal-card">
            <h2 className="section-heading">Legal Details</h2>
            <div className="legal-grid">
              <div className="legal-item">
                <span className="legal-label">Registration No:</span>
                <span className="legal-value">{data.legalDetails.registrationNumber}</span>
              </div>
              <div className="legal-item">
                <span className="legal-label">Registered Under:</span>
                <span className="legal-value">{data.legalDetails.registeredUnder}</span>
              </div>
              <div className="legal-item">
                <span className="legal-label">80G Status:</span>
                <span className="legal-value">{data.legalDetails["80GStatus"] || data.legalDetails.GStatus || "N/A"}</span>
              </div>
              <div className="legal-item">
                <span className="legal-label">PAN:</span>
                <span className="legal-value">{data.legalDetails.panNumber}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
