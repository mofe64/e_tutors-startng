const express = require('express');
const bodyparser = require('body-parser');
const APPError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorContoller');
<<<<<<< HEAD
=======
const categoryRouter = require('./routers/categoryRoutes');
const subjectRouter = require('./routers/subjectRoutes');
const userRouter = require('./routers/userRoutes');
const lessonRouter = require('./routers/lessonRoutes');
>>>>>>> development

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(bodyparser.urlencoded({ limit: '10mb', extended: false }));

//routes
<<<<<<< HEAD
=======
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/subject', subjectRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/lesson', lessonRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server`));
});
>>>>>>> development

//errors
app.use(globalErrorHandler);

module.exports = app;
