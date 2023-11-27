BEGIN;

DROP TABLE printer_job;
DROP TYPE print_orientation;
DROP TYPE job_status;
DROP TABLE user_file;
DROP TABLE printer;
DROP TYPE printer_capability;
DROP TABLE system_configurations;

COMMIT;