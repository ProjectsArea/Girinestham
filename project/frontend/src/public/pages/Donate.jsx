import React, { useEffect, useState } from "react";
import { fetchDonateInfo } from "../api/donateApi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  LogoHeart,
  LogoMedal,
  LogoBuilding,
  LogoSearch,
  LogoBook,
  LogoUsers,
  LogoMail,
} from "../components/CardLogos";
import "../css/Donate.css";

const HERO_IMAGE = "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&q=80";

function Donate() {
  const [data, setData] = useState(null);
  const [copiedField, setCopiedField] = useState(null);

  useEffect(() => {
    fetchDonateInfo().then(setData);
  }, []);

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (!data) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  const bank = data.paymentMethods.bankTransfer;

  return (
    <div className="donate-page page-enter">
      <Navbar />

      {/* Hero */}
      <section className="donate-hero hero-with-image section-geom" style={{ backgroundImage: `url(${HERO_IMAGE})` }}>
        <div className="hero-overlay" />
        <div className="hero-overlay-blend" />
        <div className="container donate-hero-inner">
          <p className="donate-hero-label">Donate</p>
          <h1 className="donate-hero-title">{data.headline}</h1>
          <p className="donate-hero-subtitle">{data.donationMessage}</p>
          <div className="donate-hero-strip">
            <a href="#programs" className="donate-strip-item">
              <LogoHeart className="strip-icon" aria-hidden />
              <span>Programs</span>
            </a>
            <span className="donate-strip-dot" aria-hidden="true" />
            <a href="#give" className="donate-strip-item">
              <span>Give</span>
            </a>
            <span className="donate-strip-dot" aria-hidden="true" />
            <a href="#impact" className="donate-strip-item">
              <LogoMedal className="strip-icon" aria-hidden />
              <span>Impact</span>
            </a>
          </div>
        </div>
      </section>

      {/* Donation Programs */}
      <section id="programs" className="donate-section donate-programs">
        <div className="container">
          <h2 className="donate-section-title">Ways to give</h2>
          <p className="donate-section-desc">Choose how you’d like to support youth through sports.</p>
          <div className="donate-programs-grid">
            {data.donationPrograms.map((program, i) => (
              <div key={i} className="donate-program-card card-reveal">
                <div className="donate-program-card-inner">
                  <LogoHeart className="card-logo program-logo" />
                  <h3>{program.title}</h3>
                  <p>{program.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suggested amounts + Bank in one block */}
      <section id="give" className="donate-section donate-give">
        <div className="container donate-give-grid">
          <div className="donate-amounts-wrap card-reveal">
            <h2 className="donate-block-title">Suggested amounts</h2>
            <div className="donate-amounts">
              {data.suggestedDonations.map((s, i) => (
                <div key={i} className="donate-amount-card">
                  <span className="donate-amount-value">₹{s.amount}</span>
                  <span className="donate-amount-desc">{s.description}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="donate-bank-wrap card-reveal">
            <div className="donate-bank-accent" aria-hidden="true" />
            <LogoBuilding className="card-logo bank-logo" />
            <h2 className="donate-block-title">Bank transfer</h2>
            <p className="donate-bank-hint">Use the details below for NEFT/IMPS. Copy with one click.</p>
            <div className="donate-bank-details">
              <div className="bank-row">
                <span className="bank-label">Account name</span>
                <div className="bank-value-row">
                  <span className="bank-value">{bank.accountName}</span>
                  <button type="button" className="copy-btn" onClick={() => copyToClipboard(bank.accountName, "accountName")} title="Copy">
                    {copiedField === "accountName" ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
              <div className="bank-row">
                <span className="bank-label">Bank & branch</span>
                <div className="bank-value-row">
                  <span className="bank-value">{bank.bankName}, {bank.branch}</span>
                  <button type="button" className="copy-btn" onClick={() => copyToClipboard(bank.bankName, "bankName")} title="Copy">
                    {copiedField === "bankName" ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
              <div className="bank-row">
                <span className="bank-label">Account number</span>
                <div className="bank-value-row">
                  <span className="bank-value">{bank.accountNumber}</span>
                  <button type="button" className="copy-btn" onClick={() => copyToClipboard(bank.accountNumber, "accountNumber")} title="Copy">
                    {copiedField === "accountNumber" ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
              <div className="bank-row">
                <span className="bank-label">IFSC</span>
                <div className="bank-value-row">
                  <span className="bank-value">{bank.ifscCode}</span>
                  <button type="button" className="copy-btn" onClick={() => copyToClipboard(bank.ifscCode, "ifscCode")} title="Copy">
                    {copiedField === "ifscCode" ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact + Benefits + Transparency */}
      <section id="impact" className="donate-section donate-impact-section">
        <div className="container">
          <h2 className="donate-section-title">How your donation helps</h2>
          <p className="donate-section-desc">{data.impactStatement}</p>
          <div className="donate-impact-grid">
            <div className="donate-impact-card card-reveal">
              <LogoMedal className="card-logo" />
              <h4>Tournaments</h4>
              <p>District and state-level competitions</p>
            </div>
            <div className="donate-impact-card card-reveal">
              <LogoMedal className="card-logo" />
              <h4>Training</h4>
              <p>Coaching and mentorship</p>
            </div>
            <div className="donate-impact-card card-reveal">
              <LogoBook className="card-logo" />
              <h4>Education</h4>
              <p>Scholarships and resources</p>
            </div>
            <div className="donate-impact-card card-reveal">
              <LogoUsers className="card-logo" />
              <h4>Community</h4>
              <p>Infrastructure and facilities</p>
            </div>
          </div>
        </div>
      </section>

      <section className="donate-section donate-extras">
        <div className="container donate-extras-grid">
          <div className="donate-benefits-card card-reveal">
            <h3 className="donate-card-heading">Donor benefits</h3>
            <ul className="donate-benefits-list">
              {data.donorBenefits.map((benefit, i) => (
                <li key={i}>{benefit}</li>
              ))}
            </ul>
          </div>
          <div className="donate-transparency-card card-reveal">
            <LogoSearch className="card-logo transparency-logo" />
            <h3 className="donate-card-heading">Transparency</h3>
            <div className="transparency-block">
              <p><strong>Usage</strong> — {data.transparency.financialUsage}</p>
              <p><strong>Reporting</strong> — {data.transparency.reporting}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Donor wall */}
      <section className="donate-section donate-donors">
        <div className="container">
          <h2 className="donate-section-title">Our donors</h2>
          <div className="donate-donors-grid">
            {data.donorWall.map((donor, i) => (
              <div key={i} className="donate-donor-card card-reveal">
                <LogoHeart className="card-logo donor-logo" />
                <h4>{donor.name}</h4>
                <p>₹{donor.contribution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="donate-section donate-faq">
        <div className="container">
          <h2 className="donate-section-title">FAQ</h2>
          <div className="donate-faq-list">
            {data.faq.map((item, i) => (
              <div key={i} className="donate-faq-item card-reveal">
                <h4 className="donate-faq-q">{item.question}</h4>
                <p className="donate-faq-a">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact support strip */}
      <section className="donate-support-strip">
        <div className="container donate-support-inner">
          <LogoMail className="card-logo support-strip-icon" aria-hidden />
          <div className="support-strip-text">
            <h3>Need help?</h3>
            <p>For donation-related queries, get in touch.</p>
          </div>
          <div className="support-strip-links">
            <a href={`mailto:${data.contactSupport.email}`} className="support-strip-btn">
              {data.contactSupport.email}
            </a>
            <a href={`tel:${data.contactSupport.phone}`} className="support-strip-btn">
              {data.contactSupport.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Thank you */}
      <section className="donate-thankyou">
        <div className="container">
          <div className="donate-thankyou-card card-reveal">
            <LogoHeart className="card-logo thankyou-logo" aria-hidden />
            <h2>Thank you for your generosity</h2>
            <p>Your support helps us create lasting impact for young athletes. Together we’re building a brighter future through sports and education.</p>
          </div>
        </div>
      </section>

      <Footer organizationName="Giri Nestham Sports Welfare Foundation" />
    </div>
  );
}

export default Donate;
