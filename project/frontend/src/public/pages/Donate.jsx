import React, { useEffect, useState } from "react";
import { fetchDonateInfo } from "../api/donateApi";
import Navbar from "../components/Navbar";
import "../css/Donate.css";

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

  return (
    <div className="donate-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="donate-hero">
        <div className="container">
          <h1 className="donate-hero-title">Support Our Mission</h1>
          <p className="donate-hero-subtitle">{data.donationMessage}</p>
          <div className="donate-hero-icon">💝</div>
        </div>
      </section>

      {/* Donation Message */}
      <section className="donation-message-section">
        <div className="container">
          <div className="message-card">
            <h2>Your Contribution Makes a Difference</h2>
            <p>Every donation helps us empower youth through sports and education. Your support enables us to organize tournaments, provide training, and create opportunities for young athletes to excel.</p>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="payment-methods-section">
        <div className="container">
          <h2 className="section-title">Donation Methods</h2>
          
          {/* Bank Details Card */}
          <div className="payment-card bank-card">
            <div className="payment-icon">🏦</div>
            <h3>Bank Transfer</h3>
            <div className="payment-details">
              <div className="detail-item">
                <span className="detail-label">Account Name</span>
                <div className="detail-value-wrapper">
                  <span className="detail-value">{data.bankDetails.accountName}</span>
                  <button 
                    className="copy-btn"
                    onClick={() => copyToClipboard(data.bankDetails.accountName, 'accountName')}
                    title="Copy to clipboard"
                  >
                    {copiedField === 'accountName' ? '✓ Copied' : '📋'}
                  </button>
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Bank Name</span>
                <div className="detail-value-wrapper">
                  <span className="detail-value">{data.bankDetails.bankName}</span>
                  <button 
                    className="copy-btn"
                    onClick={() => copyToClipboard(data.bankDetails.bankName, 'bankName')}
                    title="Copy to clipboard"
                  >
                    {copiedField === 'bankName' ? '✓ Copied' : '📋'}
                  </button>
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-label">Account Number</span>
                <div className="detail-value-wrapper">
                  <span className="detail-value">{data.bankDetails.accountNumber}</span>
                  <button 
                    className="copy-btn"
                    onClick={() => copyToClipboard(data.bankDetails.accountNumber, 'accountNumber')}
                    title="Copy to clipboard"
                  >
                    {copiedField === 'accountNumber' ? '✓ Copied' : '📋'}
                  </button>
                </div>
              </div>
              <div className="detail-item">
                <span className="detail-label">IFSC Code</span>
                <div className="detail-value-wrapper">
                  <span className="detail-value">{data.bankDetails.ifscCode}</span>
                  <button 
                    className="copy-btn"
                    onClick={() => copyToClipboard(data.bankDetails.ifscCode, 'ifscCode')}
                    title="Copy to clipboard"
                  >
                    {copiedField === 'ifscCode' ? '✓ Copied' : '📋'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* UPI Card */}
          <div className="payment-card upi-card">
            <div className="payment-icon">📱</div>
            <h3>UPI Payment</h3>
            <div className="payment-details">
              <div className="detail-item upi-item">
                <span className="detail-label">UPI ID</span>
                <div className="detail-value-wrapper">
                  <span className="detail-value upi-value">{data.upiId}</span>
                  <button 
                    className="copy-btn"
                    onClick={() => copyToClipboard(data.upiId, 'upiId')}
                    title="Copy to clipboard"
                  >
                    {copiedField === 'upiId' ? '✓ Copied' : '📋'}
                  </button>
                </div>
              </div>
            </div>
            <div className="upi-note">
              <p>💡 Scan the QR code or use the UPI ID to make an instant payment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="impact-section">
        <div className="container">
          <h2 className="section-title">How Your Donation Helps</h2>
          <div className="impact-grid">
            <div className="impact-card">
              <div className="impact-icon">🏅</div>
              <h4>Organize Tournaments</h4>
              <p>Support district and state-level competitions</p>
            </div>
            <div className="impact-card">
              <div className="impact-icon">🎓</div>
              <h4>Training Programs</h4>
              <p>Provide professional coaching and mentorship</p>
            </div>
            <div className="impact-card">
              <div className="impact-icon">📚</div>
              <h4>Educational Support</h4>
              <p>Fund scholarships and learning resources</p>
            </div>
            <div className="impact-card">
              <div className="impact-icon">🤝</div>
              <h4>Community Development</h4>
              <p>Build sports infrastructure and facilities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="thank-you-section">
        <div className="container">
          <div className="thank-you-card">
            <div className="thank-you-icon">🙏</div>
            <h2>Thank You for Your Generosity</h2>
            <p>Your support helps us create lasting impact in the lives of young athletes. Together, we're building a brighter future through sports and education.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Donate;
