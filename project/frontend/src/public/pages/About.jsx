import React, { useEffect, useState } from "react";
import { fetchAboutData } from "../api/aboutApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  LogoBook,
  LogoMedal,
  LogoTrophy,
  LogoRocket,
  LogoUsers,
} from "../components/CardLogos";
import "../css/About.css";

const HERO_IMAGE = "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1920&q=80";
const FOUNDER_PLACEHOLDER = "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&q=80";
const TEAM_PLACEHOLDER = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&q=80";

const SPORT_IMAGES = {
  Volleyball: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400&q=80",
  Badminton: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&q=80",
  Cricket: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=400&q=80",
  Kabaddi: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=400&q=80",
  Athletics: "https://images.unsplash.com/photo-1461896836934-2e5cb9729f31?w=400&q=80",
  "Fitness Training": "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
};

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
    <div className="about-page page-enter">
      <Navbar />

      {/* Hero */}
      <section className="about-hero hero-with-image section-geom" style={{ backgroundImage: `url(${HERO_IMAGE})` }}>
        <div className="hero-overlay" />
        <div className="hero-overlay-blend" />
        <div className="container about-hero-inner">
          <p className="about-hero-label">About</p>
          <h1 className="about-hero-title">{data.organizationName}</h1>
          <p className="about-hero-subtitle">{data.tagline}</p>
          <div className="about-hero-strip">
            <a href="#story" className="about-strip-item">
              <LogoBook className="strip-icon" aria-hidden />
              <span>Story</span>
            </a>
            <span className="about-strip-dot" aria-hidden="true" />
            <a href="#vision" className="about-strip-item">
              <span>Vision</span>
            </a>
            <span className="about-strip-dot" aria-hidden="true" />
            <a href="#team" className="about-strip-item">
              <LogoUsers className="strip-icon" aria-hidden />
              <span>Team</span>
            </a>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="about-section about-founder">
        <div className="container">
          <div className="about-founder-card card-reveal">
            <div className="about-founder-accent" aria-hidden="true" />
            <div className="about-founder-header">
              <div className="about-founder-photo-wrap">
                <img
                  src={data.founderMessage.photo || FOUNDER_PLACEHOLDER}
                  alt={data.founderMessage.name}
                  className="about-founder-photo"
                  onError={(e) => { e.target.src = FOUNDER_PLACEHOLDER; }}
                />
              </div>
              <div className="about-founder-meta">
                <span className="about-founder-quote" aria-hidden="true">"</span>
                <h2 className="about-founder-name">{data.founderMessage.name}</h2>
                <p className="about-founder-designation">{data.founderMessage.designation}</p>
              </div>
            </div>
            <blockquote className="about-founder-message">"{data.founderMessage.message}"</blockquote>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="story" className="about-section about-story">
        <div className="container">
          <div className="about-story-card card-reveal">
            <LogoBook className="card-logo about-story-logo" />
            <h2 className="about-block-title">{data.organizationStory.heading}</h2>
            <p className="about-story-p">{data.organizationStory.description}</p>
            <p className="about-story-p">{data.organizationStory.background}</p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision" className="about-section about-vision-mission">
        <div className="about-vm-wrap">
          <div className="about-vm-block about-vision card-reveal">
            <span className="about-vm-label">Vision</span>
            <div className="about-vm-accent" aria-hidden="true" />
            <p>{data.vision}</p>
          </div>
          <div className="about-vm-block about-mission card-reveal">
            <span className="about-vm-label">Mission</span>
            <div className="about-vm-accent about-vm-accent-right" aria-hidden="true" />
            <p>{data.mission}</p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="about-section about-values">
        <div className="container">
          <h2 className="about-section-title">Core values</h2>
          <div className="about-values-grid">
            {data.coreValues.map((value, i) => (
              <div key={i} className="about-value-card card-reveal">
                <LogoMedal className="card-logo value-logo" />
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Goals */}
      <section className="about-section about-goals">
        <div className="container">
          <h2 className="about-section-title">Strategic goals</h2>
          <div className="about-goals-grid">
            {data.strategicGoals.map((goal, i) => (
              <div key={i} className="about-goal-card card-reveal">
                <h4>{goal}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sports Focus */}
      <section className="about-section about-sports">
        <div className="container">
          <h2 className="about-section-title">Sports we focus on</h2>
          <div className="about-sports-grid">
            {data.sportsFocusAreas.map((sport, i) => (
              <div key={i} className="about-sport-card card-reveal">
                <div className="about-sport-image-wrap">
                  <img
                    src={SPORT_IMAGES[sport] || SPORT_IMAGES["Athletics"]}
                    alt={sport}
                    className="about-sport-image"
                    onError={(e) => { e.target.src = SPORT_IMAGES["Athletics"]; }}
                  />
                </div>
                <span className="about-sport-name">{sport}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training */}
      <section className="about-section about-training">
        <div className="container">
          <h2 className="about-section-title">Training approach</h2>
          <p className="about-training-philosophy">{data.trainingApproach.philosophy}</p>
          <div className="about-training-grid">
            {data.trainingApproach.methodology.map((method, i) => (
              <div key={i} className="about-training-card card-reveal">
                <LogoBook className="card-logo" />
                <span>{method}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community + Achievements in one row */}
      <section className="about-section about-community-achievements">
        <div className="container about-ca-grid">
          <div className="about-community-wrap card-reveal">
            <h2 className="about-block-title">Community programs</h2>
            <ul className="about-community-list">
              {data.communityPrograms.map((program, i) => (
                <li key={i}>{program}</li>
              ))}
            </ul>
          </div>
          <div className="about-achievements-wrap card-reveal">
            <h2 className="about-block-title">Achievements</h2>
            <ul className="about-achievements-list">
              {data.achievements.map((achievement, i) => (
                <li key={i}>
                  <LogoMedal className="about-achievement-icon" aria-hidden />
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Impact strip */}
      <section className="about-impact-strip">
        <div className="container about-impact-inner">
          <div className="about-stat">
            <LogoTrophy className="about-stat-icon" aria-hidden />
            <span className="about-stat-value">{data.impactStatistics.studentsTrained}+</span>
            <span className="about-stat-label">Students trained</span>
          </div>
          <div className="about-stat">
            <LogoMedal className="about-stat-icon" aria-hidden />
            <span className="about-stat-value">{data.impactStatistics.tournamentsOrganized}</span>
            <span className="about-stat-label">Tournaments</span>
          </div>
          <div className="about-stat">
            <LogoUsers className="about-stat-icon" aria-hidden />
            <span className="about-stat-value">{data.impactStatistics.volunteersActive}</span>
            <span className="about-stat-label">Volunteers</span>
          </div>
          <div className="about-stat">
            <LogoUsers className="about-stat-icon" aria-hidden />
            <span className="about-stat-value">{data.impactStatistics.communitiesReached}</span>
            <span className="about-stat-label">Communities</span>
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="about-section about-team">
        <div className="container">
          <h2 className="about-section-title">Our team</h2>
          <div className="about-team-grid">
            {data.leadership.boardMembers.map((member, i) => (
              <div key={i} className="about-team-card card-reveal">
                <div className="about-team-photo-wrap">
                  <img
                    src={member.photo || TEAM_PLACEHOLDER}
                    alt={member.name}
                    className="about-team-photo"
                    loading="lazy"
                    onError={(e) => { e.target.src = TEAM_PLACEHOLDER; }}
                  />
                </div>
                <h4 className="about-team-name">{member.name}</h4>
                <p className="about-team-role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="about-section about-journey">
        <div className="container">
          <h2 className="about-section-title">Our journey</h2>
          <div className="about-timeline">
            {data.timeline.map((milestone, i) => (
              <div key={i} className="about-timeline-item card-reveal">
                <span className="about-timeline-year">{milestone.year}</span>
                <div className="about-timeline-content">
                  <h4>{milestone.milestone}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future Plans */}
      <section className="about-section about-future">
        <div className="container">
          <h2 className="about-section-title">Future plans</h2>
          <div className="about-future-grid">
            {data.futurePlans.map((plan, i) => (
              <div key={i} className="about-future-card card-reveal">
                <LogoRocket className="card-logo" />
                <h4>{plan}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal */}
      <section className="about-section about-legal">
        <div className="container">
          <div className="about-legal-card card-reveal">
            <h2 className="about-block-title">Legal details</h2>
            <div className="about-legal-grid">
              <div className="about-legal-item">
                <span className="about-legal-label">Registration</span>
                <span className="about-legal-value">{data.legalDetails.registrationNumber}</span>
              </div>
              <div className="about-legal-item">
                <span className="about-legal-label">Registered under</span>
                <span className="about-legal-value">{data.legalDetails.registeredUnder}</span>
              </div>
              <div className="about-legal-item">
                <span className="about-legal-label">Date</span>
                <span className="about-legal-value">{data.legalDetails.registrationDate}</span>
              </div>
              <div className="about-legal-item">
                <span className="about-legal-label">80G</span>
                <span className="about-legal-value">{data.legalDetails.GStatus}</span>
              </div>
              <div className="about-legal-item">
                <span className="about-legal-label">PAN</span>
                <span className="about-legal-value">{data.legalDetails.panNumber}</span>
              </div>
              <div className="about-legal-item">
                <span className="about-legal-label">GST</span>
                <span className="about-legal-value">{data.legalDetails.gstNumber}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer organizationName={data.organizationName} />
    </div>
  );
}

export default About;
