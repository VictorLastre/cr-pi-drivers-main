import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlus, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import Searchbar from "../Searchbar/Searchbar"

const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="title-container">
        <h1>DRIVERS F1</h1>              
      </div>
      <Searchbar className="searchbar" />
      <div className="button-container">
        <Link to={"/home"}>
          <button className="nav-button"><FontAwesomeIcon style={{ color: 'blue' }} icon={faHome} /></button>
        </Link>

        <Link to={"/form"}>
          <button className="nav-button"><FontAwesomeIcon style={{ color: 'green' }} icon={faPlus} /></button>
        </Link>

        <Link to={"/"}>
          <button className="nav-button"><FontAwesomeIcon style={{ color: 'red' }} icon={faSignOutAlt} /></button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
