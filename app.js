const express = require('express');
const bodyparser = require('body-parser');
const APPError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorContoller');
const categoryRouter = require('./routers/categoryRoutes');

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(bodyparser.urlencoded({ limit: '10mb', extended: false }));

//routes
app.use('/api/v1/category', categoryRouter);
//errors
app.use(globalErrorHandler);

module.exports = app;
