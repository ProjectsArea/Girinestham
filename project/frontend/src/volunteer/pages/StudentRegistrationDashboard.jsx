import { useState, useEffect } from "react";
import StudentRegistrationForm from "../components/StudentRegistrationForm";
import StudentStats from "../components/StudentStats";
import { getSportsList } from "../api/studentsApi";
import StudentsListTable from "../components/StudentsListTable";

export default function StudentRegistrationDashboard() {
  const [sports, setSports] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSportsList();
  }, []);

  const fetchSportsList = async () => {
    try {
      const result = await getSportsList();
      if (result.success) {
        setSports(result.sports);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <StudentStats />
      <StudentRegistrationForm sports={sports} />
      <StudentsListTable />
    </div>
  );
}
