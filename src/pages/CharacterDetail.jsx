import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { usePerson } from '../hooks/useSWAPI';
import swapiService from '../services/swapiService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const CharacterDetail = () => {
  const { id } = useParams();
  const { data: character, loading, error } = usePerson(id);
  const [additionalData, setAdditionalData] = useState({
    homeworld: null,
    species: [],
    films: [],
    vehicles: [],
    starships: []
  });
  const [loadingAdditional, setLoadingAdditional] = useState(false);

  useEffect(() => {
    const fetchAdditionalData = async () => {
      if (!character) return;

      setLoadingAdditional(true);
      try {
        const promises = {
          homeworld: character.homeworld ? swapiService.getResource(character.homeworld) : null,
          species: Promise.all(character.species.map(url => swapiService.getResource(url))),
          films: Promise.all(character.films.slice(0, 3).map(url => swapiService.getResource(url))), // Limit to first 3
          vehicles: Promise.all(character.vehicles.slice(0, 3).map(url => swapiService.getResource(url))),
          starships: Promise.all(character.starships.slice(0, 3).map(url => swapiService.getResource(url)))
        };

        const results = await Promise.allSettled([
          promises.homeworld,
          promises.species,
          promises.films,
          promises.vehicles,
          promises.starships
        ]);

        setAdditionalData({
          homeworld: results[0].status === 'fulfilled' ? results[0].value : null,
          species: results[1].status === 'fulfilled' ? results[1].value : [],
          films: results[2].status === 'fulfilled' ? results[2].value : [],
          vehicles: results[3].status === 'fulfilled' ? results[3].value : [],
          starships: results[4].status === 'fulfilled' ? results[4].value : []
        });
      } catch (err) {
        console.warn('Failed to fetch additional data:', err);
      } finally {
        setLoadingAdditional(false);
      }
    };

    fetchAdditionalData();
  }, [character]);

  if (loading) {
    return <LoadingSpinner message="Loading character details..." />;
  }

  if (error) {
    return (
      <div>
        <ErrorMessage message={error} />
        <div className="text-center mt-3">
          <Link to="/" className="btn btn-primary">
            ← Back to Characters
          </Link>
        </div>
      </div>
    );
  }

  if (!character) {
    return (
      <div>
        <ErrorMessage message="Character not found" />
        <div className="text-center mt-3">
          <Link to="/" className="btn btn-primary">
            ← Back to Characters
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="character-detail-page">
      <div className="mb-3">
        <Link to="/" className="btn btn-secondary">
          ← Back to Characters
        </Link>
      </div>

      <div className="card">
        <div className="text-center mb-4">
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold',
            color: '#333',
            marginBottom: '0.5rem'
          }}>
            {character.name}
          </h1>
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '25px',
            display: 'inline-block',
            fontWeight: '600'
          }}>
            Star Wars Character
          </div>
        </div>

        <div className="grid grid-2 mb-4">
          <div className="character-basic-info">
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>Basic Information</h3>
            <div className="info-list">
              <div className="info-item mb-2">
                <strong>Birth Year:</strong> {character.birth_year}
              </div>
              <div className="info-item mb-2">
                <strong>Gender:</strong> {character.gender}
              </div>
              <div className="info-item mb-2">
                <strong>Height:</strong> {character.height === 'unknown' ? 'Unknown' : `${character.height} cm`}
              </div>
              <div className="info-item mb-2">
                <strong>Mass:</strong> {character.mass === 'unknown' ? 'Unknown' : `${character.mass} kg`}
              </div>
              <div className="info-item mb-2">
                <strong>Hair Color:</strong> {character.hair_color}
              </div>
              <div className="info-item mb-2">
                <strong>Skin Color:</strong> {character.skin_color}
              </div>
              <div className="info-item">
                <strong>Eye Color:</strong> {character.eye_color}
              </div>
            </div>
          </div>

          <div className="character-additional-info">
            <h3 style={{ color: '#333', marginBottom: '1rem' }}>Additional Details</h3>
            {loadingAdditional ? (
              <div style={{ textAlign: 'center', padding: '1rem' }}>
                <div className="spinner" style={{ width: '24px', height: '24px' }}></div>
                <p style={{ marginTop: '0.5rem', color: '#666' }}>Loading details...</p>
              </div>
            ) : (
              <div className="additional-info">
                {additionalData.homeworld && (
                  <div className="info-item mb-3">
                    <strong>Homeworld:</strong>
                    <div style={{ 
                      marginTop: '0.5rem', 
                      padding: '0.75rem', 
                      background: '#f8f9fa', 
                      borderRadius: '6px' 
                    }}>
                      <div><strong>{additionalData.homeworld.name}</strong></div>
                      <div style={{ fontSize: '0.875rem', color: '#666' }}>
                        Climate: {additionalData.homeworld.climate} | 
                        Terrain: {additionalData.homeworld.terrain}
                      </div>
                    </div>
                  </div>
                )}

                {additionalData.species.length > 0 && (
                  <div className="info-item mb-3">
                    <strong>Species:</strong>
                    <div style={{ marginTop: '0.5rem' }}>
                      {additionalData.species.map((species, index) => (
                        <span 
                          key={index}
                          style={{
                            display: 'inline-block',
                            background: '#667eea',
                            color: 'white',
                            padding: '0.25rem 0.75rem',
                            borderRadius: '15px',
                            fontSize: '0.875rem',
                            marginRight: '0.5rem',
                            marginBottom: '0.5rem'
                          }}
                        >
                          {species.name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {!loadingAdditional && (
          <div className="character-media">
            {additionalData.films.length > 0 && (
              <div className="mb-4">
                <h3 style={{ color: '#333', marginBottom: '1rem' }}>Featured Films</h3>
                <div className="grid grid-3">
                  {additionalData.films.map((film, index) => (
                    <div 
                      key={index}
                      className="card"
                      style={{ margin: 0, padding: '1rem' }}
                    >
                      <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{film.title}</h4>
                      <p style={{ fontSize: '0.875rem', color: '#666', margin: 0 }}>
                        Episode {film.episode_id} • {film.release_date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-2">
              {additionalData.vehicles.length > 0 && (
                <div>
                  <h3 style={{ color: '#333', marginBottom: '1rem' }}>Vehicles</h3>
                  <div className="vehicle-list">
                    {additionalData.vehicles.map((vehicle, index) => (
                      <div 
                        key={index}
                        style={{
                          padding: '0.75rem',
                          background: '#f8f9fa',
                          borderRadius: '6px',
                          marginBottom: '0.5rem'
                        }}
                      >
                        <strong>{vehicle.name}</strong>
                        <div style={{ fontSize: '0.875rem', color: '#666' }}>
                          {vehicle.model}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {additionalData.starships.length > 0 && (
                <div>
                  <h3 style={{ color: '#333', marginBottom: '1rem' }}>Starships</h3>
                  <div className="starship-list">
                    {additionalData.starships.map((starship, index) => (
                      <div 
                        key={index}
                        style={{
                          padding: '0.75rem',
                          background: '#f8f9fa',
                          borderRadius: '6px',
                          marginBottom: '0.5rem'
                        }}
                      >
                        <strong>{starship.name}</strong>
                        <div style={{ fontSize: '0.875rem', color: '#666' }}>
                          {starship.model}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterDetail;
