const Pagination = ({ currentPage, totalPages, onPageChange, loading }) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination-container" style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      gap: '0.5rem',
      margin: '2rem 0',
      flexWrap: 'wrap'
    }}>
      <button
        className="btn btn-secondary"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1 || loading}
        style={{ 
          padding: '0.5rem 1rem',
          minWidth: 'auto'
        }}
      >
        ← Previous
      </button>

      {getPageNumbers().map(page => (
        <button
          key={page}
          className={`btn ${page === currentPage ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => onPageChange(page)}
          disabled={loading}
          style={{ 
            padding: '0.5rem 0.75rem',
            minWidth: '45px',
            fontWeight: page === currentPage ? '700' : '500'
          }}
        >
          {page}
        </button>
      ))}

      <button
        className="btn btn-secondary"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages || loading}
        style={{ 
          padding: '0.5rem 1rem',
          minWidth: 'auto'
        }}
      >
        Next →
      </button>

      <div style={{ 
        marginLeft: '1rem', 
        color: '#666', 
        fontSize: '0.875rem',
        fontWeight: '500'
      }}>
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};

export default Pagination;
