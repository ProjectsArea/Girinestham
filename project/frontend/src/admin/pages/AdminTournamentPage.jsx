import React, { useEffect, useState } from "react";
import { getTournaments } from "../api/tournamentApi";

import TournamentDashboard from "../components/TournamentDashboard";
import TournamentForm from "../components/TournamentForm";
import TournamentList from "../components/TournamentList";
import TournamentFilters from "../components/TournamentFilters";

function AdminTournamentPage() {

  const [tournaments, setTournaments] = useState([]);
  const [filteredTournaments, setFilteredTournaments] = useState([]);
  const [searchTerm,setSearchTerm]=useState("");
  const [statusFilter,setStatusFilter]=useState("");
  const [sportFilter,setSportFilter]=useState("");
  const [editingTournament,setEditingTournament]=useState(null);

  const loadData = async () => {
    const res = await getTournaments();
    console.log(res)
    setTournaments(res.tournaments || []);
    setFilteredTournaments(res.tournaments || []);
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    let filtered = tournaments;

    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.tournament_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(t => t.status_name === statusFilter);
    }

    if (sportFilter) {
      filtered = filtered.filter(t => t.sport_name === sportFilter);
    }

    setFilteredTournaments(filtered);
  }, [tournaments, searchTerm, statusFilter, sportFilter]);

  return (
    <div>
      <TournamentDashboard tournaments={filteredTournaments} />
      
      <TournamentFilters 
        setSearch={setSearchTerm}
        setStatusFilter={setStatusFilter}
        setSportFilter={setSportFilter}
        tournaments={tournaments}
        statusFilter={statusFilter}
        sportFilter={sportFilter}
      />

      <TournamentForm 
        reload={loadData}
        editingTournament={editingTournament}
        setEditingTournament={setEditingTournament}
      />

      <TournamentList
        tournaments={filteredTournaments}
        reload={loadData}
        setEditingTournament={setEditingTournament}
      />
    </div>
  );
}

export default AdminTournamentPage;