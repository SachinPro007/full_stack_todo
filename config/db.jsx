import mysql from "mysql2/promise";

// mysql.createConnection()
export const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: 4000,
  ssl: {
    minVersion: "TLSv1.2",
    rejectUnauthorized: true,
  },
});
