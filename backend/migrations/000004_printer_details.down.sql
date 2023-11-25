BEGIN;

ALTER TABLE printer
DROP COLUMN image_url,
DROP COLUMN paper_sizes,
DROP COLUMN paper_count;

COMMIT;