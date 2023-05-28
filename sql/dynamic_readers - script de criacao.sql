CREATE DATABASE dynamic_readers;
USE dynamic_readers;

CREATE USER IF NOT EXISTS projeto_individual IDENTIFIED BY '12345';
GRANT SELECT, INSERT, UPDATE, DELETE ON dynamic_readers.* TO '12345';
FLUSH PRIVILEGES;
