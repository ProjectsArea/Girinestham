import React from "react";

function TournamentDashboard({ tournaments }) {

  const total = tournaments.length;

  const upcoming = tournaments.filter(
    (t) => t.status_name === "Upcoming"
  ).length;

  const ongoing = tournaments.filter(
    (t) => t.status_name === "Ongoing"
  ).length;

  const completed = tournaments.filter(
    (t) => t.status_name === "Completed"
  ).length;

  const cancelled = tournaments.filter(
    (t) => t.status_name === "Cancelled"
  ).length;

  const totalParticipants = tournaments.reduce((sum, t) => sum + (t.total_registered || 0), 0);
  const maxCapacity = tournaments.reduce((sum, t) => sum + (t.max_students_allowed || 0), 0);
  const utilizationRate = maxCapacity > 0 ? ((totalParticipants / maxCapacity) * 100).toFixed(1) : 0;

  const totalRevenue = tournaments.reduce((sum, t) => {
    const participants = t.total_registered || 0;
    const fee = parseFloat(t.participation_fee) || 0;
    return sum + (participants * fee);
  }, 0);

  const freeTournaments = tournaments.filter(t => !t.participation_fee || t.participation_fee === 0).length;
  const paidTournaments = tournaments.filter(t => t.participation_fee && t.participation_fee > 0).length;

  const today = new Date();
  const thisMonth = tournaments.filter(t => {
    const tournamentDate = new Date(t.tournament_date);
    return tournamentDate.getMonth() === today.getMonth() && 
           tournamentDate.getFullYear() === today.getFullYear();
  }).length;

  const nextMonth = tournaments.filter(t => {
    const tournamentDate = new Date(t.tournament_date);
    const nextMonthDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    return tournamentDate.getMonth() === nextMonthDate.getMonth() && 
           tournamentDate.getFullYear() === nextMonthDate.getFullYear();
  }).length;

  const openRegistrations = tournaments.filter(t => {
    if (!t.registration_last_date) return false;
    const regDate = new Date(t.registration_last_date);
    return regDate >= today;
  }).length;

  const sportStats = {};
  tournaments.forEach(t => {
    const sport = t.sport_name || "Unknown";
    sportStats[sport] = (sportStats[sport] || 0) + 1;
  });

  const levelStats = {};
  tournaments.forEach(t => {
    const level = t.level_name || "Unknown";
    levelStats[level] = (levelStats[level] || 0) + 1;
  });

  return (
    <div>
      <h2>Tournament Dashboard</h2>

      <div>
        <h3>Overview</h3>
        <p>Total Tournaments: {total}</p>
        <p>Upcoming: {upcoming}</p>
        <p>Ongoing: {ongoing}</p>
        <p>Completed: {completed}</p>
        <p>Cancelled: {cancelled}</p>
      </div>

      <div>
        <h3>Participation Metrics</h3>
        <p>Total Participants: {totalParticipants}</p>
        <p>Total Capacity: {maxCapacity}</p>
        <p>Utilization Rate: {utilizationRate}%</p>
        <p>Open Registrations: {openRegistrations}</p>
      </div>

      <div>
        <h3>Financial Metrics</h3>
        <p>Total Revenue: ${totalRevenue.toFixed(2)}</p>
        <p>Free Tournaments: {freeTournaments}</p>
        <p>Paid Tournaments: {paidTournaments}</p>
        <p>Average Fee per Tournament: ${paidTournaments > 0 ? (totalRevenue / paidTournaments).toFixed(2) : '0.00'}</p>
      </div>

      <div>
        <h3>Schedule Metrics</h3>
        <p>This Month: {thisMonth}</p>
        <p>Next Month: {nextMonth}</p>
      </div>

      <div>
        <h3>Sport Distribution</h3>
        {Object.entries(sportStats).map(([sport, count]) => (
          <p key={sport}>{sport}: {count}</p>
        ))}
      </div>

      <div>
        <h3>Level Distribution</h3>
        {Object.entries(levelStats).map(([level, count]) => (
          <p key={level}>{level}: {count}</p>
        ))}
      </div>
    </div>
  );
}

export default TournamentDashboard;