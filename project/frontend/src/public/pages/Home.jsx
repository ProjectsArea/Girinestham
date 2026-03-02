import React, { useEffect, useState } from "react";
import { fetchHomeData } from "../api/homeApi";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const result = await fetchHomeData();
      setData(result);
    };

    loadData();
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />

      {/* Logo (Optional if image exists) */}
      {data.logo && (
        <div>
          <img src={data.logo} alt="Foundation Logo" />
        </div>
      )}

      {/* Organization Name */}
      <h1>{data.organizationName}</h1>

      {/* Hero Section */}
      <h2>{data.heroMessage.headline}</h2>
      <p>{data.heroMessage.subText}</p>

      {/* Vision */}
      <h2>Vision</h2>
      <p>{data.vision}</p>

      {/* Mission */}
      <h2>Mission</h2>
      <p>{data.mission}</p>

      {/* About Preview */}
      <h2>About Us</h2>
      <p>{data.aboutPreview}</p>

      <Link to="/about">
        <button>Learn More</button>
      </Link>

      {/* Activities */}
      <h2>What We Do</h2>
      <ul>
        {data.activities.map((activity, index) => (
          <li key={index}>{activity}</li>
        ))}
      </ul>

      {/* Quick Stats */}
      <h2>Our Impact</h2>
      <p>Total Students: {data.stats.students}</p>
      <p>Total Tournaments: {data.stats.tournaments}</p>
      <p>Total Volunteers: {data.stats.volunteers}</p>
      <p>Years of Service: {data.stats.yearsOfService}</p>

      {/* Get Involved */}
      <h2>Get Involved</h2>

      <Link to="/about">
        <button>About Us</button>
      </Link>

      <Link to="/tournaments">
        <button>Upcoming Tournaments</button>
      </Link>

      <Link to="/contact">
        <button>Contact Us</button>
      </Link>

      <Link to="/donate">
        <button>Donate Now</button>
      </Link>

      {/* Contact Info */}
      <h2>Contact Information</h2>
      <p>Address: {data.contact.officeAddress}</p>
      <p>Phone: {data.contact.phone}</p>
      <p>Email: {data.contact.email}</p>

      {/* Social Media Links */}
      <h2>Follow Us</h2>
      <a href={data.socialLinks.facebook}>Facebook</a>
      <br />
      <a href={data.socialLinks.instagram}>Instagram</a>
      <br />
      <a href={data.socialLinks.youtube}>YouTube</a>

    </div>
  );
}

export default Home;