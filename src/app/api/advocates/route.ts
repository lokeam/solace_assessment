import db from "../../../db";
import { advocates } from "../../../db/schema";
import { sql, or, ilike, desc, asc, and, gte, lte, eq } from "drizzle-orm";
import { z } from 'zod';

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

function sanitizeSearch(input: string) {
  // Normalize, strip ctrl chars and escape wildcard chars used by ILIKE
  const normalized = input.normalize('NFKC').replace(/[\u0000-\u001F\u007F]/g, '');

  // Escape "%" and "_" to avoid wildcard abuse in LIKE and ILIKE
  const escaped = normalized.replace(/[%_]/g, ch => `\\${ch}`);

  // Enforce a max length of 100 chars
  return escaped.slice(0, 100);
}

// Filter params: credentials, specialties, experienceFilterControlsProps
const QuerySchema = z.object({
  q: z.string().optional().default(''),
  page: z.coerce.number().int().min(1).max(1000).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(15),
  sortBy: z.enum(['firstName', 'lastName', 'city', 'experience']).default('lastName'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
  credentials: z.string().optional().default(''),
  specialties: z.string().optional().default(''),
  experience: z.string().optional().default(''),
})

// Note: This current 2hr time-boxed implementation focuses more on functionality
// over architecture.
// In production, I'd refactor this into:
// - A separate validation layer
// - Service functions for query building
// - Targeted (structured) error handling w/ specific error types
export async function GET(request: Request): Promise<Response> {
  console.log('🔍 Raw URL:', request.url);

  try {
    // Pull out search params from URL
    const { searchParams } = new URL(request.url);
    console.log('🔍 All search params:', Object.fromEntries(searchParams.entries()));

    // Extract and validate query params
    const parsed = QuerySchema.safeParse({
      q: searchParams.get('q') ?? '',
      page: searchParams.get('page') ?? '1',
      limit: searchParams.get('limit') ?? '15',
      sortBy: searchParams.get('sortBy') ?? 'lastName',
      sortOrder: searchParams.get('sortOrder') ?? 'asc',
      credentials: searchParams.get('credentials') ?? '',
      specialties: searchParams.get('specialties') ?? '',
      experience: searchParams.get('experience') ?? '',
    });

    console.log('🔍 Zod parse result:', parsed.success);

    if (!parsed.success) {
      console.log('🔍 Zod errors:', parsed.error);
      return Response.json(
        { error: 'Invalid query parameters', details: parsed.error.flatten() },
        { status: 400 }
      );
    } else {
      console.log('🔍 Parsed data:', parsed.data);
    }

    // Pull out validated params
    const {
      q,
      page,
      limit,
      sortBy,
      sortOrder,
      credentials,
      specialties,
      experience,
    } = parsed.data;

    // Sanitize
    const sanitizedQuery = sanitizeSearch(q);

    // Build an array of search conditions
    const searchConditions = [];

    // Build params for pagination
    const currentPage = page;
    const resultsPerPage = limit;
    const offset = (currentPage - 1) * resultsPerPage;

    // Define the sort column
    const sortColumn = sortBy === 'firstName' ? advocates.firstName :
      sortBy === 'city' ? advocates.city :
      sortBy === 'experience' ? advocates.yearsOfExperience :
      advocates.lastName;

    // Initial text search
    if (sanitizedQuery) {
      // Search conditions with escaped wildcards
      const likeValue = `%${sanitizedQuery}%`;
      searchConditions.push(or(
        ilike(advocates.firstName, likeValue),
        ilike(advocates.lastName, likeValue),
        ilike(advocates.city, likeValue),
        ilike(advocates.degree, likeValue),
        sql`${advocates.specialties}::text ILIKE ${likeValue} ESCAPE '\\'`
      ));
    }

    // Credentials filter
    if (credentials) {
      console.log('🔍 Filtering by credentials:', credentials);
    }

    // Speciality filter - match exact for security
    if (specialties) {
      console.log('🔍 Filtering by specialties:', specialties);
    }

    // Experience filter
    if (experience) {
      console.log('🔍 Filtering by experience:', experience);
    }

    let baseQuery;
    let paginationTotalCountQuery;

    // Build queries based on whether or not we have a search-related one
    if (searchConditions.length > 0) {
      console.log('🔍 Search conditions:', searchConditions.length);
      console.log('🔍 Credentials param:', credentials);

      // Combine all the search conditions with AND clause
      const finalCondition = and(...searchConditions);

      // Build two queries with search: base and count
      baseQuery = db.select()
        .from(advocates)
        .where(finalCondition)
        .orderBy(sortOrder === 'desc' ? desc(sortColumn) : asc(sortColumn))
        .limit(resultsPerPage)
        .offset(offset);

      paginationTotalCountQuery = db.select({ count: sql<number>`count(*)` })
        .from(advocates)
        .where(finalCondition);
    } else {
      // Build queries without search
      baseQuery = db.select()
        .from(advocates)
        .orderBy(sortOrder === 'desc' ? desc(sortColumn) : asc(sortColumn))
        .limit(resultsPerPage)
        .offset(offset);

      paginationTotalCountQuery = db.select({ count: sql<number>`count(*)` })
        .from(advocates);
    }

    // Execute queries in parallel
    const [data, countResult] = await Promise.all([
      baseQuery,
      paginationTotalCountQuery
    ]);

    console.log('🔍 Query returned', data.length, 'results');
    console.log('🔍 First few results degrees:', data.slice(0, 5).map(a => a.degree));

    // Pull out count from db result
    const totalAdvocatesMatchingSearch = countResult[0]?.count || 0;
    const totalPages = Math.ceil(totalAdvocatesMatchingSearch / resultsPerPage);

    // Build pagination metadata for frontend
    const paginationInfo = {
      currentPage,
      resultsPerPage,
      totalRecords: totalAdvocatesMatchingSearch,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    };

    // Ensure data is in expected format; cast JSONB data to string[] and convert numbers to strings
    const transformedData: Advocate[] = data.map((advocate) => ({
      ...advocate,
      specialties: advocate.specialties as string[],
      phoneNumber: advocate.phoneNumber.toString(),
    }));

    const response: SearchResponse = {
      advocates: transformedData,
      pagination: paginationInfo,
      searchQuery: sanitizedQuery || null,
      sortBy,
      sortOrder
    }

    return Response.json(response);

  } catch(error) {
    console.error('Search API error: ', error);
    return Response.json(
      { error: 'Failed to search advocates' },
      { status: 500 }
    );
  }
}