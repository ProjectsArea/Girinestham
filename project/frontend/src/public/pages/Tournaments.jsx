import React, { useEffect, useState } from "react";
import { fetchTournaments } from "../api/tournamentApi";
import Navbar from "../components/Navbar";
import "../css/Tournaments.css";

function Tournaments() {
  const [data, setData] = useState(null);

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
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getDaysUntil = (dateString) => {
    const today = new Date();
    const tournamentDate = new Date(dateString);
    const diffTime = tournamentDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getSportIcon = (sport) => {
    const icons = {
      'Volleyball': '🏐',
      'Badminton': '🏸',
      'Basketball': '🏀',
      'Football': '⚽',
      'Cricket': '🏏',
      'Tennis': '🎾',
      'Table Tennis': '🏓',
      'Athletics': '🏃',
      'Swimming': '🏊',
      'Default': '🏆'
    };
    return icons[sport] || icons['Default'];
  };

  return (
    <div className="tournaments-page">
      <Navbar />
      
      {/* Hero Section */}
      <section className="tournaments-hero">
        <div className="container">
          <h1 className="tournaments-hero-title">Upcoming Tournaments</h1>
          <p className="tournaments-hero-subtitle">Join us for exciting sports competitions and showcase your talent</p>
          <div className="tournaments-hero-icon">🏆</div>
        </div>
      </section>

      {/* Tournaments List */}
      <section className="tournaments-section">
        <div className="container">
          {data.upcomingTournaments.length === 0 ? (
            <div className="no-tournaments">
              <div className="no-tournaments-icon">📅</div>
              <h2>No Upcoming Tournaments</h2>
              <p>Check back soon for exciting tournaments and competitions!</p>
            </div>
          ) : (
            <div className="tournaments-grid">
              {data.upcomingTournaments.map((tournament) => {
                const daysUntil = getDaysUntil(tournament.date);
                const isUpcoming = daysUntil > 0;
                
                return (
                  <div key={tournament.id} className="tournament-card">
                    <div className="tournament-header">
                      <div className="tournament-sport-icon">
                        {getSportIcon(tournament.sport)}
                      </div>
                      <div className="tournament-status">
                        {isUpcoming ? (
                          <span className="status-badge upcoming">
                            {daysUntil === 1 ? 'Tomorrow' : `${daysUntil} Days Away`}
                          </span>
                        ) : (
                          <span className="status-badge today">Today</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="tournament-content">
                      <h3 className="tournament-name">{tournament.name}</h3>
                      
                      <div className="tournament-details">
                        <div className="tournament-detail-item">
                          <span className="detail-icon">🏅</span>
                          <div>
                            <span className="detail-label">Sport</span>
                            <span className="detail-value">{tournament.sport}</span>
                          </div>
                        </div>
                        
                        <div className="tournament-detail-item">
                          <span className="detail-icon">📅</span>
                          <div>
                            <span className="detail-label">Date</span>
                            <span className="detail-value">{formatDate(tournament.date)}</span>
                          </div>
                        </div>
                        
                        <div className="tournament-detail-item">
                          <span className="detail-icon">📍</span>
                          <div>
                            <span className="detail-label">Location</span>
                            <span className="detail-value">{tournament.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="tournament-footer">
                      <button className="register-btn">Register Now</button>
                      <button className="details-btn">View Details</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Info Section */}
      <section className="tournaments-info-section">
        <div className="container">
          <div className="info-card">
            <h2>Tournament Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon">📋</div>
                <h4>Registration</h4>
                <p>Register early to secure your spot in the tournament</p>
              </div>
              <div className="info-item">
                <div className="info-icon">🏅</div>
                <h4>Prizes</h4>
                <p>Exciting prizes and recognition for winners</p>
              </div>
              <div className="info-item">
                <div className="info-icon">👥</div>
                <h4>Participation</h4>
                <p>Open to all age groups and skill levels</p>
              </div>
              <div className="info-item">
                <div className="info-icon">📞</div>
                <h4>Contact</h4>
                <p>Reach out for more information about tournaments</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Tournaments;
