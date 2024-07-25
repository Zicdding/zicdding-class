import express from 'express';
require("dotenv").config({ path: ".env" })
const app = express();
import path from 'path';
import jwt from 'jsonwebtoken';
const publicPath = path.join(__dirname, 'public');
const router = require('./src/api/index');
app.use(express.urlencoded({ extended: true }));
const cookieParser = require('cookie-parser');

app.use(cookieParser());
app.use(express.json());
app.use(router);
app.use(jwt.JsonWebTokenError);
app.use(express.static(publicPath));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'public', 'views'));

/*app.get('/', (_, res) => {
  res.send('Hello, JavaScript with Express!');
});
*/

module.exports = app;
