import { useState, useCallback, useMemo } from 'react';

interface UseAdvocateFiltersReturn {
  // Search state
  searchTerm: string;
  setSearchTerm: (term: string) => void;

  // Filter state
  selectedCredentials: string[];
  selectedSpecialties: string[];
  selectedExperience: string;

  // Filter setters
  setSelectedCredentials: (credentials: string[]) => void;
  setSelectedSpecialties: (specialties: string[]) => void;
  setSelectedExperience: (experience: string) => void;

  // Reset function
  resetAllFilters: () => void;

  // Active filters summary
  activeFiltersText: string | null;
}

export function useAdvocateFilters(): UseAdvocateFiltersReturn {
  // Search state
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filter state
  const [selectedCredentials, setSelectedCredentials] = useState<string[]>([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string>('');

  // Reset all filters to initial state
  const resetAllFilters = useCallback(() => {
    setSearchTerm('');
    setSelectedCredentials([]);
    setSelectedSpecialties([]);
    setSelectedExperience('');
  }, []);

  // Generate active filters text (memoized for performance)
  const activeFiltersText = useMemo(() => {
    const activeFilters = [];

    if (searchTerm) {
      activeFilters.push(`"${searchTerm}"`);
    }

    if (selectedCredentials.length > 0) {
      activeFilters.push(`${selectedCredentials.join(', ')} credentials`);
    }

    if (selectedSpecialties.length > 0) {
      const specialtyText = selectedSpecialties.length === 1
        ? selectedSpecialties[0]
        : `${selectedSpecialties.length} specialties`;
      activeFilters.push(specialtyText);
    }

    if (selectedExperience) {
      activeFilters.push(`${selectedExperience} years experience`);
    }

    if (activeFilters.length === 0) return null;

    if (activeFilters.length === 1) {
      return `Showing search results for ${activeFilters[0]}`;
    }

    const lastFilter = activeFilters.pop();
    return `Showing search results for ${activeFilters.join(', ')} and ${lastFilter}`;
  }, [searchTerm, selectedCredentials, selectedSpecialties, selectedExperience]);

  return {
    // Search
    searchTerm,
    setSearchTerm,

    // Filters
    selectedCredentials,
    selectedSpecialties,
    selectedExperience,
    setSelectedCredentials,
    setSelectedSpecialties,
    setSelectedExperience,

    // Reset
    resetAllFilters,

    // Search Summary
    activeFiltersText,
  };
}