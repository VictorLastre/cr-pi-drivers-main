import { Link } from "react-router-dom";
import "./Landing.css";
import f1 from "../../assets/koopatroopa.gif";

const Landing = () => {
  return (
    <div className="landing-container">
      <div>
        <h1 className="landing-h1">Drivers F1 - PI</h1>
      </div>
      <div>
        <Link to={"/home"}>
        <div className="gif-container">
        <img src={f1} alt="F1" className="f1-gif" />
      </div>
        </Link>
      </div>
      
    </div>
  );
};
export default Landing;
