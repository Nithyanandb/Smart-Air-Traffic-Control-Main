create database ats;

use ats;

CREATE TABLE plane (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    model VARCHAR(255) NOT NULL,
    capacity INT NOT NULL,
    airport_id BIGINT NOT NULL,
    FOREIGN KEY (airport_id) REFERENCES airport(id)
);


CREATE TABLE airport (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL
);

CREATE TABLE flight (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    origin_id BIGINT NOT NULL,
    destination_id BIGINT NOT NULL,
    distance DOUBLE NOT NULL,
    FOREIGN KEY (origin_id) REFERENCES airport(id),
    FOREIGN KEY (destination_id) REFERENCES airport(id)
);


CREATE TABLE weather (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    location VARCHAR(255) NOT NULL,
    temp DOUBLE NOT NULL,
    pressure DOUBLE NOT NULL,
    humidity INT NOT NULL,
    speed DOUBLE NOT NULL
);




