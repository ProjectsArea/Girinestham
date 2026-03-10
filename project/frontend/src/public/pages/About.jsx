import React, { useEffect, useState } from "react";
import { fetchAboutData } from "../api/aboutApi";
import Navbar from "../components/Navbar";

function About() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAboutData().then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <h1>About {data.organizationName}</h1>

      <h2>Founder Message</h2>
      <p><strong>{data.founderMessage.name}</strong></p>
      <p>{data.founderMessage.designation}</p>
      <p>{data.founderMessage.message}</p>

      <h2>Why We Started</h2>
      <p>{data.whyStarted}</p>

      <h2>Objectives</h2>
      <ul>
        {data.objectives.map((obj, i) => (
          <li key={i}>{obj}</li>
        ))}
      </ul>

      <h2>Achievements</h2>
      <ul>
        {data.achievements.map((ach, i) => (
          <li key={i}>{ach}</li>
        ))}
      </ul>

      <h2>Future Plans</h2>
      <ul>
        {data.futurePlans.map((plan, i) => (
          <li key={i}>{plan}</li>
        ))}
      </ul>

      <h2>Legal Details</h2>
      <p>Registration No: {data.legalDetails.registrationNumber}</p>
      <p>Registered Under: {data.legalDetails.registeredUnder}</p>
      <p>80G Status: {data.legalDetails["80GStatus"]}</p>
      <p>PAN: {data.legalDetails.panNumber}</p>
    </div>
  );
}

export default About;