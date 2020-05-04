const express = require('express');
const bodyparser = require('body-parser');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorContoller');
const categoryRouter = require('./routers/categoryRoutes');
const subjectRouter = require('./routers/subjectRoutes');
const userRouter = require('./routers/userRoutes');
const lessonRouter = require('./routers/lessonRoutes');

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(bodyparser.urlencoded({ limit: '10mb', extended: false }));

//routes
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/subject', subjectRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/lesson', lessonRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server`));
});

//errors
app.use(globalErrorHandler);

module.exports = app;
