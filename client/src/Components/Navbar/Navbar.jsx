import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="title-container">
        <h1>▀▄▀▄▀▄ 🄳🅁🄸🅅🄴🅁🅂 🄵1 ▀▄▀▄▀▄</h1>
      </div>

      <div className="button-container">
        <Link to={"/home"}>
          <button className="nav-button">Home</button>
        </Link>

        <Link to={"/form"}>
          <button className="nav-button">Create</button>
        </Link>

        <Link to={"/"}>
          <button className="nav-button">Exit</button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;