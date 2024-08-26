const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from the server side!" });
});

// 1) Middlewares
app.use(express.json());

// 2) ROUTES

module.exports = app;
