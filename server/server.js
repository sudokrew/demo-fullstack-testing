import app from './app';

const server = app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${server.address().port}`);
});

export default server;
