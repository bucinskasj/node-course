const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('Uncaught exception. Shutting down the server...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const pwd = process.env.DATABASE_PASSWORD;
const db = process.env.DATABASE;
const DB = db.replace('<PASSWORD>', pwd);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful !!'));

const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV;

const server = app.listen(port, () => {
  console.log(`App running on port ${port} in ${env.toUpperCase()}`);
});

//Process rejections
process.on('unhandledRejection', (err) => {
  console.log('Unhandled rejection. Shutting down the server...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
