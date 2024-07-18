//db설정
import * as mysql from "mysql2";
//const mysql = require("mysql");
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

pool.getConnection((err, conn) =>{
  try{
    console.log("Successfully connected to the ZICDDING database.");
    conn.release(); 
  }catch(err){
    console.error("db connection err" + err);
    return;
  }
})

const promisePool = pool.promise();
/*
pool.getConnection((err,conn) => {
  if (err){
    console.error("db connection err" + err);
    return;
  }else{
    console.log("Successfully connected to the ZICDDING database.");
    conn.release(); 
  }
});

const getConnection = (callback) =>{
  pool.getConnection(callback);
}
  */



export default promisePool;
