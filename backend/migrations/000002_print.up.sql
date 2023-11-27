BEGIN;

CREATE TABLE printer (
  id SERIAL PRIMARY KEY,
  brand_name VARCHAR(255) NULL,
  model_name VARCHAR(255) NULL,
  capabilities VARCHAR[] NOT NULL,
  location VARCHAR(255) NOT NULL,
  is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  printer_address VARCHAR(255) NOT NULL -- ipp://printer.example.com/ipp/print or http://printer.example.com:631/ipp/print
);

CREATE TABLE user_file (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES app_user(id),
  file_name VARCHAR(255) NOT NULL,
  file_size INTEGER NOT NULL,
  file_type VARCHAR(255) NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TYPE job_status AS ENUM ('pending', 'printing', 'completed', 'failed');

CREATE TYPE print_orientation AS ENUM ('portrait', 'landscape');

CREATE TABLE printer_job (
  id SERIAL PRIMARY KEY,
  status job_status NOT NULL DEFAULT 'pending',
  printer_id INTEGER NOT NULL REFERENCES printer(id),
  user_id INTEGER NOT NULL REFERENCES app_user(id),
  file_id INTEGER NOT NULL REFERENCES user_file(id),
  start_time TIMESTAMP NOT NULL DEFAULT NOW(),
  end_time TIMESTAMP NULL,
  page_size VARCHAR(255) NOT NULL, -- A4, A3, etc.
  page_count INTEGER NOT NULL,
  double_side BOOLEAN NULL,
  color BOOLEAN NULL,
  orientation print_orientation NULL
);

CREATE TABLE system_configurations (
  id SERIAL PRIMARY KEY,
  default_page_balance INTEGER NOT NULL,
  cron_of_default_page_balance_grant VARCHAR NOT NULL,
  permitted_file_types VARCHAR(255)[] NOT NULL,
  max_file_size INTEGER NOT NULL
);

COMMIT;