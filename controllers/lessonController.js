const Lesson = require('../models/lessonsModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createLesson = catchAsync(async (req, res, next) => {
  const newLesson = await Lesson.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      lesson: newLesson,
    },
  });
});

exports.getAllLessons = catchAsync(async (req, res, next) => {
  const lessons = await Lesson.find();
  res.status(200).json({
    status: 'success',
    results: lessons.length,
    data: {
      lessons,
    },
  });
});

exports.getLesson = catchAsync(async (req, res, next) => {
  const lesson = await Lesson.findById(req.params.id);

  if (!lesson) {
    return next(new AppError('No lesson with that Id found', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      lesson,
    },
  });
});

exports.updateLesson = catchAsync(async (req, res, next) => {
  const updatedLesson = await Lesson.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedLesson) {
    return next(new AppError('No lesson with that Id found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      updatedLesson,
    },
  });
});

exports.deleteLesson = catchAsync(async (req, res, next) => {
  const lesson = await Lesson.findByIdAndDelete(req.params.id);

  if (!lesson) {
    return next(new AppError('No lesson with that Id found', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
