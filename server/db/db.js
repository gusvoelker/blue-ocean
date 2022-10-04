require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.PG_HOST, // Postgres ip address[s] or domain name[s]
  port: process.env.PG_PORT, // Postgres server port[s]
  database: process.env.PG_DB, // Name of database to connect to
  user: process.env.PG_USER, // Username of database user
  password: process.env.PG_PW // Password of database user
});

// the pool will emit an error on behalf of any idle clients
// it contains if a backend error or network partition happens
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

console.log('Connected to PostgreSQL pool @ host', process.env.PG_HOST);

module.exports = pool;
