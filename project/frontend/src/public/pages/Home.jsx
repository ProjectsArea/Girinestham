import React, { useEffect, useState } from "react";
import { fetchHomeData } from "../api/homeApi";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  LogoUsers,
  LogoTrophy,
  LogoHandshake,
  LogoCalendar,
  LogoTarget,
  LogoRocket,
  LogoBook,
  LogoMedal,
  LogoMail,
  LogoHeart,
} from "../components/CardLogos";
import "../css/Home.css";

const HERO_IMAGE = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1920&q=80";
const PROGRAM_IMAGES = [
  "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=600&q=80",
  "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&q=80",
  "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&q=80",
  "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=600&q=80",
];

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchHomeData().then(setData);
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
    <div className="home-page page-enter">
      <Navbar />

      {/* Hero */}
      <section className="home-hero hero-with-image section-geom" style={{ backgroundImage: `url(${HERO_IMAGE})` }}>
        <div className="hero-overlay" />
        <div className="hero-overlay-blend" />
        <div className="container home-hero-inner">
          {data.logo && (
            <div className="home-hero-logo-wrap">
              <img src={data.logo} alt="" className="home-hero-logo" />
            </div>
          )}
          <p className="home-hero-label">Welcome</p>
          <h1 className="home-hero-title">{data.organizationName}</h1>
          <h2 className="home-hero-headline">{data.heroSection.headline}</h2>
          <p className="home-hero-subtext">{data.heroSection.subText}</p>
          <div className="home-hero-strip">
            <a href="#impact" className="home-strip-item">
              <LogoTrophy className="strip-icon" aria-hidden />
              <span>Impact</span>
            </a>
            <span className="home-strip-dot" aria-hidden="true" />
            <a href="#programs" className="home-strip-item">
              <span>Programs</span>
            </a>
            <span className="home-strip-dot" aria-hidden="true" />
            <a href="#involved" className="home-strip-item">
              <LogoRocket className="strip-icon" aria-hidden />
              <span>Get involved</span>
            </a>
          </div>
          <div className="home-hero-btns">
            {data.heroSection.ctaButtons.map((btn, i) => (
              <Link key={i} to={btn.link} className="home-btn home-btn-primary">
                {btn.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Impact — asymmetric bento + typography */}
      <section id="impact" className="home-impact-bento">
        <div className="container home-impact-bento-inner">
          <p className="home-impact-eyebrow">Our impact</p>
          <div className="home-impact-layout">
            <div className="home-impact-hero card-reveal">
              <span className="home-impact-hero-number" aria-hidden="true">{data.impactMetrics.studentsTrained}+</span>
              <div className="home-impact-hero-content">
                <LogoUsers className="home-impact-hero-icon" aria-hidden />
                <span className="home-impact-hero-value">{data.impactMetrics.studentsTrained}+</span>
                <span className="home-impact-hero-label">Students trained</span>
              </div>
            </div>
            <div className="home-impact-strips">
              <div className="home-impact-strip-item card-reveal">
                <span className="home-impact-strip-bar" aria-hidden="true" />
                <span className="home-impact-strip-value">{data.impactMetrics.tournamentsOrganized}</span>
                <span className="home-impact-strip-label">Tournaments</span>
              </div>
              <div className="home-impact-strip-item card-reveal">
                <span className="home-impact-strip-bar" aria-hidden="true" />
                <span className="home-impact-strip-value">{data.impactMetrics.coachesAssociated}</span>
                <span className="home-impact-strip-label">Coaches</span>
              </div>
              <div className="home-impact-strip-item card-reveal">
                <span className="home-impact-strip-bar" aria-hidden="true" />
                <span className="home-impact-strip-value">{data.impactMetrics.yearsOfService}</span>
                <span className="home-impact-strip-label">Years</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="home-section home-vm">
        <div className="container home-vm-grid">
          <div className="home-vm-card card-reveal">
            <div className="home-vm-accent" aria-hidden="true" />
            <LogoTarget className="card-logo home-vm-logo" />
            <h2 className="home-block-title">Our Vision</h2>
            <p>{data.foundationOverview.vision}</p>
          </div>
          <div className="home-vm-card card-reveal">
            <div className="home-vm-accent" aria-hidden="true" />
            <LogoRocket className="card-logo home-vm-logo" />
            <h2 className="home-block-title">Our Mission</h2>
            <p>{data.foundationOverview.mission}</p>
          </div>
        </div>
      </section>

      {/* Core values — pills */}
      <section className="home-section home-values">
        <div className="container">
          <h2 className="home-section-title">Core values</h2>
          <div className="home-values-wrap">
            {data.values.map((value, i) => (
              <div key={i} className="home-value-pill card-reveal">
                <LogoMedal className="card-logo home-value-icon" />
                <span>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sports programs — bento: 1 featured + 3 */}
      <section id="programs" className="home-section home-programs">
        <div className="container">
          <h2 className="home-section-title">Sports programs</h2>
          <div className="home-programs-bento">
            <Link to="/about" className="home-program-featured card-reveal">
              <div
                className="home-program-featured-bg"
                style={{ backgroundImage: `url(${PROGRAM_IMAGES[0]})` }}
              >
                <div className="home-program-featured-overlay" aria-hidden="true" />
                <div className="home-program-featured-content">
                  <LogoTrophy className="card-logo home-program-icon" aria-hidden />
                  <h3>{data.sportsPrograms[0]?.name}</h3>
                  <p>{data.sportsPrograms[0]?.description}</p>
                  <span className="home-program-cta">Learn more →</span>
                </div>
              </div>
            </Link>
            <div className="home-program-list">
              {data.sportsPrograms.slice(1, 4).map((program, i) => (
                <Link key={i} to="/about" className="home-program-card card-reveal">
                  <div
                    className="home-program-card-bg"
                    style={{ backgroundImage: `url(${PROGRAM_IMAGES[(i + 1) % PROGRAM_IMAGES.length]})` }}
                  >
                    <div className="home-program-card-overlay" aria-hidden="true" />
                  </div>
                  <div className="home-program-card-content">
                    <h4>{program.name}</h4>
                    <p>{program.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About + Get involved */}
      <section id="involved" className="home-section home-about-involved">
        <div className="container home-ai-grid">
          <div className="home-about-card card-reveal">
            <div className="home-card-accent" aria-hidden="true" />
            <LogoBook className="card-logo home-about-logo" />
            <h2 className="home-block-title">About us</h2>
            <p className="home-about-desc">{data.foundationOverview.description}</p>
            <div className="home-focus-tags">
              {data.focusAreas.map((area, i) => (
                <span key={i} className="home-focus-tag">{area}</span>
              ))}
            </div>
            <Link to="/about" className="home-btn home-btn-outline">Discover more</Link>
          </div>
          <div className="home-involved-wrap">
            <h2 className="home-section-title">Get involved</h2>
            <div className="home-involved-grid">
              <Link to="/about" className="home-involved-card card-reveal">
                <LogoBook className="card-logo" />
                <h4>About</h4>
                <p>Learn more</p>
                <span className="home-involved-arrow">→</span>
              </Link>
              <Link to="/tournaments" className="home-involved-card card-reveal">
                <LogoTrophy className="card-logo" />
                <h4>Tournaments</h4>
                <p>View events</p>
                <span className="home-involved-arrow">→</span>
              </Link>
              <Link to="/contact" className="home-involved-card card-reveal">
                <LogoMail className="card-logo" />
                <h4>Contact</h4>
                <p>Get in touch</p>
                <span className="home-involved-arrow">→</span>
              </Link>
              <Link to="/donate" className="home-involved-card card-reveal">
                <LogoHeart className="card-logo" />
                <h4>Donate</h4>
                <p>Support us</p>
                <span className="home-involved-arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Athlete development */}
      <section className="home-section home-athlete">
        <div className="container">
          <h2 className="home-section-title">Athlete development</h2>
          <div className="home-athlete-grid">
            {data.athleteDevelopment.programs.map((program, i) => (
              <div key={i} className="home-athlete-card card-reveal">
                <LogoTarget className="card-logo" />
                <span>{program}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community programs */}
      <section className="home-section home-community">
        <div className="container">
          <h2 className="home-section-title">Community programs</h2>
          <div className="home-community-grid">
            {data.communityPrograms.map((program, i) => (
              <div key={i} className="home-community-card card-reveal">
                <LogoUsers className="card-logo" />
                <span>{program}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="home-section home-cta">
        <div className="container">
          <div className="home-cta-card card-reveal">
            <div className="home-cta-accent" aria-hidden="true" />
            <LogoRocket className="card-logo home-cta-logo" aria-hidden />
            <h2 className="home-cta-title">{data.callToAction.title}</h2>
            <p className="home-cta-desc">{data.callToAction.description}</p>
            <div className="home-cta-btns">
              {data.callToAction.buttons.map((btn, i) => (
                <Link key={i} to={btn.link} className="home-btn home-btn-primary">
                  {btn.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer organizationName={data.organizationName} socialLinks={data.socialLinks} />
    </div>
  );
}

export default Home;
