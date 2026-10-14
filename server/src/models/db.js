const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "zero_accident",
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  
  ssl: process.env.DB_HOST ? { rejectUnauthorized: false } : null
});

db.getConnection()
  .then(connection => {
    console.log("Connected to MySQL Database (ZeroAccident)!");
    connection.release(); 
  })
  .catch(err => {
    console.error("MySQL Connection Error:", err.message);
  });

module.exports = db;