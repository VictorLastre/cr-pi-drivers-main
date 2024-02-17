import PropTypes from "prop-types";
import "./Pagination.css";

const Pagination = ({ currentPage, driversPerPage, drivers, paginate }) => {
  const totalPages = Math.ceil(drivers.length / driversPerPage);
  const maxPagesToShow = 10; // Define el número máximo de páginas a mostrar

  // Calcula el rango de páginas a mostrar
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  // Ajusta el startPage si el endPage es igual al totalPages
  if (endPage === totalPages) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav className="pagination-container">
      <div className="pagination-buttons">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => paginate(page)}
            className={currentPage === page ? "active" : ""}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
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
