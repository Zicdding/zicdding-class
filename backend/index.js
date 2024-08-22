import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
<<<<<<< HEAD
import router from './src/api/index';
=======
import router from './src/controllers/index';
import { API_VERSION } from './config/config';
>>>>>>> ca06ae07d753f9d2d333b99f59dbf24034c355b0

dotenv.config({ path: ".env" });

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
<<<<<<< HEAD
=======
app.use(API_VERSION, router);

>>>>>>> ca06ae07d753f9d2d333b99f59dbf24034c355b0
const publicPath = path.join(path.resolve(), 'public');
app.use(express.static(publicPath));
app.use(router);

app.use((err, req, res, next) => {
    if (err instanceof jwt.JsonWebTokenError) {
        res.status(401).send('Invalid token');
    } else {
        next(err);
    }
});

//로그인테스트
app.set('view engine', 'html');
app.set('view engine', 'ejs');
app.set('views', path.join(path.resolve(), 'src', 'public', 'views'));


export default app;
