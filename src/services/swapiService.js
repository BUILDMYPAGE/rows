import axios from 'axios';
import { mockCharacters, mockCharacterDetails } from './mockData.js';

const BASE_URL = 'https://swapi.info/api';

// Dynamic fallback check function
const shouldUseFallback = () => {
  return localStorage.getItem('useFallback') === 'true';
};

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000, // Increased timeout
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
api.interceptors.response.use(
  (response) => {
    console.log('Response received:', response.status, response.config.url);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('Response error:', {
        status: error.response.status,
        statusText: error.response.statusText,
        url: error.config.url,
        data: error.response.data
      });
      
      // Handle specific redirect cases
      if (error.response.status === 308) {
        const location = error.response.headers.location || error.response.headers.Location;
        console.error('308 Permanent Redirect detected!', {
          originalUrl: error.config.url,
          redirectTo: location,
          suggestion: 'Remove trailing slash from API endpoints'
        });
      }
    } else {
      console.error('Response error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const swapiService = {
  // Utility function to clear fallback mode and test API
  clearFallbackMode: () => {
    localStorage.removeItem('useFallback');
    localStorage.removeItem('apiWorking');
    console.log('✅ Fallback mode cleared - API will be tested again on next request');
  },

  // Force a fresh API test
  forceApiTest: async () => {
    localStorage.removeItem('useFallback');
    localStorage.removeItem('apiWorking');
    console.log('Testing API connectivity...');
    const isWorking = await swapiService.testApiConnectivity();
    console.log(isWorking ? '✅ API is working!' : '❌ API is not responding');
    return isWorking;
  },

  // Debug function to reset everything and test
  debugReset: () => {
    localStorage.clear();
    console.log('🔄 All localStorage cleared');
    console.log('🔍 Current fallback status:', swapiService.isUsingFallback());
    console.log('📡 Ready to test API fresh');
    return 'Reset complete - refresh the page to test';
  },

  // Get all available character IDs
  getAvailableCharacterIds: async () => {
    try {
      const response = await api.get(`/people`);
      const availableIds = response.data
        .map(c => c.url.match(/\/people\/(\d+)\/?$/))
        .filter(match => match)
        .map(match => Number(match[1]))
        .sort((a, b) => a - b);
      
      console.log('Available character IDs:', availableIds);
      return availableIds;
    } catch (error) {
      console.error('Error fetching available IDs:', error);
      // Return fallback IDs
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    }
  },

  // Test API connectivity
  testApiConnectivity: async () => {
    try {
      const response = await api.get('/people/1');
      localStorage.setItem('apiWorking', 'true');
      return true;
    } catch (error) {
      localStorage.setItem('apiWorking', 'false');
      return false;
    }
  },

  // Get current fallback status
  isUsingFallback: () => {
    return shouldUseFallback();
  },

  // Get all people with pagination
  getPeople: async (page = 1) => {
    // Use fallback data if enabled
    if (shouldUseFallback()) {
      console.log('Using fallback data for characters');
      return new Promise(resolve => {
        setTimeout(() => resolve(mockCharacters), 500); // Simulate loading
      });
    }

    try {
      console.log(`Fetching characters from: ${BASE_URL}/people`);
      const response = await api.get(`/people`);
      console.log('Characters fetched successfully:', response.data);
      
      // Store successful response flag
      localStorage.setItem('apiWorking', 'true');
      
      // Transform the array response to match expected pagination format
      const allCharacters = response.data;
      const itemsPerPage = 10;
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const pageCharacters = allCharacters.slice(startIndex, endIndex);
      
      const transformedData = {
        count: allCharacters.length,
        next: endIndex < allCharacters.length ? `page=${page + 1}` : null,
        previous: page > 1 ? `page=${page - 1}` : null,
        results: pageCharacters
      };
      
      console.log(`Returning page ${page} with ${pageCharacters.length} characters`);
      return transformedData;
    } catch (error) {
      console.error('Error fetching characters:', error);
      
      // Enable fallback for future requests
      localStorage.setItem('useFallback', 'true');
      localStorage.setItem('apiWorking', 'false');
      
      // Handle specific error types
      if (error.code === 'ERR_NETWORK') {
        console.warn('Network error detected, using fallback data');
        return mockCharacters;
      } else if (error.code === 'ECONNABORTED') {
        console.warn('Request timeout, using fallback data');
        return mockCharacters;
      } else if (error.response?.status === 404) {
        throw new Error('Characters not found on this page.');
      } else if (error.response?.status >= 500) {
        console.warn('Server error, using fallback data');
        return mockCharacters;
      } else if (error.response?.status === 429) {
        throw new Error('Too many requests: Please wait a moment before trying again.');
      } else {
        console.warn('API error, using fallback data:', error.message);
        return mockCharacters;
      }
    }
  },

  // Get a specific person by ID
  getPerson: async (id) => {
    // Validate ID parameter
    if (!id || id === 'undefined' || id === 'null' || String(id).trim() === '') {
      console.error('getPerson called with invalid ID:', id);
      throw new Error('Invalid character ID provided. Please provide a valid character ID.');
    }
    
    // Convert to string and trim for consistency
    id = String(id).trim();
    
    // Use fallback data if enabled
    if (shouldUseFallback()) {
      console.log(`Using fallback data for character ${id}`);
      const character = mockCharacterDetails[id] || mockCharacters.results.find(c => {
        const characterId = c.url.match(/\/people\/(\d+)\/?$/);
        return characterId && characterId[1] === String(id);
      });
      if (character) {
        return new Promise(resolve => {
          setTimeout(() => resolve(character), 300);
        });
      } else {
        throw new Error(`Character with ID ${id} not found in fallback data`);
      }
    }

    try {
      console.log(`Fetching character ${id} from: ${BASE_URL}/people/${id}`);
      const response = await api.get(`/people/${id}`);
      console.log('Character fetched successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching individual character:', error);
      
      // If it's a 404, the character simply doesn't exist
      if (error.response?.status === 404) {
        console.log(`Character with ID ${id} returned 404 - this ID doesn't exist`);
        throw new Error(`Character with ID ${id} does not exist. This character ID is not available in the API.`);
      }
      
      console.log(`Individual endpoint failed for ID ${id}, trying full list...`);
      
      // If individual endpoint fails, try to get from the full list
      try {
        console.log('Fetching all characters to find by ID...');
        const allResponse = await api.get(`/people`);
        console.log(`Got ${allResponse.data.length} characters, looking for ID ${id}`);
        
        // Log some URLs for debugging
        if (allResponse.data.length > 0) {
          console.log('Sample URLs from API:', allResponse.data.slice(0, 3).map(c => ({ name: c.name, url: c.url })));
        }
        
        const character = allResponse.data.find(c => {
          // More robust URL matching
          const characterId = c.url.match(/\/people\/(\d+)\/?$/);
          const urlMatches = characterId && characterId[1] === String(id);
          
          if (urlMatches) {
            console.log(`✅ Found character by URL match: ${c.name} with URL: ${c.url}`);
          }
          return urlMatches;
        });
        
        if (character) {
          console.log('✅ Character found in full list:', character.name);
          return character;
        } else {
          // List available character IDs for debugging
          const availableIds = allResponse.data
            .map(c => c.url.match(/\/people\/(\d+)\/?$/))
            .filter(match => match)
            .map(match => match[1])
            .sort((a, b) => Number(a) - Number(b));
          
          console.log(`❌ Character with ID ${id} not found. Available IDs:`, availableIds.slice(0, 10), '...');
          throw new Error(`Character with ID ${id} does not exist. This character ID is not available in the API.`);
        }
      } catch (listError) {
        console.error('Error fetching from full list:', listError);
        
        // Try fallback data
        const character = mockCharacterDetails[id] || mockCharacters.results.find(c => {
          const characterId = c.url.match(/\/people\/(\d+)\/?$/);
          return characterId && characterId[1] === String(id);
        });
        if (character) {
          console.warn('Using fallback data for character');
          return character;
        }
        
        if (error.response?.status === 404) {
          throw new Error('Character not found');
        } else if (error.response?.status >= 500) {
          throw new Error('Server error: Please try again later');
        } else {
          throw new Error(`Failed to fetch character details: ${error.message}`);
        }
      }
    }
  },

  // Search people by name
  searchPeople: async (query) => {
    // Use fallback data if enabled
    if (shouldUseFallback()) {
      console.log(`Using fallback data for search: ${query}`);
      const filteredResults = mockCharacters.results.filter(character =>
        character.name.toLowerCase().includes(query.toLowerCase())
      );
      
      const searchResult = {
        count: filteredResults.length,
        next: null,
        previous: null,
        results: filteredResults
      };
      
      return new Promise(resolve => {
        setTimeout(() => resolve(searchResult), 300);
      });
    }

    try {
      console.log(`Searching characters: ${query}`);
      
      // Fetch all characters first since this API doesn't support search
      const response = await api.get(`/people`);
      console.log('All characters fetched for search:', response.data.length);
      
      // Filter locally
      const allCharacters = response.data;
      const filteredResults = allCharacters.filter(character =>
        character.name.toLowerCase().includes(query.toLowerCase())
      );
      
      const searchResult = {
        count: filteredResults.length,
        next: null,
        previous: null,
        results: filteredResults
      };
      
      console.log('Search results:', searchResult);
      
      // Store successful response flag
      localStorage.setItem('apiWorking', 'true');
      return searchResult;
    } catch (error) {
      console.error('Error searching characters:', error);
      
      // Enable fallback for future requests
      localStorage.setItem('useFallback', 'true');
      localStorage.setItem('apiWorking', 'false');
      
      // Always return fallback data for search errors
      const filteredResults = mockCharacters.results.filter(character =>
        character.name.toLowerCase().includes(query.toLowerCase())
      );
      
      const fallbackResult = {
        count: filteredResults.length,
        next: null,
        previous: null,
        results: filteredResults
      };
      
      // Log the fallback usage
      console.warn('API error during search, using fallback data:', error.message);
      
      return fallbackResult;
    }
  },

  // Get additional details like planets, species, etc.
  getResource: async (url) => {
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch resource');
    }
  },
};

export default swapiService;
