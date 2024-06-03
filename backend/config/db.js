//db설정
const mysql = require("mysql");

// 데이터베이스 connection 객체 생성
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '1234',
  database: process.env.DB_DATABASE,
});
console.log("DB_PASS:", process.env.DB_PASSWORD);

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database. ");
});

module.exports = connection;
