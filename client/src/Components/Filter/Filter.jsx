import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Filter.css";
import {
  allTeams,
  filterApiDb,
  filterTeams,
  getDrivers,
} from "../../Redux/Actions/Actions";

const Filter = () => {
  const dispatch = useDispatch();
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedSource, setSelectedSource] = useState("all");
  const teams = useSelector((state) => state.teams);

  useEffect(() => {
    dispatch(allTeams());
  }, [dispatch]);

  const sortedTeams = teams?.slice().sort((a, b) => a.name.localeCompare(b.name)); // Ordena alfabéticamente los equipos

  const handleTeamChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedTeam(selectedValue);
    if (selectedValue === "all") {
      dispatch(getDrivers());
    } else {
      dispatch(filterTeams(selectedValue));
    }
  };

  const handleSourceChange = (e) => {       //cambio de fuente de datos
    const selectedValue = e.target.value;
    setSelectedSource(selectedValue);
    dispatch(filterApiDb(selectedValue));
  };

  return (
    <div className="filter-container">
      <div>
        <select onChange={(e) => handleTeamChange(e)} value={selectedTeam}>
          <option value="all">Teams</option>
          {sortedTeams?.map((team) => ( 
            <option key={team.id} value={team.name}>
              {team.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-input">        
        <select value={selectedSource} onChange={(e) => handleSourceChange(e)}>
          <option value="all">All</option>
          <option value="database">Database</option>
          <option value="api">Api</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
