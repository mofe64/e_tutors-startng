const Subject = require('../models/subjectModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Tutor = require('../models/tutorModel');

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

exports.getMySubjects = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.tutorid) filter = { tutors: req.params.tutorid };

  const subjects = await Subject.find(filter);
  res.status(200).json({
    status: 'success',
    results: subjects.length,
    data: {
      subjects,
    },
  });
});

exports.updateMySubjects = catchAsync(async (req, res, next) => {
  let filter = {};
  let updatedSubject;
  if (req.params.tutorid) filter = { tutors: req.params.tutorid };
  //const test = await Subject.find(filter);
  //console.log(test);
  if ((await Subject.find(filter).length) > 0) {
    updatedSubject = await Subject.findByIdAndUpdate(
      req.params.subjectid,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: 'success',
      data: {
        updatedSubject,
      },
    });
  } else {
    return next(
      new AppError('This Tutor is not registered for this subject', 403)
    );
  }
});

exports.deleteMySubject = catchAsync(async (req, res, next) => {
  let filter = {};
  let subject;
  if (req.params.tutorid) filter = { tutors: req.params.tutorid };
  const test = await Subject.find(filter);
  //console.log(test.length > 0);
  if (test.length > 0) {
    //console.log(test.length > 0);
    subject = await Subject.findByIdAndDelete(req.params.subjectid);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } else {
    return next(
      new AppError('This Tutor is not registered for this subject', 403)
    );
  }
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
  if (req.params.tutorid) req.body.tutors = req.params.tutorid;
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

exports.registerForSubject = catchAsync(async (req, res, next) => {
  if (req.params.tutorid) req.body.tutors = req.params.tutorid;
  if (req.params.id) req.body.subjects = req.params.id;
  const registeredSubject = await Subject.findByIdAndUpdate(
    req.params.id,
    { tutors: req.body.tutors },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!registeredSubject) {
    return next(new AppError('No Subject found with that ID', 404));
  }
  const updatedTutor = await Tutor.findByIdAndUpdate(
    req.params.tutorid,
    { subjects: req.body.subjects },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!updatedTutor) {
    return next(new AppError('Tutor Id is not correct, Can not register', 400));
  }
  res.status(200).json({
    status: 'success',
    data: {
      updatedTutor,
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
