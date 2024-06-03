import express, { Request, Response } from 'express';

const app = express();
const path = require('path');
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath));

app.get('/', (_, res) => {
  res.send('Hello, JavaScript with Express!');
});


module.exports = app;
