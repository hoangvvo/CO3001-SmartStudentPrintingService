BEGIN;

CREATE TYPE user_role as ENUM (
  'admin',
  'spso',
  'student'
);

ALTER TABLE app_user
ADD role user_role NOT NULL DEFAULT 'student';

COMMIT;
