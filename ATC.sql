
CREATE DATABASE IF NOT EXISTS control_air_base;

USE control_air_base;


DROP DATABASE IF EXISTS control_air_base;


CREATE TABLE airport (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(255),
    name VARCHAR(255),
    location VARCHAR(255)
);

CREATE TABLE flight (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    origin_id BIGINT,
    destination_id BIGINT,
    distance DOUBLE,
    FOREIGN KEY (origin_id) REFERENCES airport(id),
    FOREIGN KEY (destination_id) REFERENCES airport(id)
);


CREATE TABLE route (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    origin_id BIGINT,
    destination_id BIGINT,
    FOREIGN KEY (origin_id) REFERENCES airport(id),
    FOREIGN KEY (destination_id) REFERENCES airport(id)
);


CREATE TABLE plane (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    model VARCHAR(255)
);


INSERT INTO airport (code, name, location) VALUES
('MAA', 'Chennai International Airport', 'Chennai, Tamil Nadu'),
('CJB', 'Coimbatore International Airport', 'Coimbatore, Tamil Nadu'),
('TRZ', 'Tiruchirappalli International Airport', 'Tiruchirappalli, Tamil Nadu'),
('IXM', 'Madurai International Airport', 'Madurai, Tamil Nadu'),
('TJV', 'Thanjavur Air Force Station', 'Thanjavur, Tamil Nadu'),
('BLR', 'Kempegowda International Airport', 'Bengaluru, Karnataka'),
('HYD', 'Rajiv Gandhi International Airport', 'Hyderabad, Telangana'),
('DEL', 'Indira Gandhi International Airport', 'New Delhi, Delhi'),
('BOM', 'Chhatrapati Shivaji Maharaj International Airport', 'Mumbai, Maharashtra'),
('CCU', 'Netaji Subhas Chandra Bose International Airport', 'Kolkata, West Bengal');

INSERT INTO flight (origin_id, destination_id, distance) VALUES
(1, 2, 500),  -- Chennai to Coimbatore
(1, 3, 330),  -- Chennai to Tiruchirappalli
(1, 4, 450),  -- Chennai to Madurai
(5, 1, 300),  -- Thanjavur to Chennai
(6, 1, 350),  -- Bengaluru to Chennai
(7, 1, 500),  -- Hyderabad to Chennai
(8, 1, 1760), -- Delhi to Chennai
(9, 1, 1030), -- Mumbai to Chennai
(10, 1, 1650); -- Kolkata to Chennai


INSERT INTO plane (name, model) VALUES
('Airbus A320', 'A320'),
('Boeing 737', 'B737'),
('Bombardier Q400', 'Q400'),
('ATR 72', 'ATR72'),
('Airbus A321', 'A321'),
('Boeing 787 Dreamliner', 'B787'),
('Airbus A330', 'A330'),
('Boeing 777', 'B777'),
('Embraer E190', 'E190'),
('Boeing 747', 'B747');
