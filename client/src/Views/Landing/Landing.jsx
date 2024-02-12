import { Link } from "react-router-dom";
import "./Landing.css";

const Landing = () => {
  return (
    <div className="landing-container">
      <div>
        <h1 className="landing-h1">Drivers F1 - PI</h1>
      </div>
      <div>
        <Link to={"/home"}>
          <button className="landing-button" type="submit">
          READY GO...
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;