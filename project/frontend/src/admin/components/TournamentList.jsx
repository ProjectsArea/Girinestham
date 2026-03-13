import React, { useState } from "react";
import { deleteTournament } from "../api/tournamentApi";
import TournamentRegistrations from "./TournamentRegistrations";

function TournamentList({ tournaments, reload, setEditingTournament }) {

  const [selectedTournament, setSelectedTournament] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this tournament?")) {
      try {
        await deleteTournament(id);
        alert("Tournament deleted successfully");
        reload();
      } catch (error) {
        alert(`Error deleting tournament: ${error.message}`);
      }
    }
  };

  const handleEdit = (tournament) => {
    setEditingTournament(tournament.id);
  };

  const handleViewStudents = (tournament) => {
    setSelectedTournament(tournament);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString();
  };

  const formatTime = (timeString) => {
    if (!timeString) return "N/A";
    return timeString;
  };

  const formatCurrency = (amount) => {
    if (!amount) return "Free";
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  const getRegistrationStatus = (tournament) => {
    if (!tournament.registration_last_date) return "N/A";
    const today = new Date();
    const regDate = new Date(tournament.registration_last_date);
    return regDate >= today ? "Open" : "Closed";
  };

  return (
    <div>
      <h3>Tournament List</h3>

      {selectedTournament ? (
        <TournamentRegistrations
          tournamentId={selectedTournament.id}
          tournamentName={selectedTournament.tournament_name}
          maxStudents={selectedTournament.max_students_allowed}
        />
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th>Name</th>
              <th>Sport</th>
              <th>Level</th>
              <th>Date</th>
              <th>Time</th>
              <th>Location</th>
              <th>Organizer</th>
              <th>Contact</th>
              <th>Fee</th>
              <th>Max Students</th>
              <th>Registration</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {tournaments.length === 0 ? (
              <tr>
                <td colSpan="13">No tournaments found</td>
              </tr>
            ) : (
              tournaments.map((t) => (
                <tr key={t.id}>
                  <td>{t.tournament_name}</td>
                  <td>{t.sport_name || "N/A"}</td>
                  <td>{t.level_name || "N/A"}</td>
                  <td>{formatDate(t.tournament_date)}</td>
                  <td>{formatTime(t.tournament_time)}</td>
                  <td>{t.tournament_location || "N/A"}</td>
                  <td>{t.organizer_name || "N/A"}</td>
                  <td>{t.contact_number || "N/A"}</td>
                  <td>{formatCurrency(t.participation_fee)}</td>
                  <td>{t.max_students_allowed || "N/A"}</td>
                  <td>{getRegistrationStatus(t)}</td>
                  <td>{t.status_name || "N/A"}</td>
                  <td>
                    <button onClick={() => handleEdit(t)}>Edit</button>
                    <button onClick={() => handleViewStudents(t)}>View Students</button>
                    <button onClick={() => handleDelete(t.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {selectedTournament && (
        <div>
          <button onClick={() => setSelectedTournament(null)}>
            Back to Tournament List
          </button>
        </div>
      )}
    </div>
  );
}

export default TournamentList;