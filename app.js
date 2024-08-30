const express = require('express');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const songRouter = require('./routes/songRoutes');

const app = express();

// 1) Middlewares
app.use(express.json());

// 2) ROUTES
app.use('/api/v1/songs', songRouter);

// Handle unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);
module.exports = app;
