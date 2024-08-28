const express = require('express');

const app = express();

// 1) Middlewares
app.use(express.json());

// 2) ROUTES

module.exports = app;
