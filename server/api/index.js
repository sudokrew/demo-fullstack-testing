import express from 'express';

import adsRouter from './routes/ads';

const app = express();

app.get('/', (req, res) => {
  res.json()
});

app.use('/ads', adsRouter);

export default app;
