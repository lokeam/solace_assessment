-- Indexes for exact matches and sorting
CREATE INDEX idx_advocates_first_name ON advocates (first_name);
CREATE INDEX idx_advocates_last_name ON advocates (last_name);
CREATE INDEX idx_advocates_city ON advocates (city);
CREATE INDEX idx_advocates_degree ON advocates (degree);

-- Case-insensitive indexes for ILIKE searches (important for search performance)
CREATE INDEX idx_advocates_first_name_lower ON advocates (LOWER(first_name));
CREATE INDEX idx_advocates_last_name_lower ON advocates (LOWER(last_name));
CREATE INDEX idx_advocates_city_lower ON advocates (LOWER(city));
CREATE INDEX idx_advocatesDegree_lower ON advocates (LOWER(degree));

-- GIN index for JSONB specialties array searching
CREATE INDEX idx_advocates_specialties ON advocates USING gin (specialties);

-- Multi-column index for pagination performance (id + common sort fields)
CREATE INDEX idx_advocates_pagination ON advocates (id, last_name, first_name);

-- Index for years of experience (for sorting/filtering)
CREATE INDEX idx_advocates_experience ON advocates (years_of_experience);