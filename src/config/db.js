const { Pool } = require("pg");

console.log("Password:", process.env.DB_PASSWORD);

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // ← aquí está el problema
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

module.exports = pool;
