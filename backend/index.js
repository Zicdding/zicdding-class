import express, { Request, Response } from 'express';
require("dotenv").config({ path: ".env" })


const app = express();
const cookieParser = require('cookie-parser');

const path = require('path');
const publicPath = path.join(__dirname, 'public');
const router = require('./src/api/index');

app.use(express.json());
app.use(router);
app.use(express.static(publicPath));
app.use(cookieParser());

app.get('/', (_, res) => {
  res.send('Hello, JavaScript with Express!');
});

//로그인테스트
app.set('view engine' , 'html');

module.exports = app;
