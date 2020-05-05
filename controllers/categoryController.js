const Category = require('../models/categoryModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Subject = require('../models/subjectModel');

exports.createCategory = catchAsync(async (req, res, next) => {
  const newCategory = await Category.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      category: newCategory,
    },
  });
});

exports.getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json({
    status: 'success',
    results: categories.length,
    data: {
      categories,
    },
  });
});

exports.getSingleCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(new AppError('No category found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      category,
    },
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedCategory) {
    return next(new AppError('No category found with that ID', 404));
  }

  res.status(200).json({
    status: 'sucess',
    data: {
      updatedCategory,
    },
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  let category;
  category = await Category.findById(req.params.id);
  const subjects = category.subjects;
  console.log(subjects);
  subjects.forEach(async (element) => {
    await Subject.findByIdAndDelete(element);
  });
  await category.deleteOne();

  if (!category) {
    return next(new AppError('No Category with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

//exports.addSubject = catchAsync(async (req, res, next) => {
//  const updatedCategory = await Category.findByIdAndUpdate(req.params.id);
//});
