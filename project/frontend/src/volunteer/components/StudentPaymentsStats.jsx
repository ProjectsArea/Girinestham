import React from "react";

const StudentPaymentsStats = ({ stats }) => {
  if (!stats) {
    return <div>Loading stats...</div>;
  }

  return (
    <div>
      <div>
        <p>
          Total Payments Today : <span>{stats.total_payments_today || 0}</span>
        </p>
      </div>
      <div>
        <p>
          Total Online Payments :{" "}
          <span>{stats.total_online_payments_today || 0}</span>
        </p>
      </div>
      <div>
        <p>
          Total Offline Payments :{" "}
          <span>{stats.total_offline_payments_today || 0}</span>
        </p>
      </div>
      <div>
        <p>
          Pending Approval : <span>{stats.pending_approval_payments || 0}</span>
        </p>
      </div>
    </div>
  );
};

export default StudentPaymentsStats;
