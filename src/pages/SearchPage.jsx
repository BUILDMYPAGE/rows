import { useState } from 'react';
import { useSearch } from '../hooks/useSWAPI';
import SearchBar from '../components/SearchBar';
import CharacterCard from '../components/CharacterCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import swapiService from '../services/swapiService';

const SearchPage = () => {
  const { data, loading, error, search, clearSearch } = useSearch();
  const [hasSearched, setHasSearched] = useState(false);
  const [lastQuery, setLastQuery] = useState('');

  const handleSearch = (query) => {
    console.log('SearchPage: handleSearch called with query:', query);
    console.log('SearchPage: Current fallback status:', swapiService.isUsingFallback());
    
    if (query.trim()) {
      search(query);
      setHasSearched(true);
      setLastQuery(query);
    } else {
      clearSearch();
      setHasSearched(false);
      setLastQuery('');
    }
  };

  const handleRetry = () => {
    if (lastQuery) {
      search(lastQuery);
    }
  };

  const handleClearFallback = () => {
    swapiService.clearFallbackMode();
    if (lastQuery) {
      search(lastQuery);
    }
  };

  return (
    <div className="search-page">
      <div className="text-center mb-4">
        <h1 style={{ 
          color: 'white', 
          fontSize: '2.5rem', 
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          marginBottom: '0.5rem'
        }}>
          Search Characters
        </h1>
        <p style={{ 
          color: 'rgba(255,255,255,0.9)', 
          fontSize: '1.1rem',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Find your favorite Star Wars characters by name. 
          Search through the galaxy's most iconic heroes and villains.
        </p>
      </div>

      {/* Debug panel for testing */}
      <div className="card mb-3" style={{ background: '#f8f9fa', padding: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.875rem', color: '#666' }}>
            API Status: {swapiService.isUsingFallback() ? 'Demo Mode' : 'Live API'}
          </span>
          <button 
            onClick={() => {
              localStorage.setItem('useFallback', 'true');
              window.location.reload();
            }}
            style={{
              padding: '0.25rem 0.75rem',
              fontSize: '0.75rem',
              background: '#ffc107',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Force Demo Mode
          </button>
          <button 
            onClick={handleClearFallback}
            style={{
              padding: '0.25rem 0.75rem',
              fontSize: '0.75rem',
              background: '#28a745',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              color: 'white'
            }}
          >
            Try Live API
          </button>
        </div>
      </div>

      <div className="card mb-4">
        <SearchBar 
          onSearch={handleSearch}
          loading={loading}
          placeholder="Enter character name (e.g., Luke, Vader, Leia)..."
        />

        <div className="search-tips" style={{ 
          background: '#f8f9fa', 
          padding: '1rem', 
          borderRadius: '8px',
          marginTop: '1rem'
        }}>
          <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: '#333' }}>
            💡 Search Tips:
          </h4>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', color: '#666' }}>
            <li>Try searching for "Luke" to find Luke Skywalker</li>
            <li>Search "Vader" to find Darth Vader</li>
            <li>Use partial names like "Solo" or "Kenobi"</li>
            <li>Search is case-insensitive</li>
          </ul>
        </div>
      </div>

      {loading && (
        <LoadingSpinner message="Searching characters..." />
      )}

      {error && (
        <div className="mb-3">
          <ErrorMessage 
            message={error} 
            onRetry={handleRetry}
            showFallbackOption={true}
          />
          {swapiService.isUsingFallback() && (
            <div className="card mt-2" style={{ 
              background: '#e3f2fd', 
              border: '1px solid #2196f3',
              padding: '1rem'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                color: '#1976d2'
              }}>
                <span>ℹ️</span>
                <div>
                  <strong>Demo Mode Active</strong>
                  <div style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>
                    Showing sample data due to API connectivity issues.
                    <button 
                      onClick={handleClearFallback}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#1976d2',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        marginLeft: '0.5rem'
                      }}
                    >
                      Try API again
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {hasSearched && !loading && !error && (
        <>
          {data && data.results.length > 0 ? (
            <>
              <div className="results-info mb-3">
                <div className="card" style={{ padding: '1rem' }}>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>
                    Search Results
                  </h3>
                  <p style={{ margin: 0, color: '#666' }}>
                    Found {data.results.length} character{data.results.length !== 1 ? 's' : ''} 
                    {data.count > data.results.length && ` (showing first ${data.results.length} of ${data.count})`}
                  </p>
                </div>
              </div>

              <div className="grid grid-2">
                {data.results.map((character, index) => (
                  <CharacterCard 
                    key={character.url} 
                    character={character} 
                    index={index}
                  />
                ))}
              </div>

              {data.count > data.results.length && (
                <div className="card text-center mt-3">
                  <p style={{ margin: 0, color: '#666' }}>
                    ℹ️ Showing first {data.results.length} results. 
                    Try a more specific search term to narrow down results.
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="card text-center">
              <div style={{ padding: '2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                <h3 style={{ marginBottom: '1rem', color: '#333' }}>No Characters Found</h3>
                <p style={{ color: '#666', marginBottom: '1.5rem' }}>
                  We couldn't find any characters matching your search. 
                  Try a different name or check the spelling.
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    clearSearch();
                    setHasSearched(false);
                  }}
                >
                  Clear Search
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {!hasSearched && !loading && (
        <div className="card text-center">
          <div style={{ padding: '3rem' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌌</div>
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>
              Ready to Explore?
            </h3>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>
              Use the search bar above to find any Star Wars character. 
              Start typing a name and discover their story!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
