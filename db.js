const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost", // Change to your MySQL host
  user: "root", // Change to your MySQL username
  password: "", // Change to your MySQL password
  database: "movie_favorites", // Change to your MySQL database name
});

module.exports = db;

/*
QUERY  :


CREATE DATABASE movie_favorites;

USE movie_favorites;

CREATE TABLE favorites (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    year VARCHAR(10),
    type VARCHAR(50),
    poster VARCHAR(255)
);

*/
