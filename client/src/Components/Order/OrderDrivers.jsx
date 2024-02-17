import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./OrderDrivers.css";
import {
  getDrivers,
  orderByDob,
  orderDrivers,
  allTeams,
  filterApiDb,
  filterTeams  
} from "../../Redux/Actions/Actions";

const Filter = () => {
  const dispatch = useDispatch();
  const [selectedTeam, setSelectedTeam] = useState("");
  const teams = useSelector((state) => state.teams);

  useEffect(() => {
    dispatch(allTeams());
  }, [dispatch]);

  const handleFilter = (e) => {
    const selectedValue = e.target.value;
    setSelectedTeam(selectedValue);
    if (selectedValue === "all") {
      dispatch(getDrivers());
    } else {
      dispatch(filterTeams(selectedValue));
    }
  };

  const handleSourceFilter = (e) => {       //cam. fuen de datos
    const selectedValue = e.target.value;
    setSelectedTeam(selectedValue);
    if (selectedValue === "all") {
      dispatch(filterApiDb("all"));
    } else if (selectedValue === "api") {
      dispatch(filterApiDb("api"));
    } else if (selectedValue === "database") {
      dispatch(filterApiDb("database"));
    }
  };

  return (
    <div>
      <select onChange={(e) => handleFilter(e)} value={selectedTeam}>
        <option value="all">Filter by Team...</option>
        {teams?.map((team) => (
          <option key={team.id} value={team.name}>
            {team.name}
          </option>
        ))}
      </select>
      <div className="filter-imput">
        <span>Filter by Source: </span>
        <label>
          <input
            type="radio"
            value="all"
            checked={selectedTeam === "all"}
            onChange={handleSourceFilter}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            value="database"
            checked={selectedTeam === "database"}
            onChange={handleSourceFilter}
          />
          Database
        </label>
        <label>
          <input
            type="radio"
            value="api"
            checked={selectedTeam === "api"}
            onChange={handleSourceFilter}
          />
          Api
        </label>
      </div>
    </div>
  );
};

const OrderDrivers = () => {
  const dispatch = useDispatch();
  const [aux, setAux] = useState(false);

  useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch]);

  const handleOrder = (e) => {
    e.preventDefault();
    if (e.target.value === "default") {
      dispatch(getDrivers());
    } else {
      dispatch(orderDrivers(e.target.value));
    }
    setAux(!aux);
  };

  const handleBirthday = (e) => {
    e.preventDefault();
    if (e.target.value === "default") {
      dispatch(getDrivers());
    } else if (e.target.value === "asc") {
      dispatch(orderByDob("asc"));
    } else if (e.target.value === "desc") {
      dispatch(orderByDob("desc"));
    }
    setAux(!aux);
  };

  return (
    <div className="order-container">
      <div className="order-ascDesc">
        <select onChange={(e) => handleOrder(e)}>
          <option value="default">Order alphabetically</option>
          <option value="asc">Ascendent</option>
          <option value="desc">Descendent</option>
        </select>
      </div>
      <div className="order-dob">
        <select onChange={(e) => handleBirthday(e)}>
          <option value="default">Order by birthday</option>
          <option value="asc">Youngest</option>
          <option value="desc">Oldest</option>
        </select>
      </div>

      <Filter />
    </div>
  );
};

export default OrderDrivers;
