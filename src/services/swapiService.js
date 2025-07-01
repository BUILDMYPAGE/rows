import axios from 'axios';
import { mockCharacters, mockCharacterDetails } from './mockData.js';

const BASE_URL = 'https://swapi.dev/api';

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
    console.log('Response received:', response.status);
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    return Promise.reject(error);
  }
);

export const swapiService = {
  // Utility function to clear fallback mode and test API
  clearFallbackMode: () => {
    localStorage.removeItem('useFallback');
    localStorage.removeItem('apiWorking');
    console.log('Fallback mode cleared');
  },

  // Test API connectivity
  testApiConnectivity: async () => {
    try {
      const response = await api.get('/people/1/');
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
      console.log(`Fetching characters from: ${BASE_URL}/people/?page=${page}`);
      const response = await api.get(`/people/?page=${page}`);
      console.log('Characters fetched successfully:', response.data);
      
      // Store successful response flag
      localStorage.setItem('apiWorking', 'true');
      return response.data;
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
    // Use fallback data if enabled
    if (shouldUseFallback()) {
      console.log(`Using fallback data for character ${id}`);
      const character = mockCharacterDetails[id] || mockCharacters.results.find(c => c.url.includes(`/${id}/`));
      if (character) {
        return new Promise(resolve => {
          setTimeout(() => resolve(character), 300);
        });
      } else {
        throw new Error('Character not found in fallback data');
      }
    }

    try {
      console.log(`Fetching character ${id} from: ${BASE_URL}/people/${id}/`);
      const response = await api.get(`/people/${id}/`);
      console.log('Character fetched successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching character:', error);
      
      // Try fallback data
      const character = mockCharacterDetails[id] || mockCharacters.results.find(c => c.url.includes(`/${id}/`));
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
      const response = await api.get(`/people/?search=${encodeURIComponent(query)}`);
      console.log('Search results:', response.data);
      
      // Store successful response flag
      localStorage.setItem('apiWorking', 'true');
      return response.data;
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
