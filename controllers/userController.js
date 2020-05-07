const Student = require('../models/studentModel');
const Tutor = require('../models/tutorModel');
const Lesson = require('../models/lessonsModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getStudents = catchAsync(async (req, res, next) => {
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
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];
  excludedFields.forEach((el) => delete queryObj[el]);

  let query = Tutor.find(queryObj).sort('firstname');

  const tutors = await query;
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

exports.MakeTutorAdmin = catchAsync(async (req, res, next) => {
  const newAdmin = await Tutor.findByIdAndUpdate(
    req.params.tutorId,
    { role: 'admin' },
    { new: true }
  );
  if (!newAdmin) {
    return next(new AppError('no tutor found with that id', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      tutor: newAdmin,
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

exports.addLesson = catchAsync(async (req, res, next) => {
  if (req.params.lessonid) req.body.lessons = req.params.lessonid;
  const student = await Student.findByIdAndUpdate(
    req.params.studentid,
    { $push: { lessons: req.body.lessons } },
    { new: true, runValidators: true }
  );
  const updatedLesson = await Lesson.findByIdAndUpdate(
    req.params.lessonid,
    { $push: { students: req.params.studentid } },
    { new: true }
  );
  res.status(200).json({
    status: 'sucess',
    data: {
      student,
    },
  });
});
