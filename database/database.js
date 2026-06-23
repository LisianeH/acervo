const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgre",
  database: "crud_acervo",
});

// const pool = new Pool({ host: "localhost", port: 5432, user: "postgres", password: "admin", database: "postgres", });

module.exports = pool;