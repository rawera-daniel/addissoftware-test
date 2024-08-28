const express = require('express');

const songRouter = require('./routes/songRoutes');

const app = express();

// 1) Middlewares
app.use(express.json());

// 2) ROUTES
app.use('/api/v1/songs', songRouter);

module.exports = app;
