const Subject = require('../models/subjectModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createSubject = catchAsync(async (req, res, next) => {
  const newSubject = await Subject.create(req.body);

  res.status(201).json({
    status: 'sucess',
    data: {
      subject: newSubject,
    },
  });
});

exports.getSubjects = catchAsync(async (req, res, next) => {
  const subjects = await Subject.find();

  res.status(200).json({
    status: 'success',
    results: subjects.length,
    data: {
      subjects,
    },
  });
});

exports.getSingleSubject = catchAsync(async (req, res, next) => {
  const subject = await Subject.findById(req.params.id);

  if (!subject) {
    return next(new AppError('No Subject found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      subject,
    },
  });
});

exports.updateSubject = catchAsync(async (req, res, next) => {
  const updatedSubject = await Subject.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedSubject) {
    return next(new AppError('No Subject found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      updatedSubject,
    },
  });
});

exports.deleteSubject = catchAsync(async (req, res, next) => {
  const subject = await Subject.findByIdAndDelete(req.params.id);

  if (!subject) {
    return next(new AppError('No Subject found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
