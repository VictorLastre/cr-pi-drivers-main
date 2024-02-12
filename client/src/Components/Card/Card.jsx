import PropTypes from "prop-types";
import "./Card.css";
import { Link } from "react-router-dom";

const Card = ({ id, name, lastname, teams, image }) => {
  return (
    <Link to={`/detail/${id}`} style={{ textDecoration: 'none' }}>
      <div className="card">
        <div>
          <img src={image} alt={name} className="image" />
        </div>
        <div className="card-info">
          <span>
            {name} {lastname}
          </span>
          <div>
            <label>Teams:</label>
            <p>{teams}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  lastname: PropTypes.string.isRequired,
  teams: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Card;
