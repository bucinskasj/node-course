const dotenv = require('dotenv');
const mongoose = require('mongoose');

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
  })
  .then(() => console.log('DB connection successful !!'));

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour nust have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour nust have a price'],
  },
});

const Tour = mongoose.model('Tour', tourSchema);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
