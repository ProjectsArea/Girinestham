import React from "react";

function TournamentFilters({ setSearch, setStatusFilter, setSportFilter, tournaments, statusFilter, sportFilter }) {

  const uniqueSports = [...new Set(tournaments.map(t => t.sport_name).filter(Boolean))];
  const uniqueStatuses = [...new Set(tournaments.map(t => t.status_name).filter(Boolean))];

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleSportChange = (e) => {
    setSportFilter(e.target.value);
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setSportFilter("");
  };

  return (
    <div>
      <h3>Search and Filter Tournaments</h3>
      
      <div>
        <input
          type="text"
          placeholder="Search by Tournament Name"
          onChange={handleSearchChange}
        />
      </div>

      <div>
        <select onChange={handleStatusChange} value={statusFilter || ""}>
          <option value="">All Statuses</option>
          {uniqueStatuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      <div>
        <select onChange={handleSportChange} value={sportFilter || ""}>
          <option value="">All Sports</option>
          {uniqueSports.map(sport => (
            <option key={sport} value={sport}>{sport}</option>
          ))}
        </select>
      </div>

      <div>
        <button onClick={clearFilters}>Clear Filters</button>
      </div>
    </div>
  );
}

export default TournamentFilters;