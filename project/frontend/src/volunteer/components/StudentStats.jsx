import { useEffect, useState } from "react";
import { getStudentStats } from "../api/studentsApi";

export default function StudentStats() {
  const [stats, setStats] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const result = await getStudentStats();
      if (result.success) {
        setStats({
          registered_today: result.registered_today,
          total_registered: result.total_registered,
          pending_count: result.pending_count,
          total_memberships: result.total_memberships,
          total_fee_collected: result.total_fee_collected,
          total_active_memberships: result.total_active_memberships,
          total_memberships_registered_today:
            result.total_memberships_registered_today,
        });
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h4>Student stats</h4>
          <div>
            <p>Total registered: {stats.total_registered}</p>
            <p>Registered today: {stats.registered_today}</p>
            <p>Pending approval: {stats.pending_count}</p>
            <p>Total memberships: {stats.total_memberships}</p>
            <p>Total fee collected: {stats.total_fee_collected}</p>
            <p>Total active memberships: {stats.total_active_memberships}</p>
            <p>
              Total memberships registered today:{" "}
              {stats.total_memberships_registered_today}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
