import PropTypes from "prop-types";
import { useEffect } from "react";
import "./Pagination.css";

const Pagination = ({ currentPage, driversPerPage, drivers, paginate }) => {
  const totalPages = Math.max(1, Math.ceil(drivers.length / driversPerPage));
  const maxPagesToShow = 10; // Define el número máximo de páginas a mostrar

  const calculatePagesToShow = () => {
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  const pages = calculatePagesToShow();

  useEffect(() => {
    // Si drivers cambia debido a un cambio de equipo, mostrar la primera página automáticamente
    if (currentPage !== 1) {
      paginate(1);
    }
  }, [drivers, currentPage, paginate]);

  return (
    <nav className="pagination-container">
      <div className="pagination-buttons">
        {currentPage > 1 && (
          <button onClick={() => paginate(currentPage - 1)}>Prev</button>
        )}
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => paginate(page)}
            className={currentPage === page ? "active" : ""}
          >
            {page}
          </button>
        ))}
        {currentPage < totalPages && (
          <button onClick={() => paginate(currentPage + 1)}>Next</button>
        )}
      </div>
    </nav>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  driversPerPage: PropTypes.number.isRequired,
  drivers: PropTypes.array.isRequired,
  paginate: PropTypes.func.isRequired,
};

export default Pagination;
