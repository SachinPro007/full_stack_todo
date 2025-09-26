import mysql from 'mysql2/promise'

// mysql.createConnection()
export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "SF45%%gfg%#11",
  database: "todos"
})
