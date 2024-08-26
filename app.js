const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from the server side!" });
});

// 1) Middlewares
if (process.env.NODE_ENV === "production") {
  console.log("we're in production environment");
}
app.use(express.json());

// 2) ROUTES

module.exports = app;
