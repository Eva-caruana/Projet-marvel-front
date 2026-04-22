import "./Pagination.css";

const Pagination = ({ page, setPage, data, count }) => {
  const totalPages = Math.ceil(count / 100);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Logique pour générer les numéros à afficher
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      // Si peu de pages on affiche tout
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Toujours afficher la première page
      pages.push(1);

      if (page > 3) pages.push("..."); // ... à gauche

      // Pages autour de la page courante
      for (
        let i = Math.max(2, page - 1);
        i <= Math.min(totalPages - 1, page + 1);
        i++
      ) {
        pages.push(i);
      }

      if (page < totalPages - 2) pages.push("..."); // ... à droite

      // Toujours afficher la dernière page
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
      >
        ← Précédent
      </button>

      <div className="pagination-numbers">
        {getPageNumbers().map((num, index) =>
          num === "..." ? (
            <span key={`dots-${index}`} className="pagination-dots">
              ...
            </span>
          ) : (
            <button
              key={num}
              className={`pagination-number ${num === page ? "active" : ""}`}
              onClick={() => handlePageChange(num)}
            >
              {num}
            </button>
          ),
        )}
      </div>

      <button
        className="pagination-btn"
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
      >
        Suivant →
      </button>
    </div>
  );
};

export default Pagination;
