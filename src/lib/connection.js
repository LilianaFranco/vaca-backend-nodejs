import pg from "pg";
import "dotenv/config";

const { Pool } = pg;

console.log(process.env.PGUSER);

const pool = new Pool();
//   {
//   user: process.env.PGUSER,
//   host: process.env.PGHOST,
//   database: process.env.PGDATABASE,
//   password: process.env.PGPASSWORD,
//   port: process.env.PGPORT,
// }

export default pool;
