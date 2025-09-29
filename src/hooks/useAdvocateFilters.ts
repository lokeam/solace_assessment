import { useState, useCallback } from 'react';

interface UseAdvocateFiltersReturn {
  // Search state
  searchTerm: string;
  setSearchTerm: (term: string) => void;

  // Reset function
  resetAllFilters: () => void;
}

export function useAdvocateFilters(): UseAdvocateFiltersReturn {
  // Search state
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Reset all filters to initial state
  const resetAllFilters = useCallback(() => {
    setSearchTerm('');
  }, []);

  return {
    // Search
    searchTerm,
    setSearchTerm,

    // Reset search + all filters
    resetAllFilters,
  };
}