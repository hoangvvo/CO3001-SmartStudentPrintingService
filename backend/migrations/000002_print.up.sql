BEGIN;

CREATE TYPE printer_capability AS ENUM (
  'print',
  'scan',
  'copy',
  'fax',
  'color',
  'double_sided'
);

CREATE TABLE printer (
  id SERIAL PRIMARY KEY,
  brand_name VARCHAR(255) NULL,
  model_name VARCHAR(255) NULL,
  capabilities printer_capability[] NOT NULL,
  location VARCHAR(255) NOT NULL,
  is_enabled BOOLEAN NOT NULL DEFAULT TRUE,
  printer_address VARCHAR(255) NOT NULL, -- ipp://printer.example.com/ipp/print or http://printer.example.com:631/ipp/print
);

CREATE TABLE user_file (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES app_user(id),
  file_name VARCHAR(255) NOT NULL,
  file_size INTEGER NOT NULL,
  file_type VARCHAR(255) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE printer_job (
  id SERIAL PRIMARY KEY,
  printer_id INTEGER NOT NULL REFERENCES printer(id),
  user_id INTEGER NOT NULL REFERENCES app_user(id),
  file_id INTEGER NOT NULL REFERENCES user_file(id),
  start_time TIMESTAMP NOT NULL DEFAULT NOW(),
  end_time TIMESTAMP NULL,
  page_size VARCHAR(255) NOT NULL, -- A4, A3, etc.
  page_count INTEGER NOT NULL,
  double_side BOOLEAN NULL,
  color BOOLEAN NULL
);

CREATE TABLE system_configurations (
  id SERIAL PRIMARY KEY,
  default_page_balance INTEGER NOT NULL,
  date_of_default_page_balance_grant TIMESTAMP NOT NULL,
  permitted_file_types VARCHAR(255)[] NOT NULL
);

COMMIT;