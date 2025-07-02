import { useState, useEffect } from 'react';
import swapiService from '../services/swapiService';

export const usePeople = (page = 1) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await swapiService.getPeople(page);
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, [page]);

  return { data, loading, error };
};

export const usePerson = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Debug logging
        console.log('usePerson hook - fetching character with ID:', id, typeof id);
        
        const result = await swapiService.getPerson(id);
        setData(result);
      } catch (err) {
        console.error('usePerson hook - error:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Validate ID before making API call
    if (id && id !== 'undefined' && id !== 'null' && String(id).trim() !== '') {
      fetchPerson();
    } else {
      console.warn('usePerson hook - invalid ID provided:', id);
      setLoading(false);
      setError('Invalid character ID provided');
    }
  }, [id]);

  return { data, loading, error };
};

export const useSearch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (query) => {
    console.log('useSearch: search called with query:', query);
    
    if (!query.trim()) {
      setData(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log('useSearch: calling swapiService.searchPeople');
      const result = await swapiService.searchPeople(query);
      console.log('useSearch: received result:', result);
      setData(result);
    } catch (err) {
      console.error('Search error in hook:', err);
      setError(err.message || 'An error occurred while searching');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setData(null);
    setError(null);
  };

  return { data, loading, error, search, clearSearch };
};
