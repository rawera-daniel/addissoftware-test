const express = require('express');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const songRouter = require('./routes/songRoutes');

const app = express();

// 1) Middlewares
app.use(express.json());

// 2) ROUTES
app.use('/api/v1/songs', songRouter);

// Global error handling middleware
app.use(globalErrorHandler);
module.exports = app;
