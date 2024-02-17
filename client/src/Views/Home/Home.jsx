import { useDispatch, useSelector } from "react-redux";
import "./Home.css";
import { getDrivers } from "../../Redux/Actions/Actions";
import OrderDrivers from "../../Components/Order/OrderDrivers";

import { useEffect, useState } from "react";
import Pagination from "../../Components/Pagination/Pagination";
import Card from "../../Components/Card/Card";

const Home = () => {
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.drivers);
  const [currentPage, setCurrentPage] = useState(1);
  const [driversPerPage] = useState(12);
  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const currentDrivers = drivers.slice(indexOfFirstDriver, indexOfLastDriver);

  useEffect(() => {
    dispatch(getDrivers());
  }, [dispatch]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="home-container">
      <div className="filter-container">
        <OrderDrivers className="order-drivers" />                
      </div>
      <div className={`${"pagination-containerCards"} ${"card-Container"}`}>
        {currentDrivers?.map((driver) => {
          return (
            <Card
              key={driver.id}
              id={String(driver.id)}
              name={driver.name}
              lastname={driver.lastname}
              nationality={driver.nationality}
              image={driver.image}
              description={driver.description}
              birthdate={driver.birthdate}
              teams={String(driver.teams)}
              createDb={driver.createDb}
            />
          );
        })}
      </div>
      <div className={"pagination-container"}>
        <Pagination
          currentPage={currentPage}
          driversPerPage={driversPerPage}
          drivers={drivers}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default Home;
