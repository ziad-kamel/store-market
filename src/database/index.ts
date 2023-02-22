import { Pool } from "pg";
import configuration from "../configuration";
const pool = new Pool({
  host: configuration.host,
  database: configuration.database,
  user: configuration.user,
  password: configuration.password,
  port: parseInt(configuration.dbPort as string, 10),
  max: 50,
});
pool.on("error", (error: Error) => {
  console.error(error.message);
});
export default pool;
