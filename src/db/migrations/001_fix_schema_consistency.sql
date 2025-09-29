-- Rename payload column to specialties
ALTER TABLE advocates RENAME COLUMN payload TO specialties;

-- Change phone_number from bigint to text to avoid precision loss
ALTER TABLE advocates ALTER COLUMN phone_number TYPE text;