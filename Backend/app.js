const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const { connectDB } = require('./db/connection');
const authRouter = require('./routes/auth.route');
const usersRouter = require('./routes/user.route');

const app = express();
const port = 3000;

require("dotenv").config();

dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);

// not found routes
app.use((req, res, next) => {
  res.status(404).json({
    status: 'Not Found',
    message: `Can't find ${req.originalUrl} on this server!`,
  });
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
  connectDB();
});
