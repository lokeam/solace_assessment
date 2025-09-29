import db from "@/db";
import { advocates } from "@/db/schema";
import { advocateData } from "@/db/seed/advocates";

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

interface PaginationInfo {
  currentPage: number;
  resultsPerPage: number;
  totalRecords: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface SearchResponse {
  advocates: Advocate[];
  pagination: PaginationInfo;
  searchQuery: string | null;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

// Note - thinking of modeling ui after yelp
// Will need search bar, pagination, sorting and filters
// Filters will be: credentials, specialities, years of experience
export async function GET(request: Request): Promise<Response> {
  try {
    // Pull off search params from URL

    // Extract + validate query params (zod?)

    // Sanitize

    // Build some sort of array of search conditions

    // Build params for pagination

    // Define the sort column

    // If we have a sanitized text query
      // Search conditions w/ escaped wildcards

    // If we we have credentials filter
      // Will probably need to do exact match

    // If we have speciality filter
      // Exact match for security

    // If we have experience filter

    // Build queries based on whether or not we have a search-related one

      // Combine all search conditions with AND clause

      // Build two queries with search: base and count (pagination)

    // Else build queries w/o search

    // Execute base + pagination query in parallel

    // Get count from db result

    // Build pagination info for frontend

    // Ensure data is in expected format; cast JSONB data to string, convert nums

    // Catch errors - time limit means testing will be done in console

    // Return response
  } catch(error) {

  }

  const data = advocateData;

  return Response.json({ data });
}
