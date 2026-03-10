import { useState } from "react";
import { createStudent } from "../api/studentsApi";
import { getCsrfToken } from "../../public/api/authApi";

const initialForm = {
  full_name: "",
  date_of_birth: "",
  gender: "male",
  address: "",
  contact_number: "",
  email: "",
  guardian_name: "",
  emergency_contact: "",
  sport_interested_id: "",
};

export default function StudentRegistrationForm({ sports }) {
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const payload = {
      full_name: formData.full_name,
      date_of_birth: formData.date_of_birth,
      gender: formData.gender,
      contact_number: formData.contact_number,
      email: formData.email,
      address: formData.address,
      guardian_name: formData.guardian_name,
      emergency_contact: formData.emergency_contact,
      sport_interested_id: Number(formData.sport_interested_id),
      photo: "/seed/student-profile/400/400",
    };

    try {
      let csrfToken = localStorage.getItem("csrf-token");
      if (!csrfToken) {
        csrfToken = await getCsrfToken();
        localStorage.setItem("csrf-token", csrfToken);
      }
      const result = await createStudent(csrfToken, payload);
    } catch (submitError) {
      const message =
        submitError.response?.data?.message ||
        submitError.message ||
        "Failed to register student.";
      setError(message);
    }
    setIsSubmitting(false);
  };

  return (
    <div>
      <h3>Register Student</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Full Name
            <input
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Date of Birth
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Gender
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </label>
          <label>
            Mobile Number
            <input
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email ID
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Parent / Guardian Name
            <input
              name="guardian_name"
              value={formData.guardian_name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Emergency Contact Number
            <input
              name="emergency_contact"
              value={formData.emergency_contact}
              onChange={handleChange}
            />
          </label>
          <label>
            Sport Interested
            <select
              name="sport_interested_id"
              value={formData.sport_interested_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Sport</option>
              {sports.map((sport) => (
                <option key={sport.id} value={sport.id}>
                  {sport.sport_name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label>
          Address
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </label>

        {error ? <p>{error}</p> : null}

        <div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Registration"}
          </button>
          <button type="button">Cancel</button>
        </div>
      </form>
    </div>
  );
}
