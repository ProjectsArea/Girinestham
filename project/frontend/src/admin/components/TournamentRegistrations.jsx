import React, { useState, useEffect } from "react";
import { getTournamentRegistrations } from "../api/tournamentApi";

function TournamentRegistrations({ tournamentId, tournamentName, maxStudents }) {

  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRegistrations = async () => {
      try {
        const response = await getTournamentRegistrations(tournamentId);
        console.log("Registrations Response:", response);
        setRegistrations(response.registrations || []);
      } catch (error) {
        console.error("Error loading registrations:", error);
        setRegistrations([]);
      } finally {
        setLoading(false);
      }
    };

    if (tournamentId) {
      loadRegistrations();
    }
  }, [tournamentId]);

  const getRegistrationStatus = () => {
    if (registrations.length === 0) return "No registrations";
    if (registrations.length >= maxStudents) return "Full";
    return `${registrations.length}/${maxStudents} registered`;
  };

  const getStatusColor = () => {
    if (registrations.length === 0) return "#666";
    if (registrations.length >= maxStudents) return "#dc3545";
    return "#28a745";
  };

  return (
    <div>
      <h3>Students Registered for {tournamentName}</h3>
      
      <div>
        <p>
          <strong>Status:</strong> 
          <span style={{ color: getStatusColor() }}>
            {getRegistrationStatus()}
          </span>
        </p>
        <p><strong>Total Slots:</strong> {maxStudents}</p>
        <p><strong>Registered:</strong> {registrations.length}</p>
        <p><strong>Available:</strong> {maxStudents - registrations.length}</p>
      </div>

      <div>
        <h4>Registered Students</h4>
        
        {loading ? (
          <p>Loading students...</p>
        ) : registrations.length === 0 ? (
          <p>No students registered yet for this tournament.</p>
        ) : (
          <table border="1">
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Grade</th>
                <th>Section</th>
                <th>Registration Date</th>
              </tr>
            </thead>
            <tbody>
              {registrations.map((registration, index) => (
                <tr key={index}>
                  <td>{registration.student_name}</td>
                  <td>{registration.email || "N/A"}</td>
                  <td>{registration.phone || "N/A"}</td>
                  <td>{registration.grade || "N/A"}</td>
                  <td>{registration.section || "N/A"}</td>
                  <td>{new Date(registration.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default TournamentRegistrations;
