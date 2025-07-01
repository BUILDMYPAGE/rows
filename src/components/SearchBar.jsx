import { useState } from 'react';

const SearchBar = ({ onSearch, loading, placeholder = "Search characters..." }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSubmit} className="search-form mb-3">
      <div className="search-container" style={{ 
        display: 'flex', 
        gap: '0.5rem',
        marginBottom: '1rem'
      }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="form-input"
            disabled={loading}
            style={{ paddingRight: query ? '40px' : '12px' }}
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                fontSize: '18px',
                cursor: 'pointer',
                color: '#666',
                padding: '2px'
              }}
            >
              ×
            </button>
          )}
        </div>
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={loading || !query.trim()}
          style={{ minWidth: '100px' }}
        >
          {loading ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ 
                width: '16px', 
                height: '16px', 
                border: '2px solid rgba(255,255,255,0.3)',
                borderTop: '2px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              Searching...
            </span>
          ) : (
            '🔍 Search'
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
