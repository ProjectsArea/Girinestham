import React, { useState, useEffect } from "react";
import { createTournament, updateTournament, getTournamentById } from "../api/tournamentApi";

function TournamentForm({ reload, editingTournament, setEditingTournament }) {

  const [form, setForm] = useState({
    tournament_name: "",
    sport_id: "",
    tournament_level_id: "",
    tournament_status_id: "",
    tournament_date: "",
    tournament_time: "",
    tournament_location: "",
    registration_last_date: "",
    organizer_name: "",
    contact_number: "",
    participation_fee: "",
    max_students_allowed: "",
    description: "",
    created_by: 1
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingTournament) {
      const loadTournament = async () => {
        try {
          const response = await getTournamentById(editingTournament);
          console.log("API Response:", response);
          const tournament = response.tournament || response.data || response;
          console.log("Tournament data:", tournament);
          setForm({
            tournament_name: tournament.tournament_name || "",
            sport_id: tournament.sport_id || "",
            tournament_level_id: tournament.tournament_level_id || "",
            tournament_status_id: tournament.tournament_status_id || "",
            tournament_date: tournament.tournament_date || "",
            tournament_time: tournament.tournament_time || "",
            tournament_location: tournament.tournament_location || "",
            registration_last_date: tournament.registration_last_date || "",
            organizer_name: tournament.organizer_name || "",
            contact_number: tournament.contact_number || "",
            participation_fee: tournament.participation_fee || "",
            max_students_allowed: tournament.max_students_allowed || "",
            description: tournament.description || "",
            created_by: tournament.created_by || 1
          });
        } catch (error) {
          console.error("Error loading tournament:", error);
        }
      };
      loadTournament();
    }
  }, [editingTournament]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.tournament_name.trim()) {
      newErrors.tournament_name = "Tournament name is required";
    }
    
    if (!form.sport_id) {
      newErrors.sport_id = "Sport ID is required";
    }
    
    if (!form.tournament_level_id) {
      newErrors.tournament_level_id = "Tournament level is required";
    }
    
    if (!form.tournament_status_id) {
      newErrors.tournament_status_id = "Tournament status is required";
    }
    
    if (!form.tournament_date) {
      newErrors.tournament_date = "Tournament date is required";
    }
    
    if (form.contact_number && !/^[0-9]{10}$/.test(form.contact_number)) {
      newErrors.contact_number = "Contact number must be 10 digits";
    }
    
    if (form.participation_fee && form.participation_fee < 0) {
      newErrors.participation_fee = "Participation fee cannot be negative";
    }
    
    if (form.max_students_allowed && form.max_students_allowed <= 0) {
      newErrors.max_students_allowed = "Max students must be greater than 0";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ""
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      if (editingTournament) {
        await updateTournament(editingTournament, form);
        alert("Tournament updated successfully");
        setEditingTournament(null);
      } else {
        await createTournament(form);
        alert("Tournament created successfully");
      }
      
      resetForm();
      reload();
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const resetForm = () => {
    setForm({
      tournament_name: "",
      sport_id: "",
      tournament_level_id: "",
      tournament_status_id: "",
      tournament_date: "",
      tournament_time: "",
      tournament_location: "",
      registration_last_date: "",
      organizer_name: "",
      contact_number: "",
      participation_fee: "",
      max_students_allowed: "",
      description: "",
      created_by: 1
    });
    setErrors({});
    setEditingTournament(null);
  };

  const handleCancel = () => {
    resetForm();
  };

  return (
    <div>
      <h3>{editingTournament ? "Edit Tournament" : "Create Tournament"}</h3>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="tournament_name"
            placeholder="Tournament Name"
            value={form.tournament_name}
            onChange={handleChange}
          />
          {errors.tournament_name && <span>{errors.tournament_name}</span>}
        </div>

        <div>
          <input
            name="sport_id"
            placeholder="Sport ID"
            value={form.sport_id}
            onChange={handleChange}
          />
          {errors.sport_id && <span>{errors.sport_id}</span>}
        </div>

        <div>
          <input
            name="tournament_level_id"
            placeholder="Level ID"
            value={form.tournament_level_id}
            onChange={handleChange}
          />
          {errors.tournament_level_id && <span>{errors.tournament_level_id}</span>}
        </div>

        <div>
          <input
            name="tournament_status_id"
            placeholder="Status ID"
            value={form.tournament_status_id}
            onChange={handleChange}
          />
          {errors.tournament_status_id && <span>{errors.tournament_status_id}</span>}
        </div>

        <div>
          <input
            type="date"
            name="tournament_date"
            value={form.tournament_date}
            onChange={handleChange}
          />
          {errors.tournament_date && <span>{errors.tournament_date}</span>}
        </div>

        <div>
          <input
            type="time"
            name="tournament_time"
            value={form.tournament_time}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            name="tournament_location"
            placeholder="Location"
            value={form.tournament_location}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            type="date"
            name="registration_last_date"
            value={form.registration_last_date}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            name="organizer_name"
            placeholder="Organizer Name"
            value={form.organizer_name}
            onChange={handleChange}
          />
        </div>

        <div>
          <input
            name="contact_number"
            placeholder="Contact Number"
            value={form.contact_number}
            onChange={handleChange}
          />
          {errors.contact_number && <span>{errors.contact_number}</span>}
        </div>

        <div>
          <input
            type="number"
            step="0.01"
            name="participation_fee"
            placeholder="Participation Fee"
            value={form.participation_fee}
            onChange={handleChange}
          />
          {errors.participation_fee && <span>{errors.participation_fee}</span>}
        </div>

        <div>
          <input
            type="number"
            name="max_students_allowed"
            placeholder="Max Students Allowed"
            value={form.max_students_allowed}
            onChange={handleChange}
          />
          {errors.max_students_allowed && <span>{errors.max_students_allowed}</span>}
        </div>

        <div>
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <button type="submit">
            {editingTournament ? "Update Tournament" : "Create Tournament"}
          </button>
          
          {editingTournament && (
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TournamentForm;