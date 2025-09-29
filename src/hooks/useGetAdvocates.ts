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

      const matchesCredential = !options.selectedCredentials?.length ||
        options.selectedCredentials.includes(advocate.degree);

      const matchesSpecialty = !options.selectedSpecialties?.length ||
        options.selectedSpecialties.some(spec => advocate.specialties?.includes(spec));

      const matchesExperience = !options.selectedExperience || (() => {
        const experience = advocate.yearsOfExperience;
        console.log(`🔍 Advocate ${advocate.firstName}: experience=${experience}, selected=${options.selectedExperience}`);

        switch (options.selectedExperience) {
          case '1-3':
            return experience >= 1 && experience <= 3;
          case '4-8':
            return experience >= 4 && experience <= 8;
          case '8+':
            return experience >= 8;
          default:
            return true;
        }
      })();

      const result = matchesSearch && matchesCredential && matchesSpecialty && matchesExperience;
      console.log(`🔍 Advocate ${advocate.firstName}: matches=${result}`);

      return result;
    });
  }, [advocates, options]);


  return {
    advocates: filteredAdvocates,
    loading,
    error,
    refetch: () => {
      // Trigger refetch if needed
    }
  };
}