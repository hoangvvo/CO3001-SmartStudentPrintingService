BEGIN;
-- Printers
INSERT INTO printer(brand_name, model_name, capabilities, location, is_enabled, printer_address, image_url, paper_sizes, paper_count)
  VALUES ('Brother', 'HL-L2350DW', '{"print", "double_sided"}', 'A6 101', TRUE, '192.168.0.2', '/assets/printers/Brother-HL-L2350DW_20180709-141909_full.jpeg', '{"A4", "A3", "US"}', 100),
('Epson', 'SureColor P700', '{"print", "scan", "color", "double_sided"}', 'B4 402', TRUE, '192.168.0.3', '/assets/printers/Epson-SureColor-P700_20231101-052726_full.jpeg', '{"A4", "A3"}', 102),
('Canon', 'Pixma G570', '{"print", "scan", "fax", "copy"}', 'B1 204', TRUE, '192.168.0.4', '/assets/printers/Canon-PixmaG570.png', '{"A4", "A3", "A2"}', 84),
('HP', 'LaserJet Pro', '{"print", "scan", "color", "copy"}', 'B2 101', TRUE, '192.168.0.5', '/assets/printers/HP-Color-LaserJet-Pro-MFP-M283fdw_20230417-194340_full.jpeg', '{"A4", "A3", "A2"}', 0),
('HP', 'Office Jet Pro 9015', '{"print", "scan", "color", "copy", "double_sided"}', 'A4 402', FALSE, '192.168.0.6', '/assets/printers/HP-OfficeJet-Pro-9015_20191010-140142_full.jpeg', '{"A4", "A3"}', 101);
-- App User
INSERT INTO app_user(email, password_hash, name, page_balance, created_at)
  VALUES ('hoang.vo@hcmut.edu.vn', '$argon2id$v=19$m=65536,t=3,p=4$1dghKs+pCDfZL80kX4PKWQ$62cxfui2lzrFB9lJUBFz7RlTezkEtrBUX4ifa9QoO10', 'Hoang Vo', 100, '2023-11-01 00:00:00'),
('admin@hcmut.edu.vn', '$argon2id$v=19$m=65536,t=3,p=4$zIyD4LPOz/Uw/xrvmGFJfw$GKF2OFE2JwW5oScIxqJRtAnSztnvwtwwdsg35aPc+9E', 'Admin', 100, '2023-11-01 00:00:00'),
('spso@hcmut.edu.vn', '$argon2id$v=19$m=65536,t=3,p=4$kCo+R5SUaj3sCM7n3HsANQ$NziOdbWz5xDEMSG7j/DxYDu/nMYuADfh4h5YNn/9P/k', 'Mr. Officer', 100, '2023-11-01 00:00:00'),
('test@hcmut.edu.vn', '$argon2id$v=19$m=65536,t=3,p=4$0QF4LKnBR9WWa9hYZ+PtHg$m2mmmQ8nIIL9Vi5KzCCkpweM6BrWZlJGCoJz1IxHiGY', 'Nguyen Van A', 100, '2023-11-01 00:00:00');
-- System Configuration
INSERT INTO system_configurations(id, default_page_balance, cron_of_default_page_balance_grant, permitted_file_types, max_file_size)
  VALUES (1, 100, '0 0 1 1 *', '{"application/pdf", "image/png", "image/jpeg", "image/jpg", "image/gif", "image/bmp", "image/tiff", "image/webp"}', 10485760);
-- User File
INSERT INTO user_file(user_id, file_name, file_size, file_type, file_path, created_at)
  VALUES (2, 'The Printer Working Group - IPP Version 2.0, 2.1, and 2.2.pdf', 363144, 'application/pdf', 'samples/The Printer Working Group - IPP Version 2.0, 2.1, and 2.2.pdf', '2023-11-01 00:00:00'),
(3, 'The Printer Working Group - IPP Version 2.0, 2.1, and 2.2.pdf', 363144, 'application/pdf', 'samples/The Printer Working Group - IPP Version 2.0, 2.1, and 2.2.pdf', '2023-11-01 00:00:00'),
(4, 'Capstone_Project_hk231_2023_v3.pdf', 594390, 'application/pdf', 'samples/Capstone_Project_hk231_2023_v3.pdf', '2023-11-02 00:00:00'),
(4, '08_Ch8 Implementation_2023.pdf', 2573921, 'application/pdf', 'samples/08_Ch8 Implementation_2023.pdf', '2023-11-03 00:00:00'),
(4, '09_Ch9 Software Testing_2023.pdf', 3701628, 'application/pdf', 'samples/09_Ch9 Software Testing_2023.pdf', '2023-11-04 00:00:00'),
(4, '10_Ch10 Agile Methodology_2023.pdf', 1714375, 'application/pdf', 'samples/10_Ch10 Agile Methodology_2023.pdf', '2023-11-05 00:00:00'),
(4, '11_Ch11_CI_CD_DevOps_2023.pdf', 3043088, 'application/pdf', 'samples/11_Ch11_CI_CD_DevOps_2023.pdf', '2023-11-06 00:00:00'),
(4, 'image.png', 135037, 'image/png', 'samples/image.png', '2023-11-07 00:00:00');
-- Printer Job
INSERT INTO printer_job(status, printer_id, user_id, file_id, start_time, end_time, page_size, page_count, double_side, color, orientation)
  VALUES ('completed', 1, 3, 4, '2023-11-02 00:00:00', '2023-11-02 00:01:00', 'A4', 8, FALSE, FALSE, 'portrait'),
('completed', 1, 3, 5, '2023-11-03 00:00:00', '2023-11-03 00:01:00', 'A4', 36, FALSE, FALSE, 'portrait'),
('failed', 1, 3, 6, '2023-11-04 00:00:00', '2023-11-04 00:01:00', 'A4', 52, FALSE, FALSE, 'portrait'),
('printing', 1, 3, 7, '2023-11-05 00:00:00', '2023-11-05 00:01:00', 'A4', 24, FALSE, FALSE, 'portrait');
COMMIT;

