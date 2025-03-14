const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./lib/connection');

const app = express();
const port = 5000;

const routes = require('./routes/index');

dotenv.config();


app.use(
  cors({
    origin: "*",
    credentials: true,
  })
)

app.use(express.json());

app.use('/api/v1', routes);

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
