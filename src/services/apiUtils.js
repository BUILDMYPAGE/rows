// Utility functions for debugging and testing API connectivity
export const testApiConnectivity = async () => {
  try {
    console.log('Testing SWAPI connectivity...');
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch('https://swapi.info/api/people/1', {
      signal: controller.signal,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ API test successful:', data.name);
      localStorage.setItem('apiWorking', 'true');
      localStorage.removeItem('useFallback');
      return { success: true, data };
    } else {
      console.log('❌ API test failed with status:', response.status);
      return { success: false, error: `HTTP ${response.status}` };
    }
  } catch (error) {
    console.log('❌ API test failed with error:', error.message);
    
    if (error.name === 'AbortError') {
      return { success: false, error: 'Request timeout' };
    } else if (error.message.includes('network')) {
      return { success: false, error: 'Network error' };
    } else {
      return { success: false, error: error.message };
    }
  }
};

export const getApiStatus = () => {
  const apiWorking = localStorage.getItem('apiWorking');
  const useFallback = localStorage.getItem('useFallback');
  
  return {
    isApiWorking: apiWorking === 'true',
    isUsingFallback: useFallback === 'true',
    status: useFallback === 'true' ? 'fallback' : 
           apiWorking === 'true' ? 'online' : 'unknown'
  };
};

export const enableFallbackMode = () => {
  localStorage.setItem('useFallback', 'true');
  localStorage.setItem('apiWorking', 'false');
  console.log('🔄 Fallback mode enabled');
};

export const disableFallbackMode = () => {
  localStorage.removeItem('useFallback');
  localStorage.removeItem('apiWorking');
  console.log('🔄 Fallback mode disabled, will retry API');
};

export default {
  testApiConnectivity,
  getApiStatus,
  enableFallbackMode,
  disableFallbackMode
};
