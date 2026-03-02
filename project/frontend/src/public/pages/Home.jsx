import React, { useEffect, useState, useRef, useCallback } from "react";
import { fetchHomeData } from "../api/homeApi";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../css/Home.css";

function Home() {
  const [data, setData] = useState(null);
  const [activeCard, setActiveCard] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);
  const autoRotateIntervalRef = useRef(null);
  const isInteractingRef = useRef(false);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchHomeData();
      setData(result);
    };

    loadData();
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    if (data && data.activities && !isInteractingRef.current) {
      autoRotateIntervalRef.current = setInterval(() => {
        setActiveCard((prev) => (prev + 1) % data.activities.length);
      }, 4000);
      return () => {
        if (autoRotateIntervalRef.current) {
          clearInterval(autoRotateIntervalRef.current);
        }
      };
    }
  }, [data, activeCard]);

  // Smooth card change handler
  const changeCard = useCallback((direction) => {
    if (isTransitioning || !data || !data.activities) return;
    
    setIsTransitioning(true);
    isInteractingRef.current = true;
    
    // Clear auto-rotate during interaction
    if (autoRotateIntervalRef.current) {
      clearInterval(autoRotateIntervalRef.current);
    }
    
    if (direction === 'next') {
      setActiveCard((prev) => (prev + 1) % data.activities.length);
    } else {
      setActiveCard((prev) => (prev - 1 + data.activities.length) % data.activities.length);
    }
    
    // Reset transition state after animation
    setTimeout(() => {
      setIsTransitioning(false);
      isInteractingRef.current = false;
    }, 600);
  }, [data, isTransitioning]);

  // Touch handlers for swipe gestures
  const minSwipeDistance = 50;
  const maxSwipeTime = 300; // Maximum time for a swipe (ms)
  const touchStartTimeRef = useRef(null);

  const onTouchStart = useCallback((e) => {
    touchStartRef.current = e.targetTouches[0].clientX;
    touchEndRef.current = null;
    touchStartTimeRef.current = Date.now();
    isInteractingRef.current = true;
    
    // Pause auto-rotate
    if (autoRotateIntervalRef.current) {
      clearInterval(autoRotateIntervalRef.current);
    }
  }, []);

  const onTouchMove = useCallback((e) => {
    if (touchStartRef.current === null) return;
    touchEndRef.current = e.targetTouches[0].clientX;
    
    // Prevent scrolling if horizontal swipe
    const deltaX = Math.abs(touchEndRef.current - touchStartRef.current);
    const deltaY = Math.abs(e.targetTouches[0].clientY - (e.targetTouches[0].clientY || 0));
    
    if (deltaX > deltaY && deltaX > 10) {
      e.preventDefault();
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    if (touchStartRef.current === null || touchEndRef.current === null) {
      touchStartRef.current = null;
      touchEndRef.current = null;
      isInteractingRef.current = false;
      return;
    }

    const distance = touchStartRef.current - touchEndRef.current;
    const swipeTime = Date.now() - touchStartTimeRef.current;
    const absDistance = Math.abs(distance);
    
    // Check if it's a valid swipe (enough distance and fast enough)
    const isValidSwipe = absDistance > minSwipeDistance && swipeTime < maxSwipeTime;
    
    if (isValidSwipe) {
      if (distance > 0) {
        // Swipe left - go to next
        changeCard('next');
      } else {
        // Swipe right - go to previous
        changeCard('prev');
      }
    }
    
    // Reset touch state
    touchStartRef.current = null;
    touchEndRef.current = null;
    touchStartTimeRef.current = null;
    
    // Resume auto-rotate after a delay
    setTimeout(() => {
      isInteractingRef.current = false;
    }, 1000);
  }, [changeCard]);

  // Mouse drag support for desktop
  const onMouseDown = useCallback((e) => {
    touchStartRef.current = e.clientX;
    touchEndRef.current = null;
    touchStartTimeRef.current = Date.now();
    isInteractingRef.current = true;
    
    if (autoRotateIntervalRef.current) {
      clearInterval(autoRotateIntervalRef.current);
    }
  }, []);

  const onMouseMove = useCallback((e) => {
    if (touchStartRef.current === null) return;
    touchEndRef.current = e.clientX;
  }, []);

  const onMouseUp = useCallback(() => {
    if (touchStartRef.current === null || touchEndRef.current === null) {
      touchStartRef.current = null;
      touchEndRef.current = null;
      isInteractingRef.current = false;
      return;
    }

    const distance = touchStartRef.current - touchEndRef.current;
    const swipeTime = Date.now() - touchStartTimeRef.current;
    const absDistance = Math.abs(distance);
    
    const isValidSwipe = absDistance > minSwipeDistance && swipeTime < maxSwipeTime;
    
    if (isValidSwipe) {
      if (distance > 0) {
        changeCard('next');
      } else {
        changeCard('prev');
      }
    }
    
    touchStartRef.current = null;
    touchEndRef.current = null;
    touchStartTimeRef.current = null;
    
    setTimeout(() => {
      isInteractingRef.current = false;
    }, 1000);
  }, [changeCard]);

  // Card click handler
  const handleCardClick = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    isInteractingRef.current = true;
    
    if (autoRotateIntervalRef.current) {
      clearInterval(autoRotateIntervalRef.current);
    }
    
    setActiveCard(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
      isInteractingRef.current = false;
    }, 600);
  }, [isTransitioning]);

  // Navigation handlers
  const handlePrev = useCallback(() => {
    changeCard('prev');
  }, [changeCard]);

  const handleNext = useCallback(() => {
    changeCard('next');
  }, [changeCard]);

  // Early return for loading state
  if (!data) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Constants for activities
  const activityIcons = ['🏋️', '👥', '🏆', '📚', '🤝'];
  const activityColors = [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
  ];

  return (
    <div className="home-page">
      <Navbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          {data.logo && (
            <div className="logo-container">
              <img src={data.logo} alt="Foundation Logo" className="logo" />
            </div>
          )}
          <h1 className="hero-title">{data.organizationName}</h1>
          <h2 className="hero-headline">{data.heroMessage.headline}</h2>
          <p className="hero-subtext">{data.heroMessage.subText}</p>
          <div className="hero-buttons">
            <Link to="/about" className="btn btn-primary">Learn More</Link>
            <Link to="/donate" className="btn btn-secondary">Support Us</Link>
          </div>
        </div>
        <div className="hero-decoration">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>
      </section>

      {/* Stats & Vision/Mission Side by Side */}
      <section className="combined-section">
        <div className="container-wide">
          <div className="side-by-side-layout">
            {/* Stats Section */}
            <div className="stats-container">
              <h2 className="section-title-left">Our Impact</h2>
              <div className="stats-grid-compact">
                <div className="stat-card" data-stat="students">
                  <div className="stat-icon">👥</div>
                  <div className="stat-number">{data.stats.students}+</div>
                  <div className="stat-label">Students</div>
                  <div className="stat-shine"></div>
                </div>
                <div className="stat-card" data-stat="tournaments">
                  <div className="stat-icon">🏆</div>
                  <div className="stat-number">{data.stats.tournaments}</div>
                  <div className="stat-label">Tournaments</div>
                  <div className="stat-shine"></div>
                </div>
                <div className="stat-card" data-stat="volunteers">
                  <div className="stat-icon">🤝</div>
                  <div className="stat-number">{data.stats.volunteers}</div>
                  <div className="stat-label">Volunteers</div>
                  <div className="stat-shine"></div>
                </div>
                <div className="stat-card" data-stat="years">
                  <div className="stat-icon">⭐</div>
                  <div className="stat-number">{data.stats.yearsOfService}</div>
                  <div className="stat-label">Years</div>
                  <div className="stat-shine"></div>
                </div>
              </div>
            </div>

            {/* Vision & Mission */}
            <div className="vm-container">
              <div className="vm-card vision-card">
                <div className="vm-icon">🎯</div>
                <h3>Our Vision</h3>
                <p>{data.vision}</p>
                <div className="vm-ripple"></div>
              </div>
              <div className="vm-card mission-card">
                <div className="vm-icon">🚀</div>
                <h3>Our Mission</h3>
                <p>{data.mission}</p>
                <div className="vm-ripple"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do - Carousel with Overlapping Cards */}
      <section className="activities-carousel-section">
        <div className="container-wide">
          <h2 className="section-title-center">What We Do</h2>
          <div className="carousel-container">
            <button className="carousel-nav carousel-prev" onClick={handlePrev} aria-label="Previous">
              ‹
            </button>
            <div 
              className="carousel-wrapper"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
            >
              {data.activities.map((activity, index) => {
                let position = index - activeCard;
                // Normalize position to show 5 cards (-2, -1, 0, 1, 2)
                if (position > data.activities.length / 2) {
                  position -= data.activities.length;
                } else if (position < -data.activities.length / 2) {
                  position += data.activities.length;
                }
                
                const isActive = position === 0;
                const isLeft2 = position === -2;
                const isLeft1 = position === -1;
                const isRight1 = position === 1;
                const isRight2 = position === 2;
                const isVisible = Math.abs(position) <= 2;
                
                return (
                  <div
                    key={index}
                    className={`carousel-card ${isActive ? 'active' : ''} ${isLeft2 ? 'left-2' : ''} ${isLeft1 ? 'left-1' : ''} ${isRight1 ? 'right-1' : ''} ${isRight2 ? 'right-2' : ''}`}
                    style={{
                      '--card-position': Math.abs(position),
                      '--card-color': activityColors[index],
                      zIndex: isActive ? 10 : isVisible ? 8 - Math.abs(position) : 0,
                      opacity: isVisible ? 1 : 0,
                      pointerEvents: isVisible ? 'auto' : 'none'
                    }}
                    onClick={() => handleCardClick(index)}
                  >
                    <div className="carousel-card-content">
                      <div className="carousel-card-number">{String(index + 1).padStart(2, '0')}</div>
                      <div className="carousel-card-icon">{activityIcons[index] || '✨'}</div>
                      <h3>{activity}</h3>
                      {isActive && (
                        <div className="carousel-card-description">
                          <p>Discover how we make a difference through {activity.toLowerCase()} and create lasting impact in our community.</p>
                        </div>
                      )}
                    </div>
                    <div className="carousel-card-glow"></div>
                  </div>
                );
              })}
            </div>
            <button className="carousel-nav carousel-next" onClick={handleNext} aria-label="Next">
              ›
            </button>
          </div>
          <div className="carousel-dots">
            {data.activities.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === activeCard ? 'active' : ''}`}
                onClick={() => handleCardClick(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Preview & Get Involved Side by Side */}
      <section className="combined-section-2">
        <div className="container-wide">
          <div className="side-by-side-layout-2">
            {/* About Preview */}
            <div className="about-preview-container">
              <div className="about-preview-card">
                <div className="about-preview-icon">📖</div>
                <h2>About Us</h2>
                <p>{data.aboutPreview}</p>
                <Link to="/about" className="btn btn-outline">Discover More</Link>
                <div className="about-preview-decoration"></div>
              </div>
            </div>

            {/* Get Involved */}
            <div className="involvement-container">
              <h2 className="section-title-left">Get Involved</h2>
              <div className="involvement-grid-compact">
                <Link to="/about" className="involvement-card">
                  <div className="involvement-icon">📖</div>
                  <h3>About Us</h3>
                  <p>Learn more</p>
                  <div className="involvement-arrow">→</div>
                </Link>
                <Link to="/tournaments" className="involvement-card">
                  <div className="involvement-icon">🏅</div>
                  <h3>Tournaments</h3>
                  <p>View events</p>
                  <div className="involvement-arrow">→</div>
                </Link>
                <Link to="/contact" className="involvement-card">
                  <div className="involvement-icon">📧</div>
                  <h3>Contact</h3>
                  <p>Get in touch</p>
                  <div className="involvement-arrow">→</div>
                </Link>
                <Link to="/donate" className="involvement-card">
                  <div className="involvement-icon">💝</div>
                  <h3>Donate</h3>
                  <p>Support us</p>
                  <div className="involvement-arrow">→</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Social Side by Side */}
      <section className="contact-social-section">
        <div className="container-wide">
          <div className="contact-social-grid">
            <div className="contact-info-card">
              <div className="contact-card-header">
                <div className="contact-header-icon">📞</div>
                <h3>Contact Information</h3>
              </div>
              <div className="contact-details">
                <div className="contact-item">
                  <span className="contact-icon">📍</span>
                  <span>{data.contact.officeAddress}</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <span>{data.contact.phone}</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <span>{data.contact.email}</span>
                </div>
              </div>
            </div>
            <div className="social-links-card">
              <div className="social-card-header">
                <div className="social-header-icon">🌐</div>
                <h3>Follow Us</h3>
              </div>
              <div className="social-links">
                <a href={data.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="social-link">
                  <span className="social-icon">📘</span>
                  <span>Facebook</span>
                  <span className="social-arrow">→</span>
                </a>
                <a href={data.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-link">
                  <span className="social-icon">📷</span>
                  <span>Instagram</span>
                  <span className="social-arrow">→</span>
                </a>
                <a href={data.socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="social-link">
                  <span className="social-icon">📺</span>
                  <span>YouTube</span>
                  <span className="social-arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
