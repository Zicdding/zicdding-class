import express, { Request, Response } from 'express';
require("dotenv").config({ path: ".env" })
const app = express();
const path = require('path');
const publicPath = path.join(__dirname, 'public');
const router = require('./src/api/index');
app.use(express.urlencoded({ extended: true }));
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(express.static(publicPath));
app.use(cookieParser());


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src','public', 'views'));
app.get('/', (_, res) => {
  res.send('Hello, JavaScript with Express!');
});


module.exports = app;
