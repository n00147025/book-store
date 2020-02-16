/**
 * @Date:   2020-02-10T20:05:25+00:00
 * @Last modified time: 2020-02-16T12:01:28+00:00
 */

const express = require('express');
const body_parser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const booksRouter = require('./routes/books');
const authRouter = require('./routes/auth');
const app = express();

app.use(body_parser.json());
app.use(cors());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;

connection.once('open', () =>{
  console.log("MongoDB database connection established successfully");
});

app.get("/", (req, res) => {
  res.json({message: "You are in the root route"});
});
app.use('/books', booksRouter);
app.use('/account', authRouter);

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('../build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
  });
}

const port = process.env.port || 4000;

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
