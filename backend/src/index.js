import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.get('/', (_, res) => {
  res.send('Hello, JavaScript with Express!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
