import { useSelector } from "react-redux";
import "./Cards.css";
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import { useState } from "react";


const Cards = () => {
  const drivers = useSelector((state) => state.drivers);
  const [currentPage, setCurrentPage] = useState(1);
  const [driversPerPage] = useState(9);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastDriver = currentPage * driversPerPage;
  const indexOfFirstDriver = indexOfLastDriver - driversPerPage;
  const currentDrivers = drivers.slice(indexOfFirstDriver, indexOfLastDriver);

  return (
    <div>
      <div className="cards-container">
        {currentDrivers.map((driver) => (
          <Card
            key={driver.id}
            id={driver.id}
            name={driver.name}
            lastname={driver.lastname}
            nationality={driver.nationality}
            image={driver.image}
            description={driver.description}
            birthdate={driver.birthdate}
            teams={String(driver.teams)}
            createDb={driver.createDb}
          />
        ))}
      </div>
      <div className="pagination-container">
        <Pagination
          currentPage={currentPage}
          driversPerPage={driversPerPage}
          totalDrivers={drivers.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
};

export default Cards;
