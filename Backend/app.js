const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./db/connection');
const authRouter = require('./routes/user.route');

const app = express();
const port = 3000;


dotenv.config();

app.use(express.json());

app.use('/api/v1/auth', authRouter);

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
