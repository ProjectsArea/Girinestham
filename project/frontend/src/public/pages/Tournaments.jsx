import React, { useEffect, useState } from "react";
import { fetchTournaments } from "../api/tournamentApi";
import Navbar from "../components/Navbar";

function Tournaments() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchTournaments().then(setData);
  }, []);

  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <h1>Upcoming Tournaments</h1>

      {data.upcomingTournaments.map((tournament) => (
        <div key={tournament.id}>
          <h3>{tournament.name}</h3>
          <p>Sport: {tournament.sport}</p>
          <p>Date: {tournament.date}</p>
          <p>Location: {tournament.location}</p>
        </div>
      ))}
    </div>
  );
}

export default Tournaments;