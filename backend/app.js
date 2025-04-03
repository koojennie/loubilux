const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./lib/connection');
const cookieParser = require("cookie-parser");

const app = express();
const port = 5000;

const routes = require('./routes/index');

dotenv.config();


app.use(express.json({ limit: "10mb" })); // Bisa sesuaikan, misalnya "10mb" atau lebih kecil
app.use(express.urlencoded({ limit: "10mb", extended: true }));


app.use(express.json());
app.use(cookieParser()); // Tambahkan sebelum routes

app.use(
  cors({
    origin: `${process.env.FRONTED_URL}`,
    credentials: true,
  })
)

// app.use((req, res, next) => {
//   let data = [];
//   req.on("data", chunk => data.push(chunk));
//   req.on("end", () => {
//     console.log("🟡 Raw Request Body:", Buffer.concat(data).toString());
//     next();
//   });
// });
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
