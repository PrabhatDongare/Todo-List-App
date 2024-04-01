const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser');

const todoRoute = require('./routes/todoRoute');
const userRoute = require('./routes/userRoute');

// .env
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 8000;

// DB connection
const conn = mongoose.connect(process.env.MONGO_URI);

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 

app.get('/', async (req, res) => {
  try {
    res.status(200).send("Backend is LIVE...")

  } catch (error) {
    res.status(500).json({ message: 'Action Failed' });
  }
});

// Endpoints
app.use('/api/todo', todoRoute);
app.use('/api/auth', userRoute);


app.listen(port, () => {
  console.log(`Todo app BACKEND listening on port ${port}`)
});

