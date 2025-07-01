import { useState } from 'react';
import { usePeople } from '../hooks/useSWAPI';
import CharacterCard from '../components/CharacterCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import Pagination from '../components/Pagination';

const CharacterList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loading, error } = usePeople(currentPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetry = () => {
    window.location.reload();
  };

  if (loading && !data) {
    return <LoadingSpinner message="Loading Star Wars characters..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={handleRetry} showFallbackOption={true} />;
  }

  if (!data || !data.results) {
    return <ErrorMessage message="No data available" onRetry={handleRetry} />;
  }

  const totalPages = Math.ceil(data.count / 10);

  return (
    <div className="character-list-page">
      <div className="text-center mb-4">
        <h1 style={{ 
          color: 'white', 
          fontSize: '2.5rem', 
          fontWeight: 'bold',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          marginBottom: '0.5rem'
        }}>
          Star Wars Characters
        </h1>
        <p style={{ 
          color: 'rgba(255,255,255,0.9)', 
          fontSize: '1.1rem',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          Discover the iconic characters from a galaxy far, far away. 
          Explore their stories, stats, and details from the Star Wars universe.
        </p>
      </div>

      {data.results.length === 0 ? (
        <div className="card text-center">
          <h3>No characters found</h3>
          <p>Try adjusting your search criteria or check back later.</p>
        </div>
      ) : (
        <>
          <div className="results-info mb-3 text-center">
            <p style={{ color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}>
              Showing {data.results.length} of {data.count} characters
            </p>
          </div>

          <div className="grid grid-2">
            {data.results.map((character, index) => (
              <CharacterCard 
                key={character.url} 
                character={character} 
                index={(currentPage - 1) * 10 + index}
              />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            loading={loading}
          />
        </>
      )}
    </div>
  );
};

export default CharacterList;
