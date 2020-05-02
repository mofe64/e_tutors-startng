const express = require('express');
const bodyparser = require('body-parser');
const APPError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorContoller');

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(bodyparser.urlencoded({ limit: '10mb', extended: false }));

//routes

//errors
app.use(globalErrorHandler);

module.exports = app;
