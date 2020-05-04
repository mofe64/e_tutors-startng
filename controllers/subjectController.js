const Subject = require('../models/subjectModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createSubject = catchAsync(async (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryid;
  const newSubject = await Subject.create(req.body);

  res.status(201).json({
    status: 'sucess',
    data: {
      subject: newSubject,
    },
  });
});

exports.getSubjects = catchAsync(async (req, res, next) => {
  let filter = {};
  //console.log(req.params.categoryid);
  if (req.params.categoryid) filter = { category: req.params.categoryid };
  const subjects = await Subject.find(filter).populate({
    path: 'category',
    select: '-_id -__v',
  });

  res.status(200).json({
    status: 'success',
    results: subjects.length,
    data: {
      subjects,
    },
  });
});

exports.getSingleSubject = catchAsync(async (req, res, next) => {
  let filter = req.params.id;
  if (req.params.subjectid) filter = { _id: req.params.subjectid };
  //console.log(req.params.subjectid);
  //console.log(filter);
  const subject = await Subject.findById(filter).populate('category');

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
  let filter = req.params.id;
  if (req.params.subjectid) filter = { _id: req.params.subjectid };
  const updatedSubject = await Subject.findByIdAndUpdate(filter, req.body, {
    new: true,
    runValidators: true,
  });

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
  let filter = req.params.id;
  if (req.params.subjectid) filter = { _id: req.params.subjectid };
  const subject = await Subject.findByIdAndDelete(filter);

  if (!subject) {
    return next(new AppError('No Subject found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
