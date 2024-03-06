import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Filter.css";
import { allTeams, filterApiDb, filterTeams, getDrivers } from "../../Redux/Actions/Actions";

const Filter = () => {
  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams);
  const [filters, setFilters] = useState({ selectedTeam: "all", selectedSource: "all" });

  useEffect(() => {
    dispatch(allTeams());
  }, [dispatch]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    if (name === "selectedTeam") {
      if (value === "all") {
        dispatch(getDrivers());
      } else {
        dispatch(filterTeams(value));
      }
    } else if (name === "selectedSource") {
      dispatch(filterApiDb(value));
    }
  };

  return (
    <div className="filter-container">
      <div>
        <select name="selectedTeam" value={filters.selectedTeam} onChange={handleFilterChange}>
          <option value="all">Teams</option>
          {teams?.slice().sort((a, b) => a.name.localeCompare(b.name)).map((team) => (
            <option key={team.id} value={team.name}>
              {team.name}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-input">        
        <select name="selectedSource" value={filters.selectedSource} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="database">Database</option>
          <option value="api">Api</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
