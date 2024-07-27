import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import router from './src/api/index.js';

dotenv.config({ path: ".env" });

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(router);

const publicPath = path.join(path.resolve(), 'public');
app.use(express.static(publicPath));

app.use((err, req, res, next) => {
  if (err instanceof jwt.JsonWebTokenError) {
    res.status(401).send('Invalid token');
  } else {
    next(err);
  }
});


app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src', 'public', 'views'));


export default app;
