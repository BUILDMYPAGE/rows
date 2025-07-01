import { useState, useEffect } from 'react';

const ApiNotification = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [isUsingFallback, setIsUsingFallback] = useState(false);

  useEffect(() => {
    const checkApiStatus = () => {
      const useFallback = localStorage.getItem('useFallback') === 'true';
      const apiWorking = localStorage.getItem('apiWorking') === 'true';
      
      setIsUsingFallback(useFallback);
      setShowNotification(useFallback || !apiWorking);
    };

    checkApiStatus();
    
    // Check periodically
    const interval = setInterval(checkApiStatus, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleRetryApi = () => {
    localStorage.removeItem('useFallback');
    localStorage.removeItem('apiWorking');
    window.location.reload();
  };

  const handleDismiss = () => {
    setShowNotification(false);
  };

  if (!showNotification) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '80px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: isUsingFallback ? 
        'linear-gradient(135deg, #ffc107 0%, #ff9800 100%)' : 
        'linear-gradient(135deg, #17a2b8 0%, #007bff 100%)',
      color: 'white',
      padding: '1rem 2rem',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 1000,
      maxWidth: '600px',
      textAlign: 'center',
      margin: '0 20px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <strong>
            {isUsingFallback ? '⚠️ Demo Mode Active' : 'ℹ️ API Notice'}
          </strong>
          <div style={{ fontSize: '0.9rem', marginTop: '0.25rem' }}>
            {isUsingFallback ? 
              'Using sample data due to API connectivity issues.' :
              'The Star Wars API may have connectivity issues.'
            }
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={handleRetryApi}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}
          >
            Retry API
          </button>
          <button
            onClick={handleDismiss}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              padding: '0.5rem',
              cursor: 'pointer',
              fontSize: '1.2rem',
              lineHeight: 1
            }}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApiNotification;
