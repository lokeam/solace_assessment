import { useState, useEffect, useMemo } from 'react';

interface Advocate {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: string;
  createdAt: Date | null;
}

interface UseGetAdvocatesOptions {
  searchTerm?: string;
  selectedCredentials?: string[];
  selectedSpecialties?: string[];
  selectedExperience?: string  | undefined;
  sortBy?: string;
}

export function useGetAdvocates(options: UseGetAdvocatesOptions = {}) {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

   // Load data exactly once
   useEffect(() => {
    const fetchAdvocates = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/advocates?limit=15');
        const data = await response.json();
        setAdvocates(data.advocates || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    fetchAdvocates();
  }, []);

  // Computed filtered data
  const filteredAdvocates = useMemo(() => {

    console.log('🔍 Filtering with options:', options);
    return advocates.filter(advocate => {
      const matchesSearch = !options.searchTerm ||
        advocate.firstName.toLowerCase().includes(options.searchTerm.toLowerCase()) ||
        advocate.lastName.toLowerCase().includes(options.searchTerm.toLowerCase()) ||
        advocate.city.toLowerCase().includes(options.searchTerm.toLowerCase()) ||
        advocate.degree.toLowerCase().includes(options.searchTerm.toLowerCase()) ||
        advocate.specialties?.some(specialty =>
          specialty.toLowerCase().includes(options.searchTerm?.toLowerCase() || '')
        );

      const result = matchesSearch;
      console.log(`🔍 Advocate ${advocate.firstName}: matches=${result}`);

      return result;
    });
  }, [advocates, options]);


  return {
    advocates: filteredAdvocates,
    loading,
    error,
    refetch: () => {
      // Note: Maybe trigger refetch if needed?
    }
  };
}