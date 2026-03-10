import React, { useEffect, useState } from "react";
import { fetchTournaments } from "../api/tournamentApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  LogoTrophy,
  LogoCalendar,
  LogoActivity,
  LogoList,
  LogoMedal,
  LogoUsers,
  LogoMail,
} from "../components/CardLogos";
import "../css/Tournaments.css";

const HERO_IMAGE = "https://images.unsplash.com/photo-1461896836934-2e5cb9729f31?w=1920&q=80";
const CARD_IMAGES = [
  "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&q=80",
  "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&q=80",
  "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&q=80",
  "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&q=80",
];

function Tournaments() {
  const [data, setData] = useState(null);
  const [hoverCardId, setHoverCardId] = useState(null);

  useEffect(() => {
    fetchTournaments().then(setData);
  }, []);

  if (!data) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDaysUntil = (dateString) => {
    const today = new Date();
    const tournamentDate = new Date(dateString);
    const diffTime = tournamentDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const contactEmail = typeof data.contactSupport?.email === "string"
    ? data.contactSupport.email.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").trim()
    : (data.contactSupport?.email || "");
  const contactPhone = data.contactSupport?.phone || "";

  return (
    <div className="tournaments-page page-enter">
      <Navbar />

      {/* Hero */}
      <section className="tournaments-hero hero-with-image section-geom" style={{ backgroundImage: `url(${HERO_IMAGE})` }}>
        <div className="hero-overlay" />
        <div className="hero-overlay-blend" />
        <div className="container tournaments-hero-inner">
          <p className="tournaments-hero-label">Tournaments</p>
          <h1 className="tournaments-hero-title">{data.pageTitle}</h1>
          <p className="tournaments-hero-subtitle">{data.description}</p>
          <div className="tournaments-hero-strip">
            <a href="#stats" className="tournaments-strip-item">
              <LogoTrophy className="strip-icon" aria-hidden />
              <span>Stats</span>
            </a>
            <span className="tournaments-strip-dot" aria-hidden="true" />
            <a href="#events" className="tournaments-strip-item">
              <LogoCalendar className="strip-icon" aria-hidden />
              <span>Events</span>
            </a>
            <span className="tournaments-strip-dot" aria-hidden="true" />
            <a href="#how" className="tournaments-strip-item">
              <span>How to join</span>
            </a>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section id="stats" className="tournaments-stats-strip">
        <div className="container tournaments-stats-inner">
          <div className="tournaments-stat">
            <LogoTrophy className="tournaments-stat-icon" aria-hidden />
            <span className="tournaments-stat-value">{data.tournamentStats.totalTournaments}</span>
            <span className="tournaments-stat-label">Total</span>
          </div>
          <div className="tournaments-stat">
            <LogoCalendar className="tournaments-stat-icon" aria-hidden />
            <span className="tournaments-stat-value">{data.tournamentStats.upcoming}</span>
            <span className="tournaments-stat-label">Upcoming</span>
          </div>
          <div className="tournaments-stat">
            <LogoMedal className="tournaments-stat-icon" aria-hidden />
            <span className="tournaments-stat-value">{data.tournamentStats.completed}</span>
            <span className="tournaments-stat-label">Completed</span>
          </div>
          <div className="tournaments-stat">
            <LogoUsers className="tournaments-stat-icon" aria-hidden />
            <span className="tournaments-stat-value">{data.tournamentStats.totalParticipants}</span>
            <span className="tournaments-stat-label">Participants</span>
          </div>
          <div className="tournaments-stat">
            <LogoActivity className="tournaments-stat-icon" aria-hidden />
            <span className="tournaments-stat-value">{data.tournamentStats.sportsCovered}</span>
            <span className="tournaments-stat-label">Sports</span>
          </div>
        </div>
      </section>

      {/* Upcoming events */}
      <section id="events" className="tournaments-section tournaments-events">
        <div className="container">
          <h2 className="tournaments-section-title">Upcoming tournaments</h2>
          {data.upcomingTournaments.length === 0 ? (
            <div className="tournaments-empty card-reveal">
              <LogoCalendar className="card-logo tournaments-empty-icon" aria-hidden />
              <h3>No upcoming tournaments</h3>
              <p>Check back soon for new events and competitions.</p>
            </div>
          ) : (
            <div className="tournaments-events-grid">
              {data.upcomingTournaments.map((tournament, index) => {
                const daysUntil = getDaysUntil(tournament.schedule.startDate);
                const isUpcoming = daysUntil > 0;
                const cardImage = CARD_IMAGES[index % CARD_IMAGES.length];
                const showOverlay = hoverCardId === tournament.id;
                return (
                  <div
                    key={tournament.id}
                    className="tournaments-event-card card-reveal"
                    onMouseEnter={() => setHoverCardId(tournament.id)}
                    onMouseLeave={() => setHoverCardId(null)}
                  >
                    <div
                      className="tournaments-event-bg"
                      style={{ backgroundImage: `url(${cardImage})` }}
                    >
                      <div className="tournaments-event-overlay" aria-hidden="true" />
                      <div className="tournaments-event-header">
                        <LogoTrophy className="card-logo tournaments-event-icon" aria-hidden />
                        <span className={`tournaments-event-badge ${isUpcoming ? "upcoming" : "today"}`}>
                          {isUpcoming ? (daysUntil === 1 ? "Tomorrow" : `${daysUntil} days`) : "Today"}
                        </span>
                      </div>
                      <div className="tournaments-event-content">
                        <h3 className="tournaments-event-name">{tournament.name}</h3>
                        <p className="tournaments-event-meta">{tournament.sport} · {formatDate(tournament.schedule.startDate)}</p>
                        <p className="tournaments-event-hint">Hover for options</p>
                      </div>
                      <div className={`tournaments-event-actions ${showOverlay ? "visible" : ""}`}>
                        <button type="button" className="tournaments-btn tournaments-btn-primary">Register</button>
                        <button
                          type="button"
                          className="tournaments-btn tournaments-btn-ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            setHoverCardId(null);
                          }}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* How to participate — timeline */}
      <section id="how" className="tournaments-section tournaments-how">
        <div className="container">
          <h2 className="tournaments-section-title">How to participate</h2>
          <p className="tournaments-section-desc">Follow these steps to join our tournaments.</p>
          <div className="tournaments-steps">
            <div className="tournaments-step card-reveal">
              <span className="tournaments-step-num" aria-hidden="true">1</span>
              <div className="tournaments-step-content">
                <LogoList className="card-logo tournaments-step-icon" />
                <h4>Register</h4>
                <p>Register early to secure your spot.</p>
              </div>
            </div>
            <div className="tournaments-step card-reveal">
              <span className="tournaments-step-num" aria-hidden="true">2</span>
              <div className="tournaments-step-content">
                <LogoMedal className="card-logo tournaments-step-icon" />
                <h4>Prizes & recognition</h4>
                <p>Compete for prizes and certificates.</p>
              </div>
            </div>
            <div className="tournaments-step card-reveal">
              <span className="tournaments-step-num" aria-hidden="true">3</span>
              <div className="tournaments-step-content">
                <LogoUsers className="card-logo tournaments-step-icon" />
                <h4>Participation</h4>
                <p>Open to all age groups and skill levels.</p>
              </div>
            </div>
            <div className="tournaments-step card-reveal">
              <span className="tournaments-step-num" aria-hidden="true">4</span>
              <div className="tournaments-step-content">
                <LogoMail className="card-logo tournaments-step-icon" />
                <h4>Contact</h4>
                <p>Reach out for more information.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rules & Benefits */}
      <section className="tournaments-section tournaments-rules-benefits">
        <div className="container tournaments-rb-grid">
          <div className="tournaments-rules-card card-reveal">
            <div className="tournaments-card-accent" aria-hidden="true" />
            <h2 className="tournaments-block-title">Rules</h2>
            <ul className="tournaments-list">
              {data.rules.map((rule, i) => (
                <li key={i}>{rule}</li>
              ))}
            </ul>
          </div>
          <div className="tournaments-benefits-card card-reveal">
            <div className="tournaments-card-accent" aria-hidden="true" />
            <h2 className="tournaments-block-title">Benefits</h2>
            <ul className="tournaments-list tournaments-list-check">
              {data.benefits.map((benefit, i) => (
                <li key={i}>{benefit}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section className="tournaments-contact-strip">
        <div className="container tournaments-contact-inner">
          <LogoMail className="card-logo tournaments-contact-icon" aria-hidden />
          <div className="tournaments-contact-text">
            <h3>Need help?</h3>
            <p>For tournament-related queries, get in touch.</p>
          </div>
          <div className="tournaments-contact-links">
            <a href={`mailto:${contactEmail}`} className="tournaments-contact-btn">{contactEmail || "Email"}</a>
            <a href={`tel:${contactPhone}`} className="tournaments-contact-btn">{contactPhone || "Phone"}</a>
          </div>
        </div>
      </section>

      <Footer organizationName="Giri Nestham Sports Welfare Foundation" />
    </div>
  );
}

export default Tournaments;
