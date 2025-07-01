const ErrorMessage = ({ message, onRetry, showFallbackOption = false }) => {
  const enableFallback = () => {
    localStorage.setItem('useFallback', 'true');
    window.location.reload();
  };

  const isApiError = message?.includes('Network error') || 
                     message?.includes('SSL certificate') ||
                     message?.includes('Failed to fetch');

  return (
    <div className="error">
      <div style={{ marginBottom: '1rem' }}>
        <span className="error-icon">⚠️</span>
        {message}
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        {onRetry && (
          <button 
            className="btn btn-secondary" 
            onClick={onRetry}
            style={{ 
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white'
            }}
          >
            🔄 Try Again
          </button>
        )}
        
        {(showFallbackOption || isApiError) && (
          <button 
            className="btn btn-secondary" 
            onClick={enableFallback}
            style={{ 
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white'
            }}
          >
            📱 Use Demo Mode
          </button>
        )}
      </div>

      {(showFallbackOption || isApiError) && (
        <div style={{ 
          marginTop: '1rem', 
          fontSize: '0.875rem', 
          opacity: 0.9,
          textAlign: 'center'
        }}>
          Demo mode uses sample Star Wars data for testing purposes.
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
