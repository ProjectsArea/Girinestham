import { useEffect, useState } from "react";
import {
  getPaymentSubTypesByMode,
  getTournamentsForPayment,
  searchStudentsForPayment,
  collectOfflinePayment,
} from "../api/studentPaymentsApi";
import { getCsrfToken } from "../../public/api/authApi";

const initialForm = {
  student_id: "",
  student_name: "",
  purpose_id: "",
  membership_plan_id: "",
  tournament_id: "",
  payment_mode_id: "",
  payment_sub_type_id: "",
  amount: "",
  amount_collected: "",
  transaction_id: "",
  receipt_no: "",
  collected_by_id: null,
};

const StudentPaymentCollectionForm = ({
  purposes,
  modes,
  membershipPlans,
  onSuccess,
  onCancel,
}) => {
  const [formData, setFormData] = useState(initialForm);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [subTypes, setSubTypes] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [isLoadingTournaments, setIsLoadingTournaments] = useState(false);
  const [proofFile, setProofFile] = useState(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const selectedPurpose = purposes?.find(
    (p) => p.id.toString() === formData.purpose_id,
  );
  const isMembershipPurpose =
    selectedPurpose?.purpose_name?.toLowerCase() === "membership";
  const isTournamentPurpose =
    selectedPurpose?.purpose_name?.toLowerCase() === "tournament registration";

  const selectedTournament = tournaments?.find(
    (tournament) => tournament.id.toString() === formData.tournament_id,
  );

  useEffect(() => {
    if (!isTournamentPurpose || tournaments.length > 0) {
      return;
    }

    const loadTournaments = async () => {
      setIsLoadingTournaments(true);

      try {
        const result = await getTournamentsForPayment();
        setTournaments(result.tournaments || []);
      } catch (err) {
        setError("Failed to fetch tournaments");
      } finally {
        setIsLoadingTournaments(false);
      }
    };

    loadTournaments();
  }, [isTournamentPurpose, tournaments.length]);

  const handleSearchStudent = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const result = await searchStudentsForPayment(searchQuery);
      setSearchResults(result.students || []);
    } catch (err) {
      setError("Failed to search students");
    } finally {
      setIsSearching(false);
    }
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setFormData((prev) => ({
      ...prev,
      student_id: student.id,
      student_name: student.full_name,
    }));
    setSearchResults([]);
    setSearchQuery("");
  };

  const handleModeChange = async (e) => {
    const modeId = e.target.value;

    setFormData((prev) => ({
      ...prev,
      payment_mode_id: modeId,
      payment_sub_type_id: "",
      transaction_id: "",
      receipt_no: "",
    }));

    if (modeId) {
      try {
        const result = await getPaymentSubTypesByMode(modeId);
        setSubTypes(result.subTypes || []);
      } catch (err) {
        console.error("Fetch sub types failed", err);
      }
    } else {
      setSubTypes([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "purpose_id") {
      const purpose = purposes?.find((p) => p.id.toString() === value);
      const isMembership =
        purpose?.purpose_name?.toLowerCase() === "membership";
      const isTournament =
        purpose?.purpose_name?.toLowerCase() === "tournament registration";

      setFormData((prev) => ({
        ...prev,
        purpose_id: value,
        membership_plan_id: isMembership ? prev.membership_plan_id : "",
        tournament_id: isTournament ? prev.tournament_id : "",
        amount_collected: isMembership ? prev.amount_collected : "",
      }));
      return;
    }

    if (name === "membership_plan_id") {
      const selectedPlan = membershipPlans?.find(
        (plan) => plan.id.toString() === value,
      );

      setFormData((prev) => ({
        ...prev,
        membership_plan_id: value,
        amount_collected: selectedPlan ? selectedPlan.price : "",
      }));
      return;
    }

    if (name === "tournament_id") {
      const tournament = tournaments?.find(
        (item) => item.id.toString() === value,
      );

      setFormData((prev) => ({
        ...prev,
        tournament_id: value,
        amount_collected: tournament ? tournament.participation_fee : "",
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProofFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      let csrfToken = localStorage.getItem("csrf-token");
      if (!csrfToken) {
        csrfToken = await getCsrfToken();
        localStorage.setItem("csrf-token", csrfToken);
      }

      const payload = {
        ...formData,
        amount: Number(formData.amount_collected),
      };

      const selectedModeObj = modes.find(
        (m) => m.id.toString() === formData.payment_mode_id,
      );

      const isOnlineMode =
        selectedModeObj?.mode_name?.toLowerCase() === "online";

      if (isOnlineMode) {
        // TODO: collect online payment
      } else {
        //INFO: we are using a random URL
        // for demo purposes if no file is uploaded.
        // TODO: should replace with actual proof file upload
        if (!proofFile && !payload.proof) {
          payload.proof = `https://picsum.photos/seed/receipt-${Date.now()}/400/300.jpg`;
        } else if (proofFile) {
          payload.proof = proofFile;
        }

        const result = await collectOfflinePayment(
          {
            ...payload,
            collected_by_id: 3,
            reference_id: isTournamentPurpose
              ? payload.tournament_id
              : payload.membership_plan_id,
          },
          csrfToken,
        );
      }

      if (onSuccess) {
        onSuccess("Payment recorded successfully");
      }
    } catch (err) {
      setError(err.message || "Failed to submit payment");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedMode = modes?.find(
    (m) => m.id.toString() === formData.payment_mode_id,
  );

  const isOnline = selectedMode?.mode_name?.toLowerCase() === "online";
  const isOffline = selectedMode?.mode_name?.toLowerCase() === "offline";

  return (
    <div>
      <h3>Collect Payment</h3>
      {error && <div style={{ color: "red" }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Section 1: Student Information</legend>
          <div>
            <label>Search Student: </label>
            <input
              type="text"
              placeholder="Search Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="button"
              onClick={handleSearchStudent}
              disabled={isSearching}
            >
              {isSearching ? "Searching..." : "Search"}
            </button>
          </div>

          {searchResults.length > 0 && (
            <ul>
              {searchResults.map((student) => (
                <li key={student.id}>
                  <input
                    type="radio"
                    name="student"
                    value={student.id}
                    onChange={() => handleSelectStudent(student)}
                  />
                  {student.full_name} ({student.contact_number})
                </li>
              ))}
            </ul>
          )}

          {selectedStudent && (
            <div>
              <p>
                <strong>Selected Name:</strong> {formData.student_name}
              </p>
            </div>
          )}
        </fieldset>

        <fieldset>
          <legend>Section 2: Payment Details</legend>

          <div>
            <label>Payment Purpose: </label>
            <select
              name="purpose_id"
              value={formData.purpose_id}
              onChange={handleChange}
              required
            >
              <option value="">Select Purpose</option>
              {purposes?.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.purpose_name}
                </option>
              ))}
            </select>
          </div>

          {isMembershipPurpose && (
            <div>
              <label>Membership Plan: </label>
              <select
                name="membership_plan_id"
                value={formData.membership_plan_id}
                onChange={handleChange}
                required={isMembershipPurpose}
              >
                <option value="">Select Membership Plan</option>
                {membershipPlans?.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.membership_name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {isTournamentPurpose && (
            <div>
              <label>Tournament: </label>
              <select
                name="tournament_id"
                value={formData.tournament_id}
                onChange={handleChange}
                required={isTournamentPurpose}
                disabled={isLoadingTournaments}
              >
                <option value="">
                  {isLoadingTournaments
                    ? "Loading tournaments..."
                    : "Select Tournament"}
                </option>
                {tournaments?.map((tournament) => (
                  <option key={tournament.id} value={tournament.id}>
                    {tournament.tournament_name}
                  </option>
                ))}
              </select>
              {selectedTournament && (
                <div>
                  <small>Fee: {selectedTournament.participation_fee}</small>
                </div>
              )}
            </div>
          )}

          <div>
            <label>Amount Collected: </label>
            <input
              type="number"
              name="amount_collected"
              value={formData.amount_collected}
              onChange={handleChange}
              required
              readOnly={isMembershipPurpose || isTournamentPurpose}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Section 3: Payment Mode</legend>

          <div>
            <label>Payment Mode: </label>
            <select
              name="payment_mode_id"
              value={formData.payment_mode_id}
              onChange={handleModeChange}
              required
            >
              <option value="">Select Mode</option>
              {modes?.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.mode_name}
                </option>
              ))}
            </select>
          </div>

          {subTypes.length > 0 && (
            <div>
              <label>Payment Sub Type: </label>
              <select
                name="payment_sub_type_id"
                value={formData.payment_sub_type_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Sub Type</option>
                {subTypes.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.sub_type_name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {isOnline && (
            <div>
              <label>Transaction ID: </label>
              <input
                type="text"
                name="transaction_id"
                value={formData.transaction_id}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {isOffline && (
            <>
              <div>
                <label>Receipt Number (Optional): </label>
                <input
                  type="text"
                  name="receipt_no"
                  value={formData.receipt_no}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
        </fieldset>

        <div>
          <button type="button" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting || !selectedStudent}>
            {isSubmitting ? "Submitting..." : "Submit Payment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentPaymentCollectionForm;
