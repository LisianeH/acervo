const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgre',
    database: 'crud_acervo', 
});

module.exports = pool;