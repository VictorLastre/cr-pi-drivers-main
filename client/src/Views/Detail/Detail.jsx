import { useDispatch, useSelector } from "react-redux";
import "./Detail.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getDriverDetail } from '../../Redux/Actions/Actions';

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const driverDetail = useSelector((state) => state.driverDetail);

  useEffect(() => {
    dispatch(getDriverDetail(id));
  }, [dispatch, id]);

  return (
    <div className="container">
      <div className="avatar-flip">
        <img src={driverDetail.image} className="img-container" alt="" height="200" width="200" />
        <img src={driverDetail.image} className="img-container" alt="" height="200" width="200" />
      </div>
      <h2>{driverDetail.name} {driverDetail.lastname}</h2>
      <h4>Nationality: {driverDetail.nationality}</h4>      
      <p>Birthdate: {driverDetail.birthdate}</p>
      <h4>Teams: </h4>      
      <p>
        {Array.isArray(driverDetail.Teams)
          ? driverDetail.Teams.map((team) => team.name).join(", ")
          : driverDetail.teams}
      </p> 
      <h4>Description:</h4>
      <p>{driverDetail.description}</p>       
    </div>
  );
};

export default Detail;


/*
<Link to="/home">
        <button className="nav-button">
          <FontAwesomeIcon style={{ color: 'blue' }} icon={faHome} />
        </button>
      </Link>*/