import { Link } from 'react-router-dom';

const CharacterCard = ({ character, index }) => {
  // Extract ID from the character URL
  const getId = (url) => {
    // Handle both formats: /people/1/ and /people/1
    const matches = url.match(/\/people\/(\d+)\/?$/);
    const id = matches ? matches[1] : null;
    
    // Debug logging
    if (!id) {
      console.warn('Could not extract ID from URL:', url);
    } else {
      console.log('Extracted ID:', id, 'from URL:', url);
    }
    
    return id;
  };

  const characterId = getId(character.url);

  return (
    <div className="card">
      <div className="d-flex justify-between align-center mb-2">
        <h3 style={{ color: '#333', fontSize: '1.25rem', fontWeight: '600' }}>
          {character.name}
        </h3>
        <span style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
          color: 'white', 
          padding: '0.25rem 0.75rem', 
          borderRadius: '20px', 
          fontSize: '0.875rem',
          fontWeight: '600'
        }}>
          #{index + 1}
        </span>
      </div>
      
      <div className="character-info mb-3">
        <div className="info-row mb-1">
          <span style={{ fontWeight: '600', color: '#666' }}>Birth Year:</span>
          <span style={{ marginLeft: '0.5rem' }}>{character.birth_year}</span>
        </div>
        <div className="info-row mb-1">
          <span style={{ fontWeight: '600', color: '#666' }}>Gender:</span>
          <span style={{ marginLeft: '0.5rem' }}>{character.gender}</span>
        </div>
        <div className="info-row mb-1">
          <span style={{ fontWeight: '600', color: '#666' }}>Height:</span>
          <span style={{ marginLeft: '0.5rem' }}>
            {character.height === 'unknown' ? 'Unknown' : `${character.height} cm`}
          </span>
        </div>
        <div className="info-row">
          <span style={{ fontWeight: '600', color: '#666' }}>Mass:</span>
          <span style={{ marginLeft: '0.5rem' }}>
            {character.mass === 'unknown' ? 'Unknown' : `${character.mass} kg`}
          </span>
        </div>
      </div>

      <Link 
        to={characterId ? `/character/${characterId}` : '#'}
        className={`btn btn-primary ${!characterId ? 'disabled' : ''}`}
        style={{ 
          textDecoration: 'none',
          opacity: characterId ? 1 : 0.5,
          pointerEvents: characterId ? 'auto' : 'none'
        }}
        onClick={!characterId ? (e) => e.preventDefault() : undefined}
      >
        {characterId ? 'View Details' : 'Invalid Character'}
      </Link>
    </div>
  );
};

export default CharacterCard;
