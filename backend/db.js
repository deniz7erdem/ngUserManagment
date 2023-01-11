const pg = require('pg');

const Pool = pg.Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'userManagementDB',
  password: 'postgres',
  port: 5432,
})

module.exports=pool;