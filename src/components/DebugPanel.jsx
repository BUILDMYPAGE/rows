import { useState, useEffect } from 'react';
import { testApiConnectivity, getApiStatus } from '../services/apiUtils';

const DebugPanel = () => {
  const [status, setStatus] = useState('checking');
  const [apiResult, setApiResult] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const checkApi = async () => {
      setStatus('testing');
      const result = await testApiConnectivity();
      setApiResult(result);
      setStatus(result.success ? 'success' : 'failed');
    };

    checkApi();
  }, []);

  const currentStatus = getApiStatus();

  if (!expanded) {
    return (
      <div style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: '#333',
        color: 'white',
        padding: '0.5rem',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '0.875rem',
        zIndex: 1000
      }} onClick={() => setExpanded(true)}>
        🔧 Debug
      </div>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: '#333',
      color: 'white',
      padding: '1rem',
      borderRadius: '8px',
      minWidth: '300px',
      fontSize: '0.875rem',
      zIndex: 1000,
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h4 style={{ margin: 0 }}>🔧 Debug Panel</h4>
        <button 
          onClick={() => setExpanded(false)}
          style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
        >
          ×
        </button>
      </div>

      <div style={{ marginBottom: '0.5rem' }}>
        <strong>API Test Status:</strong> 
        <span style={{ 
          color: status === 'success' ? '#4caf50' : 
                status === 'failed' ? '#f44336' : '#ff9800',
          marginLeft: '0.5rem'
        }}>
          {status === 'checking' ? '🔄 Checking...' :
           status === 'testing' ? '⏳ Testing...' :
           status === 'success' ? '✅ Success' : '❌ Failed'}
        </span>
      </div>

      <div style={{ marginBottom: '0.5rem' }}>
        <strong>Current Mode:</strong> 
        <span style={{ marginLeft: '0.5rem' }}>
          {currentStatus.isUsingFallback ? '📱 Fallback' : '🌐 Live API'}
        </span>
      </div>

      {apiResult && !apiResult.success && (
        <div style={{ marginBottom: '0.5rem' }}>
          <strong>Error:</strong> 
          <span style={{ marginLeft: '0.5rem', color: '#f44336' }}>
            {apiResult.error}
          </span>
        </div>
      )}

      {apiResult && apiResult.success && (
        <div style={{ marginBottom: '0.5rem' }}>
          <strong>Test Character:</strong> 
          <span style={{ marginLeft: '0.5rem', color: '#4caf50' }}>
            {apiResult.data?.name}
          </span>
        </div>
      )}

      <div style={{ fontSize: '0.75rem', opacity: 0.7, marginTop: '0.5rem' }}>
        This debug panel helps identify API connectivity issues.
      </div>
    </div>
  );
};

export default DebugPanel;
