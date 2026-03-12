import React, { useState } from "react";

const StudentPaymentFilters = ({
  paymentModes,
  paymentStatuses,
  paymentPurposes,
  onFilter,
}) => {
  const [filters, setFilters] = useState({
    search: "",
    mode: "",
    status: "",
    purpose: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApply = () => {
    onFilter(filters);
  };

  const handleClear = () => {
    const cleared = {
      search: "",
      mode: "",
      status: "",
      purpose: "",
      startDate: "",
      endDate: "",
    };
    setFilters(cleared);
    onFilter(cleared);
  };

  return (
    <div>
      <div>
        <label>Search: </label>
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={handleChange}
          placeholder="Receipt No / Student Name"
        />
      </div>

      <div>
        <label>Payment Purpose: </label>
        <select name="purpose" value={filters.purpose} onChange={handleChange}>
          <option value="">All Purposes</option>
          {paymentPurposes?.map((p) => (
            <option key={p.id} value={p.id}>
              {p.purpose_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Payment Mode: </label>
        <select name="mode" value={filters.mode} onChange={handleChange}>
          <option value="">All Modes</option>
          {paymentModes?.map((m) => (
            <option key={m.id} value={m.id}>
              {m.mode_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Status: </label>
        <select name="status" value={filters.status} onChange={handleChange}>
          <option value="">All Statuses</option>
          {paymentStatuses?.map((s) => (
            <option key={s.id} value={s.id}>
              {s.status_name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>From Date: </label>
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
        />
      </div>

      <div>
        <label>To Date: </label>
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
        />
      </div>

      <div>
        <button onClick={handleApply}>Apply Filters</button>
        <button onClick={handleClear}>Clear</button>
      </div>
    </div>
  );
};

export default StudentPaymentFilters;
