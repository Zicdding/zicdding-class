//db설정
const mysql = require("mysql");
require('dotenv').config();

// 데이터베이스 connection 객체 생성
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit : 5
});

pool.getConnection((error, connection) => {
  if (error) throw error;
  console.log("Successfully connected to the ZICDDING database. ");
});

module.exports = connection;
