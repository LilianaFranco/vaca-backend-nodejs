import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

const pool = new Pool({
  ssl: {
    rejectUnauthorized: false, // You can set this to true if you have the correct CA certificate
  },
});

//   {
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT,
// }

export default pool;
