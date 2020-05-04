const Student = require('../models/studentModel');
const Tutor = require('../models/tutorModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getUsers = catchAsync(async (req, res, next) => {
  const students = await Student.find();
  res.status(200).json({
    status: 'success',
    results: students.length,
    data: {
      students,
    },
  });
});

exports.getAllTutors = catchAsync(async (req, res, next) => {
  const tutors = await Tutor.find();
  res.status(200).json({
    status: 'success',
    results: ` ${tutors.length} tutor(s) regsitered presently`,
    data: {
      tutors,
    },
  });
});
exports.getTutor = catchAsync(async (req, res, next) => {
  const tutor = await Tutor.findById(req.params.id);
  if (!tutor) {
    return next(new AppError('no tutor found with that id', 404));
  }
  res.status(200).json({
    status: 'sucess',
    data: {
      tutor,
    },
  });
});

exports.updateTutor = catchAsync(async (req, res, next) => {
  const updatedTutor = await Tutor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!updatedTutor) {
    return next(new AppError('no tutor found with that id', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      tutor: updatedTutor,
    },
  });
});

exports.deactivateTutor = catchAsync(async (req, res, next) => {
  const tutor = await Tutor.findByIdAndDelete(req.params.id);
  if (!tutor) {
    return next(new AppError('no tutor found with that id', 404));
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
