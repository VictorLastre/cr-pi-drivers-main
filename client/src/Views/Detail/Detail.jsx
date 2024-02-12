import { useDispatch, useSelector } from "react-redux";
import "./Detail.css";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getDriverDetail } from "../../Redux/Actions/Actions";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const driverDetail = useSelector((state) => state.driverDetail);

  useEffect(() => {
    dispatch(getDriverDetail(id));
  }, [dispatch, id]);

  return (
    <div className="detail-container">
      <div className="driver-card">
        <Link to="/home">
          <button className="back-home">Home</button>
        </Link>
        <div className="info-left">
          <div className="logo-container">
            <img
              src="https://www.cdnlogo.com/logos/f/41/f1-new.svg"
              className="logo"
              alt="F1 Logo"
            />
            <p className="license-text">Driver Detail</p>
          </div>
        </div>
        <div className="info-center">
          <img src={driverDetail.image} className="img-container" alt="" />
          <div className="driver-fields">
            <div className="driver-field">
              <p>ID: {driverDetail.id}</p>
            </div>
            <div className="driver-field">
              <p>Name: {driverDetail.name}</p>
            </div>
            <div className="driver-field">
              <p>Lastname: {driverDetail.lastname}</p>
            </div>
            <div className="driver-field">
              <p>Nationality: {driverDetail.nationality}</p>
            </div>
            <div className="driver-field">
              <p>Birthdate: {driverDetail.birthdate}</p>
            </div>
            <div className="driver-field">
              {Array.isArray(driverDetail.Teams)
                ? driverDetail.Teams.map((team) => team.name).join(", ")
                : driverDetail.teams}
            </div>
          </div>
        </div>
        <div className="driver-description">
          <p>Description: {driverDetail.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Detail;